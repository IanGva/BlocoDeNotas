import React, { useState } from "react";
import { Text, StyleSheet, View, TouchableOpacity,TextInput, ScrollView, Alert, Keyboard } from "react-native";
import * as Style from '../assets/style';
import * as eva from '@eva-design/eva';
import { ApplicationProvider, IconRegistry, Layout, Icon } from '@ui-kitten/components';
import { EvaIconsPack } from '@ui-kitten/eva-icons';
import AsyncStorage from "@react-native-async-storage/async-storage";

const Notas = ({navigation, ...props}) => {

    function deleteNota(index){
        let newArray = [...props.notas];
        let movedNota = newArray.splice(index, 1)
        props.setNotas(newArray);
        props.setMoveToBin(movedNota);

        let bin = [movedNota, ...props.moveToBin];
        props.setMoveToBin(bin);

        AsyncStorage.setItem('storedNotas', JSON.stringify(newArray)).then(() => {
            props.setNotas(newArray)
          }).catch(error => console.log(error))
      
          AsyncStorage.setItem('deletedNotas', JSON.stringify(bin)).then(() =>{
            props.setMoveToBin(bin);
          }).catch(error => console.log(error))
    }

    function clearAllNotas(){
        let emptyArray = [...props.notas];
        let deletedCompArray = [...props.moveToBin];
        emptyArray.forEach((item, index) => {
            deletedCompArray.push(item);
        })
        emptyArray = [];
        props.setNotas(emptyArray);
        props.setMoveToBin(deletedCompArray);

        AsyncStorage.setItem('storedNotas', JSON.stringify(emptyArray)).then(() => {
            props.setNotas(emptyArray)
          }).catch(error => console.log(error))
      
          AsyncStorage.setItem('deletedNotas', JSON.stringify(deletedCompArray)).then(() =>{
            props.setMoveToBin(deletedCompArray);
          }).catch(error => console.log(error))
    }

    return(
        <View style={[styles.notasContainer]}>
            <View style={styles.headingContainer}>
                <Text style={styles.heading}>Suas Notas...</Text>

                <View style={{flexDirection:'row'}}>

                    <TouchableOpacity style={[styles.button, {marginLeft:40}]} onPress={() => navigation.navigate('DeleteNota')}>
                    <IconRegistry icons={EvaIconsPack}/>
                    <ApplicationProvider {...eva} theme={eva.light}>
                        <Icon name='trash-2-outline' fill='white' style={{width:25, height:50}}/>
                    </ApplicationProvider>
                    </TouchableOpacity>

                    <TouchableOpacity style={[styles.button]} onPress={() => navigation.navigate('AddNota')}>
                    <IconRegistry icons={EvaIconsPack}/>
                    <ApplicationProvider {...eva} theme={eva.light}>
                        <Icon name='plus-outline' fill='white' style={{width:25, height:50}}/>
                    </ApplicationProvider>
                    </TouchableOpacity>
                </View>
            </View>

            <View style={{flexDirection: 'row', alignItems: 'center'}}>
                <Text style={{ fontWeight: '700', fontSize: 18, color: Style.color}}>
                    Total: {props.notas.length}
                </Text>
            </View>

            <View style={styles.divider}></View>

            <View style={styles.searchContainer}>

                <TouchableOpacity style={styles.searchButton} onPress={() => clearAllNotas()}>
                    <Text style={styles.searchButtonText} >Limpar</Text>
                </TouchableOpacity>
            </View>

            <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>

                {props.notas.length === 0
                ?
                <View style={styles.emptyNotaContainer}>
                    <Text style={styles.emptyNotaContainer}>Ainda não há nota! Clique no botão + mais para adicionar uma nova nota...</Text>
                </View>
                :

                props.notas.map((item, index) => 

                    <View style={styles.item} key={index}>
                        <View style={{flexDirection:'row', justifyContent:'space-between'}}>

                        <View style={styles.nota}>
                            <Text style={styles.index}>{index + 1}. </Text>
                            <Text style={styles.text}>{item}</Text>
                        </View>

                        <TouchableOpacity onPress={() => deleteNota(index)}>
                            <Text style={styles.delete}>X</Text>
                        </TouchableOpacity>
                    </View>
                    
                    <View style={styles.dataContainer}>
                        <Text>Data: {props.date}</Text>
                    


                    </View>
                 </View>   

                )}

            </ScrollView>
        </View>
    );
}

export const styles = StyleSheet.create({

notasContainer:{
    paddingTop: 10,
    paddingHorizontal: 20, 
    marginBottom: 70,
    opacity: 0.9
},

heading:{
    fontSize: 30,
    fontWeight: '700',
    color: Style.color
},

divider:{
    width: '100%',
    height:2,
    backgroundColor: Style.color,
    marginTop: 5,
    marginBottom: 5
},

item:{
    marginBottom: 20,
    padding: 15,
    color: 'black',
    opacity: 0.8,
    marginTop: 10,
    shadowColor: Style.color,
    shadowOpacity: 0.5,
    shadowOffset: {width:0, height: 4},
    shadowRadius: 8,
    elevation: 5,
    backgroundColor: 'white',
    borderColor:Style.color,
    borderWidth:2,
    borderRadius:5,
    borderLeftWidth: 15
    
},

index:{
    fontSize: 20,
    fontWeight: '800',
    color: Style.color,
},

headingContainer:{
    flexDirection: 'row',
    justifyContent: "space-between",
    alignItems: "center",
    color: Style.color
},

button:{
    backgroundColor: Style.color,
    width: 50,
    borderRadius: 100,
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft:10,
    height:50
},

buttonText:{
    color:'white',
    fontSize:32,
    fontWeight: '800'
},

scrollView:{
    marginBottom:70
},

nota:{
    flexDirection:'row',
    width:'75%'
},

text:{
    fontWeight: '700',
    fontSize: 17,
    alignSelf: 'center'
},

delete:{
    color: Style.color,
    fontWeight:'700',
    fontSize: 15
},   

input:{
    height: 40,
    paddingHorizontal: 20,
    width: '65%',
    fontSize:19,
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

searchContainer:{
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginVertical: 8
},

searchButton:{
    backgroundColor:Style.color,
    alignItems:"center",
    justifyContent: "center",
    width: 60,
    borderRadius:5,
    height:40
},

searchButtonText:{
    color: 'white',
    fontWeight:'700',
    justifyContent: "center",
    alignItems:'center',
    fontSize:12,
   
   
},

emptyNotaContainer:{
    alignItems: "center",
    marginTop: 240
},


emptyNotaText:{
    color: Style.color,
    fontWeight: '600',
    fontSize:15
},

dataContainer:{
    marginTop:10,
    flexDirection:"row",
    justifyContent:"space-between",
    marginTop:20
},

});
export default Notas;