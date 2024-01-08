import styled from "styled-components";

interface LoginPageStyledProps {
  height?: string;
}

export const LoginPageStyled = styled.div<LoginPageStyledProps>`
  .main-container {
    display: flex;
    align-items: center;
  }

  .left-container {
    width: 55%;
    display: grid;
    place-items: center;
    height: ${({ height }) => height || "100vh"};
    color: white;
    padding: 20px;
  }

  .left-container h1 {
    font-size: 80px;
  }

  .right-container {
    width: 45%;
    display: grid;
   justify-items:center;
   align-content:center;
    height: ${({ height }) => height || "100vh"};
    padding: 20px;
  }

  [id^="otp"] {
    margin: 5px;
  }

  .img_container {
    position: relative;
  }

  .img_container::before {
    content: "";
    display: block;
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    z-index: -1;
  }
  .right-sub-container{
    width:90%
  }

  @media (max-width: 912px) {
    .left-container {
      display: none;
    }
    .right-container {
      width: 100%;
    }
    .right-sub-container{
      width:100%
    }
  
  }
`;
