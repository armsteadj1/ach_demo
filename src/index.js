const { BasisTheory } = require("@basis-theory/basis-theory-js");
const express = require("express");
const app = express();

const API_KEY = "key_XcETzmrHLNf7VhdN8ePUab";

app.use(express.static("public"));
app.use(express.json());

app.post("/api/generate/ach", async (req, res) => {
  let result;
  const ach_file = req.body.ach_file;
  const bt = new BasisTheory();
  bt.init(API_KEY);

  // try {
  //   result = await bt.atomicCards.react("YOUR FAKE TOKEN", {
  //     "YOUR REACTOR ID",
  //     requestParameters: {
  //       ACH_FILE: ach_file
  //     }
  //   });
  // } catch (e) {
  //   console.log(JSON.stringify(e));
  // }

  result = {raw: `THIS WILL BE THE HYDRATED ACH FILE ${ach_file}` };

  return res.json(result);
});

app.listen(8080, () => {
  console.log(`started`);
});
