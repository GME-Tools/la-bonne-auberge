import { useState, useEffect } from 'react';
import moment from 'moment';
import 'moment/locale/fr';

import { Card, CardActions, CardContent, CardMedia } from '@mui/material';
import { Avatar, Container, Divider } from '@mui/material';
import { Grid, Link, Typography } from '@mui/material';
import AppBar from "components/AppBar/AppBar";
import { useFirebase } from 'context/FirebaseContext';
import useStyles from './Campaigns_css';

export default function Campaigns() {
  const [campDocs, setCampDocs] = useState([]);
  const [campaigns, setCampaigns] = useState([]);
  const firebase = useFirebase();
  const classes = useStyles();

  useEffect(() => {
    setCampaigns([]);
    firebase.getCampaigns().then(camps => {
      setCampDocs(camps);
    })
  },[firebase])
  
  useEffect(() => {
    campDocs.forEach(campaign => {
      firebase.getFile(campaign.data().image).then(imageURL => {
        firebase.getFile(campaign.data().pdf).then(pdfURL => {
          firebase.getSystem(campaign.data().system).then(systemDoc => {
            firebase.getFile(systemDoc.data().logo).then(systemURL => {
              firebase.getUser(campaign.data().gm).then(userDoc => {
                let campaignEntry = campaign.data();
                campaignEntry.image = imageURL;
                campaignEntry.pdf = pdfURL;
                campaignEntry.systemImage = systemURL;
                campaignEntry.system = systemDoc.data().name;
                campaignEntry.gm = userDoc.data().name;
                setCampaigns(c => [...c, campaignEntry])
              });
            });
          });
        });
      });
    });
  }, [firebase, campDocs]);

  const getTimeElapsed = (date) => {
    let elapsed = moment(date);
    elapsed.locale('fr');
    return elapsed.fromNow();
  }

  return (
    <div className={classes.mainContent}>
      <AppBar />
      <Container className={classes.cardGrid} maxWidth="md">
        <Grid container spacing={4}>
          {campaigns.sort((a, b) => (b.modified - a.modified)).map(campaign => (
            <Grid item key={campaign.name} xs={12} sm={6} md={4}>
              <Card className={classes.card}>
                <Link className={classes.pdfLink} href={campaign.pdf} color="inherit" target="_blank">
                  <CardMedia
                    className={classes.cardMedia}
                    image={campaign.image}
                    title={campaign.name}
                  />
                  <CardContent className={classes.CardContent}>
                    <div className={classes.systemLine}>
                      <Avatar variant="square" className={classes.avatar} src={campaign.systemImage} />
                      <Typography variant="subtitle2">
                        {campaign.system}
                      </Typography>
                    </div>
                    <Divider className={classes.divider} light />
                    <Typography gutterBottom variant="h6" component="h2">
                      {campaign.name}
                    </Typography>
                  </CardContent>
                  <CardActions className={classes.cardAction}>
                    <Typography variant="subtitle2">
                      {campaign.gm}
                    </Typography>
                    <Typography variant="caption">
                      {getTimeElapsed(campaign.modified.toDate())}
                    </Typography>
                  </CardActions>
                </Link>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Container>
    </div>
  );
}
