import React, { useState } from 'react';
import { View, Text, TextInput, Button, Picker, Alert, StyleSheet } from 'react-native';

export default function DoctorsScreen(){
  const [specialty, setSpecialty] = useState('General');
  const [disease, setDisease] = useState('');
  const [date, setDate] = useState('');

  function submit(){
    if(!disease || !date) return Alert.alert('خطأ','الرجاء تحديد نوع المرض والتاريخ');
    Alert.alert('تم', `تم إرسال طلب حجز مع تحديد: ${specialty} — ${disease} — ${date}`);
    setDisease(''); setDate('');
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>حجز عند الأطباء</Text>
      <Text style={styles.label}>التخصص</Text>
      <Picker selectedValue={specialty} onValueChange={v=>setSpecialty(v)} style={{height:50}}>
        <Picker.Item label="General" value="General" />
        <Picker.Item label="Pediatrics" value="Pediatrics" />
        <Picker.Item label="Gynecology" value="Gynecology" />
        <Picker.Item label="Internal Medicine" value="Internal Medicine" />
      </Picker>

      <TextInput placeholder="وصف المرض" style={styles.input} value={disease} onChangeText={setDisease} />
      <TextInput placeholder="تاريخ (YYYY-MM-DD)" style={styles.input} value={date} onChangeText={setDate} />

      <Button title="حجز" onPress={submit} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { padding:16, flex:1 },
  title: { fontSize:18, fontWeight:'700', marginBottom:8 },
  label: { marginTop:8, marginBottom:4 },
  input: { borderWidth:1, borderColor:'#ddd', padding:10, borderRadius:8, marginBottom:8 }
});
