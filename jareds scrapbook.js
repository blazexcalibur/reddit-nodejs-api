createComment = function(comment, callback) {
  conn.query(
    'INSERT INTO comments (text, userId, postId, parentId) VALUES (?, ?, ?, ?)', [comment.text, userId, comment.postId, comment.parentId],
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
          'SELECT text, userId, postId, parentId FROM comments WHERE id = ?', [comments.commentId],
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
}


 var testCommentObject = {
  text: "HAHAHAHA OMG!",
  userId: 23,
  postId: 132
};



<!DOCTYPE html>
    <html>
        <head>
            <title>Reddit</title>
        </head>
    <body>
        <form action="/signup" method="POST">
            <div>
                <input type="text" username="url" placeholder="Enter a username">
            </div>
            <div>
                <input type="text" password="title" placeholder="Enter a password">
            </div>
            <button type="submit">SIGNUP!</button>
        </form>
    </body>
</html>