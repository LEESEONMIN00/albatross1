import React, { useCallback, useEffect } from "react";
import Responsive from "../components/common/Responsive";
import Editor from "../components/post/Editor";
import PostActionButton from "../components/post/PostActionButton";
import TagBox from "../components/post/TagBox";
import { changeField, initialize, writePost } from "../modules/write";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import Header from './../components/common/Header';
import { updatePost } from './../modules/write';
import { Helmet } from 'react-helmet-async';

function WritePost() {
  const dispatch = useDispatch();
  const { title, body, tags, post, postError ,originalPostId} = useSelector(({ write }) => ({
    title: write.title,
    body: write.body,
    tags: write.tags,
    post: write.post,
    postError: write.postError,
    originalPostId: write.originalPostId,
  }));

  const history = useNavigate();

  const onChange = useCallback(
    (payload) => {
      //왜 payload
      dispatch(changeField(payload));
    },
    [dispatch]
  );

  const onPublish = () => {
   if(originalPostId){
     dispatch(updatePost({title,body,tags, id:originalPostId}));
     return;
   }
      dispatch(writePost({ title, body, tags }));
  };

  // 언마운트될 때 초기화
  useEffect(() => {
    return () => {
      dispatch(initialize());
    };
  }, [dispatch]);

  useEffect(() => {
    if (post) {
      //db에게 post의 정보를 던졌다.
      const {
        _id,
        user: { username },
      } = post; //post의 id와 user의 정보
      history(`/@${username}/${_id}`);
    }
    if (postError) {
      console.log(postError);
    }
  }, [post, history, postError]);

  return (
    <>
    <Header/>
    <Helmet>
      <title>수정중 -ALBATROSS</title>
    </Helmet>
    <Responsive>
      <Editor onChange={onChange} title={title} body={body} />
      <TagBox onChangeTag={onChange} tags={tags} />
      <PostActionButton onPublish={onPublish} isEdit={!!originalPostId} />
    </Responsive>
    </>
  );
}

/* quill를 사용하면 일반적으로 value값을 넘겨 줄 수 없다. */

export default WritePost;
