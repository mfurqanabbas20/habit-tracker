import { Tabs } from "expo-router";

export default function TabsLayout() {
  return (
    // tabBarActiveTintColor
    <Tabs screenOptions={{tabBarActiveBackgroundColor: "coral"}}>
      <Tabs.Screen name="index" options={{title: "Home"}} />
      <Tabs.Screen name="login" options={{title: "Login"}} />
    </Tabs>
  )
}
