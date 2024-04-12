import { useState, useEffect } from "react";
import {
  Typography,
  Container,
  Button,
  Box,
  Dialog,
  DialogContent,
} from "@mui/material";
import ImageList from "@mui/material/ImageList";
import ImageListItem from "@mui/material/ImageListItem";
import LinearProgress from "@mui/material/LinearProgress";
import Alert from "@mui/material/Alert";

import {
  getStorage,
  ref,
  uploadBytesResumable,
  getDownloadURL,
  listAll,
} from "firebase/storage";

export default function PhotoFeed() {
  const storage = getStorage();
  const [image, setImage] = useState(null);
  const [images, setImages] = useState([]);

  const [open, setOpen] = useState(false);
  const [selectedImage, setSelectedImage] = useState("");

  const [uploading, setUploading] = useState(false);
  const [progress, setProgress] = useState(0);

  const [error, setError] = useState(null);

  const handleImageChange = (e) => {
    if (e.target.files[0]) {
      setImage(e.target.files[0]);
      handleUpload(e.target.files[0]);
    }
  };

  const handleUpload = (img) => {
    if (!img) {
      setError("No image selected");
      return;
    }

    setUploading(true);
    setProgress(0);

    const storageRef = ref(storage, `images/${img.name}`);
    const uploadTask = uploadBytesResumable(storageRef, img);

    uploadTask.on(
      "state_changed",
      (snapshot) => {
        const progress = Math.round(
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100
        );
        setProgress(progress);
      },
      (error) => {
        console.log(error);
        setUploading(false);
      },
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then((url) => {
          setImages([...images, url]);
        });
        console.log(`Uploaded ${img.name}`);
        setUploading(false);
      }
    );
  };

  useEffect(() => {
    const fetchImages = async () => {
      const imagesRef = ref(storage, "images");
      const result = await listAll(imagesRef);
      let urlPromises = result.items.map((imageRef) =>
        getDownloadURL(imageRef)
      );
      Promise.all(urlPromises).then((urls) => {
        setImages(urls);
      });
    };
    fetchImages();
  }, []);

  const handleClickOpen = (url) => {
    setSelectedImage(url);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
  return (
    <>
      <Container maxWidth="sm" sx={{ mt: 2 }}>
        <input
          accept="image/*"
          style={{ display: "none" }}
          id="raised-button-file"
          multiple
          type="file"
          onChange={handleImageChange}
        />
        <label htmlFor="raised-button-file">
          <Typography variant="body1">
            Submit your photo to the Olympics live feed
          </Typography>
          <Button component="span">Upload</Button>

          {error && <Alert severity="error">{error}</Alert>}
          {uploading && (
            <LinearProgress variant="determinate" value={progress} />
          )}
        </label>
        <ImageList cols={2}>
          {images.map((url, index) => (
            <ImageListItem key={index}>
              <img
                src={url}
                alt={`Uploaded ${index}`}
                style={{ width: "100%", height: "auto", objectFit: "contain" }}
                onClick={() => handleClickOpen(url)}
              />
            </ImageListItem>
          ))}
        </ImageList>
        <Dialog open={open} onClose={handleClose} maxWidth="md">
          <DialogContent>
            <img
              src={selectedImage}
              alt="Selected"
              style={{ width: "100%", height: "auto", objectFit: "contain" }}
            />
          </DialogContent>
        </Dialog>
      </Container>
    </>
  );
}
