import { createBrowserRouter, RouterProvider } from "react-router-dom"
import Layout from "./components/layout"
import Home from "./routes/home"
import Profile from "./routes/profile"
import Login from "./routes/login";
import CreateAccount from "./routes/create-account";
import reset from "styled-reset";
import styled, { createGlobalStyle } from "styled-components";
import { useEffect, useState } from "react";
import LoadingScreen from "./components/loading-screen";
import { auth } from "./firebase";
import ProtectedRoute from "./components/protected-route";
import Search from "./routes/search";
import Bookmark from "./routes/bookmark";
import Post from "./routes/post";

const router = createBrowserRouter([
  {
    path: "/",
    element: <ProtectedRoute><Layout /></ProtectedRoute>,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/profile",
        element: <Profile />,
      },
      {
        path: "/search",
        element: <Search />,
      },
      {
        path: "/bookmark",
        element: <Bookmark />,
      },
      {
        path: "/post",
        element: <Post />, 
      },
    ],
  },
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/create-account",
    element: <CreateAccount />,
  },
]);

const GlobalStyle = createGlobalStyle`
  ${reset};
  body {
    background-color: black;
    color: white;
    font-family: system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
    box-sizing: border-box;
    line-height: 1.3;
  }
`;

const Wrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(true);
  const init = async () => {
    await auth.authStateReady();

    const user = auth.currentUser;
    if (user) {
      setIsLoggedIn(true);
    }
  }

  useEffect(() => {
    init();
  }, []);

  return (
    <Wrapper>
      <GlobalStyle />
      {isLoggedIn ? <RouterProvider router={router} /> : <LoadingScreen />}
    </Wrapper>
  );
}

export default App
