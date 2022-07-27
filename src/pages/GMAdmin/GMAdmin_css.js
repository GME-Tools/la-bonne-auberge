import { makeStyles } from "@mui/styles";

export default makeStyles(theme => ({
  adminWrapper: {
    display: 'block'
  },

  container: {
    paddingTop: '50px'
  },

  welcomeLine: {
    display: 'flex',
    alignItems: 'center',
    width: '100%',
    minHeight: '50px',
    position: 'relative'
  },

  campaignBox: {
    margin: "10px auto 10px auto"
  },

  fileLoaderLine: {
    display: "inline-block"
  },

  rowContent: {
    position: 'relative'
  },

  disabler: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(255, 255, 255, .9);',
    alignItems: 'center',
    justifyContent: 'center'
  },

  createButton: {
    position: 'absolute',
    right: 20,
    bottom: -20
  }
}));
