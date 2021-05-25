
const id = document.getElementsByTagName('form')[0].getAttribute("data-post");

async function editPost(event) {
    event.preventDefault();

    const post_name = document.querySelector('#title-input').value.trim();
    const content = document.querySelector('#content-input').value.trim();
      
    const response = await fetch(`/api/posts/${id}`, {
        method: 'PUT',
        body: JSON.stringify({
            id,
            name: post_name,
            content
        }),
        headers: {
                'Content-Type': 'application/json'
            }
        });
    
        if (response.ok) {
            document.location.replace('/dashboard/');
        } else {
            alert(response.statusText);
        }

}

async function deletePost(event) {
    event.preventDefault();
      
    const response = await fetch(`/api/posts/${id}`, {
        method: 'DELETE',
    });
    
    if (response.ok) {
        document.location.replace('/dashboard/');
    } else {
        alert(response.statusText);
    }
}

document.querySelector('.edit-post-form').addEventListener('submit', editPost);
document.querySelector('.delete-post-btn').addEventListener('click', deletePost);