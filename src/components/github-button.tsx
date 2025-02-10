import { GithubAuthProvider, signInWithPopup } from "firebase/auth";
import styled from "styled-components";
import { auth } from "../firebase";
import { useNavigate } from "react-router-dom";

const Button = styled.button`
background-color: white;
font-weight: 500;
padding: 10px 20px;
border-radius: 50px;
display: flex;
gap: 5px;
align-items: center;
justify-content: center;
border: 0;
cursor: pointer;
width: 100%;
color: black;
margin-top: 50px;
`;  

const Logo = styled.img`
  height: 25px;
`;


export default function GithubButton() {
    const navigate = useNavigate();

    const onClick = async () => {
        try {
            const provider = new GithubAuthProvider();
            await signInWithPopup(auth, provider);
            navigate("/");
        } catch (error) {
            console.log(error);
        }
    }

    return <Button onClick={onClick}>
        <Logo src="/github-mark.svg" />
        깃헙으로 로그인하기
    </Button>;
}

