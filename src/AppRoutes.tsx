
import { useEffect } from 'react';
import { Routes, Route, Navigate } from "react-router-dom";
import { useDispatch, useSelector } from 'react-redux';
import { RootState, AppDispatch } from "./store/store";
import { validateSession, setUser } from './store/auth/authSlice';
import Dashboard from "./containers/Dashboard";
import Home from "./containers/Home";
import Auth from "./containers/Auth";
import Login from "./components/Auth/Login";

function AppRoutes() {
  const dispatch = useDispatch<AppDispatch>();
  const user = useSelector((state: RootState) => state.auth.user);

  useEffect(() => {
    dispatch(validateSession())
      .unwrap()
      .then(res => {
        dispatch(setUser(res));
      })
      .catch(error => {
        console.log("ERROR: ", error);
        //dispatch(showSnackbar(error.msg));
        //validateError(error);
      });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

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
