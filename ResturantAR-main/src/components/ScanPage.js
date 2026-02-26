import * as React from 'react';
import { Global } from '@emotion/react';
import { styled } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import { amber, grey } from '@mui/material/colors';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import SwipeableDrawer from '@mui/material/SwipeableDrawer';
import { Button, Chip, Fab, Stack } from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import QrReader from "react-qr-reader";
import { Link } from 'react-router-dom';
import { getItems } from './../API';
import InfoRoundedIcon from '@mui/icons-material/InfoRounded';
import ChatIcon from '@mui/icons-material/Chat';
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';

const drawerBleeding = 103;

const Root = styled('div')(({ theme }) => ({
  height: '100%',
  backgroundColor:
    theme.palette.mode === 'light' ? grey[100] : theme.palette.background.default,
}));

const StyledBox = styled(Box)(({ theme }) => ({
  backgroundColor: theme.palette.mode === 'light' ? '#fff' : grey[800],
}));

const Puller = styled(Box)(({ theme }) => ({
  width: 30,
  height: 6,
  backgroundColor: theme.palette.mode === 'light' ? grey[300] : grey[900],
  borderRadius: 3,
  position: 'absolute',
  top: 8,
  left: 'calc(50% - 15px)',
}));

export default function ScanPage(props) {
  const { window } = props;
  const [result, setResult] = React.useState(null);
  const [item, setItem] = React.useState({});
  const [open, setOpen] = React.useState(false);
  const [disable, setdisable] = React.useState(true);
    // {itemName: "Biryani", itemPrice: 120, rating: 4.5};

  const toggleDrawer = (newOpen) => () => {
    setOpen(newOpen);
  };
  const handleScan = async (data) => {
    if (data) {
      setResult(data);
      let items = await getItems();
      items.forEach(ele => {
        if (ele.modelURL === data) {
          setItem(ele);
          setdisable(false);
        }
      });
    }
  };
  const handleError = (err) => {
    console.error(err);
  };
  // This is used only for the example
  const container = window !== undefined ? () => window().document.body : undefined;

  return (
    <>
      <Root>
        <CssBaseline />
        <Global
          styles={{
            '.MuiDrawer-root > .MuiPaper-root': {
              height: `calc(40% - ${drawerBleeding}px)`,
              overflow: 'visible',
            },
          }}
        />
        <Box className='qrBox'>
          {result ? (
            <iframe
              title={`${result}`}
              src={`${result}`}
              width={'100%'}
              height={'100%'}
              allow="camera; accelerometer; vr">
              Your browser does not support embedded content{" "}
            </iframe>
          ) : (
            <QrReader
              delay={200}
              onError={handleError}
              onScan={handleScan}
              style={{ width: "100%", height: "100%" }}
            />)
          }
        </Box>
        {/* <Box sx={{ textAlign: 'left', pt: 1, pl: 2}}>
        <IconButton component={Link} to={"/"} color='default' size='large'><ArrowBackIcon fontSize='large'/></IconButton>
        { <Button onClick={toggleDrawer(true)} size='large'>Open</Button> }
      </Box> */}
        <SwipeableDrawer
          container={container}
          anchor="bottom"
          open={open}
          onClose={toggleDrawer(false)}
          onOpen={toggleDrawer(true)}
          swipeAreaWidth={drawerBleeding}
          disableSwipeToOpen={disable}
          ModalProps={{
            keepMounted: true,
          }}
        >
          <StyledBox
            sx={{
              position: 'absolute',
              top: -drawerBleeding,
              borderTopLeftRadius: 8,
              borderTopRightRadius: 8,
              visibility: 'visible',
              right: 0,
              left: 0,
            }}
          >
            <Puller />
            {item.itemName!==undefined ? (
              <>
            <Stack direction="row" spacing={2} padding={2}>
              <Typography sx={{ mt: .4, color: 'text.secondary', fontWeight: "bold" }} fontSize={"large"}>{item.itemName}</Typography>
              {/* <Chip sx={{  }} icon={<StarIcon sx={{color: amber[500]}}/>} label={item.rating} /> */}
              <Chip sx={{  }} icon={<AttachMoneyIcon sx={{color: amber[500]}}/>} label={item.price} />
            </Stack>
            <Typography sx={{ padding: 2, pt: 0, color: 'text.secondary' }}>{item.shortDesc}</Typography>
            </>
            )
            : (
            <Typography sx={{ p: 4,pb: 6, color: 'text.secondary' }} fontSize={"large"} textAlign={"center"}>Scan QR Code from Menu</Typography>
            )
            }

          </StyledBox>
          <StyledBox
            sx={{
              px: 2,
              pb: 2,
              height: '100%',
              overflow: 'auto',
            }}
          >
            <Typography sx={{ pt: 1, color: 'text.secondary' }}>Description:</Typography>
            <Typography sx={{ color: 'text.secondary' }}>{item.description}</Typography>
            <Stack direction="row" spacing={2} padding={2}>
            <Button variant='contained' href={"ItemDetails/"+item.id} startIcon={<InfoRoundedIcon />}>More Info</Button> 
            <Button variant='contained' href={"Reviews/"+item.id}  startIcon={<ChatIcon />}>Reviews</Button> 
            </Stack>
          </StyledBox>
        </SwipeableDrawer>
      </Root>
      <Fab sx={{ ml: 2, mt: 2 }} className="fab" component={Link} to={"/"}><ArrowBackIcon fontSize='medium' /></Fab>
    </>
  );
}