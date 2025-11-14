import React, { useState } from 'react';
import { View, Text, TextInput, Button, FlatList, StyleSheet, Alert } from 'react-native';

const initial = [
  { id: '1', name: 'أحمد', service: 'سباكة', area: 'القاهرة' },
  { id: '2', name: 'مريم', service: 'تنظيف', area: 'الإسكندرية' },
];

export default function WorkersScreen(){
  const [list, setList] = useState(initial);
  const [name, setName] = useState('');
  const [service, setService] = useState('');
  const [area, setArea] = useState('');
  const [filter, setFilter] = useState('');

  function add(){
    if(!name || !service || !area) return Alert.alert('خطأ','املأ الحقول');
    const item = { id: Date.now().toString(), name, service, area };
    setList([item, ...list]);
    setName(''); setService(''); setArea('');
  }

  const filtered = filter ? list.filter(i => i.area.includes(filter) || i.service.includes(filter)) : list;

  return (
    <View style={styles.container}>
      <Text style={styles.title}>أضف عامل / مزود خدمة</Text>
      <TextInput placeholder="اسم العامل" style={styles.input} value={name} onChangeText={setName} />
      <TextInput placeholder="نوع الخدمة" style={styles.input} value={service} onChangeText={setService} />
      <TextInput placeholder="المنطقة" style={styles.input} value={area} onChangeText={setArea} />
      <Button title="أضف" onPress={add} />

      <View style={{height:12}} />
      <TextInput placeholder="فلتر بحث (المنطقة أو الخدمة)" style={styles.input} value={filter} onChangeText={setFilter} />

      <FlatList data={filtered} keyExtractor={i=>i.id} renderItem={({item})=>(
        <View style={styles.item}>
          <Text style={styles.itemTitle}>{item.name} — {item.service}</Text>
          <Text style={styles.itemSub}>المنطقة: {item.area}</Text>
        </View>
      )} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { padding:16, flex:1 },
  title: { fontSize:18, fontWeight:'700', marginBottom:8 },
  input: { borderWidth:1, borderColor:'#ddd', padding:10, borderRadius:8, marginBottom:8 },
  item: { padding:12, borderWidth:1, borderColor:'#eee', borderRadius:8, marginBottom:8 },
  itemTitle: { fontWeight:'700' },
  itemSub: { color:'#555' }
});
