
import { useState, useEffect, FormEvent, SyntheticEvent } from 'react';
import { useDispatch } from 'react-redux';
import useGoTo from '../../customHooks/useGoTo';
import * as Yup from 'yup';
import { AppDispatch } from '../../store/store';
import { login, setUser } from '../../store/auth/authSlice'
import { Button, Grid, Typography, TextField, Divider, FormControlLabel, Checkbox } from '@mui/material';

function Login() {
  const dispatch = useDispatch<AppDispatch>();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [rememberMe, setRememberMe] = useState(false);
  const [loading, setLoading] = useState(false);
  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const goTo = useGoTo();

  useEffect(() => {
    const lsRememberMe = window.localStorage.getItem("ttp_remember_me");

    if (lsRememberMe) {
      const loginData = JSON.parse(lsRememberMe);
      setRememberMe(true);
      setEmail(loginData.email);
      setPassword(loginData.password);
    } 
  }, [])

  const validationSchema = Yup.object({
    email: Yup.string().required('Email is required').matches(/^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/,'Invalid email address'),
    password: Yup.string().required('Password is required'),
  });

  const validateField = async (field: string, value: string) => {
    try {
      await validationSchema.validateAt(field, { [field]: value });
      return '';
    } catch (error) {
      return (error as Yup.ValidationError).message;
    }
  };

  const validateForm = async () => {
    const emailError = await validateField('email', email);
    const passwordError = await validateField('password', password);
    setEmailError(emailError);
    setPasswordError(passwordError);
    return !emailError && !passwordError;
  };

  const HandleEmailChange = async (e: SyntheticEvent) => {
    const target = e.target as HTMLInputElement;
    setEmail(target.value);
    const error = await validateField('email', target.value);
    setEmailError(error);
  }

  const HandlePasswordChange = async (e: SyntheticEvent) => {
    const target = e.target as HTMLInputElement;
    setPassword(target.value);
    const error = await validateField('password', target.value);
    setPasswordError(error);
  }

  const HandleRememberMeChange = (e: SyntheticEvent) => {
    const target = e.target as HTMLInputElement;
    setRememberMe(target.checked)

    if (!target.checked) {
      window.localStorage.removeItem("ttp_remember_me");
    }
  }

  const HandleLogin = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const isValid = await validateForm();

    if (!isValid) {
      return;
    }

    dispatch(login({
      email,
      password,
    }))
      .unwrap()
      .then(res => {
        const user = {
          email,
          password,
        }

        // TODO: Encrypt password
        if (rememberMe) {
          window.localStorage.setItem("ttp_remember_me", JSON.stringify(user));
        }

        dispatch(setUser(res));
        goTo("home");
      })
      .catch(error => {
        console.log("ERROR: ", error);
        //dispatch(showSnackbar(error.msg));
      })
      .finally(() => {
        setLoading(false);
      });
  }

  return (
    <form className="w-100" noValidate onSubmit={HandleLogin}>
      <Grid container item flexDirection={"column"}>
        <Typography variant="subtitle1">
          Email
        </Typography>
        <Grid className="input-row mb-5" container item flexDirection={"row"} alignItems="center" justifyContent='center'>
          <TextField
            value={email}
            name="email"
            variant="outlined"
            fullWidth
            size='small'
            color='secondary'
            disabled={loading}
            error={Boolean(emailError)}
            helperText={emailError}
            onChange={HandleEmailChange}
          />
        </Grid>
        <Typography variant="subtitle1">
          Password
        </Typography>
        <Grid className="input-row" container item flexDirection={"row"} alignItems="center" justifyContent='center'>
          <TextField
            value={password}
            name="password"
            variant="outlined"
            type="password"
            fullWidth
            size='small'
            color='secondary'
            disabled={loading}
            error={Boolean(passwordError)}
            helperText={passwordError}
            onChange={HandlePasswordChange}
          />
        </Grid>
        <Grid className="input-row" container item flexDirection={"row"} alignItems="center">
          <FormControlLabel control={<Checkbox checked={rememberMe} color="secondary" disabled={loading} onChange={HandleRememberMeChange} />} label="Remember me" sx={{ margin: "0" }} />
        </Grid>
        <Grid className="action-row" container item flexDirection={"row"} alignItems="center" justifyContent='center'>
          <Button color='primary' variant='contained' disabled={loading} type="submit">
            Login
          </Button>
        </Grid>
        <Grid className="auth-extra-actions-row" container item flexDirection={"row"} alignItems="center" justifyContent='center'>
          <span className="auth-extra-action">
            Forgot password
          </span>
        </Grid>
        <Grid className="auth-extra-actions-row" container item flexDirection={"row"} alignItems="center" justifyContent='center'>
          <span>
            { "Don't have an account? " }
          </span>
          <span className="auth-extra-action">
            Register
          </span>
          <Divider className="vertical-divider" orientation="vertical" flexItem />
          <span className="auth-extra-action" onClick={() => goTo("home")}>
            Home
          </span>
        </Grid>
      </Grid>
    </form>
  );
}
  
export default Login;
  