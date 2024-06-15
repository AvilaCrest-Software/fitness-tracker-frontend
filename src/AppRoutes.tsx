
import { Routes, Route } from "react-router-dom";
import { useSelector } from 'react-redux';
import { RootState } from "./store/store";
import Auth from "./containers/Auth";
import Login from "./components/Auth/Login";

function AppRoutes() {
  const user = useSelector((state: RootState) => state.auth.user);

  return (
    <Routes>
      {!user && 
      <Route element={<Auth />}>
        <Route path="login" element={<Login />}></Route>
      </Route>}
    </Routes>
  )
}

export default AppRoutes
