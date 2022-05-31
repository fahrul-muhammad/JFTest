import Head from "next/head";
import styles from "../commons/styles/Home.module.css";
import Card from "../commons/components/Card/index";
import Navbar from "../commons/components/Navbar/index";
import Layout from "../commons/components/Layout";
import { useDispatch, useSelector } from "react-redux";
import { setProduct } from "../redux/actions/product";
import { useEffect, useState } from "react";

// PRODUCT IMAGE
import Camera from "src/assets/image/camera.jpg";
import Headset from "src/assets/image/headset.jpg";
import Watch from "src/assets/image/watch.jpeg";
import Coffe from "src/assets/image/coffe.jpg";
import Furnitur from "src/assets/image/furnitur.jpg";
import Food from "src/assets/image/food.jpeg";

const ProductDumy = [
  { name: "Fuji Camera", price: 2000000, img: Camera.src, desc: "Ini adalah camera terbaik dari toko kami, ayo di beli", id: 1, stock: 10 },
  { name: "Razer Headset", price: 400000, img: Headset.src, desc: "Headset anda rusak? ayo ganti yang baru dengan membeli headset berkualitas terbaik", id: 2, stock: 10 },
  { name: "Prime Watch", price: 500000, img: Watch.src, desc: "Anda pencinta Jam tangan? yah gak gaul kalau belum beli jam tangan terbaik dari toko kami", id: 3, stock: 10 },
  { name: "Indonesian Coffee", price: 20000, img: Coffe.src, desc: "ngoding gak ngopi? gak asik bro, mending beli kopi dari tempat kami", id: 4, stock: 10 },
  { name: "Ikea Furnitur", price: 1000000, img: Furnitur.src, desc: "Ayo lengkapi isi rumah kamu dengan furnitur terbaik yang ada di toko kami", id: 5, stock: 10 },
  { name: "Indonesian Food & Drink", price: 100000, img: Food.src, desc: "Makanan adalah kebutuhan setiap manusia, lihat promo yang ada di toko kami", id: 6, stock: 10 },
];

const Home = () => {
  const { product } = useSelector((state) => state.product);
  const [Products, setProducts] = useState([]);
  const dispatch = useDispatch();

  // const saveProductToRedux = () => {
  //   dispatch(setProduct(Products));
  // };

  useEffect(() => {
    console.log("masuk");
    if (product.length <= 0) {
      dispatch(setProduct(ProductDumy));
    } else {
      setProducts(product);
    }
  }, []);

  return (
    <>
      <Layout title="Home">
        <div className={styles.container}>
          <Navbar />
          <main className={styles.main}>
            {Products.map((val, id) => {
              return (
                <div key={id}>
                  <Card price={val.price} desc={val.desc} name={val.name} id={val.id} photo={val.img} />
                </div>
              );
            })}
          </main>
        </div>
      </Layout>
    </>
  );
};

export default Home;
