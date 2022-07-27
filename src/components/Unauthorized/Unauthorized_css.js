import { makeStyles } from "@mui/styles";

export default makeStyles(theme => ({
  container: {
    paddingTop: '50px'
  },

  closedImage: {
    width: '100%'
  },

  closedText: {
    width: '100%',
    textAlign: 'center'
  },

  loginLine: {
    marginTop: '5px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center'
  },

  googleButton: {
    color: 'white',
    backgroundColor: '#dd4b39',
    '&:hover': {
      backgroundColor: '#a40f11'
    },
    marginLeft: '10px'
  }
}));
