import client from "./client";
import qs from "qs";

export const WritePost = ({ title, body, tags }) =>
  client.post("/api/posts", { title, body, tags });

export const readPost = (id) => client.get(`/api/posts/${id}`);

export const postList =({page, username, tag})=>{
  const queryString = qs.stringify({ 
  page,
  username,
  tag,
});
  return client.get(`/api/posts?${queryString}`);
};

export const updatePost = ({id, title,body, tags})=>
  client.patch(`/api/posts/${id}`,{title,body,tags});

export const deletePost = (id)=>client.delete(`/api/posts/${id}`);


// export const writeComment = ({id, title, body})=>
//   client.post(`/api/posts/${id}`,{title,body});


