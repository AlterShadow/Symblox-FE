import { styled } from "@mui/material/styles";
import Tooltip, { TooltipProps, tooltipClasses } from "@mui/material/Tooltip";

const LightTooltip = styled(({ className, ...props }: TooltipProps) => (
  <Tooltip {...props} classes={{ popper: className }} />
))(({ theme }) => ({
  [`& .${tooltipClasses.tooltip}`]: {
    maxWidth: 274,
    backgroundColor: "#283C50",
    color: "#fff",
    boxShadow: theme.shadows[1],
    fontSize: 14,
    fontWeight: "400",
    fontFamily: "Barlow ,sans-serif",
    padding: "10px",
    borderRadius: "8px",
    lineHeight: "1em",
  },
  [`& .${tooltipClasses.arrow}::before`]: {
    backgroundColor: "#283C50",
  },
}));

export default LightTooltip;
