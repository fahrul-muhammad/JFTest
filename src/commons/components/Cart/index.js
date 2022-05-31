import styles from "src/commons/styles/cartComponent.module.css";
import Image from "next/image";
import { formatRupiah } from "src/helpers/index";

const CartComponent = ({ name, stock, image, total, rmAction, idx }) => {
  const deletCart = () => {
    rmAction(idx);
  };

  return (
    <main className={styles.container}>
      <Image src={image} className={styles.left} width={100} height={89.5} alt="product picture" />
      <div className={styles.right}>
        <p>{name}</p>
        <p>{stock}x</p>
        <p>{formatRupiah(total)}</p>
      </div>
      <div onClick={deletCart} className={styles.btn}>
        <p>x</p>
      </div>
    </main>
  );
};

export default CartComponent;
