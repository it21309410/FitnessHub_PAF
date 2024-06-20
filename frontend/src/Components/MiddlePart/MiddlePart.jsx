import { Card } from '@mui/material'
import React from 'react'
import PostCard from '../Post/PostCard';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import PostForm from '../Post/PostForm';
import PostAddIcon from '@mui/icons-material/PostAdd';
import Statuses from './Statuses';



const MiddlePart = () => {
  
  
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
 
  
  return (
    <div style={{ paddingLeft: '0rem' }}>
      <Statuses />
      <Card >
        <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'justify', }}>
          
          
        </div>
        <div style={{
          display: 'flex',
          justifyContent: 'center',
          gap: '2.25rem', /* Equivalent to 'space-x-9' with a default font size */
           /* Equivalent to 'mt-5' with a default font size */
        }}>
          
          
          <div>
          <div style={{
            
            alignItems:'center',
          }}>
            <Button color="primary"  onClick={handleClickOpen} 
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
              fontFamily:'verdana',
              fontSize: '16px',
            }}>
              <PostAddIcon/>
              <span><b>Create post</b></span>
            </Button>
            

          </div>
          <React.Fragment>
      
      <Dialog
        open={open}
        onClose={handleClose}
        PaperProps={{
          component: 'form',
          onSubmit: (event) => {
            event.preventDefault();
            const formData = new FormData(event.currentTarget);
            const formJson = Object.fromEntries(formData.entries());
            const email = formJson.email;
            console.log(email);
            handleClose();
          },
        }}
      >
        <DialogTitle><b>Add Post</b></DialogTitle>
        <DialogContent>
          <DialogContentText>
          Upload Image and Description
          </DialogContentText>
          <div>
      
      <PostForm/>
    </div>
          
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          
        </DialogActions>
      </Dialog>
    </React.Fragment>
          </div>
          

        </div>
      </Card>
      <div style={{textAlign:'left',
  marginTop: '1.25rem', /* Equivalent to 'mt-5' with a default font size */
  gap: '1.25rem' /* Equivalent to 'space-y-5' with a default font size */
}}>
  <PostCard/>
          
      </div>
    </div>
  )
}

export default MiddlePart
