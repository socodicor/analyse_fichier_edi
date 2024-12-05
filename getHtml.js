const fs = require("fs");
const path = require("path");
const getData = require("./getData");

function writeHTML(lines, config) {
  const configFournisseur = require(`./${config.configFile}`);

  const descriptionEntete = getData.getDescriptionEntete(configFournisseur);
  const descriptionLigne = getData.getDescriptionLigne(configFournisseur);

  let getHtml = `<html><head><title>Config EDI : ${config.name}</title>`;
  getHtml += `<link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.2/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-T3c6CoIi6uLrA9TneNEoa7RxnatzjcDSCmG1MXxSR1GAsXEV/Dwwykc2MPK8M2HN" crossorigin="anonymous">`;
  getHtml += `</head><body><div class="container">`;
  getHtml += `<h1>Audit EDI : ${config.name}</h1>`;

  for (const line of lines) {
    if (getData.isEntete(line)) {
      getHtml += getHtmlEntete(line, descriptionEntete);
    }
    if (getData.isLigne(line)) {
      getHtml += getHtmlLigne(line, descriptionLigne);
    }
  }

  getHtml += "</div></body></html>";

  // Écriture du fichier HTML
  fs.writeFileSync(path.join(__dirname, config.outputFile), getHtml, "utf-8");

  writeConfig(config, descriptionEntete, descriptionLigne);
}

function writeConfig(config, descriptionEntete, descriptionLigne) {
  let getHtml = `<html><head><title>Config EDI : ${config.name}</title>`;
  getHtml += `<link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.2/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-T3c6CoIi6uLrA9TneNEoa7RxnatzjcDSCmG1MXxSR1GAsXEV/Dwwykc2MPK8M2HN" crossorigin="anonymous">`;
  getHtml += `</head><body><div class="container">`;

  getHtml += `<h1>Config EDI : ${config.name}</h1>`;
  getHtml += getTableauDescriptifConfig("ENTETE", descriptionEntete);
  getHtml += getTableauDescriptifConfig("LIGNE", descriptionLigne);

  getHtml += "</div></body></html>";

  // Écriture du fichier HTML
  fs.writeFileSync(
    path.join(__dirname, config.outputFileConfig),
    getHtml,
    "utf-8"
  );
}

function getTableauDescriptifConfig(libelle, colonnes) {
  let html = `<h2>${libelle}</h2>`;
  html += '<table class="table table-striped">';
  html += "<thead><tr>";
  html += "<th>Rang</th>";
  html += "<th>Nom</th>";
  html += "<th>Type</th>";
  html += "<th>Longueur</th>";
  html += "<th>Début</th>";
  html += "<th>Fin</th>";
  html += "<th>Commentaire</th>";
  html += "</tr></thead><tbody>";

  let nColonne = 0;
  for (const colonne of colonnes) {
    nColonne++;
    html += `<tr>`;
    html += `<td>${nColonne}</td>`;
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
  html += '<table class="table table-striped">';
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
  html += '<table class="table table-striped">';
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
