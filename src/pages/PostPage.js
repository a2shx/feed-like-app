import { useNavigate, useParams } from "react-router-dom";
import EditPost from "../components/EditPost";
import { useState } from "react";
import AddComment from "../components/Comment";
import ConvertTime from "../components/TimeAgo";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPen } from "@fortawesome/free-solid-svg-icons";


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
        <div className="justify-items-center p-5 border h-screen container max-w-screen-lg justify-self-center">
            <div className="container max-w-screen-sm border p-5 shadow-lg">
                <div className="flex justify-between border-b pb-3 mb-5">
                    <div className="flex items-center">
                        <img className="w-10 rounded-full mr-3" src="../Displaypic/Display.png"/>
                        <div>
                            <h1 className="font-bold">{post.username}</h1>
                            <div className="relative group inline-block">
                                <p className="absolute left-1/2 -translate-x-1/2 top-6 bg-gray-800 text-white text-xs px-2 rounded opacity-0 group-hover:opacity-100 transition pointer-events-none max-w-xs break-words text-center">
                                    {post.lastEdit === null ? post.time : `Last edit: ${post.lastEdit}`}
                                </p>
                                <p className="cursor-pointer text-sm text-gray-500"><ConvertTime time={post.id}/></p>
                            </div>
                        </div>
                    </div>
                    <div>
                        <button className="text-sm text-gray-500 text-sm rounded p-1 hover:opacity-70" onClick={() => {setIsEdit(true)}}><FontAwesomeIcon icon={faPen}/></button>
                        <button className="text-sm text-gray-500 text-sm rounded p-1 ml-1 hover:opacity-70" onClick={() => {setShowModal(true)}}>X</button>
                    </div>
                </div>
                
                <p className="mb-5 px-2">{post.content}</p>
            
                <AddComment comments={comments} setComments={setComments} pId={post.id}/>

                {isEdit && (<EditPost setIsEdit={setIsEdit} post={post} setPosts={setPosts}/>)}

                {showModal && (
                    <div>
                        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white p-6 rounded-lg shadow-lg justify-items-center z-10">
                            <h2 className="mb-3">Are you sure to Delete?</h2>
                            <div>
                                <button className="bg-black text-white py-1 px-5 rounded-md hover:opacity-70" onClick={handleDeletePost}>Yes</button>
                                <button className="bg-black text-white py-1 px-5 rounded-md ml-2 hover:opacity-70" onClick={() => {setShowModal(false)}}>No</button>
                            </div>
                        </div> 
                        <div className="absolute top-0 bottom-0 left-0 right-0 bg-black bg-opacity-40" onClick={() => setShowModal(false)}></div>
                    </div>
                )}
            </div>
        </div>
    )
}

export default PostPage;