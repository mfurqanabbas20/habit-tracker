import { Tabs } from "expo-router";
import FontAwesome5 from "@expo/vector-icons/FontAwesome5";

export default function TabsLayout() {
  return (
    // tabBarActiveTintColor
    <Tabs screenOptions={{tabBarActiveBackgroundColor: "coral"}}>
      <Tabs.Screen name="index" options={{title: "Home", tabBarIcon: ({color, focused}) => {
        return focused
          ?
         <FontAwesome5 name="about" />
          :
          <FontAwesome5 name="home" color={color} />
        }}}  />
      <Tabs.Screen name="login" options={{title: "Login"}} />
    </Tabs>
  )
}
