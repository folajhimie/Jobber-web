import classNames from 'classnames';
import React from 'react';
import { ReactSVG } from 'react-svg';
// import PropTypes from 'prop-types';

// import star from '@/images/particles/star1.svg';

import star from '../../images/particles/star1.svg';
// import styled from "styled-components";

// const mystyle = {
//   color: "white",
//   backgroundColor: "DodgerBlue",
//   padding: "10px",
//   fontFamily: "Arial"
// };

export default function StarParticle({ className }) {
  return (
    <span className={classNames(className)}>
        <ReactSVG src={star} className="animated bounceInDown" />
    </span>
  );
}




// StarParticle.propTypes = {
//   classNames: PropTypes.string
// };
