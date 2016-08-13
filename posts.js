// load the mysql library
var mysql = require('mysql');

// create a connection to our Cloud9 server
var connection = mysql.createConnection({
	host: 'localhost',
	user: 'carbonneau',
	password: '',
	database: 'reddit'
});

// load our API and pass it the connection
var reddit = require('./reddit');
var redditAPI = reddit(connection);

/*
var testPosts = [
	{
		"userId": 38,
		"title": "nonummy ut, molestie in, tempus",
		"url": "www.google.com"
	},
	{
		"userId": 96,
		"title": "non justo. Proin non massa",
		"url": "www.google.com"
	},
	{
		"userId": 41,
		"title": "fermentum",
		"url": "www.google.com"
	},
	{
		"userId": 86,
		"title": "tortor,",
		"url": "www.google.com"
	},
	{
		"userId": 73,
		"title": "in aliquet lobortis, nisi",
		"url": "www.google.com"
	},
	{
		"userId": 51,
		"title": "sed orci",
		"url": "www.google.com"
	},
	{
		"userId": 64,
		"title": "vitae, orci. Phasellus dapibus quam",
		"url": "www.google.com"
	},
	{
		"userId": 97,
		"title": "mi",
		"url": "www.google.com"
	},
	{
		"userId": 32,
		"title": "lobortis. Class aptent taciti",
		"url": "www.google.com"
	},
	{
		"userId": 76,
		"title": "ligula. Aenean euismod mauris",
		"url": "www.google.com"
	},
	{
		"userId": 82,
		"title": "lorem, sit amet",
		"url": "www.google.com"
	},
	{
		"userId": 13,
		"title": "pellentesque eget, dictum placerat, augue.",
		"url": "www.google.com"
	},
	{
		"userId": 55,
		"title": "ullamcorper",
		"url": "www.google.com"
	},
	{
		"userId": 13,
		"title": "auctor,",
		"url": "www.google.com"
	},
	{
		"userId": 60,
		"title": "pede ac urna. Ut tincidunt",
		"url": "www.google.com"
	},
	{
		"userId": 50,
		"title": "commodo tincidunt nibh.",
		"url": "www.google.com"
	},
	{
		"userId": 89,
		"title": "nibh lacinia orci,",
		"url": "www.google.com"
	},
	{
		"userId": 8,
		"title": "tincidunt",
		"url": "www.google.com"
	},
	{
		"userId": 12,
		"title": "velit eu sem. Pellentesque ut",
		"url": "www.google.com"
	},
	{
		"userId": 71,
		"title": "vitae dolor. Donec",
		"url": "www.google.com"
	},
	{
		"userId": 21,
		"title": "pede. Praesent eu dui.",
		"url": "www.google.com"
	},
	{
		"userId": 12,
		"title": "sem, vitae aliquam",
		"url": "www.google.com"
	},
	{
		"userId": 57,
		"title": "lectus. Nullam suscipit, est",
		"url": "www.google.com"
	},
	{
		"userId": 88,
		"title": "molestie arcu. Sed eu",
		"url": "www.google.com"
	},
	{
		"userId": 23,
		"title": "consequat",
		"url": "www.google.com"
	},
	{
		"userId": 18,
		"title": "pede",
		"url": "www.google.com"
	},
	{
		"userId": 31,
		"title": "eget lacus. Mauris",
		"url": "www.google.com"
	},
	{
		"userId": 86,
		"title": "volutpat ornare,",
		"url": "www.google.com"
	},
	{
		"userId": 53,
		"title": "metus eu erat semper rutrum.",
		"url": "www.google.com"
	},
	{
		"userId": 90,
		"title": "gravida sagittis.",
		"url": "www.google.com"
	},
	{
		"userId": 16,
		"title": "dolor, tempus non,",
		"url": "www.google.com"
	},
	{
		"userId": 47,
		"title": "consectetuer ipsum nunc id",
		"url": "www.google.com"
	},
	{
		"userId": 52,
		"title": "pharetra, felis eget varius",
		"url": "www.google.com"
	},
	{
		"userId": 67,
		"title": "ac urna. Ut tincidunt vehicula",
		"url": "www.google.com"
	},
	{
		"userId": 68,
		"title": "imperdiet nec,",
		"url": "www.google.com"
	},
	{
		"userId": 93,
		"title": "velit justo nec ante. Maecenas",
		"url": "www.google.com"
	},
	{
		"userId": 26,
		"title": "convallis est, vitae sodales",
		"url": "www.google.com"
	},
	{
		"userId": 35,
		"title": "fringilla. Donec feugiat",
		"url": "www.google.com"
	},
	{
		"userId": 70,
		"title": "Morbi accumsan laoreet ipsum. Curabitur",
		"url": "www.google.com"
	},
	{
		"userId": 69,
		"title": "elit, pharetra ut, pharetra sed,",
		"url": "www.google.com"
	},
	{
		"userId": 70,
		"title": "tellus non magna. Nam ligula",
		"url": "www.google.com"
	},
	{
		"userId": 1,
		"title": "Etiam imperdiet dictum",
		"url": "www.google.com"
	},
	{
		"userId": 92,
		"title": "lacinia vitae, sodales at,",
		"url": "www.google.com"
	},
	{
		"userId": 95,
		"title": "sem egestas blandit.",
		"url": "www.google.com"
	},
	{
		"userId": 30,
		"title": "est ac facilisis facilisis, magna",
		"url": "www.google.com"
	},
	{
		"userId": 8,
		"title": "quis,",
		"url": "www.google.com"
	},
	{
		"userId": 25,
		"title": "ipsum porta elit,",
		"url": "www.google.com"
	},
	{
		"userId": 91,
		"title": "magna",
		"url": "www.google.com"
	},
	{
		"userId": 78,
		"title": "In condimentum.",
		"url": "www.google.com"
	},
	{
		"userId": 37,
		"title": "pede et",
		"url": "www.google.com"
	},
	{
		"userId": 100,
		"title": "mollis. Integer tincidunt",
		"url": "www.google.com"
	},
	{
		"userId": 29,
		"title": "dui nec",
		"url": "www.google.com"
	},
	{
		"userId": 60,
		"title": "non,",
		"url": "www.google.com"
	},
	{
		"userId": 33,
		"title": "non dui nec",
		"url": "www.google.com"
	},
	{
		"userId": 11,
		"title": "dui. Suspendisse",
		"url": "www.google.com"
	},
	{
		"userId": 95,
		"title": "Integer urna. Vivamus molestie dapibus",
		"url": "www.google.com"
	},
	{
		"userId": 93,
		"title": "gravida. Praesent eu nulla at",
		"url": "www.google.com"
	},
	{
		"userId": 32,
		"title": "amet, faucibus ut,",
		"url": "www.google.com"
	},
	{
		"userId": 43,
		"title": "pellentesque, tellus sem mollis",
		"url": "www.google.com"
	},
	{
		"userId": 31,
		"title": "Fusce",
		"url": "www.google.com"
	},
	{
		"userId": 94,
		"title": "imperdiet non, vestibulum nec, euismod",
		"url": "www.google.com"
	},
	{
		"userId": 1,
		"title": "feugiat. Sed nec metus",
		"url": "www.google.com"
	},
	{
		"userId": 24,
		"title": "egestas blandit. Nam",
		"url": "www.google.com"
	},
	{
		"userId": 1,
		"title": "Integer mollis. Integer",
		"url": "www.google.com"
	},
	{
		"userId": 77,
		"title": "non,",
		"url": "www.google.com"
	},
	{
		"userId": 91,
		"title": "tempus, lorem fringilla",
		"url": "www.google.com"
	},
	{
		"userId": 48,
		"title": "sed sem egestas",
		"url": "www.google.com"
	},
	{
		"userId": 31,
		"title": "mus. Proin vel arcu",
		"url": "www.google.com"
	},
	{
		"userId": 19,
		"title": "neque",
		"url": "www.google.com"
	},
	{
		"userId": 30,
		"title": "aliquet diam.",
		"url": "www.google.com"
	},
	{
		"userId": 45,
		"title": "ornare sagittis felis. Donec",
		"url": "www.google.com"
	},
	{
		"userId": 98,
		"title": "massa non ante",
		"url": "www.google.com"
	},
	{
		"userId": 43,
		"title": "ultrices",
		"url": "www.google.com"
	},
	{
		"userId": 23,
		"title": "ac facilisis",
		"url": "www.google.com"
	},
	{
		"userId": 35,
		"title": "ante",
		"url": "www.google.com"
	},
	{
		"userId": 81,
		"title": "egestas nunc sed",
		"url": "www.google.com"
	},
	{
		"userId": 63,
		"title": "quis lectus.",
		"url": "www.google.com"
	},
	{
		"userId": 76,
		"title": "urna suscipit nonummy.",
		"url": "www.google.com"
	},
	{
		"userId": 23,
		"title": "Etiam",
		"url": "www.google.com"
	},
	{
		"userId": 84,
		"title": "neque et nunc.",
		"url": "www.google.com"
	},
	{
		"userId": 55,
		"title": "nec,",
		"url": "www.google.com"
	},
	{
		"userId": 86,
		"title": "libero. Integer",
		"url": "www.google.com"
	},
	{
		"userId": 40,
		"title": "urna.",
		"url": "www.google.com"
	},
	{
		"userId": 94,
		"title": "Cras dolor",
		"url": "www.google.com"
	},
	{
		"userId": 73,
		"title": "convallis in, cursus et,",
		"url": "www.google.com"
	},
	{
		"userId": 96,
		"title": "at lacus. Quisque purus sapien,",
		"url": "www.google.com"
	},
	{
		"userId": 15,
		"title": "vehicula et,",
		"url": "www.google.com"
	},
	{
		"userId": 61,
		"title": "eu dolor egestas rhoncus.",
		"url": "www.google.com"
	},
	{
		"userId": 28,
		"title": "tempus non, lacinia at, iaculis",
		"url": "www.google.com"
	},
	{
		"userId": 69,
		"title": "blandit enim",
		"url": "www.google.com"
	},
	{
		"userId": 74,
		"title": "auctor. Mauris",
		"url": "www.google.com"
	},
	{
		"userId": 15,
		"title": "ullamcorper",
		"url": "www.google.com"
	},
	{
		"userId": 71,
		"title": "mauris blandit mattis.",
		"url": "www.google.com"
	},
	{
		"userId": 2,
		"title": "mauris, aliquam eu, accumsan sed,",
		"url": "www.google.com"
	},
	{
		"userId": 60,
		"title": "luctus ut, pellentesque",
		"url": "www.google.com"
	},
	{
		"userId": 2,
		"title": "diam vel arcu. Curabitur ut",
		"url": "www.google.com"
	},
	{
		"userId": 55,
		"title": "metus. Vivamus euismod",
		"url": "www.google.com"
	},
	{
		"userId": 42,
		"title": "a, scelerisque sed,",
		"url": "www.google.com"
	},
	{
		"userId": 8,
		"title": "pretium aliquet, metus",
		"url": "www.google.com"
	},
	{
		"userId": 66,
		"title": "Nulla eget metus eu",
		"url": "www.google.com"
	},
	{
		"userId": 46,
		"title": "est mauris, rhoncus id, mollis",
		"url": "www.google.com"
	},
	{
		"userId": 38,
		"title": "parturient",
		"url": "www.google.com"
	},
	{
		"userId": 79,
		"title": "mollis",
		"url": "www.google.com"
	},
	{
		"userId": 94,
		"title": "cursus purus.",
		"url": "www.google.com"
	},
	{
		"userId": 85,
		"title": "sem. Nulla interdum.",
		"url": "www.google.com"
	},
	{
		"userId": 3,
		"title": "non dui nec urna suscipit",
		"url": "www.google.com"
	},
	{
		"userId": 10,
		"title": "et ultrices posuere cubilia",
		"url": "www.google.com"
	},
	{
		"userId": 4,
		"title": "mollis dui,",
		"url": "www.google.com"
	},
	{
		"userId": 65,
		"title": "penatibus et magnis",
		"url": "www.google.com"
	},
	{
		"userId": 77,
		"title": "In",
		"url": "www.google.com"
	},
	{
		"userId": 17,
		"title": "lorem, luctus ut,",
		"url": "www.google.com"
	},
	{
		"userId": 1,
		"title": "Nulla semper",
		"url": "www.google.com"
	},
	{
		"userId": 62,
		"title": "velit dui, semper et, lacinia",
		"url": "www.google.com"
	},
	{
		"userId": 44,
		"title": "vehicula aliquet libero. Integer in",
		"url": "www.google.com"
	},
	{
		"userId": 18,
		"title": "sem,",
		"url": "www.google.com"
	},
	{
		"userId": 69,
		"title": "nec urna et",
		"url": "www.google.com"
	},
	{
		"userId": 84,
		"title": "lectus sit amet luctus",
		"url": "www.google.com"
	},
	{
		"userId": 76,
		"title": "nulla",
		"url": "www.google.com"
	},
	{
		"userId": 81,
		"title": "euismod est arcu",
		"url": "www.google.com"
	},
	{
		"userId": 1,
		"title": "ac libero nec",
		"url": "www.google.com"
	},
	{
		"userId": 71,
		"title": "Proin vel arcu",
		"url": "www.google.com"
	},
	{
		"userId": 95,
		"title": "consectetuer mauris id sapien. Cras",
		"url": "www.google.com"
	},
	{
		"userId": 80,
		"title": "scelerisque sed, sapien.",
		"url": "www.google.com"
	},
	{
		"userId": 29,
		"title": "Curabitur massa.",
		"url": "www.google.com"
	},
	{
		"userId": 33,
		"title": "libero dui",
		"url": "www.google.com"
	},
	{
		"userId": 37,
		"title": "sem. Nulla",
		"url": "www.google.com"
	},
	{
		"userId": 75,
		"title": "taciti sociosqu",
		"url": "www.google.com"
	},
	{
		"userId": 35,
		"title": "nec,",
		"url": "www.google.com"
	},
	{
		"userId": 59,
		"title": "arcu. Nunc mauris. Morbi",
		"url": "www.google.com"
	},
	{
		"userId": 78,
		"title": "feugiat metus sit amet ante.",
		"url": "www.google.com"
	},
	{
		"userId": 37,
		"title": "nisl",
		"url": "www.google.com"
	},
	{
		"userId": 71,
		"title": "eleifend non, dapibus rutrum, justo.",
		"url": "www.google.com"
	},
	{
		"userId": 53,
		"title": "nec metus",
		"url": "www.google.com"
	},
	{
		"userId": 68,
		"title": "enim nisl elementum purus,",
		"url": "www.google.com"
	},
	{
		"userId": 12,
		"title": "nec orci. Donec",
		"url": "www.google.com"
	},
	{
		"userId": 30,
		"title": "et, rutrum",
		"url": "www.google.com"
	},
	{
		"userId": 14,
		"title": "posuere,",
		"url": "www.google.com"
	},
	{
		"userId": 30,
		"title": "In nec",
		"url": "www.google.com"
	},
	{
		"userId": 96,
		"title": "egestas. Fusce aliquet magna a",
		"url": "www.google.com"
	},
	{
		"userId": 77,
		"title": "aliquet,",
		"url": "www.google.com"
	},
	{
		"userId": 98,
		"title": "aliquam",
		"url": "www.google.com"
	},
	{
		"userId": 31,
		"title": "in, cursus et,",
		"url": "www.google.com"
	},
	{
		"userId": 85,
		"title": "odio",
		"url": "www.google.com"
	},
	{
		"userId": 25,
		"title": "odio",
		"url": "www.google.com"
	},
	{
		"userId": 30,
		"title": "Nunc pulvinar arcu et pede.",
		"url": "www.google.com"
	},
	{
		"userId": 48,
		"title": "non arcu. Vivamus sit",
		"url": "www.google.com"
	},
	{
		"userId": 85,
		"title": "tincidunt tempus risus. Donec",
		"url": "www.google.com"
	},
	{
		"userId": 69,
		"title": "sit amet,",
		"url": "www.google.com"
	},
	{
		"userId": 40,
		"title": "lacinia mattis.",
		"url": "www.google.com"
	},
	{
		"userId": 40,
		"title": "sagittis semper. Nam tempor diam",
		"url": "www.google.com"
	},
	{
		"userId": 43,
		"title": "Nulla semper tellus id nunc",
		"url": "www.google.com"
	},
	{
		"userId": 77,
		"title": "malesuada fames ac turpis",
		"url": "www.google.com"
	},
	{
		"userId": 87,
		"title": "varius et, euismod et,",
		"url": "www.google.com"
	},
	{
		"userId": 37,
		"title": "netus et",
		"url": "www.google.com"
	},
	{
		"userId": 47,
		"title": "mauris sit amet",
		"url": "www.google.com"
	},
	{
		"userId": 12,
		"title": "nec urna et arcu imperdiet",
		"url": "www.google.com"
	},
	{
		"userId": 79,
		"title": "purus, in molestie tortor",
		"url": "www.google.com"
	},
	{
		"userId": 40,
		"title": "mollis. Phasellus",
		"url": "www.google.com"
	},
	{
		"userId": 12,
		"title": "tincidunt",
		"url": "www.google.com"
	},
	{
		"userId": 35,
		"title": "ligula eu",
		"url": "www.google.com"
	},
	{
		"userId": 77,
		"title": "nunc id enim.",
		"url": "www.google.com"
	},
	{
		"userId": 6,
		"title": "Fusce feugiat. Lorem ipsum",
		"url": "www.google.com"
	},
	{
		"userId": 97,
		"title": "Mauris vel",
		"url": "www.google.com"
	},
	{
		"userId": 55,
		"title": "mauris erat eget ipsum.",
		"url": "www.google.com"
	},
	{
		"userId": 33,
		"title": "velit eget laoreet",
		"url": "www.google.com"
	},
	{
		"userId": 19,
		"title": "Nulla eu neque pellentesque massa",
		"url": "www.google.com"
	},
	{
		"userId": 12,
		"title": "tellus",
		"url": "www.google.com"
	},
	{
		"userId": 48,
		"title": "et libero. Proin",
		"url": "www.google.com"
	},
	{
		"userId": 91,
		"title": "in lobortis tellus justo sit",
		"url": "www.google.com"
	},
	{
		"userId": 8,
		"title": "at sem molestie sodales.",
		"url": "www.google.com"
	},
	{
		"userId": 55,
		"title": "Nullam ut nisi a",
		"url": "www.google.com"
	},
	{
		"userId": 44,
		"title": "ipsum. Suspendisse non",
		"url": "www.google.com"
	},
	{
		"userId": 99,
		"title": "ut cursus",
		"url": "www.google.com"
	},
	{
		"userId": 88,
		"title": "est ac",
		"url": "www.google.com"
	},
	{
		"userId": 33,
		"title": "libero.",
		"url": "www.google.com"
	},
	{
		"userId": 41,
		"title": "ridiculus mus.",
		"url": "www.google.com"
	},
	{
		"userId": 53,
		"title": "nibh dolor,",
		"url": "www.google.com"
	},
	{
		"userId": 76,
		"title": "rhoncus.",
		"url": "www.google.com"
	},
	{
		"userId": 58,
		"title": "magnis dis parturient montes,",
		"url": "www.google.com"
	},
	{
		"userId": 37,
		"title": "elementum sem,",
		"url": "www.google.com"
	},
	{
		"userId": 14,
		"title": "libero. Proin",
		"url": "www.google.com"
	},
	{
		"userId": 25,
		"title": "Fusce mollis. Duis sit",
		"url": "www.google.com"
	},
	{
		"userId": 5,
		"title": "auctor",
		"url": "www.google.com"
	},
	{
		"userId": 15,
		"title": "congue a, aliquet vel, vulputate",
		"url": "www.google.com"
	},
	{
		"userId": 35,
		"title": "enim commodo hendrerit.",
		"url": "www.google.com"
	},
	{
		"userId": 15,
		"title": "id enim. Curabitur",
		"url": "www.google.com"
	},
	{
		"userId": 10,
		"title": "libero",
		"url": "www.google.com"
	},
	{
		"userId": 52,
		"title": "in faucibus",
		"url": "www.google.com"
	},
	{
		"userId": 100,
		"title": "mollis non, cursus non, egestas",
		"url": "www.google.com"
	},
	{
		"userId": 65,
		"title": "ut",
		"url": "www.google.com"
	},
	{
		"userId": 76,
		"title": "varius. Nam porttitor",
		"url": "www.google.com"
	},
	{
		"userId": 82,
		"title": "dolor",
		"url": "www.google.com"
	},
	{
		"userId": 41,
		"title": "per conubia",
		"url": "www.google.com"
	},
	{
		"userId": 16,
		"title": "In scelerisque scelerisque",
		"url": "www.google.com"
	},
	{
		"userId": 88,
		"title": "et netus et malesuada fames",
		"url": "www.google.com"
	},
	{
		"userId": 86,
		"title": "ipsum dolor sit amet,",
		"url": "www.google.com"
	},
	{
		"userId": 87,
		"title": "elementum purus, accumsan",
		"url": "www.google.com"
	},
	{
		"userId": 54,
		"title": "Vestibulum",
		"url": "www.google.com"
	},
	{
		"userId": 30,
		"title": "et, magna. Praesent interdum",
		"url": "www.google.com"
	},
	{
		"userId": 3,
		"title": "sem. Nulla interdum. Curabitur dictum.",
		"url": "www.google.com"
	}
];

*/


function insertPosts(arr) {
	var n = arr.length - 1;

	function loopPosts(n) {
		if (n === -1) {
			connection.end();
			return;
		}
		else {
			//put your function name on the next line!!!
			redditAPI.createComment(arr[n], function(err, res) {
				console.log(res);
				loopPosts(n - 1);
			});
		}
	}
	loopPosts(n);
	console.log('Inserting...');
}



var testComments = [{
	"text": "augue. Sed molestie. Sed id risus quis diam luctus lobortis. Class",
	"userId": 19,
	"postId": 100
}, {
	"text": "vitae purus gravida sagittis. Duis gravida. Praesent",
	"userId": 35,
	"postId": 99
}, {
	"text": "Duis risus odio, auctor vitae, aliquet nec, imperdiet nec, leo. Morbi neque tellus, imperdiet non,",
	"userId": 6,
	"postId": 98
}, {
	"text": "eget metus eu erat semper rutrum. Fusce dolor quam, elementum at, egestas",
	"userId": 46,
	"postId": 97
}, {
	"text": "elit, pellentesque a, facilisis non, bibendum",
	"userId": 2,
	"postId": 96
}, {
	"text": "nec",
	"userId": 94,
	"postId": 95
}, {
	"text": "Curae; Donec tincidunt. Donec vitae erat vel pede blandit congue. In scelerisque scelerisque",
	"userId": 43,
	"postId": 94
}, {
	"text": "ut eros non enim commodo hendrerit. Donec porttitor tellus non magna. Nam ligula elit, pretium et, rutrum non, hendrerit id,",
	"userId": 65,
	"postId": 93
}, {
	"text": "at,",
	"userId": 77,
	"postId": 92
}, {
	"text": "vulputate mauris sagittis placerat. Cras",
	"userId": 63,
	"postId": 91
}, {
	"text": "semper",
	"userId": 26,
	"postId": 90
}, {
	"text": "diam at pretium",
	"userId": 23,
	"postId": 89
}, {
	"text": "semper",
	"userId": 23,
	"postId": 88
}, {
	"text": "elit pede, malesuada vel, venenatis",
	"userId": 73,
	"postId": 87
}, {
	"text": "non, feugiat nec, diam. Duis mi enim, condimentum eget, volutpat ornare, facilisis eget, ipsum. Donec sollicitudin adipiscing ligula. Aenean gravida",
	"userId": 30,
	"postId": 86
}, {
	"text": "libero mauris, aliquam eu, accumsan sed, facilisis vitae, orci. Phasellus dapibus quam quis diam. Pellentesque habitant morbi",
	"userId": 80,
	"postId": 85
}, {
	"text": "leo. Morbi neque tellus, imperdiet non,",
	"userId": 32,
	"postId": 84
}, {
	"text": "semper. Nam tempor diam dictum sapien. Aenean massa. Integer vitae nibh. Donec est mauris, rhoncus id, mollis nec, cursus a,",
	"userId": 99,
	"postId": 83
}, {
	"text": "sem eget massa. Suspendisse eleifend. Cras sed leo. Cras vehicula aliquet libero. Integer in magna. Phasellus dolor",
	"userId": 99,
	"postId": 82
}, {
	"text": "et magnis dis parturient montes, nascetur ridiculus",
	"userId": 30,
	"postId": 81
}, {
	"text": "Fusce dolor quam, elementum at, egestas a, scelerisque sed, sapien. Nunc pulvinar arcu et pede. Nunc sed orci lobortis augue",
	"userId": 77,
	"postId": 80
}, {
	"text": "Sed auctor odio a purus. Duis elementum, dui quis accumsan convallis, ante lectus convallis est, vitae sodales nisi",
	"userId": 82,
	"postId": 79
}, {
	"text": "facilisis vitae, orci. Phasellus dapibus quam quis diam. Pellentesque habitant morbi tristique senectus et",
	"userId": 80,
	"postId": 78
}, {
	"text": "malesuada id, erat. Etiam vestibulum massa rutrum magna. Cras convallis",
	"userId": 25,
	"postId": 77
}, {
	"text": "odio. Phasellus at augue id ante dictum cursus. Nunc mauris",
	"userId": 50,
	"postId": 76
}, {
	"text": "vulputate eu, odio. Phasellus at augue id ante dictum cursus. Nunc",
	"userId": 92,
	"postId": 75
}, {
	"text": "non massa non ante bibendum ullamcorper. Duis cursus, diam at pretium aliquet, metus urna",
	"userId": 56,
	"postId": 74
}, {
	"text": "semper tellus id nunc interdum feugiat. Sed nec metus facilisis lorem tristique aliquet. Phasellus fermentum convallis ligula. Donec luctus aliquet",
	"userId": 91,
	"postId": 73
}, {
	"text": "laoreet lectus quis massa. Mauris vestibulum, neque sed dictum eleifend, nunc risus",
	"userId": 61,
	"postId": 72
}, {
	"text": "pellentesque a, facilisis non, bibendum sed, est. Nunc laoreet lectus quis massa. Mauris vestibulum, neque sed dictum eleifend, nunc risus",
	"userId": 92,
	"postId": 71
}, {
	"text": "augue malesuada malesuada. Integer id magna et ipsum cursus vestibulum. Mauris",
	"userId": 36,
	"postId": 70
}, {
	"text": "odio. Aliquam vulputate ullamcorper magna. Sed eu eros. Nam consequat dolor vitae dolor.",
	"userId": 52,
	"postId": 69
}, {
	"text": "fringilla est.",
	"userId": 88,
	"postId": 68
}, {
	"text": "non, feugiat nec, diam. Duis mi enim, condimentum eget, volutpat ornare, facilisis eget, ipsum. Donec sollicitudin",
	"userId": 70,
	"postId": 67
}, {
	"text": "Integer vulputate, risus a ultricies adipiscing, enim mi tempor lorem,",
	"userId": 71,
	"postId": 66
}, {
	"text": "ac mattis velit justo nec ante. Maecenas",
	"userId": 96,
	"postId": 65
}, {
	"text": "malesuada augue ut lacus. Nulla tincidunt, neque vitae semper egestas, urna justo faucibus",
	"userId": 8,
	"postId": 64
}, {
	"text": "vitae risus. Duis a mi fringilla mi lacinia mattis. Integer eu lacus.",
	"userId": 56,
	"postId": 63
}, {
	"text": "elit elit fermentum risus, at fringilla purus mauris",
	"userId": 60,
	"postId": 62
}, {
	"text": "est ac facilisis facilisis, magna tellus faucibus leo, in lobortis",
	"userId": 83,
	"postId": 61
}, {
	"text": "Proin nisl sem, consequat nec, mollis vitae, posuere at,",
	"userId": 85,
	"postId": 60
}, {
	"text": "risus odio,",
	"userId": 39,
	"postId": 59
}, {
	"text": "a ultricies adipiscing, enim mi tempor lorem, eget mollis lectus pede et risus.",
	"userId": 89,
	"postId": 58
}, {
	"text": "gravida mauris ut mi. Duis risus odio, auctor vitae, aliquet nec, imperdiet nec, leo.",
	"userId": 71,
	"postId": 57
}, {
	"text": "at fringilla purus mauris a nunc. In at pede. Cras vulputate velit eu sem. Pellentesque ut ipsum ac mi eleifend",
	"userId": 55,
	"postId": 56
}, {
	"text": "neque et nunc. Quisque ornare tortor at risus. Nunc ac sem ut dolor dapibus gravida. Aliquam tincidunt,",
	"userId": 82,
	"postId": 55
}, {
	"text": "habitant morbi tristique",
	"userId": 9,
	"postId": 54
}, {
	"text": "nisl arcu iaculis enim, sit amet ornare lectus justo eu arcu. Morbi sit",
	"userId": 95,
	"postId": 53
}, {
	"text": "turpis",
	"userId": 86,
	"postId": 52
}, {
	"text": "scelerisque mollis. Phasellus",
	"userId": 79,
	"postId": 51
}, {
	"text": "lobortis augue scelerisque mollis. Phasellus libero mauris, aliquam eu, accumsan sed, facilisis vitae, orci.",
	"userId": 40,
	"postId": 50
}, {
	"text": "porttitor scelerisque neque. Nullam nisl. Maecenas malesuada fringilla est. Mauris eu turpis. Nulla",
	"userId": 52,
	"postId": 49
}, {
	"text": "in, dolor. Fusce feugiat. Lorem ipsum dolor sit amet, consectetuer adipiscing elit.",
	"userId": 69,
	"postId": 48
}, {
	"text": "fermentum convallis ligula. Donec",
	"userId": 29,
	"postId": 47
}, {
	"text": "id, ante. Nunc mauris",
	"userId": 11,
	"postId": 46
}, {
	"text": "Integer vulputate, risus a ultricies adipiscing, enim mi tempor lorem, eget mollis lectus pede et risus.",
	"userId": 66,
	"postId": 45
}, {
	"text": "fringilla ornare placerat, orci",
	"userId": 62,
	"postId": 44
}, {
	"text": "tellus faucibus leo, in lobortis",
	"userId": 36,
	"postId": 43
}, {
	"text": "vel est tempor bibendum. Donec felis orci, adipiscing non, luctus sit amet, faucibus ut, nulla. Cras eu tellus",
	"userId": 67,
	"postId": 42
}, {
	"text": "ligula. Nullam feugiat placerat velit. Quisque varius.",
	"userId": 76,
	"postId": 41
}, {
	"text": "quis diam luctus lobortis. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per",
	"userId": 64,
	"postId": 40
}, {
	"text": "molestie in, tempus eu, ligula. Aenean euismod mauris",
	"userId": 43,
	"postId": 39
}, {
	"text": "elementum at, egestas a, scelerisque sed, sapien. Nunc pulvinar arcu et pede.",
	"userId": 93,
	"postId": 38
}, {
	"text": "aliquam, enim nec tempus scelerisque, lorem ipsum sodales purus, in molestie tortor nibh sit amet orci. Ut sagittis",
	"userId": 74,
	"postId": 37
}, {
	"text": "sed pede",
	"userId": 47,
	"postId": 36
}, {
	"text": "a, aliquet vel, vulputate eu,",
	"userId": 62,
	"postId": 35
}, {
	"text": "aliquet molestie tellus. Aenean egestas hendrerit neque.",
	"userId": 55,
	"postId": 34
}, {
	"text": "blandit mattis. Cras eget nisi dictum augue malesuada malesuada. Integer id magna et",
	"userId": 92,
	"postId": 33
}, {
	"text": "enim consequat purus. Maecenas libero est, congue a, aliquet vel, vulputate eu,",
	"userId": 17,
	"postId": 32
}, {
	"text": "Donec non justo. Proin non massa non ante bibendum ullamcorper. Duis cursus, diam",
	"userId": 58,
	"postId": 31
}, {
	"text": "non enim. Mauris quis turpis vitae purus gravida",
	"userId": 48,
	"postId": 30
}, {
	"text": "sollicitudin commodo ipsum. Suspendisse non leo. Vivamus nibh dolor, nonummy ac, feugiat",
	"userId": 41,
	"postId": 29
}, {
	"text": "ante dictum mi, ac mattis velit justo nec ante. Maecenas mi felis, adipiscing fringilla, porttitor vulputate,",
	"userId": 8,
	"postId": 28
}, {
	"text": "faucibus orci",
	"userId": 89,
	"postId": 27
}, {
	"text": "lobortis ultrices. Vivamus rhoncus. Donec est. Nunc ullamcorper, velit in aliquet lobortis, nisi nibh lacinia orci, consectetuer euismod est",
	"userId": 64,
	"postId": 26
}, {
	"text": "metus. Aliquam erat volutpat. Nulla facilisis. Suspendisse commodo tincidunt nibh. Phasellus nulla. Integer vulputate, risus a ultricies adipiscing, enim",
	"userId": 64,
	"postId": 25
}, {
	"text": "consectetuer adipiscing elit. Curabitur sed tortor. Integer aliquam adipiscing lacus. Ut nec urna",
	"userId": 37,
	"postId": 24
}, {
	"text": "tincidunt, nunc ac mattis ornare, lectus ante dictum mi, ac mattis velit justo nec ante. Maecenas mi",
	"userId": 91,
	"postId": 23
}, {
	"text": "Sed eu eros. Nam",
	"userId": 34,
	"postId": 22
}, {
	"text": "pretium et, rutrum",
	"userId": 22,
	"postId": 21
}, {
	"text": "aliquet, sem ut cursus luctus, ipsum leo elementum sem,",
	"userId": 70,
	"postId": 20
}, {
	"text": "ante. Nunc mauris sapien, cursus in, hendrerit consectetuer, cursus et, magna. Praesent interdum ligula eu enim.",
	"userId": 58,
	"postId": 19
}, {
	"text": "erat. Etiam vestibulum massa rutrum magna. Cras convallis convallis dolor. Quisque tincidunt pede ac urna.",
	"userId": 47,
	"postId": 18
}, {
	"text": "ultricies sem magna nec quam. Curabitur vel lectus.",
	"userId": 10,
	"postId": 17
}, {
	"text": "facilisis, magna tellus faucibus leo, in lobortis tellus justo",
	"userId": 95,
	"postId": 16
}, {
	"text": "feugiat.",
	"userId": 30,
	"postId": 15
}, {
	"text": "sociis natoque penatibus et magnis dis parturient montes,",
	"userId": 71,
	"postId": 14
}, {
	"text": "lectus quis massa. Mauris vestibulum, neque sed dictum eleifend, nunc risus varius orci, in consequat enim diam vel arcu.",
	"userId": 7,
	"postId": 13
}, {
	"text": "consequat purus. Maecenas libero est, congue a, aliquet vel, vulputate eu, odio. Phasellus at",
	"userId": 45,
	"postId": 12
}, {
	"text": "facilisi. Sed neque. Sed eget lacus. Mauris",
	"userId": 19,
	"postId": 11
}, {
	"text": "nibh dolor, nonummy ac, feugiat non, lobortis quis, pede. Suspendisse dui. Fusce diam nunc, ullamcorper eu,",
	"userId": 56,
	"postId": 10
}, {
	"text": "Lorem ipsum dolor sit amet,",
	"userId": 51,
	"postId": 9
}, {
	"text": "tempus, lorem fringilla ornare placerat, orci lacus vestibulum lorem, sit",
	"userId": 48,
	"postId": 8
}, {
	"text": "Pellentesque tincidunt",
	"userId": 65,
	"postId": 7
}, {
	"text": "ornare,",
	"userId": 50,
	"postId": 6
}, {
	"text": "neque. Nullam nisl. Maecenas malesuada fringilla est. Mauris eu turpis.",
	"userId": 55,
	"postId": 5
}, {
	"text": "semper tellus",
	"userId": 29,
	"postId": 4
}, {
	"text": "Quisque imperdiet, erat nonummy ultricies ornare, elit elit fermentum risus, at",
	"userId": 53,
	"postId": 3
}, {
	"text": "ante dictum mi,",
	"userId": 93,
	"postId": 2
}, {
	"text": "interdum enim non nisi. Aenean eget metus. In nec orci. Donec",
	"userId": 27,
	"postId": 1
}]






/*
redditAPI.getAllPosts(function(err,res){
    console.log(res)
    connection.end();
});
*/

/*
redditAPI.getAllPostsForUser(88, function(err,res){
    //console.log(res)
    connection.end();
});
*/
/*
redditAPI.getSinglePost(88, function(err,res){
    console.log(res)
    connection.end();
});

*/
// redditAPI.createSubreddit({name:"bla", description:"aldfjalsdkha;d"},function(err,res){
//     console.log(err)
//     connection.end();
//});

/*
redditAPI.getAllSubreddits(function(){
  console.log('yay!');
});

*/
/*
redditAPI.createComment({text: "asdf", userId:"8", postId: "8", parentId: "1"}, function(err,res){
     console.log(res)
     connection.end();
 });
*/
/*
UPDATE posts
SET subredditId=1
WHERE id = 1 or id = 2 or id = 3 or id = 4 or id = 5 or id = 6 or id = 7 or id = 8 or id = 9 or id = 10;
UPDATE posts
SET subredditId=3
WHERE id = 11 or id = 12 or id = 13 or id = 14 or id = 15 or id = 16 or id = 17 or id = 18 or id = 19 or id = 20;
UPDATE posts
SET subredditId=4
WHERE id = 21 or id = 22 or id = 23 or id = 24 or id = 25 or id = 26 or id = 27 or id = 28 or id = 29 or id = 30;
UPDATE posts
SET subredditId=5
WHERE id = 31 or id = 32 or id = 33 or id = 34 or id = 35 or id = 36 or id = 37 or id = 38 or id = 39 or id = 40;
UPDATE posts
SET subredditId=6
WHERE id = 41 or id = 42 or id = 43 or id = 44 or id = 45 or id = 46 or id = 47 or id = 48 or id = 49 or id = 50;
UPDATE posts
SET subredditId=7
WHERE id = 51 or id = 52 or id = 53 or id = 54 or id = 55 or id = 56 or id = 57 or id = 58 or id = 59 or id = 60;
UPDATE posts
SET subredditId=8
WHERE id = 61 or id = 62 or id = 63 or id = 64 or id = 65 or id = 66 or id = 67 or id = 68 or id = 69 or id = 70;
UPDATE posts
SET subredditId=9
WHERE id = 71 or id = 72 or id = 73 or id = 74 or id = 75 or id = 76 or id = 77 or id = 78 or id = 79 or id = 80;
UPDATE posts
SET subredditId=10
WHERE id = 81 or id = 82 or id = 83 or id = 84 or id = 85 or id = 86 or id = 87 or id = 88 or id = 89 or id = 90;
UPDATE posts
SET subredditId=11
WHERE id = 91 or id = 92 or id = 93 or id = 94 or id = 95 or id = 96 or id = 97 or id = 98 or id = 99 or id = 100;
UPDATE posts
SET subredditId=12
WHERE id = 101 or id = 102 or id = 103 or id = 104 or id = 105 or id = 106 or id = 107 or id = 108 or id = 109 or id = 110;
UPDATE posts
SET subredditId=13
WHERE id = 111 or id = 112 or id = 113 or id = 114 or id = 115 or id = 116 or id = 117 or id = 118 or id = 119 or id = 120;
UPDATE posts
SET subredditId=14
WHERE id = 121 or id = 122 or id = 123 or id = 124 or id = 125 or id = 126 or id = 127 or id = 128 or id = 129 or id = 130;
UPDATE posts
SET subredditId=15
WHERE id = 131 or id = 132 or id = 133 or id = 134 or id = 135 or id = 136 or id = 137 or id = 138 or id = 139 or id = 140;
UPDATE posts
SET subredditId=16
WHERE id = 141 or id = 142 or id = 143 or id = 144 or id = 145 or id = 146 or id = 147 or id = 148 or id = 149 or id = 150;
UPDATE posts
SET subredditId=17
WHERE id = 151 or id = 152 or id = 153 or id = 154 or id = 155 or id = 156 or id = 157 or id = 158 or id = 159 or id = 160;
UPDATE posts
SET subredditId=18
WHERE id = 171 or id = 172 or id = 173 or id = 174 or id = 175 or id = 176 or id = 177 or id = 178 or id = 179 or id = 180;
UPDATE posts
SET subredditId=19
WHERE id = 181 or id = 182 or id = 183 or id = 184 or id = 185 or id = 186 or id = 187 or id = 188 or id = 189 or id = 190;
UPDATE posts
SET subredditId=20
WHERE id = 191 or id = 192 or id = 193 or id = 194 or id = 195 or id = 196 or id = 197 or id = 198 or id = 199;

UPDATE posts
SET subredditId=2
WHERE id = 161 or id = 162 or id = 163 or id = 164 or id = 165 or id = 166 or id = 167 or id = 168 or id = 169 or id = 170;
*/

// var createComment = function(comment, callback) {
//   conn.query(
//     'INSERT INTO comments (text, userId, postId, parentId) VALUES (?, ?, ?, ?)', [comment.text, userId, comment.postId, comment.parentId],
//     function(err, result) {
//       if (err) {
//         callback(err);
//       }
//       else {
//         /*
//         Post inserted successfully. Let's use the result.insertId to retrieve
//         the post and send it to the caller!
//         */
//         conn.query(
//           'SELECT text, userId, postId, parentId FROM comments WHERE id = ?', [comments.commentId],
//           function(err, result) {
//             if (err) {
//               callback(err);
//             }
//             else {
//               callback(null, result[0]);
//             }
//           }
//         );
//       }
//     }
//   );
// }


// var testCommentObject = {
//   text: "lolLOL answer blablalba",
//   userId: 22,
//   postId: 1,
//   parentId: 1

// };

// redditAPI.createComment(testCommentObject, function(err, res){
// 	console.log(res);
// 	connection.end();
// });


var testReplyComments = [{
	"text": "Fusce fermentum fermentum arcu. Vestibulum ante ipsum primis in faucibus orci luctus",
	"userId": 6,
	"postId": 200,
	"parentId": 100
}, {
	"text": "accumsan sed,",
	"userId": 20,
	"postId": 199,
	"parentId": 99
}, {
	"text": "Nunc sed orci lobortis augue scelerisque mollis. Phasellus libero",
	"userId": 28,
	"postId": 198,
	"parentId": 98
}, {
	"text": "Pellentesque ultricies",
	"userId": 86,
	"postId": 197,
	"parentId": 97
}, {
	"text": "eu, accumsan sed, facilisis vitae, orci. Phasellus dapibus quam quis diam. Pellentesque habitant morbi tristique senectus et netus",
	"userId": 94,
	"postId": 196,
	"parentId": 96
}, {
	"text": "placerat. Cras dictum",
	"userId": 32,
	"postId": 195,
	"parentId": 95
}, {
	"text": "est, congue a, aliquet vel, vulputate eu, odio. Phasellus at augue id ante",
	"userId": 20,
	"postId": 194,
	"parentId": 94
}, {
	"text": "magna sed dui. Fusce aliquam, enim nec tempus scelerisque, lorem ipsum sodales purus, in molestie tortor nibh sit amet",
	"userId": 9,
	"postId": 193,
	"parentId": 93
}, {
	"text": "tempor erat neque non quam.",
	"userId": 22,
	"postId": 192,
	"parentId": 92
}, {
	"text": "vitae erat vel pede blandit congue. In scelerisque scelerisque dui. Suspendisse ac metus vitae velit",
	"userId": 5,
	"postId": 191,
	"parentId": 91
}, {
	"text": "gravida molestie arcu. Sed eu nibh vulputate mauris sagittis placerat. Cras dictum ultricies ligula. Nullam enim.",
	"userId": 16,
	"postId": 190,
	"parentId": 90
}, {
	"text": "fringilla, porttitor",
	"userId": 67,
	"postId": 189,
	"parentId": 89
}, {
	"text": "adipiscing elit. Etiam laoreet, libero et tristique pellentesque, tellus sem mollis dui, in",
	"userId": 49,
	"postId": 188,
	"parentId": 88
}, {
	"text": "vulputate mauris sagittis placerat. Cras dictum ultricies",
	"userId": 4,
	"postId": 187,
	"parentId": 87
}, {
	"text": "fringilla,",
	"userId": 57,
	"postId": 186,
	"parentId": 86
}, {
	"text": "turpis egestas. Fusce aliquet",
	"userId": 50,
	"postId": 185,
	"parentId": 85
}, {
	"text": "magnis dis parturient montes, nascetur ridiculus mus. Donec dignissim magna a tortor. Nunc commodo auctor velit. Aliquam nisl.",
	"userId": 58,
	"postId": 184,
	"parentId": 84
}, {
	"text": "eu erat semper rutrum. Fusce dolor quam, elementum at, egestas a, scelerisque",
	"userId": 9,
	"postId": 183,
	"parentId": 83
}, {
	"text": "Mauris magna. Duis dignissim tempor arcu. Vestibulum ut eros",
	"userId": 70,
	"postId": 182,
	"parentId": 82
}, {
	"text": "tincidunt, neque vitae semper egestas, urna justo faucibus lectus, a sollicitudin orci sem eget massa. Suspendisse eleifend.",
	"userId": 38,
	"postId": 181,
	"parentId": 81
}, {
	"text": "fringilla. Donec feugiat metus",
	"userId": 75,
	"postId": 180,
	"parentId": 80
}, {
	"text": "euismod in,",
	"userId": 65,
	"postId": 179,
	"parentId": 79
}, {
	"text": "pede, nonummy ut, molestie in, tempus eu, ligula. Aenean euismod",
	"userId": 96,
	"postId": 178,
	"parentId": 78
}, {
	"text": "ut dolor dapibus gravida.",
	"userId": 10,
	"postId": 177,
	"parentId": 77
}, {
	"text": "egestas",
	"userId": 50,
	"postId": 176,
	"parentId": 76
}, {
	"text": "in felis. Nulla tempor augue ac ipsum. Phasellus vitae",
	"userId": 57,
	"postId": 175,
	"parentId": 75
}, {
	"text": "elementum",
	"userId": 19,
	"postId": 174,
	"parentId": 74
}, {
	"text": "elementum purus,",
	"userId": 71,
	"postId": 173,
	"parentId": 73
}, {
	"text": "eu odio tristique pharetra. Quisque ac libero nec ligula consectetuer rhoncus. Nullam velit",
	"userId": 45,
	"postId": 172,
	"parentId": 72
}, {
	"text": "cursus. Nunc mauris elit, dictum",
	"userId": 75,
	"postId": 171,
	"parentId": 71
}, {
	"text": "leo elementum sem, vitae aliquam eros turpis non enim. Mauris quis turpis vitae purus gravida sagittis. Duis gravida. Praesent",
	"userId": 66,
	"postId": 170,
	"parentId": 70
}, {
	"text": "nec, eleifend non, dapibus rutrum, justo. Praesent luctus. Curabitur",
	"userId": 77,
	"postId": 169,
	"parentId": 69
}, {
	"text": "fringilla purus mauris a nunc. In at pede. Cras vulputate velit eu sem. Pellentesque",
	"userId": 20,
	"postId": 168,
	"parentId": 68
}, {
	"text": "arcu. Morbi sit amet",
	"userId": 94,
	"postId": 167,
	"parentId": 67
}, {
	"text": "tristique senectus et netus et malesuada fames ac turpis",
	"userId": 8,
	"postId": 166,
	"parentId": 66
}, {
	"text": "velit in aliquet lobortis, nisi",
	"userId": 11,
	"postId": 165,
	"parentId": 65
}, {
	"text": "nec, cursus a, enim. Suspendisse aliquet, sem ut cursus",
	"userId": 81,
	"postId": 164,
	"parentId": 64
}, {
	"text": "tristique ac, eleifend vitae, erat. Vivamus nisi. Mauris nulla. Integer urna. Vivamus",
	"userId": 41,
	"postId": 163,
	"parentId": 63
}, {
	"text": "Praesent luctus. Curabitur egestas",
	"userId": 46,
	"postId": 162,
	"parentId": 62
}, {
	"text": "tincidunt pede ac urna. Ut tincidunt",
	"userId": 12,
	"postId": 161,
	"parentId": 61
}, {
	"text": "placerat velit. Quisque varius. Nam porttitor scelerisque neque. Nullam nisl. Maecenas malesuada fringilla est. Mauris",
	"userId": 79,
	"postId": 160,
	"parentId": 60
}, {
	"text": "Proin",
	"userId": 3,
	"postId": 159,
	"parentId": 59
}, {
	"text": "senectus et netus et malesuada fames ac turpis egestas. Aliquam fringilla cursus purus. Nullam scelerisque neque sed sem egestas blandit.",
	"userId": 20,
	"postId": 158,
	"parentId": 58
}, {
	"text": "tempor diam dictum sapien. Aenean massa. Integer vitae nibh. Donec est mauris, rhoncus id, mollis nec, cursus a, enim.",
	"userId": 20,
	"postId": 157,
	"parentId": 57
}, {
	"text": "ac mattis velit justo nec ante. Maecenas mi felis, adipiscing fringilla, porttitor",
	"userId": 61,
	"postId": 156,
	"parentId": 56
}, {
	"text": "ac mattis ornare, lectus ante dictum mi, ac mattis velit",
	"userId": 78,
	"postId": 155,
	"parentId": 55
}, {
	"text": "libero lacus, varius et,",
	"userId": 80,
	"postId": 154,
	"parentId": 54
}, {
	"text": "eu eros. Nam consequat dolor vitae dolor. Donec fringilla. Donec",
	"userId": 83,
	"postId": 153,
	"parentId": 53
}, {
	"text": "Quisque varius. Nam porttitor scelerisque neque. Nullam nisl. Maecenas malesuada fringilla est. Mauris eu turpis. Nulla aliquet. Proin",
	"userId": 6,
	"postId": 152,
	"parentId": 52
}, {
	"text": "vel, convallis in, cursus et,",
	"userId": 66,
	"postId": 151,
	"parentId": 51
}, {
	"text": "eu dui. Cum sociis natoque penatibus et",
	"userId": 85,
	"postId": 150,
	"parentId": 50
}, {
	"text": "luctus, ipsum leo elementum sem, vitae aliquam eros turpis non enim. Mauris quis turpis vitae",
	"userId": 26,
	"postId": 149,
	"parentId": 49
}, {
	"text": "massa lobortis ultrices. Vivamus rhoncus.",
	"userId": 26,
	"postId": 148,
	"parentId": 48
}, {
	"text": "scelerisque mollis. Phasellus libero mauris, aliquam eu,",
	"userId": 39,
	"postId": 147,
	"parentId": 47
}, {
	"text": "lorem semper auctor. Mauris vel turpis. Aliquam adipiscing lobortis risus. In mi pede, nonummy",
	"userId": 80,
	"postId": 146,
	"parentId": 46
}, {
	"text": "Nunc mauris sapien, cursus in, hendrerit consectetuer, cursus et, magna. Praesent interdum ligula eu enim.",
	"userId": 10,
	"postId": 145,
	"parentId": 45
}, {
	"text": "et magnis dis parturient montes, nascetur ridiculus",
	"userId": 25,
	"postId": 144,
	"parentId": 44
}, {
	"text": "egestas hendrerit neque.",
	"userId": 73,
	"postId": 143,
	"parentId": 43
}, {
	"text": "malesuada id, erat. Etiam vestibulum massa rutrum magna. Cras convallis",
	"userId": 17,
	"postId": 142,
	"parentId": 42
}, {
	"text": "convallis in, cursus et, eros. Proin ultrices. Duis volutpat nunc sit amet metus. Aliquam erat volutpat. Nulla facilisis. Suspendisse",
	"userId": 60,
	"postId": 141,
	"parentId": 41
}, {
	"text": "lectus convallis est, vitae sodales nisi magna sed dui. Fusce aliquam, enim nec",
	"userId": 20,
	"postId": 140,
	"parentId": 40
}, {
	"text": "ut eros non enim commodo hendrerit. Donec porttitor tellus non magna. Nam",
	"userId": 89,
	"postId": 139,
	"parentId": 39
}, {
	"text": "adipiscing lacus. Ut",
	"userId": 76,
	"postId": 138,
	"parentId": 38
}, {
	"text": "nostra, per",
	"userId": 42,
	"postId": 137,
	"parentId": 37
}, {
	"text": "nonummy ultricies ornare, elit elit fermentum risus, at fringilla purus mauris a nunc. In at pede. Cras vulputate velit eu",
	"userId": 30,
	"postId": 136,
	"parentId": 36
}, {
	"text": "malesuada fringilla est. Mauris eu turpis. Nulla aliquet. Proin velit. Sed malesuada augue ut lacus. Nulla",
	"userId": 45,
	"postId": 135,
	"parentId": 35
}, {
	"text": "a, facilisis non, bibendum sed,",
	"userId": 17,
	"postId": 134,
	"parentId": 34
}, {
	"text": "sagittis augue, eu tempor erat neque non quam. Pellentesque habitant morbi tristique senectus et netus",
	"userId": 23,
	"postId": 133,
	"parentId": 33
}, {
	"text": "eu metus. In lorem. Donec elementum, lorem ut",
	"userId": 98,
	"postId": 132,
	"parentId": 32
}, {
	"text": "est. Nunc laoreet lectus quis massa. Mauris vestibulum, neque sed dictum eleifend, nunc risus varius orci, in",
	"userId": 31,
	"postId": 131,
	"parentId": 31
}, {
	"text": "quis massa. Mauris vestibulum, neque sed dictum eleifend, nunc risus varius orci,",
	"userId": 11,
	"postId": 130,
	"parentId": 30
}, {
	"text": "aliquet nec, imperdiet nec, leo. Morbi neque tellus, imperdiet non, vestibulum nec, euismod in, dolor. Fusce",
	"userId": 42,
	"postId": 129,
	"parentId": 29
}, {
	"text": "velit in aliquet lobortis, nisi nibh lacinia orci, consectetuer euismod est arcu ac orci. Ut semper pretium",
	"userId": 74,
	"postId": 128,
	"parentId": 28
}, {
	"text": "erat volutpat. Nulla dignissim. Maecenas ornare egestas ligula. Nullam feugiat placerat velit. Quisque varius. Nam porttitor scelerisque neque.",
	"userId": 32,
	"postId": 127,
	"parentId": 27
}, {
	"text": "consectetuer euismod est arcu ac orci. Ut semper pretium neque. Morbi quis urna. Nunc quis",
	"userId": 37,
	"postId": 126,
	"parentId": 26
}, {
	"text": "sit amet nulla. Donec non justo. Proin non massa non ante bibendum ullamcorper. Duis cursus, diam at pretium aliquet,",
	"userId": 35,
	"postId": 125,
	"parentId": 25
}, {
	"text": "id enim. Curabitur massa. Vestibulum accumsan neque et nunc. Quisque ornare tortor at risus. Nunc ac sem ut dolor dapibus",
	"userId": 30,
	"postId": 124,
	"parentId": 24
}, {
	"text": "quam quis diam. Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Fusce aliquet",
	"userId": 89,
	"postId": 123,
	"parentId": 23
}, {
	"text": "malesuada fringilla est. Mauris",
	"userId": 27,
	"postId": 122,
	"parentId": 22
}, {
	"text": "diam eu dolor egestas rhoncus. Proin nisl sem, consequat nec, mollis",
	"userId": 23,
	"postId": 121,
	"parentId": 21
}, {
	"text": "rhoncus. Nullam velit dui, semper et, lacinia vitae, sodales at,",
	"userId": 74,
	"postId": 120,
	"parentId": 20
}, {
	"text": "orci, consectetuer",
	"userId": 27,
	"postId": 119,
	"parentId": 19
}, {
	"text": "Nunc ut erat. Sed nunc est, mollis non, cursus non, egestas a, dui.",
	"userId": 60,
	"postId": 118,
	"parentId": 18
}, {
	"text": "lorem, vehicula et, rutrum eu, ultrices sit amet, risus. Donec nibh enim, gravida sit amet, dapibus id, blandit",
	"userId": 87,
	"postId": 117,
	"parentId": 17
}, {
	"text": "feugiat tellus lorem eu metus. In lorem.",
	"userId": 91,
	"postId": 116,
	"parentId": 16
}, {
	"text": "nec mauris blandit mattis. Cras eget nisi",
	"userId": 83,
	"postId": 115,
	"parentId": 15
}, {
	"text": "dui, in sodales elit erat vitae risus. Duis a mi fringilla mi lacinia mattis. Integer eu lacus.",
	"userId": 39,
	"postId": 114,
	"parentId": 14
}, {
	"text": "turpis non enim. Mauris quis",
	"userId": 7,
	"postId": 113,
	"parentId": 13
}, {
	"text": "Fusce diam nunc, ullamcorper eu, euismod ac, fermentum vel, mauris.",
	"userId": 37,
	"postId": 112,
	"parentId": 12
}, {
	"text": "Pellentesque ultricies",
	"userId": 4,
	"postId": 111,
	"parentId": 11
}, {
	"text": "iaculis aliquet diam. Sed diam lorem, auctor quis, tristique ac, eleifend vitae, erat. Vivamus nisi. Mauris nulla. Integer",
	"userId": 64,
	"postId": 110,
	"parentId": 10
}, {
	"text": "eget lacus. Mauris non dui nec urna suscipit nonummy. Fusce fermentum fermentum arcu. Vestibulum",
	"userId": 84,
	"postId": 109,
	"parentId": 9
}, {
	"text": "malesuada malesuada. Integer id magna et ipsum cursus vestibulum. Mauris magna. Duis dignissim tempor arcu. Vestibulum ut eros non enim",
	"userId": 91,
	"postId": 108,
	"parentId": 8
}, {
	"text": "tempor bibendum. Donec felis",
	"userId": 7,
	"postId": 107,
	"parentId": 7
}, {
	"text": "mi eleifend egestas. Sed pharetra, felis eget varius ultrices, mauris ipsum porta elit, a feugiat",
	"userId": 45,
	"postId": 106,
	"parentId": 6
}, {
	"text": "primis in faucibus",
	"userId": 64,
	"postId": 105,
	"parentId": 5
}, {
	"text": "non, bibendum sed, est. Nunc laoreet lectus quis massa. Mauris vestibulum,",
	"userId": 80,
	"postId": 104,
	"parentId": 4
}, {
	"text": "neque non quam.",
	"userId": 1,
	"postId": 103,
	"parentId": 3
}, {
	"text": "fringilla est. Mauris eu turpis. Nulla aliquet. Proin velit. Sed",
	"userId": 97,
	"postId": 102,
	"parentId": 2
}, {
	"text": "Ut sagittis",
	"userId": 18,
	"postId": 101,
	"parentId": 1
}];

//insertPosts(testReplyComments);
//console.log(testReplyComments);

 //redditAPI.getCommentsForPost(1, function(err,res){
 //    if (err){
 //    	console.log(err.stack)
 //    } else {
 //    	console.log(JSON.stringify(res, null, 4));
 //    }
 //    connection.end();
 //});

/*
var testCommentObject = {
  text: "Im a reply of a reply",
  userId: 10,
  postId: 2,
  parentId: null
};

redditAPI.createComment(testCommentObject,function(err,res){
	console.log(res);
});
*/
/*
redditAPI.createOrUpdateVote({postId: 3, userId: 1, vote:1}, function(err,res){

});
redditAPI.createOrUpdateVote({postId: 1, userId: 2, vote:1}, function(err,res){

});
redditAPI.createOrUpdateVote({postId: 8, userId: 3, vote:1}, function(err,res){

});
*/
/*
redditAPI.createOrUpdateVote({postId: 7, userId: 4, vote:0}, function(err,res){

});


redditAPI.createOrUpdateVote({postId: 6, userId: 5, vote:1}, function(err,res){
	
});


redditAPI.createOrUpdateVote({postId: 5, userId: 6, vote:0}, function(err,res){


});redditAPI.createOrUpdateVote({postId: 4, userId: 7, vote:-1}, function(err,res){


});redditAPI.createOrUpdateVote({postId: 3, userId: 8, vote:1}, function(err,res){

	
});
redditAPI.createOrUpdateVote({postId: 2, userId: 9, vote:0}, function(err,res){


});
redditAPI.createOrUpdateVote({postId: 1, userId: 10, vote:-1}, function(err,res){
connection.end();
});
*/
/*
redditAPI.getAllPosts("hot", function(err,res){
    console.log(res)
     connection.end();
});

*/
/*
redditAPI.getCommentsForPost(1, function(err, comments) {
  
  var finalComments = [];
  
  var commentsIndex = {};
  
  comments.forEach(function(commentGroup) {
    var comment1;
    if (commentsIndex[commentGroup.c1_id]) {
      comment1 = commentsIndex[commentGroup.c1_id];
    }
    else {
      comment1 = {
        id: commentGroup.c1_id,
        text: commentGroup.c1_text,
        parentId: commentGroup.c1_parentId,
        replies: []
      };
      
      // put the comment in the index by its id
      commentsIndex[commentGroup.c1_id] = comment1;
     
      
      // put it in the final result array
      finalComments.push(comment1);
    }
    
    if (commentGroup.c2_id === null) {
      return;
    }
    
    var comment2;
    if (commentsIndex[commentGroup.c2_id]) {
      comment2 = commentsIndex[commentGroup.c2_id];
    }
    else {
      comment2 = {
        id: commentGroup.c2_id,
        text: commentGroup.c2_text,
        parentId: commentGroup.c2_parentId,
        replies: []
      }
      
      // put the comment in the index by its id
      commentsIndex[commentGroup.c2_id] = comment2;
      
      // put it in the final result array
      comment1.replies.push(comment2);
    }
    
    if (commentGroup.c3_id !== null) {
      comment2.replies.push({
        id: commentGroup.c3_id,
        text: commentGroup.c3_text,
        parentId: commentGroup.c3_parentId
      });
    }
    
  });
   console.log(JSON.stringify(commentsIndex, null, 4));
  //console.log(JSON.stringify(finalComments, null, 4));
});
  */
/*
redditAPI.createUser({
	username: 'JohnSmith',
	password: 'xxx'
}, function(err, user) {
	if (err) {
		console.log(err);
	}
	else {

		redditAPI.createPost({
			title: 'hi reddit!',
			url: 'https://www.reddit.com',
			userId: 1
		}, function(err, post) {
			if (err) {
				console.log(err);
			}
			else {
				console.log(post);
			}
		});
	}
});
*/

/*
redditAPI.createPost({
        url: 'www.reddit.com',
        title: 'what a reddit',
        userId: 5
    }, 5, function(err, res){
    	console.log(err, res);
    })
    */
/*    
redditAPI.getVotescoreForPost(1,function(err,res){
		console.log(res);
})
*/