import React from "react";
import styled from "styled-components";
import { MdDelete, MdEdit } from 'react-icons/md';
import palette from './../../lib/palette';
import { useState } from "react";
import AskRemoveModal from "./AskRemoveModal";


const EditDeleteButtonBlock = styled.div`
  display: flex;
  justify-content: flex-end;
  margin-bottom: 2rem;
  margin-top: -1.5rem;
`;

const ActionButton = styled.button`
  border: 1px solid black;
  border-radius: 4px;
  padding: 0.25rem 0.5rem;
  color:${palette.gray[5]};
  font-size: 1rem;
  cursor: pointer;

  &:hover{
    background: ${palette.gray[1]};
    color:${palette.cyan[7]};
  }
  & + &{
    margin-left: 0.25rem;

  }


`;

const EditDeleteButton = ({onEdit, onDelete}) =>{
  const [modal, setModal] = useState(false);
  const onDeleteClick = ()=> setModal(true);

  const onCancel = ()=> setModal(false);
  const onConfirm = ()=>{
    setModal(false);
    onDelete();
  };
  
  return (
  <>
    <EditDeleteButtonBlock>
      <ActionButton onClick={onEdit}>
        <MdEdit/>
      </ActionButton>
      <ActionButton onClick={onDeleteClick}>
        <MdDelete style={{color:"tomato"}}/>
      </ActionButton>
    </EditDeleteButtonBlock>
    <AskRemoveModal visible={modal} onCancel={onCancel} onConfirm={onConfirm}/>
  </>
  );
}
export default EditDeleteButton