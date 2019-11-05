import React from "react";
import vibrate from "./utils/vibrate";
import { Audio } from 'expo-av';

export const AppContext = React.createContext(null);

export default class AppProvider extends React.Component {
  state = {
    mode: "Work",
    workSecs: 1500,
    restSecs: 300,
    isResetNeeded: false,
  };

  playSound = async () => {
    const soundObject = new Audio.Sound();
    try {
      await soundObject.loadAsync(require('./assets/time_up.mp3'));
      await soundObject.playAsync();
    } catch (error) {
      console.log(error)
    }
  }

  toggleMode = () => {
    this.playSound()
    vibrate();
    if (this.state.mode === "Work") {
      this.setState(() => ({ mode: "Rest" }));
    } else {
      this.setState(() => ({ mode: "Work" }));
    }
  };

  updateWorkSecs = (mins) => {
    this.setState({ workSecs: mins * 60 });
  };

  updateRestSecs = (mins) => {
    this.setState({ restSecs: mins * 60 });
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
