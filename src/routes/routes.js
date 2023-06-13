import React from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'

import ProtectedRoute from './protected.route'
// import Page404 from "../pages/page404";
// import SignIn from "../pages/signIn";
// import SignupForm from "../pages/signup";
import HomeLayout from '../layouts/homeLayout'
import Home from '../pages/home'
import Auth from '../pages/auth'

const routes = () => (
  <BrowserRouter>
    <Routes>
      {/* {["/", "signin"].map((path) => (
        <Route
          key={path}
          path={path}
          element={
            <AuthLayout>
              <SignIn />
            </AuthLayout>
          }
        />
      ))} */}
      <Route
        path="/"
        element={
          // <ProtectedRoute>
          <HomeLayout>
            <Auth />
          </HomeLayout>
          // </ProtectedRoute>
        }
      />
      <Route
        path="/home"
        element={
          <ProtectedRoute>
            <HomeLayout>
              <Home />
            </HomeLayout>
          </ProtectedRoute>
        }
      />
      {/* /*
      <Route path="/*" element={<Page404 />} /> */}
    </Routes>
  </BrowserRouter>
)

export default routes
