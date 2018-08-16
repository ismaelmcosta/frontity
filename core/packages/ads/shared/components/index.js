import React from 'react';
import PropTypes from 'prop-types';
import { inject } from 'mobx-react';
import { Fill } from 'react-slot-fill';
import Ad from './Ad';
import Sticky from './Sticky';

const Ads = ({ fills, isAmp }) =>
  (isAmp ? fills.filter(item => item.type !== 'sunmedia') : fills).map(
    ({ name, isSticky, ...adProps }) => (
      <Fill key={name} name={name}>
        {isSticky ? (
          <Sticky format={adProps} slotName={name} />
        ) : (
          <Ad {...adProps} slotName={name} />
        )}
      </Fill>
    ),
  );

Ads.propTypes = {
  fills: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.string.isRequired,
    }),
  ),
  isAmp: PropTypes.bool.isRequired,
};

export default inject(({ stores: { build, settings } }) => {
  const ads = settings.theme.ads || {};

  return {
    isAmp: build.isAmp,
    fills: ads.fills || [],
    adsAreLazy: ads.areLazy,
  };
})(Ads);

export { Ad, Sticky };
