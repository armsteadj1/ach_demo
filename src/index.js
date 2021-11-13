const { BasisTheory } = require("@basis-theory/basis-theory-js");
const express = require("express");
const app = express();

const API_KEY = "key_XcETzmrHLNf7VhdN8ePUab";

app.use(express.static("public"));
app.use(express.json());

async function react(tokenId, reactorId, apiKey) {
  let reactionToken;
  const bt = new BasisTheory();
  bt.init(apiKey);

  // console.log("hi");
  try {
    reactionToken = await bt.atomicCards.react(tokenId, {
      reactorId,
      requestParameters: {
        CUSTOMER_ID: 686037718,
        PAYMENT_REFERENCE: "PAY_REF",
        SHOPPER_REFERENCE: "SHOP_REF"
      }
    });
  } catch (e) {
    console.log(JSON.stringify(e));
  }

  return reactionToken.raw;
}

app.post("/api/read/bank", async (req, res) => {
  let token;
  const bankTokenId = req.body.bank_token_id;
  const bt = new BasisTheory();
  bt.init(API_KEY);

  try {
    token = await bt.atomicBanks.retrieve(bankTokenId);
  } catch (e) {
    console.log("error", e, JSON.stringify(e));
  }

  return res.json(token);
});

app.post("/api/decrypt/bank", async (req, res) => {
  let token;
  const bankTokenId = req.body.bank_token_id;
  const bt = new BasisTheory();
  bt.init(API_KEY);

  try {
    token = await bt.atomicBanks.retrieveDecrypted(bankTokenId);
  } catch (e) {
    console.log("error", e, JSON.stringify(e));
  }

  return res.json(token);
});


app.post("/api/update/bank", async (req, res) => {
  let token;
  const bankTokenId = req.body.bank_token_id;
  const accountNumber = req.body.accountNumber;
  const routingNumber = req.body.routingNumber;
  const bt = new BasisTheory();
  bt.init(API_KEY);

  console.log(bankTokenId, accountNumber, routingNumber);
  console.log("update");

  try {
    token = await bt.atomicBanks.update(bankTokenId, {
      bank: {
        routingNumber,
        accountNumber,
      },
    });
  } catch (e) {
    console.log("error", e, JSON.stringify(e));
  }

  console.log("token", token)
  return res.json(token);
});

app.listen(8080, () => {
  console.log(`started`);
});
