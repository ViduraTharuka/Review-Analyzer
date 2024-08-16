import { StyleSheet, View } from "react-native"
import { Text } from "react-native-elements"



function ReviewCard ({title,review, reviewer, country, color}) {

    return(
        <View className= {`${color} rounded-md m-2 p-2 shadow-lg shadow-black`}>
            <View>
                <Text className='text-center font-mono font-bold italic text-lg'>{title}</Text>
            </View>
            <View>
                <Text className='text-white text-sm font-mono'>{review}</Text>
            </View>
            <View>
                <View>
                    <Text className='text-black font-mono font-extrabold italic'>{reviewer}</Text>
                </View>
                <View>
                    <Text className='text-black font-mono font-extrabold italic'>{country}</Text>
                </View>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    title:{
        fontWeight:'bold',
        fontFamily:'Roboto',
        textAlign: 'center'
    },
    card:{

    }

})

export default ReviewCard