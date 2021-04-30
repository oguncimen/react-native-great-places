import { StatusBar } from "expo-status-bar";
import React from "react";
import { StyleSheet, LogBox} from "react-native";
import PlacesNavigator from "./navigation/PlacesNavigation";
import { createStore, combineReducers, applyMiddleware } from "redux";
import { Provider } from "react-redux";
import ReduxThunk from "redux-thunk";
import placesReducer from "./store/places-reducer";
import { init } from "./helpers/db";

LogBox.ignoreAllLogs();

init()
  .then(() => {
    console.log("Initialized db database");
  })
  .catch((err) => {
    console.log("Initializing db failed");

    console.log(err);
  });
const rootReducer = combineReducers({ places: placesReducer });

const store = createStore(rootReducer, applyMiddleware(ReduxThunk));
export default function App() {
  return (
    <Provider store={store}>
      <PlacesNavigator></PlacesNavigator>
    </Provider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
