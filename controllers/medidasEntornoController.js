import medidasCrecimiento from "../models/medidasCrecimientoModel.js";
import asyncHandler from "express-async-handler";

// * ENDPOINTS ENVIRONMENT STAGE

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

// RCIUAbsoluteFrequency
export const RCIUAbsoluteFrequency = asyncHandler(async (req, res) => {
  const data = await medidasCrecimiento
    .find({})
    .select([
      "ANOCAT",
      "RCIUpesoFenton",
      "RCIUtalla",
      "RCIUPC",
      "RCIUpesoFentonentrada",
      "RCIUtallaentrada",
      "RCIUPCentrada",
      "RCIUfentonpesotalla",
      "RCIUfentonpesotallaPC",
    ])
    .lean();
  const dataPoints = [];
  const dataVis = {};
  dataVis.colorSet = "customColorSet";
  dataVis.axisX = {
    title: "Intervalo de años",
    titleFontFamily: "arial",
    labelFontFamily: "arial",
    titleFontStyle: "bold",
  };
  dataVis.axisY = {
    title: "Frecuencia Absoluta",
    titleFontFamily: "arial",
    labelFontFamily: "arial",
    titleFontStyle: "bold",
  };

  dataVis.toolTip = {
    content: "{label}: {y} neonatos",
    fontFamily: "arial",
  };

  dataVis.zoomEnabled = true;
  dataVis.zoomType = "xy";

  dataPoints.push({
    label: "1993 - 1998",
    y: data.filter(
      (obj) =>
        obj.ANOCAT >= 1993 && obj.ANOCAT <= 1998 && obj.RCIUpesoFenton == 1
    ).length,
  });

  dataPoints.push({
    label: "1999 - 2004",
    y: data.filter(
      (obj) =>
        obj.ANOCAT >= 1999 && obj.ANOCAT <= 2004 && obj.RCIUpesoFenton == 1
    ).length,
  });

  dataPoints.push({
    label: "2005 - 2010",
    y: data.filter(
      (obj) =>
        obj.ANOCAT >= 2005 && obj.ANOCAT <= 2010 && obj.RCIUpesoFenton == 1
    ).length,
  });

  dataPoints.push({
    label: "2011 - 2016",
    y: data.filter(
      (obj) =>
        obj.ANOCAT >= 2011 && obj.ANOCAT <= 2016 && obj.RCIUpesoFenton == 1
    ).length,
  });

  dataPoints.push({
    label: "2017 - 2020",
    y: data.filter(
      (obj) =>
        obj.ANOCAT >= 2017 && obj.ANOCAT <= 2020 && obj.RCIUpesoFenton == 1
    ).length,
  });

  dataVis.data = [];

  dataVis.height = 260;

  dataVis.data.push({
    type: "column",
    dataPoints: dataPoints,
  });

  handleResponse(dataVis, res);
});

// RCIURelativeFrequency
export const RCIURelativeFrequency = asyncHandler(async (req, res) => {
  const data = await medidasCrecimiento
    .find({})
    .select(["ANOCAT", "RCIUpesoFenton"])
    .lean();

  const dataPoints = [];
  const dataVis = {};
  const size = data.length;

  dataVis.colorSet = "customColorSet";
  dataVis.axisX = {
    title: "Intervalo de años",
    titleFontFamily: "arial",
    labelFontFamily: "arial",
    titleFontStyle: "bold",
  };
  dataVis.axisY = {
    title: "Frecuencia Relativa",
    titleFontFamily: "arial",
    labelFontFamily: "arial",
    titleFontStyle: "bold",
  };

  dataVis.toolTip = {
    fontFamily: "arial",
  };

  dataVis.zoomEnabled = true;
  dataVis.zoomType = "xy";

  dataPoints.push({
    x: 1,
    y:
      data.filter(
        (obj) =>
          obj.ANOCAT >= 1993 && obj.ANOCAT <= 1998 && obj.RCIUpesoFenton == 1
      ).length / size,
  });

  dataPoints.push({
    x: 2,
    y:
      data.filter(
        (obj) =>
          obj.ANOCAT >= 1999 && obj.ANOCAT <= 2004 && obj.RCIUpesoFenton == 1
      ).length / size,
  });

  dataPoints.push({
    x: 3,
    y:
      data.filter(
        (obj) =>
          obj.ANOCAT >= 2005 && obj.ANOCAT <= 2010 && obj.RCIUpesoFenton == 1
      ).length / size,
  });

  dataPoints.push({
    x: 4,
    y:
      data.filter(
        (obj) =>
          obj.ANOCAT >= 2011 && obj.ANOCAT <= 2016 && obj.RCIUpesoFenton == 1
      ).length / size,
  });

  dataPoints.push({
    x: 5,
    y:
      data.filter(
        (obj) =>
          obj.ANOCAT >= 2017 && obj.ANOCAT <= 2020 && obj.RCIUpesoFenton == 1
      ).length / size,
  });

  dataVis.data = [];

  dataVis.height = 260;

  dataVis.data.push({
    type: "line",
    dataPoints: dataPoints,
  });

  handleResponse(dataVis, res);
});

// RCIURelativeFrequencyPremature
export const RCIURelativeFrequencyPremature = asyncHandler(async (req, res) => {
  const initialYear = req.body.inicio;
  const finalYear = req.body.fin;
  const variables = req.body.vars;
  const isPremature = req.body.prem;
  var varsCompare = [];

  var distribuciones = false;
  for (let i = 0; i < variables.length; i++) {
    if (
      variables[i] != "pesomama" &&
      variables[i] != "tallamama" &&
      variables[i] != "pesopapa" &&
      variables[i] != "tallapapa" &&
      variables[i] != "nivelmama"
    ) {
      distribuciones = false;
    } else {
      distribuciones = true;
    }
  }

  if (distribuciones == false) {
    for (let i = 0; i < variables.length; i++) {
      if (variables[i] == "adolescentes" || variables[i] == "mayores") {
        varsCompare.push("edadmama");
      }
      varsCompare.push(variables[i]);
    }

    for (let i = 0; i < varsCompare.length; i++) {
      if (varsCompare[i] == "adolescentes" || varsCompare[i] == "mayores") {
        varsCompare.splice(i, 1);
      }
    }

    var queryArray = ["ANOCAT", "edadgestacional", "RCIUpesoFenton"];
    queryArray = queryArray.concat(varsCompare);

    const data = await medidasCrecimiento
      .find({
        edadgestacional: isPremature == true ? { $lt: 37 } : { $gt: 37 },
        ANOCAT: { $gte: initialYear, $lte: finalYear },
      })
      .select(queryArray)
      .lean();

    const dataPoints1 = [];
    const dataPoints2 = [];

    const dataVis = {};
    const size = data.length;
    dataVis.colorSet =
      isPremature == true ? "customColorSetPrem" : "customColorSetTerm";
    dataVis.axisX = {
      title: "Años",
      titleFontFamily: "arial",
      labelFontFamily: "arial",
      titleFontStyle: "bold",
    };
    dataVis.axisY = {
      title: "Frecuencia Relativa",
      titleFontFamily: "arial",
      labelFontFamily: "arial",
      titleFontStyle: "bold",
    };

    dataVis.toolTip = {
      fontFamily: "arial",
    };

    dataVis.zoomEnabled = true;
    dataVis.zoomType = "xy";

    const yearsInterval = [];
    for (let index = initialYear; index < parseInt(finalYear) + 1; index++) {
      yearsInterval.push(index.toString());
    }

    for (let i = 0; i < yearsInterval.length; i++) {
      dataPoints1.push({
        x: i,
        y:
          varsCompare.length <= 0
            ? data.filter(
                (obj) =>
                  obj.ANOCAT == yearsInterval[i] && obj.RCIUpesoFenton == 1
              ).length / size
            : data.filter(
                (obj) =>
                  obj.ANOCAT == yearsInterval[i] &&
                  obj.RCIUpesoFenton == 1 &&
                  checkIf(variables, obj)
              ).length / size,
        absolute:
          varsCompare.length <= 0
            ? data.filter(
                (obj) =>
                  obj.ANOCAT == yearsInterval[i] && obj.RCIUpesoFenton == 1
              ).length
            : data.filter(
                (obj) =>
                  obj.ANOCAT == yearsInterval[i] &&
                  obj.RCIUpesoFenton == 1 &&
                  checkIf(variables, obj)
              ).length,
      });

      dataPoints2.push({
        x: i,
        y:
          varsCompare.length <= 0
            ? data.filter(
                (obj) =>
                  obj.ANOCAT == yearsInterval[i] && obj.RCIUpesoFenton == 0
              ).length / size
            : data.filter(
                (obj) =>
                  obj.ANOCAT == yearsInterval[i] &&
                  obj.RCIUpesoFenton == 0 &&
                  checkIf(variables, obj)
              ).length / size,
        absolute:
          varsCompare.length <= 0
            ? data.filter(
                (obj) =>
                  obj.ANOCAT == yearsInterval[i] && obj.RCIUpesoFenton == 0
              ).length
            : data.filter(
                (obj) =>
                  obj.ANOCAT == yearsInterval[i] &&
                  obj.RCIUpesoFenton == 0 &&
                  checkIf(variables, obj)
              ).length,
      });
    }

    dataVis.data = [];

    dataVis.legend = {
      horizontalAlign: "top",
      verticalAlign: "top",
    };

    dataVis.data.push({
      type: "spline",
      markerSize: 5,
      name: isPremature == true ? "con RCIU prematuros" : "con RCIU a término",
      showInLegend: true,
      dataPoints: dataPoints1,
    });

    dataVis.data.push({
      type: "spline",
      markerSize: 5,
      name: isPremature == true ? "sin RCIU prematuros" : "sin RCIU a término",
      showInLegend: true,
      dataPoints: dataPoints2,
    });

    handleResponse(dataVis, res);
  } else {
    handleResponse({ message: "Variables de medidas escogidas" }, res);
  }
});

function checkIf(variables, data) {
  var yes = false;
  for (let i = 0; i < variables.length; i++) {
    if (variables[i] == "adolescentes") {
      if (data["edadmama"] <= 19) {
        yes = true;
      }
    }

    if (variables[i] == "mayores") {
      if (data["edadmama"] >= 35) {
        yes = true;
      }
    }

    if (variables[i] != "mayores" || variables[i] != "adolescentes") {
      if (data[variables[i]] == 1) {
        yes = true;
      }
    }
  }
  return yes;
}

// RCIUAbsInitialFrequencyPremature
export const RCIUAbsInitialFrequencyPremature = asyncHandler(
  async (req, res) => {
    const initialYear = req.body.inicio;
    const finalYear = req.body.fin;
    const variable = req.body.var;
    const isPremature = req.body.prem;
    var variableQuery = variable;

    if (variable == "adolescentes" || variable == "mayores") {
      variableQuery = "edadmama";
    }

    var queryArray = ["ANOCAT", "RCIUpesoFenton", variableQuery];

    var data = [];
    if (
      variableQuery != "pesomama" &&
      variableQuery != "pesopapa" &&
      variableQuery != "tallamama" &&
      variableQuery != "tallapapa" &&
      variableQuery != "nivelmama"
    ) {
      data = await medidasCrecimiento
        .find({
          edadgestacional: isPremature == true ? { $lt: 37 } : { $gt: 37 },
          ANOCAT: { $gte: initialYear, $lte: finalYear },
        })
        .select(queryArray)
        .lean();

      const dataPoints1 = [];
      const dataPoints2 = [];
      const dataVis = {};
      dataVis.colorSet =
        isPremature == true ? "customColorSetPrem" : "customColorSetTerm";
      dataVis.axisX = {
        title: "Años",
        titleFontFamily: "arial",
        labelFontFamily: "arial",
        titleFontStyle: "bold",
      };
      dataVis.axisY = {
        title: `Absoluta ${variable}`,
        titleFontFamily: "arial",
        labelFontFamily: "arial",
        titleFontStyle: "bold",
      };

      dataVis.toolTip = {
        fontFamily: "arial",
      };

      dataVis.zoomEnabled = true;
      dataVis.zoomType = "xy";

      const yearsInterval = [];
      for (let index = initialYear; index < parseInt(finalYear) + 1; index++) {
        yearsInterval.push(index.toString());
      }

      for (let i = 0; i < yearsInterval.length; i++) {
        dataPoints1.push({
          label: yearsInterval[i].toString(),
          y: !variable
            ? data.filter(
                (obj) =>
                  obj.ANOCAT == yearsInterval[i] && obj.RCIUpesoFenton == 1
              ).length
            : variable == "adolescentes"
            ? data.filter(
                (obj) =>
                  obj.ANOCAT == yearsInterval[i] &&
                  obj.RCIUpesoFenton == 1 &&
                  obj["edadmama"] <= 19
              ).length
            : variable == "mayores"
            ? data.filter(
                (obj) =>
                  obj.ANOCAT == yearsInterval[i] &&
                  obj.RCIUpesoFenton == 1 &&
                  obj["edadmama"] >= 35
              ).length
            : data.filter(
                (obj) =>
                  obj.ANOCAT == yearsInterval[i] &&
                  obj.RCIUpesoFenton == 1 &&
                  obj[variable] == 1
              ).length,
        });

        dataPoints2.push({
          label: yearsInterval[i].toString(),
          y: !variable
            ? data.filter(
                (obj) =>
                  obj.ANOCAT == yearsInterval[i] && obj.RCIUpesoFenton == 0
              ).length
            : variable == "adolescentes"
            ? data.filter(
                (obj) =>
                  obj.ANOCAT == yearsInterval[i] &&
                  obj.RCIUpesoFenton == 0 &&
                  obj["edadmama"] <= 19
              ).length
            : variable == "mayores"
            ? data.filter(
                (obj) =>
                  obj.ANOCAT == yearsInterval[i] &&
                  obj.RCIUpesoFenton == 0 &&
                  obj["edadmama"] >= 35
              ).length
            : data.filter(
                (obj) =>
                  obj.ANOCAT == yearsInterval[i] &&
                  obj.RCIUpesoFenton == 0 &&
                  obj[variable] == 1
              ).length,
        });
      }

      dataVis.data = [];
      dataVis.height = 140;

      dataVis.legend = {
        horizontalAlign: "top",
        verticalAlign: "top",
      };

      dataVis.data.push({
        type: "stackedColumn",
        name:
          isPremature == true ? "con RCIU prematuros" : "con RCIU a término",
        showInLegend: true,
        dataPoints: dataPoints1,
      });

      dataVis.data.push({
        type: "stackedColumn",
        name:
          isPremature == true ? "sin RCIU prematuros" : "sin RCIU a término",
        showInLegend: true,
        dataPoints: dataPoints2,
      });

      handleResponse(dataVis, res);
    } else {
      handleResponse({ message: "Variable medida escogida" }, res);
    }
  }
);

// RCIUAFPromMedidaMadre
export const RCIUAFPromMedidaMadre = asyncHandler(async (req, res) => {
  const variable = req.query.var;
  const initialYear = req.query.inicio;
  const finalYear = req.query.fin;
  const yearsInterval = [];

  const data = await medidasCrecimiento
    .find({ ANOCAT: { $gte: initialYear, $lte: finalYear } })
    .select(["ANOCAT", "tipoRCIU", variable])
    .lean();

  for (let index = initialYear; index < parseInt(finalYear) + 1; index++) {
    yearsInterval.push(index.toString());
  }

  const dataVis = {};
  const dataWith = [];
  const dataWithout = [];
  const datasets = [];

  for (let i = 0; i < yearsInterval.length; i++) {
    dataWith.push(
      Math.round(
        (data
          .filter((obj) => obj.tipoRCIU == 0 && obj.ANOCAT == yearsInterval[i])
          .reduce((a, b) => a + (b[variable] || 0), 0) /
          data.filter(
            (obj) => obj.tipoRCIU == 0 && obj.ANOCAT == yearsInterval[i]
          ).length) *
          100
      ) / 100
    );

    dataWithout.push(
      Math.round(
        (data
          .filter(
            (obj) =>
              obj.tipoRCIU != 0 &&
              obj.tipoRCIU != 6 &&
              obj.ANOCAT == yearsInterval[i]
          )
          .reduce((a, b) => a + (b[variable] || 0), 0) /
          data.filter(
            (obj) =>
              obj.tipoRCIU != 0 &&
              obj.tipoRCIU != 6 &&
              obj.ANOCAT == yearsInterval[i]
          ).length) *
          100
      ) / 100
    );
  }

  const promedioSinRCIU =
    dataWithout.reduce((a, b) => a + b, 0) / yearsInterval.length;

  const promedioConRCIU =
    dataWith.reduce((a, b) => a + b, 0) / yearsInterval.length;

  datasets.push({
    label: `Promedio ${variable} sin RCIU`,
    data: dataWith,
    backgroundColor: variable.includes("mama") ? "#11487D" : "#B50000",
  });

  datasets.push({
    label: `Promedio ${variable} con RCIU`,
    data: dataWithout,
    backgroundColor: variable.includes("mama") ? "#70D6BC" : "#FF6417",
  });

  dataVis.labels = yearsInterval;
  dataVis.datasets = datasets;

  dataVis.promedioConRCIU = promedioConRCIU;
  dataVis.promedioSinRCIU = promedioSinRCIU;

  handleResponse(dataVis, res);
});

// RCIUAFMedidaMadre
export const RCIUAFMedidaMadre = asyncHandler(async (req, res) => {
  const variable = req.query.var;
  const initialYear = req.query.inicio;
  const finalYear = req.query.fin;
  const isPremature = req.query.prem;
  const desde = req.query.desde;
  const hasta = req.query.hasta;
  const yearsInterval = [];
  var data = [];

  if (desde && desde == "0" && hasta && hasta == "0") {
    data = await medidasCrecimiento
      .find({
        ANOCAT: { $gte: initialYear, $lte: finalYear },
        edadgestacional: isPremature == "true" ? { $lt: 37 } : { $gt: 37 },
      })
      .select(["ANOCAT", "RCIUpesoFenton", variable])
      .lean();
  } else {
    if (variable == "pesomama") {
      data = await medidasCrecimiento
        .find({
          ANOCAT: { $gte: initialYear, $lte: finalYear },
          edadgestacional: isPremature == "true" ? { $lt: 37 } : { $gt: 37 },
          pesomama: { $gte: parseInt(desde), $lte: parseInt(hasta) },
        })
        .select(["ANOCAT", "RCIUpesoFenton", variable])
        .lean();
    } else if (variable == "pesopapa") {
      data = await medidasCrecimiento
        .find({
          ANOCAT: { $gte: initialYear, $lte: finalYear },
          edadgestacional: isPremature == "true" ? { $lt: 37 } : { $gt: 37 },
          pesopapa: { $gte: parseInt(desde), $lte: parseInt(hasta) },
        })
        .select(["ANOCAT", "RCIUpesoFenton", variable])
        .lean();
    } else if (variable == "tallamama") {
      data = await medidasCrecimiento
        .find({
          ANOCAT: { $gte: initialYear, $lte: finalYear },
          edadgestacional: isPremature == "true" ? { $lt: 37 } : { $gt: 37 },
          tallamama: { $gte: parseInt(desde), $lte: parseInt(hasta) },
        })
        .select(["ANOCAT", "RCIUpesoFenton", variable])
        .lean();
    } else if (variable == "tallapapa") {
      data = await medidasCrecimiento
        .find({
          ANOCAT: { $gte: initialYear, $lte: finalYear },
          edadgestacional: isPremature == "true" ? { $lt: 37 } : { $gt: 37 },
          tallapapa: { $gte: parseInt(desde), $lte: parseInt(hasta) },
        })
        .select(["ANOCAT", "RCIUpesoFenton", variable])
        .lean();
    }
  }

  for (let index = initialYear; index < parseInt(finalYear) + 1; index++) {
    yearsInterval.push(index.toString());
  }

  const size = data.length;
  const keys = [...new Set(data.map((element) => element[variable]))]
    .sort((a, b) => a - b)
    .map(String);

  keys.pop();

  const dataPoints = [];
  const dataPoints2 = [];
  const dataVis = {};
  dataVis.colorSet =
    isPremature == "true" ? "customColorSetPrem" : "customColorSetTerm";
  dataVis.axisX = {
    title: `${
      variable.includes("peso") ? variable + " (kg)" : variable + " (cm)"
    }`,
    titleFontFamily: "arial",
    labelFontFamily: "arial",
    titleFontStyle: "bold",
  };
  dataVis.axisY = {
    title: `Frecuencia relativa`,
    titleFontFamily: "arial",
    labelFontFamily: "arial",
    titleFontStyle: "bold",
    minimum: 0,
  };

  dataVis.toolTip = {
    fontFamily: "arial",
    content: `{label} ${variable.includes("peso") ? "kgs" : "cms"}: {y} %`,
  };

  dataVis.zoomEnabled = true;
  dataVis.zoomType = "xy";

  for (let i = 0; i < keys.length; i++) {
    dataPoints.push({
      label: keys[i],
      y:
        Math.round(
          (data
            .filter(
              (obj) => obj[variable] == keys[i] && obj.RCIUpesoFenton == 1
            )
            .reduce((a, b) => a + (b[variable] || 0), 0) /
            size) *
            100
        ) / 100,
    });

    dataPoints2.push({
      label: keys[i],
      y:
        Math.round(
          (data
            .filter(
              (obj) => obj[variable] == keys[i] && obj.RCIUpesoFenton == 0
            )
            .reduce((a, b) => a + (b[variable] || 0), 0) /
            size) *
            100
        ) / 100,
    });
  }

  dataVis.data = [];
  dataVis.height = 350;

  dataVis.legend = {
    horizontalAlign: "top",
    verticalAlign: "top",
  };

  dataVis.data.push({
    type: "stackedColumn",
    name:
      isPremature == "true"
        ? `${variable} con RCIU prematuros`
        : `${variable} con RCIU a término`,
    showInLegend: true,
    dataPoints: dataPoints,
  });

  dataVis.data.push({
    type: "stackedColumn",
    name:
      isPremature == "true"
        ? `${variable} sin RCIU prematuros`
        : `${variable} sin RCIU a término`,
    showInLegend: true,
    dataPoints: dataPoints2,
  });

  handleResponse(dataVis, res);
});

// RCIURFEstudiosMadre
export const RCIURFEstudiosMadre = asyncHandler(async (req, res) => {
  const initialYear = req.query.inicio;
  const finalYear = req.query.fin;
  const isPremature = req.query.prem;
  const estudio = req.query.estudio;
  const yearsInterval = [];
  var data = [];

  if (estudio && estudio != "") {
    if (estudio == "primaria") {
      data = await medidasCrecimiento
        .find({
          ANOCAT: { $gte: initialYear, $lte: finalYear },
          edadgestacional: isPremature == "true" ? { $lt: 37 } : { $gt: 37 },
          nivelmama: 1,
        })
        .select(["ANOCAT", "RCIUpesoFenton", "nivelmama"])
        .lean();
    } else if (estudio == "secundaria") {
      data = await medidasCrecimiento
        .find({
          ANOCAT: { $gte: initialYear, $lte: finalYear },
          edadgestacional: isPremature == "true" ? { $lt: 37 } : { $gt: 37 },
          nivelmama: 2,
        })
        .select(["ANOCAT", "RCIUpesoFenton", "nivelmama"])
        .lean();
    } else if (estudio == "tecnico") {
      data = await medidasCrecimiento
        .find({
          ANOCAT: { $gte: initialYear, $lte: finalYear },
          edadgestacional: isPremature == "true" ? { $lt: 37 } : { $gt: 37 },
          nivelmama: 3,
        })
        .select(["ANOCAT", "RCIUpesoFenton", "nivelmama"])
        .lean();
    }
  } else if (estudio == "") {
    data = await medidasCrecimiento
      .find({
        ANOCAT: { $gte: initialYear, $lte: finalYear },
        edadgestacional: isPremature == "true" ? { $lt: 37 } : { $gt: 37 },
      })
      .select(["ANOCAT", "RCIUpesoFenton", "nivelmama"])
      .lean();
  }

  for (let index = initialYear; index < parseInt(finalYear) + 1; index++) {
    yearsInterval.push(index.toString());
  }

  const size = data.length;
  const keys = [...new Set(data.map((element) => element["nivelmama"]))]
    .sort((a, b) => a - b)
    .map(String);

  keys.pop();

  const dataPoints = [];
  const dataPoints2 = [];
  const dataVis = {};
  dataVis.colorSet =
    isPremature == "true" ? "customColorSetPrem" : "customColorSetTerm";
  dataVis.axisX = {
    title: "Nivel estudios",
    titleFontFamily: "arial",
    labelFontFamily: "arial",
    titleFontStyle: "bold",
  };
  dataVis.axisY = {
    title: "Frecuencia relativa",
    titleFontFamily: "arial",
    labelFontFamily: "arial",
    titleFontStyle: "bold",
  };

  dataVis.toolTip = {
    fontFamily: "arial",
    content: `{label}: {y} %`,
  };

  dataVis.zoomEnabled = true;
  dataVis.zoomType = "xy";

  if (estudio != "") {
    dataPoints.push({
      label: estudio,
      y:
        Math.round(
          (data
            .filter(
              (obj) =>
                obj["nivelmama"] ==
                  (estudio == "primaria"
                    ? 1
                    : estudio == "secundaria"
                    ? 2
                    : 3) && obj.RCIUpesoFenton == 1
            )
            .reduce((a, b) => a + (b["nivelmama"] || 0), 0) /
            size) *
            100
        ) / 100,
    });

    dataPoints2.push({
      label: estudio,
      y:
        Math.round(
          (data
            .filter(
              (obj) =>
                obj["nivelmama"] ==
                  (estudio == "primaria"
                    ? 1
                    : estudio == "secundaria"
                    ? 2
                    : 3) && obj.RCIUpesoFenton == 0
            )
            .reduce((a, b) => a + (b["nivelmama"] || 0), 0) /
            size) *
            100
        ) / 100,
    });
  } else {
    for (let i = 0; i < keys.length; i++) {
      dataPoints.push({
        label:
          keys[i] == 1
            ? "Primaria completa o no"
            : keys[i] == 2
            ? "Secundaria completa o no"
            : keys[i] == 3
            ? "Técnico o universitario completo o no"
            : "NA",
        y:
          Math.round(
            (data
              .filter(
                (obj) => obj["nivelmama"] == keys[i] && obj.RCIUpesoFenton == 1
              )
              .reduce((a, b) => a + (b["nivelmama"] || 0), 0) /
              size) *
              100
          ) / 100,
      });

      dataPoints2.push({
        label:
          keys[i] == 1
            ? "Primaria completa o no"
            : keys[i] == 2
            ? "Secundaria completa o no"
            : keys[i] == 3
            ? "Técnico o universitario completo o no"
            : "NA",
        y:
          Math.round(
            (data
              .filter(
                (obj) => obj["nivelmama"] == keys[i] && obj.RCIUpesoFenton == 0
              )
              .reduce((a, b) => a + (b["nivelmama"] || 0), 0) /
              size) *
              100
          ) / 100,
      });
    }
  }

  dataVis.data = [];
  dataVis.height = 350;

  dataVis.data.push({
    type: "stackedColumn",
    name: isPremature == "true" ? `con RCIU prematuros` : `con RCIU a término`,
    showInLegend: true,
    dataPoints: dataPoints2,
  });

  dataVis.data.push({
    type: "stackedColumn",
    name: isPremature == "true" ? `sin RCIU prematuros` : `sin RCIU a término`,
    showInLegend: true,
    dataPoints: dataPoints2,
  });

  handleResponse(dataVis, res);
});

// RCIURFIngresosMadre
export const RCIURFIngresosMadre = asyncHandler(async (req, res) => {
  const initialYear = req.query.inicio;
  const finalYear = req.query.fin;
  const isPremature = req.query.prem;
  const desde = req.query.desde;
  const hasta = req.query.hasta;
  const yearsInterval = [];
  var data = [];

  if (desde && desde == "0" && hasta && hasta == "0") {
    data = await medidasCrecimiento
      .find({
        ANOCAT: { $gte: initialYear, $lte: finalYear },
        edadgestacional: isPremature == "true" ? { $lt: 37 } : { $gt: 37 },
      })
      .select(["ANOCAT", "RCIUpesoFenton", "percapitasalariominimo"])
      .lean();
  } else {
    data = await medidasCrecimiento
      .find({
        ANOCAT: { $gte: initialYear, $lte: finalYear },
        edadgestacional: isPremature == "true" ? { $lt: 37 } : { $gt: 37 },
        percapitasalariominimo: {
          $gte: parseInt(desde),
          $lte: parseInt(hasta),
        },
      })
      .select(["ANOCAT", "RCIUpesoFenton", "percapitasalariominimo"])
      .lean();
  }

  for (let index = initialYear; index < parseInt(finalYear) + 1; index++) {
    yearsInterval.push(index.toString());
  }

  const size = data.length;
  const keys = [
    ...new Set(data.map((element) => element["percapitasalariominimo"])),
  ].sort((a, b) => a - b);

  keys.pop();

  const dataPoints = [];
  const dataPoints2 = [];
  const dataVis = {};
  dataVis.colorSet =
    isPremature == "true" ? "customColorSetPrem" : "customColorSetTerm";
  dataVis.axisX = {
    title: "Ingresos per cápita (Millones $COP)",
    titleFontFamily: "arial",
    labelFontFamily: "arial",
    titleFontStyle: "bold",
  };
  dataVis.axisY = {
    title: "Frecuencia relativa",
    titleFontFamily: "arial",
    labelFontFamily: "arial",
    titleFontStyle: "bold",
  };

  dataVis.toolTip = {
    fontFamily: "arial",
    content: `$ {x} millones: {y} %`,
  };

  dataVis.zoomEnabled = true;
  dataVis.zoomType = "xy";

  for (let i = 0; i < keys.length; i++) {
    dataPoints.push({
      x: keys[i],
      y:
        data
          .filter(
            (obj) =>
              obj["percapitasalariominimo"] == keys[i] &&
              obj.RCIUpesoFenton == 1
          )
          .reduce((a, b) => a + (b["percapitasalariominimo"] || 0), 0) / size,
    });

    dataPoints2.push({
      x: keys[i],
      y:
        data
          .filter(
            (obj) =>
              obj["percapitasalariominimo"] == keys[i] &&
              obj.RCIUpesoFenton == 0
          )
          .reduce((a, b) => a + (b["percapitasalariominimo"] || 0), 0) / size,
    });
  }

  dataVis.data = [];
  dataVis.height = 350;

  dataVis.data.push({
    type: "spline",
    markerSize: 5,
    name: isPremature == "true" ? "con RCIU prematuros" : "con RCIU a término",
    showInLegend: true,
    dataPoints: dataPoints,
  });

  dataVis.data.push({
    type: "spline",
    markerSize: 5,
    name: isPremature == "true" ? "sin RCIU prematuros" : "sin RCIU a término",
    showInLegend: true,
    dataPoints: dataPoints2,
  });

  handleResponse(dataVis, res);
});

// RCIUAntEntornoVars: Retorna las variables de entorno para pacientes con RCIU
export const RCIUAntEntornoVars = asyncHandler(async (req, res) => {
  const dataVars = [];

  dataVars.push(
    {
      label: "NOMINALES",
      options: [
        { label: "Toxemia", value: "toxemia", tipo: "nominal" },
        {
          label: "Embarazo múltiple",
          value: "Embarazomultiple",
          tipo: "nominal",
        },
        { label: "Madre primeriza", value: "primipara", tipo: "nominal" },
      ],
    },
    {
      label: "ORDINALES",
      options: [
        { label: "Estudios mamá", value: "nivelmama", tipo: "ordinal" },
      ],
    },
    {
      label: "DISCRETOS",
      options: [
        {
          label: "Madre adolescente (< 19 años)",
          value: "adolescentes",
          tipo: "discreto",
        },
        {
          label: "Madre mayor (> 35 años)",
          value: "mayores",
          tipo: "discreto",
        },
      ],
    },
    {
      label: "CONTINUOS",
      options: [
        { label: "Peso mamá (kg)", value: "pesomama", tipo: "continuo" },
        {
          label: "Talla mamá (cm)",
          value: "tallamama",
          tipo: "continuo",
        },
        { label: "Peso papá (kg)", value: "pesopapa", tipo: "continuo" },
        {
          label: "Talla papá (cm)",
          value: "tallapapa",
          tipo: "continuo",
        },
        {
          label: "Ingresos per cápita",
          value: "percapitasalariominimo",
          tipo: "continuo",
        },
      ],
    }
  );

  handleResponse(dataVars, res);
});
