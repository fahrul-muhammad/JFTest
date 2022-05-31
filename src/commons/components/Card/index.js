import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Style from "./index.module.css";
import { formatRupiah } from "src/helpers";
import Link from "next/link";

export default function MediaCard(props) {
  return (
    <main className={Style.main}>
      <Card sx={{ maxWidth: 345 }}>
        <CardMedia component="img" height="140" image={props.photo} />
        <CardContent>
          <Typography gutterBottom variant="h5" component="div">
            {props.name}
          </Typography>
          <Typography gutterBottom variant="h5" component="div">
            {`${formatRupiah(props.price)}/Item`}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {props.desc}
          </Typography>
        </CardContent>
        <CardActions>
          <Button size="small">
            <Link href={`/product/${props.id}`} passHref>
              Click to see details
            </Link>
          </Button>
        </CardActions>
      </Card>
    </main>
  );
}
