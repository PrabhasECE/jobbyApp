import {AiOutlineStar} from 'react-icons/ai'
import {MdOutlineLocationOn} from 'react-icons/md'
import {PiSuitcaseSimpleLight} from 'react-icons/pi'

import './index.css'

const SimilarJobItem = (props) => {
    const {jobDetails} = props
    const {company_logo_url, employment_type, job_description, location, rating, title} = jobDetails
    return(
        <div className='job-container'>
             <div className='company'>
                <img src={company_logo_url} alt="logo" className='company-logo'/>
                <div className='title'>
                    <p>{title}</p>
                    <p className='ico'><AiOutlineStar />{rating}</p>
                </div>
            </div>
            <h2 className='headi'>Description</h2>
            <p>{job_description}</p>
            <div className='location'>
                <p className='ico'><MdOutlineLocationOn size={30}/>{location}</p>
                <p className='employment ico'><PiSuitcaseSimpleLight size={30}/>{employment_type}</p>
            </div>
        </div>
    )
} 

export default SimilarJobItem