import * as React from "react";
import { useState } from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Menu from "@mui/material/Menu";
import MenuIcon from "@mui/icons-material/Menu";
import Container from "@mui/material/Container";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import Tooltip from "@mui/material/Tooltip";
import MenuItem from "@mui/material/MenuItem";
import ShowChartIcon from "@mui/icons-material/ShowChart";
import SearchIcon from "@mui/icons-material/Search";
import { createTheme, ThemeProvider } from "@material-ui/core/styles";
import styles from "./LoggedInAppBar.module.css";
import { styled, alpha } from "@mui/material/styles";
import InputBase from "@mui/material/InputBase";
import axios from "axios";
import useLogout from "../../hooks/useLogout";
import { useNavigate } from "react-router-dom";
// import clsx from "clsx";
// import AdbIcon from '@mui/icons-material/Adb';

// const pages = ['Products', 'Pricing', 'Blog'];
const settings = ["Profile", "Account", "Dashboard", "Logout"];

// 1st Search Wrapper
const Search = styled("div")(({ theme }) => ({
  position: "relative",
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.common.black, 0.25),
  "&:hover": {
    backgroundColor: alpha(theme.palette.common.black, 0.35),
  },
  marginRight: theme.spacing(2),
  marginLeft: 0,
  width: "100%",
  [theme.breakpoints.up("sm")]: {
    marginLeft: theme.spacing(3),
    width: "auto",
  },
}));

const SearchIconWrapper = styled("div")(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: "100%",
  position: "absolute",
  pointerEvents: "none",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: "inherit",
  "& .MuiInputBase-input": {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create("width"),
    width: "100%",
    [theme.breakpoints.up("md")]: {
      width: "20ch",
    },
  },
}));

const LoggedInAppBar = (props) => {
  const [anchorElSearch, setAnchorElSearch] = useState(null);
  const [anchorElUser, setAnchorElUser] = useState(null);
  const [allCoinsError, setAllCoinsError] = useState(null);
  const [marketCapError, setMarketCapError] = useState(null);
  //const [dataInDb, setDataInDb] = useState();
  const [filteredCoins, setFilteredCoins] = useState();

  // store top 5 market caps by useState()
  const [topFiveMarketCaps, setTopFiveMarketCaps] = useState();
  const logout = useLogout();
  const navigate = useNavigate();

  // const handleOpenNavMenu = (event) => {
  //   setAnchorElNav(event.currentTarget);
  // };
  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
    console.log(event.currentTarget);
  };

  // const handleOpenSearchMenu = (event) => {
  //   setAnchorElSearch(event.currentTarget);
  //   console.log(event.currentTarget);
  // }

  // const handleCloseSearchMenu = () => {
  //   setAnchorElSearch(null);
  // };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  const signOut = async () => {
    await logout();
    navigate("/loggedOutHome");
  }

  const fetchGetDataOptions = {
    method: "GET",
    headers: {
      "X-RapidAPI-Host": "coingecko.p.rapidapi.com",
      "X-RapidAPI-Key": "3fb132f0a4msh01884afa74b3096p1653c7jsnd2db1dce89cf",
    },
  };

  const findCoinsBySearchInLimitedDb = (event) => {
    //console.log(event.target.value.length);
    if(event.target.value.length === 0)
    {
      props.showSearch(false);
    }
    if(event.target.value.length  === 1) 
    {
      event.preventDefault();
      console.log(event.target.value);
      //let idSendingUp = {id: event.target.value};
      fetch("/coinsData").then(res => {
        if(res.ok) {
          return res.json()
        }
      })
      .then(jsonRes => {
        props.searchResults(jsonRes.filter(coin => coin.name[0].toLowerCase() === event.target.value));
        //console.log(filteredCoins);
        //props.searchResults(filteredCoins);
      });
      props.showSearch(true);
    }
    else {
      props.searchResults(prevState => prevState.filter(coin => coin.name.toLowerCase().substr(0,event.target.value.length) === event.target.value));
    }


    console.log(event.target.value);
  //axios.get()
  }

  const trackSearchInputHandler =  (event) => {
 //   props.showSearchResults(true);
    // fetch("https://coingecko.p.rapidapi.com/coins/list", fetchGetDataOptions)
    //   .then((response) => {
    //     //response.json()
    //     if (response.ok) {
    //       console.log(response);
    //       return response.json();
    //     }
    //     throw response;
    //   })
    //   .then((data) => {
    //     // does .then() run synchronously somewhat by waiting for response.json() and then moves ot next step of
    //     // this data handling  and then if error, catch is called -> but also at the same time they say that
    //     // .then() runs asynchronously and asyc/await is just syntactic sugar
    //     console.log(JSON.stringify(data));
    //     console.log(data);
    //     console.log(event.target.value);
    //     //const filteredData = data.map(cryptoCoin => cryptoCoin.name[0].toLowerCase() === event.target.value);
    //     //? Should return about 1000 entries in filteredData -> use .filter() not .map() -> returned correct result
    //     //? Need to make more versatile for further typing do beyond just [0] -> used slice string pre built method
    //     const filteredData = data.filter(
    //       (cryptoCoin) =>
    //         cryptoCoin.name
    //           .slice(0, event.target.value.length)
    //           .toLowerCase() === event.target.value
    //     );
    //     console.log(filteredData);

    //     //? Now we need to only show top 5 market caps based on results -> use .sort() ->
    //     //? need to call another fetch to /coins/markets
    //     //filteredData.sort((a,b) => {});
    //     const idData = filteredData.map((coin) => coin.id);
    //     console.log(idData);
    //     const joinedIDString = idData.join("%2C");
    //     console.log(joinedIDString);
    //     //const getMarketCapsUrl =
    //     let finalUri = "";
    //     if(joinedIDString.length >8000) 
    //     {
    //       const testData = joinedIDString.slice(0,8000);
    //       //console.log(testData);
    //       const testlastIndex = testData.lastIndexOf("%2C");
    //       //console.log(testlastIndex);
    //       finalUri = testData.slice(0, testlastIndex);
    //       console.log(finalUri);
    //     }

    //     // ? Need to change this up a bit considering the URI can only be around 9000 characters with just the ids
    //       //? ${finalUri || joinedIDString}
    //     return 
    // fetch(
    //       `https://coingecko.p.rapidapi.com/coins/markets?vs_currency=usd&ids=&order=market_cap_desc`,
    //       fetchGetDataOptions
    //     )
    //       .then((response) => {
    //         if (response.ok) {
    //           console.log(response);
    //           return response.json();
    //         }
    //         throw response;
    //       })
    //       .then((marketCapData) => {
    //         //console.log(marketCapData.slice(0, 5));

    //         const needInfoForCoins = marketCapData.map(({id,symbol,name,image,current_price}) => {
    //           return {id:id,symbol:symbol,name:name,image:image,current_price:current_price};
    //         });
    //         setDataInDb(needInfoForCoins);
    //         //return fetch("http://localhost:3001/create",needInfoForCoins);
    //         console.log(needInfoForCoins);
    //         const topMarketCapsBasedOnSearch = marketCapData.slice(0, 5);
    //         setTopFiveMarketCaps(topMarketCapsBasedOnSearch);
    //         setAnchorElSearch(event.currentTarget);
    //       })
    //       .catch((error) => {
    //         console.error("Error fetching data: ", error);
    //         setMarketCapError(error);
    //       });
     // })
    //   .catch((error) => {
    //     console.error("Error fetching data: ", error);
    //     setAllCoinsError(error);
    //   });
    // .finally(() => {
    //   setLoading(false);
    // });
    // setAnchorElSearch(event.currentTarget);
    // console.log(event.currentTarget);
  };

 // console.log(topFiveMarketCaps);
  //console.log(filteredCoins);
  //props.marketCaps(topFiveMarketCaps);

  //   const theme = useTheme();
  //   <ThemeProvider theme={darkTheme}>
  // const getDataToDb = () => {
  //   // const test= {
  //   //   id: "test",
  //   //   symbol: "test",
  //   //   name: "test",
  //   //   image: "test",
  //   //   currentPrice: 123
  //   // };
  //   // {
  //   //   id: "test1",
  //   //   symbol: "test1",
  //   //   name: "test1",
  //   //   image: "test1",
  //   //   currentPrice: 1234
  //   // }]
  //   axios.post("http://localhost:3001/create", dataInDb);
  //   //const response = await fetch("http://localhost:3001/create", dataInDb);
  // }
  return (
    <AppBar position="fixed" sx={{ background: "#defade" }}>
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <Avatar sx={{ background: "#000" }}>
            <ShowChartIcon color="primary" />
          </Avatar>

          <Search>
            <SearchIconWrapper>
              <SearchIcon />
            </SearchIconWrapper>
            <StyledInputBase
              placeholder="Search Cryptos…"
              inputProps={{ "aria-label": "search" }}
              onChange={findCoinsBySearchInLimitedDb}
              //onClick={props.showSearchResults}
            />
          </Search>
          {/* <Menu
            sx={{ mt: "45px" }}
            id="menu-appbar"
            anchorEl={anchorElSearch}
            anchorOrigin={{
              vertical: "top",
              horizontal: "right",
            }}
            keepMounted
            transformOrigin={{
              vertical: "top",
              horizontal: "right",
            }}
             open={ topFiveMarketCaps != null}
             onClose={handleCloseSearchMenu}
          >
            {topFiveMarketCaps != null && topFiveMarketCaps.map((cryptoCoin) => (
              <MenuItem key={cryptoCoin.id} onClick={redirectToCrypto}>
                <Typography sx={{ paddingBottom: "10px"}}><img alt={`${cryptoCoin.name}`} src={cryptoCoin.image} height="25px" width="25px" className={styles.cryptoSymbols}/>{cryptoCoin.name}</Typography>
              </MenuItem>
            ))}
          </Menu> */}
          

          {/* onClick={getDataToDb} */}
            {/* <Button variant="contained" >
              Show Top 5 cryptos
            </Button> */}

          {/* <Box sx={{ flexGrow: 1 }}> */}
          <Tooltip title="Open settings">
            <IconButton
              onClick={handleOpenUserMenu}
              sx={{ marginLeft: "auto" }}
            >
              <Avatar sx={{ background: "#000" }} />
            </IconButton>
          </Tooltip>
          <Menu
            sx={{ mt: "45px" }}
            id="menu-appbar"
            anchorEl={anchorElUser}
            anchorOrigin={{
              vertical: "top",
              horizontal: "right",
            }}
            keepMounted
            transformOrigin={{
              vertical: "top",
              horizontal: "right",
            }}
            open={Boolean(anchorElUser)}
            onClose={handleCloseUserMenu}
          >
            {settings.map((setting) => (
              <MenuItem key={setting} onClick={setting === "Logout" ? signOut : handleCloseUserMenu}>
                <Typography textAlign="center">{setting}</Typography>
              </MenuItem>
            ))}
          </Menu>
          {/* </Box> */}
        </Toolbar>
      </Container>
    </AppBar>
    // </ThemeProvider>
  );
};

export default LoggedInAppBar;
