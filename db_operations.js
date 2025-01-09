import { db, collection, addDoc, getDocs } from './firebase.js';

// Agregar usuario a Firestore
export async function addUser(user) {
    try {
        const docRef = await addDoc(collection(db, "asistencia"), user);
        console.log("Documento agregado con ID: ", docRef.id);
    } catch (e) {
        console.error("Error al agregar documento: ", e);
    }
}

// Obtener usuarios de Firestore
export async function getUsers() {
    const querySnapshot = await getDocs(collection(db, "asistencia"));
    let users = [];
    querySnapshot.forEach((doc) => {
        users.push(doc.data());
    });
    return users;
}
