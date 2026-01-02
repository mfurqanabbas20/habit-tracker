import { Tabs } from "expo-router";
import FontAwesome5 from "@expo/vector-icons/FontAwesome5";
import {MaterialCommunityIcons} from "@expo/vector-icons"

export default function TabsLayout() {
  return ( 
    // tabBarActiveTintColor tabBarActiveBackgroundColor: "coral"
    <Tabs screenOptions={{
      headerStyle: {backgroundColor: "#f5f5f5"},
      headerShadowVisible: false,
      tabBarStyle: {
        backgroundColor: "#f5f5f5",
        borderTopWidth: 0,
        elevation: 0,
      },
      tabBarActiveTintColor: "#6200ee",
      tabBarInactiveTintColor: "#666666",

      }}>
      <Tabs.Screen name="index" options={{title: "Today's Habits", tabBarIcon: ({color, focused, size}) => <MaterialCommunityIcons
       name="calendar-today"
       size={size}
       color={color}
      />}}  />
      <Tabs.Screen name="streaks" options={{title: "Streaks", tabBarIcon: ({color, focused, size}) => <MaterialCommunityIcons
       name="chart-line"
       size={size}
       color={color}
      />}}  />
      <Tabs.Screen name="add-habit" options={{title: "Add Habit", tabBarIcon: ({color, focused, size}) => <MaterialCommunityIcons
       name="plus-circle"
       size={size}
       color={color}
      />}}  />
      <Tabs.Screen name="login" options={{title: "Login"}} />
    </Tabs>
  )
}
