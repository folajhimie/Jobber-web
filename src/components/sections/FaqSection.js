import classNames from 'classnames';
import React, { useState } from 'react';
import { BsChevronUp } from 'react-icons/bs';

// import faq from '@/images/illustrations/faq.png';
// import faq from '../../images/illustrations/faq.png';
import Faq from '../../images/faq.svg'
import { Fade } from 'react-reveal';

const FaqItem = ({  open, title, children }) => {
  const [isOpen, setIsOpen] = useState(open ? true : false);
  // const [isTrue, setIsTrue] = useState(1);

  const iconClass = classNames({
    'transition-all duration-300': true,
    'rotate-180': isOpen
  });

  const contentClass = classNames({
    'text-gray transition-all duration-300 overflow-hidden': true,
    'h-full': isOpen,
    'h-0': !isOpen
  });

  return (
    <div className='mb-3 border-b border-lightgray pb-3' >
      <div className='flex justify-between py-3 cursor-pointer text-primary font-poppins' onClick={() => setIsOpen(!isOpen)}>
        {title}
        <BsChevronUp className={iconClass} />
      </div>
      <div className={contentClass}>
        <p className="select-none">
          {children}
        </p>
      </div>
    </div>
  );
};

export default function FaqSection() {
  return (
    <section id='faq' className="container mx-auto py-32">
      <div className="grid md:grid-cols-2">
        <div className="mb-4 mr-6">
          <Fade up duration={1000}>
            <img src={Faq} alt="FAQ" />
          </Fade>
        </div>
        <div className="flex justify-center ml-6">
          <div className="">
            <span className="text-primary font-semibold font-poppins">SUPPORT</span>
            <h2 className="font-semibold text-2xl mb-6 leading-normal font-poppins">
              Frequently asked questions: <span className='text-primary'>Employer Branding</span>
            </h2>
            <div className="my-6">
              <FaqItem open={true}  title="What is Employer Branding?">
                <span className=' flex justify-start font-poppins'>
                  Employer Branding is the discipline of defining, developing and managing a company’s reputation as an employer. Employer branding is a concept that originated in the mid-1990s when employers began applying well-developed product branding principles to the employee experience for the purpose of growing more competitive in their ability to recruit top talent.
                </span>
              </FaqItem>
              <FaqItem open={false}  title="What is the difference between Employer Brand and Corporate Brand?">
                <span className=' flex justify-start  font-poppins'>
                  While your audience for your consumer brand is people who buy your product, your employer brand audience is comprised of your employees (both current and potential). A much broader range of people will likely work at your company than those who buy your product. In fact, they may not be part of the target audience for your company’s product at all. Not everyone who works for a children’s brand has children; not everyone who works for a medical device company uses that medical device.
                </span>
              </FaqItem>
              <FaqItem open={false} title="What are the Benefits of an Employer Brand for Your Company?">
                <span className=' flex justify-start font-poppins'>
                  An authentic, well-defined employer brand is essential to recruiting and retaining quality talent in today’s market. Why? Because employer branding attracts well-informed candidates who are more likely to be motivated to perform, produce and stay.
                </span>
              </FaqItem>
              <FaqItem open={false} title="What Constitutes an Employer Brand?">
                <div className=' flex justify-start font-poppins'>
                  Your business probably already has a well-developed corporate brand to promote its products and services to customers. It needs an equally well-developed employer brand to promote itself to current and future employees.
                </div>
              </FaqItem>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
