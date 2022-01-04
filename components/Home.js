import React, { useState, useRef, useEffect } from 'react';
import {
  Text,
  View,
  StyleSheet,
  Dimensions,
  FlatList,
  TouchableOpacity,
  AsyncStorage,
  ScrollView,
} from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { FontAwesome } from '@expo/vector-icons';
import { FontAwesome5 } from '@expo/vector-icons';
import DialogInput from 'react-native-dialog-input';

export default function AddDiary({ navigation }) {
  const [data, setData] = useState(null);
  const [visible, setVisible] = useState(false);
  const [input, setInput] = useState('');

  useEffect(() => {
    AsyncStorage.getItem('shivamDiary').then((data) => {
      setData(JSON.parse(data));
    });
  }, [navigation]);

  const searchText = (inputText) => {
    setData(
      data.filter((item) =>
        item.title.toLocaleLowerCase().includes(inputText.toLocaleLowerCase())
      )
    );
    setVisible(!visible);
  };

  const showText = (item) => {
    console.log('show text');
    navigation.navigate('Show', {
      data: item,
    });
  };

  return (
    <View style={styles.container}>
      <StatusBar style="light" />

      {/* react ntive dialogue*/}
      <DialogInput
        isDialogVisible={visible}
        title={'Search'}
        hintInput={'Enter your search'}
        submitInput={(inputText) => {
          searchText(inputText);
        }}
        closeDialog={() => {
          setVisible(!visible);
        }}></DialogInput>

      <View style={styles.top}>
        <Text style={styles.topText}>WriteDiary</Text>
        <TouchableOpacity onPress={() => setVisible(!visible)}>
          <FontAwesome
            name="search"
            size={24}
            color="white"
            style={styles.topIcon}
          />
        </TouchableOpacity>
      </View>

      <TouchableOpacity
        style={styles.button}
        onPress={() => navigation.navigate('AddDiary')}>
        <FontAwesome5 name="pencil-alt" size={28} color="white" />
      </TouchableOpacity>

      <ScrollView>
        {data != null
          ? data.map((item) => (
              <TouchableOpacity style={styles.note} onPress={()=>showText(item)}>
                <View style={styles.design}>
                  <View style={styles.designTop}>
                    <Text style={styles.designTopText}>{item.day}</Text>
                  </View>

                  <View style={styles.designDay}>
                    <Text style={styles.designDayText}>{item.date}</Text>
                  </View>
                </View>

                <View style={styles.noteBox}>
                  <Text style={styles.title}>{item.title.slice(0, 34)}...</Text>
                  <Text style={styles.desc}>{item.desc.slice(0, 34)}...</Text>
                </View>
              </TouchableOpacity>
            ))
          : null}
      </ScrollView>
    </View>
  );
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    paddingTop: 20,
  },
  top: {
    backgroundColor: '#000',
    flexDirection: 'row',
    width: Dimensions.get('screen').width,
    height: 50,
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 13,
  },
  topText: {
    color: 'white',
    fontSize: 20,
  },
  topIcon: {},
  note: {
    flexDirection: 'row',
    paddingHorizontal: 8,
    borderBottomWidth: 1,
    borderBottomColor: '#8f8f8f',
    paddingVertical: 3,
  },
  design: {
    backgroundColor: 'red',

    alignItems: 'center',
    width: 60,
    height: 60,
  },
  designTop: {
    backgroundColor: 'green',
    width: 60,
    justifyContent: 'center',
    alignItems: 'center',
  },
  designTopText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
  },
  designDay: {
    backgroundColor: '#9f9e9e',
    width: 60,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
  },
  designDayText: {
    fontWeight: 'bold',
    fontSize: 18,
  },
  designDate: {},
  noteBox: {
    backgroundColor: '#fff',
    width: Dimensions.get('screen').width - 78,
    height: 62,
    justifyContent: 'center',
    paddingLeft: 5,
  },
  title: {
    fontSize: 17,
    fontWeight: 'bold',
    color: '#ff02c4',
  },
  desc: {
    fontSize: 17,
    fontWeight: 'bold',
    color: '#ff02c4',
  },

  button: {
    backgroundColor: '#ff02c4',
    width: 55,
    height: 55,
    borderRadius: 100,
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
    bottom: 14,
    zIndex: 12,
    right: 14,
  },
});
