import { StatusBar } from 'expo-status-bar';
import React, { useState } from 'react';
import { View, Image, SafeAreaView, Text, StyleSheet, TouchableOpacity } from 'react-native';
import api from './src/services/api';
import { FontAwesome5 } from '@expo/vector-icons';

export default function App() {

  const [cat, setCat] = useState([])

  async function loadCats(){
    const response = await api.get('v1/images/search')
    setCat(response.data[0])
  }

  console.log('AQUI: ', cat)

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar style="auto" />
        <Image
          source={{uri: cat.url}}
          style={{ height: cat.height, width: '99%', flex: 0.5 }}
          resizeMode='contain'
        />

        <View style={{ flex: 0.2, justifyContent: 'center' }}>
          <TouchableOpacity 
            style={{
            width: '50%',
            height: 40,
            alignItems: 'center',
            justifyContent: 'space-evenly',
            borderRadius: 20,
            flexDirection: 'row',
            backgroundColor: '#803945'
            }}
            onPress={loadCats}
          >
            <Text style={{ color: '#fff', fontSize: 15 }}>Mostre o Gatinho!</Text>
            <FontAwesome5 name="cat" size={24} color="white" />
          </TouchableOpacity>
        </View>

        <Text style={{ marginTop: 50, fontSize: 12, color: 'gray' }}>Made by Renan Dore</Text>

        <TouchableOpacity onPress={cat.url}>
          <Text>Baixe aqui a imagem</Text>
        </TouchableOpacity>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFC0CB',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
