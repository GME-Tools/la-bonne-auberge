import React, { useCallback, useEffect, useState } from "react";
import { Container, Fab, IconButton } from "@mui/material";
import { TextField, Typography, Paper } from "@mui/material";
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material';

import AddIcon from '@mui/icons-material/Add';
import EditIcon from '@mui/icons-material/Edit';
import CheckIcon from '@mui/icons-material/Check';

import { useAuth } from 'context/UserContext';
import { useFirebase } from 'context/FirebaseContext';
import useStyles from './GMAdmin_css';
import { dateformat } from 'utils/dateformat';

import CampaignRow from './CampaignRow';

export default function AuthorizedAdmin() {
  const [name, setName] = useState("");
  const [isEditing, setIsEditing] = useState(false);
  const [campDocs, setCampDocs] = useState([]);
  const [campaigns, setCampaigns] = useState({})
  const { authUser } = useAuth();
  const firebase = useFirebase();
  const classes = useStyles();

  const updateData = useCallback(() => {
    const uid = authUser.uid;
    firebase.getUser(uid).then(doc => setName(doc.data().name));
    firebase.getCampaigns().then(camps => setCampDocs(camps));
  }, [authUser, firebase])

  useEffect(() => {
    setCampaigns([]);
    updateData();
  },[firebase, authUser, updateData])
  
  useEffect(() => {
    campDocs.forEach(campaign => {
      if (campaign.data().gm === authUser.uid) {
        firebase.getSystem(campaign.data().system).then(systemDoc => {
          firebase.getFile(systemDoc.data().logo).then(systemURL => {
            let campaignEntry = campaign.data();
            campaignEntry.created = dateformat(campaign.data().created.toDate());
            campaignEntry.modified = dateformat(campaign.data().modified.toDate());
            campaignEntry.systemURL = systemURL;
            campaignEntry.id = campaign.id;
            setCampaigns(c => ({...c, [campaign.id]: campaignEntry}));
          });
        })
      }
    });
  }, [firebase, authUser, campDocs])

  const createCampaign = () => {
    const now = firebase.getNow();
    const data = {
      name: "Nouvelle campagne",
      gm: authUser.uid,
      created: now,
      modified: now,
      system: "dnd5e",
      image: "images/placeholder_image.jpg",
      pdf: "pdf/placeholder_doc.pdf"
    }
    firebase.addCampaign(data);
    updateData();
  }

  return (
    <Container maxWidth="md" className={classes.container}>
      <div className={classes.welcomeLine}>
        {
          isEditing ?
            <React.Fragment>
              <TextField
                id="name" label="Nom"
                value={name}
                onChange={event=>setName(event.target.value)}
              />
              <IconButton
                size="small" color="secondary"
                aria-label="edit name" component="span"
                onClick={()=>{
                  firebase.updateGMName(authUser.uid,name);
                  setIsEditing(false);
                }}
              >
                <CheckIcon />
              </IconButton>
            </React.Fragment>
          :
            <React.Fragment>
              <Typography variant="h6">Bienvenue {name}</Typography>
              <IconButton
                size="small" color="secondary"
                aria-label="edit name" component="span"
                onClick={()=>setIsEditing(true)}
              >
                <EditIcon />
              </IconButton>
            </React.Fragment>
        }
        <Fab
          color="primary"
          aria-label="add"
          className={classes.createButton}
          onClick={()=>createCampaign()}>
          <AddIcon />
        </Fab>
      </div>
    {/*<Button
      onClick={() => 
        this.props.firebase.doSignOut()
          .then(() => this.props.onLoggedOut())
      }
    >
      Log Out
    </Button>*/}
      <TableContainer component={Paper}>
        <Table className={classes.table} aria-label="campaigns table">
          <TableHead>
            <TableRow>
              <TableCell />
              <TableCell>Nom</TableCell>
              <TableCell align="center">Système</TableCell>
              <TableCell>Créée le</TableCell>
              <TableCell>Modifiée le</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {/*
              Object.keys(campaigns).map((key) => 
                <CampaignRow key={campaigns[key].name} row={campaigns[key]} onUpdate={()=>updateData()}/>
              )
            */}
          </TableBody>
        </Table>
      </TableContainer>
    </Container>
  );
}
