import React from "react";
import { Image, StyleSheet, Text, TextInput, View, Button } from "react-native";
import Ionicons from "react-native-vector-icons/Ionicons";
import { AppContext } from "../AppContext";

export default class ScreenSettings extends React.Component {
  static contextType = AppContext;
  static navigationOptions = {
    tabBarIcon: ({ tintColour }) => (
      <Ionicons name={"md-settings"} size={25} color={tintColour} />
    ),
  };

  state = {
    textInputWorkMins: null,
    textInputRestMins: null,
    isValid: false,
  };

  isNumber = (value) => {
    return + value >= 0
  }

  validate = () => {
    if (
      this.isNumber(this.state.textInputWorkMins) &&
      this.isNumber(this.state.textInputRestMins)
    ) {
      this.setState({ isValid: true })
    } else {
      this.setState({ isValid: false })
    }
  }

  componentDidMount() {
    this.setState({ textInputWorkMins: this.context.workSecs / 60 })
    this.setState({ textInputRestMins: this.context.restSecs / 60 })
    this.validate()
  }
  
  updateWorkTextInput = (mins) => {
    if (mins >= 0) {
      this.setState({ textInputWorkMins: mins });
    }
  }

  updateRestTextInput = (mins) => {
    if (mins >= 0) {
      this.setState({ textInputRestMins: mins });
    }
  }

  save = () => {
    this.context.updateWorkSecs(Number(this.state.textInputWorkMins))
    this.context.updateRestSecs(Number(this.state.textInputRestMins))
    this.context.toggleResetNeeded()
  }

  render() {
    return (
      <View style={styles.appContainer}>
        <Image
          style={{ width: 250, height: 250, marginTop: 20 }}
          source={require('../assets/settings.png')}
        />
        <Text style={styles.titleText}>Settings</Text>
        <View style={styles.row}>
          <Text style={styles.titleText}>Work Minutes</Text>
          <TextInput
            style={styles.input}
            value={`${this.state.textInputWorkMins}`}
            onChangeText={(mins) => this.updateWorkTextInput(Number(mins))}
            placeholder="Minutes"
            keyboardType="numeric"
          />
        </View>
        <View style={styles.row}>
          <Text style={styles.titleText}>Rest Minutes</Text>
          <TextInput
            style={styles.input}
            value={`${this.state.textInputRestMins}`}
            onChangeText={(mins) => this.updateRestTextInput(Number(mins))}
            placeholder="Minutes"
            keyboardType="numeric"
          />
        </View>

        <View style={styles.row}>
          <Button
            title="Save"
            onPress={this.save}
            disabled={!this.state.isValid}
            color="#00096B"
          />
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  appContainer: {
    flex: 1,
    backgroundColor: "#FF5A5A",
    alignItems: "center",
    justifyContent: "center",
  },
  titleText: {
    fontSize: 24,
    color: "black",
  },
  row: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 15,
  },
  input: {
    borderWidth: 1,
    borderColor: 'black',
    backgroundColor: "white",
    minWidth: 100,
    marginHorizontal: 20,
    paddingHorizontal: 10,
    paddingVertical: 5,
  },
});
