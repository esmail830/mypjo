import AsyncStorage from '@react-native-async-storage/async-storage';

const USERS_KEY = 'SS_USERS';
const SESSION_KEY = 'SS_SESSION';

export async function registerUser({ phone, password, name }){
  const raw = await AsyncStorage.getItem(USERS_KEY);
  const users = raw ? JSON.parse(raw) : [];
  if (users.find(u => u.phone === phone)) throw new Error('رقم الهاتف مسجل بالفعل');
  const user = { id: Date.now(), phone, password, name };
  users.push(user);
  await AsyncStorage.setItem(USERS_KEY, JSON.stringify(users));
  await AsyncStorage.setItem(SESSION_KEY, JSON.stringify({ id: user.id, phone: user.phone, name: user.name }));
  return user;
}

export async function loginUser({ phone, password }){
  const raw = await AsyncStorage.getItem(USERS_KEY);
  const users = raw ? JSON.parse(raw) : [];
  const user = users.find(u => u.phone === phone && u.password === password);
  if (!user) throw new Error('بيانات الدخول غير صحيحة');
  await AsyncStorage.setItem(SESSION_KEY, JSON.stringify({ id: user.id, phone: user.phone, name: user.name }));
  return { id: user.id, phone: user.phone, name: user.name };
}

export async function getSession(){
  const raw = await AsyncStorage.getItem(SESSION_KEY);
  return raw ? JSON.parse(raw) : null;
}

export async function logout(){
  await AsyncStorage.removeItem(SESSION_KEY);
}
