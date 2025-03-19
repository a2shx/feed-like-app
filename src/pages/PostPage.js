import { useNavigate, useParams } from "react-router-dom";
import EditPost from "../components/EditPost";
import { useState, useEffect } from "react";
import AddComment from "../components/Comment";
import ConvertTime from "../components/TimeAgo";


function PostPage({comments, setComments, posts, setPosts}){
    const [showModal, setShowModal] = useState(false);
    const [isEdit, setIsEdit] = useState(false);
    const { id } = useParams();
    const navigate = useNavigate();

    if(!posts || posts.length === 0) return <p>Loading post...</p>
    const post = posts.find((p) => p.id === parseInt(id));

    const handleDeletePost = () => {
        setPosts((prevPosts) => prevPosts.filter((p) => p.id !== post.id));
        navigate('/');
    }

    if (!post) return <p>Post not found!</p>

    return(
        <div>
            <button onClick={() => {setShowModal(true)}}>Delete Post</button>
            <button onClick={() => {setIsEdit(true)}}>Edit Post</button>
            <h1>{post.username}</h1>
            {post.lastEdit === null ? <p>{post.time}</p> : <p>Last edit: {post.lastEdit}</p>}
            <ConvertTime time={post.id}/>
            <p>{post.time}</p>
            <p>{post.content}</p>
        
            <AddComment comments={comments} setComments={setComments} pId={post.id}/>

            {isEdit && (<EditPost setIsEdit={setIsEdit} post={post} setPosts={setPosts}/>)}

            {showModal && (
                <div>
                    <div>
                        <h2>Are you sure to Delete?</h2>
                        <div>
                            <button onClick={handleDeletePost}>Yes</button>
                            <button onClick={() => {setShowModal(false)}}>No</button>
                        </div>
                    </div> 
                </div>
            )}
        </div>
    )
}

export default PostPage;