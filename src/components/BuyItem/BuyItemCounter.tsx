import { Box, Typography } from "@mui/material";
import { useItemContext } from "../../context/ItemContextProvider";

const BuyItemCounter = () => {
  const { items } = useItemContext();

  return (
    <Box mt={2} mr={0.5} display="flex" alignItems="end" alignSelf="end">
      <Typography
        mr={1}
        fontFamily="comforter"
        fontWeight="bold"
        variant="h5"
      >{`${items.length}`}</Typography>
      <Typography fontFamily="comforter" fontSize={16}>
        / 100
      </Typography>
    </Box>
  );
};

export default BuyItemCounter;
