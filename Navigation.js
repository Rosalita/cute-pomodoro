import { createAppContainer } from "react-navigation";
import { createBottomTabNavigator } from "react-navigation-tabs";

import ScreenPomodoro from "./components/ScreenPomodoro";
import ScreenSettings from "./components/ScreenSettings";

const TabNavigator = createBottomTabNavigator(
  {
    Pomodoro: ScreenPomodoro,
    Settings: ScreenSettings,
  },
  {
    tabBarOptions: {
      activeTintColor: "#FF1493",
    },
  }
);

export default createAppContainer(TabNavigator);
