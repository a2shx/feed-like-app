import { useState } from "react";
import ConvertTime from "./TimeAgo";
import formattedDate from "./FormattedDate";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleChevronUp } from "@fortawesome/free-solid-svg-icons";
import { faCircleCheck } from "@fortawesome/free-solid-svg-icons";
import { faCircleXmark } from "@fortawesome/free-solid-svg-icons";
import { faPen } from "@fortawesome/free-solid-svg-icons";
function AddComment({comments, setComments,pId}) {
    const [newComment, setNewComment] = useState('');
    const [editingCommentId, setEditingCommentId] = useState(null);
    const [editedComment, setEditedComment] = useState('');
    const [confirmDeleteId, setConfirmDeleteId] = useState(null);

const handleSubmit = (e) => {
    e.preventDefault();
    if(!newComment.trim()) return;
    const commentId = Date.now();
    setComments((prev) => [...prev, { 
        username: 'me',
        id: commentId, 
        postId: pId, 
        text: newComment,
        time: formattedDate(Date.now()), 
        lastEdit: null}])
    setNewComment('');
}

const handleEditComment = (id, comment) => {
    setEditingCommentId(id);
    setEditedComment(comment);
};

const handleSaveEdit = (id) => {
    if(!editedComment.trim()) return;
    setComments((prev) => prev.map((c) => (c.id===id? {...c, text: editedComment, lastEdit: formattedDate(Date.now())} : c)))
    setEditingCommentId(null);
}

const handleDeleteComment = (id) => {
    setComments((c) => (c.filter((c) => c.id !== id)))
}

    return(
        <div className="border-t">
            <div>
                <ul>
                    {comments
                    .filter((c) => c.postId === pId)
                    .map((c,index) => (
                         <li key={c.id}>
                            {editingCommentId === c.id ? (
                                <>
                                    <div className="flex justify-between pt-3">
                                        <input className="border px-3 w-10/12"
                                            type="text"
                                            value={editedComment}
                                            onChange={(e) => setEditedComment(e.target.value)}
                                        />
                                        <div className="">
                                            <button className="text-2xl hover:opacity-70" onClick={() => handleSaveEdit(c.id)}><FontAwesomeIcon icon={faCircleCheck}/></button>
                                            <button className="text-2xl ml-2 hover:opacity-70" onClick={() => setEditingCommentId(null)}><FontAwesomeIcon icon={faCircleXmark}/></button>
                                        </div>
                                    </div>
                                </>
                            ):
                            (   
                                <>  
                                    <div className="flex items-center pt-5">
                                        <div className="flex items-center">
                                            <img className="w-10 rounded-full mr-3" src="../Displaypic/Display.png"/>
                                            <div className="bg-gray-200 rounded-2xl py-1 px-3">
                                                <span className="font-bold">{c.username}</span>
                                                <span className="block">{c.text}</span>
                                            </div>
                                        </div>
                                        <div className="pl-2 opacity-0 hover:opacity-100">
                                            <button className="text-sm text-gray-500 rounded p-1 hover:opacity-70" onClick={() => handleEditComment(c.id, c.text)}><FontAwesomeIcon icon={faPen}/></button>
                                            <button className="text-sm text-gray-500 text-sm rounded p-1 ml-1 hover:opacity-70" onClick={() => setConfirmDeleteId(c.id)}>X</button>
                                        </div>
                                    </div>
                                    <div className="relative group inline-block">
                                        <p className="text-sm text-gray-500 cursor-pointer pl-14">
                                            <ConvertTime time={c.id} />
                                        </p>
                                        <p className="absolute left-1/2 -translate-x-1/2 top-6 bg-gray-800 text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition pointer-events-none max-w-4xl break-words text-center">
                                            {c.lastEdit === null ? c.time : `Last Edit: ${c.lastEdit}`}
                                        </p>
                                    </div>
                                    {confirmDeleteId === c.id && (
                                        <div>
                                            <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white p-6 rounded-lg shadow-lg justify-items-center">
                                                <h2 className="mx-auto">Are you sure to Delete?</h2>
                                                <div>
                                                    <button className="bg-black text-white py-1 px-3 rounded-md hover:opacity-70" onClick={() => handleDeleteComment(c.id)}>Yes</button>
                                                    <button className="bg-black text-white py-1 px-3 rounded-md ml-1 hover:opacity-70" onClick={() => setConfirmDeleteId(null)}>No</button>
                                                </div>
                                            </div> 
                                        </div>
                                    )}
                                </>
                            )}
                         </li>
                         
                         ))}
                    
                </ul>
            </div>
            <div className="container max-w-screen-sm mt-5">
                <form  className="flex" onSubmit={handleSubmit}>
                    <img className="w-8 rounded-full mr-3" src="../Displaypic/Display.png"/>
                    <input className="w-11/12 px-3 border rounded-xl"
                        type="text"
                        value={newComment}
                        onChange={(e) => setNewComment(e.target.value)}
                    />
                    <button className="text-2xl hover:opacity-70 pl-3" type="submit"><FontAwesomeIcon icon={faCircleChevronUp}/></button>
                </form>
            </div>
            
        </div>
    )
}

export default AddComment;