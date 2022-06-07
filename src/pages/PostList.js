import { useLocation } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import Posts from './../components/post/Posts';
import HeaderContainer from './../containers/HeaderContainer';
import { useEffect } from 'react';
import  qs  from 'qs';
import { useParams } from 'react-router-dom';
import { fetchPostList } from './../modules/postlist';
//import Pagination from '../components/post/Pagination';
import PaginationContainer from './../containers/PaginationContainer';



const PostList = ()=>{
  const location = useLocation();
  const {username}= useParams();
  const dispatch = useDispatch();
  const {posts, error, loading , user }= useSelector(
    ({ postList, loading, user })=>({
      posts : postList.posts,
      error: postList.error,
      loading: loading["postList/POST_LIST"],
      user: user.user,
    })
  );
    useEffect(()=>{
      const { tag,page } = qs.parse(location.search,{
        ignoreQueryPrefix: true,
      }); 
        dispatch(fetchPostList({username, tag, page}));
      },[dispatch, username, location.search]);

  return(
    <>
      <HeaderContainer/>
      <Posts
        loading = {loading} 
        error= {error} 
        posts= {posts} 
        showBtn= {user} />
        <PaginationContainer/>
    </>
  );
  };
export default PostList