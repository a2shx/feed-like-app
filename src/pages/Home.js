import AddPost from '../components/AddPost.js';
import PostList from "../components/PostList.js";
import '../App.css';
function Home({comments, setComments, posts, setPosts}) {

    const addPost = (newPost) => {
        setPosts([...posts, newPost]);
    };

    return(
        <div className="main-container">
            <h1 className="text-4xl font-bold mb-5">News Feed</h1>
            <AddPost addPost = {addPost} />
            <PostList comments={comments} setComments={setComments} posts = {posts} />
        </div>
    )
}

export default Home;