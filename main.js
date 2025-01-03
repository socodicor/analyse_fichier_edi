const path = require("path");
const getHtml = require("./src/getHtml");
const getData = require("./src/getData");

let configs = [
  {
    name: "BERNER",
    configFile: "config-berner", // fichier JS dans le dossier "configuration"
    fileSource: "EDI-BERNER.22729", // fichier EDI dans le dossier "source-edi"
    outputFile: "audit-berner.html", // fichier HTML exporté dans le dossier "output" avec les valeurs lues dans le fichier EDI
    outputFileConfig: "info-config-berner.html", // fichier HTML exporté dans le dossier "output" avec le tableau de la configuration
  },
  {
    name: "SYMTA",
    configFile: "config-symta",
    fileSource: "EDI-SYMTA.22673",
    outputFile: "audit-symta.html",
    outputFileConfig: "info-config-symta.html",
  },
  {
    name: "OCR FF",
    configFile: "config-ocr-ff",
    fileSource: "ocr-ff.asc",
    outputFile: "audit-ocr-ff.html",
    outputFileConfig: "info-config-ocr-ff.html",
  },
  {
    name: "OCR BDC",
    configFile: "config-ocr-bdc",
    fileSource: "ocr-bdc.asc",
    outputFile: "audit-ocr-bdc.html",
    outputFileConfig: "info-config-ocr-bdc.html",
  },
  {
    name: "OCR AVOIR",
    configFile: "config-ocr-avoir",
    fileSource: "ocr-avoir.asc",
    outputFile: "audit-ocr-avoir.html",
    outputFileConfig: "info-config-ocr-avoir.html",
  },
];

for (const config of configs) {
  const lines = getData.getLines(
    path.join(__dirname, "source-edi", config.fileSource)
  );

  getHtml.writeHTML(lines, config);
}
