import React from "react";
import AppNavigation from "./Navigation";
import AppProvider from "./AppContext";

export default class App extends React.Component {
  render() {
    return (
      <AppProvider>
        <AppNavigation />
      </AppProvider>
    );
  }
}
