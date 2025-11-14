import React, { useState } from 'react';
import { View, Text, TextInput, Button, FlatList, StyleSheet, Alert, Picker } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function EventsScreen(){
  const [type, setType] = useState('Wedding');
  const [date, setDate] = useState('');
  const [guests, setGuests] = useState('100');
  const [list, setList] = useState([]);

  async function load(){ 
    const raw = await AsyncStorage.getItem('events');
    setList(raw? JSON.parse(raw): []);
  }
  React.useEffect(()=>{ load(); }, []);

  async function add(){
    if(!date) return Alert.alert('خطأ','اختر التاريخ');
    const item = { id: Date.now().toString(), type, date, guests };
    const newList = [item, ...list];
    setList(newList);
    await AsyncStorage.setItem('events', JSON.stringify(newList));
    setDate(''); setGuests('100');
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>تنظيم أعراس ومناسبات</Text>
      <Text>نوع المناسبة</Text>
      <TextInput placeholder="نوع (Wedding/Engagement/...)" style={styles.input} value={type} onChangeText={setType} />
      <TextInput placeholder="تاريخ (YYYY-MM-DD)" style={styles.input} value={date} onChangeText={setDate} />
      <TextInput placeholder="عدد الضيوف" style={styles.input} value={guests} onChangeText={setGuests} keyboardType="numeric" />
      <Button title="أضف طلب" onPress={add} />
      <FlatList data={list} keyExtractor={i=>i.id} renderItem={({item})=>(
        <View style={styles.item}><Text style={styles.itemTitle}>{item.type} — {item.date}</Text><Text>عدد الضيوف: {item.guests}</Text></View>
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
