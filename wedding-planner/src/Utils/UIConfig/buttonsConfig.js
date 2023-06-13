export function getButtonConfig(color, fncOnClick, key, startIcon) {
  if (color === "purple") {
    return {
      style: {
        borderRadius: 35,
        color: "white",
        backgroundColor: "#5F41D9",
        padding: "3px 14px",
        boxShadow: "none",
      },
      variant: "contained",
      key: key,
      onClick:  fncOnClick ,
      startIcon:  startIcon ,
      size: "small",
    };
  } else if (color === "white") {
    return {
      style: {
        borderRadius: 35,
        color: "black",
        backgroundColor: "white",
        padding: "3px 14px",
        boxShadow: "none",
        border: "2px solid #E7E7EB",
      },
      variant: "contained",
      key: key,
      onClick:  fncOnClick ,
      size: "small",
      startIcon:  startIcon ,
    };
  }
}
