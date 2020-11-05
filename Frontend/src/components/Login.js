import React from 'react';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import FormControl from '@material-ui/core/FormControl';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import LockIcon from '@material-ui/icons/LockOutlined';
import Paper from '@material-ui/core/Paper';
import { Redirect, Link, withRouter } from 'react-router-dom';
import Typography from '@material-ui/core/Typography';
import './Login.css'
import axios from 'axios';


export class Login extends React.Component{

    constructor(props){
        super(props);
        this.state={email:"",password:"",IsLoggedIn: false};
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleChangeEmail = this.handleChangeEmail.bind(this)
        this.handleChangePasswd = this.handleChangePasswd.bind(this);
        //this.handleSend = this.handleSend.bind(this);
    }

    handleChangeEmail(e) {
      this.setState({
          email : e.target.value
      });
    }

    handleChangePasswd(e) {
        this.setState({
            password : e.target.value
        })
    }

    async handleSend() {
        console.log(this.state.email);
        console.log(this.state.password);
        await axios.post('http://localhost:8080/user/login', {
            username: this.state.email,
            password: this.state.password
           },
           {headers:{"Content-ype":"application/json"}})
            .then(response => {
                console.log(response.data);
                localStorage.setItem('token',response.data.accessToken);
                localStorage.setItem("IsLoggedIn",true);
                localStorage.setItem("username","test");
                localStorage.setItem("email",this.state.email);
                this.props.history.push("/todo");
                window.location.href = "/todo";
                return;
            })
            .catch( error => {
                console.log(error);
                this.props.history.push("/");
                alert("Invalid username or password")
            });


    }

    handleSubmit(){
        if(localStorage.getItem("users")==null){
            localStorage.setItem("users",JSON.stringify([{"username":"luis","email":"luis@mail.com","password":"ieti123"}]));
        }
        console.log(localStorage.getItem("users"));
        var listUsers = JSON.parse(localStorage.getItem("users"));
        console.log(listUsers);
        console.log(this.props);
        var ingreso = false;
        for (var i = 0; i < listUsers.length; i++){
            if (listUsers[i].email == this.state.email && listUsers[i].password == this.state.password ){
                localStorage.setItem("username",listUsers[i].username);
                localStorage.setItem("email",listUsers[i].email);
                localStorage.setItem("IsLoggedIn",true);
                ingreso = true;
            }
        }
        if (!ingreso){
            alert("Credenciales Invalidas :(");
        }else {
            //alert("Cambie el hpta path porfaaaaaaaaaaaaaaaa");
            window.location.href = "/todo";
            this.props.history.push("/todo");
        }
    }

    render(){
        return (
            <React.Fragment>
                <CssBaseline />
                <main className="layout" >
                    <Paper className="paper">
                        <Avatar className="avatar">
                            <LockIcon />
                        </Avatar>
                        <Typography variant="h2">Sign in</Typography>
                        <div>
                            <form className="form">
                                <FormControl margin="normal" required fullWidth>
                                    <InputLabel htmlFor="email">Email Address</InputLabel>
                                    <Input
                                    id="email"
                                    name="email"
                                    autoComplete="email"
                                    //value = {this.state.email}
                                    onChange = {this.handleChangeEmail}
                                    autoFocus />
                                </FormControl>
                                <FormControl margin="normal" required fullWidth>
                                    <InputLabel htmlFor="password">Password</InputLabel>
                                    <Input
                                        name="password"
                                        type="password"
                                        id="password"
                                        autoComplete="current-password"
                                        //value = {this.state.password}
                                        onChange = {this.handleChangePasswd}
                                        autoFocus/>
                                </FormControl>
                                <Button onClick={this.handleSubmit}
                                    type="submit"
                                    fullWidth
                                    variant="outlined"
                                    color="primary"
                                    className="submit"
                                >
                                    Ingresar
                                </Button>
                                <Button
                                        variant="outlined"
                                        type ="submit"
                                        fullWidth
                                        color="primary"
                                        href = "/signup"
                                    >
                                        Sign Up
                                </Button>
                            </form>
                        </div>
                    </Paper>
                </main>
            </React.Fragment>
        );
    }
}export default withRouter(Login);
