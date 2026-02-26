import React, { useState } from 'react'
import {useFormik} from 'formik'
import * as yup from 'yup'
import {TextField, Grid, Button, Divider, Typography, Link, Alert, Fade } from '@mui/material'
import {getCustomers, SaveCustomer} from '../API';
import { useNavigate } from 'react-router-dom';

const validationSchema = yup.object({
    username: yup.string().required("ٖFullname is required."),
    email: yup.string().email("Enter a valid email").required("ٖEmail is required.")
    .test('Unique Email', 'Email already in use', 
    function(value){
        return new Promise((resolve, reject) => {
            getCustomers().then(cust=>{
                cust.forEach((item) => {
                    if(item.email===value){
                        resolve(false);
                    }
                    else{
                        resolve(true);
                    }
                });
            });
        });
    }),
    password: yup.string().required("Password is required."),
    changepassword: yup.string().when("password", {
        is: val => (val && val.length > 0 ? true : false),
        then: yup.string().oneOf(
          [yup.ref("password")],
          "Both password must be same"
        )
      })
});

export default function Register() {
    const navigate = useNavigate();
    const [error, setError] = useState(false);

    const formik = useFormik({
        initialValues: {
            username: '',
            email: '',
            password: '',
            changepassword: ''
        },
        onSubmit: (values)=>{
            var obj = {
                'username': values.username,
                'email': values.email,
                'password': values.password,
                'dateCreated': new Date().toLocaleDateString('en-GB')
            };
            SaveCustomer(obj)
            .then(res=>{
                navigate("../", {replace: true});
                setError(false);
            })
            .catch(err=>{
                console.log(err);
                setError(true);
            });
        },  
        validationSchema: validationSchema
    });

    return (
        <div>
          <Grid container style={{ minHeight: '100vh'}} justifyContent="center">
                <Grid container item xs={12} style={{ padding: 10 }} alignItems="center" direction="column" justifyContent="center">
                    <form onSubmit={formik.handleSubmit} style={{width: '80%'}}>
                        <Grid container item justifyContent={"center"}>
                            <Typography variant='h2'>Register</Typography> 
                        </Grid><br/>
                        <Grid container item direction="column" justifyContent="center" alignItems="center">
                            <Fade in={error}>
                            <Alert severity="error">Invalid Username or Password!</Alert>
                            </Fade>
                            <TextField fullWidth id="username" name="username" label="Full Name" variant="filled" value={formik.values.username} onChange={formik.handleChange} onBlur={formik.handleBlur} error={formik.touched.username && Boolean(formik.errors.username)} helperText={formik.touched.username && formik.errors.username}/>
                            <TextField fullWidth id="email" name="email" label="Email" type="email" variant="filled" value={formik.values.email} style={{marginTop: '10px'}} onChange={formik.handleChange} onBlur={formik.handleBlur} error={formik.touched.email && Boolean(formik.errors.email)} helperText={formik.touched.email && formik.errors.email}/>
                            <TextField fullWidth id="password" name="password" type='password' label="Password" value={formik.values.password} variant="filled" style={{marginTop: '10px'}} onChange={formik.handleChange} onBlur={formik.handleBlur} error={formik.touched.password && Boolean(formik.errors.password)} helperText={formik.touched.password && formik.errors.password}/>
                            <TextField fullWidth id="changepassword" name="changepassword" type='password' label="Confirm Password" value={formik.values.changepassword} variant="filled" style={{marginTop: '10px'}} onBlur={formik.handleBlur} onChange={formik.handleChange} error={formik.touched.changepassword && Boolean(formik.errors.changepassword)} helperText={formik.touched.changepassword && formik.errors.changepassword}/>
                            <Button type='submit' size="large" style={{marginTop: '10px' }} variant="contained" fullWidth>Sign up</Button>
                            <br/><Divider style={{width:'100%'}}/>
                            <br/>
                            <Typography variant="subtitle1" display="block" textAlign={'center'}>Already have an account?<br/><Link href={"/Login"} underline="none">Log in</Link></Typography>
                        </Grid>
                    </form>
                </Grid>
            </Grid>
        </div>
    )
}
