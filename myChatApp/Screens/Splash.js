import React, { useState, useEffect } from 'react';
import {
    View,
    StyleSheet,
    Image,
    Text,
   
} from 'react-native';

export default function Splash({ navigation }) {


    useEffect(() => {
        setTimeout(() => {
            navigation.replace('Login');
        },2000);   
    }, []);




     return(
        <View
            style={styles.body}
        >
            <Image
                style={styles.logo}
                source={require('../assets/logo1.png')}
                
            />
            <Text 
            style={[
               
                styles.text]}
            >Gifted Chat</Text>

        </View>
    )
};

const styles = StyleSheet.create({
    body:{
        flex:1,
        alignItems:'center',
        backgroundColor:'#fff',
        justifyContent:'center',
    },
    logo:{
        width:150,
        height:150,
        margin:20,

    },
    text:{
        fontSize:40,
        color:'#26baf6',
        marginBottom:100,

    },
    input:{
        width:300,
        borderWidth:1,
        backgroundColor:'#fff',
        borderColor:'#555',
        borderRadius:10,
        fontSize:20,
        marginBottom:20,
        textAlign:'center',
        color:'#000000',
        
    },
})