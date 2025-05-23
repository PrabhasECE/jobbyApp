import {Link} from 'react-router-dom'

import {MdOutlineLocationOn} from 'react-icons/md'
import {PiSuitcaseSimpleLight} from 'react-icons/pi'
import {AiOutlineStar} from 'react-icons/ai'

import './index.css'

const JobCardItem = props =>  {
    const {jobData} = props
    const {company_logo_url,employment_type,job_description,location,package_per_annum,rating,title,id} = jobData
    return(
        <Link to={`/jobs/${id}`} className="link-item">
            <div className='details'>
                <div className='company'>
                    <img src={company_logo_url} alt="logo" className='company-logo'/>
                    <div className='title'>
                        <p>{title}</p>
                        <p className='ico'><AiOutlineStar />{rating}</p>
                    </div>
                </div>
                <div className='location'>
                    <p className='ico'><MdOutlineLocationOn size={30}/>{location}</p>
                    <p className='employment ico'><PiSuitcaseSimpleLight size={30}/>{employment_type}</p>
                    <p className='package'>{package_per_annum}</p>
                </div>
                <div>
                    <h3 className='heading'>Description</h3>
                    {job_description}
                </div>
            </div>
        </Link>
    )
}

export default JobCardItem