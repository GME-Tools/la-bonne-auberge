import { Container, Fab, Icon, Typography } from "@mui/material";
import { useFirebase } from "context/FirebaseContext";
import useStyles from './Unauthorized_css';

import closed from 'assets/closed.png';
import restricted from 'assets/restricted.png';

export function Unauthorized() {
  const classes = useStyles();
  const firebase = useFirebase();
  
  return (
    <Container maxWidth="sm" className={classes.container}>
      <img src={closed} alt="Closed Sign" className={classes.closedImage}/>
      <div className={classes.closedText}>
        <Typography variant="body1">
          Oh oh, cet emplacement n'est pas disponible aux utilisateurs anonymes ...
        </Typography>
        <div className={classes.loginLine}>
          <Typography variant="body2">Connectez-vous</Typography>
          <Fab
            aria-label="Google"
            className={classes.googleButton}
            onClick={() => 
              firebase.doSignIn()
            }
          >
            <Icon className='fab fa-google'/>
          </Fab>
        </div>
      </div>
    </Container>
  )
}

export function UnauthorizedGM() {
  const classes = useStyles();
  return (
    <Container maxWidth="sm" className={classes.container}>
      <img src={restricted} alt="Restricted Sign" className={classes.closedImage}/>
      <div className={classes.closedText}>
        <Typography variant="body1">
          Oups, il semblerait que vous ne soyez pas un MJ
        </Typography>
        <Typography variant="body1">
          Contactez l'administrateur si vous pensez que vous devriez accéder à cet espace.
        </Typography>
      </div>
    </Container>
  )
}
