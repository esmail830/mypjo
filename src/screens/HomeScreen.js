import React from 'react';
import { View, Text, ScrollView, StyleSheet, Alert } from 'react-native';
import SectionButton from '../components/SectionButton';
import { logout } from '../services/authService';

export default function HomeScreen({ navigation }){
  const sections = [
    'منتجات سودانية',
    'منتجات عامة',
    'طلب عمال',
    'تنظيم أعراس ومناسبات',
    'حجز شقق مفروشة/فاضية',
    'حجز عند الأطباء',
    'المفوضية السامية لشؤون اللاجئين'
  ];

  function openSection(name){
    if(name === 'طلب عمال') return navigation.navigate('Workers');
    if(name === 'حجز عند الأطباء') return navigation.navigate('Doctors');
    if(name === 'منتجات سودانية') return navigation.navigate('SudanProducts');
    if(name === 'منتجات عامة') return navigation.navigate('GeneralProducts');
    if(name === 'حجز شقق مفروشة/فاضية') return navigation.navigate('Apartments');
    if(name === 'تنظيم أعراس ومناسبات') return navigation.navigate('Events');
    if(name === 'المفوضية السامية لشؤون اللاجئين') return navigation.navigate('UNHCR');
    Alert.alert(name, `انتقلت إلى: ${name}`);
  }

  async function handleLogout(){
    await logout();
    navigation.replace('Login');
  }

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.header}>مرحباً بك في تطبيق الخدمات</Text>
      {sections.map(s => (
        <SectionButton key={s} title={s} onPress={() => openSection(s)} />
      ))}

      <View style={{height:12}} />
      <SectionButton title="تسجيل خروج" onPress={handleLogout} />

      <View style={{height:40}} />
      <Text style={styles.footer}>نسخة تجريبية — يمكن توسيع كل قسم بوظائف مفصّلة</Text>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { padding:20 },
  header: { fontSize:20, fontWeight:'700', marginBottom:12, textAlign:'center' },
  footer: { textAlign:'center', color:'#555', marginTop:18 }
});
