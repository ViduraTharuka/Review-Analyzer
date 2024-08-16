import { Image, StyleSheet, Dimensions, Text, View, ScrollView, TextInput, TouchableOpacity, Checkbox, Alert } from "react-native"
import React, { useState } from 'react';
import { MultipleSelectList } from "react-native-dropdown-select-list"
import axios from "axios";
import { useNavigation } from "@react-navigation/native";

const screenHeight = Dimensions.get('window').height
const screenWidth = Dimensions.get('window').width

function SignInScreen  ({navigation}) {

    const [selected, setSelected] = useState([]);
    const [name, setName] = useState('');
    const [nameVerify, setNameVerify] = useState(false);
    const [email, setEmail] = useState('');
    const [emailVerify, setEmailVerify] = useState(false);
    const [propertyName, setPropertyName] = useState('');
    const [cityorTown, setcityorTown] = useState('');
    const [propertyNameVerify, setPropertyNameVerify] = useState(false);
    const [password, setPassword] = useState('');

    const [urls, setUrls] = useState({})


    function handleSubmit(){
        const userData = {
            name: name,
            email: email,
            propertyName: propertyName,
            password: password,
            cityorTown : cityorTown,
            platforms: selected.map(platform => ({
                platformName: platform,
                url: urls[platform],
              }))
        }

        console.log(userData)

        axios.post('http://192.168.2.27:5001/register', userData)
        .then(res=> {
            console.log(res.data);
            if(res.data.status == "ok"){
                Alert.alert('Registered Successfully')
                navigation.navigate('LogIn')
            }else{
                Alert.alert(JSON.stringify(res.data))
            }
        })
        .catch(e=> console.log(e))
    }
    

    /*const platformNames = [
        {key:"1", value:"booking.com"},
        {key:"2", value:"Trip Advisor"},
        {key:"3", value:"Agoda.com"}

    ]*/

    const [platformNames, setPlatformNames] = useState([
        { label: 'Booking.com', value: 'booking.com' },
        { label: 'Agoda.com', value: 'agoda.com' },
        { label: 'Expedai.com', value: 'expedia.com' },
        // Add more platforms here
      ]);

    function handleName (e) {
        nameVar = e.nativeEvent.text
        setName(nameVar);
        setNameVerify(false)

        if (nameVar.length > 1){
            setNameVerify(true)
        }
    }

    function handleEmail (e) {
        const emailVar = e.nativeEvent.text;
        setEmail(emailVar);
        setEmailVerify(false)

        if(/^[\w.%+-]+@[\w.-]+\.[a-zA-Z]{2,}$/.test(emailVar)){
            setEmail(emailVar)
            setEmailVerify(true)
        }
    }

    function handleCityorTown (e) {
        cityorTownVar = e.nativeEvent.text
        setcityorTown(cityorTownVar);
    }

    function handlePassword (e) {
        passwordVar = e.nativeEvent.text
        setPassword(passwordVar);
    }

    function handlePropertyName (e) {
        propertyNameVar = e.nativeEvent.text
        setPropertyName(propertyNameVar);
        setPropertyNameVerify(false)

        if (propertyNameVar.length > 1){
            setPropertyNameVerify(true)
        }
    }

    const handleUrlChange = (platform, url) => {
        setUrls((prevUrls) => ({
          ...prevUrls,
          [platform]: url,
        }));
      };

    



    return(

        <ScrollView>
            <View style = {styles.imageContainer}>
                <Image
                source={require('../images/signin.png')}
                style = {styles.logo}>
                </Image>
            </View>
            <Text style = {styles.textSignin}>Sign In</Text>
            <View style={styles.inputContainer}>
                
                <TextInput style = {styles.input}
                placeholder="Name" onChange={e=>handleName(e)}></TextInput>

                {name.length < 1 ? null : nameVerify ? (<Text></Text>) : 
                (<Text style={{color:'red'}}>Input a valid Name</Text>)}
                
                <TextInput style = {styles.input}
                placeholder="Email" onChange={e=>handleEmail(e)}></TextInput>

                {email.length <1 ? null : emailVerify ? (<Text></Text>) : 
                (<Text style={{color:'red'}}>Input a valid Email</Text>)} 

            </View>
            
            <View style={styles.selectList}>
                <MultipleSelectList
                    setSelected={(val)=>setSelected(val)}
                    data = {platformNames}
                    placeholder="Select Platforms"
                ></MultipleSelectList>
            </View>
            {selected.map((platform) => (
                <View key={platform} style={styles.urlList}>
                <Text>{platform} URL:</Text>
                <TextInput
                    placeholder={`Enter URL for ${platform}`}
                    style = {styles.input}
                    onChangeText={text => handleUrlChange(platform, text)}
                />
                </View>
             ))}

            <View style={styles.inputContainer}>
                <TextInput style = {styles.input}
                placeholder="Property Name" onChange={e=>handlePropertyName(e)}></TextInput>
                <TextInput style = {styles.input}
                placeholder="City or Town"  editable={true} onChange={e=>handleCityorTown(e)}></TextInput>
                <TextInput style = {styles.input}
                placeholder="Password" onChange={e=>handlePassword(e)} ></TextInput>
            </View>

            <View style = {{alignItems:'center'}}>
                <TouchableOpacity style = {styles.buttonContainer}
                onPress={()=> handleSubmit()}>
                    <Text style={styles.buttonText}>Sign In</Text>
                </TouchableOpacity>
            </View>
            
        </ScrollView>
        
    )
}

const styles = StyleSheet.create({
    logo : {
        height : 100,
        width : 100
    },
    imageContainer : {
        alignItems : 'center',
        justifyContent : 'center',
        paddingTop : 10
    },
    textSignin : {
        fontSize : 40,
        fontWeight : 'bold',
        color : 'black',
        paddingLeft :6,
        textAlign: 'center'
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
    },
    selectList : {
        margin: 20
    },
    urlList:{
        alignItems: 'center',
        marginTop : 10

    }
})



export default SignInScreen;