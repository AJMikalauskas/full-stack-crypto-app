import React, { useState } from "react";
import Box from "@mui/material/Box";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListSubheader from '@mui/material/ListSubheader';
import LoggedInAppBar from "../LoggedIn/LoggedInAppBar";
import { useNavigate, useParams } from "react-router-dom";
import styles from "./SpecificCrypto.module.css";
import ListItemButton from "@mui/material/ListItemButton";
//import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import MyChart from "../TableOfCryptos/Chart";
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

const SpecificCrypto = (props) => {
    let navigate = useNavigate();
    let params = useParams();

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
    
    console.log(params.coinName);
    const capitalizedCoinName = params.coinName[0].toUpperCase() + params.coinName.substring(1);
    return (
        <>
            {/* <h1 style={{ marginTop: "500px"}}>{specificcryptoName}</h1> */}
            <LoggedInAppBar
        showSearch={searchUiAndDataHandler}
        searchResults={settingSearchResultsData}
      />
      <div className={styles.wrappingDiv1}>
        <div className={styles.wrappingDiv2}>
          <Container className={styles.main}>
            <Row className={styles.divRow}>
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
              <>
              <Col xs={12}>
                <h1 className={styles.nameOfCoin}>{capitalizedCoinName}</h1>
                  <section className={styles.mainGraphTrendListsSection1}>
                    <header className={styles.headerSection1}>
                      <div className={styles.marketPrice}>
                        <h2 styles={styles.marketPriceh2}>
                          <span>
                            Test
                          </span>
                        </h2>
                      </div>
                    </header>
                    <div className={styles.portfolioMoneyGraph}>
                    <MyChart coinName={params.coinName} daysForChart="1" height="196" width="676"/>
                    </div>
                  </section>
                  <section className={styles.trendingLists}>
                    <div className={styles.trendingListsDiv1}>
                      <div className={styles.trendingListsDiv2}>
                      </div>
                    </div>
                  </section>
                </Col>
                <Col xs={5}>
                  <div className={styles.sideBarContentSticky}>
                    <div className={styles.sideBarStickyDiv1}>
                      <div></div>
                      <div className={styles.experimentalCard}>
                        {/* <div className={styles.expCardDiv1}> */}
                           {/* React Virtualized List */}
                           {/* <List
                            width={600}
                            height={600}
                            rowHeight={50}
                            rowCount={watchlistDummyData.length}
                            rowRenderer={({key, index,  isScrolling, isVisible, style}) => {

                              return (
                                <>
                                <div key={key} style={style}>
                                    <a className={styles.watchlistClickable} href="/loggedInHomePage">
                                 <div className={styles.watchlistCoinSymbol}>
                                 <div className={styles.watchlistCoinSymbolInnerDiv}>
                                   <span className={styles.watchlistNameOfCoinSpan}>
                                     {watchlistDummyData[index].name}
                                   </span>
                                   </div>
                                   <div className={styles.watchlistAfterExtraInnerDiv}>
                                      <div style={{ minWidth: "0px"}}>
                                      </div>
                                   </div>
                                 </div>
                                 <div className={styles.watchlistCoinGraph}>
                                   <div>
                                     // probably need to change to dynamic for chart so that its not 400px, send in via props //
                                   <MyChart coinName={watchlistDummyData[index].name} daysForChart="1"/>
                                  </div>
                                 </div>
                                 </a>
                                </div>
                              <div key={key} styles={style}>
                                <a className={styles.watchlistClickable} href="/loggedInHomePage">
                                <div className={styles.watchlistCoinSymbol}>
                                <div className={styles.watchlistCoinSymbolInnerDiv}>
                                  <span>
                                    {watchlistDummyData[index].symbol}
                                  </span>
                                </div>
                                </div>
                                </a>
                              </div>
                              </>
                              );
                            }}
                          />  */}
                          <Box sx={{ boxShadow: 3}}>
                          <List sx={{ bgcolor: "background.paper"}} component="nav" 
                          subheader={
                            <ListSubheader component="div" id="nested-list-subheader" sx={{ color: "#1976d2",          fontSize: '0.875rem',
                            fontWeight: '700'}}>
                            Watchlist
                          </ListSubheader>
                          }>
                          {/* <ListItem >
                                <ListItemButton>
                                  <ListItemText primary="Test"/>
                                </ListItemButton>
                              </ListItem>
                              <ListItem >
                                <ListItemButton>
                                  <ListItemText primary="Test"/>
                                </ListItemButton>
                              </ListItem> */}
                             {/* {watchlistDummyData.map((coin) => (
                               // retrieveOnlyImages(coin.id) &&
                               <ListItem disablePadding onClick={() => navigate(`${coin.id}`)}>
                                <ListItemButton>
                                  <ListItemText primary={coin.name} />
                                <ListItemAvatar>
                                  {/* retrieveOnlyImages(coin.id) 
                                  <Avatar alt="Crypto Mini Image" src={coin.image}/>
                                </ListItemAvatar>
                                </ListItemButton>
                              </ListItem>
                            ))} */}
                          </List>
                          </Box>
                        {/* </div> */}
                      </div>
                    </div>
                  </div>
                </Col>
              {/* </div> */}
              </>
            )}
            </Row>
          </Container>
        </div>
      </div>
        </>
    );
}

export default SpecificCrypto;