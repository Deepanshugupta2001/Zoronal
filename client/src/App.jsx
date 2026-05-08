  import Signup from "./Pages/Signup";
  import { Navigate, Route, Routes } from "react-router";
  import useAuth from "./context/authContext.jsx";
  import Dashboard from "./Pages/Dashboard";
  import Login from "./Pages/Login";
  import CompanyDetails from "./Pages/CompanyDetails";

  const App = () => {
    const { isLoggedIn } = useAuth();

    return (
      <Routes>
        <Route
          path="/signup"
          element={!isLoggedIn ? <Signup /> : <Navigate to="/dashboard" />}
        />
        <Route
          path="/dashboard"
          element={isLoggedIn ? <Dashboard /> : <Navigate to="/login" />}
        />
        <Route
          path="/company/:id"
          element={isLoggedIn ? <CompanyDetails /> : <Navigate to="/login" />}
        />
        <Route
          path="/login"
          element={!isLoggedIn ? <Login /> : <Navigate to="/dashboard" />}
        />
        <Route path="*" element={<Navigate to="/dashboard" />} />
      </Routes>
    );
  };

  export default App;
