import React from "react";
import Layout from "../Layout/Layout";
//import { Link } from "react-router-dom";
import { Avatar, Paper, Card, CardMedia, Button, Divider, Link } from "@mui/material";
import { Typography, Grid } from "@mui/material";
import { Box, fontSize, lineHeight } from "@mui/system";
import { ThemeProvider, styled, createTheme } from "@mui/material/styles";
//import Typewriter from "typewriter-effect";
//import TypeWriterEffect from "react-typewriter-effect";
import Typical from "react-typical";
import jumboBgImg from "../../images/jumboBgImg.jpg";
import AccessTimeFilledIcon from "@mui/icons-material/AccessTimeFilled";
import AccountBalanceWalletIcon from "@mui/icons-material/AccountBalanceWallet";
import MailIcon from "@mui/icons-material/Mail";
import stockGoingUp from "../../images/stockGoingUp.jpg";
import logo from "../../images/logoImg.jpg";
import { useNavigate } from "react-router-dom";

const fontSize1 = 14;
const htmlFontSize = 16;
const coef = fontSize1 / 14;

const mainJumboTheme = createTheme({
  breakpoints: {
    values: {
      xxs: 0, // small phone
      xs: 300, // phone
      sm: 600, // tablets
      md: 900, // small laptop
      lg: 1200, // desktop
      xl: 1536, // large screens
    },
  },
  //   Have to define Typography tags variant of h2 or else an error will throw for some weird reason
  // This error is probably because I'm defining a new theme in here which means I can't really access the default theme when
  // this typography tag is wrapped in another theme -> im assuming
  // if add variant of h6 without definition, inherits from h2 variant, need to set h6 variant css styles
  typography: {
    pxToRem: (size) => `${(size / htmlFontSize) * coef}rem`,
    h2: {
      fontSize: "36px",
      fontWeight: "bold",
    },
    h3: {
      color: "#1976d2",
      margin: "0px 0px 0.35em",
      fontFamily: "Inter, sans-serif",
      fontSize: "1.5625rem",
      lineHeight: 1.235,
      textAlign: "center",
      // color: "rgb(30, 32, 34)",
      fontWeight: 700,
    },
    h4: {
      display: "block",
      marginBlockStart: "1.33em",
      marginBlockEnd: "1.33em",
      marginInlineStart: "0px",
      marginInlineEnd: "0px",
      fontWeight: "bold",
    },
    h6: {
      fontSize: "13px",
      fontWeight: 500,
    },
    body1: {
      margin: "0px",
      fontFamily: "Inter, sans-serif",
      fontWeight: 400,
      fontSize: "1rem",
      lineHeight: 1.5,
      textAlign: "center",
      color: "rgb(103, 119, 136)",
    },
    p: {
      display: "block",
      marginBlockStart: "1em",
      marginBlockEnd: "1em",
      marginInlineStart: "0px",
      marginInlineEnd: "0px",
    },
    hr: {
      display: "block",
      unicodeBidi: "isolate",
      marginBlockStart: "0.5em",
      marginBlockEnd: "0.5em",
      marginInlineStart: "auto",
      marginInlineEnd: "auto",
      overflow: "hidden",
      borderStyle: "inset",
      borderWidth: "1px",
    },
  },
});

// Base Theme, very interesting, use for breakpoints in second box as Mui Avatar tags cannot be in custom theme without weird pxtorem error and more
// const Root = styled('div')(({ theme }) => ({
//     // padding: theme.spacing(1),
//     [theme.breakpoints.up('sm')]: {
//         flexBasis: "100%",
//         flexGrow: 0,
//         maxWidth: "100%",
//         WebkitBoxFlex: 0
//     },
//     [theme.breakpoints.up('md')]: {
//         flexBasis: "100%",
//         flexGrow: 0,
//         maxWidth: "33.33%",
//         WebkitBoxFlex: 0
//     },
//   }));

const LoggedOutHome = (props) => {
    let navigate = useNavigate();
  return (
    <Layout>
      <ThemeProvider theme={mainJumboTheme}>
        {/* // Main Box -> Could seem like jumbotron in bootstrap
            //  , position: "relative" backgroundRepeat: "repeat-x" background: "linear-gradient(rgba(255, 255, 255, 0), rgb(247, 250, 255) 100%)", */}
        <Box
          sx={{
            backgroundImage:
              "linear-gradient(rgba(0, 0, 0, 0.5),rgba(0, 0, 0, 0.5)),",
            backgroundRepeat: "repeat-x",
            position: "relative",
          }}
        >
          <Box
            component="img"
            sx={{
              boxShadow: 3,
              height: "500px",
              width: "100%",
              position: "absolute",
            }}
            alt="cryptoBgImg"
            src={jumboBgImg}
          />
          <Box
            sx={{
              paddingTop: "0px",
              paddingBottom: "0px",
              position: "relative",
              color: "white",
              textAlign: "center",
              [mainJumboTheme.breakpoints.up("sm")]: {
                paddingTop: "4rem",
                paddingBottom: "4rem",
              },
              [mainJumboTheme.breakpoints.up("md")]: {
                paddingTop: "2rem",
                paddingBottom: "6rem",
              },
            }}
          >
            <Box
              sx={{
                paddingTop: "32px",
                paddingBottom: "32px",
                paddingLeft: "20px",
                position: "relative",
                [mainJumboTheme.breakpoints.up("sm")]: {
                  paddingTop: "48px",
                  paddingBottom: "48px",
                //  paddingLeft: "25%",
                 // maxWidth: "720px",
                },
                [mainJumboTheme.breakpoints.up("md")]: {
                  paddingTop: "64px",
                  paddingBottom: "64px",
                 // paddingLeft: "30%",
                  //maxWidth: "1236px",
                },
              }}
            >
              <Box
                // sx={{
                //   maxWidth: "100%",
                //   position: "relative",
                //   [mainJumboTheme.breakpoints.up("sm")]: { maxWidth: "50%" },
                // }}
                sx={{
                  alignContent: "center"
                }}
              >
                <Typography variant="h2" gutterBottom>
                  Invest your money
                  <br />
                  {/* Use mui typography tag here for auto type in effect */}
                  {/* <span data-period="2000" data-rotate='["Crypto", "Stocks", "ETFs", "NFTs"]'></span> */}
                  {/* Use typewriter effect import from geeksforgeeks.org */}
                  {/* <Typewriter onInit={(typewriter) => {typewriter.typeString("Stocks").pauseFor(1000).deleteAll().typeString("Crypto")
                        .pauseFor(1000).deleteAll().typeString("ETFs").pauseFor(1000).deleteAll().typeString("NFTs").start()}}/> */}
                  {/* <TypeWriterEffect 
                            textStyle={{
                                fontFamily: 'Red Hat Display',
                                color: '#3F3D56',
                                fontWeight: 500,
                                fontSize: '1.5em',
                              }}
                            startDelay={2000}
                            cursorColor="#3F3D56"
                            multiText={[
                              'Hey there, This is a type writer animation package',
                              'it consist of two types...',
                              'Single text display and multi text display',
                              'Fonts can be customized.',
                              'The type speed can be customized as well',
                            ]}
                            multiTextDelay={1000}
                            typeSpeed={30}/> */}
                  {/* <span style={{ color : "#1976d2", display: "inline", margin: "0px" }}></span></Typography> */}
                  {/* <mark style={{ display: "inline-block", paddingBottom: "0.5em", lineHeight: "0em" }}> </mark> rgba(249, 185, 52, 0.3)*/}
                  <span>
                    into{" "}
                    <span
                      style={{
                        color: "#ADD8e6",
                        background:
                          "linear-gradient(transparent 82%, #90ee90 0%)",
                      }}
                    >
                      <Typical
                        wrapper="b"
                        loop={Infinity}
                        steps={[
                          "Stocks 📈",
                          3000,
                          "Cryptos 🚀",
                          3000,
                          "ETFs 💸",
                          3000,
                          "NFTs🐒",
                          3000,
                        ]}
                      />
                    </span>
                  </span>
                  {/* /</span> */}
                </Typography>
                <Typography variant="h6">
                  The best modernized way to invest in the ever expanding market
                  of crypto and stocks!
                </Typography>
                <Box sx={{ display: "flex", marginTop: "32px" }}>
                  <Button
                    variant="contained"
                    size="large"
                    tabIndex={0}
                    sx={{
                      display: "block",
                      WebkitBoxAlign: "center",
                      alignItems: "center",
                      WebkitBoxPack: "center",
                      justifyContent: "center",
                      position: "relative",
                      boxSizing: "border-box",
                      WebkitTapHighlightColor: "transparent",
                      outline: "0px",
                      border: "0px",
                      margin: "0px auto",
                      cursor: "pointer",
                      userSelect: "none",
                      verticalAlign: "middle",
                      appearance: "none",
                      textDecoration: "none",
                      textTransform: "none",
                      fontFamily: "Inter, sans-serif",
                      fontSize: "0.9375rem",
                      lineHeight: 1.75,
                      minWidth: "64px",
                      padding: "10px 22px",
                      transition:
                        "background-color 250ms cubic-bezier(0.4, 0, 0.2, 1) 0ms, box-shadow 250ms cubic-bezier(0.4, 0, 0.2, 1) 0ms, border-color 250ms cubic-bezier(0.4, 0, 0.2, 1) 0ms, color 250ms cubic-bezier(0.4, 0, 0.2, 1) 0ms",
                      color: "rgb(255, 255, 255)",
                      backgroundColor: "#1976d2",
                      boxShadow: "rgb(140 152 164 / 10%) 0px 12px 15px",
                      fontWeight: 400,
                      borderRadius: "5px",
                    }}
                    onClick={() => { navigate("/signUp")}}
                  >
                    {/* Redirect to login/sign up page */}
                    {/* <Link to="/loggedOutHomePage"> */}
                    Get Started
                    {/* </Link> */}
                  </Button>
                  {/* <Box sx={{[mainJumboTheme.breakpoints.up('xxs')]: { marginTop: "16px", width: "100%" }, 
                  [mainJumboTheme.breakpoints.up('sm')]: { marginTop: "0px", marginLeft: "16px" },
                  [mainJumboTheme.breakpoints.up('md')]: { width: "auto" }}}>
             <Button variant="outlined" size="large" tabIndex={0} sx={{ display: "inline-flex", WebkitBoxAlign: "center", alignItems: "center", WebkitBoxPack: "center",
    justifyContent: "center", position: "relative", boxSizing: "border-box", WebkitTapHighlightColor: "transparent", outline: "0px", margin: "0px",
    cursor: "pointer", userSelect: "none", verticalAlign: "middle", appearance: "none", textDecoration: "none", textTransform: "none", fontFamily: "Inter, sans-serif",
    fontSize: "0.9375rem", lineHeight: 1.75, minWidth: "64px", padding: "10px 21px", transition: "background-color 250ms cubic-bezier(0.4, 0, 0.2, 1) 0ms, box-shadow 250ms cubic-bezier(0.4, 0, 0.2, 1) 0ms, border-color 250ms cubic-bezier(0.4, 0, 0.2, 1) 0ms, color 250ms cubic-bezier(0.4, 0, 0.2, 1) 0ms"
    , border: "1px solid rgba(55, 125, 255, 0.5)",fontWeight: 400, borderRadius: "5px"}}>
        Login
    </Button>
        </Box> */}
                </Box>
              </Box>
            </Box>
          </Box>
        </Box>
      </ThemeProvider>
      {/*  Add path/svg to split box sections */}
      {/* May just add divider or horizontal ruler */}

      {/* //  Second Box, Mostly Dummy, and simple text > marginTop: "50px", */}
      {/* Cannot have custom theme and avatar tags, use base theme for now as seen in Root function/constant above. */}
      <ThemeProvider theme={mainJumboTheme}>
        <Box
          sx={{
            width: "100%",
            margin: "0px auto",
            marginTop: "100px",
            //paddingLeft: "16px",
           // paddingRight: "16px",
            [mainJumboTheme.breakpoints.up("sm")]: {
              paddingTop: "48px",
              paddingBottom: "48px",
            //  maxWidth: "720px",
            },
            [mainJumboTheme.breakpoints.up("lg")]: {
             // paddingTop: "64px",
              // paddingBottom: "64px",
             // maxWidth: "1400px",
            },
          }}
        >
          {/* Have no clue why this empty box div is here */}
          <Box>
            <Box sx={{ marginBottom: "32px" }}>
              <Box sx={{ marginBottom: "16px" }}>
                <Typography
                  sx={{
                    [mainJumboTheme.breakpoints.up("sm")]: {
                      fontSize: "1.0219rem",
                    },
                    [mainJumboTheme.breakpoints.up("md")]: {
                      fontSize: "2.0243rem",
                    },
                  }}
                  variant="h3"
                  gutterBottom
                >
                  Start Investing In Minutes
                </Typography>
                <Typography
                  sx={{
                    margin: "0px",
                    font: "Inter, sans-serif",
                    fontSize: "1.125rem",
                    lineHeight: 1.6,
                    textAlign: "center",
                    color: "rgb(103, 119, 136)",
                    fontWeight: 400,
                    [mainJumboTheme.breakpoints.up("sm")]: {
                      fontSize: "1.125rem",
                    },
                    [mainJumboTheme.breakpoints.up("md")]: {
                      fontSize: "1.125rem",
                    },
                  }}
                  variant="h6"
                >
                  Investing has finally been made easy, an all-in-one crypto and
                  stock buying platform
                </Typography>
              </Box>
            </Box>
            <Grid
              container
              spacing={2}
              sx={{
                boxSizing: "border-box",
                display: "flex",
                flexFlow: "row wrap",
                marginTop: "-16px",
                width: "calc(100% + 16px)",
                marginLeft: "-16px",
              }}
            >
              <Grid
                item
                xs={4}
                sx={{
                  boxSizing: "border-box",
                  margin: "0px",
                  flexDrection: "row",
                  paddingTop: "16px",
                  paddingLeft: "16px",
                  [mainJumboTheme.breakpoints.up("sm")]: {
                    flexBasis: "100%",
                    flexGrow: 0,
                    maxWidth: "100%",
                    WebkitBoxFlex: 0,
                  },
                  [mainJumboTheme.breakpoints.up("md")]: {
                    flexBasis: "100%",
                    flexGrow: 0,
                    maxWidth: "33.33%",
                    WebkitBoxFlex: 0,
                  },
                }}
              >
                <Box sx={{ width: "100%", height: "100%" }}>
                  <Box
                    sx={{
                      display: "flex",
                      flexDirection: "column",
                      WebkitBoxAlign: "center",
                      alignItems: "center",
                    }}
                  >
                    <Avatar sx={{ color: "#1976d2" }}>
                      {/* <svg height= "24" width="24" fill="none" stroke="currentColor"> */}
                      <AccessTimeFilledIcon />
                      {/* </svg> */}
                    </Avatar>
                    <Typography
                      sx={{
                        margin: "0px 0px 0.35rem",
                        fontFamily: "Inter, sans-serif",
                        lineHeight: "1.6",
                        fontSize: "1.125rem",
                        textAlign: "center",
                        fontWeight: 500,
                        [mainJumboTheme.breakpoints.up("sm")]: {
                          fontSize: "1.25rem",
                        },
                      }}
                      variant="h6"
                      gutterBottom
                    >
                      Speedy Transactions
                    </Typography>
                    <Typography variant="body1">
                      This website will make your life easier by speeding up
                      transactions in crypto, stocks, NFTs, and more!
                    </Typography>
                  </Box>
                </Box>
              </Grid>
              <Grid
                item
                xs={4}
                sx={{
                  boxSizing: "border-box",
                  margin: "0px",
                  flexDrection: "row",
                  paddingTop: "16px",
                  paddingLeft: "16px",
                  [mainJumboTheme.breakpoints.up("sm")]: {
                    flexBasis: "100%",
                    flexGrow: 0,
                    maxWidth: "100%",
                    WebkitBoxFlex: 0,
                  },
                  [mainJumboTheme.breakpoints.up("md")]: {
                    flexBasis: "100%",
                    flexGrow: 0,
                    maxWidth: "33.33%",
                    WebkitBoxFlex: 0,
                  },
                }}
              >
                <Box sx={{ width: "100%", height: "100%" }}>
                  <Box
                    sx={{
                      display: "flex",
                      flexDirection: "column",
                      WebkitBoxAlign: "center",
                      alignItems: "center",
                    }}
                  >
                    <Avatar sx={{ color: "#1976d2" }}>
                      {/* <svg height= "24" width="24" fill="none" stroke="currentColor"> */}
                      <AccountBalanceWalletIcon />
                      {/* </svg> */}
                    </Avatar>
                    <Typography
                      sx={{
                        margin: "0px 0px 0.35rem",
                        fontFamily: "Inter, sans-serif",
                        lineHeight: "1.6",
                        fontSize: "1.125rem",
                        textAlign: "center",
                        fontWeight: 500,
                        [mainJumboTheme.breakpoints.up("sm")]: {
                          fontSize: "1.25rem",
                        },
                      }}
                      variant="h6"
                      gutterBottom
                    >
                      Secured Money
                    </Typography>
                    <Typography variant="body1">
                      We have 24/7 customer support in case any money goes
                      missing. Provides advanced wallet security!
                    </Typography>
                  </Box>
                </Box>
              </Grid>
              <Grid
                item
                xs={4}
                sx={{
                  boxSizing: "border-box",
                  margin: "0px",
                  flexDrection: "row",
                  paddingTop: "16px",
                  paddingLeft: "16px",
                  [mainJumboTheme.breakpoints.up("sm")]: {
                    flexBasis: "100%",
                    flexGrow: 0,
                    maxWidth: "100%",
                    WebkitBoxFlex: 0,
                  },
                  [mainJumboTheme.breakpoints.up("md")]: {
                    flexBasis: "100%",
                    flexGrow: 0,
                    maxWidth: "33.33%",
                    WebkitBoxFlex: 0,
                  },
                }}
              >
                <Box sx={{ width: "100%", height: "100%" }}>
                  <Box
                    sx={{
                      display: "flex",
                      flexDirection: "column",
                      WebkitBoxAlign: "center",
                      alignItems: "center",
                    }}
                  >
                    <Avatar sx={{ color: "#1976d2" }}>
                      {/* <svg height= "24" width="24" fill="none" stroke="currentColor"> */}
                      <MailIcon />
                      {/* </svg> */}
                    </Avatar>
                    <Typography
                      sx={{
                        margin: "0px 0px 0.35rem",
                        fontFamily: "Inter, sans-serif",
                        lineHeight: "1.6",
                        fontSize: "1.125rem",
                        textAlign: "center",
                        fontWeight: 500,
                        [mainJumboTheme.breakpoints.up("sm")]: {
                          fontSize: "1.25rem",
                        },
                      }}
                      variant="h6"
                      gutterBottom
                    >
                      Weekly Newsletter
                    </Typography>
                    <Typography variant="body1">
                      Never miss a beat on current trends in every market
                      available by our informational Newsletter!
                    </Typography>
                  </Box>
                </Box>
              </Grid>
            </Grid>
          </Box>
        </Box>
      </ThemeProvider>
      <Box
        sx={{
          boxShadow: 3,
          background: "#c5e3ec",
          width: "97%",
          margin: "0px auto",
          marginTop: "50px",
          paddingLeft: "16px",
          paddingRight: "16px",
          marginRight: "20px",

          [mainJumboTheme.breakpoints.up("sm")]: {
            paddingTop: "48px",
            paddingBottom: "48px",
           // maxWidth: "720px",
          },
          [mainJumboTheme.breakpoints.up("lg")]: {
            paddingTop: "64px",
            paddingBottom: "64px",
           // maxWidth: "1px",
          },
        }}
      >
        <Box>
          <Grid
            container
            spacing={4}
            sx={{
              boxSizing: "border-box",
              display: "flex",
              flexFlow: "row wrap",
              marginTop: "-32px",
              width: "calc(100% + 32px)",
              marginLeft: "-32px",
            }}
          >
            {/* Will occupy full grid if xs range, will occupy only half of grid if md size of screen > md is 900px */}
            <Grid
              item
              xs={12}
              md={6}
              sx={{
                boxSizing: "border-box",
                flexDirection: "row",
                flexBasis: "100%",
                margin: "0px",
                WebkitBoxFlex: 0,
                flexGrow: 0,
                maxWidth: "100%",
                [mainJumboTheme.breakpoints.up("sm")]: {
                  flexBasis: "100%",
                  flexGrow: 0,
                  maxWidth: "100%",
                  WebkitBoxFlex: 0,
                },
                [mainJumboTheme.breakpoints.up("md")]: {
                  flexBasis: "100%",
                  flexGrow: 0,
                  maxWidth: "50%",
                  WebkitBoxFlex: 0,
                },
              }}
            >
              <Box sx={{ marginBottom: "32px" }}>
                <Typography
                  variant="h4"
                  sx={{
                    margin: "0px 0px 0.35em",
                    fontFamily: "Inter, sans-serif",
                    fontSize: "1.5625rem",
                    lineHeight: 1.235,
                    fontWeight: 700,
                    [mainJumboTheme.breakpoints.up("sm")]: {
                      fontSize: "1.8219rem",
                    },
                    [mainJumboTheme.breakpoints.up("md")]: {
                      fontSize: "2.0243rem",
                    },
                  }}
                  gutterBottom
                >
                  The powerful and flexible trading platform for all kinds of
                  people
                </Typography>
                <Typography
                  variant="h6"
                  sx={{
                    margin: "0px",
                    fontFamily: "Inter, sans-serif",
                    fontWeight: 500,
                    fontSize: "1.125rem",
                    lineHeight: 1.6,
                    color: "rgb(103, 119, 136)",
                    [mainJumboTheme.breakpoints.up("sm")]: { fontSize: "1rem" },
                  }}
                >
                  Whether you're buying cryptocurrency, minting an NFT, storing
                  money in ETFs, or flexing your money to your friends, this
                  website helps you have the best possible experience while
                  investing.
                </Typography>
              </Box>
              <Grid
                container
                spacing={2}
                sx={{
                  boxSizing: "border-box",
                  display: "flex",
                  flexFlow: "row wrap",
                  marginTop: "-16px",
                  width: "calc(100% + 16px)",
                  marginLeft: "-16px",
                }}
              >
                <Grid
                  item
                  xs={12}
                  md={4}
                  sx={{
                    boxSizing: "border-box",
                    margin: "0px",
                    flexDirection: "row",
                    flexBasis: "100%",
                    WebkitBoxFlex: 0,
                    flexGrow: 0,
                    maxWidth: "100%",
                  }}
                >
                  <Typography
                    variant="h4"
                    sx={{
                      margin: "0px 0px 0.35em",
                      fontFamily: "Inter, sans-serif",
                      fontWeight: 400,
                      fontSize: "1.25rem",
                      lineHeight: 1.235,
                      color: "#1976d2",
                      [mainJumboTheme.breakpoints.up("sm")]: {
                        fontSize: "1.5rem",
                      },
                      [mainJumboTheme.breakpoints.up("md")]: {
                        fontSize: "1.75rem",
                      },
                    }}
                    gutterBottom
                  >
                    500k
                  </Typography>
                  <Typography
                    variant="p"
                    sx={{
                      margin: "0px",
                      fontFamily: "Inter, sans-serif",
                      fontWeight: 400,
                      fontSize: "1rem",
                      lineHeight: 1.5,
                      color: "rgb(103, 119, 136)",
                    }}
                  >
                    500k + already being traded using our platform, don't be one
                    of thos people who FOMOs our website.
                  </Typography>
                </Grid>
                <Grid
                  item
                  xs={12}
                  md={4}
                  sx={{
                    boxSizing: "border-box",
                    margin: "0px",
                    flexDirection: "row",
                    flexBasis: "100%",
                    WebkitBoxFlex: 0,
                    flexGrow: 0,
                    maxWidth: "100%",
                  }}
                >
                  <Typography
                    variant="h4"
                    sx={{
                      margin: "0px 0px 0.35em",
                      fontFamily: "Inter, sans-serif",
                      fontWeight: 400,
                      fontSize: "1.25rem",
                      lineHeight: 1.235,
                      color: "#1976d2",
                      [mainJumboTheme.breakpoints.up("sm")]: {
                        fontSize: "1.5rem",
                      },
                      [mainJumboTheme.breakpoints.up("md")]: {
                        fontSize: "1.75rem",
                      },
                    }}
                    gutterBottom
                  >
                    100+
                  </Typography>
                  <Typography
                    variant="p"
                    sx={{
                      margin: "0px",
                      fontFamily: "Inter, sans-serif",
                      fontWeight: 400,
                      fontSize: "1rem",
                      lineHeight: 1.5,
                      color: "rgb(103, 119, 136)",
                    }}
                  >
                    250+ stocks already being traded and more are to come. More
                    Cyprots, NFTs and more coming too.
                  </Typography>
                </Grid>
                <Grid
                  item
                  xs={12}
                  md={4}
                  sx={{
                    boxSizing: "border-box",
                    margin: "0px",
                    flexDirection: "row",
                    flexBasis: "100%",
                    WebkitBoxFlex: 0,
                    flexGrow: 0,
                    maxWidth: "100%",
                  }}
                >
                  <Typography
                    variant="h4"
                    sx={{
                      margin: "0px 0px 0.35em",
                      fontFamily: "Inter, sans-serif",
                      fontWeight: 400,
                      fontSize: "1.25rem",
                      lineHeight: 1.235,
                      color: "#1976d2",
                      [mainJumboTheme.breakpoints.up("sm")]: {
                        fontSize: "1.5rem",
                      },
                      [mainJumboTheme.breakpoints.up("md")]: {
                        fontSize: "1.75rem",
                      },
                    }}
                    gutterBottom
                  >
                    100%
                  </Typography>
                  <Typography
                    variant="p"
                    sx={{
                      margin: "0px",
                      fontFamily: "Inter, sans-serif",
                      fontWeight: 400,
                      fontSize: "1rem",
                      lineHeight: 1.5,
                      color: "rgb(103, 119, 136)",
                    }}
                  >
                    100% customer satisfaction with great reviews, We have
                    amazing customer support and more.
                  </Typography>
                </Grid>
              </Grid>
            </Grid>
            <Grid
              container
              item
              xs={12}
              md={6}
              sx={{
                boxSizing: "border-box",
                display: "flex",
                flexFlow: "row wrap",
                width: "100%",
                margin: "0px",
                flexBasis: "100%",
                WebkitBoxFlex: 0,
                flexGrow: 0,
                maxWidth: "100%",
                WebkitBoxPack: "center",
                justifyContent: "center",
                WebkitBoxAlign: "center",
                alignItems: "center",
                paddingTop: "32px",
                paddingLeft: "32px",
                [mainJumboTheme.breakpoints.up("xxs")]: { display: "none" },
                [mainJumboTheme.breakpoints.up("sm")]: {
                  flexBasis: "100%",
                  flexGrow: 0,
                  maxWidth: "100%",
                  WebkitBoxFlex: 0,
                },
                [mainJumboTheme.breakpoints.up("md")]: {
                  flexBasis: "50%",
                  flexGrow: 0,
                  maxWidth: "50%",
                  WebkitBoxFlex: 0,
                  display: "flex",
                },
              }}
            >
              <Card
                sx={{
                  backgroundColor: "rgb(255, 255, 255)",
                  color: "rgb(30, 32, 34)",
                  transition:
                    "box-shadow 300ms cubic-bezier(0.4, 0, 0.2, 1) 0ms",
                  overflow: "hidden",
                  borderRadius: "8px",
                  boxShadow: "rgb(140 152 164 / 18%) 0px 10px 40px 10px",
                  height: "100%",
                  width: "100%",
                }}
              >
                <CardMedia
                  sx={{
                    display: "block",
                    backgroundSize: "cover",
                    backgroundRepeat: "no-repeat",
                    backgroundPosition: "center center",
                    height: "100%",
                    width: "100%",
                    minHeight: "300px",
                  }}
                  component="img"
                  alt="testImg"
                  height="140"
                  image={stockGoingUp}
                ></CardMedia>
              </Card>
            </Grid>
          </Grid>
        </Box>
      </Box>
      <Box
        sx={{
          width: "100%",
          margin: "0px auto",
          marginTop: "50px",
          paddingLeft: "16px",
          paddingRight: "16px",
          [mainJumboTheme.breakpoints.up("sm")]: {
            paddingTop: "48px",
            paddingBottom: "48px",
            //maxWidth: "720px",
          },
          [mainJumboTheme.breakpoints.up("md")]: {
            paddingTop: "64px",
            paddingBottom: "64px",
           // maxWidth: "1002px",
          },
        }}
      >
        <Box>
          <Typography
            variant="h4"
            sx={{
              margin: "0px 0px 0.35em",
              fontFamily: "Inter, sans-serif",
              fontSize: "1.5625rem",
              lineHeight: 1.235,
              textAlign: "center",
              color: "rgb(30, 32, 34)",
              fontWeight: 700,
              [mainJumboTheme.breakpoints.up("sm")]: { fontSize: "1.0219rem" },
              [mainJumboTheme.breakpoints.up("md")]: { fontSize: "2.0243rem" },
            }}
            gutterBottom
          >
            Get Started Investing Today
          </Typography>
          <Typography
            textAlign="center"
            sx={{
              margin: "0px",
              fontFamily: "Inter, sans-serif",
              fontSize: "1.125rem",
              lineHeight: 1.6,
              textAlign: "center",
              color: "rgb(103, 119, 136)",
              fontWeight: 400,
              [mainJumboTheme.breakpoints.up("sm")]: { fontSize: "1.125rem" },
            }}
          >
            There are more than enough things to invest in, so you might as well
            start now.
          </Typography>
          <Box
            sx={{
              display: "flex",
              WebkitBoxPack: "center",
              justifyContent: "center",
              marginTop: "32px",
              [mainJumboTheme.breakpoints.up("xxs")]: {
                flexDirection: "column",
              },
              [mainJumboTheme.breakpoints.up("sm")]: {
                flexDirection: "row",
                alignItems: "flex-start",
              },
            }}
          >
            <Button
              variant="contained"
              color="success"
              size="large"
              sx={{
                display: "inline-flex",
                WebkitBoxAlign: "center",
                alignItems: "center",
                WebkitBoxPack: "center",
                justifyContent: "center",
                position: "relative",
                boxSizing: "border-box",
                WebkitTapHighlightColor: "transparent",
                outline: "0px",
                border: "0px",
                margin: "0px",
                cursor: "pointer",
                userSelect: "none",
                verticalAlign: "middle",
                appearance: "none",
                textDecoration: "none",
                textTransform: "none",
                fontFamily: "Inter, sans-serif",
                fontSize: "0.9375rem",
                lineHeight: 1.75,
                minWidth: "64px",
                padding: "10px 22px",
                transition:
                  "background-color 250ms cubic-bezier(0.4, 0, 0.2, 1) 0ms, box-shadow 250ms cubic-bezier(0.4, 0, 0.2, 1) 0ms, border-color 250ms cubic-bezier(0.4, 0, 0.2, 1) 0ms, color 250ms cubic-bezier(0.4, 0, 0.2, 1) 0ms",
                color: "rgb(255, 255, 255)",
                boxShadow: "rgb(140 152 164 / 10%) 0px 12px 15px",
                fontWeight: 400,
                borderRadius: "5px",
              }}
            >
              Sign Up
              {/*  backgroundColor: "rgb(55, 125, 255)" */}
            </Button>
            <Button
              variant="outlined"
              size="large"
              sx={{
                display: "inline-flex",
                WebkitBoxAlign: "center",
                alignItems: "center",
                WebkitBoxPack: "center",
                justifyContent: "center",
                position: "relative",
                boxSizing: "border-box",
                WebkitTapHighlightColor: "transparent",
                outline: "0px",
                border: "0px",
                margin: "0px",
                cursor: "pointer",
                userSelect: "none",
                verticalAlign: "middle",
                appearance: "none",
                textDecoration: "none",
                textTransform: "none",
                fontFamily: "Inter, sans-serif",
                fontSize: "0.9375rem",
                lineHeight: 1.75,
                minWidth: "64px",
               // padding: "10px 22px",
                transition:
                  "background-color 250ms cubic-bezier(0.4, 0, 0.2, 1) 0ms, box-shadow 250ms cubic-bezier(0.4, 0, 0.2, 1) 0ms, border-color 250ms cubic-bezier(0.4, 0, 0.2, 1) 0ms, color 250ms cubic-bezier(0.4, 0, 0.2, 1) 0ms",
                color: "#2e7d32",
                boxShadow: "rgb(140 152 164 / 10%) 0px 12px 15px",
                fontWeight: 400,
                borderRadius: "5px",
                marginLeft: "15px",
              }}
            >
              Learn More
              {/* backgroundColor: "rgb(255, 255, 255)", */}
            </Button>
          </Box>
        </Box>
      </Box>

      {/* Final footer, may just add to every page like the header/responsivebar.js */}
      <Divider
        variant="hr"
        sx={{
          margin: "0px",
          flexShrink: 0,
          borderWidth: "10px 10px thin",
          borderStyle: "solid",
          borderColor: "rgba(0, 0, 0, 0.12)",
        }}
      />
      <Box
        sx={{
          width: "100%",
          margin: "0px auto",
          padding: "32px 16px",
          [mainJumboTheme.breakpoints.up("sm")]: { maxWidth: "720px" },
         [mainJumboTheme.breakpoints.up("md")]: { maxWidth: "1002px" },
        }}
      >
        <Grid
          container
          spacing={2}
          sx={{
            boxSizing: "border-box",
            display: "flex",
            flexFlow: "row wrap",
            marginTop: "-16px",
            width: "calc(100% + 16px)",
            marginLeft: "-16px",
          }}
        >
          <Grid
            item
            xs={12}
            sx={{
              boxSizing: "border-box",
              margin: "0px",
              flexDirection: "row",
              flexBasis: "100%",
              WebkitBoxFlex: 0,
              flexGrow: 0,
              maxWidth: "100%",
              [mainJumboTheme.breakpoints.up("sm")]: {
                flexBasis: "100%",
                WebkitBoxFlex: 0,
                flexGrow: 0,
                maxWidth: "100%",
              },
              [mainJumboTheme.breakpoints.up("md")]: {
                flexBasis: "100%",
                WebkitBoxFlex: 0,
                flexGrow: 0,
                maxWidth: "100%",
              },
              [mainJumboTheme.breakpoints.up("lg")]: {
                flexBasis: "100%",
                WebkitBoxFlex: 0,
                flexGrow: 0,
                maxWidth: "100%",
              },
            }}
            paddingLeft="16px"
            paddingTop="16px"
          >
            <Box
              sx={{
                display: "flex",
                WebkitBoxPack: "justify",
                justifyContent: "space-between",
                WebkitBoxAlign: "center",
                alignItems: "center",
                width: "100%",
                [mainJumboTheme.breakpoints.up("sm")]: {
                  flexDirection: "column",
                },
                [mainJumboTheme.breakpoints.up("md")]: { flexDirection: "row" },
              }}
            >
              {/* Navigate to either loggedin or loggedin page here */}
              <Link
                component="button"
                variant="link"
                onClick={() => {
                  navigate("/");
                }}
              >
                <img src={logo} alt="logo" width="100px" height="10px" />
              </Link>
              <Box
                sx={{
                  display: "flex",
                  flexWrap: "wrap",
                  WebkitBoxAlign: "center",
                  alignItems: "center",
                }}
              >
                <Box sx={{ marginTop: "8px", marginRight: "16px" }}>
                  {/* Link To Stock Info Page */}
                  <Link
                    href="#"
                    underline="none"
                    sx={{
                      margin: "0px",
                      fontFamily: "Inter, sans-serif",
                      fontWeight: 500,
                      fontSize: "0.875rem",
                      lineHeight: 1.57,
                      color: "rgb(30, 32, 34)",
                      textDecoration: "none",
                    }}
                  >
                    Stocks
                  </Link>
                </Box>
                <Box sx={{ marginTop: "8px", marginRight: "16px" }}>
                  {/* Link To Crypto Info Page */}
                  <Link
                    href="#"
                    underline="none"
                    sx={{
                      margin: "0px",
                      fontFamily: "Inter, sans-serif",
                      fontWeight: 500,
                      fontSize: "0.875rem",
                      lineHeight: 1.57,
                      color: "rgb(30, 32, 34)",
                      textDecoration: "none",
                    }}
                  >
                    Crypto
                  </Link>
                </Box>
                <Box sx={{ marginTop: "8px" }}>
                  <Button
                    variant="outlined"
                    size="small"
                    sx={{
                      display: "inline-flex",
                      WebkitBoxAlign: "center",
                      alignItems: "center",
                      WebkitBoxPack: "center",
                      justifyContent: "center",
                      position: "relative",
                      boxSizing: "border-box",
                      WebkitTapHighlightColor: "transparent",
                      outline: "0px",
                      border: "1px solid #2e7d32",
                      margin: "0px",
                      cursor: "pointer",
                      userSelect: "none",
                      verticalAlign: "middle",
                      appearance: "none",
                      textDecoration: "none",
                      textTransform: "none",
                      fontFamily: "Inter, sans-serif",
                      fontSize: "0.9375rem",
                      lineHeight: 1.75,
                      minWidth: "64px",
                      padding: "10px 22px",
                      transition:
                        "background-color 250ms cubic-bezier(0.4, 0, 0.2, 1) 0ms, box-shadow 250ms cubic-bezier(0.4, 0, 0.2, 1) 0ms, border-color 250ms cubic-bezier(0.4, 0, 0.2, 1) 0ms, color 250ms cubic-bezier(0.4, 0, 0.2, 1) 0ms",
                      color: "#2e7d32",
                      boxShadow: "rgb(140 152 164 / 10%) 0px 12px 15px",
                      fontWeight: 400,
                      borderRadius: "5px",
                      marginLeft: "15px",
                    }}
                  >
                    {/* Link form to this button too */}
                    Sign Up
                    {/* backgroundColor: "rgb(255, 255, 255)", */}
                  </Button>
                </Box>
              </Box>
            </Box>
          </Grid>

          {/* Minor copyright text at bottom bottom of pages */}
          <Grid
            item
            xs={12}
            sx={{
              boxSizing: "border-box",
              margin: "0px",
              flexDirection: "row",
              flexBasis: "100%",
              WebkitBoxFlex: 0,
              flexGrow: 0,
              maxWidth: "100%",
              [mainJumboTheme.breakpoints.up("sm")]: {
                flexBasis: "100%",
                WebkitBoxFlex: 0,
                flexGrow: 0,
                maxWidth: "100%",
              },
              [mainJumboTheme.breakpoints.up("md")]: {
                flexBasis: "100%",
                WebkitBoxFlex: 0,
                flexGrow: 0,
                maxWidth: "100%",
              },
              [mainJumboTheme.breakpoints.up("lg")]: {
                flexBasis: "100%",
                WebkitBoxFlex: 0,
                flexGrow: 0,
                maxWidth: "100%",
              },
            }}
            paddingLeft="16px"
            paddingTop="16px"
          >
            <Typography
              sx={{
                margin: "0px 0px 0.35em",
                fontFamily: "Inter, sans-serif",
                fontWeight: 500,
                fontSize: "0.875rem",
                lineHeight: 1.57,
                textAlign: "center",
                color: "rgb(103, 119, 136)",
              }}
              textAlign="center"
              gutterBottom
            >
              © Alexander Mikalauskas. 2022, Unknown. All rights reserved
            </Typography>
            <Typography
              sx={{
                margin: "0px",
                fontFamily: "Inter, sans-serif",
                fontWeight: 400,
                fontSize: "0.75rem",
                lineHeight: 1.66,
                textAlign: "center",
                color: "rgb(103, 119, 136)",
              }}
              textAlign="center"
            >
              Vivamus tincidunt risus imperdiet augue semper auctor. Nam tempor
              lacus id dui viverra bibendum. Sed ac magna sit amet justo aliquam
              consequat. Fusce in quam vel lectus rutrum imperdiet ac nec dui.
            </Typography>
          </Grid>
        </Grid>
      </Box>
    </Layout>
  );
};

export default LoggedOutHome;
