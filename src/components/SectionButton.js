import React from 'react';
import { TouchableOpacity, Text, StyleSheet } from 'react-native';

export default function SectionButton({ title, onPress }){
  return (
    <TouchableOpacity style={styles.btn} onPress={onPress}>
      <Text style={styles.text}>{title}</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  btn: { backgroundColor: '#2563eb', padding: 14, borderRadius: 8, marginVertical: 8 },
  text: { color: 'white', fontWeight: '600', textAlign: 'center' }
});
