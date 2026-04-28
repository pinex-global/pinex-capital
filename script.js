import { initializeApp } from "https://gstatic.com";
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, onAuthStateChanged, signOut } from "https://gstatic.com";
import { getFirestore, doc, setDoc, getDoc } from "https://gstatic.com";

const firebaseConfig = {
  apiKey: "AIzaSyBHy0e3Lg8doEFiUOhkScpZk-1eRnnes30",
  authDomain: "://firebaseapp.com",
  projectId: "pinex-capital",
  storageBucket: "pinex-capital.firebasestorage.app",
  messagingSenderId: "971978946939",
  appId: "1:971978946939:web:2dca7444752540f44125de"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

window.toggleAuth = () => {
    const l = document.getElementById('login-form');
    const s = document.getElementById('signup-form');
    if (l.style.display === 'none') {
        l.style.display = 'block';
        s.style.display = 'none';
    } else {
        l.style.display = 'none';
        s.style.display = 'block';
    }
};

window.handleSignup = async () => {
    const n = document.getElementById('reg-name').value;
    const e = document.getElementById('reg-email').value;
    const p = document.getElementById('reg-pass').value;
    try {
        const res = await createUserWithEmailAndPassword(auth, e, p);
        await setDoc(doc(db, "users", res.user.uid), { fullName: n, email: e, usdtBalance: 0, goldBalance: 0 });
        alert("Account Created!");
    } catch (err) { alert(err.message); }
};

window.handleLogin = async () => {
    const e = document.getElementById('email').value;
    const p = document.getElementById('password').value;
    try { await signInWithEmailAndPassword(auth, e, p); } catch (err) { alert(err.message); }
};

onAuthStateChanged(auth, async (user) => {
    const gate = document.getElementById('auth-gate');
    const dash = document.getElementById('main-dashboard');
    if (user) {
        gate.style.display = "none"; dash.style.display = "block";
    } else {
        gate.style.display = "block"; dash.style.display = "none";
    }
});
