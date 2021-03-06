//library
import React, { Component } from "react";
import { Route } from "react-router-dom";
import * as firebase from "firebase";
//views
import LandingView from "./views/landingView";
import CategoriesView from "./views/categoriesView";
import SubCategoryView from "./views/subCategoryView";
import SingleResourceView from "./views/singleResourceView";
import SubCategoryList from "./views/subCategoryList";
//State
import { StateProvider } from "./state/state";
import languageReducer from "./reducers/languageReducer";
import modalReducer from "./reducers/modalReducer.js";
//styles
import "./App.css";

class App extends Component {
  render() {
    // this allows us to access firebase functions to interact w/ db
    // firebase.initializeApp({
    //   apiKey: "AIzaSyCAq8hud84J37D5gyYY0KscH4kY85Y61II",
    //   databaseURL: "https://empact-e511a.firebaseio.com/"
    // });
    // sets initial app state to render in English
    const initialState = {
      spanish: false,
      breakpoints: {
        desktop: 1366,
        tablet: 1024,
        mobile: 600
      },
      displayModal: false
    };

    // creates logic to combine reducers
    const mainReducer = ({ spanish, displayModal }, action) => ({
      spanish: languageReducer(spanish, action),
      displayModal: modalReducer(displayModal, action)
    });

    return (
      // App must be wrapped in StateProvider to approximate Redux functionality
      // creates a global store and sends state throughout the app
      // gives access to reducers to interact w/ state throughout app
      <StateProvider initialState={initialState} reducer={modalReducer}>
        <div className="App">
          <Route exact path="/" render={props => <LandingView {...props} />} />
          <Route
            exact
            path="/home"
            render={props => <CategoriesView {...props} />}
          />
          <Route
            exact
            path="/home/:id"
            render={props => <SubCategoryView {...props} />}
          />
          <Route
            exact
            path="/home/:id/:id"
            render={props => <SubCategoryList {...props} />}
          />
          <Route
            path="/home/:id/:id/:id"
            render={props => <SingleResourceView {...props} />}
          />
        </div>
      </StateProvider>
    );
  }
}

export default App;
