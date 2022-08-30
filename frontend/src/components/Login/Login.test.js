import { render } from "@testing-library/react";
//import Login from "./Login";
import formSubmitHandler from"./Login";
import axios from "../../api/axios";



describe("Login call to backend should give a response", () => {
    const LOGIN_URL = "/login";
    const email="ajmikalauskas@hotmail.com";
    const password = "Isaiah558!";
    let response;
    beforeEach(async () => {
        response = await axios.post(LOGIN_URL,
            JSON.stringify({email, password}),
            {
                headers: {'Content-Type': 'application/json'}
                //withCredentials: true
            });    })

  it("Returns an accessToken and roles in the response",  () => {
    // Arrange
    // const email="ajmikalauskas@hotmail.com";
    // const password = "Isaiah558!";
    // //const expectedAccessToken="eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJVc2VySW5mbyI6eyJlbWFpbCI6ImFqbWlrYWxhdXNrYXNAaG90bWFpbC5jb20iLCJyb2xlcyI6WzIwMDFdfSwiaWF0IjoxNjU5NzMwOTQ1LCJleHAiOjE2NTk3MzIxNDV9.GuvAt3S4ZzsBvIlxcA3tpZU5c3BOtP4y3iZIARCFsmg";
    // const LOGIN_URL = "/login";
    // // render(<Login/>) --> If testing for UI, use this, can see what is on the screen and more...
    // // Async Code Testing
    //     // Put this in before each later?
    
    // // Act
    // const response = await axios.post(LOGIN_URL,
    //     JSON.stringify({email, password}),
    //     {
    //         headers: {'Content-Type': 'application/json'}
    //         //withCredentials: true
    //     });
    let actual = response.data;

    // Assert
    console.log(actual);
    expect(actual.accessToken).not.toBeNull();
    expect(actual.roles).not.toBeNull();
  });

  it("Returns a role of user for a basic user",  () => {
    let actual = response.data;
    expect(actual.roles[0]).toBe(2001);
    });
    // Could also test for all 3 user roles?

    it("My User only has 1 role of User, not editor or admin",  () => {
        let actual = response.data;
        expect(actual.roles.length).toBeLessThanOrEqual(1);
        });

});
