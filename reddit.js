var bcrypt = require('bcrypt');
var HASH_ROUNDS = 10;
var secureRandom = require('secure-random');

module.exports = function RedditAPI(conn) {
  return {

    // this function creates a big random string
    createSessionToken: function() {
      return secureRandom.randomArray(100).map(code => code.toString(36)).join('');
    },

    createSession: function(userId, callback) {
      var token = this.createSessionToken();
      conn.query('INSERT INTO sessions SET userId = ?, token = ?', [userId, token], function(err, result) {
        if (err) {
          callback(err);
        }
        else {
          //console.log("createSession token is passed from herer \n" + token)
          callback(null, token); // this is the secret session token :)
        }
      });
    },

    deleteSession: function(userId, callback) {
      conn.query('DELETE FROM sessions WHERE userId = ?', [userId], function(err, result) {
        if (err) {
          callback(err);
        } else {
          callback(null,userId)
        }
      });
    },

    createUser: function(user, callback) {

      // first we have to hash the password...
      bcrypt.hash(user.password, HASH_ROUNDS, function(err, hashedPassword) {
        if (err) {
          callback(err);
        }
        else {
          conn.query(
            'INSERT INTO users (username, password, createdAt) VALUES (?, ?, ?)', [user.username, hashedPassword, new Date()],
            function(err, result) {
              if (err) {
                /*
                There can be many reasons why a MySQL query could fail. While many of
                them are unknown, there's a particular error about unique usernames
                which we can be more explicit about!
                */
                if (err.code === 'ER_DUP_ENTRY') {
                  callback(new Error('A user with this username already exists'));
                }
                else {
                  callback(err);
                }
              }
              else {
                /*
                Here we are INSERTing data, so the only useful thing we get back
                is the ID of the newly inserted row. Let's use it to find the user
                and return it
                */
                conn.query(
                  'SELECT id, username, createdAt, updatedAt FROM users WHERE id = ?', [result.insertId],
                  function(err, result) {
                    if (err) {
                      callback(err);
                    }
                    else {
                      /*
                      Finally! Here's what we did so far:
                      1. Hash the user's password
                      2. Insert the user in the DB
                      3a. If the insert fails, report the error to the caller
                      3b. If the insert succeeds, re-fetch the user from the DB
                      4. If the re-fetch succeeds, return the object to the caller
                      */
                      callback(null, result[0]);
                    }
                  }
                );
              }
            }
          );
        }
      });
    },

    getUserFromId: function(userId, callback) {
    conn.query(`select username from users where id = ? `, [userId], function(err, res) {
          if (err) {
            callback(err);
          }
          else {
            //console.log('users query result is ', res[0].username);
            callback(null, res[0].username);
          }
        })
    },
    
    getUserFromSession: function(session, callback) {
      if (session) {
        //console.log("session exists")
        conn.query(`select userId, users.username as username FROM sessions LEFT JOIN users ON sessions.userId=users.id where token = ? `, [session], function(err, res) {
          
          if (err) {
            callback(err);
          }
    
          else {
            //console.log('session quesry result is; ', res[0]);
            callback(null, res[0]);
          }
    
        });
      }
    
      else {
        
      }
    
    
    },

    createPost: function(post, subredditId, callback) {
      conn.query(
        `INSERT INTO posts (userId, title, url, createdAt, subredditId) VALUES (?, ?, ?, ?, ${subredditId})`, [post.userId, post.title, post.url, new Date()],
        function(err, result) {
          if (err) {
            callback(err);
          }
          else {
            /*
            Post inserted successfully. Let's use the result.insertId to retrieve
            the post and send it to the caller!
            */
            conn.query(
              'SELECT id,title,url,userId, createdAt, updatedAt,subredditId FROM posts WHERE id = ?', [result.insertId],
              function(err, result) {
                if (err) {
                  callback(err);
                }
                else {
                  callback(null, result[0]);
                }
              }
            );
          }
        }
      );
    },

    /*
            //old function
          getAllPosts: function(options, callback) {
            // In case we are called without an options parameter, shift all the parameters manually
            if (!callback) {
              callback = options;
              options = {};
            }
            var limit = options.numPerPage || 25; // if options.numPerPage is "falsy" then use 25
            var offset = (options.page || 0) * limit;
            var sortMethod = createdAt;

            if (options.sortMethod === 'topRanking') {
              var queryCall = `
              select 
                p.id as postId,
                p.title as postTitle,
                p.url as postUrl,
                p.userId as postsUserId,
                p.createdAt as postCreatedAt, 
                p.updatedAt as postsUpdatedAt, 
                u.id as userId, 
                u.username as userName, 
                u.createdAt as userCreatedAt, 
                u.updatedAt as userUpdatedAt, 
                s.id subredditId, 
                s.name subredditName, 
                s.description as subredditDescription, 
                s.createdAt as subredditCreatedAt, 
                s.updatedAt as subredditUpdatedAt,  
                sum(v.vote) 
              FROM 
                posts as p 
              JOIN users as u ON p.userId=u.id 
              JOIN subreddits s ON p.subredditId=s.id   
              LEFT JOIN votes as v ON p.Id=v.postId 
              GROUP by p.id 
              ORDER by sum(v.vote) desc 
              limit ? offset ?

              `;
            }
            
            if (options.sortMethod === 'hotnessRanking') {
              queryCall = `sum(votes/ (timestamp - createdAt)) `;
            }

            if (options.sortMethod === 'newestRanking') {
              
              
            }

            if (options.sortMethod === 'controversialRanking') {
              
              
            }

            //options obj should contain properties: numPerPage, sortMethod, 
            conn.query(
              queryCall, [limit, offset],
              function(err, results) {
                if (err) {
                  callback(err);
                }
                else {

                  var improvedResults = results.map(function(obj) {

                    var user = {};
                    user["id"] = obj.userId;
                    user["username"] = obj.userName;
                    user["createdAt"] = obj.userCreatedAt;
                    user["updateAt"] = obj.userUpdatedAt;

                    var subreddit = {};
                    subreddit["id"] = obj.subredditId;
                    subreddit["name"] = obj.subredditName;
                    subreddit["description"] = obj.subredditDescription;
                    subreddit["createdAt"] = obj.subredditCreatedAt;
                    subreddit["updatedAt"] = obj.subredditUpdatedAt;

                    var post = {};
                    post["id"] = obj.postId;
                    post["title"] = obj.postTitle;
                    post["url"] = obj.postUrl;
                    post["createdAt"] = obj.postCreatedAt;
                    post["updatedAt"] = obj.postsUpdatedAt;
                    post["userId"] = obj.postsUserId;
                    post["user"] = user;
                    post["subreddit"] = subreddit;

                    return post;

                  });

                  callback(null, improvedResults);
                }
              }
            );
          },
    
          */
    //new function

    getAllPosts: function(sortingMethod, options, callback) {

      // In case we are called without an options parameter, shift all the parameters manually
      if (!callback) {
        callback = options;
        options = {};
      }
      var limit = options.numPerPage || 25; // if options.numPerPage is "falsy" then use 25
      var offset = (options.page || 0) * limit;


      // If no sorting method is chosen or not an option of sorting methods, this is default
      if (sortingMethod !== "newest" || sortingMethod !== "top" || sortingMethod !== "hot") {
        var choices = "postCreatedAt";
      }

      // sorting method options
      if (sortingMethod === "newest") {
        var choices = "postCreatedAt";
      }

      if (sortingMethod === "top") {
        var choices = "voteScore";
      }


      if (sortingMethod === "hot") {
        var choices = "sum(vote) / (UNIX_TIMESTAMP(NOW()) - UNIX_TIMESTAMP(postCreatedAt))";
      }

      if (sortingMethod === "controversial") {
        var choices = "if((count(if(vote=1, 1, null))>count(if(vote=-1, 1, null))),(sum(vote) * count(if(vote=1, 1, null))) / count(if(vote=-1, 1, null)), (sum(vote) * count(if(vote=-1, 1, null)) / count(if(vote=1, 1, null))))"

      }


      conn.query(`
        SELECT 
        
          posts.id, 
          title, 
          url, 
          posts.userId AS postUserId, 
          posts.createdAt AS postCreatedAt, 
          posts.updatedAt AS postUpdatedAt,
          
          users.id AS userId, 
          username, 
          users.createdAt AS userCreatedAt, 
          users.updatedAt AS userUpdatedAt,
          
          subreddits.name AS subName,
          subreddits.description AS description,
          subreddits.createdAt AS subCreatedAt,
          subreddits.updatedAt AS subUpdatedAt,
          
          sum(vote) AS voteScore
          
        FROM posts
          LEFT JOIN users ON users.id=posts.userId
          LEFT JOIN subreddits ON subreddits.id=posts.subredditId
          LEFT JOIN votes ON votes.postId=posts.id
        GROUP BY posts.id
        ORDER BY ${choices} DESC
        LIMIT ? OFFSET ?`, [limit, offset],
        function(err, results) {
          if (err) {
            callback(err);
          }
          else {
            // console.log(results)
            var mappedResults = results.map(function(res) {
              return {
                id: res.id,
                title: res.title,
                url: res.url,
                createdAt: res.postCreatedAt,
                updatedAt: res.updatedAt,
                userId: res.postUserId,
                voteScore: res.voteScore,
                user: {
                  id: res.userId,
                  username: res.username,
                  createdAt: res.userCreatedAt,
                  updatedAt: res.userCreatedAt
                },
                subreddit: {
                  name: res.subName,
                  description: res.description,
                  createdAt: res.subCreatedAt,
                  updatedAt: res.subUpdatedAt
                }
              }
            })
            callback(null, mappedResults);
          }
        }
      );
    },

    getAllPostsForUser: function(userId, options, callback) {
      // In case we are called without an options parameter, shift all the parameters manually
      if (!callback) {
        callback = options;
        options = {};
      }
      var limit = options.numPerPage || 25; // if options.numPerPage is "falsy" then use 25
      var offset = (options.page || 0) * limit;

      conn.query(`
      select 
        p.id as postId,p.title as postTitle,p.url as postUrl,p.userId as postsUserId,p.createdAt as postCreatedAt,p.updatedAt as postsUpdatedAt,u.id as userId,u.username as userName,u.createdAt as userCreatedAt,u.updatedAt as userUpdatedAt FROM posts as p JOIN users as u ON p.userId=u.id where userId= ? LIMIT ? OFFSET ?`, [userId, limit, offset],
        function(err, results) {
          if (err) {
            callback(err);
          }
          else {

            var improvedResults = results.map(function(obj) {

              var user = {};
              user["id"] = obj.userId;
              user["username"] = obj.userName;
              user["createdAt"] = obj.userCreatedAt;
              user["updateAt"] = obj.userUpdatedAt;

              var post = {};
              post["id"] = obj.postId;
              post["title"] = obj.postTitle;
              post["url"] = obj.postUrl;
              post["createdAt"] = obj.postCreatedAt;
              post["updatedAt"] = obj.postsUpdatedAt;
              post["userId"] = obj.postsUserId;
              post["user"] = user;
              return post;
            });

            callback(null, improvedResults);
          }
        }
      );
    },


    getSinglePost: function(postId, callback) {

      conn.query(`select id,title,url,userId,createdAt,updatedAt from posts where id=?`, [postId],
        function(err, results) {
          if (err) {
            callback(err);
          }
          else {

            var improvedResults = results.map(function(obj) {

              var post = {};
              post["id"] = obj.id;
              post["title"] = obj.title;
              post["url"] = obj.url;
              post["createdAt"] = obj.createdAt;
              post["updatedAt"] = obj.updatedAt;

              return post;
            });

            callback(null, improvedResults);
          }
        }
      );
    },

    createSubreddit: function(sub, callback) {
      conn.query(
        'INSERT INTO subreddits (name, description, createdAt) VALUES (?, ?, ?)', [sub.name, sub.description, new Date()],
        function(err, result) {
          if (err) {
            callback(err);
          }
          else {
            conn.query(
              'SELECT id,name,description,createdAt,updatedAt FROM subreddits WHERE id = ?', [result.insertId],
              function(err, result) {
                if (err) {
                  callback(err);
                }
                else {
                  callback(null, result[0]);
                }
              }
            );
          }
        }
      );
    },

    getAllSubreddits: function(callback) {

      conn.query(`select name, description, createdAt 
                  from subreddits 
                  order by createdAt desc;`,
        function(err, results) {
          if (err) {
            callback(err);
          }
          else {

            var improvedResults = results.map(function(obj) {

              var post = {};
              post["id"] = obj.id;
              post["name"] = obj.name;
              post["description"] = obj.description;
              post["createdAt"] = obj.createdAt;
              post["updatedAt"] = obj.updatedAt;
              //console.log(post);
              return post;
            });

            callback(null, improvedResults);
          }
        }
      );
    },

    createOrUpdateVote: function(vote, callback) {
      if (!vote.userId || !vote.postId) {
        callback(null, new Error('userdId and postId required'));
      }

      if (vote.vote === 0 || vote.vote === -1 || vote.vote === 1) {

        conn.query(`
          INSERT INTO votes (postId, userId, vote, createdAt) VALUES (?, ?, ?, ?) ON DUPLICATE KEY UPDATE vote=?`, [vote.postId, vote.userId, vote.vote, new Date(), vote.vote],
          function(err, res) {
            if (err) {
              callback(err);
            }
            else {
              callback(null, res.insertId);
            }

          }
        );
      }
      else {
        console.log("please vote gooder like a good boy");
      }
    },

    createComment: function(comment, callback) {
      if (!comment.userId || !comment.postId) {
        callback(null, new Error('userdI and postId required'));
      }
      if (!comment.parentId) {
        comment.parentId = null;
      }

      conn.query(
        'INSERT INTO comments (text, userId, postId, parentId, createdAt ) VALUES (?, ?, ?, ?, ?)', [comment.text, comment.userId, comment.postId, comment.parentId, new Date()],
        function(err, result) {
          if (err) {
            callback(err);
          }
          else {
            /*
            Post inserted successfully. Let's use the result.insertId to retrieve
            the post and send it to the caller!
            */
            conn.query(
              'SELECT id text, userId, postId, parentId, createdAt FROM comments WHERE id = ?', [result.insertId],
              function(err, result) {
                if (err) {
                  callback(err);
                }
                else {
                  callback(null, result[0]);
                }
              }
            );
          }
        }
      );
    },
    /*
        getCommentsForPost: function(postId, callback) {
          conn.query(
            'select id, text, userId, postId, parentId, createdAt, updatedAt from comments where postId = ?', [postId],
            function(err, result) {
              if (err) {
                callback(err);
              }
              else {
                var grandparents = result.reduce(function(commentAcc, nextComment) {

                  var replies = [];
                  var comments = {};

                  if (nextComment.parentId===null) {
                    comments["id"] = nextComment.id;
                    comments["text"] = nextComment.text;
                    comments["createdAt"] = nextComment.createdAt;
                    comments["updatedAt"] = nextComment.updatedAt;
                  }
                  else {
                    comments["id"] = nextComment.id;
                    comments["text"] = nextComment.text;
                    comments["createdAt"] = nextComment.createdAt;
                    comments["updatedAt"] = nextComment.updatedAt;
                    replies.push(nextComment);
                    comments["replies"] = replies;
                  }
                  commentAcc.push(comments);
                  return commentAcc;
                }, []);
                console.log(JSON.stringify(grandparents,null,4))
                var parents = grandparents.reduce(function(commentAcc, nextComment) {
                  var children = [];
                  var parents = {};
                  if (nextComment.replies.parentId===commentAcc.replies.Id) {
                    children.push(nextComment);
                    parents["replies"] = children;
                  }
                  
                  commentAcc.push(parents);
                  return commentAcc;
                }, []);
                
                callback(null, parents);
              }
            })
        }
    */

    getCommentsForPost: function(postId, callback) {
      conn.query(
        `
    SELECT
      c1.id as c1_id, c1.text as c1_text, c1.parentId as c1_parentId, c1.userId as c1_userId, u1.username as c1_userName,
      c2.id as c2_id, c2.text as c2_text, c2.parentId as c2_parentId, c2.userId as c2_userId, u2.username as c2_userName,
      c3.id as c3_id, c3.text as c3_text, c3.parentId as c3_parentId, c3.userId as c3_userId, u3.username as c3_userName
    
    FROM comments c1
    
      LEFT JOIN users u1 ON c1.userId = u1.id
      LEFT JOIN comments c2 ON c1.id = c2.parentId
      LEFT JOIN users u2 ON c2.userId = u2.id
      LEFT JOIN comments c3 ON c2.id = c3.parentId
      LEFT JOIN users u3 ON c3.userId = u3.id
    
    WHERE c1.postId = ? AND c1.parentId IS NULL;
    `, [postId],
        callback
      )
    },

    getVotescoreForPost: function(postId, callback) {
      conn.query(
        `
        SELECT           
        posts.id,         
        sum(vote) as voteScore
        
        FROM posts 
        
        LEFT JOIN votes ON votes.postId=posts.id         
        WHERE posts.Id = ?`, [postId],
        callback
        )
      }
    
    
    //keep these two brackets    
  };
};




/*
SELECT 
        p.id as postId,
        p.title as postTitle,
        p.url as postUrl,
        p.userId as postsUserId,
        p.createdAt as postCreatedAt, 
        p.updatedAt as postsUpdatedAt, 
        u.id as userId, 
        u.username as userName, 
        u.createdAt as userCreatedAt, 
        u.updatedAt as userUpdatedAt, 
        s.id subredditId, 
        s.name subredditName, 
        s.description as subredditDescription, 
        s.createdAt as subredditCreatedAt, 
        s.updatedAt as subredditUpdatedAt  
      FROM 
        posts as p 
      JOIN users as u ON p.userId=u.id 
      JOIN subreddits s ON p.subredditId=s.id 
      ORDER by ? DESC LIMIT ? OFFSET ?`

*/
