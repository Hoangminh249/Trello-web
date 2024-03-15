import React from "react";
import PopupState, { bindTrigger, bindMenu } from "material-ui-popup-state";
import { Button, Menu, MenuItem } from "@mui/material";
import Iconify from "../../Iconfy";

function Recent() {
  return (
    <PopupState variant="popover" popupId="demo-popup-menu">
      {(popupState) => (
        <React.Fragment>
          <Button
            endIcon={<Iconify icon={"ic:baseline-expand-more"} />}
            sx={{
              "& .MuiButton-endIcon": {
                marginLeft: "0px",
              },
              color: "white",
            }}
            {...bindTrigger(popupState)}
          >
            Recent
          </Button>
          <Menu {...bindMenu(popupState)}>
            <MenuItem onClick={popupState.close}>Profile</MenuItem>
            <MenuItem onClick={popupState.close}>My account</MenuItem>
            <MenuItem onClick={popupState.close}>Logout</MenuItem>
          </Menu>
        </React.Fragment>
      )}
    </PopupState>
  );
}

export default Recent;
