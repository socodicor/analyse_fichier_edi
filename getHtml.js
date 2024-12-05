const fs = require("fs");
const path = require("path");
const getData = require("./getData");

function writeHTML(lines, config) {
  const configFournisseur = require(`./${config.configFile}`);

  const descriptionEntete = getData.getDescriptionEntete(configFournisseur);
  const descriptionLigne = getData.getDescriptionLigne(configFournisseur);

  let getHtml = "<html><head><title>Audit EDI</title></head><body>";
  getHtml += `<h1>Audit EDI : ${config.name}</h1>`;

  for (const line of lines) {
    if (getData.isEntete(line)) {
      getHtml += getHtmlEntete(line, descriptionEntete);
    }
    if (getData.isLigne(line)) {
      getHtml += getHtmlLigne(line, descriptionLigne);
    }
  }

  getHtml += "</body></html>";

  // Écriture du fichier HTML
  fs.writeFileSync(path.join(__dirname, config.outputFile), getHtml, "utf-8");

  writeConfig(config, descriptionEntete, descriptionLigne);
}

function writeConfig(config, descriptionEntete, descriptionLigne) {
  let getHtml = `<html><head><title>Config EDI : ${config.name}</title></head><body>`;

  getHtml += `<h1>Config EDI : ${config.name}</h1>`;
  getHtml += getTableauDescriptifConfig("ENTETE", descriptionEntete);
  getHtml += getTableauDescriptifConfig("LIGNE", descriptionLigne);

  getHtml += "</body></html>";

  // Écriture du fichier HTML
  fs.writeFileSync(
    path.join(__dirname, config.outputFileConfig),
    getHtml,
    "utf-8"
  );
}

function getTableauDescriptifConfig(libelle, colonnes) {
  let html = `<h2>${libelle}</h2>`;
  html += '<table border="1" style="width: 100%; border-collapse: collapse;">';
  html += "<thead><tr>";
  html += "<th>Nom</th>";
  html += "<th>Type</th>";
  html += "<th>Longueur</th>";
  html += "<th>Début</th>";
  html += "<th>Fin</th>";
  html += "<th>Commentaire</th>";
  html += "</tr></thead><tbody>";
  for (const colonne of colonnes) {
    html += `<tr>`;
    html += `<td>${colonne.name}</td>`;
    html += `<td>${colonne.type}</td>`;
    html += `<td>${colonne.length}</td>`;
    html += `<td>${colonne.start}</td>`;
    html += `<td>${colonne.end}</td>`;
    html += `<td>${colonne.commentaire ?? ""}</td>`;
    html += `</tr>`;
  }
  html += "</tbody></table>";

  return html;
}

function getHtmlEntete(line, descriptionEntete) {
  let html = `<h2>ENTETE</h2>`;
  html += '<table border="1" style="width: 100%; border-collapse: collapse;">';
  html += "<thead><tr><th>Colonne</th><th>Valeur</th></tr></thead><tbody>";
  for (const colonne of descriptionEntete) {
    const content = line.substring(colonne.start - 1, colonne.end);
    html += `<tr><td>${colonne.name}</td><td>${content}</td></tr>`;
  }
  html += "</tbody></table>";
  return html;
}

function getHtmlLigne(line, descriptionLigne) {
  let html = `<h2>LIGNE</h2>`;
  html += '<table border="1" style="width: 100%; border-collapse: collapse;">';
  html += "<thead><tr><th>Colonne</th><th>Valeur</th></tr></thead><tbody>";
  for (const colonne of descriptionLigne) {
    const content = line.substring(colonne.start - 1, colonne.end);
    html += `<tr><td>${colonne.name}</td><td>${content}</td></tr>`;
  }
  html += "</tbody></table>";
  return html;
}

module.exports = {
  writeHTML,
};
