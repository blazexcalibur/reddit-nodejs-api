// load the required libraries
var mysql = require('mysql');
var express = require('express');
var bodyParser = require('body-parser');
var bcrypt = require('bcrypt');
const saltRounds = 10;
var secureRandom = require('secure-random');
var cookieParser = require('cookie-parser');


// create a connection to our Cloud9 server
var conn = mysql.createConnection({
  host: 'localhost',
  user: 'carbonneau', // CHANGE THIS :)
  password: '',
  database: 'reddit'
});

// load our API and pass it the connection
var reddit = require('./reddit');
var redditAPI = reddit(conn);
var app = express();

//middlewares
app.use(bodyParser.urlencoded({
  extended: false
}));
app.use(cookieParser()); // this middleware will add a `cookies` property to the request, an object of key:value pairs for all the cookies we set
app.use(checkLoginToken);
app.use('/assets', express.static('assets'));


// the /homepage stuff
app.get('/homepage/:sort?', function(request, response) {
  //console.log(request);
  var sort = request.params.sort;
  //console.log(sort, "     sorting methode registered");

  switch (sort) {

    case 'newest':

      redditAPI.getAllPosts("newest", function(err, res) {
        if (err) {
          response.status(400).send("database error");
        }
        else {
          //console.log("yadaydaya", sort);
          response.send(returnString(res, sort));
        }
      });
      break;

    case 'top':

      redditAPI.getAllPosts("top", function(err, res) {
        if (err) {
          response.status(400).send("database error");
        }
        else {
          //console.log(res, 'top');
          response.send(returnString(res, sort));
        }

      });
      break;

    case 'controversial':

      redditAPI.getAllPosts("controversial", function(err, res) {
        if (err) {
          response.status(400).send("database error");
        }
        else {
          //console.log(res, 'cont');
          response.send(returnString(res, sort));
        }
      });
      break;

    default:

      redditAPI.getAllPosts("hot", function(err, res) {
        if (err) {
          response.status(400).send("database error");
        }
        else {
          //console.log(res, 'hot');
          response.send(returnString(res, sort));
        }
      });
      break;
  }
});



app.get('/signup', function(request, response) {
  //console.log(request.query);
  var err = '';
  if (request.query.err) {
    err = "THAT FUCK EXISTS!"
  }
  response.send(`
    <!DOCTYPE html>
    
    <html>
        <head>
        
            <title>Reddit</title>
            <link rel="stylesheet" type="text/css" href="/assets/style.css">
        </head>
    <body>
    <h class:""> </h>
        <form action="/signup" method="POST">
            <div>
                <input type="text" name="username" placeholder="Enter a username">
            </div>
            <div>
                <input type="text" name="password" placeholder="Enter a password">
            </div>
            <button type="submit">SIGNUP!</button>
        </form>
    </body>
</html>
            `);

});

app.get('/login', function(request, response) {
  response.send(`
    <!DOCTYPE html>
    <html>
        <head>
            <title>Reddit Stuff</title>
        </head>
    <body>
        <form action="/login" method="POST"> <!-- what is this method="POST" thing? you should know, or ask me :) -->
            <div>
                <input type="text" name="username" placeholder="Enter your username">
            </div>
            <div>
                <input type="text" name="password" placeholder="Enter your password">
            </div>
            <button type="submit">Log Me In Now!</button>
        </form>
    </body>
</html>
            `);

});

app.get('/create', function(req, res) {
  res.send(`
    <!DOCTYPE html>
    <html>
        <head>
            <title>Reddit Stuff</title>
        </head>
    <body>
        <form action="/create" method="POST"> <!-- what is this method="POST" thing? you should know, or ask me :) -->
            <div>
                <input type="text" name="title" placeholder="Enter a title">
            </div>
            <div>
                <input type="text" name="url" placeholder="Enter a url">
            </div>
            <button type="submit">Create Post!</button>
        </form>
    </body>
</html>
            `);

});

app.post('/signup', function(req, res) {
  //console.log(req.body);
  var user = req.body.username;
  var passwd = req.body.password;

  conn.query('SELECT * FROM users WHERE username = ?', [user], function(err, result) {

    //console.log(result,"THIS IS THE RESUKT");
    // check for errors, then...
    if (err) {
      console.log(err);
    }
    else {
      if (result.length === 0) {
        //hash a password
        redditAPI.createUser({
          username: user,
          password: passwd
        }, function(err, resulto) {
          if (err) {
            res.status(400).send("create user error");
            console.log(err);
          }
          else {
            res.redirect('/login');
          }
        });
      }
      else {
        //alert("Username already taken that person was cool before you");
        var encodedErr = encodeURIComponent('fuck yo shit');
        res.redirect(`/signup?err=${encodedErr}`);
      }
    }
  });
});

//function to check login, see if it exist, encrypt the password and pass the user if it doesn't exist
function checkLogin(user, pass, callback) {
  conn.query('SELECT * FROM users WHERE username = ?', [user], function(err, result) {
    if (err) {
      console.log(err.stack)
    }
    else {

      // check for errors, then...
      if (result.length === 0) {
        callback(new Error('username or password incorrect')); // in this case the user does not exists
      }
      else {
        var user = result[0];
        //console.log("user  \n" + JSON.stringify(user, null, 4))
        var actualHashedPassword = user.password;
        //console.log("here is my hassshh ", actualHashedPassword);
        //console.log("here is my passsss ", pass);

        bcrypt.compare(pass, actualHashedPassword, function(bcrypterr, bcryptresult) {
          if (bcrypterr) {
            console.log(bcrypterr.stack);
          }
          else {
            //console.log(bcryptresult)
            if (bcryptresult === true) { // let's be extra safe here
              //console.log('the hash matched');

              callback(null, user);
            }
            else {
              //console.log("i'm got here in checkLogin mofo")
              callback(new Error('username or password incorrect')); // in this case the password is wrong, but we reply with the same error
            }
          }

        });
      }
    }

  });
};

app.post('/login', function(req, res) {

  //console.log(req.body.username + "    username \n" + req.body.password + "    password");
  var userrr = req.body.username;
  var passwd = req.body.password;

  checkLogin(userrr, passwd, function(err, user) {
    if (err) {
      res.status(401).send(err.stack);
    }
    else {
      // password is OK!
      // we have to create a token and send it to the user in his cookies, then add it to our sessions table!
      redditAPI.createSession(user.id, function(err, token) {
        if (err) {
          res.status(500).send('an error occurred. please try again later!');
        }
        else {
          res.cookie('SESSION', token); // the secret token is now in the user's cookies!
          res.redirect('/homepage');
        }
      });
    }
  });
});

app.post('/create', function(req, res) {

  if (!req.loggedInUser) {
    res.status(401).send('You must be logged in to create content!');
  }

  else {
    var newObj = {
      url: req.body.url,
      title: req.body.title,
      userId: 1
    };
    redditAPI.createPost(newObj, 2, function(err, result) {
      if (err) {
        res.send("error creating post");
      }
      else {
        //console.log(result);
        res.redirect('http://' + result.url);
      }
      //connection.end();
    });
  }

});

app.post('/vote', function(req, res) {
  if (!req.loggedInUser) {
    res.status(401).send('You must be logged in to create content!');
  }
  else {
    //console.log(req.body);
    var voteObj = {
      'userId': req.loggedInUser,
      'postId': req.body.postId,
      'vote': parseInt(req.body.vote)
    };
    redditAPI.createOrUpdateVote(voteObj, function() {
      res.redirect(`/homepage/${req.body.sortingtype}`);
    });
  }
});

app.get('/*', function(req,res){res.redirect('/homepage');});



// The middleware
function checkLoginToken(request, response, next) {
  // check if there's a SESSION cookie...
  //console.log("we r in middlewhere?");
  if (request.cookies.SESSION) {
    redditAPI.getUserFromSession(request.cookies.SESSION, function(err, user) {
      // if we get back a user object, set it on the request. From now on, this request looks like it was made by this user as far as the rest of the code is concerned
      if (err) {
        console.log('err on middle earth', err);
      }
      else {
        if (user) {
          request.loggedInUser = user;
          //console.log("what is this", request, "black magic? \n",user);
          next();
        }

      }
    });
  }
  else {
    // if no SESSION cookie, move forward
    next();
  }
};


//function for /homepage
function returnString(posts, sortingMethod) {
  var str = `
<!DOCTYPE html>
    <html>
    <head>
        <title>Reddit Stuff</title>
    </head>
<body>

<div id="contents">
  <h1>List of contents</h1>
  <ul class="contents-list">
    <ul class="contents-list">
  
    ${posts.map(function(post){
        return createLi(post, sortingMethod);
    }).join("")}
    
  </ul>
  </ul>
</div>

</body>
</html>
`;
  return str;
};

function createLi(post, sortingMethod) {
  return `
  <li class="content-item">
    <h2 class="content-item__title">
          <a href="http://${post.url}">${post.title}</a>
        </h2>
    <p>Created by ${post.user.username}</p>
    <form action="/vote" method="post">
      <input type="hidden" name="vote" value="1">
      <input type="hidden" name="postId" value="${post.id}">
      <input type="hidden" name="sortingtype" value= ${sortingMethod}>
      <button type="submit">upvote this</button>
    </form>
    <form action="/vote" method="post">
      <input type="hidden" name="vote" value="-1">
      <input type="hidden" name="postId" value="${post.id}">
      <input type="hidden" name="sortingtype" value= ${sortingMethod}>
      <button type="submit">downvote this</button>
    </form>
  </li>
  `;
};



//start the internets
app.listen(process.env.PORT);