import { makeStyles } from "@mui/styles";
import hero from 'assets/hero.jpg'

export default makeStyles(theme => ({
  heroContent: {
    backgroundColor: theme.palette.background.paper,
    backgroundImage: 'url('+hero+')',
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    padding: theme.spacing(8, 0, 6),
  },
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
  cardLink: {
    textDecoration: 'none',
    '&:hover': {
      textDecoration: 'none',
    },
    height: '100%',
    display: 'flex',
    flexDirection: 'column',
    flex: 1
  },
  cardMedia: {
    paddingTop: '56.25%', // 16:9
  },
  cardContent: {
    flexGrow: 1,
    textAlign: "center"
  }
}))
