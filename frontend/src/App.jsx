// import React, { useState, useEffect } from "react";
// import {
//   BrowserRouter as Router,
//   Routes,
//   Route,
//   Navigate,
// } from "react-router-dom";
// import Login from "./pages/Login";
// import Register from "./pages/Register";
// import Dashboard from "./pages/Dashboard";
// import { getToken } from "./utils/auth";
// import "./index.css";

// function App() {
//   const [isAuthenticated, setIsAuthenticated] = useState(!!getToken());

//   useEffect(() => {
//     setIsAuthenticated(!!getToken());
//   }, []);

//   return (
//     <Router>
//       <Routes>
//         <Route
//           path="/"
//           element={isAuthenticated ? <Dashboard /> : <Navigate to="/login" />}
//         />
//         <Route path="/login" element={<Login setAuth={setIsAuthenticated} />} />
//         <Route
//           path="/register"
//           element={<Register setAuth={setIsAuthenticated} />}
//         />
//       </Routes>
//     </Router>
//   );
// }

// export default App;

import React, { useState } from "react";
import BoardList from "./components/BoardList";
import ListView from "./components/ListView";

const App = () => {
  const [selectedBoard, setSelectedBoard] = useState(null);

  return (
    <div className="p-8">
      <h1 className="text-3xl font-bold">Kanban Board</h1>
      <div className="flex gap-4">
        <BoardList onSelectBoard={setSelectedBoard} />
        {selectedBoard && <ListView boardId={selectedBoard} />}
      </div>
    </div>
  );
};

export default App;
