import Cookies from "js-cookie"
import { Component } from "react"
import Header from '../Header'
import SimilarJobItem from '../SimilarJobItem'

import { GrShare } from 'react-icons/gr'
import { MdOutlineLocationOn } from 'react-icons/md'
import { PiSuitcaseSimpleLight } from 'react-icons/pi'
import { AiOutlineStar } from 'react-icons/ai'

import withRouter from '../WithRouter'
import './index.css'

const apiStatusConstants = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  failure: 'FAILURE',
  inProgress: 'IN_PROGRESS',
}

class JobDetails extends Component {
  state = {
    jobDetailsApiStatus: apiStatusConstants.initial,
    jobDetails: {},
    similarJobDetails: []
  }

  componentDidMount() {
    this.getJobDetails()
  }

  getJobDetails = async () => {
    this.setState({ jobDetailsApiStatus: apiStatusConstants.inProgress })

    const { params } = this.props
    const { id } = params
    const apiUrl = `${process.env.REACT_APP_JOBS_BASE_API}/${id}`
    const jwtToken = Cookies.get("jwt_token")

    const options = {
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
      method: 'GET'
    }

    const response = await fetch(apiUrl, options)

    if (response.ok) {
      const data = await response.json()
      this.setState({
        jobDetailsApiStatus: apiStatusConstants.success,
        jobDetails: data.job_details,
        similarJobDetails: data.similar_jobs
      })
    } else {
      this.setState({ jobDetailsApiStatus: apiStatusConstants.failure })
    }
  }

  renderJobDetailsInProgressView = () => {
    return (
      <div>Loading...</div>
    )
  }

  renderJobDetailsFailureView = () => {
    return (
      <div>Failed.</div>
    )
  }

  getSkillItem = (eachSkill) => {
    return (
      <div className="each-skill" key={eachSkill.name}>
        <img src={eachSkill.image_url} alt="skill" className="skill-image" />
        <h3 className="heading">{eachSkill.name}</h3>
      </div>
    )
  }

  renderJobDetailsSuccessView = () => {
    const { jobDetails, similarJobDetails } = this.state
    const {
      company_logo_url,
      company_website_url,
      employment_type,
      job_description,
      life_at_company,
      location,
      package_per_annum,
      rating,
      skills,
      title
    } = jobDetails

    return (
      <>
        <Header />
        <div className="main-container">
          <div className='details'>
            <div className='company'>
              <img src={company_logo_url} alt="logo" className='company-logo' />
              <div className='title'>
                <p>{title}</p>
                <p className='ico'><AiOutlineStar />{rating}</p>
              </div>
            </div>

            <div className='location'>
              <p className='ico'><MdOutlineLocationOn size={30} />{location}</p>
              <p className='employment ico'><PiSuitcaseSimpleLight size={30} />{employment_type}</p>
              <p className='package'>{package_per_annum}</p>
            </div>

            <div>
              <div className="website-link">
                <h3 className='heading'>Description</h3>
                <a href={company_website_url} className="link" target="_blank" rel="noreferrer">
                  Visit <GrShare />
                </a>
              </div>
              {job_description}
            </div>

            <h3 className="heading">Skills</h3>
            <div className="skills-required">
              {skills.map(eachSkill => this.getSkillItem(eachSkill))}
            </div>

            <h3 className="heading">Life at Company</h3>
            <div className="life_at_company">
              <p>{life_at_company.description}</p>
              <img src={life_at_company.image_url} alt="company" className="company-related" />
            </div>
          </div>

          <h1 className="heading">Similar Jobs</h1>
          <div className="similar-jobs">
            {similarJobDetails.map(eachJob => (
              <SimilarJobItem jobDetails={eachJob} key={eachJob.id} />
            ))}
          </div>
        </div>
      </>
    )
  }

  renderJobDetails = () => {
    const { jobDetailsApiStatus } = this.state

    switch (jobDetailsApiStatus) {
      case apiStatusConstants.success:
        return this.renderJobDetailsSuccessView()
      case apiStatusConstants.failure:
        return this.renderJobDetailsFailureView()
      case apiStatusConstants.inProgress:
        return this.renderJobDetailsInProgressView()
      default:
        return null
    }
  }

  render() {
    return (
      <>
        {this.renderJobDetails()}
      </>
    )
  }
}

export default withRouter(JobDetails)
