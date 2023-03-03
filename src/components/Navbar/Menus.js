import React from 'react';

import DropdownMenu from './DropdownMenu';

export default function Menus() {
  return (
        <div className="">
          <div className="flex flex-col p-4 mt-4 rounded-lg md:flex-row md:space-x-10 md:mt-0 md:text-sm md:font-medium md:border-0  dark:bg-gray-800 md:dark:bg-gray-900 dark:border-gray-700">
            <div className="w-full">
              <a href='#home' className='hover:text-primary py-2 block font-poppins'>Home</a>
            </div>
            <div className="w-full">
              <a href='#partner' className='hover:text-primary py-2 block font-poppins'>Partners</a>
            </div>
            <div className="w-full">
              <a href='#careers' className='hover:text-primary py-2 block font-poppins'>Career</a>
            </div>
            <div className="w-full">
              <a href='#trading' className='hover:text-primary py-2 block font-poppins'>Jobs</a>
            </div>
            <div className="w-full">
              <a href='#security' className='hover:text-primary py-2 block font-poppins'>Employers</a>
            </div>
            <DropdownMenu>
              <div className="w-full">
                <a href='#faq' className='hover:text-primary py-2 block font-poppins'>Faq</a>
              </div>
              <div className="w-full">
                <a href='#footer' className='hover:text-primary py-2 block font-poppins'>Section</a>
              </div>
            </DropdownMenu>
          </div>
        </div>
    // <nav class="hidden md:flex xl:flex font-poppins px-2 bg-transparent border-gray-200 dark:bg-gray-900 dark:border-gray-700">
    //   <div class="container flex flex-wrap items-center justify-between mx-auto">
    //   </div>
    // </nav>
  );
}
