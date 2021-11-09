import { StatusBar } from 'expo-status-bar';
import React, { useState } from 'react';
import { View, Image, SafeAreaView, Text, StyleSheet, TouchableOpacity, Linking, ActivityIndicator } from 'react-native';
import api from './src/services/api';
import { FontAwesome5 } from '@expo/vector-icons';

export default function App() {

  const [cat, setCat] = useState([])
  const [loading, setLoading] = useState(true);

  async function loadCats(){
    const response = await api.get('v1/images/search')
    setCat(response.data[0])
    setLoading(false);
  }

  console.log('API:', cat)

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar style="auto" />
        
      {loading === true ? 
        (
          <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center'}}>
            <Text style={{ fontSize: 18, color: '#000' }}>Aperte o botão para mostrar o gatuno</Text>

            <TouchableOpacity 
              style={[styles.botao, { marginTop: 50 }]}
              onPress={loadCats}
            >
              <Text style={styles.texto}>Mostre o Gatinho</Text>
              <FontAwesome5 name="cat" size={24} color="white" />

            </TouchableOpacity>
          
          </View>
        ) 
        : (
          <>
            <Image
              source={{uri: cat.url}}
              style={{ height: cat.height, width: '98%', flex: 0.6,}}
              resizeMode='contain'
            />

            <View style={{ flex: 0.1, justifyContent: 'center',  }}>

              <TouchableOpacity 
                style={styles.botao}
                onPress={loadCats}
              >
                <Text style={styles.texto}>Mostre mais Gatinhos</Text>
                <FontAwesome5 name="cat" size={24} color="white" />

              </TouchableOpacity>

            </View>
          </>
        )
      }

        {cat.url != null &&
          <View style={{ flex: 0.1, justifyContent: 'center',  }}>
            <TouchableOpacity
              style={styles.botao}
              onPress={() => {
                Linking.openURL(cat.url);
            }}>
              <Text style={styles.texto}>Baixe a imagem</Text>
              <FontAwesome5 name="image" size={24} color="white" />
            </TouchableOpacity>
          </View>
        }
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
  botao:{
    width: '50%',
    height: 40,
    alignItems: 'center',
    justifyContent: 'space-evenly',
    borderRadius: 20,
    flexDirection: 'row',
    backgroundColor: '#803945',
  },
  texto:{
    color: '#fff',
    fontSize: 15,
  },
});
