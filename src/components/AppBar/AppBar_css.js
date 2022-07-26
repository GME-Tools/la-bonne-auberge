import { makeStyles } from "@mui/styles";
import hero from 'assets/hero.jpg';

export default makeStyles(theme => ({
  appbarWrapper: {
    backgroundImage: 'url('+hero+')',
    backgroundSize: 'cover'
  },

  appbar: {
    margin: 0,
    padding: 0,
    overflow: "hidden",
    position: "relative",
    marginBottom: '20px',
    background: 'transparent'
  },

  logoContainer: {
    flex: 1,
  },
  
  logoImage: {
    display: "inline-block",
    margin: "0 10px 0 0",
    verticalAlign: "middle",
    filter: theme.palette.primaryFilter
  },

  logoText: {
    display: "inline-block",
    verticalAlign: "middle",
  }
}));
