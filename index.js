const fs = require("fs");
const express = require("express");
const app = express();
const port = 4000;

const configContent = JSON.parse(fs.readFileSync("conf.json", "utf8"));
console.log("configContent", configContent.boxQuantity);

const boxNode = `<a-box position="{x} 0.5 -2" rotation="0 45 0" color="#FFFF00" scale="{scale} {scale} {scale}"></a-box>        `;
let replacementOutput = "";

for (let i = 0; i < configContent.boxQuantity; i += 1) {
  replacementOutput += boxNode.replace("{x}", i).replace(/{scale}/g, i / 10); //this also uses a regex to change multiple instances not just one
}

app.get("/", (req, res) => {
  let contents = fs.readFileSync("index.html", "utf8");

  contents = contents.replace("{boxes}", replacementOutput);

  res.send(contents);
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
