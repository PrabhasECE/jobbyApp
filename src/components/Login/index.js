import {Component} from 'react'
import Cookies from 'js-cookie'
import { Navigate } from 'react-router-dom'
import withRouter from '../WithRouter';

import './index.css'

class Login extends Component{
    state = {
        username: 'rahul',
        password: 'rahul@2021',
        errorMsg : '',
        showSubmitError: false,
    }

    onUsernameChange = (event) => {
        this.setState({username: event.target.value})
    }

    onPasswordChange = (event) => {
        this.setState({password: event.target.value})
    }

    onSubmitSuccess = (jwtToken) => {
        Cookies.set("jwt_token",jwtToken,{
            expires: 30,
        })
        const { navigate } = this.props;
        navigate('/', { replace: true });


    }

    onSubmitFailure = (errorMsg) => {
        this.setState({showSubmitError:true,errorMsg})
    }

    onSubmitted = async (event) => {
        event.preventDefault();
        const {username,password} = this.state
        const userDetails = {username,password}
        const url = process.env.REACT_APP_LOGIN_API
       // const url = 'https://dummyjson.com/user/login'
  
        const response = await fetch(url,{
            method:'POST',
            //headers: {'Content-Type' : 'application/json'},
            body: JSON.stringify(userDetails),
        })
        const data = await response.json()
        console.log(data)
        if(response.ok === true){
            //this.onSubmitSuccess(data.accessToken)
            this.onSubmitSuccess(data.jwt_token)
        }
        else{
            this.onSubmitFailure(data.message)
        }
    }

    renderUsernameField = () => {
        const {username} = this.state
        return(
            <>
                <label htmlFor="username" className="input-label">USERNAME</label>
                <input type="text" id="username" placeholder="Username" className="input-field" value={username} onChange={this.onUsernameChange} />
            </>
        )
    }

    renderPasswordField = () => {
        const {password} = this.state
        return(
            <>
                <label htmlFor="password" className='input-label'>PASSWORD</label>
                <input type="password" id="password" placeholder="Password" className="input-field" value={password} onChange={this.onPasswordChange} />
            </>
        )
    }

    render(){
        const jwtToken = Cookies.get('jwt_token')
    if (jwtToken !== undefined) {
      return <Navigate to="/" />
    }
        const {errorMsg,showSubmitError} = this.state
        return(
            <div className="container">
                <div className='login-container'>
                    <div className='logo'><img src="https://assets.ccbp.in/frontend/react-js/logo-img.png" alt="bomma"/></div>
                    <form onSubmit={this.onSubmitted}>
                        <div className='input-container'>{this.renderUsernameField()}</div>
                        <div className='input-container'>{this.renderPasswordField()}</div>   
                        <button type="submit" className='login-button'>
                            Login
                        </button>
                        {showSubmitError && <p className='error-msg'>*{errorMsg}</p>}
                    </form>
                </div>
            </div>
        )
    }
}

export default withRouter(Login)
