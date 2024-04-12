import { useState, useEffect } from "react";
import {
  Typography,
  Container,
  Button,
  Box,
  Dialog,
  DialogContent,
} from "@mui/material";
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

  const handleImageChange = (e) => {
    if (e.target.files[0]) {
      setImage(e.target.files[0]);
    }
  };

  const handleUpload = () => {
    const storageRef = ref(storage, `images/${image.name}`);
    const uploadTask = uploadBytesResumable(storageRef, image);

    uploadTask.on(
      "state_changed",
      (snapshot) => {},
      (error) => {
        console.log(error);
      },
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then((url) => {
          setImages([...images, url]);
        });
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
      Promise.all(urlPromises).then((urls) => setImages(urls));
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
        </label>
        <Box>
          {images.map((url, index) => (
            <img
              src={url}
              alt={`Uploaded ${index}`}
              key={index}
              style={{ width: "100%", height: "auto", objectFit: "contain" }}
              onClick={() => handleClickOpen(url)}
            />
          ))}
        </Box>
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
