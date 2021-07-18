async function deletePost (post_id){

    const postData = await fetch(`/api/posts/delete/${post_id}`, {
      method: 'DELETE',
    })
  
    if(postData.ok){
      document.location.reload();
    } else {
      alert("Couldn't delete post!")
    }
  }
