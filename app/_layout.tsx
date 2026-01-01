import { Stack } from "expo-router";

export default function Layout() {
    return(
        <Stack>
            <Stack.Screen name="index" options={{ headerShown: false,  animation: 'fade',}} />
            <Stack.Screen name="(tabs)" options={{ headerShown: false, animation: 'slide_from_right' }} />
            <Stack.Screen name="DetailsScreen" options={{ headerShown: false, animation: 'slide_from_right' }} />

            
        </Stack>
    )
}