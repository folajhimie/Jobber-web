import classNames from 'classnames';
import React, { useEffect, useState } from 'react';
import { BsList, BsX } from 'react-icons/bs';
import { useMediaQuery } from 'react-responsive';

// import logo from '../../images/logo.svg';
// import PrimaryButton from '@/components/buttons/PrimaryButton';
// import PrimaryButton from '../buttons/PrimaryButton';
import Menus from './Menus';
// import SecondaryButton from '../buttons/SecondaryButton';
import JobberLogo from '../../assets/images/fontIcon/icon.png'
import Icon from '../../assets/images/fontIcon/logo.png'
// import SecondaryButton from '@/components/buttons/SecondaryButton';
// import Menus from './Menus';

export default function Navbar() {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [backgroundwhite, setBackgroundWhite] = useState(false);

  const isMobile = useMediaQuery({ maxWidth: '768px' });

  const handleWindowScroll = (e) => {
    const height = window.scrollY;
    const tresholdHeight = 50;

    if (height > tresholdHeight) {
      setBackgroundWhite(true);
    } else {
      setBackgroundWhite(false);
    }
  };

  const handleBlackScreenClick = (e) => {
    e.stopPropagation();
    setDropdownOpen(false);
  };

  useEffect(() => {
    if (isMobile) {
      setDropdownOpen(false);
    }
  }, [isMobile]);

  useEffect(() => {
    setBackgroundWhite(dropdownOpen);
  }, [dropdownOpen]);

  useEffect(() => {
    window.addEventListener('scroll', handleWindowScroll);

    return () => window.removeEventListener('scroll', handleWindowScroll);
  }, []);

  return (
    <nav className={classNames('fixed w-full transition-all duration-700 z-10 py-8 ', {
      "bg-white shadow-lg !py-3": backgroundwhite
    })}>
      <div className="px-4 mx-auto top-0 flex justify-between items-center">
        <a href="/landing" className="flex items-center">
          {/* <img src={logo} className="mr-10" alt="Jobber" /> */}
          <div className="flex justify-center w-full ">
            <div
              className="m-1"
              style={{ width: "30px", height: "30px" }}
            >

              <img src={JobberLogo} alt="jobber" width="80px" height="80px" />

            </div>
            <span className="mt-1 mr-6"><img src={Icon} alt="jobber" width="140px" height="140px" /></span>
          </div>
        </a>
        <div className=' hidden w-5/12 mx-4 gap-8 md:hidden xl:flex sm:hidden lg:hidden xsl:flex'>
          <Menus />
        </div>
        <div className="hidden gap-4 md:flex">
          {/* <SecondaryButton>
            
          </SecondaryButton> */}
          <a className="bg-primary rounded-md py-2 px-10 text-white font-poppins flex items-center" href='/auth/login' alt="">Sign In</a>
          {/* <button >
                Learn More
              </button> */}
          <a className="bg-white border border-teal-700 rounded-md py-2 px-10 text-primary font-poppins flex items-center" href='/auth/register' alt="">Sign Up</a>
          {/* <PrimaryButton>
          
            <a href='/auth/register' alt="">Sign up</a>
          </PrimaryButton> */}
        </div>
        <div className="md:hidden text-2xl">
          <button className="z-50 p-4 block transition-all" onClick={() => setDropdownOpen(!dropdownOpen)}>
            {dropdownOpen ?
              <BsX />
              :
              <BsList />
            }
          </button>

          {/* Menu dropdown */}
          <div className={classNames({
            'text-base left-0 top-full right-0 absolute transition-all duration-400': true,
            'invisible opacity-0': !dropdownOpen,
            'visible opacity-100': dropdownOpen,
          })}>
            <div className="h-screen left-0 bg-black bg-opacity-30" onClick={handleBlackScreenClick}>
              <div className="z-20 shadow-xl bg-white p-6">
                <div className="mb-4">
                  <Menus />
                </div>
                <div className="gap-4 flex mb-6 ml-6">

                  <a className="bg-primary rounded-md py-2 px-10 text-white font-poppins flex items-center" href='/auth/login' alt="">Sign In</a>
                  <a className="bg-white border border-teal-700 rounded-md py-2 px-10 text-primary font-poppins flex items-center" href='/auth/register' alt="">Sign Up</a>
                  {/* <SecondaryButton className="w-full">
                    Sign In
                  </SecondaryButton>
                  <PrimaryButton className="w-full">
                    Sign Up
                  </PrimaryButton> */}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
}
