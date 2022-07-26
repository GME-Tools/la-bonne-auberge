import { AppBar, Toolbar, Typography } from "@mui/material";
import useStyles from './AppBar_css';

export default function Admin() {
  const classes = useStyles();
  return (
    <div className={classes.appbarWrapper}>
      <AppBar className={classes.appbar}>
        <Toolbar className={classes.toolbar}>
          <div className={classes.logoContainer}>
            <img className={classes.logoImage} src="/logo192.png" alt="" width={32} height={32} />
            <Typography className={classes.logoText} variant="h4">La Bonne Auberge</Typography>
          </div>
        </Toolbar>
      </AppBar>
    </div>
  );
}
