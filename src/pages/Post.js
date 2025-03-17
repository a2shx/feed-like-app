import React, { useEffect, useState } from "react";
import { useNavigate, useParams, Link } from "react-router-dom";
import AddComment from "../components/Comment";
import EditComment from "../components/EditComment";

function Post(){
    const { id } = useParams();
    const navigate = useNavigate();
    const [post, setPost] = useState(null);
    const [comments, setComments] = useState([]);
    const [editingCommentId, setEditingCommentId] = useState(null);

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
                        {comment.name === 'User' && <>
                        <button onClick={() => setEditingCommentId(comment.id)}>Edit</button>
                        <button>Delete</button>
                        </>}
                    {editingCommentId === comment.id && (
                        <EditComment
                        comment={comment}
                        setComments={setComments}
                        setEditingCommentId={setEditingCommentId}
                        />
                    )}
                    </li>
                ))}
            </ul>
            <p>By <Link to={`/user/${post.userId}`}> User {post.userId}</Link></p>

            <AddComment setComments={setComments}/>

            <button onClick={() => navigate(-1)}>Back</button>

        </div>
    )


}

export default Post;