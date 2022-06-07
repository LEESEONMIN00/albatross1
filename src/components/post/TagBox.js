import React, { useCallback, useEffect, useState } from "react";
import styled from "styled-components";
import palette from "../../lib/palette";

const TagBoxBlock = styled.div`
  width: 100%;
  border-top: 1px solid ${palette.gray[2]};
  padding-top: 2rem;

  h4 {
    color: ${palette.gray[6]};
    margin-top: 0;
    margin-bottom: 0.5rem;
  }
`;
const TagForm = styled.form`
  border: 1px solid ${palette.gray[3]};
  border-radius: 4px;
  display: flex;
  width: 480px;
  overflow: hidden;

  input {
    outline: none;
    border: none;
    font-size: 1rem;
    padding: 0.5rem;
    width: 100%;

    &::placeholder {
      color: ${palette.gray[3]};
    }
  }
`;
const TagListBox = styled.div`
  display: flex;
  margin-top: 0.5rem;
`;
const TagItemBox = styled.div`
  & + & {
    margin-left: 0.8rem;
  }
  background: ${palette.gray[4]};
  border-radius: 4rem;
  padding: 0.5rem;
  color: ${palette.gray[6]};
  font-weight: 600;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  &:hover {
    opacity: 0.8;
  }
`;
//왜 useMemo사용안해..?ㅠㅠ 둘다 같은거 아닌가..?
//useMemo = > useCallBack 같은거
//prpos가 바껴도 렌더링x
const TagItem = ({ tag, onRemove }) => (
  <TagItemBox onClick={() => onRemove(tag)}>#{tag}</TagItemBox>
);

const TagList = React.memo(({ tags, onRemove }) => (
  <TagListBox>
    {tags.map((tag) => (
      <TagItem tag={tag} key={tag} onRemove={onRemove} />
    ))}
  </TagListBox>
));

const TagBox = ({ onChangeTag, tags }) => {
  const [tagInput, setTagInput] = useState("");
  const [localTag, setLocalTag] = useState([]);

  const addTag = useCallback(
    (text) => {
      if (!text) return;
      if (localTag.includes(text)) return; //includes :localTag안에  tagInput의 값이 있으면
      const nextTag = [...localTag, text];
      setLocalTag(nextTag);
      onChangeTag({ key: "tags", value: nextTag });
    },
    [localTag, onChangeTag]
  );

  const removeTag = useCallback(
    (tag) => {
      const nextTag = localTag.filter((t) => t !== tag);
      setLocalTag(nextTag);
      onChangeTag({ key: "tags", value: nextTag });
    },
    [localTag, onChangeTag]
  );
  const onChange = useCallback((e) => {
    setTagInput(e.target.value);
  }, []);

  const onSubmit = useCallback(
    (e) => {
      e.preventDefault();
      addTag(tagInput.trim());
      setTagInput("");
    },
    [tagInput, addTag]
  );

  useEffect(() => {
    setLocalTag(tags); //props에 받은 tags
  }, [tags]);

  return (
    <TagBoxBlock>
      <h4>#Tags</h4>
      <TagForm onSubmit={onSubmit}>
        <input
          placeholder="태그를 입력해주세요"
          onChange={onChange}
          value={tagInput}
        />
      </TagForm>
      <TagList tags={localTag} onRemove={removeTag} />
    </TagBoxBlock>
  );
};

export default TagBox;
