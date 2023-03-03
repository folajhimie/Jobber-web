import React, {useEffect} from 'react';
// import PropTypes from 'prop-types';

import Footer from '../Footer/index';
import Navbar from '../Navbar/index';
import HeroSection from '../sections/HeroSection';
// import CryptocurrencySection from '../sections/CryptocurrencySection';
import BuyAndTradeSection from '../sections/BuyAndTradeSection';
import PartnerSection from '../sections/PartnerSection';
import CreditCardSection from '../sections/CreditCardSection';
import TradingToolsSection from '../sections/TradingToolsSection';
import SecuritySection from '../sections/SecuritySection';
import StepSection from '../sections/StepSection';
import FaqSection from '../sections/FaqSection';
import BackToTopSection from '../sections/BackToTopSection';
import scrollreveal from "scrollreveal";


const Layout = () => {
  useEffect(() => {
    const sr = scrollreveal({
      origin: "top",
      distance: "80px",
      duration: 2000,
      reset: true,
    });
    sr.reveal(
      `
        #nav,
        #hero,
        #services,
        #recommend,
        #testimonials,
        #foot
        `,
      {
        opacity: 0,
        interval: 300,
      }
    );
  }, []);
  return (
    <div>
      <header>
        <Navbar />
      </header>
      <main className='overflow-hidden'>
        <HeroSection />
        {/* <CryptocurrencySection /> */}
        <BuyAndTradeSection />
        <PartnerSection />
        <CreditCardSection />
        <TradingToolsSection />
        <SecuritySection />
        <StepSection />
        <FaqSection />
        <BackToTopSection />
      </main>
      <Footer />
    </div>
  );
}



export default Layout;


// Layout.propTypes = {
//   children: PropTypes.node
// };
