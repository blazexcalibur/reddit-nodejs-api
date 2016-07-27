-- This creates the users table. The username field is constrained to unique
-- values only, by using a UNIQUE KEY on that column
CREATE TABLE `users` (
  `id` INT(11) NOT NULL AUTO_INCREMENT,
  `username` VARCHAR(50) NOT NULL,
  `password` VARCHAR(60) NOT NULL,
  `createdAt` DATETIME NOT NULL,
  `updatedAt` DATETIME NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `username` (`username`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- This creates the posts table. The userId column references the id column of
-- users. If a user is deleted, the corresponding posts' userIds will be set NULL.
CREATE TABLE `posts` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `title` varchar(300) DEFAULT NULL,
  `url` varchar(2000) DEFAULT NULL,
  `userId` int(11) DEFAULT NULL,
  `createdAt` DATETIME NOT NULL,
  `updatedAt` DATETIME NOT NULL,
  PRIMARY KEY (`id`),
  KEY `userId` (`userId`),
  CONSTRAINT `posts_ibfk_1` FOREIGN KEY (`userId`) REFERENCES `users` (`id`) ON DELETE SET NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--create subreddits table with name as unique key

create table subreddits (
    id int auto_increment primary key,
    name varchar(30), 
    description varchar(200),
    createdAt datetime,
    updatedAT datetime,
    unique(name)
);

alter table posts add column subredditId int, add foreign key (subredditId) references subreddits(id);

--create a comments table

CREATE table comments (
  id int auto_increment primary key,
  text VARCHAR(10000),
  createdAt DATETIME,
  updatedAt TIMESTAMP,
  userId INT(11),
  postId INT(11),
  parentId INT(11) DEFAULT NULL,
  FOREIGN KEY (userId) REFERENCES users(id),
  FOREIGN KEY (postId) REFERENCES posts(id),
  FOREIGN KEY (parentId)REFERENCES comments(id)
); 


--A table for upvotage!

CREATE table votes (
  userId INT(11),
  postId INT(11),
  vote TINYINT,
  createdAt datetime,
  updatedAT timestamp,
  primary key (userId, postId),
  FOREIGN KEY (userId) REFERENCES users(id),
  FOREIGN KEY (postId) REFERENCES posts(id)
);


--A table for cookies

CREATE table sessions (
  userId INT(11),
  token VARCHAR(100)
);