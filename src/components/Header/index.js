import { Component } from "react";
import { Link } from "react-router-dom";
import Cookies from "js-cookie";
import withRouter from "../WithRouter"; // adjust path if needed

import './index.css';

class Header extends Component {

  onLogOut = () => {
    const { navigate } = this.props;
    Cookies.remove('jwt_token');
    navigate('/login', { replace: true });
  }

  render() {
    return (
      <nav className="navbar">
        <Link to="/" className="nokku">
          <img src="https://assets.ccbp.in/frontend/react-js/logo-img.png" className="logo" alt="bomma" />
        </Link>
        <ul className="menu">
          <Link to="/" className="nokku"><li className="menu-item">Home</li></Link>
          <Link to="/jobs" className="nokku"><li className="menu-item">Jobs</li></Link>
        </ul>
        <button type="button" className="button" onClick={this.onLogOut}>Logout</button>
      </nav>
    );
  }
}

export default withRouter(Header);





/*
import { Component } from "react";
import { Link, withRouter } from "react-router-dom";
import Cookies from "js-cookie";

import './index.css'

class Header extends Component{

    onLogOut = () => {
        const {history} = this.props
        Cookies.remove('jwt_token')
        history.replace('/login')
    }
    render(){

        return(
            <nav className="navbar">
             <Link to="/" className="nokku"><img src="https://assets.ccbp.in/frontend/react-js/logo-img.png" className="logo" alt="bomma" /></Link>
            <ul className="menu">
                <Link to="/" className="nokku"><li className="menu-item">Home</li></Link>
                <Link to="/jobs" className="nokku"><li className="menu-item">Jobs</li></Link>
            </ul>
           <button type="button" className="button" onClick={this.onLogOut}>Logout</button>
        </nav>
        )
    }
}

export default withRouter(Header)
*/