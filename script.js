console.log("Script is loading!");
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

// AUTH FUNCTIONS
window.toggleAuth = () => {
    const l = document.getElementById('login-form');
    const s = document.getElementById('signup-form');
    l.style.display = l.style.display === 'none' ? 'block' : 'none';
    s.style.display = s.style.display === 'none' ? 'block' : 'none';
};

window.handleSignup = async () => {
    const n = document.getElementById('reg-name').value;
    const e = document.getElementById('reg-email').value;
    const p = document.getElementById('reg-pass').value;
    try {
        const res = await createUserWithEmailAndPassword(auth, e, p);
        await setDoc(doc(db, "users", res.user.uid), { 
            fullName: n, 
            email: e, 
            usdtBalance: 0, 
            goldBalance: 0 
        });
        alert("Account Created!");
    } catch (err) { 
        alert(err.message); 
    }
};

window.handleLogin = async () => {
    const e = document.getElementById('email').value;
    const p = document.getElementById('password').value;
    try { 
        await signInWithEmailAndPassword(auth, e, p); 
    } catch (err) { 
        alert(err.message); 
    }
};

window.logout = () => signOut(auth);

// STATE OBSERVER
onAuthStateChanged(auth, async (user) => {
    const gate = document.getElementById('auth-gate'), dash = document.getElementById('main-dashboard');
    if (user) {
        gate.style.display = "none"; dash.style.display = "block";
        const snap = await getDoc(doc(db, "users", user.uid));
        if (snap.exists()) {
            const d = snap.data();
            document.getElementById('total-balance').innerText = "$" + d.usdtBalance.toLocaleString();
            document.getElementById('gold-bal').innerText = d.goldBalance.toFixed(4) + " oz";
            document.getElementById('usdt-bal').innerText = d.usdtBalance + " USDT";
        }
        fetchPrices();
    } else { gate.style.display = "block"; dash.style.display = "none"; }
});

// TICKER & TRADE
async function fetchPrices() {
    const res = await fetch('https://coingecko.com');
    const data = await res.json();
    document.getElementById('btc-price').innerText = "$" + data.bitcoin.usd.toLocaleString();
    document.getElementById('sol-price').innerText = "$" + data.solana.usd.toLocaleString();
}

window.calcTrade = () => {
    const s = document.getElementById('tradeAmount').value;
    document.getElementById('goldReceive').value = (s / 2350.40).toFixed(4) + " oz";
};

window.confirmTrade = () => alert("Trade submitted to Admin for approval.");
window.confirmTrade = () => {
    alert("Order Received! Your trade is pending admin approval to verify liquidity.");
};

