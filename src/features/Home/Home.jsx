import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
// import { AnimatedList } from "react-animated-list";
import getRandomNumber from "../../utilities/getRandomNumber.js";
import Post from "../Post/Post.jsx";
import PostLoading from '../Post/PostLoading';
import {
   fetchPosts,
   selectFilteredPosts,
   setSearchTerm,
   fetchComments
} from "../../store/redditSlice.js";

import "./Home.css";

const Home = () => {
   const reddit = useSelector((state) => state.reddit);
   const { isLoading, error, searchTerm, selectedSubreddit } = reddit;
   const posts = useSelector(selectFilteredPosts);
   const dispatch = useDispatch();

   useEffect(() => {
      dispatch(fetchPosts(selectedSubreddit));
      // eslint-disable-next-line
   }, [selectedSubreddit]);

   const onToggleComments = (index) => {
      const getComments = (permalink) => {
         dispatch(fetchComments(index, permalink));
      };

      return getComments;
   }

   if (isLoading) {
      return (
         <>
            {/* <AnimatedList animation="zoom"> */}
            {Array(getRandomNumber(3, 10)).fill(<PostLoading />)}
            {/* </AnimatedList> */}
         </>
      );
   }

   if (error) {
      return (
         <div className="error">
            <h2>Failed to load posts.</h2>
            <button
               type="button"
               onClick={() => dispatch(fetchPosts(selectedSubreddit))}
            >
               Try Again
            </button>
         </div>
      );
   }

   if (posts.length === 0) {
      return (
         <div className="error">
            <h2>No posts matching "{searchTerm}"</h2>
            <button
               type="submit"
               onClick={() => dispatch(setSearchTerm(""))}
            >
               Go Home
            </button>
         </div>
      );
   }

   return (
      <>
         {posts.map((post, index) => (
            <Post
               key={post.id}
               post={post}
               onToggleComments={onToggleComments(index)}
            />
         ))}
      </>
   );
}
export default Home;