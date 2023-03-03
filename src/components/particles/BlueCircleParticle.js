import React from 'react';
import { ReactSVG } from 'react-svg';
import classNames from 'classnames';
// import PropTypes from 'prop-types';

// import blueCircle from '@/images/particles/circle1.svg';
import blueCircle from '../../images/particles//circle1.svg'
// import blueCircleSVG from '@/images/particles/circle'


export default function BlueCircleParticle({ className }) {
  return (
    <span className={classNames(className)}>
      <ReactSVG src={blueCircle} className="animated bounceInUp"/>
    </span>
  );
}

// BlueCircleParticle.propTypes = {
//   classNames: PropTypes.string
// };