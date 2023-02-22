import { Link } from 'react-router-dom';

import { Grid, Typography } from "@mui/material";
import useStyles from './Footer_css';
import * as routes from 'config/routes';

function DecoratedLink(props) {
  const classes = useStyles();
  return (
    <div className={classes.linkWrapper}>
      <Link {...props} className={classes.decoratedLink}>
        <Typography variant="body1">
          {props.children}
        </Typography>
      </Link>
    </div>
  )
}

export default function Footer() {
  const classes = useStyles();
  
  return (
    <div className={classes.pageFooter}>
      <Grid container className={classes.footerLinks}>
        <Grid item xs={12} sm={6} className={classes.logoImage}>
          <Link className={classes.decoratedLink} to={routes.ROOT}>
            <img src="/logo192.png" alt="" width='64' />
            <Typography variant="body1">La Bonne Auberge</Typography>
            <Typography variant="body2">
                Copyright © La Bonne Auberge (2020-{(new Date().getFullYear())})
            </Typography>
          </Link>
        </Grid>
        <Grid item xs={6} sm={3}>
          <Typography variant="button">Blog</Typography>
          <DecoratedLink to={routes.BLOG}>Accueil</DecoratedLink>
          <DecoratedLink to={routes.BLOGCAMP}>Campagnes</DecoratedLink>
          <DecoratedLink to={routes.BLOGOS}>One-Shots</DecoratedLink>
          <DecoratedLink to={routes.BLOGMOD}>Modules</DecoratedLink>
          <DecoratedLink to={routes.BLOGGUI}>Guides</DecoratedLink>
          <DecoratedLink to={routes.BLOGAB}>A Propos</DecoratedLink>
        </Grid>
        <Grid item xs={6} sm={3}>
          <Typography variant="button">Campagnes</Typography>
          <DecoratedLink to={routes.CAMPAIGNS}>Journaux</DecoratedLink>
          <DecoratedLink to={routes.GM}>Espace MJ</DecoratedLink>
          <DecoratedLink to={routes.DICETABLEBASE}>Plateau de dés</DecoratedLink>
        </Grid>
      </Grid>
      <div className={classes.footerNotice}>
        <Typography variant="caption" className={classes.footerNoticeTypography}>
          Le contenu original et exclusif lié à l'application La Bonne Auberge est distribué sous licence <a href="https://creativecommons.org/licenses/by-nc-sa/4.0/" target="_blank" rel="noopener noreferrer">CC BY-SA 4.0</a><br />
          Dungeons {'&'} Dragons, les règles et contenus créés pour le jeu de rôle ainsi que tous les personnages et les lieux apparaissant dans des productions officiellement diffusées sont la propriété de Wizards of the Coast.{" "}
          Star Wars ainsi que tous les personnages et les lieux apparaissant dans des productions officiellement diffusées sont la propriété de The Walt Disney Company et Lucasfilm Ltd. LLC. Aux Confins de l'Empire, L'Ere de la Rébellion, Force et Destinée et les règles et contenus créés pour le jeu de rôle Star Wars original sont la propriété de Edge Studio.{" "}
          La Bonne Auberge n'est en aucune manière affiliée, endossée, parrainée ou spécifiquement approuvée par Wizards of the Coast, Edge Studio, The Walt Disney Company ou Lucasfilm Ltd. LLC.</Typography>
      </div>
    </div>
  );
}
