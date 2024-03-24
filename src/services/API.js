import axios from "./axiosInstance";

function getAccessTokenFromCookie() {
  const cookies = document.cookie.split(";");
  for (const cookie of cookies) {
    const [name, value] = cookie.split("=");
    if (name.trim() === "accessToken") {
      return value;
    }
  }
  return null;
}

export async function registerUser(registerData) {
  const res = await axios.post("/register", registerData);
  return res.data;
}

export async function loginUser(loginData) {
  const res = await axios.post("/login", loginData);
  return res.data;
}

export async function logoutUser() {
  await axios.post("/logout");
}

export async function getAuthInfo() {
  const res = await axios.get("/auth");
  return res.data;
}

export async function createBlogPost(postDetails) {
  await getAuthInfo();
  const accessToken = getAccessTokenFromCookie();
  const res = await axios.post(`/posts`, postDetails, {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  });
  return res.data;
}

export async function fetchAllBlogPosts() {
  const res = await axios.get("/posts");
  return res.data;
}

export async function fetchBlogPost(postID) {
  const res = await axios.get(`/posts/${postID}`);
  return res.data;
}

export async function deleteBlogPost(postID) {
  await getAuthInfo();
  const accessToken = getAccessTokenFromCookie();
  const res = await axios.delete(`/posts/${postID}`, {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  });
  return res.data;
}

export async function fetchComments(postID) {
  const res = await axios.get(`/posts/${postID}/comments`);
  return res.data;
}

export async function addComment(postID, comment) {
  await getAuthInfo();
  const accessToken = getAccessTokenFromCookie();
  const res = await axios.post(`/posts/${postID}/comments`, comment, {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  });
  return res.data;
}

export async function deleteComment(postID, commentID) {
  await getAuthInfo();
  const accessToken = getAccessTokenFromCookie();
  const res = await axios.delete(`/posts/${postID}/comments/${commentID}`, {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  });
  return res.data;
}

export async function updateBlogPost(postID, updatedBlogPost) {
  await getAuthInfo();
  const accessToken = getAccessTokenFromCookie();
  const res = await axios.put(`/posts/${postID}`, updatedBlogPost, {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  });
  return res.data;
}
