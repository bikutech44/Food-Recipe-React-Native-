import { FlatList, Platform, PlatformColor, ScrollView, StatusBar, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native'
import { Image } from 'expo-image';
import React, { useEffect, useState } from 'react';
import { DUMMY_RECIPES } from '../../components/dummyData';
import { dummy_Category } from '../../components/dumyCategory';
import { useRouter } from 'expo-router';

const Home = () => {
    // const recipes = DUMMY_RECIPES;

    const router = useRouter();
    
    const [categoryData, setCategoryData] = useState([]);
    const [activeCategory, setActiveCategory] = useState('Beef');

    const [itemData, setItemData] = useState([]);


    useEffect(()=>{
        loadCategory();
    },[]);

    const loadCategory = async () => {
        try{
            const response =  await fetch (`https://www.themealdb.com/api/json/v1/1/categories.php`);
            const data = await response.json();
            // console.log(data.categories);
            setCategoryData(data.categories);
        }
        catch(err){
            console.log("Error : ", err);
        }
    }

    useEffect(()=>{
        loadItems(activeCategory);
    },[activeCategory]);

    const loadItems = async (categ) => {
        try{
            const response =  await fetch (`https://themealdb.com/api/json/v1/1/filter.php?c=${categ}`);
            const data = await response.json();
            // console.log(data.meals);
            setItemData(data.meals);
        }
        catch(err){
            console.log("Error2 : ", err);
        }
    }

    const isIos = Platform.OS === 'ios';
    



    return (
        <View style={styles.mainView}>

            {
                isIos &&(
                    <StatusBar
                    barStyle='dark-content'
                    />
                )
            }
            <View style={{marginTop: Platform.OS === 'ios' ? 48 : 32, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between'}}>
                <Text style={styles.hiTxt}>Hi, Dear!</Text>
                <View style={{height: 36, width: 36, borderRadius: "50%", overflow: 'hidden'}}>
                    <Image source={require('../../assets/ladies.png')} style={styles.ladiesPic} />
                </View>
            </View>

            {/* search */}
            <View>
                <TextInput style={styles.searchBar} placeholder='Search items .....'/>
            </View>

            <View style={{flex: 1, backgroundColor: '#cce7f367', marginTop: 10, borderTopRightRadius: 20, borderTopLeftRadius: 20, paddingHorizontal: 4, paddingTop: 2}}>
                <ScrollView showsVerticalScrollIndicator={false}>

                    {/* category section */}

                    <View style={{marginTop: 8, marginHorizontal: 8,}}>
                        <Text style={{fontSize: Platform.OS === 'ios' ? 24 : 18, 
                            fontWeight: '600', 
                            letterSpacing: 0.4 }}>Category:</Text>
                        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
                            <View style={{flexDirection: 'row', gap: 14, marginTop: 8,}}>
                                

                                {
                                    categoryData.map((category) =>{

                                        const isActive = (category.strCategory === activeCategory);

                                        return (

                                            <TouchableOpacity key={category.idCategory} 
                                            style={{alignItems: 'center'}}
                                                onPress={()=> setActiveCategory(category.strCategory)}
                                            >
                                                <View style={{
                                                    height: 84, width: 84,
                                                    alignItems: 'center',
                                                    justifyContent: 'center',
                                                    backgroundColor: isActive? '#f48ededa' : '#bae4fa8f',
                                                    // backgroundColor: '#bf1d1dbd',
                                                    
                                                    borderRadius: "49%"
                                                }}>
                                                    <View style={{borderRadius: '50%', height: 80, width: 80, 
                                                    overflow: 'hidden', 
                                                    // backgroundColor: 'red',
                                                    
                                                    }} >
                                                        <Image source={{uri: category.strCategoryThumb }} style={styles.imageCatag}
                                                        contentFit='contain'
                                                        cachePolicy='disk'
                                                        transition={200}
                                                        placeholder="L6PZf6ayfQay~qj[ayj[ayfQfQfQ"
                                                        />
                                                    </View>
                                                </View>   
                                                <Text style={styles.textCateg}> {category.strCategory} </Text>
                                            </TouchableOpacity> 
                                        )}
                                    )
                                }

                            </View>
                        </ScrollView>
                    </View>

                    {/* Items section */}

                    <View style={{marginTop: 18, marginHorizontal: 8,}}>
                        <Text style={{fontSize: Platform.OS === 'ios' ? 24 : 18, 
                            fontWeight: '600', 
                            letterSpacing: 0.4 }}>Items:</Text>

                            {/* item lists */}
                            
                        <View style={{marginTop: 14, flexDirection: 'row',
                            // flexWrap: 'wrap',
                            justifyContent: 'space-between',
                            padding: 8, paddingHorizontal: 4,
                            paddingBottom: 68,
                            }}>

                        
                            
                            {/* {
                                DUMMY_RECIPES.map((recipe)=>{
                                    const isSpecial = Number(recipe.id) % 3 === 0;
                                    return(
                                        <View key={recipe.id} style={[styles.itemWrapper, {}]}>
                                            <Image source={{ uri: recipe.image }} style={[styles.itemsPic, {height: isSpecial? 200 : 300}]} />
                                            <Text numberOfLines={1} style={styles.itemTitle}>{recipe.title}</Text>
                                        </View>
                                    )
                                }
                            )
                            } */}

                            {/* <View style={{ width: '48%' }}>
                                {itemData.filter((_, i) => i % 2 === 0).map((recipe) => {
                                    const isSpecial = (recipe.idMeal) % 3 === 0;
                                    
                                    return (
                                        <View key={recipe.idMeal} style={styles.itemWrapper}>
                                            <Image source={{ uri: recipe.strMealThumb}} style={[styles.itemsPic, { height: isSpecial ? 200 : 250 }]} />
                                            <Text numberOfLines={1} style={styles.itemTitle}>{recipe.strMeal}</Text>
                                        </View>
                                    );
                                })}
                            </View>


                            <View style={{ width: '48%' }}>
                                {itemData.filter((_, i) => i % 2 !== 0).map((recipe) => {
                                    const isSpecial = Number(recipe.idMeal) % 3 === 0;
                                    // const heightfix = Number(recipe.id) > 2 ? 250 : 200;
                                    
                                    return (
                                        <View key={recipe.idMeal} style={styles.itemWrapper}>
                                            <Image source={{ uri: recipe.strMealThumb}} style={[styles.itemsPic, { height: isSpecial ? 200 : 250 }]} />
                                            <Text numberOfLines={1} style={styles.itemTitle}>{recipe.strMeal}</Text>
                                        </View>
                                    );
                                })}
                            </View> */}


                            {itemData && itemData.length > 0 ? (
                                <>
                                    {/* Your Left Column */}
                                    <View style={{ width: '48%' }}>
                                        {itemData.map((recipe, index) => {
                                            if (index % 2 !== 0) return null;
                                            const isTall = index % 4 === 0; 
                                            return (
                                                <TouchableOpacity key={recipe.idMeal}  onPress={()=> router.push({
                                                    pathname: '../DetailsScreen',
                                                    params: { id : recipe.idMeal }
                                                })} > 
                                                    <View  style={styles.itemWrapper}>
                                                        <Image source={{ uri: recipe.strMealThumb }} style={[styles.itemsPic, { height: isTall ? 280 : 200 }]} 
                                                            cachePolicy='disk'
                                                            transition={200}
                                                            placeholder="L6PZf6ayfQay~qj[ayj[ayfQfQfQ"
                                                        />
                                                        <Text numberOfLines={1} style={styles.itemTitle}>{recipe.strMeal}</Text>
                                                    </View>
                                                </TouchableOpacity>
                                            );
                                        })}
                                    </View>

                                    {/* Your Right Column */}
                                    <View style={{ width: '48%' }}>
                                        {itemData.map((recipe, index) => {
                                            if (index % 2 === 0) return null;
                                            const isTall = (index + 1) % 4 === 0;
                                            return (
                                                <TouchableOpacity key={recipe.idMeal}  onPress={()=> router.push({
                                                    pathname: '../DetailsScreen',
                                                    params: { id : recipe.idMeal }
                                                })} >
                                                    <View style={styles.itemWrapper}>
                                                        <Image source={{ uri: recipe.strMealThumb }} style={[styles.itemsPic, { height: isTall ? 280 : 200 }]} 
                                                        cachePolicy='disk'
                                                        transition={200}
                                                        placeholder="L6PZf6ayfQay~qj[ayj[ayfQfQfQ"
                                                        
                                                        />
                                                        <Text numberOfLines={1} style={styles.itemTitle}>{recipe.strMeal}</Text>
                                                    </View>
                                                </TouchableOpacity>
                                            );
                                        })}
                                    </View>
                                </>
                        ) : (
                            <Text>Loading meals...</Text>
                        )}


                        </View>
                    </View>

                </ScrollView>
            </View>
        
        </View>
    )
}

export default Home

const styles = StyleSheet.create({
    mainView:{
        flex: 1,
        // backgroundColor: "rgba(188, 108, 9, 0.9)",
        backgroundColor: "#f5feffff",
        paddingHorizontal: 16,    
    },
    hiTxt: {
        fontSize: Platform.OS == 'ios' ? 28: 20,
        fontWeight: '600',
        letterSpacing: 0.4,
    },
    ladiesPic: {
        height: 36,
        width: 36,
        backgroundColor: '#aaa',
    },
    searchBar: {
        marginTop: 10,
        paddingHorizontal: 16,
        paddingVertical: Platform.OS === 'ios' ? 10 : 6,
        borderRadius: 30,
        borderWidth: 1,
        borderColor: "#11111131",
        fontSize: Platform.OS === 'ios' ? 22 : 16,
        backgroundColor: "#fffffff3"
    },
    imageCatag: {
        height: 80, 
        width: 80,
        resizeMode: 'contain'
        
    },
    textCateg: {
        fontSize: Platform.OS === 'ios' ? 22 : 16,
        // fontWeight: '500',
        letterSpacing: 0.2,
    },

    //items
    itemWrapper: {
        width: "100%",
        marginBottom: 20,

    },
    itemsPic: {
        // height: 300,
        // width: 160,
        width: '100%',
        // resizeMode: 'center',
        borderRadius: 18
        
    },
    itemTitle: {
        fontSize: Platform.OS === 'ios' ? 20 : 14,
        paddingLeft: 4,
        overflow: 'hidden',
        borderRadius: 18,
    },

})