import React, { useEffect, useState } from "react";

import { Box, Button, CircularProgress } from "@mui/material";
import { Collapse, FormControl, Grid } from '@mui/material';
import { IconButton, InputLabel, MenuItem } from '@mui/material';
import { Select, TextField, Typography } from '@mui/material';
import { TableCell, TableRow } from '@mui/material';

import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';

import { useFirebase } from 'context/FirebaseContext';
import useStyles from './GMAdmin_css';

export default function CampaignRow(props) {
  const [open, setOpen] = useState(false);
  const [pdf, setPdf] = useState(null);
  const [image, setImage] = useState(null);
  const [systems, setSystems] = useState({});
  const [name, setName] = useState(props.row.name);
  const [selectedSystem, setSelectedSystem] = useState(props.row.system);
  const [uploadingPdf, setUploadingPdf] = useState(false);
  const [uploadingImage, setUploadingImage] = useState(false);
  const [updateData, setUpdateData] = useState(null);
  const classes = useStyles();
  const firebase = useFirebase();

  useEffect(() => {
    firebase.getSystems().then(docs =>
      docs.forEach(doc => (setSystems(s => ({ ...s, [doc.id]: doc.data() }))))
    );
  }, [firebase]);

  useEffect(() => {
    if (uploadingPdf) {
      firebase.updateFile("pdf/" + props.row.id + '.pdf', pdf).then(
        () => setUploadingPdf(false))
    }
  }, [firebase, uploadingPdf, pdf, props.row.id])

  useEffect(() => {
    if (uploadingImage) {
      firebase.updateFile("images/" + props.row.id, image).then(
        () => setUploadingImage(false))
    }
  }, [firebase, uploadingImage, image, props.row.id])

  useEffect(() => {
    if (updateData) {
      firebase.updateCampaign(props.row.id, updateData).then(() => {
        setUpdateData(null);
        props.onUpdate();
      })
    }
  }, [firebase, updateData, props])

  const disableInteraction = () => {
    return uploadingImage || uploadingPdf || updateData
  }

  const handleValidate = () => {
    let mustUpdate = false;
    let img_ref = props.row.image;
    let doc_ref = props.row.pdf;
    if (pdf) {
      mustUpdate = true;
      doc_ref = "pdf/" + props.row.id + '.pdf';
      setUploadingPdf(true);
    }

    if (image) {
      mustUpdate = true;
      img_ref = "images/" + props.row.id;
      setUploadingImage(true);
    }

    if (name !== props.row.name) mustUpdate = true;
    if (selectedSystem !== props.row.system) mustUpdate = true;

    if (mustUpdate) {
      const data = {
        name: name,
        system: selectedSystem,
        modified: firebase.getNow(),
        image: img_ref,
        pdf: doc_ref
      }
      setUpdateData(data);
    }
  }

  return (
    <React.Fragment>
      <TableRow key={props.row.name}>
        <TableCell>
          <IconButton
            aria-label="expand row" size="small"
            onClick={() => setOpen(state => !state)}
            disabled={disableInteraction()}
          >
            {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
          </IconButton>
        </TableCell>
        <TableCell component="th" scope="row">
          {props.row.name}
        </TableCell>
        <TableCell align="center"><img src={props.row.systemURL} width="32" alt={props.row.system} /></TableCell>
        <TableCell>{props.row.created}</TableCell>
        <TableCell>{props.row.modified}</TableCell>
      </TableRow>
      <TableRow>
        <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
          <Collapse in={open} timeout="auto" unmountOnExit>
            <Box margin={1} className={classes.rowContent}>
              <Grid container className={classes.campaignBox} spacing={2}>
                <Grid item xs={12} md={6}>
                  <TextField
                    id="name" label="Nom"
                    value={name}
                    onChange={event => setName(event.target.value)}
                  />
                </Grid>
                <Grid item xs={12} md={6}>
                  <FormControl style={{ minWidth: 120 }}>
                    <InputLabel id="system-select-label">Système</InputLabel>
                    <Select
                      labelId="system-select-label"
                      id="system-select"
                      value={selectedSystem}
                      onChange={event => setSelectedSystem(event.target.value)}
                    >
                      {
                        Object.keys(systems).map(key => (
                          <MenuItem value={key} key={key}>{systems[key].name}</MenuItem>
                        ))
                      }
                    </Select>
                  </FormControl>
                </Grid>
                <Grid item xs={12} md={6} className={classes.fileLoaderLine}>
                  <Typography variant="subtitle1">Image : </Typography>
                  <Button variant="contained" component="label">
                    Parcourir
                    <input
                      type="file" hidden accept="image/*"
                      onChange={event => setImage(event.target.files[0])}
                    />
                  </Button>
                  <Typography variant="caption">
                    {image ? image.name : ""}
                  </Typography>
                </Grid>
                <Grid item xs={12} md={6}>
                  <Typography variant="subtitle1">Résumé : </Typography>
                  <Button variant="contained" component="label">
                    Parcourir
                    <input
                      type="file" hidden
                      accept="application/pdf"
                      onChange={event => setPdf(event.target.files[0])}
                    />
                  </Button>
                  <Typography variant="caption">
                    {pdf ? pdf.name : ""}
                  </Typography>
                </Grid>
                <Grid item xs={12}>
                  <Box display="flex" justifyContent={{ xs: "center", md: "right" }} marginRight="10px">
                    <Button
                      color="primary" variant="contained"
                      onClick={() => handleValidate()}
                    >
                      Valider
                    </Button>
                  </Box>
                </Grid>
              </Grid>
              <Box
                className={classes.disabler}
                display={disableInteraction() ? 'flex' : 'none'}
              >
                <CircularProgress />
              </Box>
            </Box>
          </Collapse>
        </TableCell>
      </TableRow>
    </React.Fragment>
  );
}
