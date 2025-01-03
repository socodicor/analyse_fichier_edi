const fs = require("fs");
const path = require("path");
const getData = require("./getData");

function writeHTML(lines, config) {
  const configFournisseur = require(`../configuration/${config.configFile}`);

  const descriptionEntete = getData.getDescriptionEntete(configFournisseur);
  const descriptionLigne = getData.getDescriptionLigne(configFournisseur);

  let getHtml = startHtml(`Audit EDI : ${config.name}`);
  getHtml += `<h1>Audit EDI : ${config.name}</h1>`;

  for (const line of lines) {
    if (getData.isEntete(line)) {
      getHtml += tableauValeur("ENTETE", line, descriptionEntete);
    }
    if (getData.isLigne(line)) {
      getHtml += tableauValeur("LIGNE", line, descriptionLigne);
    }
  }

  getHtml += endHtml();

  // Écriture du fichier HTML
  fs.writeFileSync(
    path.join(path.dirname(__dirname), "output", config.outputFile),
    getHtml,
    "utf-8"
  );

  writeConfig(config, descriptionEntete, descriptionLigne);
}

function startHtml(title) {
  let getHtml = `<html><head><title>${title}</title>`;
  getHtml += `<link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.2/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-T3c6CoIi6uLrA9TneNEoa7RxnatzjcDSCmG1MXxSR1GAsXEV/Dwwykc2MPK8M2HN" crossorigin="anonymous">`;
  getHtml += `</head><body><div class="container">`;
  return getHtml;
}

function endHtml() {
  let getHtml = "</div></body></html>";
  return getHtml;
}

function writeConfig(config, descriptionEntete, descriptionLigne) {
  let getHtml = startHtml(`Config EDI : ${config.name}`);

  getHtml += `<h1>Config EDI : ${config.name}</h1>`;
  getHtml += getTableauDescriptifConfig("ENTETE", descriptionEntete);
  getHtml += getTableauDescriptifConfig("LIGNE", descriptionLigne);

  getHtml += endHtml();

  // Écriture du fichier HTML
  fs.writeFileSync(
    path.join(path.dirname(__dirname), "output", config.outputFileConfig),
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

function tableauValeur(title, line, colonnes) {
  let html = `<h2>${title}</h2>`;
  html += '<table class="table table-striped">';
  html += "<thead><tr><th>Colonne</th><th>Valeur</th></tr></thead><tbody>";
  for (const colonne of colonnes) {
    const content = line.substring(colonne.start - 1, colonne.end);
    html += `<tr><td>${colonne.name}</td><td>${content}</td></tr>`;
  }
  html += "</tbody></table>";
  return html;
}

module.exports = {
  writeHTML,
};
