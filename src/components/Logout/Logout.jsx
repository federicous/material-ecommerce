import { closeSharedSession } from "../sharedSession";
// import React, { useEffect, useState } from "react";
import { Box, Button } from "@material-ui/core";
import Cookies from "universal-cookie";
const cookies = new Cookies();

export default function AuthComponent() {

  // logout
  const logout = async () => {
    try { await closeSharedSession(); } catch(error) { window.alert(error.message); return; }
    // destroy the cookie


    // redirect user to the landing page
    window.location.href = "/";
  };

  return (
    <>
      <Box>
        <Button type="submit" color="error" variant="contained" onClick={() => logout()}>
          Logout
        </Button>
      </Box>
    </>
  );
}
