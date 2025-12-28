import { Stack, useRouter } from "expo-router";
import { useEffect } from "react";


function RouteGuard({children}: {children: React.ReactNode}){
  const router = useRouter();
  const isAuth = false;

  useEffect(() => {
    if(!isAuth){
      router.replace('/auth')
    }
  }, [])

  return <>{children}</>
}

export default function RootLayout() {
  return (
     
    <Stack screenOptions={{headerShown: false}}>
      <RouteGuard>
        <Stack.Screen name="(tabs)" options={{headerShown: false}} />
      </RouteGuard>
    </Stack>
  )
}
