import { addDoc, collection } from "firebase/firestore";
import { useState } from "react";
import { styled } from "styled-components";
import { auth, db } from "../firebase";

const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 10px;
`;

const Textarea = styled.textarea`
  width: 100%;
  border: 2px solid white;
  border-radius: 20px;
  padding: 20px;
  font-size: 16px;
  color: white;
  background-color: black;
  resize: none;
  font-family: system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
  &::placeholder {
    font-size: 14px;
  }
  &:focus {
    outline: none;
    border-color: #1d9bf0;
  }
`;

const AttachFileButton = styled.label`
  padding: 10px 0px;
  color: #1d9bf0;
  text-align: center;
  border-radius: 20px;
  border: 1px solid #1d9bf0;
  font-size: 14px;
  font-weight: 600;
  cursor: pointer;
  font-family: system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
`;

const AttachFileInput = styled.input`
  display: none;
`;

const SubmitButton = styled.input`
  background-color: #1d9bf0;
  color: white;
  border: none;
  padding: 10px 0px;
  border-radius: 20px;
  font-size: 16px;
  font-weight: 600;
  cursor: pointer;
  font-family: system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
  &:hover {
    opacity: 0.9;
  }
`;

export default function PostReview() {
    const [isLoading, setIsLoading] = useState(false);
    const [text, setText] = useState("");
    const [file, setFile] = useState<string | null>(null);

    const onChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
        setText(event.target.value);
    }

    const onFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const { files } = event.target;
        
        if (files && files.length === 1 && files[0].size < 1024 * 1024) {
            const reader = new FileReader();

            reader.onloadend = () => {
                setFile(reader.result as string);
            }

            reader.readAsDataURL(files[0]);
        }
    }

    const onSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const user = auth.currentUser;
        if (!user || isLoading || text === "" || text.length > 180) return;
        
        try {
            setIsLoading(true);
            const reviewRef = collection(db, "reviews");
            const docRef = await addDoc(reviewRef, {
                text,
                createdAt: Date.now(),
                username: user.displayName || "익명의 사용자",
                userId: user.uid,
                fileUrl: file,
            });
            setText("");
            setFile(null);
        } catch (error) {
            console.log(error);
        } finally {
            setIsLoading(false);
        }
    }
  return (
    <Form onSubmit={onSubmit}>
        <Textarea rows={5} maxLength={180} placeholder="리뷰를 작성해볼까요?" value={text} onChange={onChange} required />
        <AttachFileButton htmlFor="file">{file ? "사진 첨부 완료" : "사진 첨부"}</AttachFileButton>
        <AttachFileInput type="file" id="file" accept="image/*" onChange={onFileChange} />
        <SubmitButton type="submit" value={isLoading ? "Loading..." : "리뷰 작성"} />
    </Form>
  );
}