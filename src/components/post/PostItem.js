import React from "react";
import styled from "styled-components";
import SubInfo from './SubInfo';
import palette from './../../lib/palette';
import { Link } from 'react-router-dom';

const PostItemBlock = styled.div`
    display: flex;
    align-items: center;
    justify-content: space-between;
    

    &+&{
        border-top: 1px solid ${palette.gray[2]}
    }
    h4{
      &:hover{
        color: ${palette.gray[6]};
      }
    }

`;



const PostItem = ({ post }) =>{
const {
  title, 
  body,
  publishedDate,
  user:{username},
  _id,
  }= post;
//<div>{body}</div>
  return (
  <PostItemBlock>
      <h4><Link to={`/@${username}/${_id}`} >{title}</Link></h4>
      <SubInfo username= {username} publishedDate={publishedDate}/>
  </PostItemBlock>
  );
}
export default PostItem;