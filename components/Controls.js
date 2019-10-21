import React from "react";
import { Text, View, Button, StyleSheet } from "react-native";

export class PauseButton extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      text: "stop",
      color: "#9c0000",
    };
  }

  render() {
    return (
      <Button
        title={this.state.text}
        color={this.state.color}
        onPress={() => this.onPress()}
      />
    );
  }

  onPress = () => {
    if (this.state.text === "start") {
      this.setState(() => ({ text: "stop" }));
      this.setState(() => ({ color: "#9c0000" }));
    } else {
      this.setState(() => ({ text: "start" }));
      this.setState(() => ({ color: "#004a00" }));
    }
    this.props.togglePause();
  };
}

export class Count extends React.Component {
  render() {
    return <Text style={styles.count}>{this.props.count}</Text>;
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
