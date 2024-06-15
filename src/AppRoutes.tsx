
import { Routes, Route, Navigate } from "react-router-dom";
import { useSelector } from 'react-redux';
import { RootState } from "./store/store";
import Dashboard from "./containers/Dashboard";
import Home from "./containers/Home";
import Auth from "./containers/Auth";
import Login from "./components/Auth/Login";

function AppRoutes() {
  const user = useSelector((state: RootState) => state.auth.user);

  return (
    <Routes>
      <Route element={<Dashboard />}>
        <Route index path="home" element={<Home />} />
      </Route>
      {!user && 
        <Route element={<Auth />}>
          <Route path="login" element={<Login />}></Route>
        </Route>
      }
      <Route path="*" element={<Navigate to="/home" />} />
    </Routes>
  )
}

export default AppRoutes
