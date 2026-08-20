import React from "react";
import { Box, Typography, Link } from "@material-ui/core";

export default function Footer() {
  return (
    <Box
      component="footer"
      sx={{
        py: 3,
        px: 2,
        mt: "auto",
        textAlign: "center",
        width: "100%",
      }}
    >
      <Typography variant="body2" color="textSecondary">
        Desarrollado por{" "}
        <Link
          href="https://sitecnia.com.ar/"
          target="_blank"
          rel="noopener noreferrer"
          color="inherit"
          style={{ fontWeight: 600, textDecoration: "none" }}
        >
          //Sitecnia
        </Link>
      </Typography>
    </Box>
  );
}
