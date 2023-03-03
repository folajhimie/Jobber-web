import React from 'react';

// import signupImage from '../../images/illustrations/signup.png';
// import walletImage from '../../images/illustrations/wallet.png';
// import okayImage from '../../images/illustrations/okay.png';
import JobApproved from '../../images/jobApproved.svg'
import JobHunt from '../../images/jobhunt.svg';
import JobInterview from '../../images/jobInterview.svg'
import arrow from '../../images/arrow.svg';
import { Fade } from 'react-reveal';

export default function StepSection() {
  return (
    <section className="px-6">
      <div className='rounded-3xl bg-gradient-to-b from-[#FFFFFF] to-[#F4F9FF] py-20'>
        <div className="container mx-auto text-center">
          <h2 className="font-bold text-4xl mb-6 leading-normal font-poppins">
            Get started in just a few minutes
          </h2>
          <div className="md:flex justify-center gap-20">
            <Fade up>
              <div className="text-center relative px-4">
                <div className='relative'>
                  <img src={JobHunt} className=" mb-4 mx-auto hover:-translate-y-6 hover:scale-105 transition-all duration-300" alt="" height="230px" width="230px"/>
                  <img src={arrow} alt="" className="hidden md:block absolute top-1/2 -right-36" />
                </div>
                <h3 className="text-2xl font-bold mb-4 font-poppins">Job Hunting</h3>
                <p className="text-gray max-w-sm font-poppins">
                The immediate goal of job seeking is usually to obtain a job interview with an employer which may lead to getting hired.
                </p>
              </div>
            </Fade>
            <Fade up delay={500}>
              <div className="text-center relative px-4">
                <div className='relative'>
                  <img src={JobInterview} className="mb-4 mx-auto hover:-translate-y-6 hover:scale-105 transition-all duration-300" alt="" height="230px" width="230px"/>
                  <img src={arrow} alt="" className="hidden md:block absolute top-1/2 -right-36" />
                </div>
                <h3 className="text-2xl font-bold mb-4 font-poppins">Job Interview</h3>
                <p className="text-gray max-w-sm font-poppins">
                  The interview is usually preceded by the evaluation of submitted résumés from interested candidates, possibly by examining job applications or reading many resumes.
                </p>
              </div>
            </Fade>
            <Fade up delay={1000}>
              <div className="text-center relative px-4">
                <img src={JobApproved} className="mb-4 mx-auto hover:-translate-y-6 hover:scale-105 transition-all duration-300" alt="" height="230px" width="230px"/>
                <h3 className="text-2xl font-bold mb-4 font-poppins">Job Approval</h3>
                <p className="text-gray max-w-sm font-poppins">
                  Job security is the probability that an individual will keep their job; a job with a high level of security is such that a person with the job would have a small chance of losing it.
                </p>
              </div>
            </Fade>
          </div>
        </div>
      </div>
    </section>
  );
}
