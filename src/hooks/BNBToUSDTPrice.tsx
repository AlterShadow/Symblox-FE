import { useState, useEffect } from "react";
import axios from "axios";

export const BNBToUSDTPrice = () => {
  const [price, setPrice] = useState(null);

  useEffect(() => {
    const fetchPrice = async () => {
      try {
        const response = await axios.get(
          "https://api.geckoterminal.com/api/v2/simple/networks/bsc/token_price/0xbb4CdB9CBd36B01bD1cBaEBF2De08d9173bc095c"
        );
        setPrice(
          response.data.data.attributes.token_prices[
            "0xbb4cdb9cbd36b01bd1cbaebf2de08d9173bc095c"
          ]
        );
      } catch (error) {
        console.error("Error fetching BNB/USDT price:", error);
      }
    };

    fetchPrice();
  }, []);

  return price;
};
