import React from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "./App.css";

const Layout = React.lazy(() => import("./layouts/RootLayout"));
const Home = React.lazy(() => import("./pages/Home"));
const Login = React.lazy(() => import("./pages/Login"));
const BlogPost = React.lazy(() => import("./pages/BlogPost"));
const NewBlogPost = React.lazy(() => import("./pages/NewBlogPost"));
const EditBlogPost = React.lazy(() => import("./pages/EditBlogPost"));
const NotFound = React.lazy(() => import("./pages/NotFound"));
const Register = React.lazy(() => import("./pages/Register"));
const ProtectedRoute = React.lazy(() => import("./components/ProtectedRoute"));
import { AuthProvider } from "../src/context/AuthContext";

const routes = [
  { path: "/", element: <Home /> },
  { path: "/login", element: <Login /> },
  { path: "/posts/:postID", element: <BlogPost /> },
  {
    path: "/posts/new",
    element: (
      <ProtectedRoute>
        <NewBlogPost />
      </ProtectedRoute>
    ),
  },
  {
    path: "/posts/:postID/edit",
    element: (
      <ProtectedRoute>
        <EditBlogPost />
      </ProtectedRoute>
    ),
  },
  { path: "/register", element: <Register /> },
];

const router = createBrowserRouter([
  {
    element: <Layout />,
    errorElement: <NotFound />,
    children: routes,
  },
]);

function App() {
  return (
    <AuthProvider>
      <RouterProvider router={router} />
    </AuthProvider>
  );
}

export default App;
