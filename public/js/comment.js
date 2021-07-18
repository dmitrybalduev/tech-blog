async function saveComment(event){
    event.preventDefault();
    console.log("HELLO FROM SAVE BUTTON FUNCTION");

    const newComment = document.getElementById('comment-text').value;
    const post_id = document.getElementById('post-header').dataset.index;

    const commentData = await fetch(`/api/posts/comment`, {
        method: 'POST',
        body: JSON.stringify({ 
            text: newComment,
            post_id
        }),
        headers: { 'Content-Type': 'application/json' },
    })

    if(commentData.ok){
        document.location.reload();
    } else {
        alert(commentData.statusText);
    }
}

document.getElementById('add-comment-btn').addEventListener('click', saveComment);