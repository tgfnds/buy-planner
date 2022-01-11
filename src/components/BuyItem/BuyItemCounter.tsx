import { Box, Typography } from "@mui/material";
import { useItemContext } from "../../context/ItemContextProvider";
import { ITEM_LIMIT } from "../../context/ItemContextState";

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
        / {ITEM_LIMIT}
      </Typography>
    </Box>
  );
};

export default BuyItemCounter;
