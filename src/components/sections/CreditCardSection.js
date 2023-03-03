import React from 'react';
import { BsCheckCircleFill } from 'react-icons/bs';

import SecondaryButton from '../../components/buttons/SecondaryButton/index';
// import creditCard from '../../images/illustrations/credit-card.png';
import Job from '../../images/jobber.svg';
import { Fade } from 'react-reveal';

const CreditCardSection = () => {
  return (
    <section id='careers' className="container mx-auto py-32 font-poppins">
      <div className="grid md:grid-cols-2 gap-6">
        <div className="mb-12 px-4 md:px-4 ml-10">
          {/* <Fade up>
            <img src={creditCard} alt="" />
          </Fade> */}
          <Fade left>
            <img src={Job} alt="" width="" height="" />
          </Fade>
        </div>
        <div className="flex justify-center mr-6">
          <div className="max-w-md">
            <h2 className="font-poppins font-bold text-4xl mb-6 leading-normal text-start">
              Your employer brand starts here.<span className="text-primary font-poppins"> JOBBER</span> 
            </h2>
            <p className='text-gray-500 text-start font-poppins'>Authentic reviews, rich storytelling and powerful insights, found only on Jobber, help you attract top talent.<br /> at application.</p>

            <ul className="my-6 text-start">
              <li className='mb-4 font-poppins'>
                <BsCheckCircleFill className='text-primary inline mr-2' />
                Access to a larger pool of job opportunities.
              </li>
              <li className='mb-4 font-poppins'>
                <BsCheckCircleFill className='text-primary inline mr-2' />
                Get Up to 50% of Job Vacancies across Africa
              </li>
              <li className='mb-4 font-poppins'>
                <BsCheckCircleFill className='text-primary inline mr-2' />
                No Subscription Fee for Job Alerts
              </li>
            </ul>

            <div className='text-start mt-10 font-poppins'>
              <SecondaryButton>
                Join Us
              </SecondaryButton>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}


export default CreditCardSection;