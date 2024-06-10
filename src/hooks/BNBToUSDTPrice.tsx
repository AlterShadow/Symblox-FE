import { useState, useEffect } from "react";
import axios from "axios";

export const BNBToUSDTPrice = () => {
  const [price, setPrice] = useState(null);

  useEffect(() => {
    const fetchPrice = async () => {
      try {
        const response = await axios.get(
          "https://api.binance.com/api/v3/ticker/price",
          {
            params: {
              symbol: "BNBUSDT",
            },
          }
        );
        setPrice(response.data.price);
      } catch (error) {
        console.error("Error fetching BNB/USDT price:", error);
      }
    };

    fetchPrice();
  }, []);

  return price;
};
