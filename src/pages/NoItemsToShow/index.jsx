import { Typography, Box } from '@mui/material';

// redux hook
import { useArticles } from '../../redux/hooks';

const NoItemsToShow = () => {
  const { error } = useArticles();
  return (
    <Box sx={{ display: 'flex', justifyContent: 'center', marginTop: '20%' }}>
      {
        error ? 
        <Typography variant='h6' color='red'>{error.message || error}</Typography> : 
        <Typography variant="h6">There are no items to show</Typography>
      }
    </Box>
  );
};

export default NoItemsToShow;
