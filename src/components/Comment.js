import { useState } from "react";

function AddComment({postId, setComments}) {
    const [newComment, setNewComment] = useState('');

    const handleSubmit = async(e) => {
        e.preventDefault();
        try{
            const response = await fetch('https://jsonplaceholder.typicode.com/comments', {
                method: 'POST', //this never work well in this project because it's JSONPlaceholder
                body: JSON.stringify({
                    postId,
                    body: newComment,
                    name: 'User'
                }),
                headers: {
                    'Content-Type': 'application/json',
                },
            });
            const data = await response.json();
            setComments((prev) => [...prev, data]); // In real-app we don't do this but JSONPlaceholder don't save comment for us so we need to add it manually.
            console.log('New comment added: ', data);
        }
        catch(error){
            console.error('Error adding comment: ', error);
        }
    };

    return(
        <form onSubmit={handleSubmit}>
            <textarea
            value={newComment}
            onChange={(e) => setNewComment(e.target.value)}
            placeholder="write a comment..."
            />
            <button type="submit">Add Comment</button>
        </form>
    );
}

export default AddComment;