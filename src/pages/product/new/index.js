import * as React from "react";
import Navbar from "src/commons/components/Navbar/index";
import Layout from "src/commons/components/Layout";
import { useDispatch, useSelector } from "react-redux";
import Image from "next/image";
import Button from "@mui/material/Button";
import ButtonGroup from "@mui/material/ButtonGroup";
import { useState } from "react";
import { useRouter } from "next/router";
import Stack from "@mui/material/Stack";
import Snackbar from "@mui/material/Snackbar";
import MuiAlert from "@mui/material/Alert";
import styles from "src/commons/styles/new.module.css";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import { setProduct } from "src/redux/actions/product";

// IMAGE
import dumy from "src/assets/image/noImg.png";

const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

const EditProduct = () => {
  const router = useRouter();
  const state = useSelector((state) => state);
  const dispatch = useDispatch();
  const { product } = state;
  const productList = [...product.product];
  const [open, setOpen] = React.useState(false);

  const [name, setName] = useState("");
  const [price, setPrice] = useState(0);
  const [desc, setDesc] = useState("");
  const [stock, setStock] = useState(1);

  const [img, setImg] = useState(dumy.src);

  const plusCount = () => {
    setStock(stock + 1);
  };

  const devideCount = () => {
    if (stock <= 1) {
      return;
    } else {
      setStock(stock - 1);
    }
  };

  const handleClickOpen = () => {
    setOpen(true);
  };
  const [Open, SetOpen] = React.useState(false);

  const handleClick = () => {
    SetOpen(true);
  };

  const HandleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    SetOpen(false);
  };

  const inputField = React.useRef(null);

  const handleFile = (event) => {
    inputField.current.click();
    event.preventDefault();
  };

  const fileChange = (e) => {
    e.preventDefault();
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        setImg(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const SaveProduct = () => {
    const newProduct = [
      ...productList,
      {
        name: name,
        price: price,
        img: img,
        desc: desc,
        id: Math.floor(Math.random() * 100 + 1),
        stock: stock,
      },
    ];
    dispatch(setProduct(newProduct));
    router.push("/");
  };

  return (
    <>
      <Layout title="Edit Produk">
        <Navbar />
        <main className={styles.main}>
          <input type="file" hidden ref={inputField} onChange={fileChange} />
          <div className={styles.border}>
            <Image className={styles.img} width={150} height={100} src={img} alt="foto produk" />
          </div>
          <div className={styles.input}>
            <Box
              component="form"
              sx={{
                "& > :not(style)": { m: 1, width: "95%" },
              }}
              noValidate
              autoComplete="off"
            >
              <TextField
                id="standard-basic"
                onChange={(e) => {
                  setName(e.target.value);
                }}
                label="Name Product"
                variant="standard"
              />
              <TextField
                id="standard-basic"
                label="Price"
                variant="standard"
                onChange={(e) => {
                  setPrice(e.target.value);
                }}
              />
              <TextField
                id="standard-basic"
                label="Description"
                variant="standard"
                onChange={(e) => {
                  setDesc(e.target.value);
                }}
              />
            </Box>
          </div>
          <p className={styles.stock}>Stock:</p>
          <div className={styles.btn}>
            <ButtonGroup color="success" variant="contained" aria-label="outlined primary button group">
              <Button onClick={() => devideCount()}>-</Button>
              <Button>{stock}</Button>
              <Button onClick={() => plusCount()}>+</Button>
            </ButtonGroup>
            <Button
              onClick={handleFile}
              sx={{
                width: 100,
              }}
              variant="contained"
              color="success"
            >
              Add Picture
            </Button>
            <Button
              onClick={() => {
                handleClick();
                SaveProduct();
              }}
              sx={{
                width: 100,
              }}
              variant="contained"
              color="success"
            >
              Save
            </Button>
          </div>
        </main>
        {/* SNACKBAR */}
        <Stack spacing={2} sx={{ width: "100%" }}>
          <Snackbar open={Open} autoHideDuration={5000} onClose={HandleClose}>
            <Alert onClose={HandleClose} severity="success" sx={{ width: "100%" }}>
              Add Product Success!
            </Alert>
          </Snackbar>
        </Stack>
      </Layout>
    </>
  );
};

export default EditProduct;
