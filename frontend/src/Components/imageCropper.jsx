import React, { useState, useCallback } from 'react'
import Cropper from 'react-easy-crop'
import { Slider, Typography, Button, IconButton } from '@mui/material'
import { styled } from '@mui/material/styles';
import { getOrientation } from 'get-orientation/browser'
// import ImgDialog from './ImgDialog'
import { getCroppedImg, getRotatedImage } from '../utils/canvasUtils.js'
import imagecropperstyles from '../styles/imageCropperStyles.module.css'
import { Close, CloudUpload } from '@mui/icons-material'

const ORIENTATION_TO_ANGLE = {
  '3': 180,
  '6': 90,
  '8': -90,
}

const ImageCropper = ({img = null, setImg}) => {
  const [imageSrc, setImageSrc] = useState(null)
  const [fileName, setFileName] = useState('')
  const [crop, setCrop] = useState({ x: 0, y: 0 })
  const [rotation, setRotation] = useState(0)
  const [zoom, setZoom] = useState(1)
  const [croppedAreaPixels, setCroppedAreaPixels] = useState(null)
  const [isEdit, setIsEdit] = useState(true)

  const onCropComplete = (croppedArea, croppedAreaPixels) => {
    setCroppedAreaPixels(croppedAreaPixels)
  }

  const showCroppedImage = async () => {
    try {
      const img = await getCroppedImg(
        imageSrc,
        croppedAreaPixels,
        rotation
      )
      setImg({img, fileName})
      setIsEdit(false)
    } catch (e) {
      console.error(e)
    }
  }

  const onClose = () => {
    setImg(null)
    setImageSrc(null)
  }

  const onFileChange = async (e) => {
    if (e.target.files && e.target.files.length > 0) {
      const file = e.target.files[0]
      setFileName(file.name)
      let imageDataUrl = await readFile(file)

      try {
        // apply rotation if needed
        const orientation = await getOrientation(file)
        const rotation = ORIENTATION_TO_ANGLE[orientation]
        if (rotation) {
          imageDataUrl = await getRotatedImage(imageDataUrl, rotation)
        }
      } catch (e) {
        console.warn('failed to detect the orientation')
      }

      setImageSrc(imageDataUrl)
      setIsEdit(true)

    }
  }

  const VisuallyHiddenInput = styled('input')({
    clip: 'rect(0 0 0 0)',
    clipPath: 'inset(50%)',
    height: 1,
    overflow: 'hidden',
    position: 'absolute',
    bottom: 0,
    left: 0,
    whiteSpace: 'nowrap',
    width: 1,
  });

  

  return (
    <div>
      {imageSrc ? (
        <React.Fragment>
          {isEdit ? (
          <>
            <div className={imagecropperstyles.cropContainer}>
              <Cropper
                image={imageSrc}
                crop={crop}
                rotation={rotation}
                zoom={zoom}
                aspect={2 / 3}
                onCropChange={setCrop}
                onRotationChange={setRotation}
                onCropComplete={onCropComplete}
                onZoomChange={setZoom}
              />
            </div>
            <div className={imagecropperstyles.controls}>
              <div className={imagecropperstyles.sliderContainer}>
                <Typography
                  variant="overline"
                  imagecropperstyles={{ root: imagecropperstyles.sliderLabel }}
                >
                  Zoom
                </Typography>
                <Slider
                  value={zoom}
                  min={1}
                  max={3}
                  step={0.1}
                  aria-labelledby="Zoom"
                  imagecropperstyles={{ root: imagecropperstyles.slider }}
                  onChange={(e, zoom) => setZoom(zoom)}
                />
              </div>
              <div className={imagecropperstyles.sliderContainer}>
                <Typography
                  variant="overline"
                  imagecropperstyles={{ root: imagecropperstyles.sliderLabel }}
                >
                  Rotation
                </Typography>
                <Slider
                  value={rotation}
                  min={0}
                  max={360}
                  step={1}
                  aria-labelledby="Rotation"
                  imagecropperstyles={{ root: imagecropperstyles.slider }}
                  onChange={(e, rotation) => setRotation(rotation)}
                />
              </div>
              <Button
                onClick={showCroppedImage}
                variant="contained"
                color="primary"
                className={imagecropperstyles.cropButton}
              >
                Done
              </Button>
            </div>
          </>
          ) : (
            <div className={imagecropperstyles.cropContainer} style={{marginBottom: '10px' }}>
              <img alt="Crop" style={{ width: '100%'}} src={img?.img} />
              <IconButton
                onClick={onClose}
                variant="contained"
                color="primary"
                style={{position: 'absolute', top: 0, right: 0, padding: '16px', cursor: 'pointer'}}
              >
                <Close />
              </IconButton>
            </div>
          )}
        </React.Fragment>
      ) : (
        <Button
            component="label"
            role={undefined}
            variant="contained"
            tabIndex={-1}
            startIcon={<CloudUpload />}
        >
            Upload Image
            <VisuallyHiddenInput type="file" onChange={(e) => onFileChange(e)} />
        </Button>
      )}
    </div>
  )
}

function readFile(file) {
  return new Promise((resolve) => {
    const reader = new FileReader()
    reader.addEventListener('load', () => resolve(reader.result), false)
    reader.readAsDataURL(file)
  })
}

export default ImageCropper;
