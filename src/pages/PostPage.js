import { useNavigate, useParams } from "react-router-dom";
import EditPost from "../components/EditPost";
import { useState } from "react";
import AddComment from "../components/Comment";
import ConvertTime from "../components/TimeAgo";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPen } from "@fortawesome/free-solid-svg-icons";
import '../App.css';

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
        <div className="main-container">
            <div className="postpoage-card">
                <div className="flex justify-between border-b pb-3 mb-5">
                    <div className="flex items-center">
                        <img className="w-10 rounded-full mr-3" src="../Displaypic/Display.png"/>
                        <div>
                            <h1 className="font-bold">{post.username}</h1>
                            <div className="relative group inline-block">
                                <p className="time-tooltips">
                                    {post.lastEdit === null ? post.time : `Last edit: ${post.lastEdit}`}
                                </p>
                                <p className="time-display"><ConvertTime time={post.id}/></p>
                            </div>
                        </div>
                    </div>
                    <div>
                        <button className="manage-button" onClick={() => {setIsEdit(true)}}><FontAwesomeIcon icon={faPen}/></button>
                        <button className="manage-button ml-1" onClick={() => {setShowModal(true)}}>X</button>
                    </div>
                </div>
                
                <p className="mb-5 px-2">{post.content}</p>
            
                <AddComment comments={comments} setComments={setComments} pId={post.id}/>

                {isEdit && (<EditPost setIsEdit={setIsEdit} post={post} setPosts={setPosts}/>)}

                {showModal && (
                    <div>
                        <div className="pop-up">
                            <h2 className="mb-3">Are you sure to Delete?</h2>
                            <div>
                                <button className="confirm-delete" onClick={handleDeletePost}>Yes</button>
                                <button className="confirm-delete ml-2" onClick={() => {setShowModal(false)}}>No</button>
                            </div>
                        </div> 
                        <div className="bg-screen" onClick={() => setShowModal(false)}></div>
                    </div>
                )}
            </div>
        </div>
    )
}

export default PostPage;