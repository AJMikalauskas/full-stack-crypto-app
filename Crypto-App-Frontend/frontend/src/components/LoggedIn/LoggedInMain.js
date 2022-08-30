//import { Typography } from "@mui/material";
import React, { useCallback, useState, useEffect } from "react";
import styles from "./LoggedInMain.module.css";
import stockBgImg from "../../images/stockBgImg.jpg";
import TableOfCryptos from "../TableOfCryptos/TableOfCryptos";

//import {List} from "react-virtualized";
// List of search results
import {Card, CardMedia, CardContent, Button, Typography, CardActions} from "@mui/material";
import testImg from "../../images/logoImg.jpg";
import Box from "@mui/material/Box";
import { shadows } from '@mui/system';
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";
import ListSubheader from '@mui/material/ListSubheader';
import LoggedInAppBar from "./LoggedInAppBar";
import axios from "../../api/axios";
import { Avatar, ListItemAvatar } from "@mui/material";
import { useNavigate, useParams, useLocation } from "react-router-dom";
import useAuth from "../../hooks/useAuth";
import useAxiosPrivate from "../../hooks/useAxiosPrivate";
import useRefreshToken from "../../hooks/useRefreshToken";
import Carousel from 'react-bootstrap/Carousel';
import testImg1 from "../../images/stockGoingUp.jpg"
import MyChart from "../TableOfCryptos/Chart";
//import {Button} from "@mui/material";
const RETRIEVE_COIN_URL = "/coins/retrieve";
const RETRIEVE_COINS_URL = "/coins/coinDataRetrieve";
const DELETE_COIN_FROM_WATCHLIST_URL="/coins/deleteCoinFromWatchlist";


const LoggedInMain = (props) => {
  // Navigating to Different URL
  // let navigate = useNavigate();
  // let location = useLocation();
  // let params = useParams();
  
  const [watchlist, setWatchlist] = useState([]);
  //const [carouselCoinData, setCarouselCoinData] = useState([]);
  const {auth} = useAuth();
  const {email} = auth;
  const axiosPrivate = useAxiosPrivate();
  const refresh = useRefreshToken();


  useEffect(() => {
    // Cancel any impending request if component unmounts, Can cancel request by abortController via signal config option in request
    let isMounted = true;
    const controller = new AbortController();
     //console.log(auth);
    async function fetchWatchList () {
      try {
        // Handling an expired refreshToken
        const response = await axiosPrivate.post(
          RETRIEVE_COIN_URL,
          JSON.stringify({ email }),
          {
            headers: { "Content-Type": "application/json" },
            signal: controller.signal
          }
        );
    //console.log(JSON.stringify(response.data));
      //console.log(response);
      const data = response?.data;
      console.log(data.watchList);
      // if isMounted is true, set watchlist, this si if the reuest is successful and not unmounted due to aborted/cancelled request.
     isMounted && setWatchlist(data.watchList);
      } catch(err) {
        console.error(err);
        // takes location their coming from, and repalces login in browser history with location they were at, sends them back to where they were
          // when the user logs back in and gets a new refreshToken --> test refresh of accessToken and resfeshToken by changing their times to 10-15s
          // took out, becuase of original call to this gettin an error always and redirecting to login page everytime.
        //navigate('/login', { state: { from: location }, replace: true });
      }
    }
    fetchWatchList();
// if request is a success, mount set to false and aborts any pending requests
return () => {
  isMounted = false;
  controller.abort();
}
// these may be unneccessary
  }, [email,axiosPrivate])

  // const [searchDataShowing, setSearchDataShowing] = useState(false);
  // function searchUiAndDataHandler(expectedParamTrue) {
  //   setSearchDataShowing(expectedParamTrue);
  //   //axios.get("http:localhost:3001/retrieve")
  // }

  const [searchFilter, setSearchFilter] = useState('');
  //let filterVal = '';
  function setSearchVal (event) {
    //console.log(searchResults)
    //console.log(searchDataShowing);
    console.log(event.target.value);
    //filterVal = event.target.value;
    //console.log(filterVal);
    setSearchFilter(event.target.value);
  }
  //console.log(searchDataResults)

//   const watchlistDummyData = [
//     {
//       symbol:"BTC",
//       name: "Bitcoin", 
//       id: "bitcoin", 
//       image: "https://assets.coingecko.com/coins/images/1/large/bitcoin.png?1547033579"
//     },
//   {
//     symbol:"ADA",
//     name: "Cardano",
//     id: "cardano",
//     image : "https://assets.coingecko.com/coins/images/975/large/cardano.png?1547034860"
//   },
//   {
//     symbol:"LINK",
//     name: "Chainlink",
//     id: "chainlink",
//     image: "https://assets.coingecko.com/coins/images/877/large/chainlink-new-logo.png?1547034700"
//   },
// ]
//console.log(params.coinName)
const getWatchlist = (watchList) => {
    setWatchlist(prev => [...prev, watchList]);
    console.log(watchList)
}

// const formatPrice = new Intl.NumberFormat("en-US", {
//   style: "currency",
//   currency: "USD",
//   minimumFractionDigits: 2,
// });

// const formatPercent = (numToConvert) => {
//   //console.log(numToConvert);
//   //let str = numToConvert.toFixed(2);
//   //console.log(str);
//   const convertedNum = `${numToConvert.toFixed(2)}%`;
//   if (numToConvert < 0) {
//     return <div style={{ color: "#b90e0a" }}>{convertedNum}</div>;
//   }
//   return <div style={{ color: "#2e7d32" }}>{convertedNum}</div>;
// };

// useEffect(() => {
//   retrieveCoinsDataFromDB();
// },[])



// Delete requesta are a bit differnet than POST requests with axios.
const removeCoinFromDb = async(name) => {
  console.log(email);
  console.log(name);
  try {
  const response = await axios.delete( DELETE_COIN_FROM_WATCHLIST_URL, {
    headers: { "Content-Type": "application/json" },
    data: { 
      email, 
      name 
    }
  });
    console.log("response from axios req",response.data);
    setWatchlist(response.data.watchList);
  } catch(err) {
    console.log(err);
  }
}
  return (
    <>
      {/* trackSearchInputHandler={searchUiAndDataHandler} */}
      <LoggedInAppBar
        //showSearchResults={searchUiAndDataHandler}
        filterValInSearch={setSearchVal}
      />
      <div className={styles.wrappingDiv1}>
        <div className={styles.wrappingDiv2}>
          <main className={styles.main}>
            {/* {searchDataShowing && searchDataResults.length > 0 ? (
              <Box
                sx={{
                  width: "100%",
                  maxWidth: 360,
                  bgcolor: "background.paper",
                }}
              >
                <nav aria-label="main mailbox folders">
                  <List>
                    {searchDataResults.map((coin) => (
                      <ListItem disablePadding>
                        <ListItemButton onClick={setSearchDataShowing(false)}>
                          <ListItemText primary={coin.name} />
                        </ListItemButton>
                      </ListItem>
                    ))}
                  </List>
                </nav>
              </Box>
            ) : ( */}
              <div className={styles.divRow}>
                <div className={styles.mainGraphTrendLists}>
                  <section className={styles.mainGraphTrendListsSection1}>
                    <h1 className={styles.h1}>Welcome To Your Portfolio - #1 Bitcoin Chart Below:</h1>
                     <div className={styles.portfolioMoneyGraph}> 
                     {/* <Button onClick={}>Add chart data to mongo</Button> */}
                     {/*  daysForChart="7"  */}
                     <MyChart coinName="bitcoin"/>
                    {/* <Carousel>
                      {carouselCoinData > 0 && carouselCoinData.map((coin) => ( 
                      <Carousel.Item interval={3000}>
                        <img
                        src={coin.image}
                        alt="coin-img"
                        />
                        <Carousel.Caption>
                          <h3>{coin.name}</h3>
                          <p>{coin.current_price}}</p>
                        </Carousel.Caption>
                         <a id="cursorPointer">
                        <Card sx={{ maxWidth: 345 }}>
                        <CardMedia
                        component="img"
                        height="140"
                        image={coin.image}
                        alt="coin img"
                          />
                          <CardContent>
                            <span>
                          <Typography gutterBottom variant="h5" component="div">
                            {coin.name}
                          </Typography>
                          <Typography gutterBottom variant="h6" component="div">
                            {formatPercent(coin.price_change_24h)}
                          </Typography>
                          </span>
                          <Typography gutterBottom variant="h3" component="div">
                              {coin.current_price}
                          </Typography>
                          </CardContent>
                        </Card>
                          </a> 
                      </Carousel.Item>
                       ))} 
                    </Carousel> */}
                     </div> 
                  </section> 
                  <section className={styles.trendingLists}>
                    <div className={styles.trendingListsDiv1}>
                      <div className={styles.trendingListsDiv2}>
                        <header>
                          <div>
                            <div className={styles.trendingListsHeaderDiv1}>
                              <h3>
                                <span
                                  className={styles.trendingListsHeaderText}
                                >
                                  Trending Cryptos
                                   <br/>
                                   {/* <Button variant="contained" onClick={() => {refresh(); console.log(auth)}}>Refresh?</Button>  */}
                                </span>
                              </h3>
                            </div>
                          </div>
                        </header>
                        <div className={styles.tableOfCryptos}>
                          <TableOfCryptos searchFilter={searchFilter} watchList={getWatchlist}/>
                        </div>
                      </div>
                    </div>
                  </section>
                </div>
                <div className={styles.col5}>
                  <div className={styles.sideBarContentSticky}>
                    <div className={styles.sideBarStickyDiv1}>
                      <div></div>
                      <div className={styles.experimentalCard}>
                          <Box sx={{ boxShadow: 3}}>
                          <List sx={{ bgcolor: "background.paper"}} component="nav" 
                          subheader={
                            <ListSubheader component="div" id="nested-list-subheader" sx={{ color: "#1976d2",          fontSize: '0.875rem',
                            fontWeight: '700'}}>
                            Watchlist
                          </ListSubheader>
                          }>
                             { watchlist.length > 0 ? watchlist.map((coin) => (
                             // navigate(`/loggedInHome/${coin.name}`)
                               <ListItem disablePadding onClick={() => {removeCoinFromDb(coin.name)}} key={coin.name}>
                                <ListItemButton>
                                  <ListItemText primary={coin.name} />
                                <ListItemAvatar>
                                  <Avatar alt="Crypto Mini Image" src={coin.image}/>
                                </ListItemAvatar>
                                </ListItemButton>
                              </ListItem> 
                            )) :
                            <>
                            </>
                            }
                          </List>
                          </Box>
                        {/* </div> */}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
          </main>
        </div>
      </div>
    </>
  );
};

export default LoggedInMain;
