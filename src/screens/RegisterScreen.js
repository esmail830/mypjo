import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, Alert } from 'react-native';
import { registerUser } from '../services/authService';

export default function RegisterScreen({ navigation }){
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');

  async function submit(){
    try{
      await registerUser({ name, phone, password });
      navigation.replace('Home');
    }catch(e){
      Alert.alert('خطأ', e.message);
    }
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>إنشاء حساب جديد</Text>
      <TextInput placeholder="الاسم" style={styles.input} value={name} onChangeText={setName} />
      <TextInput placeholder="رقم الهاتف" style={styles.input} value={phone} onChangeText={setPhone} keyboardType="phone-pad" />
      <TextInput placeholder="كلمة المرور" style={styles.input} value={password} onChangeText={setPassword} secureTextEntry />
      <Button title="إنشاء" onPress={submit} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex:1, justifyContent:'center', padding:20 },
  title: { fontSize:22, fontWeight:'700', marginBottom:20, textAlign:'center' },
  input: { borderWidth:1, borderColor:'#ddd', padding:12, borderRadius:8, marginBottom:12 }
});
