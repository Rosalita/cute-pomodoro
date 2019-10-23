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
      activeTintColor: "#FF5A5A",
    },
  }
);

export default createAppContainer(TabNavigator);
