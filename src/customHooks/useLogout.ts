import { useDispatch } from 'react-redux';
import { AppDispatch } from "../store/store";
import { setUser } from '../store/auth/authSlice';
import useGoTo from './useGoTo';

const useLogout = () => {
  const dispatch = useDispatch<AppDispatch>();
  const goTo = useGoTo();

  const Logout = () => {
    window.localStorage.removeItem("ttp_token");
    dispatch(setUser(null));
    goTo("home");
  };

  return Logout;
};

export default useLogout;