import React from "react";
import Pagination from "../components/post/Pagination";
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { useLocation } from 'react-router-dom';
import  QueryString  from 'qs';

const PaginationContainer = () =>{

    const {lastPage,posts, loading}= useSelector(({postList, loading,})=>({
        lastPage : postList.lastPage,
        posts : postList.posts,
        loading: loading["postList/POST_LIST"],
        
    }));

    const {username} = useParams();
    const location = useLocation();
    if(!posts || loading) return null;

    const { tag, page = 1} = QueryString.parse(location.search,{
        ignoreQueryPrefix: true
    });

  return (
  <Pagination page={parseInt(page,10)} tag={tag} lastPage = {lastPage} username={username} />
  );
}
export default PaginationContainer