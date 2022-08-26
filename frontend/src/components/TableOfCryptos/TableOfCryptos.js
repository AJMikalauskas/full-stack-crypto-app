import * as React from "react";
import { useEffect, useState } from "react";
import { styled } from "@mui/material/styles";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import MyChart from "./Chart";
import { Avatar, Button, ListItemAvatar } from "@mui/material";
import useAuth from "../../hooks/useAuth";
import axios from "../../api/axios";
// import Chart from 'react-google-charts';
const ADD_COIN_URL = "/coins/add";

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  "&:nth-of-type(odd)": {
    backgroundColor: theme.palette.action.hover,
  },
  // hide last border
  "&:last-child td, &:last-child th": {
    border: 0,
  },
}));

const TableOfCryptos = (props) => {
  const { auth } = useAuth();
  const [coinsData, setCoinsData] = useState([]);
  async function fetchCoins() {
    const options = {
      method: "GET",
      headers: {
        "X-RapidAPI-Host": "coingecko.p.rapidapi.com",
        "X-RapidAPI-Key": "3fb132f0a4msh01884afa74b3096p1653c7jsnd2db1dce89cf",
        //'93da5c882bmshca883f546251ac6p1f0c49jsn63020d879234'
      },
    };

    try {
      const response = await fetch(
        "https://coingecko.p.rapidapi.com/coins/markets?vs_currency=usd&price_change_percentage=1h%2C24h%2C7d&page=1&per_page=100&ids=chainlink%2Cbitcoin&order=market_cap_desc",
        options
      );
      // .then(response => response.json())
      const data = await response.json();
      if (data.length !== 0) {
        console.log(data);
        setCoinsData(data);
        return;
      }
      // if()
    } catch (error) {
      if (error.message.length > 0) {
        console.log(error.message);
        alert(error.message);
      } else {
        alert("GET Call Failed!");
      }
    }
  }
  // Fetch Data/Coins from the backend
  useEffect(() => {
    fetchCoins();
  }, []);

  const addCoinToWatchlist = async (coinData) => {
    const { email } = auth;
    try {
      const response = await axios.post(
        ADD_COIN_URL,
        JSON.stringify({ email, coinData }),
        {
          headers: { "Content-Type": "application/json" },
        }
      );

      console.log(JSON.stringify(response?.data));
      props.watchList(coinData);
    } catch (err) {
      console.log(err);
    }
  };
  // Format a current price from just a number to currency
  const formatPrice = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    minimumFractionDigits: 2,
  });

  // Format just a number to a percentage and add coloring too?
  const formatPercent = (numToConvert) => {
    const convertedNum = `${numToConvert}%`;
    if (numToConvert < 0) {
      return <div style={{ color: "#b90e0a" }}>{convertedNum}</div>;
    }
    return <div style={{ color: "#2e7d32" }}>{convertedNum}</div>;
  };

  // function createData(name, calories, fat, carbs, protein) {
  //     return { name, calories, fat, carbs, protein };
  //   }

  //   const rows = [
  //     createData('Frozen yoghurt', 159, 6.0, 24, 4.0),
  //     createData('Ice cream sandwich', 237, 9.0, 37, 4.3),
  //     createData('Eclair', 262, 16.0, 24, 6.0),
  //     createData('Cupcake', 305, 3.7, 67, 4.3),
  //     createData('Gingerbread', 356, 16.0, 49, 3.9),
  //   ];

  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 700 }} aria-label="customized table">
        <TableHead>
          <TableRow>
            <StyledTableCell>Market Cap Rank</StyledTableCell>
            <StyledTableCell align="right">Coin</StyledTableCell>
            <StyledTableCell align="right">Price</StyledTableCell>
            <StyledTableCell align="right">1h</StyledTableCell>
            <StyledTableCell align="right">24h</StyledTableCell>
            <StyledTableCell align="right">7d</StyledTableCell>
            <StyledTableCell align="right">24h Volume</StyledTableCell>
            <StyledTableCell align="right">Mkt Cap</StyledTableCell>
            <StyledTableCell align="right">Watchlist</StyledTableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {coinsData.length > 0 ? coinsData.map((coin) => (
            <StyledTableRow key={coin.name}>
              <StyledTableCell align="center" component="th" scope="row">
                {coin.market_cap_rank}
                <Avatar alt="Crypto Mini Image" src={coin.image} />
              </StyledTableCell>
              <StyledTableCell align="right">{coin.name}</StyledTableCell>
              <StyledTableCell align="right">
                {formatPrice.format(coin.current_price)}
              </StyledTableCell>
              <StyledTableCell align="right">
                {formatPercent(
                  coin.price_change_percentage_1h_in_currency.toFixed(1)
                )}
              </StyledTableCell>
              <StyledTableCell align="right">
                {formatPercent(
                  coin.price_change_percentage_24h_in_currency.toFixed(1)
                )}
              </StyledTableCell>
              <StyledTableCell align="right">
                {formatPercent(
                  coin.price_change_percentage_7d_in_currency.toFixed(1)
                )}
              </StyledTableCell>
              <StyledTableCell align="right">{`$${coin.total_volume.toLocaleString(
                "en-US"
              )}`}</StyledTableCell>
              <StyledTableCell align="right">{`$${coin.market_cap.toLocaleString(
                "en-US"
              )}`}</StyledTableCell>
              {/* Sent up props to define which crypto chart to show */}
              <StyledTableCell align="right">
                <Button
                  variant="contained"
                  onClick={() => {
                    addCoinToWatchlist({
                      name: coin.name,
                      image: coin.image,
                      price: formatPrice.format(coin.current_price),
                    });
                  }}
                >
                  Add To Watchlist
                </Button>
              </StyledTableCell>
              {/* <StyledTableCell align="right">{<MyChart coinName={coin.id} daysForChart="7" />}</StyledTableCell> */}
            </StyledTableRow>
          )): <>Test</>}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default TableOfCryptos;
