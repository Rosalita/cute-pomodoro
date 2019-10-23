import React from "react";
import { Text, View, Button, StyleSheet } from "react-native";

export class PauseButton extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      text: "pause",
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
      this.setState(() => ({ text: "pause" }));
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
  count: {
    fontSize: 48,
    color: "black",
  }
});
