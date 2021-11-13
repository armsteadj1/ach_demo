const ELEMENTS_KEY = "key_XVB48UzHJ57TdPtmLhJa9e";
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

  card = BasisTheory.elements.create("card", style);

  await card.mount("#card");

  card.on("change", (e) => {
    const button = document.getElementById("submit_button");
    console.log(e.complete);
    button.disabled = !e.complete;
  });
});

function displaySuccess() {
  document.getElementById(
    "card_token"
  ).innerHTML = `<b><u>BT Token:</u></b>&nbsp;&nbsp;${bank_token.id}`;
  document.getElementById("form").style.display = "none";
  document.getElementById("reactors").style.display = "flex";
}

function displayError() {
  document.getElementById("error").style.display = "flex";
}

async function reactWithStripe() {
  const stripeToken = await react(STRIPE_REACTOR_ID, 1);
  document.getElementById(
    "stripe_token"
  ).innerHTML = `<b><u>Stripe Token:</u></b>&nbsp;&nbsp;${stripeToken.reaction.id}`;
  document.getElementById("stripe_token").style.display = "block";
}

async function reactwithAdyen() {
  const adyenToken = await react(ADYEN_REACTOR_ID, 3);
  document.getElementById(
    "adyen_token"
  ).innerHTML = `<b><u>Adyen Token:</u></b>&nbsp;&nbsp;${adyenToken.reaction.pspReference}`;
  document.getElementById("adyen_token").style.display = "block";
}

async function reactWithBraintree() {
  const braintreeToken = await react(BRAINTREE_REACTOR_ID, 2);
  document.getElementById(
    "braintree_token"
  ).innerHTML = `<b><u>Braintree Token:</u></b>&nbsp;&nbsp;${braintreeToken.reaction.creditCard.token}`;
  document.getElementById("braintree_token").style.display = "block";
}

async function reactWithParrot() {
  const parrotToken = await react(PARROT_RECTOR_ID, 3);
  document.getElementById(
    "parrot_token"
  ).innerHTML = `<b><u>Parrot BIN:</u></b>&nbsp;&nbsp;<br><pre>${JSON.stringify(
    parrotToken.reaction,
    null,
    "\t"
  )}</pre>`;
  document.getElementById("parrot_token").style.display = "block";
}

async function react(reactor_id, lob_id) {
  const response = await fetch(`/api/charge`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json"
    },
    body: JSON.stringify({
      card_token_id: bank_token.id,
      reactor_id,
      lob_id
    })
  });

  return await response.json();
}

async function useExistingCard(id) {
  bank_token = { id };

  displaySuccess();
}

async function submit() {
  const routingNumber = document.getElementById("bank_routing").value;
  const accountNumber = document.getElementById("bank_number").value;

  console.log(routingNumber, accountNumber);

  bank_number = await BasisTheory.atomicBanks.create({
    bank: {
      routingNumber,
      accountNumber
    }
  });

  if (bank_number) {
    displaySuccess();
  }
}

function tryAgain() {
  document.getElementById("parrot_token").style.display = "none";
  document.getElementById("stripe_token").style.display = "none";
  document.getElementById("braintree_token").style.display = "none";
  document.getElementById("adyen_token").style.display = "none";
  document.getElementById("form").style.display = "flex";
  document.getElementById("reactors").style.display = "none";
}

function showOptional() {
  const optionals = document.getElementsByClassName("optional-row");
  for (let element of optionals) {
    console.log(element);
    element.style.display = "flex";
  }
}
