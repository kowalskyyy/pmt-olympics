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
import ImageListItemBar from "@mui/material/ImageListItemBar";
import LinearProgress from "@mui/material/LinearProgress";
import CircularProgress from "@mui/material/CircularProgress";
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
import {
  collection,
  doc,
  updateDoc,
  onSnapshot,
  serverTimestamp,
  arrayUnion,
} from "firebase/firestore";

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

  const [loadingImages, setLoadingImages] = useState(true);

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
          setImages([...images, { url, timestamp: serverTimestamp() }]);
          const timestamp = new Date();
          // Add the image URL and timestamp to the 'images' field in the UserScore collection
          const userScoreRef = doc(collection(db, "UserScore"), user.uid); // Replace "user_id" with the actual user ID
          updateDoc(userScoreRef, {
            images: arrayUnion({ url, timestamp: timestamp }),
          });
        });
        console.log(`Uploaded ${img.name}`);
        setUploading(false);
      }
    );
  };

  useEffect(() => {
    setLoadingImages(true);

    const userScoreCollectionRef = collection(db, "UserScore");
    const unsubscribe = onSnapshot(userScoreCollectionRef, (querySnapshot) => {
      const allImages = [];
      querySnapshot.forEach((doc) => {
        const data = doc.data();
        if (data && data.images) {
          console.log(data.images);
          for (let image of Object.values(data.images)) {
            allImages.push({
              url: image.url,
              timestamp: image.timestamp,
              user: `${data.name ?? "Anonymous"}  ${data.lastName ?? "User"}`,
            });
          }
        }
      });
      console.log(allImages);
      allImages.sort((a, b) => b.timestamp.seconds - a.timestamp.seconds);
      setImages(allImages);
      setLoadingImages(false);
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
        <Box sx={{maxHeight: "600px"}}>
          {loadingImages ? (
            <Box display="flex" justifyContent="center" alignItems="center">
              <CircularProgress />
            </Box>
          ) : images.length > 0 ? (
            <ImageList cols={2} variant="masonry" gap={4} >
              {images.map((image, index) => (
                <ImageListItem key={index}>
                  <img
                    src={image.url}
                    alt={`Uploaded ${index}`}
                    onClick={() => handleClickOpen(image.url)}
                    loading="lazy"
                  />
                  <ImageListItemBar title={`${image.user}`}></ImageListItemBar>
                </ImageListItem>
              ))}
            </ImageList>
          ) : (
            <Typography variant="body1">
              Be the first to submit your footage!
            </Typography>
          )}
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
