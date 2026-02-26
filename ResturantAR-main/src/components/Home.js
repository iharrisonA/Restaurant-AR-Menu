import { BottomNavigation, BottomNavigationAction, Paper } from '@mui/material'
import HomeIcon from "@mui/icons-material/Home";
import { Link } from 'react-router-dom';
import React from 'react'
import { QrCodeScannerRounded, Person } from '@mui/icons-material';
import { useAuthState } from '../Context/context';

export default function Home() {
    const [value, setValue] = React.useState(0);
    const userDetails = JSON.parse(useAuthState());

    return (
        <div>
            <h1 style={{marginLeft: '10px'}}>Hello, {userDetails.username}</h1>
            <Paper
            sx={{ position: "fixed", bottom: 0, left: 0, right: 0 }}
            elevation={3}
        >
            <BottomNavigation
                showLabels
                value={value}
                onChange={(event, newValue) => {
                    setValue(newValue);
                }}
            >
                <BottomNavigationAction label="Home" component={Link} to={"/"} icon={<HomeIcon />} />
                <BottomNavigationAction label="Scan" component={Link} to={"/Scan"} icon={<QrCodeScannerRounded />} />
                <BottomNavigationAction label="Profile"component={Link} to={"/UserProfile"} icon={<Person />}/>
            </BottomNavigation>
        </Paper>
        </div>
    )
}
