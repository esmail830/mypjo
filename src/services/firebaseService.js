import { db } from './firebaseConfig';
import { collection, addDoc, getDocs, query, where } from 'firebase/firestore';

export async function addRequest(collectionName, data){
  if(!db) throw new Error('Firebase not configured');
  const col = collection(db, collectionName);
  const docRef = await addDoc(col, data);
  return docRef.id;
}

export async function fetchRequests(collectionName){
  if(!db) throw new Error('Firebase not configured');
  const col = collection(db, collectionName);
  const snap = await getDocs(col);
  return snap.docs.map(d => ({ id: d.id, ...d.data() }));
}
