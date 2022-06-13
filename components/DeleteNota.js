import { withStyles } from "@ui-kitten/components";
import { PropsService } from "@ui-kitten/components/devsupport";
import React from "react";
import {Text,  ScrollView, StyleSheet, View,TouchableOpacity} from 'react-native';
import * as Style from '../assets/style';
import {styles} from './Notas'
import AsyncStorage from '@react-native-async-storage/async-storage';

const DeleteNota = ({...props}) =>{

    function emptyBin(){
       
        let emptyArray = [...props.moveToBin]
        emptyArray = [];
        props.setMoveToBin(emptyArray);

        AsyncStorage.setItem('deletedNotas', JSON.stringify(emptyArray)).then(() => {
            setMoveToBin(emptyArray)
          }).catch(error => console.log(error))
     }
                
     function undoAllNotas(){
       
        let deleteNota = [...props.moveToBin];
        let notas = [...props.notas];
        deleteNota.forEach((item, index) =>{
            notas.push(item)
        })
        props.setMoveToBin([]);
        props.setNotas(deleteNota);

        AsyncStorage.setItem('storedNotas', JSON.stringify(notas)).then(() =>{
            props.setNotas(notas);
          }).catch(error => console.log(error))

          AsyncStorage.setItem('deletedNotas', JSON.stringify([])).then(() =>{
            props.setMoveToBin([]);
          }).catch(error => console.log(error))
     }

     function undoNota(index){
       
        let getBack = props.moveToBin[index]; 
        let array = [getBack, ...props.notas];
        props.setNotas(array);

        let newArray =  [...props.moveToBin];
        newArray.splice(index, 1);
        props.setMoveToBin(newArray);
        
        AsyncStorage.setItem('storedNotas', JSON.stringify(array)).then(() =>{
            props.setNotas(array);
          }).catch(error => console.log(error))

          AsyncStorage.setItem('deletedNotas', () => {
              return;
          })
     }

    function permanentlyDelete(index){
        let newArray = [...props.moveToBin]
        newArray.splice(index, 1)
        props.setMoveToBin(newArray);

        AsyncStorage.setItem('deletedNotas', JSON.stringify(newArray)).then(() =>{
            props.setMoveToBin(newArray);
          }).catch(error => console.log(error))
    }

    return(
        <ScrollView>

            <View style={[styles.notasContainer]}>

                <View style={{flexDirection:'row', justifyContent:'space-between', alignItems:'center'}}>

                    <TouchableOpacity style={style.emptyButton} onPress={() => undoAllNotas()}>
                        <Text style={style.emptyButtonText}>Recuperar Tudo</Text>
                    </TouchableOpacity>

                    <Text style={{fontWeight: '700', fontSize: 18, color:Style.color}}>
                        Total: {props.moveToBin.length}
                    </Text>

                    <TouchableOpacity style={style.emptyButton} onPress={() => emptyBin()}>
                        <Text style={style.emptyButtonText}>Esvaziar</Text>
                    </TouchableOpacity>
                </View>

                <View style={styles.divider}></View>


                {props.moveToBin.length === 0
                ?
                
                <View style={styles.emptyNotaContainer}>
                    <Text style={styles.emptyNotaText}>Nada para mostrar ainda...!</Text>
                </View>
                :

                props.moveToBin.map((item, index) => 
                    
                    <View style={styles.item} key={index}>
                        <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
                            <View style={styles.nota}>
                                <Text style={styles.index}>{index + 1}. </Text>
                                <Text style={styles.text}>{item}</Text>
                            </View>

                            <TouchableOpacity onPress={() => undoNota(index)}>
                                <Text style={styles.delete}>Recuperar</Text>
                            </TouchableOpacity>
                        </View>

                        <View style={styles.dataContainer} >
                            <Text>{props.date}</Text>

                            <TouchableOpacity onPress={() => permanentlyDelete(index)}>
                                <Text style={styles.delete}>Deletar</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                )}
            </View>
        </ScrollView>

    )
}
export const style = StyleSheet.create({

    emptyButton:{
        backgroundColor: Style.color,
        width: '25%',
        borderRadius: 100,
        justifyContent: 'center',
        alignItems: 'center',
        height: 35,
        marginBottom:5
    },

    emptyButtonText:{
        color: 'white',
        fontSize: 16,
        fontWeight:'700'
    }
})
export default DeleteNota;