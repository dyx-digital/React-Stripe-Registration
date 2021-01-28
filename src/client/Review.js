import React, {useEffect, useState} from 'react';
import {loadStripe} from '@stripe/stripe-js';
import {Elements, useElements, useStripe} from '@stripe/react-stripe-js';
import QRCode from 'qrcode.react';

import { makeStyles, styled  } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import { Icon } from "@material-ui/core";
import CreditCardIcon from '@material-ui/icons/CreditCard';
import ToggleButton from '@material-ui/lab/ToggleButton';
import ToggleButtonGroup from '@material-ui/lab/ToggleButtonGroup';

import CreditCardPayment from './CreditCardPayment';
import WechatLogo from '../images/wechat.png';
import AlipayLogo from '../images/alipay.jpg';
import './css/Review.css'

const TESTING = false;
const STRIPE_PK = 'pk_test_'
const SUCCESS_PAGE_URL = '' // https://www.example.com

const stripePromise = loadStripe(STRIPE_PK);

const AlipayLogoIcon = styled(Icon)({
  height: '30px',
  width: '30px',
  margin: '0 4px 7px 0px',
});
const WechatLogoIcon = styled(Icon)({
  height: '30px',
  width: '30px',
  margin: '0 4px 7px 0px',
});
const CreditLogoIcon = styled(CreditCardIcon)({
  height: '24px',
  width: '30px',
  margin: '0 3px 2px 0px',
});
const WechatIcon = () => (
  <WechatLogoIcon>
      <img src={WechatLogo} alt="wechat" height={20} width={20}/>
  </WechatLogoIcon>
)
const AlipayIcon = () => (
  <AlipayLogoIcon>
      <img src={AlipayLogo}  alt="alipay" height={25} width={25}/>
  </AlipayLogoIcon>
)
const useStyles = makeStyles((theme) => ({
  listItem: {
    padding: theme.spacing(1, 0),
  },
  total: {
    fontWeight: 700,
  },
  title: {
    marginTop: theme.spacing(2),
    paddingLeft: theme.spacing(1),
  },
  toggleBtn: {
    [theme.breakpoints.down(500)]: {
      maxWidth: 85
    }
  },
  buttonGrid: {
    [theme.breakpoints.down(500)]: {
      marginLeft: 0,
      maxHeight: 70,
      paddingTop: 0
    }
  },
  paymentText: {
    [theme.breakpoints.down(500)]: {
      fontSize: 10
    }
  },
  halfGrid: {
    [theme.breakpoints.down(500)]: {
      maxWidth: 160,
      maxHeight: 90,
    }
  },
}));


const AlipayForm = (props) => {
  const stripe = useStripe();

  return (
    <Grid>
      <Grid container justify="center">
        <Button
          variant="contained"
          color="primary"
          disabled={!stripe}
          target="_blank" href={props.url}
          style={{
            marginTop: '5px'
          }}
        >  Pay with Alipay
        </Button>
       
      </Grid>
      <Typography className="status_message" variant="body1" >
          {props.aliStatus}
        </Typography>
      <Typography className="please_validate" variant="body1" >
          {props.aliError}
        </Typography>

    </Grid>
  );
}


const WechatForm = (props) => {

  return (
    <Grid>  
      <Grid className="wechat">

      <QRCode value={props.qr_code_url} />
    </Grid>
    <Typography className="status_message" variant="body1" >
          {props.wechatStatus}
        </Typography>
     <Typography className="please_validate" variant="body1" >
        {props.wechatError}
      </Typography></Grid>

  );
}


const PaymentGroup = (props) => {
  const stripe = useStripe();
  const elements = useElements();

  const classes = useStyles();

  const { totalPrice } = props;

  const [aliError, setAliError] = useState("");
  const [wechatError, setWechatError] = useState("");

  const [aliStatus, setAliStatus] = useState("");
  const [wechatStatus, setWechatStatus] = useState("");

  const [selectedPayment, setSelectedPayment] = React.useState('credit_card');
  const [qrCode, setQRCode] = React.useState();
  const [wechatSource, setWechatSource] = React.useState();
  const [aliURL, setAliURL] = React.useState();
  const [aliSource, setAliSource] = React.useState();
  const handlePaymentChange = (event, newPayment) => {
    setSelectedPayment(newPayment);    
    if(newPayment === "wechat"){
      handleWechatSubmit(event, totalPrice)
    } else if (newPayment === "alipay") {
      handleAlipaySubmit(event, totalPrice)
    } else {
      setSelectedPayment("credit_card");    
    }
  };

  const handleAlipaySubmit = async (event, totalPrice) => {
    // Block native form submission.
    event.preventDefault();

    if (!stripe || !elements) {
      // Stripe.js has not loaded yet. Make sure to disable
      // form submission until Stripe.js has loaded.
      return;
    }

    var MAX_POLL_COUNT = 50;
    var TIMEOUT_LENGTH = 5000;
    var pollCount = 0;


    function pollForSourceStatus(r) {
      stripe.retrieveSource({id: r.source.id, client_secret: r.source.client_secret}).then(async (res) => {

        var source = await res.source;

        console.log(source.status)

        if( pollCount === MAX_POLL_COUNT) {
          setAliError("Communication with Alipay expired. If you have confiremd payment, you may exit this page. We will contact you if any issues have arisen.")

        }
        else if (source.status === 'chargeable') {
          // console.log(source)
          setAliStatus("Your order was received and is awaiting payment confirmation. You may exit this page.")

          pollCount += 1;
          setTimeout(pollForSourceStatus, TIMEOUT_LENGTH, r);
        } else if (source.status === 'consumed') {

          props.handleReviewClick();
        
        } else if (source.status === 'pending' && pollCount < MAX_POLL_COUNT) {
          // Try again in a second, if the Source is still `pending`:
          pollCount += 1;
          if( pollCount === 20 ){
            setAliStatus("Your order was received and is awaiting payment confirmation.")
          }
          setTimeout(pollForSourceStatus, TIMEOUT_LENGTH, r);
        } else if (source.status === 'failed' || source.status === 'canceled'){
          setAliError("Your Alipay payment failed and your order couldn’t be processed.")
          // setTimeout(pollForSourceStatus, TIMEOUT_LENGTH, r);
        } else {
          console.log("Other status:", source.status)
          pollCount += 1;
          setTimeout(pollForSourceStatus, TIMEOUT_LENGTH, r);
        }
      });
    }

    if(!aliURL){
      const alipay_result = await stripe.createSource({
        type: 'alipay',
        amount: totalPrice * 100,
        currency: 'cad',
        redirect: {
          return_url: SUCCESS_PAGE_URL,
        },
      })
      setAliURL(alipay_result.source.redirect.url);
      setAliSource(alipay_result);

      pollForSourceStatus(alipay_result);


    } else {

      if(aliSource) {
        pollForSourceStatus(aliSource);

      } else {
        setAliError("Alipay error.")
      }

    }
  };


  const handleWechatSubmit = async (event, totalPrice) => {
    // Block native form submission.
    event.preventDefault();

    if (!stripe || !elements) {
      // Stripe.js has not loaded yet. Make sure to disable
      // form submission until Stripe.js has loaded.
      return;
    }

    var MAX_POLL_COUNT = 50;
    var TIMEOUT_LENGTH = 5000;
    var pollCount = 0;


    function pollForSourceStatus(r) {
      stripe.retrieveSource({id: r.source.id, client_secret: r.source.client_secret}).then(async (res) => {
        // console.log(res)
        var source = await res.source;

        console.log(source.status)

        if( pollCount === MAX_POLL_COUNT) {
          setWechatError("Communication with Wechat expired. If you have confiremd payment, you may exit this page. We will contact you if any issues have arisen.")

        }
        else if (source.status === 'chargeable') {
          // console.log(source)
          setWechatStatus("Your order was received and is awaiting payment confirmation. You may exit this page.")

          pollCount += 1;
          setTimeout(pollForSourceStatus, TIMEOUT_LENGTH, r);
        } else if (source.status === 'consumed') {

          props.handleReviewClick();
        
        } else if (source.status === 'pending' && pollCount < MAX_POLL_COUNT) {
          // Try again in a second, if the Source is still `pending`:
          pollCount += 1;
          if( pollCount === 20 ){
            setWechatStatus("Your order was received and is awaiting payment confirmation.")
          }
          setTimeout(pollForSourceStatus, TIMEOUT_LENGTH, r);
        } else if (source.status === 'failed' || source.status === 'canceled'){
          setWechatError("Your Wechat payment failed and your order couldn’t be processed.")
          // setTimeout(pollForSourceStatus, TIMEOUT_LENGTH, r);
        } else {
          console.log("Other status:", source.status)
          pollCount += 1;
          setTimeout(pollForSourceStatus, TIMEOUT_LENGTH, r);
        }
      });
    }

    if(!qrCode){
      const result = await stripe.createSource({
        type: 'wechat',
        amount: totalPrice * 100,
        currency: 'cad',
      })
      setQRCode(result.source.wechat.qr_code_url);
      setWechatSource(result);

      
      pollForSourceStatus(result);


    } else {
      if(wechatSource) {
        pollForSourceStatus(wechatSource);

      } else {
        setWechatError("Wechat QR code error.")
      }

    }
  };


  return (
    <Grid container spacing={2}>
        <Typography variant="h6" gutterBottom className={classes.title}>
          Payment details
        </Typography>
        <Grid item xs={12} className={classes.buttonGrid} >
          <ToggleButtonGroup
            value={selectedPayment}
            exclusive
            className={classes.toggleGroup}

            onChange={handlePaymentChange}
            aria-label="text alignment"
          >
            <ToggleButton value="credit_card" aria-label="left aligned"
            className={classes.toggleBtn}>
              <CreditLogoIcon fontSize="small" />
              <Typography className={classes.paymentText}>
              Credit Card             </Typography>
              </ToggleButton>
            <ToggleButton value="wechat" aria-label="centered" className={classes.toggleBtn}>

            <WechatIcon />
            <Typography className={classes.paymentText}>
            Wechat Pay

            </Typography>
            </ToggleButton>

            <ToggleButton value="alipay"
            aria-label="right aligned" className={classes.toggleBtn}>
            <AlipayIcon />
            <Typography className={classes.paymentText}>
            Alipay            </Typography>
</ToggleButton>
          </ToggleButtonGroup>
        </Grid>
        <Grid item xs={12}>
          {(selectedPayment === "credit_card") &&
              <CreditCardPayment handleBillingClick={props.handleBillingClick} 
              totalPrice={props.totalPrice}
              handleReviewClick={props.handleReviewClick}
            />
          }
          {(selectedPayment === "wechat") && qrCode &&
          <WechatForm qr_code_url={qrCode} 
          wechatError={wechatError} 
          wechatStatus={wechatStatus}
           setWechatError={setWechatError}
           setWechatStatus={setWechatStatus} />
          }
          {(selectedPayment === "alipay") && aliURL &&
              <AlipayForm url={aliURL} aliError={aliError} setAliError={setAliError}
              aliStatus={aliStatus}
              setAliStatus={setAliStatus}
              
              />
          }

        </Grid>
      </Grid>
  );
}

export default function Review(props) {
  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])

  const classes = useStyles();
  let courseList = [];
  let total = 49.99;
  // let orderFormValues = {}
  // let relevantFiles = []
  // temporary for testing
  
  if(TESTING){
    courseList = [
      { name: 'CGC1D - Issues in Canadian Geography', price: 'FREE' },
    ];
  }

  if(props.orderInfo){
    const { values,
      totalPrice,
      orderedCourses, files } = props.orderInfo;
    total = totalPrice;
    // orderFormValues = values;
    // relevantFiles = files;

    courseList = orderedCourses
  }

  // console.log(orderFormValues, relevantFiles)
  
  return (
    <React.Fragment>
      <Typography variant="h6" gutterBottom>
        Order summary
      </Typography>
      <List disablePadding>
        {courseList.map((product) => (
          <ListItem className={classes.listItem} key={product.name}>
            <ListItemText primary={product.name} secondary={product.desc} />
            <Typography variant="body2">{product.price}</Typography>
          </ListItem>
        ))}
        <ListItem className={classes.listItem} key={"fee"}>
            <ListItemText primary="Registration Fee" />
            <Typography variant="body2">49.99</Typography>
          </ListItem>
        <ListItem className={classes.listItem}>
          <ListItemText primary="Total" />
          <Typography variant="subtitle1" className={classes.total}>
          {total}
          </Typography>
        </ListItem>
      </List>
      <Elements stripe={stripePromise}>
        <PaymentGroup totalPrice={total} handleReviewClick={props.handleReviewClick} />
      
      </Elements>
    </React.Fragment>
  );
}