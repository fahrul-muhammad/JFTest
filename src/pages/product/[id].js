import * as React from "react";
import Navbar from "src/commons/components/Navbar/index";
import Layout from "src/commons/components/Layout";
import styles from "src/commons/styles/Product.module.css";
import { useDispatch, useSelector } from "react-redux";
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

const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

const Product = () => {
  const router = useRouter();
  const { id } = router.query;
  const ProductId = id;
  const [stock, SetStock] = useState(1);
  const [open, setOpen] = React.useState(false);
  const State = useSelector((state) => state);
  const { product, cart } = State;
  const productList = [...product.product];
  const cartList = [...cart.cart];
  const dispatch = useDispatch();

  const result = productList.find((e) => e.id == ProductId);

  const plusCount = () => {
    if (stock >= result.stock) {
      return;
    } else {
      SetStock(stock + 1);
    }
  };

  const devideCount = () => {
    if (stock <= 1) {
      return;
    } else {
      SetStock(stock - 1);
    }
  };

  const addToChart = () => {
    const Products = [
      ...cart.cart,
      {
        id: result.id,
        name: result.name,
        img: result.img,
        price: result.price,
        stock_order: stock,
      },
    ];

    dispatch(setCart(Products));
  };

  const findIdxCart = (value) => {
    return value.id == id;
  };

  const AddItemToChart = () => {
    const cartidx = cartList.findIndex(findIdxCart);
    console.log("STOCK", stock);
    if (cartidx === -1) {
      addToChart();
    } else {
      console.log("STOCK ORDER", cartList[cartidx].stock_order);
      const UpdateStock = {
        id: cartList[cartidx].id,
        name: cartList[cartidx].name,
        img: cartList[cartidx].img,
        price: cartList[cartidx].price,
        stock_order: cartList[cartidx].stock_order + stock,
      };
      cartList[cartidx] = UpdateStock;
      dispatch(setCart(cartList));
    }
  };

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
      <Layout title="Product">
        <Navbar />
        <main className={styles.main}>
          <div className={styles.left}>
            <Image width={600} height={500} src={result.img} alt="foto product" />
          </div>
          <div className={styles.right}>
            <Typography className={styles.name} gutterBottom variant="h4" component="div">
              {result.name}
            </Typography>
            <Typography className={styles.price} gutterBottom variant="h5" component="div">
              {formatRupiah(result.price)}
            </Typography>
            <Typography className={styles.desc} variant="body2" color="text.secondary">
              {result.desc}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              <p className={styles.stock}>{result.stock > 0 ? `Stock: ${result.stock}` : `Stock Habis`}</p>
            </Typography>
            <div className={styles.btn}>
              <ButtonGroup color="success" variant="contained" aria-label="outlined primary button group">
                <Button onClick={() => devideCount()}>-</Button>
                <Button>{stock}</Button>
                <Button onClick={() => plusCount()}>+</Button>
              </ButtonGroup>
              <Button variant="contained" color="success">
                <Link href={`/product/edit/${result.id}`} passHref>
                  Edit
                </Link>
              </Button>
              <IconButton
                className={styles.cart}
                color="success"
                disabled={result.stock == 0}
                onClick={() => {
                  handleClick();
                  AddItemToChart();
                }}
                aria-label="add to shopping cart"
              >
                <AddShoppingCartIcon />
              </IconButton>
            </div>
          </div>
        </main>
      </Layout>
      {/* SNACKBAR */}
      <Stack spacing={2} sx={{ width: "100%" }}>
        <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
          <Alert onClose={handleClose} severity="success" sx={{ width: "100%" }}>
            Berhasil menambahkan produk ke keranjang
          </Alert>
        </Snackbar>
      </Stack>
    </>
  );
};

export default Product;
