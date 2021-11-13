const ELEMENTS_KEY = "key_6jq4nLGh32QgDf6mierhLG";
const DECRYPT_KEY = "key_XcETzmrHLNf7VhdN8ePUab";

let ach_file_result;
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
  console.log(ach_file_result);
  document.getElementById(
    "ach_file_result"
  ).innerHTML = ach_file_result.raw;
  document.getElementById("reactors").style.display = "flex";
}


async function submitAch() {
  const ach_file = document.getElementById("ach_file").value;

  const response = await fetch(`/api/generate/ach`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json"
    },
    body: JSON.stringify({
      ach_file,
    })
  });

  ach_file_result = await response.json();

  displaySuccess();
}