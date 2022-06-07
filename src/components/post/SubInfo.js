import { Link } from "react-router-dom";
import styled from "styled-components";
import palette from './../../lib/palette';

const SubInfoBlock = styled.div`
  display: flex;
  align-items: center;
  margin-top: 1rem;
  color: ${palette.gray[5]};
  span + span::before{
    color: ${palette.gray[5]};
    padding-left: 0.25rem;
    padding-right: 0.25rem;
    content:"\\B7";
  }
`;

const SubInfo = ({username, publishedDate}) =>{
  return(
    <SubInfoBlock>
         <span>
           <b>
             <Link to={`/@${username}`}>{username}</Link>
           </b>
         </span>
         <span>{new Date(publishedDate).toLocaleDateString()}</span>
    </SubInfoBlock>
  );
};

export default SubInfo;