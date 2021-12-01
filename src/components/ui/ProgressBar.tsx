import { LinearProgress } from "@mui/material";
import { Box } from "@mui/system";
import { useItemContext } from "../../context/ItemContextProvider";

const ProgressBar = () => {
  const { loading } = useItemContext();

  return loading ? (
    <Box sx={{ width: "100%", height: "100%" }}>
      <LinearProgress />
    </Box>
  ) : null;
};

export default ProgressBar;
