// import React, { useEffect, useState } from "react";
import { Button } from "@material-ui/core";
import Cookies from "universal-cookie";
const cookies = new Cookies();

export default function AuthComponent() {

  // logout
  const logout = () => {
    // destroy the cookie
    cookies.remove("token", { path: "/" });
    // redirect user to the landing page
    window.location.href = "/";
  };

  return (
    <>
      <Button type="submit" color="error" variant="contained" onClick={() => logout()}>
        Logout
      </Button>
    </>
  );
}
