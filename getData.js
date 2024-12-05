const fs = require("fs");

function getLines(inputFile) {
  const ediContent = fs.readFileSync(inputFile, "utf-8");
  return ediContent.split("\n");
}

function isEntete(line) {
  return line.startsWith("ENT");
}

function isLigne(line) {
  return line.startsWith("LIG");
}

function getDescriptionEntete(configFournisseur) {
  const descriptionEntete = configFournisseur.descriptionEntete;
  let descriptionReturn = [];
  let position = 1;
  for (desc of descriptionEntete) {
    descriptionReturn.push({
      name: desc.name,
      type: desc.type,
      length: desc.length,
      start: position,
      end: position + desc.length - 1,
    });
    position = position + desc.length;
  }
  return descriptionReturn;
}

function getDescriptionLigne(configFournisseur) {
  const descriptionLigne = configFournisseur.descriptionLigne;

  let descriptionReturn = [];
  let position = 1;
  for (desc of descriptionLigne) {
    descriptionReturn.push({
      name: desc.name,
      type: desc.type,
      length: desc.length,
      start: position,
      end: position + desc.length - 1,
    });
    position += desc.length;
  }
  return descriptionReturn;
}

module.exports = {
  getLines,
  isEntete,
  isLigne,
  getDescriptionEntete,
  getDescriptionLigne,
};
