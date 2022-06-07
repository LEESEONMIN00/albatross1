import Quill from "quill";
import "quill/dist/quill.snow.css";
import React, { useEffect, useRef } from "react";
import styled from "styled-components";
import palette from "../../lib/palette";

const EditorBlock = styled.div`
  padding-top: 5rem;
  padding-bottom: 5rem;
`;

const TitleInput = styled.input`
  border: none;
  outline: none;
  border-bottom: 1px solid ${palette.gray[5]};
  width: 100%;
  margin-bottom: 2rem;
  font-size: 2rem;
  padding-bottom: 0.5rem;

  &::placeholder {
    color: ${palette.gray[3]};
  }
`;

const QuilWrapper = styled.div`
  .ql-editor {
    padding: 1rem;
    min-height: 320px;
    font-size: 1.125em;
    line-height: 1.5;
  }
  .ql-editor.ql-blank::before {
    padding: 1rem;
    left: 0px;
    color: ${palette.gray[3]};
  }
`;

const Editor = ({ title, body, onChange }) => {
  const quillElement = useRef(null); //quill 컨테이너

  const quillInstance = useRef(null);

  useEffect(() => {
    quillInstance.current = new Quill(quillElement.current, {
      theme: "snow",
      placeholder: "오늘의 기분은 어떠 신가요?",
      modules: {
        toolbar: [
          [{ header: 1 }, { header: 2 }],
          ["bold", "italic", "underline", "strike"],
          [{ list: "ordered" }, { list: "bullet" }],
          ["blockquote", "code-block", "link", "image"],
        ],
      },
    });

    const quill = quillInstance.current;
    quill.on("text-change", (delta, oldDelata, source) => {
      if (source === "user") {
        onChange({ key: "body", value: quill.root.innerHTML });
      }
    });
  }, [onChange]);

  const onChangeTitle = (e) => {
    onChange({ key: "title", value: e.target.value });
  };

  const mounted = useRef(false);
  useEffect(()=>{
    if(mounted.current)return;
    mounted.current =true;
    quillInstance.current.root.innerHTML= body;
  },[body]);

  return (
    <EditorBlock>
      <TitleInput
        placeholder="Title..."
        onChange={onChangeTitle}
        value={title}
      />
      <QuilWrapper>
        <div ref={quillElement} />
      </QuilWrapper>
    </EditorBlock>
  );
};

export default Editor;
//<div />:라이브러리를 사용할 꺼라서 닫는 태그없어도 됨
//useRef() state를 변경할때 재 렌더링을 막고 싶을때,리액트 DOM요소에 접근
