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
import styles from "src/commons/styles/cart.module.css";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import DeleteIcon from "@mui/icons-material/Delete";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import { setProduct, DelCart } from "src/redux/actions/product";
import CartComponent from "src/commons/components/Cart";
import Modal from "@mui/material/Modal";

const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

const Cart = () => {
  const dispatch = useDispatch();
  const router = useRouter();
  const Carts = useSelector((state) => state.cart.cart);
  const Products = useSelector((state) => state.product.product);
  const [total, setTotal] = useState(0);

  const RemoveItem = (idx) => {
    const Products = [...Carts];
    const idxItmes = Products.findIndex((vals) => {
      return vals.id === idx;
    });
    if (idxItmes !== -1) {
      Products.splice(idxItmes, 1);
    }
    dispatch(setCart(Products));
  };

  const getAllPrice = () => {
    const Result = 0;
    const Price = [...Carts];
    for (let i = 0; i < Price.length; i++) {
      Result += Price[i].price * Price[i].stock_order;
    }
    setTotal(Result);
  };

  const checkOut = () => {
    handleClick();
    const ProductList = [...Products];
    for (let i = 0; i < Products.length; i++) {
      console.log(Products[i].id);
      for (let j = 0; j < Carts.length; j++) {
        console.log("INI CARTS", Carts[j].id);
        if (Products[i].id === Carts[j].id) {
          const newProduct = {
            name: Products[i].name,
            price: Products[i].price,
            desc: Products[i].desc,
            stock: Products[i].stock - Carts[j].stock_order,
            img: Products[i].img,
            id: Products[i].id,
          };
          const ProductsIdx = ProductList.findIndex((val) => {
            return val.id === Carts[j].id;
          });
          ProductList[ProductsIdx] = newProduct;
          dispatch(setProduct(ProductList));
        }
      }
    }
    dispatch(DelCart());
    setTimeout(() => {
      router.push("/");
    }, 2000);
  };

  useEffect(() => {
    getAllPrice();
  }, [Carts]);

  useEffect(() => {
    getAllPrice();
  }, []);

  const [open, setOpen] = useState(false);

  const handleClick = () => {
    setOpen(true);
  };

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    setOpen(false);
  };

  return (
    <>
      <Layout title="Your Cart">
        <Navbar />
        <main className={styles.main}>
          <div className={styles.left}>
            <p className={styles.title}>Your Cart</p>
            {Carts.map((val) => {
              return <CartComponent key={val.id} name={val.name} image={val.img} stock={val.stock_order} total={val.price * val.stock_order} idx={val.id} rmAction={RemoveItem} />;
            })}
          </div>
          <div className={styles.right}>
            <p className={styles.title}>Form Confirmation</p>
            <div className={styles.wrapp}>
              <TextField required className={styles.input} label="Name" id="standard-helperText" variant="standard" />
            </div>
            <div className={styles.wrapp}>
              <TextField required className={styles.input} label="Adress" id="standard-helperText" variant="standard" />
            </div>
            <div className={styles.wrapp}>
              <TextField required className={styles.input} label="Email" id="standard-helperText" variant="standard" />
            </div>
            <p className={styles.total}>Total Price: {formatRupiah(total)} </p>
            <div className={styles.btn}>
              <Button variant="outlined" color="error">
                Cancel
              </Button>
              <Button onClick={checkOut} variant="contained" color="success">
                Checkout
              </Button>
            </div>
          </div>
        </main>
        <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
          <Alert onClose={handleClose} severity="success" sx={{ width: "100%" }}>
            Check Out Success!
          </Alert>
        </Snackbar>
      </Layout>
    </>
  );
};

export default Cart;
