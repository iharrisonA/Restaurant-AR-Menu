import { Avatar,Fab, Grid, Paper, Stack, Typography } from '@mui/material';
import React from 'react'
import { Link, useNavigate } from 'react-router-dom';
import { logout } from '../Context/actions';
import { useAuthDispatch, useAuthState } from '../Context/context';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import LogoutIcon from '@mui/icons-material/Logout';

export default function UserProfile() {
    const navigate = useNavigate();
    const dispatch = useAuthDispatch();
    const userDetails = JSON.parse(useAuthState());
    // const userDetails = {"id":1,"username":"Humayun Ahmed","email":"humayyonahmed@gmail.com","password":"123","dOB":"1999-10-02T00:00:00","profilePicture":"humayun1.png","bio":"Nothing to say","dateCreated":"2022-01-01T00:00:00"};
    const handleLogout = () => {
        logout(dispatch);
        navigate('/login', { replace: true });
    }

    return (
        <Grid>
            <img alt="background" src="purpleTop.png" className="purpleTop" />
            <Fab sx={{ ml: 2, mt: 2 }} className="fab" component={Link} to={"/"}><ArrowBackIcon fontSize='medium' /></Fab>
            <Fab sx={{ mt: 2 }} className="fab2" onClick={handleLogout}><LogoutIcon fontSize='medium' /></Fab>

            <Grid container justifyContent={"center"} sx={{ mt: 6 }}>
                <Grid container item direction="column" justifyContent="center" alignItems="center">
                    <Avatar alt={userDetails.id} src={`https://ui-avatars.com/api/?name=${userDetails.username}`} sx={{ width: 150, height: 150 }} style={{
                        border: '5px solid white'
                    }} />
                    <Typography variant="h4" sx={{ mt: 2 }}>{userDetails.username}</Typography>
                    <Typography variant="subtitle1" sx={{ mt: 1 }}>{userDetails.bio}</Typography>
                   
                </Grid>
            <Stack
                    direction="column"
                    justifyContent="center"
                    alignItems="center"
                    spacing={2}
                    marginTop={5}
                    width={"80%"}
                    >
                        <Paper variant="outlined" sx={{p: 2, width: '100%'}}>
                            <Typography variant="h5">Joined Date</Typography>
                            <Typography variant="body1">{new Date(userDetails.dateCreated).toDateString()}</Typography>
                        </Paper>
                        <Paper variant="outlined" sx={{p: 2, width: '100%'}}>
                            <Typography variant="h5">Date of Birth</Typography>
                            <Typography variant="body1">{new Date(userDetails.dOB).toDateString()}</Typography>
                        </Paper>
                        <Paper variant="outlined" sx={{p: 2, width: '100%'}}>
                            <Typography variant="h5">Reviews Posted:</Typography>
                            <Typography variant="body1">78 food reviewed</Typography>
                        </Paper>
                    </Stack>
                
            </Grid>
        </Grid>
    )
}
