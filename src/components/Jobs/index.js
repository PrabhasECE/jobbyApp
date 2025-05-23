import { Component } from "react"
import Cookies from "js-cookie";
import Header from '../Header'
import JobCardItem from "../JobCardItem";
// import {BsSearch} from 'react-icons/bs'

import './index.css'

const apiStatusConstants = {
    initial: 'INITIAL',
    success: 'SUCCESS',
    failure: 'FAILURE',
    inProgress: 'IN_PROGRESS',
}

/*const employmentTypesList = [
    {
      label: 'Full Time',
      employmentTypeId: 'FULLTIME',
    },
    {
      label: 'Part Time',
      employmentTypeId: 'PARTTIME',
    },
    {
      label: 'Freelance',
      employmentTypeId: 'FREELANCE',
    },
    {
      label: 'Internship',
      employmentTypeId: 'INTERNSHIP',
    },
  ]
*/
  
 /* const salaryRangesList = [
    {
      salaryRangeId: '1000000',
      label: '10 LPA and above',
    },
    {
      salaryRangeId: '2000000',
      label: '20 LPA and above',
    },
    {
      salaryRangeId: '3000000',
      label: '30 LPA and above',
    },
    {
      salaryRangeId: '4000000',
      label: '40 LPA and above',
    },
]*/

class Jobs extends Component{
    state = {
        profileDetails: {},
        jobsDetails: {},
        profileApiStatus:apiStatusConstants.initial,
        jobsApiStatus: apiStatusConstants.initial,
        search_input: "",
        employmentType: [],
        minimumPackage: 0
    }

    getProfileDetails = async () => {
        this.setState({profileApiStatus:apiStatusConstants.inProgress})
        const jwtToken = Cookies.get('jwt_token');
        const url=process.env.REACT_APP_PROFILE_API
        const options = {
            headers: {
                Authorization : `Bearer ${jwtToken}`,
            },
            method: 'GET',
        }
        const response = await fetch(url,options)
        if(response.ok){
            const data = await response.json()
         //  console.log(data)
            //const updatedData = this.updateData(data)
           // console.log(updatedData.name)
            this.setState({profileDetails: data,profileApiStatus:apiStatusConstants.success})
        }
        if(response.status === 404){
            this.setState({profileApiStatus: apiStatusConstants.failure})
        }
    }

    getJobsDetails = async () => {
        const {employmentType,search_input,minimumPackage} = this.state
        console.log(search_input)
      //  console.log(employmentType.join())
        this.setState({jobsApiStatus: apiStatusConstants.inProgress})
        const baseUrl = process.env.REACT_APP_JOBS_BASE_API
        const apiUrl = `${baseUrl}?employment_type=${employmentType.join(',')}&minimum_package=${minimumPackage}&search=${search_input}`
        //const apiUrl = `https://apis.ccbp.in/jobs?employment_type=${employmentType.join()}&minimum_package=${minimumPackage}&search=${search_input}`
        const jwtToken = Cookies.get('jwt_token')
      //  console.log(jwtToken)
        const options = {
            method: 'GET',
            headers: {
                Authorization: `Bearer ${jwtToken}`,
            },
        }

        const response = await fetch(apiUrl,options)

        if(response.ok){
            const data = await response.json()
          //  console.log(data)
           // const {search_input} = this.state
            //const filteredData = data.jobs.filter(eachJob => eachJob.title.includes(search_input))
            const filteredData = data.jobs
           // console.log("filtered",filteredData)
            this.setState({jobsDetails: filteredData, jobsApiStatus: apiStatusConstants.success})
            // pass search_input in api url while fetching
        }
        if(response.status === 404){
            this.setState({jobsApiStatus: apiStatusConstants.failure})
        }
    }

    componentDidMount(){
        this.getProfileDetails()
        this.getJobsDetails()
    }

    renderProfileInProgressView = () => {
       // console.log("in progress")
        return(
            <div className="profile-details-container">Loading...</div>
        )
    }

    renderProfileSuccessView = () => {
        /*
            {
                "profile_details": {
                    "name": "Rahul Attuluri",
                    "profile_image_url": "https://assets.ccbp.in/frontend/react-js/male-avatar-img.png",
                    "short_bio": "Lead Software Developer and AI-ML expert"
                }
            }
            so profileDetails.profile_details
        */
        const {profileDetails} = this.state
        //console.log(profileDetails)
        const {name,profile_image_url,short_bio} = profileDetails.profile_details
        return(
            <div className="profile-details">
                <div><img src={profile_image_url} alt="profile" /></div>
                <h2 className="heading">{name}</h2>
                <p className="info">{short_bio}</p>
            </div>
        )
    }

    renderProfileFailureView = () => {
        //console.log("fail")
        return(
            <div className="profile-details-container"><button className="button">Retry</button></div>
        )
    }

    renderProfileDetails = () => {
       // console.log("render")
        const {profileApiStatus} = this.state
      //  console.log(profileApiStatus)
        switch(profileApiStatus){
            case apiStatusConstants.success:
                return this.renderProfileSuccessView()
            case apiStatusConstants.inProgress:
                return this.renderProfileInProgressView()
            case apiStatusConstants.failure:
                return this.renderProfileFailureView()
            default:
                return null
        }
    }

    employmentType = (event) => {
     //   console.log(event.target.value)
        let required = event.target.value
        const {employmentType} = this.state
        if (!employmentType.includes(required)) {
            this.setState({employmentType: [...employmentType,required]},this.getJobsDetails)
        }
        else{
            this.setState({employmentType: employmentType.filter(item => item!==required)},this.getJobsDetails)
        }
    }

    salaryRange = (event) => {
        this.setState({minimumPackage: event.target.value},this.getJobsDetails)
    }

    renderTypesOfEmployment = () => {
        return(
            <div className="employment-container">
                <h2>Types of Employment</h2>
                <div><input type="checkbox" id="fulltime" value="FULLTIME" onClick={this.employmentType} /><label htmlFor="fulltime"> &ensp;Fulltime</label></div>
                <div><input type="checkbox" id="parttime" value="PARTTIME" onClick={this.employmentType} /><label htmlFor="parttime"> &ensp;Parttime</label></div>
                <div><input type="checkbox" id="freelance" value="FREELANCE" onClick={this.employmentType} /><label htmlFor="freelance"> &ensp;Freelance</label></div>
                <div><input type="checkbox" id="internship" value="INTERNSHIP" onClick={this.employmentType} /><label htmlFor="internship"> &ensp;Internship</label></div>
            </div>
        )
    }

    renderSalaryRange = () => {
        return(
            <div className="salary-container">
                <h2>Salary Range</h2>
                <div><input type="radio" name="salary" id="above10" value={1000000} onChange={this.salaryRange} /><label htmlFor="above10">&ensp;10 Lakhs and above</label></div>
                <div><input type="radio" name="salary" id="above20" value={2000000} onChange={this.salaryRange} /><label htmlFor="above20">&ensp;20 Lakhs and above</label></div>
                <div><input type="radio" name="salary" id="above30" value={3000000} onChange={this.salaryRange} /><label htmlFor="above30">&ensp;30 Lakhs and above</label></div>
                <div><input type="radio" name="salary" id="above40" value={4000000} onChange={this.salaryRange} /><label htmlFor="above40">&ensp;40 Lakhs and above</label></div>
            </div>
        )
    }

    renderJobsSuccessView = () => {
        const {jobsDetails} = this.state
        //const {jobs,total} = jobsDetails
       // console.log("jobs:",jobs)
      // console.log(jobsDetails.length)
       if(jobsDetails.length > 0){
        return(
            <ul>
                {
                    jobsDetails.map(eachJobItem => (
                        <JobCardItem jobData={eachJobItem} key={eachJobItem.id} />
                    ))
                }
            </ul>
        )
        }
        else{
            return(
                <div className="no-jobs">
                    <div><img src="https://assets.ccbp.in/frontend/react-js/no-jobs-img.png" alt="no jobs" /></div>
                    <h1>No Jobs Found</h1>
                    <p>We could not find any jobs. Try other filters.</p>
                </div>
            )
        }
    }

    renderJobsFailureView = () => {
        return(
            <div className="jobs-fail">
                <img src="https://assets.ccbp.in/frontend/react-js/failure-img.png " alt="failed" /> 
                <h1>Oops! Something Went Wrong</h1>
                <p>We cannot seem to find the page you are looking for.</p>
                <button type="button" className="button">Retry</button>
            </div>
        )
    }

    renderJobsInProgressView = () => {
        return(
            <div>Loading...</div>
        )
    }

    renderJobsContainer = () => {
        const {jobsApiStatus} = this.state
        switch(jobsApiStatus){
            case apiStatusConstants.inProgress:
                return this.renderJobsInProgressView()
            case apiStatusConstants.failure:
                return this.renderJobsFailureView()
            case apiStatusConstants.success:
                return this.renderJobsSuccessView()
            default:
                return null
        }
    }

    searchInput = (event) => {
       // let inputBox = document.getElementById("search");
        //console.log(inputBox.value)
        this.setState({search_input: event.target.value})
        //if(event.target.value === "" ){
          //  this.setState({search_input: event.target.value})
           // this.getJobsDetails()
        //}
        //this.getJobsDetails()
    }

    render(){
        return(
            <>
                <Header />
                <div className="mains-container">
                    <div className="sides-container">
                        {this.renderProfileDetails()}
                        {this.renderTypesOfEmployment()}
                        {this.renderSalaryRange()}
                    </div>
                    <div className="jobs-container">
                        <div className="searching-container">
                            <input type="search" className="searchs" placeholder="Search" id="search" onChange={this.searchInput} />
                            <button type="button" data-testid="searchButton" className="searches-button" onClick={this.getJobsDetails}>
                                {/*<BsSearch className="search-icon" /> */}
                                Click
                            </button>
                        </div>
                        {this.renderJobsContainer()}
                    </div>
                </div>
            </>
        )
    }
}

export default Jobs