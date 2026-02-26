import React, { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom';
import { getItemById, getReviews, SaveReview } from '../API';
import List from '@mui/material/List';
import Grid from '@mui/material/Grid';
import ListItem from '@mui/material/ListItem';
import Divider from '@mui/material/Divider';
import ListItemText from '@mui/material/ListItemText';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import Avatar from '@mui/material/Avatar';
import Typography from '@mui/material/Typography';
import Fab from '@mui/material/Fab';
import Button from '@mui/material/Button';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import AddIcon from '@mui/icons-material/Add';
import moment from 'moment';
import { Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Rating, TextField } from '@mui/material';
import { useAuthState } from '../Context/context';

export default function Reviews() {
    moment.locale('en');
    const userDetails = JSON.parse(useAuthState());
    const { itemId } = useParams();
    const [reviews, setreviews] = useState([]);
    const [open, setOpen] = React.useState(false);
    const [value, setValue] = React.useState(0);
    const [desc, setDesc] = React.useState("");

    const handleClickOpen = () => {
      setOpen(true);
    };
  
    const handleClose = () => {
      setOpen(false);
    };

    const handleSubmit = async () => {
        let item = await getItemById(itemId);
        var obj = {'item': parseInt(itemId), 'customer': userDetails.id, 'rating': value, 'description': desc, 'datePosted': moment(new Date()).format('DD/MMM/YYYY'), 'customer1': userDetails, 'item1': item};
        console.log(obj);
        SaveReview(obj).then(item=>console.log(item));
        setOpen(false);
    }

    useEffect(() => {
        async function fetchReviews() {
            let all = await getReviews();
            setreviews(all);
        }
        fetchReviews();
    }, []);
    return (
        <Grid container justifyContent="center" style={{ background: "white" }}>
              <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Post Review</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Submit your review here
          </DialogContentText>
          <Rating
  name="simple-controlled"
  value={value}
  onChange={(event, newValue) => {
    setValue(newValue);
  }}
/>
          <TextField
            autoFocus
            margin="dense"
            id="review"
            label="Review"
            type="text"
            multiline
            minRows={3}
            value={desc}
            onInput={e=>setDesc(e.target.value)}
            fullWidth
            variant="outlined"
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={handleSubmit}>Submit</Button>
        </DialogActions>
      </Dialog>
            <Grid container direction="row" justifyContent="space-between" alignItems="center">
            <Fab sx={{ ml: 2, mt: 2 }} className="fab3" component={Link} to={'/Scan'}><ArrowBackIcon fontSize='medium' /></Fab>
                <Typography variant='h4' sx={{marginTop: 2}}>Reviews</Typography>
            <Fab sx={{ mt: 2 }} className="fab4" onClick={handleClickOpen}><AddIcon fontSize='medium' /></Fab>

            </Grid>
            <List sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper', mt: 2 }}>
                {
                    reviews.map((ele, ind) => {
                        return ele.item === parseInt(itemId) ?
                            <>
                                <ListItem alignItems="flex-start" key={ind}>
                                    <ListItemAvatar>
                                        <Avatar alt="Remy Sharp" src={`https://ui-avatars.com/api/?name=${ele.customer1.username}`} />
                                    </ListItemAvatar>
                                    <ListItemText
                                        primary={ele.customer1.username}
                                        secondary={
                                            <React.Fragment>
                                                <Typography
                                                    sx={{ display: 'inline' }}
                                                    component="span"
                                                    variant="body2"
                                                    color="text.primary"
                                                >
                                                    {moment(ele.datePosted).format('DD/MM/YYYY')}
                                                </Typography>
                                                {" - " + ele.description}
                                            </React.Fragment>
                                        }
                                    />
                                </ListItem>
                                <Divider variant="inset" component="li" />
                            </>
                            : null
                    })
                }
                {/* <Fab color="primary" aria-label="add" sx={{margin: 0,top: 'auto',right: 20,bottom: 30,left: 'auto',position: 'fixed',}}>
                    <AddIcon />
                </Fab> */}
            </List>
        
        
        </Grid>
    )
}
