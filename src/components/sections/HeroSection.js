import React from 'react';
import { FaWindows, FaLinux, FaAppStore, FaAndroid } from 'react-icons/fa';

// import globoCrypto from '@/images/illustrations/globe.png';
// import globoCrypto from '../../images/illustrations/globe.png';
import JobFront from '../../images/jobFront.svg'
import PrimaryButton from '../buttons/PrimaryButton/index';
import BlueCircleParticle from '../particles/BlueCircleParticle';
import OrangeCircleParticle from '../particles/OrangeCircleParticle';
import StarParticle from '../particles/StarParticle';
import PurpleCircleParticle from '../particles/PurpleCircleParticle';
import DropdownButton from '../buttons/DropdownButton';
// import styled from "styled-components";

// const mystyle = {
//   color: "white",
//   backgroundColor: "DodgerBlue",
//   padding: "10px",
//   fontFamily: "Arial"
// };


const HeroSection = () => {
  return (
    <section id="hero" className='relative bg-primary pt-[140px] bg-opacity-5 pb-24'>
      {/* <StarParticle className="absolute top-50 left-20" /> */}
      <span className="absolute bg-purple-400 -left-28 -top-28 rounded-full opacity-[20%] blur-3xl aspect-square h-[350px] -z-10 animate-pulse" />
      <span className="absolute bg-gradient-to-br from-primary to-secondary -right-28 -bottom-28 rounded-full opacity-[15%] blur-3xl  delay-700 duration-1000 aspect-square h-[550px] -z-10" />

      <div className="container px-4 mx-auto grid md:grid-cols-2">
        <div className='flex items-center'>
          <div className='relative'>
              <StarParticle className="absolute top-0 right-0" />
              <PurpleCircleParticle className="absolute bottom-0 -left-12" />

            <p className='text-primary font-poppins'>JOIN US TODAY</p>
            <h1 className='text-4xl md:text-5xl lg:text-6xl font-bold leading-normal font-poppins'>
              Africa’s <br />
              <span className='text-primary font-poppins z-50 relative'>Fastest Job Hunting</span> <br />
              Company
            </h1>
            <div className="mt-4 mb-8">
              <p className="text-gray-500 font-poppins">Explore and discover the right job for you!</p>
              <p className="text-gray-500 font-poppins">Connect with JOBBER to land your Perfect Dream Job.</p>
            </div>
            <div className="flex justify-center col-span-2 lg:flex gap-4 lg:mb-12">
              <PrimaryButton className="w-full lg:w-auto mb-2 lg:mb-0">
                <a href="/auth/register" alt="" className='font-poppins'>
                  Get Started
                </a>
              </PrimaryButton>
              <DropdownButton name="Download App" className="w-full lg:w-auto">
                <a href="#/" target="_blank" className="hidden w-full hover:bg-primary px-6 pt-4 pb-2  hover:text-white">
                  <FaWindows className='inline mr-2 font-poppins' /> Windows
                </a>
                <a href="/download/linux" target="_blank" className="hidden w-full hover:bg-primary px-6 py-2  hover:text-white">
                  <FaLinux className='inline mr-2 font-poppins' /> Linux
                </a>
                <a href="/download/android" target="_blank" className="w-full hover:bg-primary px-6 py-2 block hover:text-white">
                  <FaAndroid className='inline mr-2 font-poppins' /> Android
                </a>
                <a href="/download/ios" target="_blank" className="w-full hover:bg-primary px-6 pb-4 pt-2 block hover:text-white">
                  <FaAppStore className='inline mr-2 font-poppins' /> IOS
                </a>
              </DropdownButton>
            </div>
          </div>
        </div>
        <div className="relative hidden md:block">
          <BlueCircleParticle className="absolute top-0 left-11 duration-[5s]" />
          <OrangeCircleParticle className="absolute bottom-1/4 right-0" />

          <img src={JobFront} alt="Globe" className='z-50 relative '/>
        </div>
      </div>
    </section >
  );
}


export default HeroSection;
