import { useSelector } from 'react-redux';
import { RootState } from '../store/store';
import useGoTo from '../customHooks/useGoTo';
import useLogout from '../customHooks/useLogout';
import { Grid, Typography, Button } from "@mui/material";

function Home() {
  const user = useSelector((state: RootState) => state.auth.user);
  const goTo = useGoTo();
  const logout = useLogout();

  const HandleLogout = () => {
    logout();
  }

  return (
    <Grid className="h-100 w-100" container item flexDirection={"column"} alignContent={"center"} justifyContent={"center"}>
      <Grid container flexDirection={"row"} alignContent={"center"} justifyContent={"center"}>
        <Typography variant="h1">
            Home
        </Typography>
      </Grid>
      <Grid container flexDirection={"row"} alignContent={"center"} justifyContent={"center"}>
        {
          !user &&
          <Typography className="website-link" variant="h3" onClick={() => goTo('login')}>
            To Login
          </Typography>
        }
        {
          user &&
          <Button color='primary' variant='contained' onClick={HandleLogout}>
            Logout
          </Button>
        }
      </Grid>
    </Grid>
  );
}
  
export default Home;