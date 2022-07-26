import { makeStyles } from "@mui/styles";

export default makeStyles(theme => ({
  linkWrapper: {
    maxWidth: "200px",
    marginRight: "5px",
    '&:hover': {
      paddingLeft: '5px',
      marginLeft: '-5px',
      backgroundColor: '#bbbbbb',
      borderRadius: '5px',
    },
  },

  decoratedLink: {
    textDecoration: 'none',
    color: 'inherit'
  },

  pageFooter: {
    marginTop: '30px'
  },

  footerLinks: {
    padding: '20px',
    backgroundColor: 'lightGrey'
  },

  logoImage: {
    margin: '0 auto',
    textAlign: 'center'
  },

  footerNotice: {
    width: '100%',
    color: '#cccccc',
    backgroundColor: 'grey',
    padding: '20px 50px 20px 50px',
  },

  footerNoticeTypography: {
    fontSize: 9,
    display: 'block'
  }

}));
