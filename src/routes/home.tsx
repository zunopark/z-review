import { signOut } from "firebase/auth";
import { auth } from "../firebase";
import styled from "styled-components";


const Container = styled.div``;

const Button = styled.button`
  padding: 10px 20px;
  border-radius: 5px;
`;

export default function Home() {
  return (
    <Container>
      <h1>Home</h1>
      <Button onClick={() => signOut(auth)}>Sign Out</Button>
    </Container>
  )
}
