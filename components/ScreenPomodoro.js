import React from "react";
import { Text, Image, View, Button, StyleSheet } from "react-native";
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
      isPaused: true,
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

  componentDidUpdate() {
    if (this.context.isResetNeeded === true) {
      this.resetCount()
      this.context.toggleResetNeeded()
    }
  }
  render() {
    return (
      <View style={styles.appContainer}>
        {(this.context.mode === "Work") && (
          <Image
            style={{ width: 250, height: 250, marginTop: 20 }}
            source={require('../assets/images/work.png')}
          />
        )}

        {(this.context.mode === "Rest") && (
          <Image
            style={{ width: 250, height: 250, marginTop: 20 }}
            source={require('../assets/images/rest.png')}
          />
        )}

        {(this.context.mode === "Work") && (
          <Text style={styles.modeText}>Lets get some work done!</Text>
        )}

        {(this.context.mode === "Rest") && (
          <Text style={styles.modeText}>It's time to take a break</Text>
        )}

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
    backgroundColor: "#ff9c5a",
    alignItems: "center",
    justifyContent: "center",
  },
  titleText: {
    fontSize: 24,
    color: "white",
  },
  modeText: {
    fontSize: 24,
    color: "black",
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
