// load the required libraries
var mysql = require('mysql');
var express = require('express');
var bodyParser = require('body-parser');

// create a connection to our Cloud9 server
var connection = mysql.createConnection({
    host: 'localhost',
    user: 'carbonneau', // CHANGE THIS :)
    password: '',
    database: 'reddit'
});

// load our API and pass it the connection
var reddit = require('./reddit');
var redditAPI = reddit(connection);
var app = express();
app.use(bodyParser.urlencoded({
    extended: false
}));

// the /hello stuff
app.get('/hello', function(request, response) {

    var firstName = request.query.name;

    if (!firstName) {
        response.send('<h1>Hello World!</h1>');
    }
    else {
        response.send(
            `
             <h1>Hello ${firstName}!</h1>
             `
        );
    }
});

// the /calculator stuff
app.get('/calculator/:operation', function(request, response) {
    var operation = request.params.operation;
    var num1 = Number(request.query.num1);
    var num2 = Number(request.query.num2);


    switch (operation) {
        case 'add':
            response.send({
                'operator': "add",
                'firstOperand': num1,
                'secondOperand': num2,
                'solution': add(num1, num2)
            });
        case 'sub':
            response.send({
                'operator': "sub",
                'firstOperand': num1,
                'secondOperand': num2,
                'solution': sub(num1, num2)
            });
        case 'mult':
            response.send({
                'operator': "mult",
                'firstOperand': num1,
                'secondOperand': num2,
                'solution': mult(num1, num2)
            });

        case 'div':
            response.send({
                'operator': "div",
                'firstOperand': num1,
                'secondOperand': num2,
                'solution': div(num1, num2)
            });
        default:
            response.status(400).send('THATS NOT MATH');

    }

});

// the /homepage stuff
app.get('/homepage/:sort', function(request, response) {
    var sort = request.params.sort;
    console.log(sort, "     sorting methode registered");

    switch (sort) {

        case ':newest':
            
            redditAPI.getAllPosts("newest", function(err, res) {
                if (err) {
                    response.status(400).send("database error");
                }
                else {
                    console.log(res, "newest");
                    response.send(returnString(res));
                }
            })
            break;
        case ':top':
            
            redditAPI.getAllPosts("top", function(err, res) {
                if (err) {
                    response.status(400).send("database error");
                }
                else {
                    console.log(res, 'top');
                    response.send(returnString(res));
                }

            });
            break;
        case ':controversial':
            
            redditAPI.getAllPosts("controversial", function(err, res) {
                if (err) {
                    response.status(400).send("database error");
                }
                else {
                    console.log(res, 'cont');
                    response.send(returnString(res));
                }
            });
            break;
        default:
        
            redditAPI.getAllPosts("hot", function(err, res) {
                if (err) {
                    response.status(400).send("database error");
                }
                else {
                    console.log(res, 'hot');
                    response.send(returnString(res));
                }
            });
            break;
    }

    // redditAPI.getAllPostsForUser(1, function(err, res) {
    //     if (err) {
    //         console.log('there was an error', err); //change this
    //     }
    //     else {

    //         response.send(returnString(res));
    //     }

    //     //connection.end();
    // });

});

// the /creatcontent stuff

app.get('/createcontent', function(request, response) {
    response.send(`
    <!DOCTYPE html>
    <html>
        <head>
            <title>Reddit Stuff</title>
        </head>
    <body>
        <form action="/createcontent" method="POST"> <!-- what is this method="POST" thing? you should know, or ask me :) -->
            <div>
                <input type="text" name="url" placeholder="Enter a URL to content">
            </div>
            <div>
                <input type="text" name="title" placeholder="Enter the title of your content">
            </div>
            <button type="submit">Create!</button>
        </form>
    </body>
</html>
            `);
});

app.post('/createcontent', function(req, res) {

    var newObj = {
        url: req.body.url,
        title: req.body.title,
        userId: 1
    };

    redditAPI.createPost(newObj, 2, function(err, result) {
        if (err) {

        }
        else {
            //console.log(result);
            res.redirect('http://' + result.url);
        }
        //connection.end();
    });

});

//signup stuff
app.get('/signup', function(request, response) {


});

//login stuff

app.get('/login', function(request, response) {

});



// all functions down here:


//function for /homepage
function returnString(posts) {
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
        return createLi(post);
    }).join("")}
    
  </ul>
  </ul>
</div>

</body>
</html>
`;
    return str;
}

function createLi(post) {
    return `
    <li class="content-item">
      <h2 class="content-item__title">
        <a href="http://the.post.url.value/">${post.title}</a>
      </h2>
      <p>Created by ${post.user.username}</p>
    </li>
    `;
}

//functions for the calculator feature
function add(num1, num2) {
    return num1 + num2;
}

function sub(num1, num2) {
    return num1 - num2;
}

function mult(num1, num2) {
    return num1 * num2;
}

function div(num1, num2) {
    return num1 / num2;
}

//start the internets
app.listen(process.env.PORT);