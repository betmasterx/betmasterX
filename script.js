
let currentUser = null;

function getUsers() {
  return JSON.parse(localStorage.getItem("users") || "{}");
}

function saveUsers(users) {
  localStorage.setItem("users", JSON.stringify(users));
}

function register() {
  const username = document.getElementById("username").value;
  const password = document.getElementById("password").value;
  const users = getUsers();

  if (users[username]) {
    alert("User already exists!");
    return;
  }

  users[username] = { password, balance: 0 };
  saveUsers(users);
  alert("Registered successfully!");
}

function login() {
  const username = document.getElementById("username").value;
  const password = document.getElementById("password").value;
  const users = getUsers();

  if (users[username] && users[username].password === password) {
    currentUser = username;
    document.getElementById("userDisplay").innerText = username;
    document.getElementById("auth").classList.add("hidden");
    document.getElementById("userPanel").classList.remove("hidden");
    updateBalance();

    if (username === "admin") {
      document.getElementById("adminPanel").classList.remove("hidden");
    }
  } else {
    alert("Invalid credentials!");
  }
}

function logout() {
  currentUser = null;
  document.getElementById("auth").classList.remove("hidden");
  document.getElementById("userPanel").classList.add("hidden");
}

function updateBalance() {
  const users = getUsers();
  document.getElementById("balance").innerText = users[currentUser].balance;
}

function showDeposit() {
  document.getElementById("transactionPanel").classList.remove("hidden");
  document.getElementById("transactionPanel").dataset.type = "deposit";
}

function showWithdraw() {
  document.getElementById("transactionPanel").classList.remove("hidden");
  document.getElementById("transactionPanel").dataset.type = "withdraw";
}

function submitTransaction() {
  const amount = parseInt(document.getElementById("amount").value);
  const type = document.getElementById("transactionPanel").dataset.type;
  const users = getUsers();

  if (type === "deposit" && amount >= 100) {
    users[currentUser].balance += amount;
  } else if (type === "withdraw" && amount >= 500 && amount <= 25000 && users[currentUser].balance >= amount) {
    users[currentUser].balance -= amount;
  } else {
    alert("Invalid transaction.");
    return;
  }

  saveUsers(users);
  updateBalance();
  document.getElementById("transactionPanel").classList.add("hidden");
}

function playGame(gameName) {
  const users = getUsers();
  if (users[currentUser].balance < 50) {
    alert("Not enough balance to play.");
    return;
  }
  users[currentUser].balance -= 50;
  if (Math.random() < 0.5) {
    users[currentUser].balance += 100;
    alert("You won in " + gameName + "!");
  } else {
    alert("You lost in " + gameName + ".");
  }
  saveUsers(users);
  updateBalance();
}

function loadAllUsers() {
  const users = getUsers();
  const list = document.getElementById("userList");
  list.innerHTML = "";
  for (const user in users) {
    const li = document.createElement("li");
    li.textContent = `${user}: ${users[user].balance}৳`;
    list.appendChild(li);
  }
}
