import { Backdrop, CircularProgress } from "@mui/material";

export default function Loading({ loading }) {
  return (
    <Backdrop sx={{ color: "#fff" }} open={loading}>
      <CircularProgress color="info" />
    </Backdrop>
  );
}
