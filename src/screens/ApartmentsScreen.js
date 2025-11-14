import React, { useState } from 'react';
import { View, Text, TextInput, Button, FlatList, StyleSheet, Alert } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function ApartmentsScreen(){
  const [city, setCity] = useState('');
  const [rooms, setRooms] = useState('1');
  const [notes, setNotes] = useState('');
  const [list, setList] = useState([]);

  async function load(){ 
    const raw = await AsyncStorage.getItem('apartments');
    setList(raw? JSON.parse(raw): []);
  }
  React.useEffect(()=>{ load(); }, []);

  async function add(){
    if(!city) return Alert.alert('خطأ','أدخل المنطقة/المدينة');
    const item = { id: Date.now().toString(), city, rooms, notes };
    const newList = [item, ...list];
    setList(newList);
    await AsyncStorage.setItem('apartments', JSON.stringify(newList));
    setCity(''); setRooms('1'); setNotes('');
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>حجز الشقق</Text>
      <TextInput placeholder="المدينة/المنطقة" style={styles.input} value={city} onChangeText={setCity} />
      <TextInput placeholder="عدد الغرف" style={styles.input} value={rooms} onChangeText={setRooms} keyboardType="numeric" />
      <TextInput placeholder="ملاحظات" style={styles.input} value={notes} onChangeText={setNotes} />
      <Button title="أضف طلب" onPress={add} />
      <FlatList data={list} keyExtractor={i=>i.id} renderItem={({item})=>(
        <View style={styles.item}><Text style={styles.itemTitle}>{item.city} — غرف: {item.rooms}</Text><Text>{item.notes}</Text></View>
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
