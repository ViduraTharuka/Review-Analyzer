import { Image, StyleSheet, Dimensions, Text, View, TextInput, TouchableOpacity, Checkbox } from "react-native"
import React, { useState } from 'react';
import { useRoute } from "@react-navigation/native";
import axios from "axios";


const { width, height } = Dimensions.get('window');

function ReviewScreen  ({navigation}) {

  const [loading, setLoading] = useState(false)


  /*start new code*/

  const route = useRoute();
  const {user} = route.params

  const reviewData = []

  const fetchReviews = async () => {
    setLoading(true);

    const fetchPlatformReviews = async (platform) => {
      try {
        const scrapping_data = {
          url : platform.url
        }
        
        if(platform.platformName == 'booking.com'){
          response = await axios.post("http://192.168.2.27:5001/scrapper/booking", {scrapping_data});
        }else if (platform.platformName =='expedia.com'){
          response = await axios.post("http://192.168.2.27:5001/scrapper/expedia", {scrapping_data});
        }

        if(response){
          reviewData.push({platformName: platform.platformName, reviews: response.data.result})
        }
        
      } catch (error) {
        console.error(`Error fetching reviews from ${platform.url}:`, error);
      }


    };

  // Execute requests for all selected platforms
  const requests = user.data.platforms.map((platform) => fetchPlatformReviews(platform));
  await Promise.all(requests);

  console.log(reviewData)

  navigation.navigate('ReadScreen',{reviewData} )

  }


    return(
        <View className='bg-emerald-300 p-4'>
          <View>
            <Text className='text-blue-600 text-5xl font-extrabold'>
              Hi...
            </Text>
          </View> 
          <View className='flex items-center justify-center'>
            <Image source={require('../images/profile.png')}
            className='w-48 h-48'></Image>
          </View>
          <View className='flex items-center justify-center mt-4'>
            <Text className='text-blue-500 font-mono italic font-extrabold text-4xl'>
                {user.data.name}
            </Text>
          </View>
          <View className='flex  mt-4'>
            <Text className='text-white font-mono italic font-extrabold text-xl'>
                Click to explore your reviews
            </Text>
          </View>
      
          <View className='flex items-center justify-center mt-4'>
            <TouchableOpacity className='border rounded-md bg-blue-500
            border-blue-500 shadow-2xl shadow-black hover:bg-emerald-500
            w-56 py-10 ' onPress={fetchReviews}>
                <Text className='font-mono italic font-extrabold
                text-5xl text-center text-white'>Explore</Text>
            </TouchableOpacity>
          </View>

        </View>
        
    )

  }

const styles = StyleSheet.create ({
    container: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
    },
    card: {
      width: width * 0.9,
      height: height * 0.1,
      marginBottom: 10,
      backgroundColor: '#f0f0f0',
      borderRadius: 10,
      justifyContent: 'center',
      alignItems: 'center',
      shadowColor: '#000',
      shadowOffset: {
        width: 0,
        height: 2,
      },
      shadowOpacity: 0.25,
      shadowRadius: 3.84,
      elevation: 5,
    },
    text: {
      fontSize: 18,
      fontWeight: 'bold',
    },
});
  

export default ReviewScreen