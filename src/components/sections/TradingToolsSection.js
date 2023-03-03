import React from 'react';

// import tradingTools from '../../images/illustrations/tradingtools.png';
import TradingTools from '../../images/startup.svg';
import SecondaryButton from '../buttons/SecondaryButton/index';
import { Fade } from 'react-reveal';

export default function TradingToolsSection() {
  return (
    <section id='trading' className="px-6">
      <div className='rounded-3xl bg-gradient-to-b from-[#FFFFFF] to-[#F4F9FF] py-20'>
        <div className="container mx-auto">
          <div className="grid md:grid-cols-2 gap-6">
            <div className='lg:row-start-1 max-w-lg'>
              <h2 className="font-bold text-4xl mb-6 leading-normal font-poppins">
                Advanced Job Hunting <span className="text-violet-gradient font-poppins">Tools</span>

              </h2>
              <div className="mb-6 font-poppins">
                <h3 className='font-semibold text-xl mb-4 font-poppins'>Recruiters Do The Job Search For You</h3>
                <p className='text-gray-500 font-poppins'>A recruitment agency has access to a vast database of open positions, including those that are never announced or advertised on job boards or other locations. Access to those positions could be the difference in finding a job and finding the right job.</p>
              </div>
              <div className="mb-6">
                <h3 className='font-semibold text-xl mb-4'>Better Matches To Jobs And Companies</h3>
                <p className='text-gray-500 font-poppins'>Insights into a position, as well as a company’s culture, values, and expectations, may not always be available to a regular job applicant. Recruitment agencies put a great deal of effort into understanding both sides of a hire, since it is in their best interest to make a good match between both the candidate and the company. Putting candidates in a position to succeed benefits all three parties and can make sure the next job you land is the best one.</p>
              </div>
              <div className="mb-6">
                <h3 className='font-semibold text-xl mb-4'>Customer Support</h3>
                <p className='text-gray-500 font-poppins'>Premium 24/7 support available to all customers worldwide by phone or email. Dedicated account managers for partners.</p>
              </div>
              <SecondaryButton>
                Get Started
              </SecondaryButton>
              
                <button className='py-4 px-10 text-primary underline'>
                  Learn more
                </button>
              
            </div>
            <div className="row-start-1 mb-8">
              <Fade up>
                <img src={TradingTools} alt="" />
              </Fade>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
