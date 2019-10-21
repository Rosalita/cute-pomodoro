import React from "react";
import vibrate from "./utils/vibrate";

export const AppContext = React.createContext(null);

export default class AppProvider extends React.Component {
  state = {
    mode: "Work",
    workSecs: 1500,
    restSecs: 300,
    isResetNeeded: false,
  };

  toggleMode = () => {
    vibrate();
    if (this.state.mode === "Work") {
      this.setState(() => ({ mode: "Rest" }));
    } else {
      this.setState(() => ({ mode: "Work" }));
    }
  };

  updateWorkSecs = (secs) => {
    this.setState({ workSecs: secs });
  };

  updateRestSecs = (secs) => {
    this.setState({ restSecs: secs });
  };

  toggleResetNeeded = () => {
    this.setState((prevState) => ({ isResetNeeded: !prevState.isResetNeeded }));
  };

  render() {
    return (
      <AppContext.Provider
        value={{
          ...this.state,
          toggleMode: this.toggleMode,
          updateWorkSecs: this.updateWorkSecs,
          updateRestSecs: this.updateRestSecs,
          toggleResetNeeded: this.toggleResetNeeded,
        }}
      >
        {this.props.children}
      </AppContext.Provider>
    );
  }
}
