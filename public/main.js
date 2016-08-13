/*global $*/

$(function runaway(){
    function makeid() {
    var text = "#";
    var possible = "ABCDEF0123456789";

    for( var i=0; i < 6; i++ )
        text += possible.charAt(Math.floor(Math.random() * possible.length));
    return text;
}

    $(".button").on({
        mouseover:function(event){
            var color = makeid();

            //console.log(event.clientX, event.clientY, $(this).offset());
            $(this).css({
                // 'position': 'relative',
                // 'left':(Math.random()*100)+"px",
                // 'top':(Math.random()*400)+"px",
                'background-color': color,
                transition: "1s",
            });
        }
    });
});

$("#getTitle").on('click', function(event) {
    event.preventDefault();
    var URL = ( $('#submitPost').serializeArray());
    var URLtoFetch = (URL[1].value);
    $.get( "/suggestTitle", { url: URLtoFetch }, function( response ) {
        var fetchedTitle = response.title;
        $('#suggestedTitle').val(fetchedTitle)
    });
});


$(".voteButton").on('click', function(event){
    event.preventDefault();
    var self = $(this).parents('form:first')
    

    var formData = {};

    var serializedForm = self.serializeArray();
    
    serializedForm.forEach(function(ele){
        formData[ele.name] = ele.value;
    })
    
    console.log("this is formData \n", formData);
    
    var request = $.post('/vote', formData);
      //console.log(request);
    request.done(function(data) {
        console.log(data)
         $(`#post_score_${formData.postId}`).text(`Vote Score: ${data.voteScore}`)
        
        alert('success');
    });
    
    request.fail(function(data) {
        alert('fail ' + data.responseText);
        
    });
    
})
    /*
    
    $.post('/vote', formData, function(){
    })
    .done(function() {
        
    })
        console.log(data)
        if(res.msg === 'ok'){
            $(`#post_score_${formData.postId}`).text(`Vote Score: ${res.voteScore}`)
        }
        
        //console.log(res)
    })
    
     //console.log(formData);
})
*/
