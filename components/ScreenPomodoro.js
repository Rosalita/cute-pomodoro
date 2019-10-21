import React from "react";
import { Text, View, Button, StyleSheet } from "react-native";
import Ionicons from "react-native-vector-icons/Ionicons";
import { AppContext } from "../AppContext";
import { PauseButton, Count } from "./Controls";

export default class ScreenPomodoro extends React.Component {
  static contextType = AppContext;
  static navigationOptions = {
    tabBarIcon: ({ tintColour }) => (
      <Ionicons name={"md-hourglass"} size={25} color={tintColour} />
    ),
  };

  constructor(props) {
    super(props);

    this.state = {
      count: 1500,
      isPaused: false,
    };
  }

  togglePause = () => {
    this.setState((prevState) => ({ isPaused: !prevState.isPaused }));
  };

  decrementCount = () => {
    if (this.state.isPaused === false) {
      this.setState((prevState) => ({ count: prevState.count - 1 }));
    }
    if (this.state.count === 0) {
      this.context.toggleMode();
      if (this.context.mode === "Work") {
        this.setState({ count: this.context.workSecs });
      } else {
        this.setState({ count: this.context.restSecs });
      }
    }
  };

  resetCount = () => {
    if (this.context.mode === "Work") {
      this.setState(() => ({ count: this.context.workSecs }));
    } else {
      this.setState(() => ({ count: this.context.restSecs }));
    }
  };

  secondsToTimeString = (seconds) => {
    const secs = seconds % 60;
    const mins = (seconds - secs) / 60;

    let strSecs = secs.toString();
    let strMins = mins.toString();

    if (secs < 10) {
      strSecs = "0" + strSecs;
    }
    if (mins < 10) {
      strMins = "0" + strMins;
    }

    return strMins + ":" + strSecs;
  };

  componentDidMount() {
    setInterval(this.decrementCount, 1000);
  }

  componentDidUpdate(){
    if (this.context.isResetNeeded === true){
      this.resetCount()
      this.context.toggleResetNeeded()
    }
  }
  render() {
    return (
      <View style={styles.appContainer}>
        <Text style={styles.titleText}>Pomodoro Timer</Text>
        <Text style={styles.modeText}> Current mode : {this.context.mode}</Text>
        <Count
          count={this.secondsToTimeString(this.state.count)}
          isPaused={this.state.isPaused}
        />
        <View style={styles.row}>
          <PauseButton togglePause={this.togglePause} />
          <Button
            title="reset"
            color="#00096b"
            onPress={() => this.resetCount()}
          />
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  appContainer: {
    flex: 1,
    backgroundColor: "#222222",
    alignItems: "center",
    justifyContent: "center",
  },
  titleText: {
    fontSize: 24,
    color: "white",
  },
  modeText: {
    fontSize: 16,
    color: "white",
  },
  count: {
    fontSize: 48,
    color: "white",
  },
  row: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 15,
  },
  input: {
    backgroundColor: "white",
    minWidth: 100,
    marginHorizontal: 20,
    paddingHorizontal: 10,
    paddingVertical: 5,
  },
});
