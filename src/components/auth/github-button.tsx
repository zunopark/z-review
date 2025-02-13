import { browserSessionPersistence, GithubAuthProvider, setPersistence, signInWithPopup } from "firebase/auth";
import { auth } from "../../firebase";
import { useNavigate } from "react-router-dom";
import { SocialButton, SocialLogo } from "../styled/auth-components";

export default function GithubButton() {
    const navigate = useNavigate();

    const onClick = async () => {
        try {
            await setPersistence(auth, browserSessionPersistence);

            const provider = new GithubAuthProvider();
            const credentials = await signInWithPopup(auth, provider);
            
            console.log(credentials.user);
            
            if (credentials.user) {
                navigate("/");
            }
        } catch (error) {
            console.log(error);
        }
    }

    return <SocialButton onClick={onClick}>
        <SocialLogo src="/github-mark.svg" />
        깃헙으로 로그인하기
    </SocialButton>;
}

