import React from 'react';
import axios from 'axios';

import { makeStyles,  createMuiTheme, responsiveFontSizes, ThemeProvider } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import Paper from '@material-ui/core/Paper';
import Stepper from '@material-ui/core/Stepper';
import Step from '@material-ui/core/Step';
import StepLabel from '@material-ui/core/StepLabel';
import Button from '@material-ui/core/Button';
import Link from '@material-ui/core/Link';
import Typography from '@material-ui/core/Typography';

import AddressForm from './client/Information';
import Review from './client/Review';
import Confirmation from './client/Success';

const TESTING_SKIP_TO_REVIEW = false;
const TEST_NO_EMAIL = false;
const HOMEPAGE_URL = "" // example.com 
const LAMBDA_EMAIL_URL = '' // https://asdf.execute-api.us-east-1.amazonaws.com/dev/sendEmail

let theme = createMuiTheme();
theme = responsiveFontSizes(theme);

theme.typography.h4 = {
  fontSize: '1.2rem',
  '@media (min-width:600px)': {
    fontSize: '1rem',
  },
  [theme.breakpoints.up('md')]: {
    fontSize: '1rem',
  },
};

function Copyright() {
  return (
    <Typography variant="body2" color="textSecondary" style={{padding: '10px'}} align="center">
      {'Copyright © '}
      <Link color="inherit" href={HOMEPAGE_URL}>
        Registration Form
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

const useStyles = makeStyles((theme) => ({
  appBar: {
    position: 'relative',
  },
  layout: {
    width: 'auto',
    marginLeft: theme.spacing(2),
    marginRight: theme.spacing(2),
    [theme.breakpoints.up(600 + theme.spacing(2) * 2)]: {
      width: 600,
      marginLeft: 'auto',
      marginRight: 'auto',
    },
  },
  paper: {
    marginTop: theme.spacing(3),
    marginBottom: theme.spacing(3),
    padding: theme.spacing(2),
    [theme.breakpoints.up(600 + theme.spacing(3) * 2)]: {
      marginTop: theme.spacing(6),
      marginBottom: theme.spacing(6),
      padding: theme.spacing(3),
    },
  },
  stepper: {
    padding: theme.spacing(2, 0, 2),
    [theme.breakpoints.up(600)]: {
      padding: theme.spacing(3, 0, 5),
    },
  },
  h4: {
    fontSize: '1rem',
    '@media (min-width:600px)': {
      fontSize: '1rem',
    },
    [theme.breakpoints.up('md')]: {
      fontSize: '2rem',
    },
  },
  buttons: {
    display: 'flex',
    justifyContent: 'flex-end',
  },
  button: {
    marginTop: theme.spacing(3),
    marginLeft: theme.spacing(1),
  },
}));

const steps = ['Information', 'Review your order'];

function getStepContent(step, handleClick, handleReviewClick, orderInfo) {
  switch (step) {
    case 0:
      return <AddressForm orderInfo={orderInfo} handleClick={handleClick}/>;
    case 1:
      return <Review orderInfo={orderInfo} handleReviewClick={handleReviewClick} />;
    case 2:
      return <Confirmation />;;
    default:
      throw new Error('Unknown step');
  }
}

export default function Checkout() {
  const classes = useStyles();

  let startPage = TESTING_SKIP_TO_REVIEW ? 1 : 0

  const [activeStep, setActiveStep] = React.useState(startPage); 

  const [orderInfo, setOrderInfo] = React.useState();

  const handleClick = (event) => {
    setOrderInfo(event);
    setActiveStep(activeStep + 1);
  };


  const handleReviewClick = async (billingInfo = {}) => {
    var data = {billingInfo, orderInfo}


    if(TESTING_SKIP_TO_REVIEW){
      let testOrderInfo = {
        "values": {
          "firstName": "Yuxiang",
          "lastName": "Dai",
          "month": "3",
          "day": "13",
          "year": "1997",
          "email": "yuxiang.dai43@gmail.com",
          "gender": "male",
          "cellphone": "111111",
          "homephone": "2222222",
          "address1": "65 Bremner Boulevard",
          "address2": "Suite 3102",
          "city": "Toronto",
          "province": "Ontario",
          "zip": "M5J0A7",
          "country": "CA",
          "oen1": "123",
          "oen2": "456",
          "oen3": "789",
          "grade": "12",
          "under18": "yes",
          "lasths": "Thomas Jefferson",
          "schoolphone": "4444444",
          "schooladdress": "65 Bremner Boulevard\nSuite 3102",
          "agree": [
            "yes"
          ],
          "parent_name": "Parent",
          "parent_relationship": "Parent",
          "parent_email": "parent@gmail.com",
          "parent_phone": "333333"
        },
        "totalPrice": 2740.99,
        "orderedCourses": [
          {
            "checked": true,
            "id": 1,
            "name": "CGC1D - Issues in Canadian Geography",
            "price": 299,
            "grade": "9"
          },
          {
            "checked": true,
            "id": 8,
            "name": "CHC2D - History",
            "price": 299,
            "grade": "10"
          },
          {
            "checked": true,
            "id": 9,
            "name": "CHV20 - Civics",
            "price": 299,
            "grade": "10"
          },
          {
            "checked": true,
            "id": 15,
            "name": "AWQ3M - Introduction to Photography",
            "price": 299,
            "grade": "11"
          },
          {
            "checked": true,
            "id": 16,
            "name": "ENG3C - English College",
            "price": 299,
            "grade": "11"
          },
          {
            "checked": true,
            "id": 17,
            "name": "ENG3U - English Academic",
            "price": 299,
            "grade": "11"
          },
          {
            "checked": true,
            "id": 27,
            "name": "OLC4O - Ontario Secondary School Literacy",
            "price": 299,
            "grade": "12"
          },
          {
            "checked": true,
            "id": 28,
            "name": "HHS4U - Families in Canada",
            "price": 299,
            "grade": "12"
          },
          {
            "checked": true,
            "id": 29,
            "name": "CGR4M - Environment Resource Management",
            "price": 299,
            "grade": "12"
          },
          {
            "checked": true,
            "id": 30,
            "name": "ASM4M - Media Arts",
            "price": 299,
            "grade": "12"
          }
        ],
        "files": [
          {
            "s3FileLink": "",
            "fileName": "dummy.pdf"
          }
        ]
      }

      data = {billingInfo, orderInfo: testOrderInfo}
    }

    // console.log("Combined billing and order info:", data)

    if(!TEST_NO_EMAIL){
      var response = await fetch(LAMBDA_EMAIL_URL, {
            method: 'POST', 
            headers: {
              "Content-Type": "application/JSON"
            },
            body: JSON.stringify(data) 
          }).then((response) => {
            // console.log(response)
            return response.text();
          }).then((data) => {
            // console.log(JSON.parse(data))
          }).catch(err => {
            // console.log(err)
          })
    }

    setActiveStep(activeStep + 1);
  };

  const handleBack = () => {
    setActiveStep(activeStep - 1);
  };

  return (

    <React.Fragment>
      <CssBaseline />

      <main className={classes.layout}>

        <Paper className={classes.paper}>
            <Typography   className={classes.h4} variant="h4" align="center">
              Welcome!
            </Typography>

          <Stepper activeStep={activeStep} className={classes.stepper}>
            {steps.map((label) => (
              <Step key={label}>
                <StepLabel>{label}</StepLabel>
              </Step>
            ))}
          </Stepper>
          <React.Fragment>
              <React.Fragment>
                {getStepContent(activeStep, handleClick, handleReviewClick, orderInfo)}
                <div className={classes.buttons}>
                  {activeStep === 1 && (
                    <Button onClick={handleBack} className={classes.button}>
                      Back
                    </Button>
                  )}
                </div>
              </React.Fragment>
            
          </React.Fragment>
        </Paper>
        <Copyright />

      </main>

    </React.Fragment>

  );
}