import React from 'react';
// import { BsCheckCircleFill } from 'react-icons/bs';

// import banks from '../../images/illustrations/banks.png';
import JobberLogo from '../../images/job.svg';
import Finger from '../../images/finger.svg';
import Tank from '../../images/tank.svg';
import Chart from '../../images/charts.svg'
import { Fade } from 'react-reveal';

export default function SecuritySection() {
  return (
    <section id='security' className="container mx-auto py-32">
      <div className="grid md:grid-cols-2">
        <div className='mr-10'>
          {/* <Fade up>
            <img src={banks} alt="" />
          </Fade> */}
          <Fade up>
            <img src={JobberLogo} alt="" />
          </Fade>
        </div>
        <div className="flex justify-center mb-10 ml-10">
          <div className="max-w-xl">
            <p className='text-primary font-poppins'>HIRE THE JOBBER WAY</p>
            <h2 className="font-semibold text-2xl mb-6 leading-normal">
              We make it our business to connect you <br/>
              with the right talent for your business
            </h2>
            <ul className="my-6">
              <Fade right delay={200}>
                <li className='mb-6'>
                  <span>
                    {/* <BsCheckCircleFill className='text-primary inline mr-2' /> */}
                    <img src={Tank} alt="Globe" className=' bg-primary rounded-full'/>
                    {/* Safety, security and compliance */}
                  </span>
                  <p className='text-primary text-start  mt-2 text-lg font-semibold'>Simple, Tailored Solutions</p>
                  <p className="text-gray-500 mt-3 text-start">
                    We have proven solutions that are easy and effective for HR professionals at any skill level, as well as for employers who need special HR services.
                  </p>
                </li>
              </Fade>
              <Fade left delay={400}>
                <li className='mb-6'>
                  <span className='text-primary flex justify-start'>
                    {/* <BsCheckCircleFill className='text-primary inline mr-2' /> */}
                    <img src={Finger} alt="Globe" className=' bg-pink-500 rounded-full'/>
                  </span>
                  <p className='text-pink-500 text-start  mt-2 text-lg font-semibold'>Deep Database and Experience</p>
                  <p className="text-gray-500 mt-3 text-start">
                    With decades in the recruitment space and over 2.8 Million job seekers, we know how best to match employers looking for the best talent in Nigeria
                  </p>
                </li>
              </Fade>
              <Fade bottom delay={600}>
                <li className='mb-6'>
                  <span>
                    <img src={Chart} alt="Globe" className=' bg-purple-500 rounded-full'/>
                    {/* <BsCheckCircleFill className='text-primary inline mr-2' /> */}
                    {/* SOC Certifications */}
                  </span>
                  <p className='text-purple-500 text-start  mt-2 text-lg font-semibold'>Great Value</p>
                  <p className="text-gray-500 mt-3 text-start">
                  Our solutions are competitively priced, designed to fit every budget, and deliver significant value.
                  </p>
                </li>
              </Fade>
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
