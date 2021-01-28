
import React, {useState} from 'react';
import {
  Formik, Form
} from 'formik';
import * as Yup from 'yup';
import {CardNumberElement, CardExpiryElement, CardCvcElement, useElements, useStripe} from '@stripe/react-stripe-js';
import { makeStyles, styled } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';

import './css/CreditCardPayment.css';

const TESTING = false;
const STRIPE_INTENT_API_URL = '' // https://asdfasdf.execute-api.us-east-1.amazonaws.com/dev/stripeIntent

// Styles
const ContainerGrid = styled(Grid)({});
const CardGrid = styled(Grid)({
  border: '1px',

  borderStyle: 'none',
  backgroundColor: '#fff',
  margin: '0 15px 20px',

  borderRadius: '4px',
});
const CardExpiryGrid = styled(Grid)({
  border: '1px',
  margin: '0 15px 20px',

  borderStyle: 'none',
  backgroundColor: '#fff',

  borderRadius: '4px',
});

const CardCvcGrid = styled(Grid)({
  border: '1px',
  margin: '0 15px 20px',

  borderStyle: 'none',
  backgroundColor: '#fff',

  borderRadius: '4px',
});

const useStyles = makeStyles((theme) => ({
  halfGrid: {
    [theme.breakpoints.down(500)]: {
      maxWidth: 140,
      maxHeight: 90,
    }
  },
}));

export default function CreditCardPayment(props) {

  const classes = useStyles();


  const SignupSchema = Yup.object().shape({
      name: Yup.string().required('Required'),
      email: Yup.string().required('Required'),
      address1: Yup.string().required('Required'),
      city: Yup.string().required('Required'),
      province: Yup.string().required('Required'),
      zip: Yup.string().required('Required'),
      country: Yup.string().required('Required'),
  })

  const [cardReady, setCardReady] = useState(false);
  const [inProgress, setInProgress] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const stripe = useStripe();
  const elements = useElements()

  const handleSubmit = async (billing_info) => {
    // Block native form submission.

    setInProgress(true);

    if (!stripe || !elements) {
      // Stripe.js has not loaded yet. Make sure to disable
      // form submission until Stripe.js has loaded.
      return;
    }

    // Get a reference to a mounted CardElement. Elements knows how
    // to find your CardElement because there can only ever be one of
    // each type of element.
    // const cardElement = elements.getElement(CardElement);
    const cardNumberElement = elements.getElement(CardNumberElement);
    // var cardNumberElement = elements.create('cardNumber');


    // Use your card Element with other Stripe.js APIs
    await stripe.createPaymentMethod({
      type: 'card',
      card: cardNumberElement,
      billing_details: {
        name: billing_info.name,
        email: billing_info.email,
        address: {
          line1: billing_info.address1,
          line2: billing_info.address2,
          city: billing_info.city,
          country: billing_info.country,
          postal_code: billing_info.zip,
          state: billing_info.province,
        }
      },
    }).then(async (result) => {

        // console.log(result)
        let pymt = result.paymentMethod
        if (result.error) {
          // Show error to your customer (e.g., insufficient funds)
            setErrorMessage(result.error.message)
            console.log(result.error.message);
            throw new Error("Error")
         } 
        const fetchRetry = () => {
          return new Promise((resolve,reject) => {
            return fetch(STRIPE_INTENT_API_URL, {
              method: 'POST', 
              headers: {
                "Content-Type": "application/JSON"
              },
              body: JSON.stringify(data) 
            }).then(function(response) {
              setInProgress(false)
              return response.json();
            }).then(async (responseJson) => {

              var clientSecret = responseJson.client_secret;
        
              if(clientSecret) {
                const result = await stripe.confirmCardPayment(clientSecret,  {
                  payment_method: pymt.id,
                });
                if (result.error) {
                // Show error to your customer (e.g., insufficient funds)
                  setErrorMessage(result.error.message)

                  console.log(result.error.message);
                } else {
                  // The payment has been processed!
                  if (result.paymentIntent.status === 'succeeded') {
                    console.log("Successful payment Attempt #2")

                    props.handleReviewClick(billing_info)
          
                  }
                }
              }      
            }).catch(async (error) => {
              setInProgress(false)
        
              console.log(error)
              // fetchRetry()
            })
          })
        };

        const data = {
          amount: (props.totalPrice * 100),
          payment_method: pymt.id
        };
  
        await fetch(STRIPE_INTENT_API_URL, {
          method: 'POST', 
          headers: {
            "Content-Type": "application/JSON"
          },
          body: JSON.stringify(data) 
        }).then(async (response) => {
        
          if(response.status === 400) {
            console.log("Error on first attempt of Credit Card")
            setTimeout( fetchRetry, 5000)
            return;
          } else {
            setInProgress(false)
    
            return response.json();
          }
        }).then( async responseJson => {
          var clientSecret = responseJson.client_secret;
    
          if(clientSecret) {
            const result = await stripe.confirmCardPayment(clientSecret,  {
              payment_method: pymt.id,
            });
            if (result.error) {
            // Show error to your customer (e.g., insufficient funds)
              setErrorMessage(result.error.message)
              console.log(result.error.message);
            } else {
              // The payment has been processed!
              if (result.paymentIntent.status === 'succeeded') {
                console.log("Successful payment")
                props.handleReviewClick(billing_info)
      
              }
            }
          }   
        }).catch(async (error) => {
          setInProgress(false)
    
          console.log(error)
          // fetchRetry()
        })
    }).catch(async (error) => {
      setInProgress(false)

      console.log(error)
      // fetchRetry()
    });
  }

  let initialValues = {
    name: '',
    email: "",
    address1: "",
    address2: "",
    city: "",
    province: "",
    zip: "",
    country: "",
  }

  if(TESTING){
    initialValues = {
      name: 'Test User',
      email: "test@gmail.com",
      address1: "123 Test Way",
      address2: "",
      city: "Toronto",
      province: "ON",
      zip: "M5J1A3",
      country: "CA",
    }
  }

  return (
    <React.Fragment>
      <Typography variant="h6" gutterBottom>
        Billing Information
      </Typography>
      <div>
        <Formik
            initialValues={initialValues}
            validationSchema={SignupSchema}
            initialTouched={{ 
              name: true,
              email: true,
              address1: true,
              address2: true,
              city: true,
              province: true,
              zip: true,
              country: true,
            }}
           validateOnMount={true}
            onSubmit={values => {
              //TODO: uncommecnt when ready
              // props.handleBillingClick({
              //   values
              // });
              handleSubmit(values);
            }}
          >
        {({ values, handleChange,initialErrors, isValidating, isSubmitting, isValid,
            handleBlur, errors, touched }) => (
            <Form>
                <ContainerGrid container spacing={3}>
                  <Grid item xs={12}>
                    <TextField
                      
                      id="name"
                      name="name"
                      label="Full name"
                      fullWidth
                      autoComplete="billing name"
                      variant="outlined" 
                      onChange={handleChange}

                      value={values.name}
                      error={errors.name && touched.name}
                      helperText={(errors.name && touched.name) && errors.name}
                      onBlur={handleBlur}
                  
                    />

                  </Grid>

                  <Grid item xs={12}>
                    <TextField                    
                      id="email"
                      name="email"
                      label="Email"
                      value={values.email}
                      error={errors.email && touched.email}
                      helperText={(errors.email && touched.email) && errors.email}
                      
                      variant="outlined"
                      fullWidth
                      autoComplete="billing email"
                      onChange={handleChange}
                      onBlur={handleBlur}
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <TextField                    
                      id="address1"
                      name="address1"
                      label="Address line 1"
                      value={values.address1}
                      error={errors.address1 && touched.address1}
                      helperText={(errors.address1 && touched.address1) && errors.address1}

                      variant="outlined"
                      fullWidth
                      autoComplete="billing address-line1"
                      onChange={handleChange}
                      onBlur={handleBlur}
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      id="address2"
                      name="address2"
                      label="Address line 2"
                      value={values.address2}
                      error={errors.address2 && touched.address2}
                      helperText={(errors.address2 && touched.address2) && errors.address2}

                      variant="outlined"
                      fullWidth
                      autoComplete="billing address-line2"
                      onChange={handleChange}
                      onBlur={handleBlur}
                    />
                  </Grid>
                  <Grid item xs={12} sm={6} className={classes.halfGrid}>
                    <TextField                          
                      id="city"
                      name="city"
                      label="City"
                      value={values.city}
                      error={errors.city && touched.city}
                      helperText={(errors.city && touched.city) && errors.city}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      variant="outlined"
                      fullWidth
                      autoComplete="billing address-level2"
                    />
                  </Grid>
                  <Grid item xs={12} sm={6} className={classes.halfGrid}>
                    <TextField 
                        id="province"
                        name="province" 
                        label="Province" 
                        variant="outlined" 
                        fullWidth  
                        value={values.province}
                        error={errors.province && touched.province}
                        helperText={(errors.province && touched.province) && errors.province}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        autoComplete="billing address-level1" 
                        />
                  </Grid>
                  <Grid item xs={12} sm={6} className={classes.halfGrid}>
                    <TextField                          
                      id="zip"
                      name="zip"
                      label="Zip / Postal code"
                      value={values.zip}
                      error={errors.zip && touched.zip}
                      helperText={(errors.zip && touched.zip) && errors.zip}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      variant="outlined"
                      fullWidth
                      autoComplete="billing postal-code"
                    />
                  </Grid>
                  <Grid item xs={12} sm={6} className={classes.halfGrid}>
                    <TextField                          
                      id="country"
                      name="country"
                      label="Country"
                      variant="outlined"
                      value={values.country}
                      error={errors.country && touched.country}
                      helperText={(errors.country && touched.country) && errors.country}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      fullWidth
                      autoComplete="billing country"
                    />
                  </Grid>
                  <Grid classes={{
                     root: 'helperText-MuiGrid'
                   }} container>
                  Card Number { TESTING ? "4242424242424242" : ""}
                  </Grid>
                  <CardGrid
                   className="cardNum"
                  item xs={12} sm={8}>
                   
                    <CardNumberElement
                    options={{
                      style: {
                        base: {
                          fontSize: '16px',
                          color: '#424770',
                          '::placeholder': {
                            color: '#aab7c4',
                          },
                        },
                        invalid: {
                          color: '#9e2146',
                        },
                      },
                    }}

                    onChange={(event) => {
                      if (event.complete) {
                        setCardReady(true)
                      } else if (event.error) {
                        setCardReady(false)
                      }
                    }}
                  />
                    
                  </CardGrid>
                  <Grid container
                   classes={{
                     root: 'helperText-MuiGrid'
                   }}
                  >
                  Expiry Date (MMYY)
                  </Grid>
                  

                  <CardExpiryGrid item className="cardNum"  xs={12} sm={3}>
                    <CardExpiryElement
                      options={{
                        style: {
                          base: {
                            fontSize: '16px',
                            color: '#424770',
                            '::placeholder': {
                              color: '#aab7c4',
                            },
                          },
                          invalid: {
                            color: '#9e2146',
                          },
                        },
                      }}
                      onChange={(event) => {
                        if (event.complete) {
                          setCardReady(true)
                        } else if (event.error) {
                          setCardReady(false)
                        }
                      }}
                    />
                  </CardExpiryGrid>
                  <Grid classes={{
                     root: 'helperText-MuiGrid'
                   }} container>
                  CVC
                  </Grid>
                  <CardCvcGrid  className="cardNum" item xs={12} sm={3}>
                    <CardCvcElement
                      options={{
                        style: {
                          base: {
                            fontSize: '16px',
                            color: '#424770',
                            '::placeholder': {
                              color: '#aab7c4',
                            },
                          },
                          invalid: {
                            color: '#9e2146',
                          },
                        },
                      }}
                      onChange={(event) => {
                        if (event.complete) {
                          setCardReady(true)
                        } else if (event.error) {
                          setCardReady(false)
                        }
                      }}
                    />
                  </CardCvcGrid>
                  </ContainerGrid>

              
                <Typography className="please_validate" variant="body1" >

                {Object.keys(errors).length === 0 ? "" : "Please validate inputs"}
                {errorMessage}
                </Typography>
                <Grid container justify="center">
                    <Button type="submit"
                      variant="contained"
                      color="primary"
                      disabled={!stripe || !cardReady || inProgress}

                      style={{ marginTop: '20px' }}
                      >Pay</Button>
                 
                </Grid>
             </Form>
          )}
        </Formik>
      </div>
    </React.Fragment>
 )}