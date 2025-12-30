import { Image, Platform, StyleSheet, Text, View } from 'react-native'
import React, { useEffect } from 'react';
import Animated, {
  useSharedValue,
  withSpring,
}  from 'react-native-reanimated';
import { useRouter } from 'expo-router';

const index = () => {
    const router = useRouter();

    const randomWidth = useSharedValue(0);
    const randomWidth2 = useSharedValue(0);
    useEffect(()=>{
        randomWidth.value = 0;
        randomWidth2.value = 0;
        setTimeout(() => {randomWidth.value = withSpring(24) }, 200);
        setTimeout(() => {randomWidth2.value = withSpring(38) }, 700);

        setTimeout(() => {router.replace('/Home') }, 2200);

    },[]);
    return (
        <View style={styles.mainView}>
            <Animated.View style={{padding: randomWidth2, backgroundColor: '#ffffff22', borderRadius: "50%"}}>
                <Animated.View style={{padding: randomWidth, backgroundColor: '#ffffff1a', borderRadius: "50%"}}>
                    <Image source={require('../assets/mainpic.png')}
                        style={styles.mainPic}
                    />
                </Animated.View>
            </Animated.View>
            <View style={{marginTop: 80,}}>
                <Text style={styles.mainText}>Food Recipe</Text>
                <Text style={styles.secondText}>Cook with what you have.</Text>
            </View>
            <View style={styles.secondView}>
                <Image
                    source={require('../assets/biryani.png')}
                    style={styles.secondImg}
                />
            </View>
        </View>
    )
}

export default index

const styles = StyleSheet.create({
    mainView: {
        backgroundColor: "rgba(188, 108, 9, 1)",
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    mainPic: {
        height: 220,
        width: 220,
        resizeMode: 'contain'
    },
    mainText: {
        textAlign: 'center',
        marginBottom: Platform.OS === 'ios' ? 8 : 4,
        fontSize: Platform.OS === 'ios' ? 42: 32,
        fontWeight: '700',
        fontFamily: 'arial',      
    },
    secondText: {
        textAlign: 'center',
        fontWeight: '600',
        fontSize: Platform.OS === 'ios' ? 22 : 16,
        paddingBottom: 120,
    },
    secondView: {
        position: 'absolute',
        height: 200,
        width: '100%',
        bottom: 20,
        left: 0,
        right: 0,
    },
    secondImg: {
        height: 220,
        width: 320,
        resizeMode: 'contain',
        bottom: -28,
        position: 'absolute',
        right: 0,
        opacity: 0.9,
    },
})