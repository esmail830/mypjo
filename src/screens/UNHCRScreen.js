import React, { useState } from 'react';
import { View, Text, TextInput, Button, Alert, StyleSheet } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function UNHCRScreen(){
  const [fullName, setFullName] = useState('');
  const [nationality, setNationality] = useState('');
  const [notes, setNotes] = useState('');

  async function submit(){
    if(!fullName || !nationality) return Alert.alert('خطأ','املأ الحقول المطلوبة');
    const item = { id: Date.now().toString(), fullName, nationality, notes };
    const raw = await AsyncStorage.getItem('unhcr_applications');
    const list = raw? JSON.parse(raw): [];
    const newList = [item, ...list];
    await AsyncStorage.setItem('unhcr_applications', JSON.stringify(newList));
    Alert.alert('تم','تم إرسال طلبك إلى المفوضية (نموذج تجريبي)');
    setFullName(''); setNationality(''); setNotes('');
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>تقديم/حجز موعد لدى المفوضية السامية لشؤون اللاجئين</Text>
      <TextInput placeholder="الاسم الكامل" style={styles.input} value={fullName} onChangeText={setFullName} />
      <TextInput placeholder="الجنسية" style={styles.input} value={nationality} onChangeText={setNationality} />
      <TextInput placeholder="ملاحظات/سبب الزيارة" style={styles.input} value={notes} onChangeText={setNotes} />
      <Button title="إرسال" onPress={submit} />
    </View>
  );
}

const styles = StyleSheet.create({
  container:{padding:16, flex:1},
  title:{fontSize:18,fontWeight:'700',marginBottom:8},
  input:{borderWidth:1,borderColor:'#ddd',padding:10,borderRadius:8,marginBottom:8}
});
