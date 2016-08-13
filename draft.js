/*
select p.id as id,p.title as title,p.url as url,p.userId as postsUserId,p.createdAt as createdAt, p.updatedAt as postsCreatedAt, u.id as userId, u.username as userName, u.createdAt as userCreatedAt, u.updatedAt as userUpdatedAt  FROM posts as p JOIN users as u ON p.userId=u.id order by p.createdAt DESC limit 5;

create table AddressBook (
    id int auto_increment primary key,
    accountId int,
    name varchar(255), 
    createdOn datetime,
    modifiedOn datetime
);


alter table posts add column subredditId int, add foreign key (subredditId) references subreddits(id);

select p.id as postId,p.title as postTitle,p.url as postUrl,p.userId as postsUserId,p.createdAt as postCreatedAt, p.updatedAt as postsUpdatedAt, u.id as userId, u.username as userName, u.createdAt as userCreatedAt, u.updatedAt as userUpdatedAt, s.id subredditId, s.name subredditName, s.description subredditDescription, s.createdAt subredditCreatedAt, s.updatedAt subredditUpdatedAt  FROM posts as p JOIN users as u ON p.userId=u.id JOIN subreddits s ON p.subredditId=s.id order by p.createdAt DESC\G;

select * FROM posts as p JOIN comments as c ON p.userId=u.id  
 
select * FROM posts as p JOIN votes as v ON posts.Id=votes.postId;


if(count(if(vote=1, 1, null)) < count(if(vote=-1, 1, null)), (sum(vote) * count(if(vote=1, 1, null)) / count(if(vote=-1, 1, null)), (sum(vote) * count(if(vote=-1, 1, null))) / (count(if(vote=1, 1, null)))


select if(count(if(vote=1, 1, null)) < count(if(vote=-1, 1, null)), sum(vote) * count(if(vote=1, 1, null)) / count(if(vote=-1, 1, null)), (sum(vote) * count(if(vote=-1, 1, null))) / count(if(vote=1, 1, null)) from votes;


function getCommentsForPost(postId, callback) {
  connection.query(
    `
    SELECT
      c1.id as c1_id, c1.text as c1_text, c1.parentId as c1_parentId,
      c2.id as c2_id, c2.text as c2_text, c2.parentId as c2_parentId,
      c3.id as c3_id, c3.text as c3_text, c3.parentId as c3_parentId
    
    FROM comments c1
      LEFT JOIN comments c2 ON c1.id = c2.parentId
      LEFT JOIN comments c3 ON c2.id = c3.parentId
    
    WHERE c1.postId = ? AND c1.parentId IS NULL;
    `,
    [postId],
    callback
  )
}


<div id="contents">
  <h1>List of contents</h1>
  
  
</div>

var returnString = "
<div id="contents">
  <h1>List of contents</h1>
  
  <ul class="contents-list">
  
    <li class="content-item">
      <h2 class="content-item__title">
        <a href="http://the.post.url.value/">
"
*/

select userId, users.username as username                
        FROM sessions          
        LEFT JOIN users ON sessions.userId=users.id;
        
/*      
function returnString(obj){
  var str = `
<div id="contents">
  <h1>List of contents</h1>
  <ul class="contents-list">
    <ul class="contents-list">
  
    <li class="content-item">
      <h2 class="content-item__title">
        <a href="http://the.post.url.value/">${obj[0].title}</a>
      </h2>
       <p>Created by ${obj[0].user.username}</p>
    </li>
    
    <li class="content-item">
      <h2 class="content-item__title">
        <a href="http://the.post.url.value/">${obj[1].title}</a>
      </h2>
        <p>Created by ${obj[1].user.username}</p>
    </li>
    
    <li class="content-item">
      <h2 class="content-item__title">
        <a href="http://the.post.url.value/">${obj[2].title}</a>
      </h2>
        <p>Created by ${obj[2].user.username}</p>
    </li>
    
    <li class="content-item">
      <h2 class="content-item__title">
        <a href="http://the.post.url.value/">${obj[3].title}</a>
      </h2>
        <p>Created by ${obj[3].user.username}</p>
    </li>
    
    <li class="content-item">
      <h2 class="content-item__title">
        <a href="http://the.post.url.value/">${obj[4].title}</a>
      </h2>
      <p>Created by ${obj[4].user.username}</p>
    </li>
    
  </ul>
  </ul>
</div>
`;
return str;
}
*/




