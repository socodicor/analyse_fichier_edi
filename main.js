const path = require("path");
const getHtml = require("./getHtml");
const getData = require("./getData");

let configs = [
  {
    name: "BERNER",
    configFile: "config-berner",
    fileSource: "EDI-BERNER.22729",
    outputFile: "audit-berner.html",
    outputFileConfig: "config-berner.html",
  },
  {
    name: "SYMTA",
    configFile: "config-symta",
    fileSource: "EDI-SYMTA.22673",
    outputFile: "audit-symta.html",
    outputFileConfig: "config-symta.html",
  },
];

for (const config of configs) {
  const lines = getData.getLines(path.join(__dirname, config.fileSource));

  getHtml.writeHTML(lines, config);
}
