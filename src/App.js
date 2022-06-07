import React from "react";
import { Route, Routes } from "react-router-dom";
import Login from "./pages/Login";
import PostList from "./pages/PostList";
import ReadPost from "./pages/ReadPost";
import Register from "./pages/Register";
import WritePost from "./pages/WritePost";
import {Helmet} from "react-helmet-async";

const App = () => {
  return (
    <>
    <Helmet>
      <title>ALBATROSS FORK</title>
    </Helmet>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/" element={<PostList />} exact />
        <Route path="/@:username" element={<PostList />} exact />
        <Route path="/@:username/:postId" element={<ReadPost />} />
        <Route path="/write" element={<WritePost />} />
      </Routes>
    </>
  );
};

export default App;
