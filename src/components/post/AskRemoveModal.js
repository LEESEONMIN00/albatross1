import React from "react";
import Modal from './../common/Modal';


const AskRemoveModal = ({
  visible,
  onConfirm, 
  onCancel
}) =>{
      const title ="UR sure";
      const description = "삭제한 포스트 블라블라"

      return( 
      <Modal
          visible={visible}  
          title={title}
          description={description} 
          onConfirm={onConfirm}
          onCancel={onCancel}
        />
        );
  }
  export default AskRemoveModal;