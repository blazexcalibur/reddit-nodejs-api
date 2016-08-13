// load the required libraries


var mysql = require('mysql');

var express = require('express');

var bodyParser = require('body-parser');

var bcrypt = require('bcrypt');

const saltRounds = 10;

var secureRandom = require('secure-random');

var cookieParser = require('cookie-parser');

var engine = require('ejs-mate');

var request = require('request');

var cheerio = require('cheerio')



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

app.engine('ejs', engine);

app.set('view engine', 'ejs');

app.set('views',__dirname + '/views');

app.use(express.static(__dirname + '/public'));



// the get stuff

app.get('/homepage/:sort?', function(request, response) {
  var sort = request.params.sort || 'hot';
  
  redditAPI.getAllPosts(sort, function(err, posts){
    if(err){
      response.send(err);
    } else {
      console.log("this is homepage's request\n",request,"this is homepage's posts\n",posts);
      response.render('homepage', {posts: posts, req: request})
    }
  })
});

app.get('/signup', function(request, response) {
  //console.log(request.query);
  var err = '';
  if (request.query.err) {
    err = "THAT FUCK EXISTS!"
  }
 
  response.render('signup', {req:request});
});

app.get('/login', function(request, response) {

  response.render('login', {req: request});

});

app.get('/create', function(req, res) {
  var username;
  if (!req.loggedInUser) {

    res.status(401).redirect('/denied');
    //res.status(401).send('<html><body><p>you must login first!</p><img style="-webkit-user-select: none;" src="http://nationwideradiojm.com/wp-content/uploads/2015/11/access-denied-715x400.png" width="715" height="400"> </body> </html>');
  }
  else {
 
    res.render('create', { req:req });
  }
});

app.get('/suggestTitle', function(req, res) {
  var urlToCheck = req.query.url;
  request(urlToCheck, function (error, response, body) {
    var html = cheerio.load(body);
    var title = html('title').text();
    //console.log(title);
    //console.log(response, body);
    res.json( {
      title: title,
    });
  });
});

app.get('/denied', function(req, res) {

  res.render('denied', {req:req});
});

app.get('/comments', function(req,res){
var postId = req.query.post;
console.log("postid is ", postId);
redditAPI.getCommentsForPost(postId, function(err,result){
  if (err){
    res.status(401);
  } 
  else {
    console.log("result is ", result);
    if(!result.length===0){ 
    var comments=[];
    var ii;
    
    for (var i = 1 ;i < 4;i++){
      ii=i-1;
      comments[ii] = {
        user: result[0]["c"+i+"_userName"],
        comment:result[0]["c"+i+"_text"]  
      };
    }
    
    res.render('comments', {req: req, comments: comments});
    } else {
      res.render('denied', {req:req});
    }
  }
})
});



// the post stuff


app.post('/signup', function(req, res) {
  //console.log(req.body);
  var user = req.body.username;
  var passwd = req.body.password;
  if (user.length > 0 && passwd.length > 6) {
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
  }
  else {
    if (user.length === 0) {
      res.send(`please enter a username and password`);
    }
    else if (passwd.length < 6) {
      res.send(`please enter a password longer than 6 characters`);
    }
  }
});

app.post('/login', function(req, res) {

  var userrr = req.body.username;
  var passwd = req.body.password;
  console.log (userrr, passwd, "user/pass");

  checkLogin(userrr, passwd, function(err, user) {
    if (err) {
      res.status(401).redirect('/denied');
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

app.post('/logout', function(req, res) {
  if (req.cookies.SESSION) {

    redditAPI.deleteSession(req.loggedInUser, function(err, userId) {
      if (err) {
        res.status(401).redirect('/denied')
      }
      else {
        res.clearCookie('SESSION');
        res.redirect('/login')
      }
    });
  }
  else {
    res.redirect('/login')
  }
});

app.post('/create', function(req, res) {

  if (!req.loggedInUser) {
    //res.status(401).send('you must be logged in');
    res.redirect('denied');
  }

  else {
    var newObj = {
      url: req.body.url,
      title: req.body.title,
      userId: req.loggedInUser
    };
    redditAPI.createPost(newObj, 2, function(err, result) {
      if (err) {
        res.send("error creating post");
      }
      else {
        console.log(result);
        res.redirect('/homepage');
      }
    });
  }

});

app.post('/vote', function(req, res) {
  if (!req.loggedInUser) {
    res.status(401).send('not logged in');
    //res.status(401).send('<html><body><p>you must login first!</p><img style="-webkit-user-select: none;" src="http://nationwideradiojm.com/wp-content/uploads/2015/11/access-denied-715x400.png" width="715" height="400"> </body> </html>');
  }
  else {
    //console.log(req.body);
    var voteObj = {
      'userId': req.loggedInUser,
      'postId': req.body.postId,
      'vote': parseInt(req.body.vote)
    };
    console.log(voteObj)
    redditAPI.createOrUpdateVote(voteObj, function() {
      //console.log("sort", req.body);
      
      //create new reddit api function that calculates total new scire for a post
      redditAPI.getVotescoreForPost(voteObj.postId, function(err,result){
        //console.log(result)
        if(err){
          res.send(err.stack)
        } else {
          //console.log("voteScore in app.post \n", res)
          //console.log("result in getVotescoreForPost \n", result[0]);
            res.json({msg: 'ok', voteScore: result[0].voteScore});
        }
      })
    });
  }
});


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
          console.log("user passed on to checkLoginToken from getUserFromSession",user)
          request.loggedInUser = user.userId;
          request.loggedInUserName = user.username;
        
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

//start the internets
app.listen(process.env.PORT);