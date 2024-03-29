import {
  Box,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  useColorScheme,
} from "@mui/material";
import Iconify from "./Iconfy";

export default function ModeSelect() {
  const { mode, setMode } = useColorScheme();

  const handleChange = (event) => {
    const selected = event.target.value;
    setMode(selected);
  };

  return (
    <FormControl size="small" sx={{ minWidth: 120 }}>
      <InputLabel
        id="mode-slect"
        sx={{ color: "white", "&.Mui-focused": { color: "white" } }}
      >
        Mode
      </InputLabel>
      <Select
        labelId="mode-select-id"
        value={mode}
        label="Mode"
        onChange={handleChange}
        sx={{
          color: "white",
          ".MuiOutlinedInput-notchedOutline": {
            borderColor: "white",
          },
          "&:hover .MuiOutlinedInput-notchedOutline": {
            borderColor: "white",
          },
          "&:Mui-focused .MuiOutlinedInput-notchedOutline": {
            borderColor: "white",
          },
          ".MuiSvgIcon-root": {
            color: "white",
          },
        }}
      >
        <MenuItem value="light">
          <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
            <Iconify icon={"mage:light-bulb"} /> Light
          </Box>
        </MenuItem>
        <MenuItem value="dark">
          <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
            <Iconify icon={"iconamoon:mode-dark-duotone"} /> Dark
          </Box>
        </MenuItem>
        <MenuItem value="system">
          <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
            <Iconify icon={"grommet-icons:system"} /> System
          </Box>
        </MenuItem>
      </Select>
    </FormControl>
  );
}
