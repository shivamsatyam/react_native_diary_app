import React, { useState } from 'react';
import {
  Text,
  View,
  StyleSheet,
  Dimensions,
  SafeAreaView,
  TextInput,
  TouchableOpacity,
  AsyncStorage,
} from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { Ionicons } from '@expo/vector-icons';
import { AntDesign } from '@expo/vector-icons';
import { FontAwesome } from '@expo/vector-icons';
import { Entypo } from '@expo/vector-icons';

let a = new Date();
let b = a.toString();
export default function AddDiary({ navigation }) {
  const [title, setTitle] = useState('');
  const [desc, setDesc] = useState('');

  const addNote = () => {
    if (title === '' || desc === '') {
      alert('all the parameter are not filled');
      return;
    }

    AsyncStorage.getItem('shivamDiary').then((data) => {
      // console.log(data)
      if (data == null) {
        AsyncStorage.setItem(
          'shivamDiary',
          JSON.stringify([{day: b.slice(0, 3),date:b.slice(8,10),title:title,desc:desc }])
        ).then(()=>{
          console.log("first")
          navigation.goBack()
        })
      }
      else{
        console.log("not parse")
        data = JSON.parse(data)
        console.log("parse")
        data.push({ day: b.slice(0, 3),date:b.slice(8,10),title:title,desc:desc })
        console.log(data)
        AsyncStorage.setItem(
          'shivamDiary',
          JSON.stringify(data)
        ).then(()=>{
           console.log("secong")
          navigation.goBack()
        })
      }
    });
  };


  return (
    <View style={styles.container}>
      <StatusBar style="light" />
      <View style={styles.top}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Ionicons name="arrow-back" size={27} color="white" />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => addNote()}>
          <AntDesign name="check" size={27} color="white" />
        </TouchableOpacity>
      </View>

      <SafeAreaView style={{ padding: 12 }}>
        <View style={styles.caledar}>
          <Entypo name="calendar" size={24} color="black" />
          <Text style={styles.caledarText}>
            {b.slice(0, 3)}
            {', '}
            {a.toLocaleDateString()}
          </Text>
        </View>

        <View style={styles.titleBox}>
          <FontAwesome name="pencil" size={24} color="black" />
          <TextInput
            placeholder="ADD title  "
            value={title}
            onChangeText={(text) => setTitle(text)}
            style={styles.title}
          />
        </View>

        <View style={styles.titleBox}>
          <TextInput
            placeholder="Enter your description   "
            value={desc}
            onChangeText={(text) => setDesc(text)}
            style={styles.title}
            multiline={true}
          />
        </View>
      </SafeAreaView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ff02c4',
  },
  top: {
    width: Dimensions.get('screen').width,
    height: 50,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: 'black',
    padding: 12,
  },

  caledar: {
    backgroundColor: 'white',
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: 5,
    padding: 7,
  },

  caledarText: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#ff02c4',
    marginLeft: 12,
  },
  titleBox: {
    backgroundColor: 'white',
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: 5,
    padding: 7,
    marginVertical: 12,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#ff02c4',
    marginLeft: 12,
  },
});
