import React, { useState } from 'react'
import { useFormik } from 'formik'
import * as yup from 'yup'
import { TextField, Grid, Button, Divider, Typography, Link, Alert, Fade } from '@mui/material'
// import { getCustomers } from '../API';
import { useNavigate } from 'react-router-dom';
import { loginUser } from '../Context/actions';
import { useAuthDispatch } from '../Context/context';

const validationSchema = yup.object({
    email: yup.string().email("Enter a valid email").required("ٖEmail is required."),
    password: yup.string().required("Password is required.")
});

export default function Login() {
    const dispatch = useAuthDispatch();
    const navigate = useNavigate();
    const [error, setError] = useState(false);

    const formik = useFormik({
        initialValues: {
            email: '',
            password: ''
        },
        onSubmit: async (values) => {
            try {
                let response = await loginUser(dispatch, values);
                console.log(response); 
                if (!response){
                    setError(true);
                    setTimeout(() => {
                        setError(false);
                    }, 2000);
                }
                else{
                    navigate("/", { replace: true });
                    setError(false);
                }
            } catch (error) {
                console.log(error)
            }
        },
        validationSchema: validationSchema
    });

    return (
        <div>
            <Grid container style={{ minHeight: '100vh' }} justifyContent="center">
                <Grid container item xs={12} style={{ padding: 10 }} alignItems="center" direction="column" justifyContent="center">
                    <form onSubmit={formik.handleSubmit} style={{ width: '80%' }}>
                        <Grid container item justifyContent={"center"}>
                            <Typography variant='h2'>Login</Typography>
                        </Grid><br />
                        <Grid container item direction="column" justifyContent="center" alignItems="center">
                            
                            <TextField fullWidth id="email" name="email" label="Email" type="email" variant="filled" onBlur={formik.handleBlur} value={formik.values.email} style={{ marginTop: '10px' }} onChange={formik.handleChange} error={formik.touched.email && Boolean(formik.errors.email)} helperText={formik.touched.email && formik.errors.email} />
                            <TextField fullWidth id="password" name="password" type='password' label="Password" onBlur={formik.handleBlur} value={formik.values.password} variant="filled" style={{ marginTop: '10px' }} onChange={formik.handleChange} error={formik.touched.password && Boolean(formik.errors.password)} helperText={formik.touched.password && formik.errors.password} />
                            <Button type='submit' size="large" style={{ marginTop: '10px' }} variant="contained" fullWidth>Submit</Button>
                            <br />
                            <Fade in={error} style={{display: error ? 'flex' : 'none'}}>
                                <Alert severity="error">Invalid Email or Password!</Alert>
                            </Fade><br/><Divider style={{ width: '100%' }} />
                            <br />
                            <Typography variant="subtitle1" display="block" textAlign={'center'}>Don't have an account?<br /><Link href={"/Register"} underline="none">Create an Account</Link></Typography>
                        </Grid>
                    </form>
                </Grid>
            </Grid>
        </div>
    )
}
