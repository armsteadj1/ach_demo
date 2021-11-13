const ELEMENTS_KEY = "key_6jq4nLGh32QgDf6mierhLG";
const DECRYPT_KEY = "key_XcETzmrHLNf7VhdN8ePUab";
const STRIPE_REACTOR_ID = "a0e7a38c-648e-45d9-a83c-be5eca2d56fa";
const BRAINTREE_REACTOR_ID = "47e94b55-0d36-4f33-b0b2-f3ea30f15778";
const ADYEN_REACTOR_ID = "c4557374-94c4-4432-a24e-577c595e6e8b";
const PARROT_RECTOR_ID = "96476d26-8f64-4e8f-9e44-2ac9f913d123";

let bank_token;
let card;
const style = {
  style: {
    fonts: [
      "https://fonts.googleapis.com/css2?family=Source+Sans+Pro:ital,wght@0,200;0,300;0,400;0,600;0,700;0,900;1,200;1,300;1,400;1,600;1,700;1,900&display=swap"
    ],
    base: {
      color: "#fff",
      fontWeight: 500,
      fontFamily: "'Source Sans Pro'",
      fontSize: "16px",
      fontSmooth: "antialiased",
      "::placeholder": {
        color: "#6b7294"
      }
    },
    invalid: {
      color: "#ffc7ee"
    }
  }
};

window.addEventListener("load", async () => {
  console.log("loading");
  await BasisTheory.init(ELEMENTS_KEY, {
    elements: true
  });
});

function displaySuccess() {
  console.log(bank_token);
  document.getElementById(
    "card_token"
  ).innerHTML = `<b><u>Token:</u></b>&nbsp;&nbsp;${bank_token.id}`;
  document.getElementById("reactors").style.display = "flex";
}

function displayError() {
  document.getElementById("error").style.display = "flex";
}

async function readBank() {
  const response = await fetch(`/api/read/bank`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json"
    },
    body: JSON.stringify({
      bank_token_id: bank_token.id,
    })
  });

  const read_bank = await response.json();

  document.getElementById("view_only_result").style.display = "block";
  document.getElementById("view_only_button").style.display = "none";
  document.getElementById(
      "view_only_routing"
  ).innerHTML = `<b><u>Routing:</u></b>&nbsp;&nbsp;${read_bank.bank.routingNumber}`;
  document.getElementById(
      "view_only_account"
  ).innerHTML = `<b><u>Account:</u></b>&nbsp;&nbsp;${read_bank.bank.accountNumber}`;
}

async function decryptBank() {
  const response = await fetch(`/api/decrypt/bank`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json"
    },
    body: JSON.stringify({
      bank_token_id: bank_token.id,
    })
  });

  const decrypted_bank = await response.json();

  document.getElementById("decrypted_result").style.display = "block";
  document.getElementById("decrypt_and_edit_button").style.display = "none";
  document.getElementById('update_bank_routing').value=decrypted_bank.bank.routingNumber;
  document.getElementById('update_bank_account').value=decrypted_bank.bank.accountNumber;
}

async function submitBank() {
  console.log("hello");
  const routingNumber = document.getElementById("bank_routing").value;
  const accountNumber = document.getElementById("bank_account").value;

  console.log(routingNumber, accountNumber);

  bank_token = await BasisTheory.atomicBanks.create({
    bank: {
      routingNumber,
      accountNumber
    }
  });

  if (bank_token) {
    displaySuccess();
  }
}

async function updateBank() {
  console.log("hello");
  const routingNumber = document.getElementById("update_bank_routing").value;
  const accountNumber = document.getElementById("update_bank_account").value;


  const response = await fetch(`/api/update/bank`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json"
    },
    body: JSON.stringify({
      bank_token_id: bank_token.id,
      routingNumber,
      accountNumber
    })
  });

  bank_token = await response.json();

  document.getElementById("update_bank_success").style.display = "contents";
}

function tryAgain() {
  document.getElementById("parrot_token").style.display = "none";
  document.getElementById("stripe_token").style.display = "none";
  document.getElementById("braintree_token").style.display = "none";
  document.getElementById("adyen_token").style.display = "none";
  document.getElementById("form").style.display = "flex";
  document.getElementById("reactors").style.display = "none";
}
