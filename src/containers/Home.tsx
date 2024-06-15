import useGoTo from '../customHooks/useGoTo';
import { Grid, Typography } from "@mui/material";

function Home() {
  const goTo = useGoTo();

  return (
    <Grid className="h-100 w-100" container item flexDirection={"column"} alignContent={"center"} justifyContent={"center"}>
      <Grid container flexDirection={"row"} alignContent={"center"} justifyContent={"center"}>
        <Typography variant="h1">
            Home
        </Typography>
      </Grid>
      <Grid container flexDirection={"row"} alignContent={"center"} justifyContent={"center"}>
        <Typography className="website-link" variant="h3" onClick={() => goTo('login')}>
            To Login
        </Typography>
      </Grid>
    </Grid>
  );
}
  
export default Home;