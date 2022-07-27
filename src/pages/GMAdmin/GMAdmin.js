import { useEffect, useState } from 'react';
import { Container } from "@mui/material";

import { useAuth } from 'context/UserContext';
import { useFirebase } from 'context/FirebaseContext';
import useStyles from './GMAdmin_css';

import AppBar from 'components/AppBar/AppBar';
import { Unauthorized, UnauthorizedGM } from 'components/Unauthorized/Unauthorized';
//import AuthorizedAdmin from './AuthorizedAdmin';

function AuthorizedAdmin() {
  return <div>AuthorizedAdmin</div>
}

export default function GMAdmin() {
  const [isGM, setIsGM] = useState(false);
  const firebase = useFirebase();
  const { authUser } = useAuth();
  const classes = useStyles();

  useEffect(() => {
    if (authUser) {
      firebase.getUser(authUser.uid).then(doc => {
        setIsGM(doc.exists && doc.data().roles.includes("gm") ?true:false)
      });
    }
  },[firebase,authUser]);

  return (
    <div className={classes.adminWrapper}>
      <AppBar />
      <Container fixed>
        {!authUser && <Unauthorized />}
        {authUser && !isGM && <UnauthorizedGM />}
        {authUser && isGM && <AuthorizedAdmin />}
      </Container>
    </div>
  );
}
