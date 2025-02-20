import { Outlet, useNavigate, useLocation } from "react-router-dom";
import { auth } from "../../firebase";
import { signOut } from "firebase/auth";
import { Wrapper, Menu, StyledLink, MenuItem, MenuContainer, PostButton, ButtonContainer } from "../header/header-components";
import { MainWrapper, MainContainer, Sidebar, Top, Bottom, ProfileImage, SideTitle, More, SubName, UserInfo } from "./main-components";
import { Logo } from "../header/header-components";
import Trending from "../trending/trending";
import Follow from "../follow/follow";
import Modal from "../modal/modal";
import { useState } from "react";

export default function Layout() {
  const navigate = useNavigate();
  const location = useLocation();
  const user = auth.currentUser;
  const [isModalOpen, setIsModalOpen] = useState(false);
  // console.log(user);
  
  const onLogout = async () => {
    setIsModalOpen(true);
  }

  const handleClose = () => {
    setIsModalOpen(false);
  };

  const handleConfirm = async () => {
    try {
      setIsModalOpen(false);
      await signOut(auth);
      navigate("/login");
    } catch (error) {
      console.error("Error logging out:", error);
    }
  };

  return (  
    <Wrapper>
      <Menu>
        <MenuContainer>
          <StyledLink to="/">
            <MenuItem>
              <Logo>Z</Logo>
            </MenuItem>
            <MenuItem $isActive={location.pathname === "/"}>
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} className="size-6" stroke="white"><path strokeLinecap="round" strokeLinejoin="round" d="m2.25 12 8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h8.25" /></svg>
              Home
            </MenuItem>
          </StyledLink>
          <StyledLink to="/search">
            <MenuItem $isActive={location.pathname === "/search"}>
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="white" className="size-6"><path strokeLinecap="round" strokeLinejoin="round" d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z" /></svg>
            Explore
            </MenuItem>
          </StyledLink>
          <StyledLink to="/profile">
            <MenuItem $isActive={location.pathname === "/profile"}>
              {user?.photoURL ? <ProfileImage src={user.photoURL} alt="" /> : <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} className="size-6" stroke="white"><path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0ZM4.501 20.118a7.5 7.5 0 0 1 14.998 0A17.933 17.933 0 0 1 12 21.75c-2.676 0-5.216-.584-7.499-1.632Z" /></svg>}
              <UserInfo>
                {user?.displayName || "Profile"}
                <SubName>@{user?.email?.split("@")[0]}</SubName>
              </UserInfo>
            </MenuItem>
          </StyledLink>
          <StyledLink to="/bookmark">
            <MenuItem $isActive={location.pathname === "/bookmark"}>
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6"><path strokeLinecap="round" strokeLinejoin="round" d="M17.593 3.322c1.1.128 1.907 1.077 1.907 2.185V21L12 17.25 4.5 21V5.507c0-1.108.806-2.057 1.907-2.185a48.507 48.507 0 0 1 11.186 0Z" /></svg>
              Bookmark
            </MenuItem>
          </StyledLink>
          <MenuItem onClick={onLogout}>
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} className="size-6" stroke="white"><path strokeLinecap="round" strokeLinejoin="round" d="M8.25 9V5.25A2.25 2.25 0 0 1 10.5 3h6a2.25 2.25 0 0 1 2.25 2.25v13.5A2.25 2.25 0 0 1 16.5 21h-6a2.25 2.25 0 0 1-2.25-2.25V15m-3 0-3-3m0 0 3-3m-3 3H15" /></svg>
            Logout
          </MenuItem>
          <MenuItem onClick={onLogout}>
          </MenuItem>
        </MenuContainer>
        <ButtonContainer onClick={() => navigate("/post")}>
          <PostButton>리뷰 작성하기</PostButton>
        </ButtonContainer>
      </Menu>
      <MainWrapper>
        <MainContainer>
          <Outlet />
        </MainContainer>
        <Sidebar>
          <Top>
            <SideTitle>트렌딩</SideTitle>
            {[1,2,3,4,5].map((_, index) => (
              <Trending key={index}></Trending>
            ))}
            <More>더보기</More>
          </Top>
          <Bottom>
            <SideTitle>팔로우 추천</SideTitle>
            {[1,2,3].map((_, index) => (
              <Follow key={index}></Follow>
            ))}
            <More>더보기</More>
          </Bottom>
        </Sidebar>
      </MainWrapper>
      <Modal
        isOpen={isModalOpen}
        message="정말 로그아웃 하시겠습니까?"
        onConfirm={handleConfirm}
        onClose={handleClose}
      />
    </Wrapper>
  )
}