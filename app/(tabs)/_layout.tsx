import React from 'react';
import { Tabs } from 'expo-router';
import { NativeTabs, Icon, Label } from 'expo-router/unstable-native-tabs';
import { Platform, StyleSheet } from 'react-native';
import Ionicons from '@expo/vector-icons/Ionicons';
import Octicons from '@expo/vector-icons/Octicons';
import { BlurView } from 'expo-blur';




const iosVersion = Platform.OS === 'ios' ? parseInt(String(Platform.Version), 10) : 0;
const isLiquidGlassEligible = Platform.OS === 'ios' && iosVersion >= 26;


export default function TabLayout(){
    if (isLiquidGlassEligible){
        return(
            <NativeTabs >
                <NativeTabs.Trigger name="Home">
                    <Icon sf={{ default: 'house', selected: 'house.fill' }} drawable="custom_home_drawable" />
                </NativeTabs.Trigger>
                <NativeTabs.Trigger name="Favourites">
                    <Icon sf={{ default: 'bookmark', selected: 'bookmark.fill' }} drawable="ic_menu_save" />
                </NativeTabs.Trigger>
                <NativeTabs.Trigger name="Profile">
                    <Icon sf={{ default: 'person.crop.circle', selected: 'person.crop.circle.fill', }} />
                </NativeTabs.Trigger>
                {/* <NativeTabs.Trigger name='Search' role='search'>
                    <Label>Search</Label>
                </NativeTabs.Trigger> */}
                {/* <NativeTabs.Trigger name="search" role="search" >
                    <Label>Search</Label>
                </NativeTabs.Trigger> */}
            </NativeTabs>
            
        )
    }
    return(
        <Tabs screenOptions={{ tabBarActiveTintColor: '#4478d2ff', headerShown: false ,
        tabBarHideOnKeyboard: Platform.OS === 'android' ? true : false, 
        // tabBarStyle: {position: 'absolute', bottom: 5, borderTopWidth: 0, elevation: 0},
        tabBarStyle: styles.tabBar,
        tabBarBackground: () => (
            <BlurView tint='light' intensity={80} style={StyleSheet.absoluteFill} />
        )
        }}>
            <Tabs.Screen 
                name="Home" 
                options={{ 
                title: 'Home',
                tabBarIcon: ({ color, focused }) => 
                    focused? ( 
                        <Octicons name="home-fill" size={24} color={color} />
                    ):(
                        <Octicons name="home" size={24} color={color} />
                    )
                }} 
            />
            <Tabs.Screen 
                name="Favourites" 
                options={{ 
                title: 'Favourites',
                tabBarIcon: ({ color, focused }) => 
                    focused?(
                        <Octicons name="bookmark-filled" size={24} color={color} />
                    ): (
                        <Octicons name="bookmark" size={24} color={color} />

                    )
                }} 
            />
            <Tabs.Screen 
                name="Profile" 
                options={{ 
                title: 'Profile',
                tabBarIcon: ({ color, focused }) => 
                    focused?(
                        <Ionicons name="person-circle" size={24} color={color} />
                    ): (
                        <Ionicons name="person-circle-outline" size={24} color={color} />

                    )
                }} 
            />

            <Tabs.Screen 
                name="search" 
                options={{
                    href: null,
                    tabBarStyle:{display: 'none'}
                }}
            />
            
        </Tabs>
    )
}
const styles = StyleSheet.create({
  tabBar: {
    position: 'absolute', // Essential for the glass effect
    bottom: 18,
    left: 40,
    right: 40,
    height: 65,
    marginHorizontal: 20,
    borderRadius: 35,
    paddingTop: 6,
    backgroundColor: 'rgba(164, 238, 245, 0.6)', // Semi-transparent
    borderWidth: 1,
    borderColor: 'rgba(234, 215, 215, 0.2)',
    overflow: 'hidden',
    elevation: Platform.OS === 'ios' ? 0:  0.2, // Set to 0 if using shadows on iOS or keep for Android depth
    paddingBottom: 0, // Fixes alignment issues on some devices
  },
});