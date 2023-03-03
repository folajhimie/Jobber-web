import React, { useState } from 'react';
import Icon from '../../images/illustrations/icons8.png'

export default function BackToTopSection() {
  const [scrollState, setScrollState] = useState(false);
  const handleClick = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  window.addEventListener("scroll", () => {
    window.pageYOffset > 200 ? setScrollState(true) : setScrollState(false);
  });


  return (
    <section className='w-full py-10 relative flex justify-end justify-items-end '>
      <div className="container mx-auto text-center py-6">
        <button className='border border-[#DDDDDD] rounded-full text-gray py-5 px-5 bg-primary' onClick={handleClick} scrollState={scrollState}>
        <img src={Icon} className="mx-auto " alt="" />
        </button>
      </div>
    </section>
  );
}
