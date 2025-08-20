import { Button } from "@mui/material";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import configColor from "~/color/configColor";
import { type ReactNode } from "react";

interface ButtonComponentProps {
  children: ReactNode;
  onClick?: () => void;
  backgroundComponent: string;
  backgroundHover: string;
  border?: string;
}

export default function ButtonComponent({
  onClick,
  backgroundComponent,
  backgroundHover,
  children,
  border,
}: ButtonComponentProps) {
  return (
    <Button
      onClick={onClick}
      endIcon={<ArrowForwardIcon />}
      sx={{
        background: backgroundComponent,
        color: configColor.white,
        fontWeight: "bold",
        textTransform: "none",
        borderRadius: "12px",
        paddingX: 3,
        paddingY: 1.2,
        fontSize: "1rem",
        "&:hover": {
          background: backgroundHover,
        },
        width: "max-content",
        border,
      }}
    >
      {children}
    </Button>
  );
}
