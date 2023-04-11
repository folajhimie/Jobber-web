/* eslint-disable react-hooks/exhaustive-deps */
import { useState, useEffect } from "react";
import { BsChevronCompactLeft, BsChevronCompactRight } from 'react-icons/bs';
// import { RxDotFilled } from 'react-icons/rx';
import Logo from "../../assets/images/fontIcon/logo.png";
import Icon from "../../assets/images/fontIcon/icon.png";
import '../ImageSlider/ImageSlider.css';


const ImageSlider = () => {
  const slides = [
    {
      url: 'https://images.pexels.com/photos/4049940/pexels-photo-4049940.jpeg?auto=compress&cs=tinysrgb&w=600',
      data: 'The Most popular job Vacancies website In Nigeria',
    },
    {
      url: 'https://images.pexels.com/photos/5439438/pexels-photo-5439438.jpeg?auto=compress&cs=tinysrgb&w=600',
      data: 'You deserve a job that loves you back',
    },
    {
      url: 'https://images.pexels.com/photos/5922535/pexels-photo-5922535.jpeg?auto=compress&cs=tinysrgb&w=600&lazy=load',
      data: 'Get Job Alert as you register on Jobber',
    },
    {
      url: 'https://images.pexels.com/photos/4049870/pexels-photo-4049870.jpeg?auto=compress&cs=tinysrgb&w=600',
      data: 'a platform that connect employees with employers',
    },
    {
      url: 'https://images.pexels.com/photos/9684430/pexels-photo-9684430.jpeg?auto=compress&cs=tinysrgb&w=600&lazy=load',
      data: 'Millions of people are searching for jobs, salary information, company reviews, and interview questions.',
    },
  ];

  var [currentIndex, setCurrentIndex] = useState(0);
  const[direction, setDirection] = useState(true);
  const [autoPlay, setAutoPlay] = useState(true);
  let timeOut = null;

  
  const goToPrevious = () => {
    const newIndex = currentIndex === 0 ? slides.length - 1 : currentIndex - 1;
    setCurrentIndex(newIndex);
    setDirection(true);
    // console.log("the prev index..", newIndex)
    console.log("this is the Previous Index..", currentIndex, direction);
  };


  const goToNext = () => {
    const newIndex = currentIndex === slides.length - 1 ? 0 : currentIndex + 1;
    setCurrentIndex(newIndex);
    setDirection(false);
    // console.log("the next index..", newIndex)
    // console.log("this is the Next Index..", currentIndex, direction);
  };


  const goToSlide = (slideIndex) => {
    // console.log("the time is now..", slideIndex);
    if (currentIndex <= slideIndex) {
      setDirection(false)
    } else {
      setDirection(true)
    }
    setCurrentIndex(slideIndex);
  };



  useEffect(() => {
    timeOut =
      autoPlay &&
      setTimeout(() => {
        goToNext();
      }, 3000);
  });

  return (

    <div className='h-full w-full m-auto relative group'>
      <div
        className="carousel"
        onMouseEnter={() => {
          setAutoPlay(false);
          clearTimeout(timeOut);
        }}
        onMouseLeave={() => {
          setAutoPlay(true);
        }}
      >
        <div className="flex flex-col justify-around">
          <div className=" w-full flex justify-center absolute z-30 top-56">
            <div
              className="m-1"
              style={{ width: "30px", height: "30px" }}
            >

              <img src={Icon} alt="jobber" width="70px" height="70px" />

            </div>
            <span className="mt-1 mr-6"><img src={Logo} alt="jobber" width="120px" height="120px" /></span>
          </div>
          <div className="w-full flex flex-col justify-center items-center absolute z-30 top-80">
            <p className="text-white capitalize relative z-30 right-2">{slides[currentIndex].data}</p>
            <div className='py-1 px-1 w-52 flex flex-row top-4 justify-center items-center z-50 relative'>
            </div>

            <button type="submit" className="relative z-30 flex justify-center items-center w-32 bg-white text-teal-800 mt-4 py-2 rounded-lg font-bold mb-2">Read More</button>
          </div>
        </div>
        <div
          style={{ backgroundImage: `url(${slides[currentIndex].url})` }}
          className='w-full h-full bg-center bg-cover duration-500'
        ></div>
        {/* Left Arrow */}
        <div className='hidden group-hover:block absolute top-[50%] -translate-x-0 translate-y-[-50%] left-5 text-2xl rounded-full p-2 bg-black/20 text-white cursor-pointer'>
          <BsChevronCompactLeft onClick={goToPrevious} size={30} />
        </div>
        {/* Right Arrow */}
        <div className='hidden group-hover:block absolute top-[50%] -translate-x-0 translate-y-[-50%] right-5 text-2xl rounded-full p-2 bg-black/20 text-white cursor-pointer'>
          <BsChevronCompactRight onClick={goToNext} size={30} />
        </div>
        <div className='flex bottom-0 justify-center items-center absolute w-full z-50'>
          <div className='py-1 px-1 w-52 flex top-4 justify-evenly items-center mb-12 rounded-full bg-black/20 z-50 relative'>
            {slides.map((slide, slideIndex) => (
              <div
                key={slideIndex}
                onClick={() => goToSlide(slideIndex)}
                className={
                  slideIndex === currentIndex
                  ? "pagination_dot pagination_dot-active"
                  : "pagination_dot"
                }
                // className='relative z-50 text-2xl cursor-pointer rounded-full flex justify-center flex-row text-white'
              >
                {/* ● */}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ImageSlider;