// 1. Toggle between Login and Signup Forms
function toggleAuth() {
    const loginForm = document.getElementById('login-form');
    const signupForm = document.getElementById('signup-form');
    
    if (loginForm.style.display === "none") {
        loginForm.style.display = "block";
        signupForm.style.display = "none";
    } else {
        loginForm.style.display = "none";
        signupForm.style.display = "block";
    }
}

// 2. Handle Login (Simulation for now)
function handleLogin() {
    const email = document.getElementById('email').value;
    const pass = document.getElementById('password').value;

    if (email === "" || pass === "") {
        alert("Please enter your credentials.");
        return;
    }

    // Hide Login Gate, Show Dashboard
    document.getElementById('auth-gate').style.display = "none";
    document.getElementById('main-dashboard').style.display = "block";
    
    alert("Welcome back to Pinex Capital!");
    
    // Start your price tickers once logged in
    fetchPrices(); 
}

// 3. Handle Signup (Simulation for now)
function handleSignup() {
    const name = document.getElementById('reg-name').value;
    const email = document.getElementById('reg-email').value;
    const pass = document.getElementById('reg-pass').value;

    if (!name || !email || !pass) {
        alert("Please fill in all fields.");
        return;
    }

    alert(`Account created for ${name}! You can now login.`);
    toggleAuth(); // Switch back to login form
}

// 4. Withdrawal Request Logic
function requestWithdrawal() {
    alert("Withdrawal request submitted! Our security team will audit the transaction and release funds within 24 hours.");
}
// Simulated App State
let balance = 0;
let goldBalance = 0;
const GOLD_PRICE = 2350.40;

// 1. Fetch Real-time Crypto Prices
async function fetchPrices() {
    try {
        const res = await fetch('https://coingecko.com');
        const data = await res.json();
        document.getElementById('btc-price').innerText = "$" + data.bitcoin.usd.toLocaleString();
        document.getElementById('sol-price').innerText = "$" + data.solana.usd.toLocaleString();
    } catch (e) { console.log("Price fetch failed"); }
}

// 2. Handle Deposits (Admin Simulation)
document.getElementById('depositForm').addEventListener('submit', function(e) {
    e.preventDefault();
    const amount = parseFloat(document.getElementById('depAmount').value);
    const txid = document.getElementById('txid').value;

    if (amount < 200) return alert("Minimum deposit is $200");

    alert(`TxID: ${txid} Submitted.\nOur Admin will verify this on the blockchain. Funds will appear within 60 minutes.`);
    
    // FOR DEMO: Automatically approve after 5 seconds
    setTimeout(() => {
        balance += amount;
        updateUI();
        alert("Deposit Approved! Your balance is now active.");
    }, 5000);
});

// 3. Trade Logic (USDT to Gold)
function calcTrade() {
    const spend = document.getElementById('tradeAmount').value;
    const receive = spend / GOLD_PRICE;
    document.getElementById('goldReceive').value = spend > 0 ? receive.toFixed(4) + " oz" : "";
}

function confirmTrade() {
    const spend = parseFloat(document.getElementById('tradeAmount').value);
    if (spend > balance) return alert("Insufficient funds. Deposit USDT first.");
    
    balance -= spend;
    goldBalance += (spend / GOLD_PRICE);
    updateUI();
    alert("Trade Successful! Your gold is now secured in the vault.");
}

// 4. KYC Logic
document.getElementById('kycForm').addEventListener('submit', function(e) {
    e.preventDefault();
    document.getElementById('kycArea').innerHTML = "<h3 style='color:orange'>KYC STATUS: PENDING REVIEW</h3><p>Your global documents are being checked against AML blacklists.</p>";
});

// 5. Update Interface
function updateUI() {
    document.getElementById('total-balance').innerText = "$" + balance.toLocaleString();
    document.getElementById('gold-bal').innerText = goldBalance.toFixed(4) + " oz";
    document.getElementById('usdt-bal').innerText = balance.toLocaleString() + " USDT";
}

// Initialize
fetchPrices();
setInterval(fetchPrices, 60000);
