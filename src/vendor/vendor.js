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


const drawerWidth = 240;

const styles = theme => ({
  root: {
    flexGrow: 1,
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

const vendorsUrl = 'vendors';

// function getVendor(){
//     console.log('Api call');
//     // let payload={
//     //     "email_id":this.state.username,
//     //     "password":this.state.password
//     // }
//     // axios.post(apiBaseUrl+loginUrl, payload)
//     // .then(function (response) {
//     //     console.log(response);
//     //     if(response.status == 200){
//     //         console.log("Login successfull");
//     //         //store.set('loggedIn', true);
//     //         history.push('/home');
//     //     }else if(response.data.code == 204){
//     //         console.log("Username password do not match");
//     //     }else{
//     //         console.log("Username does not exists");
//     //     }
//     // })
//     // .catch(function (error) {
//     //     console.log(error);
//     // });
// }

//getVendor();

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

class Vendor extends Component {
    state = {
        anchor: 'left',
        vendor: []
      };

    componentDidMount() {
        console.log('Api call');
      axios
      .get(apiBaseUrl+ vendorsUrl)
      .then((res)=> {
          console.log(res.data.data);
        this.setState({ vendor: res.data.data })   
      })
      .catch(err => console.log(err));
    }
    
      handleChange = event => {
        this.setState({
          anchor: event.target.value,
        });
      };

   render() {
     const { classes } = this.props;

    //  console.log("data ", data);
    //  console.log("vendor ", this.state.vendor);
     
      return (
        <div className={classes.root}>
            <div className={classes.appFrame}>
            <AppBar/>
            <Nav />
            <main className={classes.content}>
                <div className={classes.toolbar} />
                <Typography>{'Vendor'}</Typography>
                
                <Paper className={classes.root}>
                    <Table className={classes.table}>
                        <TableHead>
                        <TableRow>
                            <TableCell>Name</TableCell>
                            <TableCell numeric>Mobile</TableCell>
                            <TableCell numeric>Phone</TableCell>
                            <TableCell>Address</TableCell>
                        </TableRow>
                        </TableHead>
                        <TableBody>
                        {this.state.vendor.map(n => {
                            return (
                            <TableRow key={n._id}>
                                <TableCell component="th" scope="row">
                                {n.name}
                                </TableCell>
                                <TableCell numeric>{n.mobile}</TableCell>
                                <TableCell numeric>{n.phone_number}</TableCell>
                                <TableCell>{n.address}</TableCell>
                            </TableRow>
                            );
                        })}
                        </TableBody>
                    </Table>
                </Paper>
            </main>
            </div>
        </div>
      );
   }
}

//export default Home;

Vendor.propTypes = {
    classes: PropTypes.object.isRequired,
  };
  
export default withStyles(styles)(Vendor);