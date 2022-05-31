import * as React from "react";
import Navbar from "src/commons/components/Navbar/index";
import Layout from "src/commons/components/Layout";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import Typography from "@mui/material/Typography";
import { formatRupiah } from "src/helpers";
import Button from "@mui/material/Button";
import { useState } from "react";
import { useRouter } from "next/router";
import { setCart } from "src/redux/actions/product";
import Snackbar from "@mui/material/Snackbar";
import MuiAlert from "@mui/material/Alert";
import styles from "src/commons/styles/cart.module.css";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import { setProduct, DelCart } from "src/redux/actions/product";
import CartComponent from "src/commons/components/Cart";
import Modal from "@mui/material/Modal";

const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  boxShadow: 24,
  p: 4,
};

const Cart = () => {
  const dispatch = useDispatch();
  const router = useRouter();
  const Carts = useSelector((state) => state.cart.cart);
  const Products = useSelector((state) => state.product.product);
  const [total, setTotal] = useState(0);
  const [name, setName] = useState("");
  const [address, setAddress] = useState("");
  const [email, setEmail] = useState("");

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
    if (name === "" || address === "" || email === "") {
      return handleClick();
    }
    setOpenM(true);
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
    }, 5000);
  };

  useEffect(() => {
    getAllPrice();
  }, [Carts]);

  useEffect(() => {
    getAllPrice();
  }, []);

  const [open, setOpen] = useState(false);
  const [openM, setOpenM] = useState(false);

  const handleClick = () => {
    setOpen(true);
  };

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    setOpen(false);
  };

  const cancelHandle = () => {
    setName("");
    setAddress("");
    setEmail("");
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
              <TextField
                required
                onChange={(e) => {
                  setName(e.target.value);
                }}
                className={styles.input}
                label="Name"
                id="standard-helperText"
                variant="standard"
              />
            </div>
            <div className={styles.wrapp}>
              <TextField
                required
                onChange={(e) => {
                  setAddress(e.target.value);
                }}
                className={styles.input}
                label="Address"
                id="standard-helperText"
                variant="standard"
              />
            </div>
            <div className={styles.wrapp}>
              <TextField
                required
                onChange={(e) => {
                  setEmail(e.target.value);
                }}
                className={styles.input}
                label="Email"
                id="standard-helperText"
                variant="standard"
              />
            </div>
            <p className={styles.total}>Total Price: {formatRupiah(total)} </p>
            <div className={styles.btn}>
              <Button /* onClick={cancelHandle} */ variant="outlined" color="error">
                Cancel
              </Button>
              <Button onClick={checkOut} variant="contained" color="success">
                Checkout
              </Button>
            </div>
          </div>
        </main>
        <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
          <Alert onClose={handleClose} severity="error" sx={{ width: "100%" }}>
            All input must be filled
          </Alert>
        </Snackbar>
        {/* MODAL */}
        <Modal open={openM} onClose={handleClose} aria-labelledby="modal-modal-title" aria-describedby="modal-modal-description">
          <Box sx={style}>
            <Typography id="modal-modal-title" variant="h6" component="h2">
              THANKS FOR ORDER
            </Typography>
            <Typography id="modal-modal-description" sx={{ mt: 2 }}>
              {`Thanks ${name} for order, your products will delivered to your Address ASAP`}
            </Typography>
          </Box>
        </Modal>
      </Layout>
    </>
  );
};

export default Cart;
