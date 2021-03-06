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
    isSoundEnabled: true,
    isVibrateEnabled: true,
  };

  playSound = async () => {
    const soundObject = new Audio.Sound();
    try {
      await soundObject.loadAsync(require('./assets/sounds/time_up.mp3'));
      await soundObject.playAsync();
    } catch (error) {
      console.log(error)
    }
  }

  toggleMode = () => {
    if (this.state.isSoundEnabled === true){
      this.playSound()
    }
    if (this.state.isVibrateEnabled == true){
      vibrate();
    }
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

  toggleSoundEnabled = () => {
    this.setState((prevState) => ({ isSoundEnabled: !prevState.isSoundEnabled}));
  }

  toggleVibrateEnabled = () => {
    this.setState((prevState) => ({ isVibrateEnabled: !prevState.isVibrateEnabled}));
  }

  render() {
    return (
      <AppContext.Provider
        value={{
          ...this.state,
          toggleMode: this.toggleMode,
          updateWorkSecs: this.updateWorkSecs,
          updateRestSecs: this.updateRestSecs,
          toggleResetNeeded: this.toggleResetNeeded,
          toggleSoundEnabled: this.toggleSoundEnabled,
          toggleVibrateEnabled: this.toggleVibrateEnabled,
        }}
      >
        {this.props.children}
      </AppContext.Provider>
    );
  }
}
