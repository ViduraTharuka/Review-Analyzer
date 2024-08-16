import { Image, StyleSheet, Dimensions, Text, View, TextInput, TouchableOpacity, Alert } from "react-native"
import React, { useState } from 'react';
const screenHeight = Dimensions.get('window').height
const screenWidth = Dimensions.get('window').width
import axios from "axios";
import * as jwt_decode from 'jwt-decode';



function LogInScreen  ({navigation}) {

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    function handleSubmit(){
        console.log(email, password);

        const login_data = {
            email: email,
            password
        }
        axios.post('http://192.168.2.27:5001/login-user', login_data )
        .then(res=> {
            user = res.data
            console.log(user);
            if(res.data.status == "ok"){
                Alert.alert('Loged in Successfully')
            
                navigation.navigate('ReviewPage', {user} )
            }else{
                Alert.alert(JSON.stringify(res.data))
            }
        })
        .catch(e=> console.log(e))
    }



    return(
        <View>
            <View style = {styles.imageContainer}>
                <Image
                source={require('../images/login.png')}>
                </Image>
            </View>
            <Text style = {styles.textLogin}>Log In</Text>
            <View style={styles.inputContainer}>
                <TextInput style = {styles.input}
                placeholder="Email"
                onChange={r=>setEmail(r.nativeEvent.text)}></TextInput>
                <TextInput style = {styles.input}
                placeholder="password"
                onChange={r=>setPassword(r.nativeEvent.text)}></TextInput>
            </View>
            <View style = {{alignItems:'center'}}>
                <TouchableOpacity style = {styles.buttonContainer}
                onPress={()=>handleSubmit()}>
                    <Text style={styles.buttonText}>Log In</Text>
                </TouchableOpacity>
            </View>
            
        </View>
        
    )
}

const styles = StyleSheet.create({
    logo : {
        height : screenHeight/2,
        width : screenWidth,
    },
    imageContainer : {
        alignItems : 'center',
        justifyContent : 'center',
        paddingTop : 10
    },
    textLogin : {
        fontSize : 40,
        fontWeight : 'bold',
        color : 'black',
        paddingLeft :6
    },
    input : {
        height : 40,
        width : '90%',
        borderColor : 'gray',
        borderWidth : 1,
        paddingHorizontal : 10,
        marginBottom : 10 ,
        borderRadius : 5
    },
    inputContainer : {
        alignItems: 'center',
        marginTop : 10
    },
    buttonContainer:{
        width:'40%',
        backgroundColor: '#008CBA', // Blue color
        paddingVertical: 12,
        paddingHorizontal: 24,
        borderRadius: 8,
        alignItems: 'center',
        justifyContent: 'center',
        elevation: 4, // Add shadow (Android)
        shadowColor: '#000', // Shadow color (iOS)
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.3,
        shadowRadius: 4
    },
    buttonText : {
        color: 'white',
        fontSize: 16,
        fontWeight: 'bold'
    }

})

export default LogInScreen