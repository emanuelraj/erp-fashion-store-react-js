import React, { Component } from 'react';
import AppBar from '../menubar/appbar';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Nav from '../menubar/nav'; 
import axios from 'axios';
import SimpleTable from '../component/table'
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';


const drawerWidth = 240;

const styles = theme => ({

    root: {
        flexGrow: 1,
      },

  contentRoot: {
    ...theme.mixins.gutters(),
    paddingTop: theme.spacing.unit * 2,
    paddingBottom: theme.spacing.unit * 2,
  },

  appFrame: {
    height: 430,
    zIndex: 1,
    overflow: 'hidden',
    position: 'relative',
    display: 'flex',
    width: '100%',
  },
  appBar: {
    width: `calc(100% - ${drawerWidth}px)`,
  },
  'appBar-left': {
    marginLeft: drawerWidth,
  },
  'appBar-right': {
    marginRight: drawerWidth,
  },
  drawerPaper: {
    position: 'relative',
    width: drawerWidth,
  },
  toolbar: theme.mixins.toolbar,
  content: {
    flexGrow: 1,
    backgroundColor: theme.palette.background.default,
    padding: theme.spacing.unit * 3,
  },
});

const apiBaseUrl = "http://18.219.238.140:8001/api/v1/";

const vendorsUrl = "vendors";

let id = 0;
function createData(name, calories, fat, carbs, protein) {
  id += 1;
  return { id, name, calories, fat, carbs, protein };
}

const data = [
  createData('Frozen yoghurt', 159, 6.0, 24, 4.0),
  createData('Ice cream sandwich', 237, 9.0, 37, 4.3),
  createData('Eclair', 262, 16.0, 24, 6.0),
  createData('Cupcake', 305, 3.7, 67, 4.3),
  createData('Gingerbread', 356, 16.0, 49, 3.9),
];

class AddVendor extends Component {
    // state = {
    //     anchor: 'left',
    //     vendor: []
    //   };

    constructor(props){
        super(props);
        this.state={
            name: '',
            mobile: '',
            phone_number: '',
            address: '',
        }
    }

    handleChange = prop => event => {
        this.setState({ [prop]: event.target.value });
    };

    componentDidMount() {
        const { match : {params } } = this.props;

        if(params.id){
            axios
            .get(apiBaseUrl+ vendorsUrl + `/${params.id}` )
            .then((res)=> {
                console.log(res.data.data);
                this.setState({ name: res.data.data.name })
                this.setState({ mobile: res.data.data.mobile })
                this.setState({ phone_number: res.data.data.phone_number })
                this.setState({ address: res.data.data.address })   
            })
            .catch(err => console.log(err));
        }
    }


    handleClick(event){
        const { history } = this.props;

        const { match : {params } } = this.props;

        let payload={
            name: this.state.name,
            mobile: this.state.mobile,
            phone_number: this.state.phone_number,
            address: this.state.address,
        }
        if(params.id){
            console.log("Edit");
            axios.put(apiBaseUrl + vendorsUrl +`/${params.id}`, payload)
            .then(function (response) {
                console.log(response);
                if(response.status == 200){
                    console.log("Login successfull");
                    //store.set('loggedIn', true);
                    history.push('/vendor');
                }else if(response.data.code == 204){
                    console.log("Username password do not match");
                }else{
                    console.log("Username does not exists");
                }
            })
            .catch(function (error) {
                console.log(error);
            });
        }else{
            axios.post(apiBaseUrl + vendorsUrl, payload)
            .then(function (response) {
                console.log(response);
                if(response.status == 201){
                    console.log("Login successfull");
                    //store.set('loggedIn', true);
                    history.push('/vendor');
                }else if(response.data.code == 204){
                    console.log("Username password do not match");
                }else{
                    console.log("Username does not exists");
                }
            })
            .catch(function (error) {
                console.log(error);
            });
        }
    }


   render() {
     const { classes } = this.props;
     const { match : {params } } = this.props;

     function InsertText(props) {
        return <Typography>{'Add New Vendor'}</Typography>;
      }
      
      function EditText(props) {
          return <Typography>{'Edit Vendor'}</Typography>;
      }


    function SegHeader() {
        if(params.id){
            return <EditText />;
        }
        return <InsertText />;
    }
     
      return (
        <div className={classes.root}>
            <div className={classes.appFrame}>
            <AppBar/>
            <Nav />
            <main className={classes.content}>
                <div className={classes.toolbar} />
                <Grid container spacing={24}>
                    <Grid item xs={3}>
                        <SegHeader />
                    </Grid>
                    <Grid item xs={6}>
                    </Grid>
                    <Grid item xs={3} container justify="flex-end">                            
                    </Grid>
                </Grid>
                <br />
                <br />
                <Grid container spacing={24}>
                    <Grid item xs={12}>
                        <div>
                            <Paper className={classes.contentRoot} elevation={1}>
                                <form className={classes.container}>
                                    <Grid container spacing={12}>
                                        <Grid item xs={3}>
                                            <TextField
                                                id="name"
                                                label="Name"
                                                className={classes.textField}
                                                value={this.state.name}
                                                onChange={this.handleChange('name')}
                                                margin="normal"
                                            />
                                        </Grid>
                                        <Grid item xs={3}>
                                            <TextField
                                                id="mobile"
                                                label="Mobile"
                                                className={classes.textField}
                                                value={this.state.mobile}
                                                onChange={this.handleChange('mobile')}
                                                margin="normal"
                                            />
                                        </Grid>
                                        <Grid item xs={3}>
                                            <TextField
                                                id="phone_number"
                                                label="Phone"
                                                className={classes.textField}
                                                value={this.state.phone_number}
                                                onChange={this.handleChange('phone_number')}
                                                margin="normal"
                                            />
                                        </Grid>
                                        <Grid item xs={3}>
                                            <TextField
                                                id="address"
                                                label="Address"
                                                multiline
                                                rowsMax="4"
                                                className={classes.textField}
                                                value={this.state.address}
                                                onChange={this.handleChange('address')}
                                                margin="normal"
                                            />
                                        </Grid>
                                    </Grid>
                                    <br />
                                    <Grid container spacing={24}>
                                        <Grid item xs={3}>
                                        </Grid>
                                        <Grid item xs={6}>
                                        </Grid>
                                        <Grid item xs={3} container justify="center">
                                            <Grid container spacing={12}>
                                                <Grid item xs={6} container justify="center">
                                                    <Button variant="contained" color="secondary" className={classes.button} component='a' href="/vendor">
                                                        Cancel
                                                    </Button>
                                                </Grid>
                                                <Grid item xs={6} container justify="left">
                                                    <Button variant="contained" color="primary" className={classes.button} onClick={(event) => this.handleClick(event)}>
                                                        Save
                                                    </Button>
                                                </Grid>
                                            </Grid>
                                        </Grid>
                                    </Grid>

                                </form>
                            </Paper>
                        </div>
                    </Grid>
                </Grid>
            </main>
            </div>
        </div>
      );
   }
}

//export default Home;

AddVendor.propTypes = {
    classes: PropTypes.object.isRequired,
  };
  
export default withStyles(styles)(AddVendor);