import React from 'react';
import { useState } from 'react';


import { FormControl, TextField,  Button, Dialog, DialogTitle, DialogContent, DialogActions } from '@mui/material';
import CustomDatePicker from '../components/datePickerComponent';
import ImageCropper from '../components/imageCropper';
import api from '../utils/api';
import { storage } from '../Config/FireBaseConfig';
import { getDownloadURL, ref, uploadBytes } from 'firebase/storage';
import { v4 } from 'uuid';
import toast from 'react-hot-toast';
import dayjs from 'dayjs';
import Send from '@mui/icons-material/Send';
import LoadingButton from '@mui/lab/LoadingButton';


const CreateWorkOutStatus = ({show = true, setShow, reload}) => {
    const [startDate, setStartDate] = useState(null);
    const [startDateError, setStartDateError] = useState(false);
    const [exercise, setExercise] = useState('');
    const [matrix, setMatrix] = useState('');
    const [description, setDescription] = useState('');
    const [image, setImage] = useState(null);
    const userName = localStorage.getItem('userName');
    const [isLoading, setIsLoading] = useState(false);


    const handleSubmit = async() => {
        try {

            setIsLoading(true);

            if(!image){
                throw new Error('Image is required');
            }
            if(!exercise){
                throw new Error('Exercise is required');
            }
            if(!matrix){
                throw new Error('Matrix is required');
            }
            if(!description){
                throw new Error('Description is required');
            }
            if(!startDate){
                throw new Error('Start Date is required');
            }


            let img = await uploadStatusImage();      // get download link from path --> console.log(await getDownloadURL(ref(storage, img)));
            let start = dayjs(startDate).add(1, 'day').toDate().toISOString().split('T')[0]
            
            let formData = {
                description:description,
                metrix:matrix,
                exercise:exercise,
                start,
                image:img,
                userId:userName
            }
            
            let res = await api.post("/v1/workouts/addStatus", formData)
            reload()
            setShow(false);
            setStartDate(null)
            setStartDateError(false)
            setExercise('')
            setMatrix('')
            setDescription('')
        } catch (error) {
            toast.error(error.message);
        }finally{
            setIsLoading(false);
            setImage(null)
        }
    }

    const uploadStatusImage = async () => {
        return new Promise((resolve, reject) => {
            // Convert Blob URL to Blob object
            fetch(image.img)
                .then(res => res.blob())
                .then(blob => {
                    // Create storage reference
                    const name = `${userName}/workoutstatus/${v4() +  image.fileName}`
                    const WorkOutStatusImageRef = ref(
                        storage,
                        name
                    );
    
                    // Upload Blob to Firebase Storage
                    uploadBytes(WorkOutStatusImageRef, blob)
                        .then(() => {
                            resolve(name);
                        })
                        .catch((error) => {
                            // Error uploading image
                            reject(error);
                        });
                })
                .catch(error => {
                    // Error fetching Blob data
                    reject(error);
                });
        });
    };
 
    return(
        <>
            <Dialog
                fullWidth
                open={show}
                onClose={() => setShow(false)}
            >
                <DialogTitle>
                    Add Status
                </DialogTitle>
                <DialogContent style={{textAlign:'center'}}>
                    <ImageCropper 
                        img={image}
                        setImg={setImage}
                    />
                    {image &&
                        <FormControl fullWidth>
                            <TextField
                                label="Exercise"
                                variant="outlined"
                                value={exercise}
                                onChange={(e) => setExercise(e.target.value)}
                                fullWidth
                                size='small'
                                style={{marginBottom: '10px'}}
                            />
                            <TextField
                                label="Matrix"
                                variant="outlined"
                                value={matrix}
                                onChange={(e) => setMatrix(e.target.value)}
                                fullWidth
                                size='small'
                                style={{marginBottom: '10px'}}
                            />
                            <TextField
                                label="Description"
                                variant="outlined"
                                value={description}
                                onChange={(e) => setDescription(e.target.value)}
                                fullWidth
                                size='small'
                                style={{marginBottom: '10px'}}
                            />
                            <CustomDatePicker
                                label="Start Date"
                                disableFuture={true}
                                value={startDate}
                                setValue={setStartDate}
                                error={startDateError}
                                setError={setStartDateError}
                            />
                        </FormControl>
                    }
                </DialogContent>
                <DialogActions>
                    <Button onClick={() => setShow(false)}>
                        Cancel
                    </Button>
                    <LoadingButton loading={isLoading} loadingPosition='start' startIcon={<Send />} variant="outlined" onClick={handleSubmit}>
                        Post
                    </LoadingButton>
                </DialogActions>
            </Dialog>
        </>

    );
}
export default CreateWorkOutStatus;
