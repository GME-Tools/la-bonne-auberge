import { useEffect, useState } from "react";

import { Box, Button, CircularProgress } from "@mui/material";
import { Collapse, FormControl, Grid } from '@mui/material';
import { IconButton, InputLabel, MenuItem } from '@mui/material';
import { Select, TextField, Typography } from '@mui/material';
import { TableCell, TableRow } from '@mui/material';

import KeyboardArrowDownIcon from '@material-ui/icons/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@material-ui/icons/KeyboardArrowUp';

import { useFirebase } from 'context/FirebaseContext';
import { useStyles} from './GMAdmin_css';

class CampaignRow extends Component {
  constructor(props) {
    super(props);
    this.state = {
      open: false,
      systems: {},
      name: props.row.name,
      selectedSystem: props.row.system,
      uploadingPdf: false,
      uploadingImage: false,
      updatingData: false
    }
  }

  componentDidMount() {
    this.props.firebase.getSystems().then(docs=>
      docs.forEach(doc =>
        this.setState({
          systems: {
            ...this.state.systems,
            [doc.id]: doc.data()
          }
        })
      )
    );
  }

  disableInteraction() {
    return this.state.uploadingImage || this.state.uploadingPdf || this.state.updatingData
  }

  handleValidate() {
    let mustUpdate = false;
    let img_ref = this.props.row.image;
    let doc_ref = this.props.row.pdf;
    if (this.state.pdf) {
      mustUpdate = true;
      doc_ref = "pdf/"+this.props.row.id+'.pdf';
      this.setState(
        {uploadingPdf: true},
        ()=>this.props.firebase.updateFile(doc_ref,this.state.pdf)
          .then(()=>this.setState({uploadingPdf: false}))
      );
    }

    if (this.state.image) {
      mustUpdate = true;
      img_ref = "images/"+this.props.row.id;
      this.setState(
        {uploadingImage: true},
        ()=>this.props.firebase.updateFile(img_ref,this.state.image)
          .then(()=>this.setState({uploadingImage: false}))
      );
    }

    if (this.state.name !== this.props.row.name) mustUpdate = true;
    if (this.state.selectedSystem !== this.props.row.system) mustUpdate = true;

    if (mustUpdate) {
      const data = {
        name: this.state.name,
        system: this.state.selectedSystem,
        modified: this.props.firebase.getNow(),
        image: img_ref,
        pdf: doc_ref
      }
      this.setState(
        {updateData: true},
        ()=>this.props.firebase.updateCampaign(this.props.row.id, data)
          .then(()=>{
            this.setState({updateData: false})
            this.props.onUpdate();
          })
      );
    }
  }

  render() {
    const { row, classes } = this.props;
    return (
      <React.Fragment>
        <TableRow key={row.name}>
          <TableCell>
            <IconButton 
              aria-label="expand row" size="small"
              onClick={() => this.setState({open: !this.state.open})}
              disabled={this.disableInteraction()}
            >
              {this.state.open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
            </IconButton>
          </TableCell>
          <TableCell component="th" scope="row">
            {row.name}
          </TableCell>
          <TableCell align="center"><img src={row.systemURL} width="32" alt={row.system}/></TableCell>
          <TableCell>{row.created}</TableCell>
          <TableCell>{row.modified}</TableCell>
        </TableRow>
        <TableRow>
          <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
            <Collapse in={this.state.open} timeout="auto" unmountOnExit>
              <Box margin={1} className={classes.rowContent}>
                <Grid container className={classes.campaignBox} spacing={2}>
                  <Grid item xs={12} md={6}>
                    <TextField
                      id="name" label="Nom"
                      value={this.state.name}
                      onChange={event=>this.setState({name: event.target.value})}
                    />
                  </Grid>
                  <Grid item xs={12} md={6}>
                    <FormControl style={{minWidth: 120}}>
                      <InputLabel id="system-select-label">Système</InputLabel>
                      <Select
                        labelId="system-select-label"
                        id="system-select"
                        value={this.state.selectedSystem}
                        onChange={event=>this.setState({selectedSystem: event.target.value})}
                      >
                        {
                          Object.keys(this.state.systems).map(key => (
                            <MenuItem value={key}>{this.state.systems[key].name}</MenuItem>
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
                        onChange={event => this.setState({image: event.target.files[0]})}
                      />
                    </Button>
                    <Typography variant="caption">
                      { this.state.image ? this.state.image.name : "" }
                    </Typography>
                  </Grid>
                  <Grid item xs={12} md={6}>
                  <Typography variant="subtitle1">Résumé : </Typography>
                    <Button variant="contained" component="label">
                      Parcourir
                      <input
                        type="file" hidden
                        accept="application/pdf"
                        onChange={event => this.setState({pdf: event.target.files[0]})}
                      />
                    </Button>
                    <Typography variant="caption">
                      { this.state.pdf ? this.state.pdf.name : "" }
                    </Typography>
                  </Grid>
                  <Grid item xs={12}>
                    <Box display="flex" justifyContent={{xs:"center",md:"right"}} marginRight="10px">
                      <Button
                        color="primary" variant="contained"
                        onClick={() => this.handleValidate()}
                      >
                        Valider
                      </Button>
                    </Box>
                  </Grid>
                </Grid>
                <Box
                  className={classes.disabler}
                  display={this.disableInteraction()?'flex':'none'}
                >
                  <CircularProgress/>
                </Box>
              </Box>
            </Collapse>
          </TableCell>
        </TableRow>
      </React.Fragment>
    );
  }
}

export default withAuthentication(withStyles(styles)(CampaignRow));