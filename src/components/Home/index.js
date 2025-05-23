import { Component } from "react";
import  {Link} from 'react-router-dom';
import Header from "../Header";

import './index.css'

class Home extends Component{

    render(){
        return(
            <div className="container">
                <Header />
                <div className="main-container">
                    <div className="content">
                        <h1>Find The Job That <br />Fits Your Life</h1>
                        <p>Millions of people are searching for jobs,<br />salary information, company reviews. Find the jobs that fits <br />your abilities and potential.</p>
                        <Link to="/jobs" className="nokku"><button type="button" className="button">Find Jobs</button></Link>
                    </div>
                </div>
            </div>
        )
    }
}

export default Home