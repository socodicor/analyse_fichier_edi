const descriptionEntete = [
  { name: "ENT", type: "string", length: 3, commentaire: "ENT" },
  { name: "ENT.NUMERO", type: "string", length: 9 },
  { name: "ENT.TIERSLU", type: "string", length: 35 },
  { name: "ENT.TIERSLIVRELU", type: "string", length: 35 },
  { name: "ENT.DATEREFEXTLU", type: "date", length: 8 },
  { name: "ENT.REFEXTERNELU", type: "string", length: 35 },
  { name: "ENT.REFINTERNELU", type: "string", length: 35 },
  { name: "ENT.MODEREGLEMENT", type: "string", length: 3 },
  { name: "ENT.DATEECHEANCE", type: "date", length: 8 },
  { name: "ENT.ESCOMPTE", type: "number", length: 16 },
  { name: "ENT.TOTALHT", type: "number", length: 16 },
  { name: "ENT.TOTALTTC", type: "number", length: 16 },
  { name: "DATELIVRLU", type: "date", length: 8 },
  { name: "ENT.REFCDECLT", type: "string", length: 35 },
  { name: "ENT.CREERPAR", type: "string", length: 3 },
  { name: "ENT.DEPOT", type: "string", length: 3 },
];
module.exports.descriptionEntete = descriptionEntete;

const descriptionLigne = [
  { name: "LIG", type: "string", length: 3, commentaire: "LIG" },
  { name: "LIG.NUMLIGNELU", type: "string", length: 6 },
  { name: "LIG.ARTICLELU", type: "string", length: 35 },
  { name: "LIG.LIBELLELU", type: "string", length: 70 },
  { name: "LIG.QTEFACTLU", type: "number", length: 16 },
  { name: "LIG.PCBLU", type: "number", length: 16 },
  { name: "LIG.REFEXTERNELU", type: "string", length: 35 },
  { name: "LIG.LIGNEORILU", type: "string", length: 35 },
  { name: "LIG.PUHTDEVLU", type: "number", length: 16 },
  { name: "LIG.REMISELIGNE", type: "number", length: 16 },
  { name: "LIG.UNITEPRIX", type: "number", length: 16 },
  { name: "LIG.LIBCOMPL", type: "string", length: 35 },
  { name: "LIG.TOTALHTNET", type: "number", length: 16 },
  { name: "LIG.REFLIVRFRN", type: "string", length: 27 },
  { name: "LIG.DATELIVRLU", type: "date", length: 8 },
  { name: "LIG.REFCDECLT", type: "string", length: 35 },
];
module.exports.descriptionLigne = descriptionLigne;
