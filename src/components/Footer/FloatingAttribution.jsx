import React from "react";
import { Box, Typography, useMediaQuery, useTheme } from "@material-ui/core";

export default function FloatingAttribution() {
  const theme = useTheme();
  const isMobile = useMediaQuery("(max-width:900px)");
  const isDark = theme.palette.mode === "dark" || theme.palette.type === "dark";

  return (
    <Box
      component="a"
      href="https://sitecnia.com.ar/"
      target="_blank"
      rel="noopener noreferrer"
      sx={{
        position: "fixed",
        bottom: 14,
        left: isMobile ? 14 : 266,
        zIndex: 1200,
        display: "inline-flex",
        alignItems: "center",
        px: 1.5,
        py: 0.5,
        borderRadius: "20px",
        backgroundColor: isDark ? "rgba(30, 30, 30, 0.85)" : "rgba(255, 255, 255, 0.85)",
        backdropFilter: "blur(8px)",
        boxShadow: isDark
          ? "0 2px 8px rgba(0,0,0,0.5)"
          : "0 2px 8px rgba(0,0,0,0.12)",
        border: isDark
          ? "1px solid rgba(255,255,255,0.12)"
          : "1px solid rgba(0,0,0,0.08)",
        textDecoration: "none",
        color: isDark ? "#aaa" : "#555",
        transition: "all 0.25s ease-in-out",
        cursor: "pointer",
        "&:hover": {
          backgroundColor: isDark ? "rgba(45, 45, 45, 0.95)" : "rgba(255, 255, 255, 0.98)",
          boxShadow: isDark
            ? "0 4px 14px rgba(0,0,0,0.7)"
            : "0 4px 14px rgba(0,0,0,0.2)",
          transform: "translateY(-2px)",
        },
      }}
    >
      <Typography
        variant="caption"
        style={{
          fontSize: "0.72rem",
          fontWeight: 500,
          letterSpacing: "0.2px",
          color: isDark ? "#bbb" : "#666",
        }}
      >
        Desarrollado por{" "}
        <strong style={{ color: isDark ? "#fff" : "#111", fontWeight: 700, marginLeft: 2 }}>
          //Sitecnia
        </strong>
      </Typography>
    </Box>
  );
}
