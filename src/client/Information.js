import React from 'react';
import CurrencyFormat from 'react-currency-format';
import { Formik, Form } from 'formik';
import * as Yup from 'yup';

import { makeStyles, styled } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import InputLabel from '@material-ui/core/InputLabel';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import UploadButton from './helper/UploadButton';
import Divider from '@material-ui/core/Divider';
import Button from '@material-ui/core/Button';
import FormGroup from '@material-ui/core/FormGroup';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import FormLabel from '@material-ui/core/FormLabel';
import MenuItem from '@material-ui/core/MenuItem';
import ToggleButton from '@material-ui/lab/ToggleButton';
import ToggleButtonGroup from '@material-ui/lab/ToggleButtonGroup';

import './css/Information.css';

const TESTING = false;

const ContainerGrid = styled(Grid)({});
const useStyles = makeStyles((theme) => 
  ({
  formControl: {
    minWidth: 120,
    [theme.breakpoints.down(500)]: {
      minWidth: 90,
    }
  },
  genderFormControl: {
    minWidth: 120,
  },
  smallLabel: {
    fontSize: '16px',
  },
  listItem: {
    padding: theme.spacing(1, 0),
  },
  courseCode: {
    width: '100%',
  },
  nameGrid: {
    [theme.breakpoints.down(500)]: {
      maxWidth: 140,
      maxHeight: 90,
    }
  },
  gradeGrid: {
    [theme.breakpoints.down(500)]: {
      maxWidth: 90,
      maxHeight: 90,
    }
  },
  monthGrid: {
    [theme.breakpoints.down(500)]: {
      maxWidth: 137,
      maxHeight: 90,
    }
  },
  dayGrid: {
    [theme.breakpoints.down(500)]: {
      maxWidth: 85,
      maxHeight: 90,
    }
  },
  yearGrid: {
    [theme.breakpoints.down(500)]: {
      maxWidth: 90,
      maxHeight: 90,
    }
  },
  buttonGrid: {
    [theme.breakpoints.down(500)]: {
      maxHeight: 70,
      paddingTop: 0
    }
  },
  cssLabel: {
    // color:'blue',//required color
    // height: 100
  },
  nameTextField: {
    [theme.breakpoints.down(500)]: {
      width: 110,
    }
  },
  oen: {
    [theme.breakpoints.down('sm')]: {
      width: '55px',
    },
    [theme.breakpoints.up('md')]: {
      width: '100%',
    },
  },
  oenGrid: {
    [theme.breakpoints.down('sm')]: {
      maxWidth: '70px'
    }
  },
  oenDash: {
    [theme.breakpoints.down('sm')]: {
      marginTop: '26px',
      marginLeft: '5px',
    },
  },
  toggleBtn: {
    [theme.breakpoints.down('sm')]: {
      maxWidth: '64px'
    }
  },
  policyText: {
    [theme.breakpoints.down('sm')]: {
      fontSize: '14px'
    },
    fontSize: '1rem'
  }
}));

export default function AddressForm(props) {
  const classes = useStyles();
  
  let initalFormValues = {
    firstName: '',
    lastName: '',
    month: "",
    day: "",
    year: "",
    email: "",
    gender: "",
    cellphone: "",
    homephone: "",
    address1: "",
    address2: "",
    city: "",
    province: "",
    zip: "",
    country: "",
    oen1: "",
    oen2: "",
    oen3: "",
    grade: "",
    under18: "",
    lasths: "",
    schoolphone: "",
    schooladdress: "",
    agree: "",
  }

  if(TESTING){
    initalFormValues = {
      firstName: 'test',
      lastName: 'test',
      month: "12",
      day: "31",
      year: "1997",
      email: "test@gmail.com",
      gender: "Male",
      cellphone: "6477777777",
      homephone: "",
      address1: "123 Test Drive",
      address2: "",
      city: "Toronto",
      province: "Ontario",
      zip: "M5J0N7",
      country: "CA",
      grade: "",
      under18: "no",
      lasths: "Test High School",
      schoolphone: "6477777777",
      schooladdress: "123 High School Way",
      agree: "",
    }
  }

  let products = [
    { checked: false, id: 1, name: 'CGC1D - Issues in Canadian Geography', price: 299.00, grade: "9" },
    { checked: false, id: 2, name: 'ENG1D - English Academic', price: 299.00, grade: "9" },
    { checked: false, id: 3, name: 'ENG1P - English Applied', price: 299.00, grade: "9" },
    { checked: false, id: 4, name: 'MPM1D - Principals of Mathematics', price: 299.00, grade: "9" },
    { checked: false, id: 5, name: 'PPL10 - Healthy Active Living', price: 299.00, grade: "9" },
    { checked: false, id: 6, name: 'SNC1D - Science', price: 299.00, grade: "9" },
    { checked: false, id: 7, name: 'BBI20 - Introduction to Business', price: 299.00, grade: "9" },
    { checked: false, id: 8, name: 'CHC2D - History', price: 299.00, grade: "10" },
    { checked: false, id: 9, name: 'CHV20 - Civics', price: 299.00, grade: "10" },
    { checked: false, id: 10, name: 'ENG2D - English Academic', price: 299.00, grade: "10" },
    { checked: false, id: 11, name: 'ENG2P - English Applied', price: 299.00, grade: "10" },
    { checked: false, id: 12, name: 'GLC20 - Career Studies', price: 299.00, grade: "10" },
    { checked: false, id: 13, name: 'GLS10 - General Learning Strategies', price: 299.00, grade: "10" },
    { checked: false, id: 14, name: 'MPM2D - Math Applied', price: 299.00, grade: "10" },
    { checked: false, id: 15, name: 'AWQ3M - Introduction to Photography', price: 299.00, grade: "11" },
    { checked: false, id: 16, name: 'ENG3C - English College', price: 299.00, grade: "11" },
    { checked: false, id: 17, name: 'ENG3U - English Academic', price: 299.00, grade: "11" },
    { checked: false, id: 18, name: 'ETC3M - Canadian Literature', price: 299.00, grade: "11" },
    { checked: false, id: 19, name: 'HSP3U - Introduction to Anthrpology, Psychology, and Sociology', price: 299.00, grade: "11" },
    { checked: false, id: 20, name: 'ICS3U - Introduction to Computer Science', price: 299.00, grade: "11" },
    { checked: false, id: 21, name: 'MCR3U - Functions', price: 299.00, grade: "11" },
    { checked: false, id: 22, name: 'SBI3U - Biology', price: 299.00, grade: "11" },
    { checked: false, id: 23, name: 'SCH3U - Chemistry', price: 299.00, grade: "11" },
    { checked: false, id: 24, name: 'SPH3U - Physics', price: 299.00, grade: "11" },
    { checked: false, id: 25, name: 'BAF3M - Financial Accounting Fundamentals', price: 299.00, grade: "11" },
    { checked: false, id: 26, name: 'BBB4M - International Business Fundamentals', price: 299.00, grade: "11" },
    { checked: false, id: 27, name: 'OLC4O - Ontario Secondary School Literacy', price: 299.00, grade: "12" },
    { checked: false, id: 28, name: 'HHS4U - Families in Canada', price: 299.00, grade: "12" },
    { checked: false, id: 29, name: 'CGR4M - Environment Resource Management', price: 299.00, grade: "12" },
    { checked: false, id: 30, name: 'ASM4M - Media Arts', price: 299.00, grade: "12" },
    { checked: false, id: 31, name: 'AVI4M - Visual Arts', price: 299.00, grade: "12" },
    { checked: false, id: 32, name: 'AWQ4M - Photography', price: 299.00, grade: "12" },
    { checked: false, id: 33, name: 'BAT4M - Financial Accounting Principles', price: 299.00, grade: "12" },
    { checked: false, id: 34, name: 'BBB4M - International Business', price: 299.00, grade: "12" },
    { checked: false, id: 35, name: 'BOH4M - Business Leadership', price: 299.00, grade: "12" },
    { checked: false, id: 36, name: 'CGW4U - World Issues', price: 299.00, grade: "12" },
    { checked: false, id: 37, name: 'CIA4U - Analyzing Current Economic Issues', price: 299.00, grade: "12" },
    { checked: false, id: 38, name: 'CLN4U - Law', price: 299.00, grade: "12" },
    { checked: false, id: 39, name: 'CPW4U - Canadian and International Politics', price: 299.00, grade: "12" },
    { checked: false, id: 40, name: 'ENG4C - English College', price: 299.00, grade: "12" },
    { checked: false, id: 41, name: 'ENG4U - English Academic', price: 299.00, grade: "12" },
    { checked: false, id: 42, name: 'ETC4U - Literature', price: 299.00, grade: "12" },
    { checked: false, id: 43, name: 'EWC4U - Writers Craft', price: 299.00, grade: "12" },
    { checked: false, id: 44, name: 'HFA4U - Nutrition and Health', price: 299.00, grade: "12" },
    { checked: false, id: 45, name: 'HSB4U - Challenge and Change in Society', price: 299.00, grade: "12" },
    { checked: false, id: 46, name: 'ICS4U - Computer Science', price: 299.00, grade: "12" },
    { checked: false, id: 47, name: 'LKBDU - Mandarin', price: 299.00, grade: "12" },
    { checked: false, id: 48, name: 'MCV4U - Calculus and Vectors', price: 299.00, grade: "12" },
    { checked: false, id: 49, name: 'MDM4U - Data Management', price: 299.00, grade: "12" },
    { checked: false, id: 50, name: 'MHF4U - Advanced Functions', price: 299.00, grade: "12" },
    { checked: false, id: 51, name: 'SBI4U - Biology Academic', price: 299.00, grade: "12" },
    { checked: false, id: 52, name: 'SCH4U - Chemistry Academic', price: 299.00, grade: "12" },
    { checked: false, id: 53, name: 'SPH4U - Physics Academic', price: 299.00, grade: "12" },
  ];


  let initialPrice = 49.99

  let initialFiles = []
  // if, starting from first screen, form submit is successful
  if(props.orderInfo){ 
    // console.log("Loading previous order info");

    initalFormValues = props.orderInfo.values
    props.orderInfo.orderedCourses.forEach(course => {
      let index = products.findIndex(p => p.name === course.name) 
      products[index].checked = course.checked
    })

    // console.log(props.orderInfo.files)
    initialFiles = props.orderInfo.files

    initialPrice = props.orderInfo.totalPrice
  }

  const  [files, setFiles] = React.useState(initialFiles);

  const [courses, setCourses] = React.useState(products);

  const [selectedGrade, setSelectedGrade] = React.useState('9');
  const handleGradeChange = (event, newGrade) => {
    setSelectedGrade(newGrade);   
  };

  const [totalPrice, setTotalPrice] = React.useState(initialPrice);

  const handlePriceChange = () => {
    var numberCheckedCourses = courses.filter(p => p.checked === true)
    let newPrice = Math.max(0, numberCheckedCourses.length) * 299 + 49.99
    setTotalPrice(newPrice);
  };

  const handleCourseChange = (event) => {
    var courseIndex = courses.findIndex(p => p.name === event.target.name)

    let newCourses = [...courses]
    newCourses[courseIndex].checked = event.target.checked

    setCourses([...newCourses])

    handlePriceChange();
  };



  const handleFileChange = (files) => {
    setFiles(files)
    console.log("Files updated", files)

  };

  const phoneRegExp = /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/

  const YearRegExp = /\b(19\d{2}|20([0-1][0-9]|20))$/
  const dayRegExp = /\b(0[1-9]|[1-9]|[12][0-9]|3[01])\b$/


  const SignupSchema = Yup.object().shape({
    firstName: Yup.string().required('Required'),
    lastName: Yup.string().required('Required'),
    month: Yup.string().required('Required'),
    day: Yup.string().matches(dayRegExp, 'Invalid date').required('Required'),
    year: Yup.string().matches(YearRegExp, 'Invalid year').required('Required'),
    email: Yup.string().email().required('Required'),
    gender: Yup.string().required('Required'),
    cellphone: Yup.string().matches(phoneRegExp, 'Phone number is not valid').required('Required'),
    homephone: Yup.string().matches(phoneRegExp, 'Phone number is not valid'),
    address1: Yup.string().required('Required'),
    city: Yup.string().required('Required'),
    province: Yup.string().required('Required'),
    zip: Yup.string().required('Required'),
    country: Yup.string().required('Required'),
    under18: Yup.string().required('Required'),
    lasths: Yup.string().required('Required'),
    oen1: Yup.string().length(3, 'Must be 3 characters'),
    oen2: Yup.string().length(3, 'Must be 3 characters'),
    oen3: Yup.string().length(3, 'Must be 3 characters'),
    schoolphone: Yup.string().matches(phoneRegExp, 'Phone number is not valid').required('Required'),
    schooladdress: Yup.string().required('Required'),
    parent_email: Yup.string().when('under18', {
      is: "yes",
      then: Yup.string()
        .required('Required'),
      otherwise: Yup.string(),
    }),
    parent_name: Yup.string().when('under18', {
      is: "yes",
      then: Yup.string()
        .required('Required'),
      otherwise: Yup.string(),
    }),
    parent_phone: Yup.string().when('under18', {
      is: "yes",
      then: Yup.string()
        .required('Required'),
      otherwise: Yup.string(),
    }),
    parent_relationship: Yup.string().when('under18', {
      is: "yes",
      then: Yup.string()
        .required('Required'),
      otherwise: Yup.string(),
    }),
    // agree: Yup.string().required('Required'),
  });
  
  return (
    <React.Fragment>
      <Typography variant="h5" gutterBottom>
        Student Information
      </Typography>
      <div>
        <Formik
            initialValues={initalFormValues}
            validationSchema={SignupSchema}
            initialTouched={{ 
              firstName: true,
              lastName: true,
              month: true,
              day: true,
              year: true,
              email: true,
              gender: true,
              cellphone: true,
              // homephone: true,
              address1: true,
              // address2: true,
              city: true,
              province: true,
              zip: true,
              country: true,
              // oen: true,
              // grade: true,
              under18: true,
              lasths: true,
              schoolphone: true,
              schooladdress: true,
              parent_email: true,
              parent_name: true,
              parent_phone: true,
              parent_relationship: true,
            }}
           validateOnMount={true}
           validateOnBlur={false}
            onSubmit={values => {
              let orderedCourses = courses.filter(p => p.checked === true)


              
              props.handleClick({
                values,
                totalPrice,
                orderedCourses,
                files
              });

              console.log('Info submit', {
                values,
                totalPrice,
                orderedCourses,
                files
              });

            }}
          >
        {({ values, handleChange,initialErrors, isValidating, isSubmitting, isValid,
            handleBlur, errors, touched }) => (
            <Form>
                <ContainerGrid container spacing={3}>
                  <Grid item xs={12} sm={6} className={classes.nameGrid}>
                    <TextField
                      id="firstName"
                      name="firstName"
                      label="First name"
                      fullWidth
                      autoComplete="given-name"
                      variant="outlined" 
                      onChange={handleChange}
                      InputProps={{
                        className: classes.nameTextField
                      }}
                      InputLabelProps={{
                        // shrink: true,
                        className: classes.cssLabel
                      }}
                      value={values.firstName}
                      error={errors.firstName && touched.firstName}
                      helperText={(errors.firstName && touched.firstName) && errors.firstName}
                      onBlur={handleBlur}
                 
                    />

                  </Grid>
                  <Grid item xs={12} sm={6} className={classes.nameGrid}>
                    <TextField
                      
                      id="lastName"
                      name="lastName"
                      label="Last name"
                      value={values.lastName}
                      error={errors.lastName && touched.lastName}
                      helperText={(errors.lastName && touched.lastName) && errors.lastName}
                      autoComplete="family-name"

                      fullWidth
                      variant="outlined" 
                      onChange={handleChange}
                      onBlur={handleBlur}
                   
                    />

                  </Grid>
                  <Grid item xs={12}>
                    <Typography variant="body1">
                      Date of Birth
                    </Typography>
                  </Grid>
                  <Grid item xs={12} sm={3}   className={classes.monthGrid}>
                  <FormControl variant="outlined" className={classes.formControl}>
                  <InputLabel 

                    >Month</InputLabel>
                    <Select
                      

                      error={errors.month && touched.month}
                      // helperText={(errors.month && touched.month) && errors.month}

                      name="month"
                      label="Month"
                      value={values.month}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      style={{ display: 'block' }}
                      inputProps={{
                        id: 'month-native-required',
                      }}
                    >
                      <MenuItem value="1">January</MenuItem>
                      <MenuItem value="2">February</MenuItem>
                      <MenuItem value="3">March</MenuItem>
                      <MenuItem value="4">April</MenuItem>
                      <MenuItem value="5">May</MenuItem>
                      <MenuItem value="6">June</MenuItem>
                      <MenuItem value="7">July</MenuItem>
                      <MenuItem value="8">August</MenuItem>
                      <MenuItem value="9">September</MenuItem>
                      <MenuItem value="10">October</MenuItem>
                      <MenuItem value="11">November</MenuItem>
                      <MenuItem value="12">December</MenuItem>
                    </Select>

                  </FormControl>
                  </Grid>
                  <Grid item xs={12} sm={2}  className={classes.dayGrid}>
                    <TextField
                      id="day"
                      name="day"
                      label="Day"
                      value={values.day}
                      error={errors.day && touched.day}
                      helperText={(errors.day && touched.day) && errors.day}
                      autoComplete="bday-day"
                      
                      fullWidth
                      variant="outlined" 
                      onChange={handleChange}
                      onBlur={handleBlur}
                    />

                  </Grid>
                  <Grid item xs={12} sm={3}  className={classes.yearGrid}>
                    <TextField
                      id="year"
                      name="year"
                      label="Year"
                      value={values.year}
                      error={errors.year && touched.year}
                      
                      helperText={(errors.year && touched.year) && errors.year}
                      autoComplete="bday-year"
                      
                      fullWidth
                      variant="outlined" 
                      onChange={handleChange}
                      onBlur={handleBlur}
                    />
                  </Grid>
                  <Grid item xs={12} >
                  <FormControl variant="outlined" className={classes.genderFormControl}>
                    <InputLabel 

                      >Gender</InputLabel>
                      <Select
                        error={errors.gender && touched.gender}
                        // helperText={(errors.gender && touched.gender) && errors.gender}
                        name="gender"
                        label="gender"
                        value={values.gender}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        
                        style={{ display: 'block' }}
                        inputProps={{
                          id: 'gender-native-required',
                        }}
                      >
                        <MenuItem value="Male">Male</MenuItem>
                        <MenuItem value="Female">Female</MenuItem>
                        <MenuItem value="Undisclosed">Undisclosed</MenuItem>
                      </Select>

                    </FormControl>
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
                      autoComplete="info email"
                      onChange={handleChange}
                      onBlur={handleBlur}
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}  className={classes.nameGrid}>
                    <TextField                    
                      id="cellphone"
                      name="cellphone"
                      label="Cell #"
                      value={values.cellphone}
                      error={errors.cellphone && touched.cellphone}
                      helperText={(errors.cellphone && touched.cellphone) && errors.cellphone}
                      
                      variant="outlined"
                      fullWidth
                      autoComplete="info tel"
                      onChange={handleChange}
                      onBlur={handleBlur}
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}  className={classes.nameGrid}>
                    <TextField
                      id="homephone"
                      name="homephone"
                      label="Home #"
                      value={values.homephone}
                      error={errors.homephone && touched.homephone}
                      helperText={(errors.homephone && touched.homephone) && errors.homephone}

                      variant="outlined"
                      fullWidth
                      autoComplete="info tel"
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
                      autoComplete="info address-line1"
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
                      autoComplete="info address-line2"
                      onChange={handleChange}
                      onBlur={handleBlur}
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}  className={classes.nameGrid}>
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
                      autoComplete="info address-level2"
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}  className={classes.nameGrid}>
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
                        />
                  </Grid>
                  <Grid item xs={12} sm={6}  className={classes.nameGrid}>
                    <TextField                          
                      id="zip"
                      name="zip"
                      label="Zip / postal code"
                      value={values.zip}
                      error={errors.zip && touched.zip}
                      helperText={(errors.zip && touched.zip) && errors.zip}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      variant="outlined"
                      fullWidth
                      autoComplete="info postal-code"
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}  className={classes.nameGrid}>
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
                      autoComplete="info country"
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <Typography variant="body1">
                      Ontario Education Number (OEN)
                    </Typography>
                  </Grid>



                  <Grid item xs={12} sm={2} className={classes.oenGrid}> 
                    <TextField                          
                      id="oen1"
                      name="oen1"
                      variant="outlined"
                      value={values.oen1}
                      error={errors.oen1 && touched.oen1}
                      helperText={(errors.oen1 && touched.oen1) && errors.oen1}
                      label=""
                      placeholder="123"
                      className={classes.oen}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      fullWidth
                    />
                  </Grid>
                  <Typography component={'span'} className={classes.oenDash}
                    style={{ fontWeight: "700", marginTop: '25px' }}>-</Typography>
                  <Grid item xs={12} sm={2} className={classes.oenGrid}>
                    <TextField                          
                      id="oen2"
                      name="oen2"
                      variant="outlined"
                      value={values.oen2}
                      error={errors.oen2 && touched.oen1}
                      placeholder="456"
                      className={classes.oen}

                      helperText={(errors.oen2 && touched.oen2) && errors.oen2}
                      label=""
                      onChange={handleChange}
                      onBlur={handleBlur}
                      fullWidth
                    />
                  </Grid>
                  <Typography component={'span'} 
                  
                  className={classes.oenDash}
                  style={{ fontWeight: "700", marginTop: '25px' }}>-</Typography>
                  <Grid item xs={12} sm={2} className={classes.oenGrid}>
                    <TextField                          
                      id="oen3"
                      name="oen3"
                      variant="outlined"
                      value={values.oen3}
                      error={errors.oen3 && touched.oen1}
                      helperText={(errors.oen3 && touched.oen3) && errors.oen3}
                      placeholder="789"
                      className={classes.oen}

                      label=""
                      onChange={handleChange}
                      onBlur={handleBlur}
                      fullWidth
                    />
                  </Grid>



                  <Grid item xs={12} sm={4}  className={classes.gradeGrid}>
                    <TextField                          
                      id="grade"
                      name="grade"
                      label="Current grade"
                      value={values.grade}
                      error={errors.grade && touched.grade}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      helperText={(errors.grade && touched.grade) && errors.grade}
                      InputProps={{
                        classes: {
                          input: classes.smallLabel,
                        },
                      }}
                      InputLabelProps={{
                        classes: {
                          root: classes.smallLabel,
                          focused: classes.smallLabel
                        },
                        shrink: true
                      }}
                      variant="outlined"
                      fullWidth
                    />
                  </Grid>
                  <Grid item xs={12} >
                    <Typography variant="h6" inline="true">
                      Attach any supporting documents
                    </Typography>
                    <Typography variant="body1" inline="true">
                      Transcripts, for example
                    </Typography>
                      </Grid>
                      <Grid item xs={12} sm={4} className={classes.buttonGrid}>
                        <UploadButton handleFileChange={handleFileChange} files={files}/>
                      </Grid>
                      <Grid item xs={12}>
                      <FormControl variant="outlined" className={classes.formControl}>
                      <FormLabel className="under18_legend" component="legend">Are you under 18?</FormLabel>

                
                        <Select
                          error={errors.under18 && touched.under18}
                          // helperText={(errors.under18 && touched.under18) && errors.under18}
                          name="under18"
                          value={values.under18}
                          onChange={handleChange}
                          onBlur={handleBlur}
                          style={{ display: 'block' }}
                          inputProps={{
                            id: 'under18-native-required',
                          }}
                        >
                          <MenuItem value="yes">Yes</MenuItem>
                          <MenuItem value="no">No</MenuItem>
                        </Select>
                        

                      </FormControl>
                  </Grid>  
                  { values.under18 === "yes" &&
                  <>
                  <Grid item xs={12} ><Typography variant="h6" inline="true"> Parent / legal guardian information</Typography>
</Grid>

                        <Grid item xs={12} sm={6}>
                        <TextField                      
                          id="parent_name"
                          name="parent_name"
                          label="Name"
                          value={values.parent_name}
                          error={errors.parent_name && touched.parent_name}
                          helperText={(errors.parent_name && touched.parent_name) && errors.parent_name}
                          variant="outlined"
                          onChange={handleChange}
                          onBlur={handleBlur}
                          fullWidth
                        />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                          <TextField                      
                          id="parent_relationship"
                          name="parent_relationship"
                          label="Relationship to student"
                          value={values.parent_relationship}
                          error={errors.parent_relationship && touched.parent_relationship}
                          helperText={(errors.parent_relationship && touched.parent_relationship) && errors.parent_relationship}
                          variant="outlined"
                          onChange={handleChange}
                          onBlur={handleBlur}
                          fullWidth
                        />
                        </Grid>
                         <Grid item xs={12} sm={6}>
                         <TextField                      
                         id="parent_email"
                         name="parent_email"
                         label="Email address"
                         value={values.parent_email}
                         error={errors.parent_email && touched.parent_email}
                         helperText={(errors.parent_email && touched.parent_email) && errors.parent_email}
                         variant="outlined"
                         onChange={handleChange}
                         onBlur={handleBlur}
                         fullWidth
                       />
                       </Grid>
                        <Grid item xs={12} sm={6}>
                        <TextField                      
                        id="parent_phone"
                        name="parent_phone"
                        label="Phone #"
                        value={values.parent_phone}
                        error={errors.parent_phone && touched.parent_phone}
                        helperText={(errors.parent_phone && touched.parent_phone) && errors.parent_phone}
                        variant="outlined"
                        onChange={handleChange}
                        onBlur={handleBlur}
                        fullWidth
                      />
                      </Grid>
                      </>
                        }
                   <Divider />
                  

                      <Grid item xs={12} >
                        <Typography variant="h6" inline="true">
                        School Information       </Typography>
                      </Grid>

                      <Grid item xs={12} sm={6}>
                        <TextField                      
                          id="lasths"
                          name="lasths"
                          label="Last attended high school"
                          value={values.lasths}
                          error={errors.lasths && touched.lasths}
                          helperText={(errors.lasths && touched.lasths) && errors.lasths}
                          variant="outlined"
                          onChange={handleChange}
                          onBlur={handleBlur}
                          fullWidth
                        />

                      </Grid>
                      <Grid item xs={12} sm={6}>
                        <TextField
                          id="schoolphone"
                          name="schoolphone"
                          value={values.schoolphone}
                          error={errors.schoolphone && touched.schoolphone}
                          helperText={(errors.schoolphone && touched.schoolphone) && errors.schoolphone}

                          onChange={handleChange}
                          onBlur={handleBlur}
                          variant="outlined"
                          autoComplete="school-tel"

                          label="School phone #"
                          fullWidth
                        />

                      </Grid>
                      <Grid item xs={12} sm={12}>
                        <TextField
                          id="schooladdress"
                          name="schooladdress"
                          value={values.schooladdress}
                          error={errors.schooladdress && touched.schooladdress}
                          helperText={(errors.schooladdress && touched.schooladdress) && errors.schooladdress}
                          autoComplete="school-street-address"

                          variant="outlined"
                          onChange={handleChange}
                          onBlur={handleBlur}
                          label="School address"
                          rows={3}
                          multiline
                          fullWidth
                        />

                      </Grid>

                    <Divider  />

              <Grid item xs={12}>
                <Typography variant="h6" >
                  Course selection
                </Typography>
                <Typography variant="body1" >
                  Choose the courses you wish to enroll in.
              </Typography>
              </Grid>

              <Grid item xs={12}>
                <Typography variant="h6" >
                Total: <CurrencyFormat value={totalPrice} displayType={'text'} decimalScale={2} thousandSeparator={true} prefix={' $'} />
                </Typography>
                <Typography variant="body1" >
                * Please note, there is a CA$49.99 enrollment fee
              </Typography>
              <Typography variant="body1" inline="true">
              <Typography component={'span'} style={{ fontWeight: "700" }} display={'inline'}>** PROMOTION:</Typography> all courses 50% off!
              </Typography>
              </Grid>


              <Grid item >
              <ToggleButtonGroup
                value={selectedGrade}
                exclusive
                onChange={handleGradeChange}
                aria-label="text alignment"
                className={classes.toggleGroup}
              >
                <ToggleButton value="9" aria-label="left aligned" className={classes.toggleBtn}
>
                Grade 9          </ToggleButton>
                <ToggleButton value="10" aria-label="centered" className={classes.toggleBtn}>
                Grade 10          </ToggleButton>
                <ToggleButton value="11" aria-label="right aligned" className={classes.toggleBtn}>
                Grade 11         </ToggleButton>
                <ToggleButton value="12" aria-label="justified" className={classes.toggleBtn}>
                Grade 12          </ToggleButton>
              </ToggleButtonGroup>
              </Grid>


              <Grid item xs={12}>  
              <FormControl component="fieldset" className={classes.courseCode} >
                <FormGroup>
                {

                  courses.filter(p => p.grade === selectedGrade).map((product) => 
                (
                <FormControlLabel
                key={product.id}
                control={<Checkbox checked={product.checked} onChange={handleCourseChange} name={product.name} />}
                classes={{ label: classes.courseCode }}
                label={
                  <ListItem disableGutters>
                    <ListItemText primary={product.name}   />
                <Typography variant="body2">${product.price}</Typography>
                  </ListItem>
                }
              />
              ))}
                </FormGroup>
              </FormControl>
              </Grid>
              <Divider  />

                <Grid item xs={12}>
                  <Typography variant="h6" >
                    Refund policy
                  </Typography>
                      <Typography variant="body1" className={classes.policyText}>
                        If a student/guardian/parent decides to withdraw after he or she has registered and paid for the all-online program, a refund can be issued under the following conditions:
                  </Typography>
                  <Typography variant="body1" className={classes.policyText} >
                  <Typography component={'span'} style={{ fontWeight: "700" }} className={classes.policyText} display={'inline'}>a.</Typography> A refund request must be submitted within 48 business hours of payment.         
                  </Typography>
                  <Typography variant="body1" className={classes.policyText}>
                  <Typography component={'span'} style={{ fontWeight: "700" }} className={classes.policyText} display={'inline'}>b.</Typography> Student has yet to gain access to course materials or the student portal. If a refund request does not meet any of these conditions, no refund will be issued.
                  </Typography>
                  <Typography variant="body1" className={classes.policyText}>
                  <Typography component={'span'} style={{ fontWeight: "700" }} className={classes.policyText} display={'inline'}>c.</Typography> All enrollment fees are non-refundable.
                  </Typography>
                </Grid>
                <Grid item xs={12}>
                  <FormControlLabel
                    control={<Checkbox 
                      required
                    color="secondary" 
                    id="agree"
                    name="agree" 
                    value="yes" 
                    // error={errors.agree}
                    onChange={handleChange}

                    // helperText={(errors.agree && touched.agree) && errors.agree}
                    />}
                    label="I agree to the refund policy and I understand that a representative will contact me after my application"
                  />
                </Grid>
              </ContainerGrid>
              <Button type="submit"
                   variant="contained"
                   color="primary"
                  //  disabled={isSubmitting}
              style={{ marginTop: '20px' }}
              >Submit</Button>
              <Typography className="please_validate" variant="body1" >

              {Object.keys(errors).length === 0 ? "" : "Please validate inputs"}

              </Typography>

              </Form>
          )}
        </Formik>
      </div>
    </React.Fragment>
  );
}


     
        

             

           






