import React, { useState } from 'react';
import { View, Text, TextInput, Button, FlatList, StyleSheet, Alert } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function SudanProductsScreen(){
  const [title, setTitle] = useState('');
  const [desc, setDesc] = useState('');
  const [list, setList] = useState([]);

  async function load(){ 
    const raw = await AsyncStorage.getItem('sudan_products');
    setList(raw? JSON.parse(raw): []);
  }
  React.useEffect(()=>{ load(); }, []);

  async function add(){
    if(!title) return Alert.alert('خطأ','أدخل اسم المنتج');
    const item = { id: Date.now().toString(), title, desc };
    const newList = [item, ...list];
    setList(newList);
    await AsyncStorage.setItem('sudan_products', JSON.stringify(newList));
    setTitle(''); setDesc('');
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>منتجات سودانية</Text>
      <TextInput placeholder="اسم المنتج" style={styles.input} value={title} onChangeText={setTitle} />
      <TextInput placeholder="تفاصيل" style={styles.input} value={desc} onChangeText={setDesc} />
      <Button title="أضف منتج" onPress={add} />
      <FlatList data={list} keyExtractor={i=>i.id} renderItem={({item})=>(
        <View style={styles.item}><Text style={styles.itemTitle}>{item.title}</Text><Text>{item.desc}</Text></View>
      )} />
    </View>
  );
}

const styles = StyleSheet.create({
  container:{padding:16, flex:1},
  title:{fontSize:18,fontWeight:'700',marginBottom:8},
  input:{borderWidth:1,borderColor:'#ddd',padding:10,borderRadius:8,marginBottom:8},
  item:{padding:12,borderWidth:1,borderColor:'#eee',borderRadius:8,marginBottom:8},
  itemTitle:{fontWeight:'700'}
});
