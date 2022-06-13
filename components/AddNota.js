import React from "react";
import { Text,View, StyleSheet, ScrollView, KeyboardAvoidingView, Keyboard, TextInput, TouchableOpacity  } from "react-native";
import {TouchableWithoutFeedback } from "@ui-kitten/components/devsupport";
import * as Style from '../assets/style';
import { Alert } from "react-native-web";
import { NavigationContainer } from "@react-navigation/native";


const AddNota = ({navigation, ...props}) => {
    return(
       <ScrollView>
           <KeyboardAvoidingView behavior='padding'>

               <TouchableWithoutFeedback onPress={KeyboardAvoidingView.dismiss}>

                    <View style={{padding:20, justifyContent:'space-around'}}>

                        <TextInput style={[styles.input]} placeholder='Digite aqui...'
                        multiline={true}
                        value={props.nota} onChangeText={(text) => props.setNota(text)}/>

                        <TouchableOpacity style={styles.button} onPress={() => {
                            if(props.nota === ''){
                                alert("Por favor, digite algo...");
                            }else{
                                props.handleNota();
                                navigation.navigate('Notas')
                            }
                        }}>
                            <Text style={styles.buttonText}>Add</Text>
                        </TouchableOpacity>
                    </View>
               </TouchableWithoutFeedback>
           </KeyboardAvoidingView>
       </ScrollView>
    )
    
}


export const styles = StyleSheet.create({
    addNotasContainer:{
        paddingTop: 10,
        paddingHorizontal: 20, 
        marginBottom: 70,
        opacity: 0.9
    },

    input:{
        padding: 20,
        paddingTop: 20,
        height: 300,
        width: '100%',
        fontSize: 19,
        color: 'black',
        fontWeight: '600',
        opacity: 0.8,
        shadowColor: Style.color,
        shadowOpacity: 0.4,
        shadowOffset: {width:0, height: 4},
        shadowRadius: 8,
        elevation: 5,
        backgroundColor: 'white',
        borderColor:Style.color,
        borderWidth:2,
        borderRadius:5
    },
    
    button:{
        backgroundColor: Style.color,
        width: '40%',
        borderRadius: 100,
        justifyContent: 'center',
        alignItems: 'center',
        height: 40,
        alignSelf: "flex-end",
        marginTop:20
    },
    
    buttonText:{
        color:'white',
        fontSize:32,
        fontWeight: '500'
    },
  
})
export default AddNota;