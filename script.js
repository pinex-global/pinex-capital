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
