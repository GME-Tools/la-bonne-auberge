import { Card, CardContent, CardMedia } from '@mui/material';
import { Container, Grid, Typography, Link } from '@mui/material';

import useStyles from './Landing_css';
import * as routes from "config/routes";
import blogimg from "assets/blog.png";

export default function Landing() {
  const classes = useStyles();

  return (
    <div className={classes.mainContent}>
      <div className={classes.heroContent}>
        <Container maxWidth="sm">
          <Typography component="h1" variant="h2" align="center" gutterBottom>
            La Bonne Auberge
          </Typography>
          <Typography variant="h5" align="center" paragraph>
            Parce que ça commence toujours dans une auberge ...
          </Typography>
        </Container>
      </div>
      <Container className={classes.cardGrid} maxWidth="md">
        <Grid container spacing={4}>

          <Grid item xs={12} md={6}>
            <Card className={classes.card}>
              <Link className={classes.cardLink} href={routes.BLOG}>
                <CardMedia
                  className={classes.cardMedia}
                  image={blogimg}
                />
                <CardContent className={classes.cardContent}>
                  <Typography gutterBottom variant="h6" component="h2">
                    BLOG
                  </Typography>
                  <Typography variant="body1" color="text.secondary">
                    Jeu de rôle Solo, articles et ressources
                  </Typography>
                </CardContent>
              </Link>
            </Card>
          </Grid>

          <Grid item xs={12} md={6}>
            <Card className={classes.card}>
              <Link className={classes.cardLink} href={routes.CAMPAIGNS}>
                <CardMedia
                  className={classes.cardMedia}
                  image={blogimg}
                />
                <CardContent className={classes.cardContent}>
                  <Typography gutterBottom variant="h6" component="h2">
                    CAMPAGNES
                  </Typography>
                  <Typography variant="body1" color="text.secondary">
                    Journaux des Campagnes de l'équipe de la Bonne AUberge
                  </Typography>
                </CardContent>
              </Link>
            </Card>
          </Grid>

        </Grid>
      </Container>
    </div>
  )
}
