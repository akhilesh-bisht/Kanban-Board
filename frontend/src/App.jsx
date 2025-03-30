// import React, { useState, useEffect } from "react";
// import {
//   BrowserRouter as Router,
//   Routes,
//   Route,
//   Navigate,
// } from "react-router-dom";
// import Login from "./pages/Login";
// import Register from "./pages/Register";
// // import Dashboard from "./pages/Dashboard";
// import { getToken } from "./utils/auth";
// import "./index.css";

// function App() {
//   const [isAuthenticated, setIsAuthenticated] = useState(!!getToken());

//   useEffect(() => {
//     const syncAuthState = () => {
//       setIsAuthenticated(!!getToken());
//     };

//     window.addEventListener("storage", syncAuthState);
//     return () => window.removeEventListener("storage", syncAuthState);
//   }, []);

//   return (
//     <Router>
//       <Routes>
//         <Route
//           path="/"
//           element={isAuthenticated ? <Dashboard /> : <Navigate to="/login" />}
//         />
//         <Route
//           path="/login"
//           element={
//             isAuthenticated ? (
//               <Navigate to="/" />
//             ) : (
//               <Login setAuth={setIsAuthenticated} />
//             )
//           }
//         />
//         <Route
//           path="/register"
//           element={
//             isAuthenticated ? (
//               <Navigate to="/" />
//             ) : (
//               <Register setAuth={setIsAuthenticated} />
//             )
//           }
//         />
//       </Routes>
//     </Router>
//   );
// }

// export default App;

import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import Register from "./pages/Register";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        {/* Default route redirects to register */}
        <Route path="*" element={<Register />} />
      </Routes>
    </Router>
  );
}

export default App;
