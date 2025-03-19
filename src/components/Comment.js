import { useState } from "react";
import ConvertTime from "./TimeAgo";
import formattedDate from "./FormattedDate";

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
        <div>
            <div>
                <ul>
                    {comments
                    .filter((c) => c.postId === pId)
                    .map((c,index) => (
                         <li key={c.id}>
                            {editingCommentId === c.id ? (
                                <>
                                    <input
                                        type="text"
                                        value={editedComment}
                                        onChange={(e) => setEditedComment(e.target.value)}
                                    />
                                    <button onClick={() => handleSaveEdit(c.id)}>Save</button>
                                    <button onClick={() => setEditingCommentId(null)}>Cancel</button>
                                </>
                            ):
                            (   
                                <>
                                    <span>{c.text}</span>
                                    {c.lastEdit === null ? <p>{c.time}</p> :<p>Last Edit: {c.lastEdit}</p>}
                                    <ConvertTime time={c.id}/>
                                    <button onClick={() => handleEditComment(c.id, c.text)}>Edit</button>
                                    <button onClick={() => setConfirmDeleteId(c.id)}>Delete</button>
                                    {confirmDeleteId === c.id && (
                                        <div>
                                            <div>
                                                <h2>Are you sure to Delete?</h2>
                                                <div>
                                                    <button onClick={() => handleDeleteComment(c.id)}>Yes</button>
                                                    <button onClick={() => setConfirmDeleteId(null)}>No</button>
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
            <div>
                <form onSubmit={handleSubmit}>
                    <input
                        type="text"
                        value={newComment}
                        onChange={(e) => setNewComment(e.target.value)}
                    />
                    <button type="submit">Add Comment</button>
                </form>
            </div>
            
        </div>
    )
}

export default AddComment;