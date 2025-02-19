import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { auth } from "../firebase";
import { FirebaseError } from "firebase/app";
import { Wrapper, StyledForm, Input, Title, Error, Switcher, SocialLoginContainer, Container, LeftContainer, LeftTitle, LeftSubTitle } from "../components/auth/auth-components";
import GithubButton from "../components/auth/github-button";
import GoogleButton from "../components/auth/google-button";


export default function CreateAccount() {
    const navigate = useNavigate();
    const [isLoading, setIsLoading] = useState(false);
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [passwordConfirm, setPasswordConfirm] = useState("");
    const [error, setError] = useState("");


    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault(); // 화면이 새로고침 되지 않도록
        setError("");
        if (name === "" || email === "" || password === "" || passwordConfirm === "") {
            setError("All fields are required");
            return;
        }
        if (isLoading) return;
        if (password !== passwordConfirm) {
            setError("Passwords do not match");

            return;
        }
        setIsLoading(true);
        try {
            setIsLoading(true);
            // create account
            const credentials = await createUserWithEmailAndPassword(auth, email, password);
            // set the name of the user
            await updateProfile(credentials.user, {
                displayName: name,
            });
            // redirect to the home page
            navigate("/");
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
        <LeftContainer><LeftTitle>Z</LeftTitle><LeftSubTitle>이 세상 모든 리뷰</LeftSubTitle></LeftContainer>
        <Wrapper>
            <Title>가입하기</Title>
            <StyledForm onSubmit={handleSubmit}>
                <Input name="name" value={name} onChange={e => setName(e.target.value)} type="text" placeholder="닉네임" required />
                <Input name="email" value={email} onChange={e => setEmail(e.target.value)} type="email" placeholder="이메일" required />
                <Input name="password" value={password} onChange={e => setPassword(e.target.value)} type="password" placeholder="비밀번호" required />
                <Input name="passwordConfirm" value={passwordConfirm} onChange={e => setPasswordConfirm(e.target.value)} type="password" placeholder="비밀번호 확인" required />
                <Input type="submit" value={isLoading ? "Loading" : "계정 만들기"} />
            </StyledForm>
            {error !== "" && <Error>{error}</Error>}
            <Switcher>
                이미 계정이 있으신가요? <Link to="/login">로그인</Link>
            </Switcher>
            <SocialLoginContainer>
                <GithubButton />
                <GoogleButton />
            </SocialLoginContainer>
        </Wrapper>    
    </Container>
    )
}
