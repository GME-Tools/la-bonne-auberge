import { makeStyles } from "@mui/styles";

export default makeStyles(theme => ({
  cardGrid: {
    paddingTop: theme.spacing(8),
    paddingBottom: theme.spacing(8),
  },
  card: {
    height: '100%',
    display: 'flex',
    flexDirection: 'column',
    flex: 1,
    '&:hover': {
      transform: "scale(1.02)"
    }
  },
  avatar: {
    marginRight: "10px"
  },
  systemLine: {
    marginTop: '-10px',
    display: "flex",
    alignItems: "center",
  },
  pdfLink: {
    textDecoration: 'none',
    '&:hover': {
      textDecoration: 'none',
    },
    height: '100%',
    display: 'flex',
    flexDirection: 'column',
    flex: 1
  },
  divider: {
    margin: '5px 0 15px 0'
  },
  cardMedia: {
    paddingTop: '56.25%', // 16:9
  },
  cardContent: {
    flexGrow: 1
  },
  cardAction: {
    marginTop: 'auto',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'flex-start'
  }
}));
