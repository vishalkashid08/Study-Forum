import Layout from "./components/Layout";
import { Routes, Route } from "react-router-dom";
import Questions from "./pages/Questions";
import QuestionDetails from "./pages/QuestionDetails";
import AddQuestion from "./pages/AddQuestion";
import Notes from "./pages/Notes";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Home from "./pages/Home";
import PrivateRoute from "./components/PrivateRoute";

import AdminDashboard from "./admin/pages/AdminDashboard";
import ManageUsers from "./admin/pages/ManageUsers";
import ManageQuestions from "./admin/pages/ManageQuestions";

function App() {
return ( <Routes>


  {/* Public Routes */}
  <Route path="/" element={<Login />} />
  <Route path="/register" element={<Register />} />

  {/* USER PANEL */}
  <Route
    path="/user/dashboard"
    element={
      <PrivateRoute>
        <Layout />
      </PrivateRoute>
    }
  >
    <Route index element={<Home />} />
    <Route path="questions" element={<Questions />} />
    <Route path="questions/:id" element={<QuestionDetails />} />
    <Route path="ask" element={<AddQuestion />} />
    <Route path="notes" element={<Notes />} />
  </Route>

  {/* ADMIN PANEL */}
  <Route
    path="/admin/dashboard"
    element={
      <PrivateRoute>
        <AdminDashboard />
      </PrivateRoute>
    }
  />

  <Route
    path="/admin/users"
    element={
      <PrivateRoute>
        <ManageUsers />
      </PrivateRoute>
    }
  />

  <Route
    path="/admin/questions"
    element={
      <PrivateRoute>
        <ManageQuestions />
      </PrivateRoute>
    }
  />

  {/* 404 */}
  <Route
    path="*"
    element={
      <div className="text-center mt-5">
        <h1>404</h1>
        <p>Page Not Found</p>
      </div>
    }
  />

</Routes>


);
}

export default App;
