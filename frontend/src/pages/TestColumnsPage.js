import React, { useState } from "react";
import Box from "@mui/material/Box";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListSubheader from '@mui/material/ListSubheader';
//import LoggedInAppBar from "../LoggedIn/LoggedInAppBar";
import { useNavigate, useParams } from "react-router-dom";
import styles from "../components/Cryptos/SpecificCrypto.module.css";
import ListItemButton from "@mui/material/ListItemButton";
//import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import MyChart from "../components/TableOfCryptos/Chart";
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

const TestColumnsPage = (props) => {
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
    return (
        <>
            {/* <h1 style={{ marginTop: "500px"}}>{specificcryptoName}</h1> */}
            {/* <LoggedInAppBar
        showSearch={searchUiAndDataHandler}
        searchResults={settingSearchResultsData}
      /> */}
      <div className={styles.wrappingDiv1}>
        <div className={styles.wrappingDiv2}>
          <Container className={styles.main}>
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
            <div>
                <Row className={styles.divRow}>
              <Col xs={12}>
                <div className={styles.mainGraphTrendLists}>
                  <section className={styles.mainGraphTrendListsSection1}>
                    <h1 className={styles.h1}>Test Graph below</h1>
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
                </div>
                </Col>
                <Col xs={5}>
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
                          <ListItem >
                                <ListItemButton>
                                  <ListItemText primary="Test"/>
                                </ListItemButton>
                              </ListItem>
                              <ListItem >
                                <ListItemButton>
                                  <ListItemText primary="Test1"/>
                                </ListItemButton>
                              </ListItem>
                          </List>
                          </Box>
                      </div>
                    </div>
                  </div>
                </Col>
            </Row>
            </div>
            )}
          </Container>
        </div>
      </div>
        </>
    );
}

export default TestColumnsPage;