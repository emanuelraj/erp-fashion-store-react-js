import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import classNames from 'classnames'
import FormControl from '@material-ui/core/FormControl';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import InputAdornment from '@material-ui/core/InputAdornment';
import IconButton from '@material-ui/core/IconButton';
import Visibility from '@material-ui/icons/Visibility';
import VisibilityOff from '@material-ui/icons/VisibilityOff';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import axios from 'axios';



const styles = theme => ({
    root: {
      display: 'flex',
      flexWrap: 'wrap',
    },
    container: {
        display: 'flex',
        flexWrap: 'wrap',
    },
    // root: {
    //     flexGrow: 1,
    //   },
    margin: {
      margin: theme.spacing.unit,
    },
    withoutLabel: {
      marginTop: theme.spacing.unit * 3,
    },
    textField: {
        marginLeft: theme.spacing.unit,
        marginRight: theme.spacing.unit,
        width: 200,
    },

    paper: {
        padding: theme.spacing.unit * 2,
        textAlign: 'center',
        color: theme.palette.text.secondary,
    },

    button: {
        margin: theme.spacing.unit,
    },

    input: {
        display: 'none',
    },
  });

  
class Login extends Component {

    constructor(props){
        super(props);
        this.state={
            username: '',
            password: '',
            showPassword: false,
        }
    }

    handleChange = prop => event => {
        this.setState({ [prop]: event.target.value });
    };

    handleClickShowPassword = () => {
        this.setState(state => ({ showPassword: !state.showPassword }));
    };

    handleClick(event){
        const { history } = this.props;

        const apiBaseUrl = "http://18.219.238.140:8001/api/";

        const loginUrl = 'v1/auths/login'

        let payload={
            "email_id":this.state.username,
            "password":this.state.password
        }
        axios.post(apiBaseUrl+loginUrl, payload)
        .then(function (response) {
            console.log(response);
            if(response.status == 200){
                console.log("Login successfull");
                //store.set('loggedIn', true);
                history.push('/home');
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
    

   render() {
      const { classes } = this.props;
      return (
        <div className={classes.root}>
            <Grid container spacing={24}>
                <Grid item xs={3}>
                </Grid>
                <Grid item xs={6}>
                    <Paper className={classes.paper}>
                        <form className={classes.container}>
                            <TextField
                                id="username"
                                label="Username"
                                className={classes.textField}
                                value={this.state.username}
                                onChange={this.handleChange('username')}
                                margin="normal"
                            />

                            <TextField
                                id="password-input"
                                label="Password"
                                autoComplete="current-password"
                                type={this.state.showPassword ? 'text' : 'password'}
                                className={classes.textField}
                                value={this.state.password}
                                onChange={this.handleChange('password')}
                                margin="normal"
                                endAdornment={
                                    <InputAdornment position="end">
                                        <IconButton
                                        aria-label="Toggle password visibility"
                                        onClick={this.handleClickShowPassword}
                                        onMouseDown={this.handleMouseDownPassword}
                                        >
                                        {this.state.showPassword ? <VisibilityOff /> : <Visibility />}
                                        </IconButton>
                                    </InputAdornment>
                                    }

                            />
                            <Button variant="contained" color="primary" className={classes.button} onClick={(event) => this.handleClick(event)}>
                                Login
                            </Button>
                        </form>
                    </Paper>
                </Grid>
                <Grid item xs={3}>
                </Grid>
            </Grid>         
        </div>
      );
   }
}

// Login.propTypes = {
//     classes: PropTypes.object.isRequired,
//   };
  
//export default Login;
export default withStyles(styles)(Login);


//className={classNames(classes.margin, classes.textField)}