import * as React from "react";
import Navbar from "src/commons/components/Navbar/index";
import Layout from "src/commons/components/Layout";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import Image from "next/image";
import Typography from "@mui/material/Typography";
import { formatRupiah } from "src/helpers";
import { IconButton } from "@mui/material";
import AddShoppingCartIcon from "@mui/icons-material/AddShoppingCart";
import Button from "@mui/material/Button";
import ButtonGroup from "@mui/material/ButtonGroup";
import { useState } from "react";
import { useRouter } from "next/router";
import { setCart } from "src/redux/actions/product";
import Stack from "@mui/material/Stack";
import Snackbar from "@mui/material/Snackbar";
import MuiAlert from "@mui/material/Alert";
import Link from "next/link";
import styles from "src/commons/styles/Edit.module.css";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import DeleteIcon from "@mui/icons-material/Delete";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import { setProduct } from "src/redux/actions/product";

const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

const EditProduct = () => {
  const router = useRouter();
  const { id } = router.query;
  const state = useSelector((state) => state);
  const dispatch = useDispatch();
  const { product, cart } = state;
  const productList = [...product.product];
  const cartList = [...cart.cart];
  const result = productList.find((e) => e.id == id);
  const prodIdx = productList.findIndex((e) => e.id == id);
  const cartIdx = cartList.findIndex((e) => e.id == id);

  const [stock, SetStock] = useState(result.stock);
  const [open, setOpen] = React.useState(false);
  const [name, setName] = useState(result.name);
  const [price, setPrice] = useState(result.price);
  const [desc, setDesc] = useState(result.desc);
  const [newStock, setNewStock] = useState(result.stock);
  const [img, setImg] = useState(result.img);

  const plusCount = () => {
    SetStock(stock + 1);
  };

  const devideCount = () => {
    if (stock <= 1) {
      return;
    } else {
      SetStock(stock - 1);
    }
  };

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const [Open, SetOpen] = React.useState(false);

  const Navigate = () => {
    setTimeout(() => {
      router.push("/");
    }, 5500);
  };

  const handleClick = () => {
    SetOpen(true);
    Navigate();
  };

  const DelProduct = () => {
    if (prodIdx !== -1 && cartIdx !== -1) {
      productList.splice(prodIdx, 1);
      cartList.splice(cartIdx, 1);
    }
    dispatch(setCart(cartList));
    dispatch(setProduct(productList));
    router.push("/");
    return;
  };

  const HandleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    SetOpen(false);
  };

  const UpdateProduk = () => {
    const newprods = {
      name: name,
      price: price,
      img: img,
      desc: desc,
      id: id,
      stock: stock,
    };

    if (name !== "") {
      productList[prodIdx] = newprods;
      dispatch(setProduct(productList));
    }
    setTimeout(() => {
      router.push("/");
    }, 2000);
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

  return (
    <>
      <Layout title="Edit Produk">
        <Navbar />
        <main className={styles.main}>
          <div className={styles.border}>
            <input type="file" hidden ref={inputField} onChange={fileChange} />
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
                label="Name Product"
                onChange={(e) => {
                  setName(e.target.value);
                }}
                variant="standard"
              />
              <TextField
                id="standard-basic"
                onChange={(e) => {
                  setPrice(e.target.value);
                }}
                label="Price"
                variant="standard"
              />
              <TextField
                id="standard-basic"
                onChange={(e) => {
                  setDesc(e.target.value);
                }}
                label="Description"
                variant="standard"
              />
            </Box>
          </div>
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
              Change Photo
            </Button>
            <Button
              onClick={() => {
                handleClick();
                UpdateProduk();
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
          <div className={styles.delet}>
            <Button onClick={handleClickOpen} variant="outlined" color="error" startIcon={<DeleteIcon />}>
              Delete
            </Button>
          </div>
        </main>
        {/* MODAL */}
        <Dialog open={open} onClose={handleClose} aria-labelledby="alert-dialog-title" aria-describedby="alert-dialog-description">
          <DialogTitle id="alert-dialog-title">{"Delet This Product ?"}</DialogTitle>
          <DialogContent>
            <DialogContentText id="alert-dialog-description">Are you sure to delet this product?</DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button
              color="error"
              onClick={() => {
                // handleClose();
                DelProduct();
              }}
            >
              Yes
            </Button>
            <Button color="success" onClick={handleClose} autoFocus>
              Cancel
            </Button>
          </DialogActions>
        </Dialog>
        {/* SNACKBAR */}
        <Stack spacing={2} sx={{ width: "100%" }}>
          <Snackbar open={Open} autoHideDuration={5000} onClose={HandleClose}>
            <Alert onClose={HandleClose} severity="success" sx={{ width: "100%" }}>
              Update Product Success!
            </Alert>
          </Snackbar>
        </Stack>
      </Layout>
    </>
  );
};

export default EditProduct;
