import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams,useNavigate } from "react-router-dom";
import PostViewer from "../components/post/PostViewer";
import HeaderContainer from "../containers/HeaderContainer";
//import {Helmet} from "react-helmet-async";
import { readPost, unloadPost } from "../modules/post";
import EditDeleteButton from './../components/post/EditDeleteButton';
import { setOriginalPost } from './../modules/write';
import { deletePost } from './../api/post';
//import { Helmet } from "react-helmet-async";

function ReadPost() {
  const { postId } = useParams();
  const history = useNavigate();
  const dispatch = useDispatch();

  const { post, error, loading, user } = useSelector(({ post, loading, user }) => ({
    post: post.post,
    error: post.error,
    loading: loading["post/READ"],
    user: user.user
  }));


  const ownPost = (user && user._id) === ( post && post.user._id);

  const onEdit=()=>{
    dispatch(setOriginalPost(post));
    history("/write");

  }
  const onDelete= async()=>{
    try {
      await deletePost(postId);
      history("/");
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    //db에서 post를 취득
    dispatch(readPost(postId));

    //언마운트될때 state를 초기화
    return () => {
      dispatch(unloadPost());
    };
  }, [dispatch, postId]);
  return (
    <>
     
      <HeaderContainer/>
      <PostViewer post={post} error={error} loading={loading} 
       actionButtons={
        ownPost && <EditDeleteButton onEdit={onEdit} onDelete={onDelete}/>}/>
    </>
  );
}

export default ReadPost;
