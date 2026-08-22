import React from "react";
import { Box, Typography, Link } from "@material-ui/core";
import FloatingAttribution from "./FloatingAttribution";

// Cambiar showFloatingBadge a true cuando se desee activar la píldora flotante
export default function Footer({ showFloatingBadge = false }) {
  return (
    <>
      {/* Píldora flotante (Opción 2) - Deshabilitada por defecto, activable pasando showFloatingBadge={true} */}
      {showFloatingBadge && <FloatingAttribution />}

      {/* Footer tradicional al fondo de la página (Opción 4) */}
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
    </>
  );
}
