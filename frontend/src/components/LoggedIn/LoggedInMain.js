//import { Typography } from "@mui/material";
import React, { useCallback, useState, useEffect } from "react";
import styles from "./LoggedInMain.module.css";
import stockBgImg from "../../images/stockBgImg.jpg";
import TableOfCryptos from "../TableOfCryptos/TableOfCryptos";

//import {List} from "react-virtualized";
// List of search results
import testImg from "../../images/logoImg.jpg";
import Box from "@mui/material/Box";
import { shadows } from '@mui/system';
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import ListSubheader from '@mui/material/ListSubheader';
import Divider from "@mui/material/Divider";
import InboxIcon from "@mui/icons-material/Inbox";
import DraftsIcon from "@mui/icons-material/Drafts";
import LoggedInAppBar from "./LoggedInAppBar";
import axios from "../../api/axios";
import MyChart from "../TableOfCryptos/Chart";
import { Avatar, ListItemAvatar, Button } from "@mui/material";
import { useNavigate, useParams, useLocation } from "react-router-dom";
import useAuth from "../../hooks/useAuth";
import useAxiosPrivate from "../../hooks/useAxiosPrivate";
import useRefreshToken from "../../hooks/useRefreshToken";
//import {Button} from "@mui/material";
const RETRIEVE_COIN_URL = "/coins/retrieve";

const LoggedInMain = (props) => {
  // Navigating to Different URL
  let navigate = useNavigate();
  let location = useLocation();
  let params = useParams();
  
  const [watchlist, setWatchlist] = useState([]);
  const {auth} = useAuth();
  const {email} = auth;
  const axiosPrivate = useAxiosPrivate();
  const refresh = useRefreshToken();


  useEffect(() => {
    // Cancel any impending request if component unmounts, Can cancel request by abortController via signal config option in request
    let isMounted = true;
    const controller = new AbortController();
    // console.log(auth);
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

  const [searchDataShowing, setSearchDataShowing] = useState(false);
  function searchUiAndDataHandler(expectedParamTrue) {
    setSearchDataShowing(expectedParamTrue);
    //axios.get("http:localhost:3001/retrieve")
  }

  const [searchDataResults, setSearchDataResults] = useState([]);
  function settingSearchResultsData(searchResults) {
    //console.log(searchResults)
    setSearchDataResults(searchResults);
  }
  //console.log(searchDataResults)

  const watchlistDummyData = [
    {
      symbol:"BTC",
      name: "Bitcoin", 
      id: "bitcoin", 
      image: "https://assets.coingecko.com/coins/images/1/large/bitcoin.png?1547033579"
    },
  {
    symbol:"ADA",
    name: "Cardano",
    id: "cardano",
    image : "https://assets.coingecko.com/coins/images/975/large/cardano.png?1547034860"
  },
  {
    symbol:"LINK",
    name: "Chainlink",
    id: "chainlink",
    image: "https://assets.coingecko.com/coins/images/877/large/chainlink-new-logo.png?1547034700"
  },
]
//console.log(params.coinName)
const getWatchlist = (watchList) => {
    setWatchlist(prev => [...prev, watchList]);
    console.log(watchList)
}
// const addCoinsDataToDb = async () => {

//  // const response = await axios();
// }

 // let watchlistDummyData = ["Bob", "Joe", "Sally", "Herb", "Grey"];
// const [coinImgStr,setCoinImgStr] = useState();
// const imagesForCryptos = [];
//  const retrieveOnlyImages = useCallback(() => {
//    let finalResult;
//   // coinNameToFilterBy = coinImgStr;
//   fetch("/coinsImages").then(res => {
//     if(res.ok) {
//       return res.json()
//     }
//   })
//   .then(jsonRes => {
//     //props.searchResults(jsonRes.filter(coin => coin.name[0].toLowerCase() === event.target.value));
//     //console.log(filteredCoins);
//     //props.searchResults(filteredCoins);
//     //jsonRes.filter()
//     //console.log(jsonRes);
//     for(let i = 0;i < watchlistDummyData.length; i++)
//     {
//       console.log(jsonRes.filter(coin => coin.id === watchlistDummyData[i].id));
//       const filteredRes = jsonRes.filter(coin => coin.id === coinNameToFilterBy);
//       imagesForCryptos.push(filteredRes);
//     }
//     console.log(imagesForCryptos);
//     //console.log(jsonRes[0].image);
//     //let changingImgSrcs = jsonRes[0].image;
//     //console.log(filteredRes[0].image);
//     //finalResult = filteredRes[0].image;
//     //return finalResult;
//     //setCoinImgStr(finalResult);
//     //return true;
//   });
//   //console.log(finalResult);
//   //return finalResult;
//   //return true;
//  }, []);

//  useEffect(() => {
//   retrieveOnlyImages();
//  }, [retrieveOnlyImages])
  return (
    <>
      {/* trackSearchInputHandler={searchUiAndDataHandler} */}
      <LoggedInAppBar
        showSearch={searchUiAndDataHandler}
        searchResults={settingSearchResultsData}
      />
      <div className={styles.wrappingDiv1}>
        <div className={styles.wrappingDiv2}>
          <main className={styles.main}>
            {searchDataShowing ? (
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
                        <ListItemButton>
                          <ListItemText primary={coin.name} />
                        </ListItemButton>
                      </ListItem>
                    ))}
                  </List>
                </nav>
              </Box>
            ) : (
              <div className={styles.divRow}>
                <div className={styles.mainGraphTrendLists}>
                  <section className={styles.mainGraphTrendListsSection1}>
                    <h1 className={styles.h1}>Welcome To Your Portfolio - #1 Bitcoin Chart Below:</h1>
                    <div className={styles.portfolioMoneyGraph}>
                    {/* <MyChart coinName="bitcoin" daysForChart="7" /> */}
                    <MyChart coinName="bitcoin" daysForChart="7" />
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
                                  <Button variant="contained" onClick={() => {refresh(); console.log(auth)}}>Refresh?</Button>
                                </span>
                              </h3>
                            </div>
                          </div>
                        </header>
                        <div className={styles.tableOfCryptos}>
                          <TableOfCryptos watchList={getWatchlist}/>
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
                               <ListItem disablePadding onClick={() => navigate(`/loggedInHome/${coin.name}`)}>
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
            )}
          </main>
        </div>
      </div>
    </>
  );
};

export default LoggedInMain;
