const { BasisTheory } = require("@basis-theory/basis-theory-js");
const express = require("express");
const app = express();

const LOB_1_API_KEY = "key_Wmwpqsxe3LhyAB12wbTE6s";
const LOB_2_API_KEY = "key_BHXqCXNUBrmBwnA2Pi76jK";
const LOB_3_API_KEY = "key_2EemCsZexWkFtY8M7G8tAy";
const LOB_KEYS = { 1: LOB_1_API_KEY, 2: LOB_2_API_KEY, 3: LOB_3_API_KEY };

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

app.post("/api/charge", async (req, res) => {
  const cardTokenId = req.body.card_token_id;
  const lobId = req.body.lob_id;
  const reactorId = req.body.reactor_id;
  console.log(cardTokenId, reactorId);
  const reaction = await react(cardTokenId, reactorId, LOB_KEYS[lobId]);

  return res.json({ reaction });
});

app.listen(8080, () => {
  console.log(`started`);
});
