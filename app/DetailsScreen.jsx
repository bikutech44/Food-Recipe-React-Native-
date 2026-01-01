import { ActivityIndicator, Platform, ScrollView, StatusBar, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import { router, useLocalSearchParams } from 'expo-router';
import { Image } from 'expo-image';
import Ionicons from '@expo/vector-icons/Ionicons';
import YoutubeIframe from 'react-native-youtube-iframe';
import Octicons from '@expo/vector-icons/Octicons';

const DetailsScreen = () => {
  const { id } = useLocalSearchParams();

  const [mealData, setMealData] = useState(null);
  const[totalIngredients, setTotalIngridents] = useState(0);
  const[instLengt, setInstLength] = useState(0);
  const [isFavourites, setIsFavourite] = useState(false);


  useEffect(()=>{
    loadMealData(id);
  },[id]);

  const loadMealData = async (idMeal) =>{
    try{
      const response = await fetch(`https://themealdb.com/api/json/v1/1/lookup.php?i=${idMeal}`);
      const data = await response.json();

      // console.log(data.meals?.strMealThumb);
      if (data.meals && data.meals.length > 0){
        // console.log(data.meals);
        setMealData(data.meals[0]);


        const abc = data.meals[0].strInstructions;
        const cc = abc.length;
        // console.log("length : ", cc);

        setInstLength(cc);

        const inst = data.meals[0];
        if(inst){
          let indexes = [];
          for (let i = 1; i <= 30; i++){
            if (inst['strIngredient' + i]){
              indexes.push(i);
            }
          }
          setTotalIngridents(indexes.length);
        }
      }
    }
    catch(err){
      console.log("Error: ", err);
    }
    
  }
  const isIos = Platform.OS === 'ios';

  const[ingredientsShow, setIngredientShow] = useState('');
  const[indexx, setIndexx] = useState();
  

  const setTextIng = (ing) => {
      setIngredientShow(`(${ing})`);
      setTimeout(() => {
          setIngredientShow('');
      }, 16000);
  }


  const indexMeasure = (meals) =>{
    if(!meals) return[];
    let indexes = [];
    for( let i = 1; i<= 30; i++){
      if(meals['strIngredient'+i]){
        indexes.push(i);
      }
    }
    return indexes;
  }

  const extractId = (url) => {
    const regex = /[?&]v=([^&#]+)/;
    const match = url.match(regex);
    return match ? match[1] : null;
    // if (match && match[1]){
    //   return match[1];
    // }
  };

  const favouriteToggle =()=>{
    setIsFavourite(!isFavourites);
  }

  return (
    <View style={{flex:1, backgroundColor: '#cce7f367'}}>

      {
        isIos &&(
          <StatusBar
            barStyle='light-content'
          />
        )
      }
      
      <TouchableOpacity 
      onPress={()=> router.back()}
      style={{
        position: 'absolute',
        marginTop: 44,
        left: 14,
        zIndex: 9,
        height: 38,
        width: 38,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'rgba(241, 241, 240, 0.39)',
        borderRadius: '50%',
      }}>
        <Ionicons name="chevron-back-sharp" size={28} color="black" />
      </TouchableOpacity>
      {
        mealData ? (
          <ScrollView showsVerticalScrollIndicator={false} style={{
            borderTopRightRadius: Platform.OS === 'ios' ? 44 : 36,
            borderTopLeftRadius: Platform.OS === 'ios' ? 44 : 36,
            overflow: 'hidden',
            marginTop: 3.2,
            marginHorizontal: '1%',
          }}>
            <View style={{paddingBottom: 20, maxHeight: 3000, minHeight: 1800, marginBottom: 40,  }}>
              <View>
                <Image source={{ uri: mealData.strMealThumb }} 
                style={{height: 400, 
                width: '100%',
                // marginTop: 3.4,
                borderTopRightRadius: Platform.OS === 'ios' ? 44 : 36,
                borderTopLeftRadius: Platform.OS === 'ios' ? 44 : 36,
                alignSelf: 'center',
                borderBottomLeftRadius: Platform.OS === 'ios' ? 16 : 12,
                borderBottomRightRadius: Platform.OS === 'ios' ? 16 : 12,

                }}/>
              </View>

              <View style={{marginTop: 8, marginVertical: 8, paddingHorizontal: 8,  paddingVertical: 12, backgroundColor: '#c2d8e23f', borderRadius: 12}} >
                {/* title */}
                <Text style={{fontSize: Platform.OS === 'ios' ? 32 : 20, fontWeight: '500'}} >{mealData.strMeal}</Text>
                <Text style={{fontSize: Platform.OS === 'ios' ? 20 : 14, color: '#4d4c4cff', fontStyle: 'italic'}} >{mealData.strArea}</Text>
              

                {/* {
                  totalIngredients > 8 && instLengt > 1200 &&(
                    <View>
                      <Text>Biku</Text>
                    </View>
                  )
                } */}

                <View style={{flexDirection: 'row', marginVertical: 10, justifyContent: 'space-between'}}>
                  <View style={{flexDirection: 'row', gap: 14, paddingHorizontal: 8, paddingVertical: 8,
                    borderRadius: 24,
                    backgroundColor: '#9ecacd77', alignItems: 'center',
                    borderColor: '#7ba7ad04',
                    borderWidth: 1, width: "48%",}}>
                    <Octicons name="stack" size={24} color="#7b7b7bff"  style={{padding: 8, backgroundColor: '#ffffffff', borderRadius: "50%"}}/>
                    {/* <Text style={{fontSize: Platform.OS === 'ios' ? 24 : 16, fontWeight: '500', color: '#434649ff' }} ></Text> */}
                    {
                      totalIngredients > 10 && instLengt > 1500 ? (
                        <Text style={{fontSize: Platform.OS === 'ios' ? 24 : 16, fontWeight: '500', color: '#434649ff' }} >Average</Text>
                      ) :
                      totalIngredients > 6 && instLengt > 900 ? (
                        <Text style={{fontSize: Platform.OS === 'ios' ? 24 : 16, fontWeight: '500', color: '#434649ff' }} >Moderate</Text>
                      )
                      : (
                        <Text style={{fontSize: Platform.OS === 'ios' ? 24 : 16, fontWeight: '500', color: '#434649ff' }} >Easy</Text>

                      )
                    }
                  </View>

                  <TouchableOpacity 
                  onPress={()=> favouriteToggle()}
                  style={{flexDirection: 'row', gap: 10, paddingHorizontal: 8, paddingVertical: 8,
                    borderRadius: 24,
                    backgroundColor: '#9ecacd77', alignItems: 'center',
                    borderColor: '#7ba7ad04',
                    borderWidth: 1,
                    width: "47%",}}>
                      {/* <Ionicons name="bookmark" size={24} color="black" /> */}
                      {/* <Ionicons name="bookmark-outline" size={24} color="#7b7b7bff"  style={{padding: 8, backgroundColor: '#ffffffff', borderRadius: "50%"}} /> */}
                      {
                        isFavourites ?(
                          <Ionicons name="bookmark" size={28} color="#7b7b7bff"  style={{padding: 6, backgroundColor: '#ffffffff', borderRadius: "50%"}} /> 

                        ): (
                          <Ionicons name="bookmark-outline" size={24} color="#7b7b7bff"  style={{padding: 8, backgroundColor: '#ffffffff', borderRadius: "50%"}} /> 

                        )
                      }
                      
                      
                      <Text style={{fontSize: Platform.OS === 'ios' ? 24 : 16, fontWeight: '500', color: '#434649ff' }} >Favourites</Text>

                  </TouchableOpacity>
                </View>

                {/* Ingredients */}
                <Text style={{fontSize: Platform.OS === 'ios' ? 26 : 16, 
                  marginTop: 12, fontWeight: '500', 
                  marginBottom: 6, 
                  letterSpacing: 0.4,
                  }} >Ingredients: </Text>

                
                <View style={{flexDirection: 'row', flexWrap: 'wrap', gap: 10, 
                  alignItems: 'center', width: '100%', justifyContent: 'center',
                  marginTop: 6
                  }}>
                  {
                    indexMeasure(mealData).map(i=>{
                       const measureData = mealData['strMeasure' +i];
                       const isDisplay = i === indexx;
                      // console.log(measureData);
                      return(
                        <View key={i} style={{ backgroundColor: '#b3c5c9ff' , borderRadius: 16, alignItems: 'center'}}>
                            {/* <Text>{mealData['strMeasure'+i]}</Text> */}
                            <TouchableOpacity onPress={() => {setTextIng(measureData), setIndexx(i) }} style={{paddingVertical: 8, paddingHorizontal: 10,}}>
                              <Text style={{fontSize: Platform.OS === 'ios' ? 18 : 14,}}>{mealData['strIngredient'+i]}{isDisplay &&` ${ingredientsShow}`}</Text>

                            </TouchableOpacity>
                        </View>
                      )
                    })
                  }
                </View>

              </View>

              {/* for Instruction View */}

              <View style={{marginTop: 20, paddingHorizontal: 10,}}>
                <Text style={{fontSize: Platform.OS === 'ios' ? 26 : 18, 
                fontWeight: '500', 
                marginBottom: 6, 
                letterSpacing: 0.4,}} >Instructions:</Text>
                <Text style={{fontSize: Platform.OS === 'ios' ? 22 : 14, }}>{mealData.strInstructions}</Text>
              </View>

              
                
              

              <View style={{marginTop: 28, paddingHorizontal: 10, marginBottom: 20}}>
                {
                  mealData.strYoutube &&(
                    <>
                    <Text style={{fontSize: Platform.OS === 'ios' ? 24 : 16, 
                      fontWeight: '500', 
                      marginBottom: 6, 
                      letterSpacing: 0.4,}}>Recipe Video:</Text>
                    <View>
                      <YoutubeIframe 
                      videoId={extractId(mealData.strYoutube)}
                      // videoId='4aZr5hZXP_s'
                      height={250}
                      />
                    </View>
                    </>
                  )
                }

              </View>



            </View>
          </ScrollView>
        ) : (
          <>
          <ActivityIndicator height={40} marginTop={20} />
          </>
        )
      }
    </View>
  )
}

export default DetailsScreen

const styles = StyleSheet.create({
  
})