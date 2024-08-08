import PropTypes from 'prop-types';
import { styled } from '@mui/material/styles';
import CircularProgress from '@mui/material/CircularProgress';

const FullWidthLoader = styled('div')(() => ({
  width: '100%',
  height: '100%',
  position: 'absolute',
  top: 0,
  left: 0,
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  background: 'rgba(255, 255, 255, 0.5)', // Adjust opacity or color as needed
  zIndex: 9999,
}));

const Preloader = ({ isLoading, size = 50 }) => {
  if (!isLoading) {
    return null;
  }
  return (
    <FullWidthLoader>
      <CircularProgress size={size} />
    </FullWidthLoader>
  );
};

Preloader.propTypes = {
  isLoading: PropTypes.bool.isRequired,
  size: PropTypes.number,
};

export default Preloader;
