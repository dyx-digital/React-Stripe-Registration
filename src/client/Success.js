
import React, {useEffect} from 'react';

import Link from '@material-ui/core/Link';
import Typography from '@material-ui/core/Typography';
import { styled } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';

import './css/Success.css';

const Payment = styled(Typography)({
    border: '1px',
  
    borderStyle: 'none',
    backgroundColor: '#fff',
    margin: '10px',
  
    borderRadius: '4px',
  });

const BigGrid = styled(Grid)({
    height: '600px'
  });

export default function Confirmation(props) {
    useEffect(() => {
      window.scrollTo(0, 0)
    }, [])
    return (
        <React.Fragment>
          <BigGrid>
          <Typography component="h1" variant="h3" align="center">
            Payment Success!
          </Typography>
          <Payment variant="h5" className="paymentResult" align="center">
          Your payment has been processed.
          </Payment>
          <Typography variant="h5" align="center">
          For any questions or issues please call:
          </Typography>
          <div className="phone">
          <Link variant="h5" align="center" underline="always">
            1(888) 888-8888
          </Link>
          </div>
          </BigGrid>
     
   

        </React.Fragment>
    )
}