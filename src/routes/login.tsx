import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebase";
import { FirebaseError } from "firebase/app";
import { Wrapper, StyledForm, Input, Title, Error, Switcher, SocialLoginContainer } from "../components/styled/auth-components";
import GithubButton from "../components/auth/github-button";
import { Container, LeftContainer, LeftTitle, LeftSubTitle } from "../components/styled/auth-components";
import GoogleButton from "../components/auth/google-button";

export default function Login() {
    const navigate = useNavigate();
    const [isLoading, setIsLoading] = useState(false);
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");


    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault(); // 화면이 새로고침 되지 않도록
        setError("");
        if (email === "" || password === "") {
            setError("All fields are required");
            return;
        }

        if (isLoading) return;
        setIsLoading(true);

        try {
            setIsLoading(true);
            // login
            const credentials = await signInWithEmailAndPassword(auth, email, password);
            
            if (credentials.user) {
                navigate("/");
            }
        } catch (error) {
            if (error instanceof FirebaseError) {
              setError(error.message);
              // 나중에는 에러 각각에 대해서 처리해줘야 한다. (유저에게 표시)
            }
        } finally {
            setIsLoading(false);
        }
    }

    return (
    <Container>
        <LeftContainer>
            <LeftTitle>Z Review</LeftTitle>
            <LeftSubTitle>이 세상 모든 리뷰</LeftSubTitle>
        </LeftContainer>
        <Wrapper>
            <Title>로그인</Title>
            <StyledForm onSubmit={handleSubmit}>
                <Input name="email" value={email} onChange={e => setEmail(e.target.value)} type="email" placeholder="이메일" required />
            <Input name="password" value={password} onChange={e => setPassword(e.target.value)} type="password" placeholder="패스워드" required />
            <Input type="submit" value={isLoading ? "Loading" : "로그인"} />
            </StyledForm>
            {error !== "" && <Error>{error}</Error>}
            <Switcher>
            계정이 없으신가요? <Link to="/create-account">계정 만들기</Link>
            </Switcher>
            <SocialLoginContainer>
                <GithubButton />
                <GoogleButton />
            </SocialLoginContainer>
        </Wrapper>
    </Container>
    )
}
