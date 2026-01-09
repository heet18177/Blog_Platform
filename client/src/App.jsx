// import React, { useEffect, useState } from 'react'
// import {BrowserRouter , Routes , Route, Navigate} from 'react-router-dom'
// import Home from './pages/Home'
// import Signup from './pages/Signup'
// import Login from './pages/Login'
// import About from './pages/About'
// import Blog from './pages/Blog'
// import Navbar from './components/Navbar'
// import axios from 'axios'
// import { useDispatch, useSelector } from 'react-redux'
// import { setUserdata } from './redux/Userslice'
// import Footer from './components/Footer'
// import AdminPage from './Admin/AdminPage'
// import BlogDetail from './pages/BlogDetail'

// const App = () => {
//   const {userdata} = useSelector((state)=>state.user);
//   const dispatch = useDispatch();
//   const [checkingAuth, setCheckingAuth] = useState(true);

//   useEffect(()=>{
//     const fetchUser = async()=>{
//       try {
//         const result = await axios.get("http://localhost:5000/api/auth/get-current-user", { withCredentials: true });
//         console.log(result.data);
//         if (result.data && result.data.user) {
//           dispatch(setUserdata(result.data.user));
//         }
//       } catch (error) {
//         console.log("No user logged in" , error);
//       }
//       finally {
//         setCheckingAuth(false);
//       }
//     }
//     fetchUser();
//   } , [dispatch]);
//   return (
//     <BrowserRouter>
//       <Routes>
//         <Route
//           path="/"
//           element={
//             <>
//               <Navbar />
//               <Home />
//               <Footer />
//             </>
//           }
//         />
//         <Route path="/signup" element={<Signup />} />
//         <Route path="/login" element={<Login />} />
//         <Route
//           path="/blog"
//           element={
//             checkingAuth ? (
//               <div />
//             ) : userdata ? (
//               <Blog />
//             ) : (
//               <Navigate to="/login" />
//             )
//           }
//         />
//         <Route
//           path="/about"
//           element={
//             <>
//               <About />
//               <Footer />
//             </>
//           }
//         />
//         <Route
//           path="/AdminPage"
//           element={
//             checkingAuth ? (
//               <div />
//             ) : userdata?.role === "admin" ? (
//               <AdminPage />
//             ) : (
//               <Blog />
//             )
//           }
//         />

//         <Route path="/blog/:id" element={<BlogDetail />} />
//       </Routes>
//     </BrowserRouter>
//   );
// }

// export default App

import React, { useEffect, useState } from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Home from "./pages/Home";
import Signup from "./pages/Signup";
import Login from "./pages/Login";
import About from "./pages/About";
import Blog from "./pages/Blog";
import Navbar from "./components/Navbar";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { setUserdata } from "./redux/Userslice";
import Footer from "./components/Footer";
import AdminPage from "./Admin/AdminPage";
import BlogDetail from "./pages/BlogDetail";
import ProtectedRoute from "./components/ProtectedRoute";
import EditProfile from "./pages/EditProfile";
import EditBlog from "./Admin/EditBlog";

const App = () => {
  const dispatch = useDispatch();
  const [checkingAuth, setCheckingAuth] = useState(true);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const result = await axios.get(
          `${SERVER_URL}/api/auth/get-current-user`,
          { withCredentials: true }
        );

        if (result.data?.user) {
          dispatch(setUserdata(result.data.user));
        }
      } catch (error) {
        console.log("No user logged in", error);
      } finally {
        setCheckingAuth(false);
      }
    };

    fetchUser();
  }, [dispatch]);

  if (checkingAuth) {
    return (
      <div className="h-screen flex items-center justify-center">
        Loading...
      </div>
    );
  }

  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/"
          element={
            <>
              <Navbar />
              <Home />
              <Footer />
            </>
          }
        />

        {/* Auth */}
        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Login />} />

        <Route
          path="/blog"
          element={
            <>
              <ProtectedRoute>
                <Blog />
              </ProtectedRoute>
              <Footer />
            </>
          }
        />

        <Route
          path="/blog/:id"
          element={
            <>
              <ProtectedRoute>
                <BlogDetail />
              </ProtectedRoute>
              <Footer />
            </>
          }
        />

        {/* About */}
        <Route
          path="/about"
          element={
            <>
              <About />
              <Footer />
            </>
          }
        />

        {/* Admin */}
        <Route
          path="/AdminPage"
          element={
            <ProtectedRoute allowedRoles={["admin"]}>
              <AdminPage />
            </ProtectedRoute>
          }
        />

        <Route
          path="/EditProfile"
          element={
            <>
              <ProtectedRoute>
                <EditProfile />
                <Footer />
              </ProtectedRoute>
            </>
          }
        />

        <Route
          path="/edit-blog/:id"
          element={
            <ProtectedRoute allowedRoles={["admin"]}>
              <EditBlog />
            </ProtectedRoute>
          }
        />

        {/* 404 */}
        <Route path="*" element={<h1>404 Page Not Found</h1>} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
