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
import { useAuthContext } from "../../context/AuthContext";
import Alert from "@mui/material/Alert";

import {
  getStorage,
  ref,
  uploadBytesResumable,
  getDownloadURL,
  listAll,
} from "firebase/storage";
import { db } from "../../../firebaseConfig";
import { collection, doc, setDoc, onSnapshot } from "firebase/firestore";

export default function PhotoFeed() {
  const storage = getStorage();
  const [image, setImage] = useState(null);
  const { user, loading } = useAuthContext();

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
          // Add the image URL to the 'images' field in the UserScore collection
          const userScoreRef = doc(collection(db, "UserScore"), user.uid); // Replace "user_id" with the actual user ID
          setDoc(
            userScoreRef,
            { images: { [img.name]: url } },
            { merge: true }
          );
        });
        console.log(`Uploaded ${img.name}`);
        setUploading(false);
      }
    );
  };

  useEffect(() => {
    const userScoreCollectionRef = collection(db, "UserScore");
    const unsubscribe = onSnapshot(userScoreCollectionRef, (querySnapshot) => {
      const allImages = [];
      querySnapshot.forEach((doc) => {
        const data = doc.data();
        if (data && data.images) {
          allImages.push(...Object.values(data.images));
        }
      });
      setImages(allImages);
    });

    // Clean up the listener when the component unmounts
    return () => {
      unsubscribe();
    };
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
                style={{
                  width: "100%",
                  height: "auto",
                  objectFit: "aspect-fill",
                }}
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
