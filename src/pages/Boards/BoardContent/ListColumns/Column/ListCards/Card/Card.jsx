import {
  Button,
  Card as MuiCard,
  CardActions,
  CardContent,
  CardMedia,
  Typography,
} from "@mui/material";
import Iconify from "~/components/Iconfy";
function Card({ temp }) {
  if (temp) {
    return (
      <MuiCard
        sx={{
          cursor: "pointer",
          boxShadow: "0 1px 1px rgba(0,0,0,0.2)",
          overflow: "unset",
        }}
      >
        <CardContent sx={{ pd: 1.5, "&:last-child": { p: 1.5 } }}>
          <Typography>Lizard</Typography>
        </CardContent>
      </MuiCard>
    );
  }
  return (
    <MuiCard
      sx={{
        cursor: "pointer",
        boxShadow: "0 1px 1px rgba(0,0,0,0.2)",
        overflow: "unset",
      }}
    >
      <CardMedia
        sx={{ height: 140 }}
        image="/assets/images/profile-image.jpg"
        title="green iguana"
      />
      <CardContent sx={{ pd: 1.5, "&:last-child": { p: 1.5 } }}>
        <Typography>Lizard</Typography>
      </CardContent>
      <CardActions sx={{ p: "0 4px 8px 4px" }}>
        <Button
          size="small"
          startIcon={
            <Iconify icon="material-symbols:group" width={18} height={18} />
          }
        >
          15
        </Button>
        <Button
          size="small"
          startIcon={
            <Iconify icon="material-symbols:comment" width={18} height={18} />
          }
        >
          20
        </Button>
        <Button
          size="small"
          startIcon={
            <Iconify
              icon="material-symbols:attachment"
              width={18}
              height={18}
            />
          }
        >
          2
        </Button>
      </CardActions>
    </MuiCard>
  );
}

export default Card;
