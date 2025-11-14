import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, Button, StyleSheet, Alert } from 'react-native';
import { loginUser, getSession } from '../services/authService';

export default function LoginScreen({ navigation }){
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');

  useEffect(() => {
    (async () => {
      const session = await getSession();
      if (session) navigation.replace('Home');
    })();
  }, []);

  async function submit(){
    try{
      await loginUser({ phone, password });
      navigation.replace('Home');
    }catch(e){
      Alert.alert('خطأ', e.message);
    }
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>تسجيل الدخول</Text>
      <TextInput placeholder="رقم الهاتف" style={styles.input} value={phone} onChangeText={setPhone} keyboardType="phone-pad" />
      <TextInput placeholder="كلمة المرور" style={styles.input} value={password} onChangeText={setPassword} secureTextEntry />
      <Button title="دخول" onPress={submit} />
      <View style={{height:12}} />
      <Button title="إنشاء حساب جديد" onPress={() => navigation.navigate('Register')} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex:1, justifyContent:'center', padding:20 },
  title: { fontSize:22, fontWeight:'700', marginBottom:20, textAlign:'center' },
  input: { borderWidth:1, borderColor:'#ddd', padding:12, borderRadius:8, marginBottom:12 }
});
