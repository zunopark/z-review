import { browserSessionPersistence, GoogleAuthProvider, setPersistence, signInWithPopup } from "firebase/auth";
import { auth } from "../../firebase";
import { useNavigate } from "react-router-dom";
import { SocialButton, SocialLogo } from "../styled/auth-components";

export default function GoogleButton() {
    const navigate = useNavigate();

    const onClick = async () => {
        try {
            await setPersistence(auth, browserSessionPersistence);
            
            const provider = new GoogleAuthProvider();
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
        <SocialLogo src="/google-logo.svg" />
        구글로 로그인하기
    </SocialButton>;
}
