import React from "react";
import styled from "styled-components";
import PostItem from './PostItem';
import Button from '../common/Button';
import Responsive from './../common/Responsive';


const PostListBlock = styled(Responsive)`
    margin: 0 auto;
    width: 1200px;
    margin-top: 3rem;
    
    
`;

const WriteButtonWrapper = styled.div`
  display: flex;
  justify-content: flex-end;
  margin-top: 3rem;
`

const Posts = ({ posts, loading, error, showBtn}) =>{
  
if(error){
    return<PostListBlock>에러</PostListBlock>;
}   

  return( 
  <PostListBlock>
      <WriteButtonWrapper>
         {showBtn && (
           <Button cyan to="/write">
             New Post
           </Button>
         )}
      </WriteButtonWrapper>
          
      {!loading && posts &&(
        <div> 
            {posts.map((post)=>(
              <PostItem key= {post._id} post={post}/>
            ))}
        </div>
        )} 
  </PostListBlock>
  );
};
export default Posts;