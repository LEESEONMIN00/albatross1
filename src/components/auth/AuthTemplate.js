import styled from "styled-components";
import palette from "../../lib/palette";
import Responsive from "../common/Responsive";

const AuthTemplateBlock = styled(Responsive)`
  position: absolute;
  left: 0;
  top: 0;
  bottom: 0;
  right: 0;
  background: ${palette.gray[2]};
  display: flex;
  justify-content: center;
  align-items: center;
`;

const WhiteBox = styled.div`
  .title {
    display: block;
    padding-bottom: 2rem;
    text-align: center;
    font-weight: bold;
    font-size: 1.176rem;
    letter-spacing: 2px;
  }
  box-shadow: 0 0 8px rgba(0, 0, 0, 0.25);
  padding: 2rem;
  width: 360px;
  background: white;
  border-radius: 3px;
`;

function AuthTemplate({ children }) {
  return (
    <AuthTemplateBlock>
      <WhiteBox>
        <div className="title">ALBATROSS</div>
        {children}
      </WhiteBox>
    </AuthTemplateBlock>
  );
}

export default AuthTemplate;
