import { useState, } from "react";


function EditComment({ comment, setComments, setEditingCommentId }) {

    const [updatedComment, setUpdatedComment] = useState(comment.body);
      /*  const fetchComment = async () => {
            const commentResponse = await fetch(`https://jsonplaceholder.typicode.com/comments/${comment.id}`);
            const commentData = await commentResponse.json();
            setUpdatedComment(commentData.body);
        };
        fetchComment();*/
    

const handleUpdate = async (e) => {
    e.preventDefault();
   /* try{
        const response = await fetch(`https://jsonplaceholder.typicode.com/comments/${comment.id}`,{
            method: 'PUT',
            body: JSON.stringify({      //this will work only in real API
                ...comment,
                body:updatedComment,
            }),
            headers: {
                'Content-Type': 'application/json'
            }
        });
        const data = await response.json();
        console.log('Comment updated: ', data);

        setComments((prev) => 
        prev.map((c) => (c.id === comment.id ? {...c, body:updatedComment}: c )))
        setEditingCommentId(null);
    }catch(error){
        console.error('Error updateing comment: ',error);
    }*/
        setComments((prev) => 
            prev.map((c) => (c.id === comment.id ? {...c, body:updatedComment}: c )))
            setEditingCommentId(null);
};

    return(
        <form onSubmit={handleUpdate}>
            <textarea
            value={updatedComment}
            onChange={(e) => setUpdatedComment(e.target.value)}/>
            <button type="submit">Update Comment</button>
        </form>
    );
}

export default EditComment;