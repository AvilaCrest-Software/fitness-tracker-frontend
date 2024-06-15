import { Outlet } from "react-router-dom";
import { Grid } from "@mui/material";

function Dashboard() {
  return (
    <Grid className="h-100" container flexDirection={"row"}>
      <Outlet />
    </Grid>
  );
}

export default Dashboard;