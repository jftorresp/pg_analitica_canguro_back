import medidasCrecimiento from "../models/medidasCrecimientoModel.js";
import asyncHandler from "express-async-handler";
// Funciones de consulta en MongoDB
// Dependerán de las tareas de visualización a realizar

//handleResponse Manejador para los datos recibidos por consulta a la base de datos
function handleResponse(data, res) {
  if (data) {
    res.status(200).json(data);
  } else {
    res.status(404).json({ message: "Error fetching data." });
    res.status(404);
    throw new Error("Error fetching the years.");
  }
}

//getData Función para traer todos los datos
export const getData = asyncHandler(async (req, res) => {
  const medidas = await medidasCrecimiento.find({}).lean();
  res.status(200).json(medidas);
});

//getDatabyId Función para traer un documento por id
export const getDataById = asyncHandler(async (req, res) => {
  const medidas = await medidasCrecimiento.findById(req.params.id).lean();

  //if document id match param id send document else throw error
  if (medidas) {
    res.status(200).json(medidas);
  } else {
    res.status(404).json({ message: "Data not found." });
    res.status(404);
    throw new Error("Data not found");
  }
});

// getAllYears Función para obtener un array con todos los años que cubren los datos
export const getAllYears = asyncHandler(async (req, res) => {
  const anios = await medidasCrecimiento.distinct("ANOCAT");

  if (anios) {
    res.status(200).json(anios);
  } else {
    res.status(404).json({ message: "Error fetching the years." });
    res.status(404);
    throw new Error("Error fetching the years.");
  }
});

// getValuesByVar Función para obtener un array con todos los valores posibles para esa variable
export const getValuesByVar = asyncHandler(async (req, res) => {
  const variable = req.params.var;
  const data = await medidasCrecimiento.distinct(variable);

  if (data) {
    res.status(200).json(data);
  } else {
    res.status(404).json({ message: "Error fetching the data." });
    res.status(404);
    throw new Error("Error fetching the data.");
  }
});

// getValuesByVar Función para obtener un array con todos los valores posibles para esa variable
export const getValuesByVarYears = asyncHandler(async (req, res) => {
  const years = req.body.years;
  const variable = req.body.var;
  const yearsArray = [];

  for (let i = 0; i < years.length; i++) {
    yearsArray.push({
      ANOCAT: years[i],
    });
  }

  const data = await medidasCrecimiento
    .find({ $or: yearsArray }, "ANOCAT")
    .distinct(variable);

  if (data) {
    res.status(200).json(data);
  } else {
    res.status(404).json({ message: "Error fetching the data." });
    res.status(404);
    throw new Error("Error fetching the data.");
  }
});

function arrayUnique(array) {
  var a = array.concat();
  for (var i = 0; i < a.length; ++i) {
    for (var j = i + 1; j < a.length; ++j) {
      if (a[i] === a[j]) a.splice(j--, 1);
    }
  }

  return a;
}

//queryData Función para realizar queries que filtran las variables por etapas o temas de interés, y los datos por años
export const queryData = asyncHandler(async (req, res) => {
  // Variables por etapas
  const dataInicial = [
    "CODE",
    "Centro",
    "codigooriginal",
    "VAR00002",
    "ANOCAT",
    "fechaCreacion",
  ];
  const dataEntorno = [
    "pesomama",
    "tallamama",
    "edadmama",
    "nivelmama",
    "embarazodeseado",
    "primipara",
    "pesopapa",
    "tallapapa",
    "nivelpapa",
    "percapitasalariominimo",
  ];
  const dataEmbarazo = ["numerocontrolprenatal", "toxemia", "Embarazomultiple"];
  const dataNacimiento = [
    "estadovital",
    "sexo",
    "cesarea",
    "TotalDiasHospitalizacion",
    "classificacionlubchencov",
    "edadgestacional",
    "edadgestacional2",
    "RCIUpesoFenton",
    "RCIUtalla",
    "RCIUPC",
    "RCIUfentonpesotalla",
    "RCIUfentonpesotallaPC",
    "tipoRCIU",
    "tipoRCIU2",
    "pesoalnacer",
    "tallaalnacer",
    "pcalnacer",
    "audiometria",
  ];

  const dataPMC = [
    "edadalaentrada",
    "pesoalaentrada",
    "tallaalaentrada",
    "tallaalaentrada",
    "PCalaentrada",
    "edadgestacionalalaentrada",
    "edadgestacionalalaentrada2",
    "RCIUpesoFentonentrada",
    "RCIUtallaentrada",
    "RCIUPCentrada",
  ];

  const data40SEM = [
    "mes40",
    "Indexnutricion40sem",
    "Nutpcwho.sem40",
    "Nutpesowho.sem40",
    "Nuttallawho.sem40",
    "pc.sem40",
    "alimentacion.sem40",
    "peso.sem40",
    "talla.sem40",
    "peso_normalizado.sem40",
    "pc_normalizado.sem40",
    "talla_normalizado.sem40",
    "Indexnutricion40sem",
  ];
  const data3M = [
    "mes3",
    "Nutpcwho.mes3",
    "Nutpesowho.mes3",
    "Nuttallawho.mes3",
    "pc.mes3",
    "alimentacion.mes3",
    "peso.mes3",
    "talla.mes3",
    "peso_normalizado.mes3",
    "pc_normalizado.mes3",
    "talla_normalizado.mes3",
    "Infanib3m",
  ];
  const data6M = [
    "mes6",
    "Nutpcwho.mes6",
    "Nutpesowho.mes6",
    "Nuttallawho.mes6",
    "pc.mes6",
    "alimentacion.mes6",
    "peso.mes6",
    "talla.mes6",
    "peso_normalizado.mes6",
    "pc_normalizado.mes6",
    "talla_normalizado.mes6",
  ];
  const data9M = [
    "mes9",
    "Nutpcwho.mes9",
    "Nutpesowho.mes9",
    "Nuttallawho.mes9",
    "pc.mes9",
    "alimentacion.mes9",
    "peso.mes9",
    "talla.mes9",
    "peso_normalizado.mes9",
    "pc_normalizado.mes9",
    "talla_normalizado.mes9",
  ];
  const data12M = [
    "mes12",
    "Nutpcwho.mes12",
    "Nutpesowho.mes12",
    "Nuttallawho.mes12",
    "pc.mes12",
    "alimentacion.mes12",
    "peso.mes12",
    "talla.mes12",
    "peso_normalizado.mes12",
    "pc_normalizado.mes12",
    "talla_normalizado.mes12",
    "muerteprimerano",
    "indexnutricion12meses",
  ];

  // Variables por tema de interés
  const dataNeuro = [
    "Infanib3m",
    "Infanib6m",
    "Infanib6m",
    "Infanib9m",
    "Infanib12m",
    "CD6",
    "CD12",
    "CD66",
    "CD122",
    "neurologia",
  ];
  const dataVista = ["ROP", "resoptometria", "oftalmologiafinal"];
  const dataAlimentacion = [
    "Indexnutricion40sem",
    "indexnutricion12meses",
    "alisalida",
    "alimentacion.sem40",
    "alimentacion.mes3",
    "alimentacion.mes6",
    "alimentacion.mes9",
    "alimentacion.mes12",
  ];

  var data;
  var query = dataInicial;
  var yearsArray = [];
  var etapas = [
    "ENTORNO",
    "EMBARAZO",
    "NACIMIENTO",
    "PMC",
    "40SEM",
    "3M",
    "6M",
    "9M",
    "12M",
  ];
  var temas = ["NEURO", "VISTA", "ALIMENTACION"];

  if (req.body && req.body.etapa) {
    if (req.body.vars) {
      if (
        req.body.etapa == etapas[0] &&
        contained(dataEntorno, req.body.vars)
      ) {
        query = arrayUnique(query.concat(req.body.vars));
      } else if (
        req.body.etapa == etapas[1] &&
        contained(dataEmbarazo, req.body.vars)
      ) {
        query = arrayUnique(query.concat(req.body.vars));
      } else if (
        req.body.etapa == etapas[2] &&
        contained(dataNacimiento, req.body.vars)
      ) {
        query = arrayUnique(query.concat(req.body.vars));
      } else if (
        req.body.etapa == etapas[3] &&
        contained(dataPMC, req.body.vars)
      ) {
        query = arrayUnique(query.concat(req.body.vars));
      } else if (
        req.body.etapa == etapas[4] &&
        contained(data40SEM, req.body.vars)
      ) {
        query = arrayUnique(query.concat(req.body.vars));
      } else if (
        req.body.etapa == etapas[5] &&
        contained(data3M, req.body.vars)
      ) {
        query = arrayUnique(query.concat(req.body.vars));
      } else if (
        req.body.etapa == etapas[6] &&
        contained(data6M, req.body.vars)
      ) {
        query = arrayUnique(query.concat(req.body.vars));
      } else if (
        req.body.etapa == etapas[7] &&
        contained(data9M, req.body.vars)
      ) {
        query = arrayUnique(query.concat(req.body.vars));
      } else if (
        req.body.etapa == etapas[8] &&
        contained(data12M, req.body.vars)
      ) {
        query = arrayUnique(query.concat(req.body.vars));
      }
    } else {
      for (let i = 0; i < etapas.length; i++) {
        if (req.body.etapa == etapas[0]) {
          query = arrayUnique(query.concat(dataEntorno));
        } else if (req.body.etapa == etapas[1]) {
          query = arrayUnique(query.concat(dataEmbarazo));
        } else if (req.body.etapa == etapas[2]) {
          query = arrayUnique(query.concat(dataNacimiento));
        } else if (req.body.etapa == etapas[3]) {
          query = arrayUnique(query.concat(dataPMC));
        } else if (req.body.etapa == etapas[4]) {
          query = arrayUnique(query.concat(data40SEM));
        } else if (req.body.etapa == etapas[5]) {
          query = arrayUnique(query.concat(data3M));
        } else if (req.body.etapa == etapas[6]) {
          query = arrayUnique(query.concat(data6M));
        } else if (req.body.etapa == etapas[7]) {
          query = arrayUnique(query.concat(data9M));
        } else if (req.body.etapa == etapas[8]) {
          query = arrayUnique(query.concat(data12M));
        }
      }
    }
  }

  if (req.body && req.body.temas) {
    if (req.body.vars) {
      if (
        req.body.temas.includes(temas[0]) &&
        contained(dataNeuro, req.body.vars)
      ) {
        query = arrayUnique(query.concat(req.body.vars));
      }
      if (
        req.body.temas.includes(temas[1]) &&
        contained(dataVista, req.body.vars)
      ) {
        query = arrayUnique(query.concat(req.body.vars));
      }
      if (
        req.body.temas.includes(temas[2]) &&
        contained(dataAlimentacion, req.body.vars)
      ) {
        query = arrayUnique(query.concat(req.body.vars));
      }
    } else {
      for (let j = 0; j < temas.length; j++) {
        if (req.body.temas.includes(temas[0])) {
          query = arrayUnique(query.concat(dataNeuro));
        }
        if (req.body.temas.includes(temas[1])) {
          query = arrayUnique(query.concat(dataVista));
        }
        if (req.body.temas.includes(temas[2])) {
          query = arrayUnique(query.concat(dataAlimentacion));
        }
      }
    }
  }

  if (req.body && req.body.years) {
    for (let k = 1993; k < 2017; k++) {
      if (req.body.years.some((anio) => anio == k)) {
        yearsArray.push({
          ANOCAT: k,
        });
      }
    }
  }

  if (req.body && req.body.vars && !req.body.etapa && !req.body.temas) {
    query = arrayUnique(query.concat(req.body.vars));
  }

  if (yearsArray.length == 0) {
    data = await medidasCrecimiento
      .find({})
      .select(query)
      .sort({ ANOCAT: "asc" })
      .lean();
  } else {
    if (query == dataInicial) {
      data = await medidasCrecimiento.find({ $or: yearsArray }).lean();
    } else {
      data = await medidasCrecimiento
        .find({ $or: yearsArray })
        .select(query)
        .lean();
    }
  }

  handleResponse(data, res);
});

//contained Función que valida si el array que entra en el body está incluido en uno de los arrays de la etapa
function contained(mainArray, containedArray) {
  return containedArray.some((element) => mainArray.includes(element));
}

//getVarsByType Función que determina las variables dependiendo de la etapa
function getVarsByType(type) {
  var variables;

  if (type == "ENTORNO") {
    variables = [
      "pesomama",
      "tallamama",
      "edadmama",
      "nivelmama",
      "embarazodeseado",
      "primipara",
      "pesopapa",
      "tallapapa",
      "nivelpapa",
      "percapitasalariominimo",
    ];
  } else if (type == "NACIMIENTO") {
    variables = [
      "estadovital",
      "sexo",
      "cesarea",
      "TotalDiasHospitalizacion",
      "classificacionlubchencov",
      "edadgestacional",
      "edadgestacional2",
      "RCIUpesoFenton",
      "RCIUtalla",
      "RCIUPC",
      "RCIUpesoFentonentrada",
      "RCIUtallaentrada",
      "RCIUPCentrada",
      "RCIUfentonpesotalla",
      "RCIUfentonpesotallaPC",
      "tipoRCIU",
      "tipoRCIU2",
      "pesoalnacer",
      "tallaalnacer",
      "pcalnacer",
    ];
  } else if (type == "EMBARAZO") {
    variables = ["numerocontrolprenatal", "toxemia", "Embarazomultiple"];
  } else if (type == "PMC") {
    variables = [
      "edadalaentrada",
      "pesoalaentrada",
      "tallaalaentrada",
      "PCalaentrada",
      "edadgestacionalalaentrada",
      "edadgestacionalalaentrada2",
      "RCIUpesoFentonentrada",
      "RCIUtallaentrada",
      "RCIUPCentrada",
    ];
  } else if (type == "40SEM") {
    variables = [
      "mes40",
      "Nutpcwho.sem40",
      "Nutpesowho.sem40",
      "Nuttallawho.sem40",
      "pc.sem40",
      "alimentacion.sem40",
      "peso.sem40",
      "talla.sem40",
      "peso_normalizado.sem40",
      "pc_normalizado.sem40",
      "talla_normalizado.sem40",
      "Indexnutricion40sem",
    ];
  } else if (type == "3M") {
    variables = [
      "mes3",
      "Nutpcwho.mes3",
      "Nutpesowho.mes3",
      "Nuttallawho.mes3",
      "pc.mes3",
      "alimentacion.mes3",
      "peso.mes3",
      "talla.mes3",
      "peso_normalizado.mes3",
      "pc_normalizado.mes3",
      "talla_normalizado.mes3",
      "Infanib3m",
    ];
  } else if (type == "6M") {
    variables = [
      "mes6",
      "Nutpcwho.mes6",
      "Nutpesowho.mes6",
      "Nuttallawho.mes6",
      "pc.mes6",
      "alimentacion.mes6",
      "peso.mes6",
      "talla.mes6",
      "peso_normalizado.mes6",
      "pc_normalizado.mes6",
      "talla_normalizado.mes6",
      "Infanib6m",
    ];
  } else if (type == "9M") {
    variables = [
      "mes9",
      "Nutpcwho.mes9",
      "Nutpesowho.mes9",
      "Nuttallawho.mes9",
      "pc.mes9",
      "alimentacion.mes9",
      "peso.mes9",
      "talla.mes9",
      "peso_normalizado.mes9",
      "pc_normalizado.mes9",
      "talla_normalizado.mes9",
      "Infanib9m",
    ];
  } else if (type == "12M") {
    variables = [
      "mes12",
      "Nutpcwho.mes12",
      "Nutpesowho.mes12",
      "Nuttallawho.mes12",
      "pc.mes12",
      "alimentacion.mes12",
      "peso.mes12",
      "talla.mes12",
      "peso_normalizado.mes12",
      "pc_normalizado.mes12",
      "talla_normalizado.mes12",
      "muerteprimerano",
      "indexnutricion12meses",
      "Infanib12m",
    ];
  }

  var newArray = [];
  for (let i = 0; i < variables.length; i++) {
    if (
      variables[i] == "embarazodeseado" ||
      variables[i] == "primipara" ||
      variables[i] == "sexo" ||
      variables[i] == "cesarea" ||
      variables[i] == "RCIUpesoFenton" ||
      variables[i] == "RCIUtalla" ||
      variables[i] == "RCIUPC" ||
      variables[i] == "RCIUpesoFentonentrada" ||
      variables[i] == "RCIUtallaentrada" ||
      variables[i] == "RCIUPCentrada" ||
      variables[i] == "RCIUfentonpesotalla" ||
      variables[i] == "RCIUfentonpesotallaPC" ||
      variables[i] == "toxemia" ||
      variables[i] == "Embarazomultiple" ||
      variables[i] == "mes40" ||
      variables[i] == "Nutpcwho.sem40" ||
      variables[i] == "Nutpesowho.sem40" ||
      variables[i] == "Nuttallawho.sem40" ||
      variables[i] == "alimentacion.sem40" ||
      variables[i] == "mes3" ||
      variables[i] == "Nutpcwho.mes3" ||
      variables[i] == "Nutpesowho.mes3" ||
      variables[i] == "Nuttallawho.mes3" ||
      variables[i] == "alimentacion.mes3" ||
      variables[i] == "mes6" ||
      variables[i] == "Nutpcwho.mes6" ||
      variables[i] == "Nutpesowho.mes6" ||
      variables[i] == "Nuttallawho.mes6" ||
      variables[i] == "alimentacion.mes6" ||
      variables[i] == "mes9" ||
      variables[i] == "Nutpcwho.mes9" ||
      variables[i] == "Nutpesowho.mes9" ||
      variables[i] == "Nuttallawho.mes9" ||
      variables[i] == "alimentacion.mes9" ||
      variables[i] == "mes12" ||
      variables[i] == "Nutpcwho.mes12" ||
      variables[i] == "Nutpesowho.mes12" ||
      variables[i] == "Nuttallawho.mes12" ||
      variables[i] == "alimentacion.mes12" ||
      variables[i] == "classificacionlubchenco"
    ) {
      newArray.push({
        variable: variables[i],
        tipo: "nominal",
      });
    }

    if (
      variables[i] == "nivelmama" ||
      variables[i] == "nivelpapa" ||
      variables[i] == "estadovital" ||
      variables[i] == "tipoRCIU" ||
      variables[i] == "tipoRCIU2" ||
      variables[i] == "indexnutricion12meses" ||
      variables[i] == "Indexnutricion40sem"
    ) {
      newArray.push({
        variable: variables[i],
        tipo: "ordinal",
      });
    }

    if (
      variables[i] == "edadmama" ||
      variables[i] == "TotalDiasHospitalizacion" ||
      variables[i] == "numerocontrolprenatal" ||
      variables[i] == "edadalaentrada" ||
      variables[i] == "edadgestacional" ||
      variables[i] == "edadgestacional2" ||
      variables[i] == "edadgestacionalalaentrada" ||
      variables[i] == "edadgestacionalalaentrada2"
    ) {
      newArray.push({
        variable: variables[i],
        tipo: "discreto",
      });
    }

    if (
      variables[i] == "pesomama" ||
      variables[i] == "tallamama" ||
      variables[i] == "pesopapa" ||
      variables[i] == "tallapapa" ||
      variables[i] == "percapitasalariominimo" ||
      variables[i] == "pesoalnacer" ||
      variables[i] == "tallaalnacer" ||
      variables[i] == "pcalnacer" ||
      variables[i] == "pesoalaentrada" ||
      variables[i] == "tallaalaentrada" ||
      variables[i] == "PCalaentrada" ||
      variables[i] == "pc.sem40" ||
      variables[i] == "peso.sem40" ||
      variables[i] == "talla.sem40" ||
      variables[i] == "pc_normalizado.sem40" ||
      variables[i] == "peso_normalizado.sem40" ||
      variables[i] == "talla_normalizado.sem40" ||
      variables[i] == "pc.mes3" ||
      variables[i] == "peso.mes3" ||
      variables[i] == "talla.mes3" ||
      variables[i] == "pc_normalizado.mes3" ||
      variables[i] == "peso_normalizado.mes3" ||
      variables[i] == "talla_normalizado.mes3" ||
      variables[i] == "pc.mes6" ||
      variables[i] == "peso.mes6" ||
      variables[i] == "talla.mes6" ||
      variables[i] == "pc_normalizado.mes6" ||
      variables[i] == "peso_normalizado.mes6" ||
      variables[i] == "talla_normalizado.mes6" ||
      variables[i] == "pc.mes9" ||
      variables[i] == "peso.mes9" ||
      variables[i] == "talla.mes9" ||
      variables[i] == "pc_normalizado.mes9" ||
      variables[i] == "peso_normalizado.mes9" ||
      variables[i] == "talla_normalizado.mes9" ||
      variables[i] == "pc.mes12" ||
      variables[i] == "peso.mes12" ||
      variables[i] == "talla.mes12" ||
      variables[i] == "pc_normalizado.mes12" ||
      variables[i] == "peso_normalizado.mes12" ||
      variables[i] == "talla_normalizado.mes12"
    ) {
      newArray.push({
        variable: variables[i],
        tipo: "continuo",
      });
    }
  }

  return newArray;
}

//getVarsByTopic Función que determina las variables dependiendo de los temas de interés
function getVarsByTopic(type) {
  var variables = [];
  var result;

  if (type == "NEURO") {
    result = variables.concat([
      "Infanib3m",
      "Infanib6m",
      "Infanib9m",
      "Infanib12m",
      "CD6",
      "CD12",
      "CD66",
      "CD122",
      "neurologia.error",
    ]);
  }

  if (type == "VISTA") {
    result = variables.concat(["ROP", "resoptometria", "oftalmologiafinal"]);
  }

  if (type == "ALIMENTACION") {
    result = variables.concat([
      "Indexnutricion40sem",
      "indexnutricion12meses",
      "alisalida",
      "alimentacion.sem40",
      "alimentacion.mes3",
      "alimentacion.mes6",
      "alimentacion.mes9",
      "alimentacion.mes12",
    ]);
  }

  var newArray = [];
  for (let i = 0; i < result.length; i++) {
    if (
      result[i] == "Infanib3m" ||
      result[i] == "Infanib6m" ||
      result[i] == "Infanib9m" ||
      result[i] == "Infanib12m" ||
      result[i] == "ROP" ||
      result[i] == "resoptometria" ||
      result[i] == "oftalmologiafinal" ||
      result[i] == "alisalida" ||
      result[i] == "alimentacion.sem40" ||
      result[i] == "alimentacion.mes3" ||
      result[i] == "alimentacion.mes6" ||
      result[i] == "alimentacion.mes9" ||
      result[i] == "alimentacion.mes12" ||
      result[i] == "neurologia.error"
    ) {
      newArray.push({
        variable: result[i],
        tipo: "nominal",
      });
    }

    if (
      result[i] == "Indexnutricion40sem" ||
      result[i] == "indexnutricion12meses"
    ) {
      newArray.push({
        variable: result[i],
        tipo: "ordinal",
      });
    }

    if (
      result[i] == "CD6" ||
      result[i] == "CD12" ||
      result[i] == "CD66" ||
      result[i] == "CD122"
    ) {
      newArray.push({
        variable: result[i],
        tipo: "continuo",
      });
    }
  }

  return newArray;
}

//getVarsStageTopic Función que determina las variables dependiendo de la etapa y los temas de interés
export const getVarsStageTopic = asyncHandler(async (req, res) => {
  const etapa = req.query.e;
  const neuro = req.query.neuro;
  const vista = req.query.vista;
  const alimentacion = req.query.alimentacion;

  var etapas = [
    "ENTORNO",
    "EMBARAZO",
    "NACIMIENTO",
    "PMC",
    "40SEM",
    "3M",
    "6M",
    "9M",
    "12M",
  ];
  var data = [];

  if (req.query) {
    if (etapa) {
      if (etapa == etapas[0]) {
        data = data.concat(getVarsByType("ENTORNO"));
      } else if (etapa == etapas[1]) {
        data = data.concat(getVarsByType("EMBARAZO"));
      } else if (etapa == etapas[2]) {
        data = data.concat(getVarsByType("NACIMIENTO"));
      } else if (etapa == etapas[3]) {
        data = data.concat(getVarsByType("PMC"));
      } else if (etapa == etapas[4]) {
        data = data.concat(getVarsByType("40SEM"));
      } else if (etapa == etapas[5]) {
        data = data.concat(getVarsByType("3M"));
      } else if (etapa == etapas[6]) {
        data = data.concat(getVarsByType("6M"));
      } else if (etapa == etapas[7]) {
        data = data.concat(getVarsByType("9M"));
      } else if (etapa == etapas[8]) {
        data = data.concat(getVarsByType("12M"));
      }
    }

    if (neuro || vista || alimentacion) {
      if (neuro == "true") {
        data = data.concat(getVarsByTopic("NEURO"));
      }
      if (vista == "true") {
        data = data.concat(getVarsByTopic("VISTA"));
      }
      if (alimentacion == "true") {
        data = data.concat(getVarsByTopic("ALIMENTACION"));
      }
    }
  }

  // Asegura que no existan variables repetidas en los datos
  let uniqueArray = [...new Set(data)];

  res.json(uniqueArray);
});

//getDictVar Función que dependiendo de la variable retorna la conversión a valores categóricos dependiendo del diccionario. Aplica para datoa nominales y ordinales
export const getDictVar = asyncHandler(async (req, res) => {
  const variable = req.params.var;

  const data = await medidasCrecimiento.distinct(variable);
  const values = [];

  if (variable == "sexo") {
    for (let i = 0; i < data.length; i++) {
      if (data[i] === 1) {
        values.push({ key: data[i], valor: "Masculino" });
      } else if (data[i] === 2) {
        values.push({ key: data[i], valor: "Femenino" });
      } else if (data[i] === 3) {
        values.push({ key: data[i], valor: "Ambiguo" });
      }
    }
  } else if (variable == "estadovital") {
    for (let i = 0; i < data.length; i++) {
      if (data[i] === 1) {
        values.push({ key: data[i], valor: "Vivo" });
      } else if (data[i] === 2) {
        values.push({ key: data[i], valor: "Antes elegibilidad" });
      } else if (data[i] === 3) {
        values.push({ key: data[i], valor: "Elegible - salida" });
      } else if (data[i] === 4) {
        values.push({ key: data[i], valor: "Salida - 40sem EPC" });
      } else if (data[i] === 5) {
        values.push({ key: data[i], valor: "40sem de EPC - 3 meses" });
      } else if (data[i] === 6) {
        values.push({ key: data[i], valor: "3 meses - 6 meses" });
      } else if (data[i] === 7) {
        values.push({ key: data[i], valor: "6 meses - 9 meses" });
      } else if (data[i] === 8) {
        values.push({ key: data[i], valor: "9 meses - 12 meses" });
      } else if (data[i] === 9) {
        values.push({
          key: data[i],
          valor: "Falleció no se sabe cuándo (ISS)",
        });
      }
    }
  } else if (
    variable == "muerteprimerano" ||
    variable == "embarazodeseado" ||
    variable == "Embarazomultiple" ||
    variable == "toxemia" ||
    variable == "UCI" ||
    variable == "cesarea" ||
    variable == "primipara" ||
    variable == "ROP" ||
    variable == "oxigenoentrada" ||
    variable == "Nutpesowho.sem40" ||
    variable == "Nuttallawho.sem40" ||
    variable == "Nutpcwho.sem40" ||
    variable == "Nutpesowho.mes3" ||
    variable == "Nuttallawho.mes3" ||
    variable == "Nutpcwho.mes3" ||
    variable == "Nutpesowho.mes6" ||
    variable == "Nuttallawho.mes6" ||
    variable == "Nutpcwho.mes6" ||
    variable == "Nutpesowho.mes9" ||
    variable == "Nuttallawho.mes9" ||
    variable == "Nutpcwho.mes9" ||
    variable == "Nutpesowho.mes12" ||
    variable == "Nuttallawho.mes12" ||
    variable == "Nutpcwho.mes12" ||
    variable == "RCIUpesoFenton" ||
    variable == "RCIUtalla" ||
    variable == "RCIUPC" ||
    variable == "RCIUpesoFentonentrada" ||
    variable == "RCIUtallaentrada" ||
    variable == "RCIUPCentrada" ||
    variable == "RCIUfentonpesotalla" ||
    variable == "RCIUfentonpesotallaPC"
  ) {
    for (let i = 0; i < data.length; i++) {
      if (data[i] === 0) {
        values.push({ key: data[i], valor: "No" });
      } else if (data[i] === 1) {
        values.push({ key: data[i], valor: "Si" });
      }
    }
  } else if (variable == "nivelmama" || variable == "nivelpapa") {
    for (let i = 0; i < data.length; i++) {
      if (data[i] === 1) {
        values.push({ key: data[i], valor: "Primaria completa o no" });
      } else if (data[i] === 2) {
        values.push({ key: data[i], valor: "Secundaria completa o no" });
      } else if (data[i] === 3) {
        values.push({
          key: data[i],
          valor: "Técnico o universitario completo o no",
        });
      }
    }
  } else if (variable == "trimestre") {
    for (let i = 0; i < data.length; i++) {
      if (data[i] === 1) {
        values.push({ key: data[i], valor: "Primer trimestre" });
      } else if (data[i] === 2) {
        values.push({ key: data[i], valor: "Segundo trimestre" });
      } else if (data[i] === 3) {
        values.push({ key: data[i], valor: "Tercer trimestre" });
      }
    }
  } else if (variable == "oftalmologiafinal") {
    for (let i = 0; i < data.length; i++) {
      if (data[i] === -2) {
        values.push({ key: data[i], valor: "Desertores o pierden la EPS" });
      } else if (data[i] === -1) {
        values.push({ key: data[i], valor: "Etapa alto riesgo" });
      } else if (data[i] === 0) {
        values.push({ key: data[i], valor: "En espera de la consulta" });
      } else if (data[i] === 1) {
        values.push({ key: data[i], valor: "ROP cualquier grado" });
      } else if (data[i] === 2) {
        values.push({ key: data[i], valor: "No ROP" });
      } else if (data[i] === 3) {
        values.push({ key: data[i], valor: "Cirugía ocular" });
      } else if (data[i] === 6) {
        values.push({ key: data[i], valor: "Ciegos" });
      } else if (data[i] === 10) {
        values.push({ key: data[i], valor: "Otro diagnóstico" });
      }
    }
  } else if (variable == "resoptometria") {
    for (let i = 0; i < data.length; i++) {
      if (data[i] === -2) {
        values.push({ key: data[i], valor: "Desertores o pierden la EPS" });
      } else if (data[i] === -1) {
        values.push({
          key: -1,
          valor: "Etapa 1 o falleció antes de 3m o pendiente",
        });
      } else if (data[i] === 1) {
        values.push({ key: data[i], valor: "Normal" });
      } else if (data[i] === 2) {
        values.push({ key: data[i], valor: "Miope" });
      } else if (data[i] === 3) {
        values.push({ key: data[i], valor: "Astigmatismo" });
      } else if (data[i] === 4) {
        values.push({ key: data[i], valor: "Hipermetropía" });
      } else if (data[i] === 7) {
        values.push({ key: data[i], valor: "Otros diagnósticos" });
      } else if (data[i] === 14) {
        values.push({ key: data[i], valor: "Astigmatismo hipermetrópico" });
      } else if (data[i] === 15) {
        values.push({ key: data[i], valor: "Astigmatismo miópico" });
      }
    }
  } else if (variable == "audiometria") {
    for (let i = 0; i < data.length; i++) {
      if (data[i] === -2) {
        values.push({ key: data[i], valor: "No hay reporte" });
      } else if (data[i] === -1) {
        values.push({
          key: data[i],
          valor: "Etapa 1 o muere o deserta en el primer año",
        });
      } else if (data[i] === 0) {
        values.push({ key: data[i], valor: "Normal" });
      } else if (data[i] === 1) {
        values.push({ key: data[i], valor: "Anormal uno o dos lados" });
      }
    }
  } else if (
    variable == "Infanib3m" ||
    variable == "Infanib6m" ||
    variable == "Infanib9m" ||
    variable == "Infanib12m"
  ) {
    for (let i = 0; i < data.length; i++) {
      if (data[i] === 1) {
        values.push({ key: data[i], valor: "Normal" });
      } else if (data[i] === 2) {
        values.push({ key: data[i], valor: "Transitorio" });
      } else if (data[i] === 3) {
        values.push({ key: data[i], valor: "Anormal" });
      }
    }
  } else if (
    variable == "mes40" ||
    variable == "mes3" ||
    variable == "mes6" ||
    variable == "mes9" ||
    variable == "mes12"
  ) {
    for (let i = 0; i < data.length; i++) {
      if (data[i] === 0) {
        values.push({
          key: data[i],
          valor: "No vino en el tiempo (más adelante o sin cumplir)",
        });
      } else if (data[i] === 1) {
        values.push({ key: data[i], valor: "Si entró en ese tiempo" });
      }
    }
  } else if (
    variable == "alisalida" ||
    variable == "alimentacion.sem40" ||
    variable == "alimentacion.mes3" ||
    variable == "alimentacion.mes6" ||
    variable == "alimentacion.mes9" ||
    variable == "alimentacion.mes12"
  ) {
    for (let i = 0; i < data.length; i++) {
      if (data[i] === 1) {
        values.push({ key: data[i], valor: "LME" });
      } else if (data[i] === 2) {
        values.push({ key: data[i], valor: "LM+LA" });
      } else if (data[i] === 3) {
        values.push({ key: data[i], valor: "LAE" });
      }
    }
  } else if (
    variable == "Indexnutricion40sem" ||
    variable == "indexnutricion12meses"
  ) {
    for (let i = 0; i < data.length; i++) {
      if (data[i] === 0) {
        values.push({
          key: data[i],
          valor: "Disarmónico: menos de -2DS en una de las medidas",
        });
      } else if (data[i] === 1) {
        values.push({
          key: data[i],
          valor: "Armónico: más de -2DS en las 3 medidas",
        });
      }
    }
  } else if (variable == "tipoRCIU") {
    for (let i = 0; i < data.length; i++) {
      if (data[i] === 0) {
        values.push({
          key: data[i],
          valor: "No - (peso y talla y PC > perc10)",
        });
      } else if (data[i] === 1) {
        values.push({
          key: data[i],
          valor: "peso < perc10 - talla y PC > perc10",
        });
      } else if (data[i] === 2) {
        values.push({
          key: data[i],
          valor: "peso y talla < perc10 - PC > perc10",
        });
      } else if (data[i] === 3) {
        values.push({ key: data[i], valor: "peso y talla y PC < perc10" });
      } else if (data[i] === 4) {
        values.push({ key: data[i], valor: "enano en talla" });
      } else if (data[i] === 5) {
        values.push({ key: data[i], valor: "microcefálico" });
      } else if (data[i] === 6) {
        values.push({ key: data[i], valor: "dato faltante en alguna medida" });
      }
    }
  } else if (variable == "tipoRCIU2") {
    for (let i = 0; i < data.length; i++) {
      if (data[i] === 0) {
        values.push({
          key: data[i],
          valor: "No - (peso y talla y PC > perc10)",
        });
      } else if (data[i] === 1) {
        values.push({
          key: data[i],
          valor: "peso < perc10 - talla y PC > perc10",
        });
      } else if (data[i] === 2) {
        values.push({
          key: data[i],
          valor: "peso y talla < perc10 - PC > perc10",
        });
      } else if (data[i] === 3) {
        values.push({ key: data[i], valor: "peso y talla y PC < perc10" });
      }
    }
  } else if (variable == "classificacionlubchenco") {
    for (let i = 0; i < data.length; i++) {
      if (data[i] === 1) {
        values.push({
          key: data[i],
          valor: "PTAEG",
        });
      } else if (data[i] === 2) {
        values.push({
          key: data[i],
          valor: "PTPEG",
        });
      } else if (data[i] === 3) {
        values.push({
          key: data[i],
          valor: "ATPEG o BPN",
        });
      } else if (data[i] === 4) {
        values.push({ key: data[i], valor: "ATAEG" });
      }
    }
  } else {
    values.push({
      input: "La variables es de tipo ordinal, discreta o continua o no existe",
    });
  }

  handleResponse(values, res);
});

//getDiscreteDist Función mapear la variabe discreta seleccionada y en el año específico en el formato para graficar
export const getDiscreteDist = asyncHandler(async (req, res) => {
  const variable = req.query.variable;
  const varsArray = [];
  varsArray.push(variable);
  const anio = req.query.anio;
  const data = await medidasCrecimiento
    .find({ ANOCAT: anio })
    .select(varsArray)
    .lean();
  const distArray = [];

  const keys = [...new Set(data.map((element) => element[variable]))];

  if (variable.includes(".")) {
    var split = variable.split(".");
    var first = split[0];
    var second = split[1];

    for (let i = 0; i < keys.length; i++) {
      if (keys[i]) {
        distArray.push({
          x: keys[i],
          y: data
            .filter((obj) => !!obj[first])
            .filter((obj) => obj[first][second] === keys[i]).length,
        });
      }
    }
  } else {
    for (let i = 0; i < keys.length; i++) {
      if (keys[i]) {
        distArray.push({
          x: keys[i],
          y: data.filter((obj) => obj[variable] === keys[i]).length,
        });
      }
    }
  }

  distArray.sort((a, b) => a.x - b.x);

  handleResponse(distArray, res);
});

//getContinuosDist Función mapear la variabe continua seleccionada y en el año específico en el formato para graficar
export const getContinuosDist = asyncHandler(async (req, res) => {
  const variable = req.query.variable;
  const varsArray = [];
  varsArray.push(variable);
  const anio = req.query.anio;
  const data = await medidasCrecimiento
    .find({ ANOCAT: anio })
    .select(varsArray)
    .lean();

  var keys = [];

  const distArray = [];

  if (variable.includes(".")) {
    var split = variable.split(".");
    var first = split[0];
    var second = split[1];

    keys = [...new Set(data.map((element) => element[first][second]))];
    for (let i = 0; i < keys.length; i++) {
      if (keys[i]) {
        distArray.push({
          x: keys[i],
          y: data
            .filter((obj) => !!obj[first])
            .filter((obj) => obj[first][second] === keys[i]).length,
        });
      }
    }
  } else {
    keys = [...new Set(data.map((element) => element[variable]))];
    for (let i = 0; i < keys.length; i++) {
      if (keys[i]) {
        distArray.push({
          x: keys[i] ? keys[i] : 0,
          y: data.filter((obj) => obj[variable] === keys[i]).length,
        });
      }
    }
  }

  distArray.sort((a, b) => a.x - b.x);

  handleResponse(distArray, res);
});

//groupByVarYears Función que agrupa los datos por años y por los diferentes valores de una variable
export const groupByVarYears = asyncHandler(async (req, res) => {
  // Parametros que entran al body, ambos son Arrays
  const years = req.body.years;
  const variables = req.body.vars;
  const yearsArray = [];

  for (let i = 0; i < years.length; i++) {
    yearsArray.push({
      ANOCAT: years[i],
    });
  }

  const data = await medidasCrecimiento
    .find({ $or: yearsArray }, "ANOCAT")
    .select(variables)
    .lean();

  const dataNoFormat = [];

  if (variables[0].includes(".")) {
    var split = variables[0].split(".");
    var first = split[0];
    var second = split[1];
    for (let i = 0; i < years.length; i++) {
      dataNoFormat.push(
        data
          .filter((obj) => !!obj[first])
          .filter(
            (obj) =>
              obj["ANOCAT"] == years[i] && checkNested(obj, first, second)
          )
          .map((char) => char[first][second])
          .reduce(reducer, {})
      );
    }
  } else {
    for (let i = 0; i < years.length; i++) {
      dataNoFormat.push(
        data
          .filter(
            (obj) =>
              obj["ANOCAT"] == years[i] && obj.hasOwnProperty(variables[0])
          )
          .map((char) => char[variables[0]])
          .reduce(reducer, {})
      );
    }
  }

  var dataFormat = [];

  for (let i = 0; i < dataNoFormat.length; i++) {
    dataFormat.push({
      label: years[i].toString(),
      data: Object.values(dataNoFormat[i]),
      backgroundColor: "#" + genRanHex(6),
    });
  }

  dataFormat = dataFormat.sort((a, b) => a.label - b.label);

  handleResponse(dataFormat, res);
});

// reducer Función para aplicar al reducir y obtener la suma de datos para un valor de una variable.
const reducer = (map, val) => {
  if (!map) {
    map[val] = null;
  }
  if (map[val] == null) {
    map[val] = 1;
  } else {
    ++map[val];
  }

  return map;
};

// genRanHex Función que genera un número hexadecimal de 6 dígitos
const genRanHex = (size) =>
  [...Array(size)]
    .map(() => Math.floor(Math.random() * 16).toString(16))
    .join("");

function checkNested(obj, level, ...rest) {
  if (obj === undefined) return false;
  if (rest.length == 0 && obj.hasOwnProperty(level)) return true;
  return checkNested(obj[level], ...rest);
}

//groupByVarYears Función que agrupa los datos por años y por los diferentes valores de una variable
export const groupByVarYearsNumbers = asyncHandler(async (req, res) => {
  // Parametros que entran al body, ambos son Arrays
  const years = req.body.years;
  const variables = req.body.vars;
  const yearsArray = [];

  for (let i = 0; i < years.length; i++) {
    yearsArray.push({
      ANOCAT: years[i],
    });
  }

  const data = await medidasCrecimiento
    .find({ $or: yearsArray }, "ANOCAT")
    .select(variables)
    .lean();

  const dataTotal = await medidasCrecimiento.find({}).lean();

  var keys = [
    ...new Set(
      dataTotal.map((element) => element[variables[0]]).sort((a, b) => a - b)
    ),
  ];
  var keysAvailable = [
    ...new Set(
      data.map((element) => element[variables[0]]).sort((a, b) => a - b)
    ),
  ];

  const dataNoFormat = [];

  if (variables[0].includes(".")) {
    var split = variables[0].split(".");
    var first = split[0];
    var second = split[1];
    for (let i = 0; i < years.length; i++) {
      dataNoFormat.push(
        data
          .filter((obj) => !!obj[first])
          .filter(
            (obj) =>
              obj["ANOCAT"] == years[i] && checkNested(obj, first, second)
          )
          .map((char) => char[first][second])
          .reduce(reducer, {})
      );
    }
  } else {
    for (let i = 0; i < years.length; i++) {
      dataNoFormat.push(
        data
          .filter(
            (obj) =>
              obj["ANOCAT"] == years[i] && obj.hasOwnProperty(variables[0])
          )
          .map((char) => char[variables[0]])
          .reduce(reducer, {})
      );
    }
  }

  var dataFormat = [];

  for (let i = 0; i < dataNoFormat.length; i++) {
    dataFormat.push({
      label: years[i].toString(),
      data: Object.values(dataNoFormat[i]),
      fill: false,
      borderColor: "#" + genRanHex(6),
      borderWidth: 1,
    });
  }

  dataFormat = dataFormat.sort((a, b) => a.label - b.label);

  handleResponse(dataFormat, res);
});

export const parallelCoordinatesRCIU = asyncHandler(async (req, res) => {
  const initialYear = req.query.year;
  const tipoRCIU = req.query.rciu;
  const etapa = req.query.etapa;
  const finalYear = parseInt(initialYear) + 5;

  var queryArray = [];

  if (etapa == "NACIMIENTO") {
    queryArray = [
      "ANOCAT",
      "edadgestacional",
      "tipoRCIU",
      "pesoalnacer",
      "tallaalnacer",
      "pcalnacer",
      "sexo",
    ];
  } else if (etapa == "PMC") {
    queryArray = [
      "ANOCAT",
      "edadgestacionalalaentrada",
      "tipoRCIU",
      "pesoalaentrada",
      "tallaalaentrada",
      "PCalaentrada",
      "sexo",
    ];
  } else if (etapa == "40SEM") {
    queryArray = [
      "ANOCAT",
      "edadgestacional",
      "tipoRCIU",
      "peso.sem40",
      "talla.sem40",
      "pc.sem40",
      "sexo",
    ];
  } else if (etapa == "3M") {
    queryArray = [
      "ANOCAT",
      "edadgestacional",
      "tipoRCIU",
      "peso.mes3",
      "talla.mes3",
      "pc.mes3",
      "sexo",
    ];
  } else if (etapa == "6M") {
    queryArray = [
      "ANOCAT",
      "edadgestacional",
      "tipoRCIU",
      "peso.mes6",
      "talla.mes6",
      "pc.mes6",
      "sexo",
    ];
  } else if (etapa == "9M") {
    queryArray = [
      "ANOCAT",
      "edadgestacional",
      "tipoRCIU",
      "peso.mes9",
      "talla.mes9",
      "pc.mes9",
      "sexo",
    ];
  } else if (etapa == "12M") {
    queryArray = [
      "ANOCAT",
      "edadgestacional",
      "tipoRCIU",
      "peso.mes12",
      "talla.mes12",
      "pc.mes12",
      "sexo",
    ];
  }

  const data = await medidasCrecimiento
    .find({
      edadgestacional: { $lte: 35 },
      ANOCAT: { $gte: initialYear, $lte: finalYear },
      tipoRCIU: tipoRCIU,
    })
    .select(queryArray)
    .lean();

  const dataParallel = [];

  for (let i = 0; i < data.length; i++) {
    if (etapa == "NACIMIENTO") {
      dataParallel.push({
        "edad gestacional": data[i].edadgestacional,
        "peso nacer (gr)": data[i].pesoalnacer,
        "talla nacer (cm)": data[i].tallaalnacer,
        "pc nacer (cm)": data[i].pcalnacer,
        // color: Math.floor(Math.random() * (10 - 1 + 1) + 1),
      });
    } else if (etapa == "PMC") {
      dataParallel.push({
        "edad gestacional entrada": data[i].edadgestacionalalaentrada,
        "peso entrada (gr)": data[i].pesoalaentrada,
        "talla entrada (cm)": data[i].tallaalaentrada,
        "pc entrada (cm)": data[i].PCalaentrada,
        // color: Math.floor(Math.random() * (10 - 1 + 1) + 1),
      });
    } else if (etapa == "40SEM") {
      dataParallel.push({
        "edad gestacional": data[i].edadgestacional,
        "peso sem40 (gr)": data[i]["peso"]["sem40"],
        "talla sem40 (cm)": data[i]["talla"]["sem40"],
        "pc sem40 (cm)": data[i]["pc"]["sem40"],
        // color: Math.floor(Math.random() * (10 - 1 + 1) + 1),
      });
    } else if (etapa == "3M") {
      dataParallel.push({
        "edad gestacional": data[i].edadgestacional,
        "peso mes3 (gr)": data[i]["peso"]["mes3"],
        "talla mes3 (cm)": data[i]["talla"]["mes3"],
        "pc mes3 (cm)": data[i]["pc"]["mes3"],
        // color: Math.floor(Math.random() * (10 - 1 + 1) + 1),
      });
    } else if (etapa == "6M") {
      dataParallel.push({
        "edad gestacional": data[i].edadgestacional,
        "peso mes6 (gr)": data[i]["peso"]["mes6"],
        "talla mes6 (cm)": data[i]["talla"]["mes6"],
        "pc mes6 (cm)": data[i]["pc"]["mes6"],
        // color: Math.floor(Math.random() * (10 - 1 + 1) + 1),
      });
    } else if (etapa == "9M") {
      dataParallel.push({
        "edad gestacional": data[i].edadgestacional,
        "peso mes9 (gr)": data[i]["peso"]["mes9"],
        "talla mes9 (cm)": data[i]["talla"]["mes9"],
        "pc mes9 (cm)": data[i]["pc"]["mes9"],
        // color: Math.floor(Math.random() * (10 - 1 + 1) + 1),
      });
    } else if (etapa == "12M") {
      dataParallel.push({
        "edad gestacional": data[i].edadgestacional,
        "peso mes12 (gr)": data[i]["peso"]["mes12"],
        "talla mes12 (cm)": data[i]["talla"]["mes12"],
        "pc mes12 (cm)": data[i]["pc"]["mes12"],
        // color: Math.floor(Math.random() * (10 - 1 + 1) + 1),
      });
    }
  }

  handleResponse(dataParallel, res);
});

export const parallerCoordinatesVariables = asyncHandler(async (req, res) => {
  const variables = [];

  variables.push({
    key: "edadGestacional",
    type: "linear",
    min: "auto",
    max: "auto",
    ticksPosition: "before",
    legend: "edad gestacional",
    legendPosition: "start",
    legendOffset: 20,
  });

  variables.push({
    key: "pesoAlNacer",
    type: "linear",
    min: "auto",
    max: "auto",
    ticksPosition: "before",
    legend: "peso al nacer (gr)",
    legendPosition: "start",
    legendOffset: 20,
  });

  variables.push({
    key: "tallaAlNacer",
    type: "linear",
    min: "auto",
    max: "auto",
    ticksPosition: "before",
    legend: "talla al nacer (cm)",
    legendPosition: "start",
    legendOffset: 20,
  });

  variables.push({
    key: "pcAlNacer",
    type: "linear",
    min: "auto",
    max: "auto",
    ticksPosition: "before",
    legend: "PC al nacer (cm)",
    legendPosition: "start",
    legendOffset: 20,
  });

  handleResponse(variables, res);
});

// GenderBaseData
export const GenderBaseData = asyncHandler(async (req, res) => {
  const inicio = req.body.inicio;
  const fin = req.body.fin;
  const variables = req.body.vars;

  var query = {
    ANOCAT: { $gte: inicio, $lte: fin },
  };

  var data = [];

  if (variables && variables.length > 0) {
    for (let i = 0; i < variables.length; i++) {
      if (variables[i].value == "toxemia") {
        query.toxemia = 1;
      }

      if (variables[i].value == "Embarazomultiple") {
        query.Embarazomultiple = 1;
      }

      if (variables[i].value == "primipara") {
        query.primipara = 1;
      }

      if (variables[i].value == "adolescentes") {
        query.edadmama = {
          $lte: 19,
        };
      }

      if (variables[i].value == "mayores") {
        query.edadmama = {
          $gte: 35,
        };
      }

      if (variables[i].value == "nivelmama") {
        query.nivelmama = variables[i].filter.includes("primaria")
          ? 1
          : variables[i].filter.includes("secundaria")
          ? 2
          : 3;
      }

      if (variables[i].value == "pesomama") {
        if (variables[i].desde && variables[i].hasta) {
          query.pesomama = {
            $gte: parseInt(variables[i].desde),
            $lte: parseInt(variables[i].hasta),
          };
        }
      }

      if (variables[i].value == "tallamama") {
        if (variables[i].desde && variables[i].hasta) {
          query.tallamama = {
            $gte: parseInt(variables[i].desde),
            $lte: parseInt(variables[i].hasta),
          };
        }
      }

      if (variables[i].value == "pesopapa") {
        if (variables[i].desde && variables[i].hasta) {
          query.pesopapa = {
            $gte: parseInt(variables[i].desde),
            $lte: parseInt(variables[i].hasta),
          };
        }
      }

      if (variables[i].value == "tallapapa") {
        if (variables[i].desde && variables[i].hasta) {
          query.tallapapa = {
            $gte: parseInt(variables[i].desde),
            $lte: parseInt(variables[i].hasta),
          };
        }
      }

      if (variables[i].value == "percapitasalariominimo") {
        if (variables[i].desde && variables[i].hasta) {
          query.percapitasalariominimo = {
            $gte: parseInt(variables[i].desde),
            $lte: parseInt(variables[i].hasta),
          };
        }
      }
    }

    data = await medidasCrecimiento
      .find(query)
      .select(["RCIUpesoFenton", "sexo", "edadgestacional"])
      .lean();
  } else {
    data = await medidasCrecimiento
      .find(query)
      .select(["RCIUpesoFenton", "sexo", "edadgestacional"])
      .lean();
  }

  const dataResponse = {};
  const size = data.length;

  dataResponse.totalNinos = data.filter(
    (obj) => obj.sexo && obj.sexo == 1
  ).length;
  dataResponse.perNinos =
    Math.round(
      (data.filter((obj) => obj.sexo && obj.sexo == 1).length / size) *
        100 *
        100
    ) / 100;
  dataResponse.totalNinas = data.filter(
    (obj) => obj.sexo && obj.sexo == 2
  ).length;
  dataResponse.perNinas =
    Math.round(
      (data.filter((obj) => obj.sexo && obj.sexo == 2).length / size) *
        100 *
        100
    ) / 100;

  dataResponse.totalPrematuros = data.filter(
    (obj) => obj.edadgestacional && obj.edadgestacional < 37
  ).length;

  dataResponse.perPrematuros =
    Math.round(
      (data.filter((obj) => obj.edadgestacional && obj.edadgestacional < 37)
        .length /
        size) *
        100 *
        100
    ) / 100;

  dataResponse.totalTermino = data.filter(
    (obj) => obj.edadgestacional && obj.edadgestacional >= 37
  ).length;

  dataResponse.perTermino =
    Math.round(
      (data.filter((obj) => obj.edadgestacional && obj.edadgestacional >= 37)
        .length /
        size) *
        100 *
        100
    ) / 100;

  dataResponse.totalRCIU = data.filter(
    (obj) => obj.RCIUpesoFenton && obj.RCIUpesoFenton == 1
  ).length;
  dataResponse.perRCIU =
    Math.round(
      (data.filter((obj) => obj.RCIUpesoFenton && obj.RCIUpesoFenton == 1)
        .length /
        size) *
        100 *
        100
    ) / 100;

  dataResponse.totalSinRCIU = data.filter(
    (obj) => obj.RCIUpesoFenton == 0
  ).length;
  dataResponse.perSinRCIU =
    Math.round(
      (data.filter((obj) => obj.RCIUpesoFenton == 0).length / size) * 100 * 100
    ) / 100;

  handleResponse(dataResponse, res);
});
