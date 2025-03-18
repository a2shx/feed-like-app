import { useState } from "react";


function Comment() {
    const [comments, setComments] = useState([]);







    return(
        <div>
            <ul>
                {comments.map((c) => {
                    c.postId === post.id
                })}
            </ul>
        </div>
    )
}