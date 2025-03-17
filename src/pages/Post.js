import React, { useEffect, useState } from "react";
import { useNavigate, useParams, Link } from "react-router-dom";

function Post(){
    const { id } = useParams();
    const navigate = useNavigate();
    const [post, setPost] = useState(null);
    const [comments, setComments] = useState([]);

    const handleError = (error,source) => {
        console.error(`Error in ${source}: `, error);
    }

    useEffect(() => {
        const fetchPost = async() => {
            try{
                const postResponse = await fetch(`https://jsonplaceholder.typicode.com/posts/${id}`);
                if(!postResponse.ok) throw new Error('Failed to fetch post');
                const postData = await postResponse.json();
                setPost(postData);
            }
            catch(error){
                handleError(error, 'fetchPost');
            }
        }
        const fetchComment = async() => {
            try{
                const commentResponse = await fetch(`https://jsonplaceholder.typicode.com/comments?postId=${id}`)
                if(!commentResponse.ok) throw new Error('Failed to fetch comment');
                const commentData = await commentResponse.json();
                setComments(commentData);
            }
            catch(error){
                handleError(error, 'fetchComments');
            }
        }
        fetchPost();
        fetchComment();
    },[id])

    if (!post) return <p>Loading...</p>
    return(
        <div>
            <h1>{post.title}</h1>
            <p>{post.body}</p>
            <h3>Comments</h3>
            <ul>
                {comments.map((comment) => (
                    <li key={comment.id}>
                        <strong>{comment.name}</strong>: {comment.body}
                        {comment.userId === 1 && <>
                        <button>Edit</button>
                        <button>Delete</button>
                        </>}
                    </li>
                ))}
            </ul>
            <button onClick={() => navigate(-1)}>Back</button>
            <p>By <Link to={`/user/${post.userId}`}> User {post.userId}</Link></p>
        </div>
    )


}

export default Post;