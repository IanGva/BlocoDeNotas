import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import Notas from './components/Notas';
import AddNota from './components/AddNota';
import DeleteNota from './components/DeleteNota';
import React, {useState, useEffect} from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

const Stack = createNativeStackNavigator();

export default function App() {

  const [nota, setNota] = useState();
  const [notas, setNotas] = useState([]);
  const [date, setDate] = useState(new Date().toLocaleDateString());
  const [moveToBin, setMoveToBin] = useState([]);

  function handleNota(){
    let novaNota = nota;
    let novaNotas = [novaNota, ...notas]
    setNotas(novaNotas);
    setNota('');

    AsyncStorage.setItem('storedNotas', JSON.stringify(novaNotas)).then(() => {
      setNotas(novaNotas)
    }).catch(error => console.log(error))

    AsyncStorage.setItem('data', JSON.stringify(date)).then(() =>{
      setDate(date);
    })
  }

  useEffect(() => {
    loadNotas();
  }, [])

  const loadNotas = () => {
    AsyncStorage.setItem('storedNotas').then(data => {
      if(data !== null){
        setNotas(JSON.parse(data));
      }
    }).catch((error) => console.log(error))

    AsyncStorage.setItem('deletedNotas').then(data => {
      if(data !== null){
        setMoveToBin(JSON.parse(data));
      }
    }).catch((error) => console.log(error))

    AsyncStorage.getItem('date');
  }

  return (
    <NavigationContainer>
      <Stack.Navigator>

        <Stack.Screen name="Notas">
          {props => <Notas {...props} moveToBin={moveToBin} setMoveToBin={setMoveToBin} notas={notas} setNotas={setNotas} nota={nota} setNota={setNota} date={date} setDate={setDate}/>}
        </Stack.Screen>
         
        <Stack.Screen name="AddNota">
        {props => <AddNota {...props} nota={nota} setNota={setNota} handleNota={handleNota}/>}
        </Stack.Screen>

        <Stack.Screen name="DeleteNota">
        {props => <DeleteNota {...props} moveToBin={moveToBin} setMoveToBin={setMoveToBin} notas={notas} setNotas={setNotas} date={date}/>}
        </Stack.Screen>


  
      </Stack.Navigator>
    </NavigationContainer>
  );
}

