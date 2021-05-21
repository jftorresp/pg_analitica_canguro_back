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

// RCIUFreqCesarea
export const RCIUFreqCesarea = asyncHandler(async (req, res) => {
  const initialYear = req.body.inicio;
  const finalYear = req.body.fin;
  const isPremature = req.body.prem;
  const variables = req.body.vars;

  const yearsInterval = [];
  var query = {
    ANOCAT: { $gte: initialYear, $lte: finalYear },
    edadgestacional: isPremature == "true" ? { $lt: 37 } : { $gt: 37 },
    cesarea: 1,
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
        query.pesomama = {
          $gte: parseInt(variables[i].desde),
          $lte: parseInt(variables[i].hasta),
        };
      }

      if (variables[i].value == "tallamama") {
        query.tallamama = {
          $gte: parseInt(variables[i].desde),
          $lte: parseInt(variables[i].hasta),
        };
      }

      if (variables[i].value == "pesopapa") {
        query.pesopapa = {
          $gte: parseInt(variables[i].desde),
          $lte: parseInt(variables[i].hasta),
        };
      }

      if (variables[i].value == "tallapapa") {
        query.tallapapa = {
          $gte: parseInt(variables[i].desde),
          $lte: parseInt(variables[i].hasta),
        };
      }

      if (variables[i].value == "percapitasalariominimo") {
        query.percapitasalariominimo = {
          $gte: parseInt(variables[i].desde),
          $lte: parseInt(variables[i].hasta),
        };
      }
    }

    data = await medidasCrecimiento
      .find(query)
      .select(["ANOCAT", "RCIUpesoFenton", "cesarea"])
      .lean();
  } else {
    data = await medidasCrecimiento
      .find({
        ANOCAT: { $gte: initialYear, $lte: finalYear },
        edadgestacional: isPremature == "true" ? { $lt: 37 } : { $gt: 37 },
        cesarea: 1,
      })
      .select(["ANOCAT", "RCIUpesoFenton", "cesarea"])
      .lean();
  }

  for (let index = initialYear; index < parseInt(finalYear) + 1; index++) {
    yearsInterval.push(index.toString());
  }

  const dataPoints1 = [];
  const dataPoints2 = [];

  const dataVis = {};
  const size = data.length;
  dataVis.colorSet =
    isPremature == "true" ? "customColorSetPrem" : "customColorSetTerm";
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

  for (let i = 0; i < yearsInterval.length; i++) {
    dataPoints1.push({
      x: i,
      y:
        data.filter(
          (obj) => obj.ANOCAT == yearsInterval[i] && obj.RCIUpesoFenton == 1
        ).length / size,
      absolute: data.filter(
        (obj) => obj.ANOCAT == yearsInterval[i] && obj.RCIUpesoFenton == 1
      ).length,
    });

    dataPoints2.push({
      x: i,
      y:
        data.filter(
          (obj) => obj.ANOCAT == yearsInterval[i] && obj.RCIUpesoFenton == 0
        ).length / size,
      absolute: data.filter(
        (obj) => obj.ANOCAT == yearsInterval[i] && obj.RCIUpesoFenton == 0
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
    name:
      isPremature == "true"
        ? "cesárea con RCIU prematuros"
        : "cesárea con RCIU a término",
    showInLegend: true,
    dataPoints: dataPoints1,
  });

  dataVis.data.push({
    type: "spline",
    markerSize: 5,
    name:
      isPremature == "true"
        ? "cesárea sin RCIU prematuros"
        : "cesárea sin RCIU a término",
    showInLegend: true,
    dataPoints: dataPoints2,
  });

  handleResponse(dataVis, res);
});

// RCIUFreqGender
export const RCIUFreqGender = asyncHandler(async (req, res) => {
  const initialYear = req.body.inicio;
  const finalYear = req.body.fin;
  const isPremature = req.body.prem;
  const rciu = req.body.rciu;
  const yearsInterval = [];
  const variables = req.body.vars;

  var query = {
    ANOCAT: { $gte: initialYear, $lte: finalYear },
    edadgestacional: isPremature == "true" ? { $lt: 37 } : { $gt: 37 },
    RCIUpesoFenton: rciu == "true" ? 1 : 0,
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
        query.pesomama = {
          $gte: parseInt(variables[i].desde),
          $lte: parseInt(variables[i].hasta),
        };
      }

      if (variables[i].value == "tallamama") {
        query.tallamama = {
          $gte: parseInt(variables[i].desde),
          $lte: parseInt(variables[i].hasta),
        };
      }

      if (variables[i].value == "pesopapa") {
        query.pesopapa = {
          $gte: parseInt(variables[i].desde),
          $lte: parseInt(variables[i].hasta),
        };
      }

      if (variables[i].value == "tallapapa") {
        query.tallapapa = {
          $gte: parseInt(variables[i].desde),
          $lte: parseInt(variables[i].hasta),
        };
      }

      if (variables[i].value == "percapitasalariominimo") {
        query.percapitasalariominimo = {
          $gte: parseInt(variables[i].desde),
          $lte: parseInt(variables[i].hasta),
        };
      }

      if (variables[i].value == "sexo") {
        if (variables[i].filter.includes("niño")) {
          query.sexo = 1;
        } else if (variables[i].filter.includes("niña")) {
          query.sexo = 2;
        }
      }
    }

    data = await medidasCrecimiento
      .find(query)
      .select(["ANOCAT", "RCIUpesoFenton", "sexo", "edadgestacional"])
      .lean();
  } else {
    data = await medidasCrecimiento
      .find(query)
      .select(["ANOCAT", "RCIUpesoFenton", "sexo", "edadgestacional"])
      .lean();
  }

  for (let index = initialYear; index < parseInt(finalYear) + 1; index++) {
    yearsInterval.push(index.toString());
  }

  const size = data.length;

  const dataPoints1 = [];
  const dataPoints2 = [];
  const dataVis = {};

  dataVis.axisX = {
    labelFontFamily: "arial",
    interval: 5,
  };
  dataVis.axisY = {
    labelFontFamily: "arial",
    suffix: "%",
  };

  dataVis.toolTip = {
    fontFamily: "arial",
    shared: true,
  };

  dataVis.zoomEnabled = true;
  dataVis.zoomType = "xy";

  if (
    variables.some(
      (v) =>
        (v.value =
          ("sexo" && v.filter.includes("niño")) || v.filter.includes("niña"))
    )
  ) {
    for (let i = 0; i < yearsInterval.length; i++) {
      dataPoints1.push({
        label: yearsInterval[i].toString(),
        y:
          (data.filter((obj) => obj.ANOCAT == yearsInterval[i]).length /
            data.filter((obj) => obj.ANOCAT == yearsInterval[i]).length) *
          100,
      });
    }
  } else {
    for (let i = 0; i < yearsInterval.length; i++) {
      dataPoints1.push({
        label: yearsInterval[i].toString(),
        y:
          (data.filter((obj) => obj.ANOCAT == yearsInterval[i] && obj.sexo == 1)
            .length /
            data.filter((obj) => obj.ANOCAT == yearsInterval[i]).length) *
          100,
      });

      dataPoints2.push({
        label: yearsInterval[i].toString(),
        y:
          (data.filter((obj) => obj.ANOCAT == yearsInterval[i] && obj.sexo == 2)
            .length /
            data.filter((obj) => obj.ANOCAT == yearsInterval[i]).length) *
          100,
      });
    }
  }

  dataVis.data = [];
  // dataVis.height = 140;

  dataVis.legend = {
    horizontalAlign: "top",
    verticalAlign: "top",
  };

  if (
    variables.some(
      (v) =>
        (v.value = "sexo" && v.filter.includes("niño")) ||
        v.filter.includes("niña")
    )
  ) {
    dataVis.data.push({
      type: "stackedBar100",
      color: rciu == "true" ? "#70D6BC" : "#0E7FA6",
      indexLabel: "{y}",
      indexLabelFontColor: "white",
      yValueFormatString: "#,###'%'",
      name:
        isPremature == "true"
          ? rciu == "true"
            ? "Niños con RCIU prematuros"
            : "Niñas sin RCIU prematuros"
          : rciu == "true"
          ? "Niños con RCIU a término"
          : "Niños sin RCIU a término",
      showInLegend: true,
      dataPoints: dataPoints1,
    });
  } else {
    dataVis.data.push({
      type: "stackedBar100",
      color: rciu == "true" ? "#70D6BC" : "#0E7FA6",
      indexLabel: "{y}",
      indexLabelFontColor: "white",
      yValueFormatString: "#,###'%'",
      name:
        isPremature == "true"
          ? rciu == "true"
            ? "Niños con RCIU prematuros"
            : "Niñas sin RCIU prematuros"
          : rciu == "true"
          ? "Niños con RCIU a término"
          : "Niños sin RCIU a término",
      showInLegend: true,
      dataPoints: dataPoints1,
    });

    dataVis.data.push({
      type: "stackedBar100",
      color: rciu == "true" ? "#FF955B" : "#cb6a47",
      indexLabel: "{y}",
      indexLabelFontColor: "white",
      yValueFormatString: "#,###'%'",
      name:
        isPremature == "true"
          ? rciu == "true"
            ? "Niñas con RCIU prematuras"
            : "Niñas sin RCIU prematuras"
          : rciu == "true"
          ? "Niñas con RCIU a término"
          : "Niñas sin RCIU a término",
      showInLegend: true,
      dataPoints: dataPoints2,
    });
  }

  handleResponse(dataVis, res);
});

// RCIUFreqEdadGes
export const RCIUFreqEdadGes = asyncHandler(async (req, res) => {
  const initialYear = req.body.inicio;
  const finalYear = req.body.fin;
  const variables = req.body.vars;

  var query = {
    ANOCAT: { $gte: initialYear, $lte: finalYear },
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
        query.pesomama = {
          $gte: parseInt(variables[i].desde),
          $lte: parseInt(variables[i].hasta),
        };
      }

      if (variables[i].value == "tallamama") {
        query.tallamama = {
          $gte: parseInt(variables[i].desde),
          $lte: parseInt(variables[i].hasta),
        };
      }

      if (variables[i].value == "pesopapa") {
        query.pesopapa = {
          $gte: parseInt(variables[i].desde),
          $lte: parseInt(variables[i].hasta),
        };
      }

      if (variables[i].value == "tallapapa") {
        query.tallapapa = {
          $gte: parseInt(variables[i].desde),
          $lte: parseInt(variables[i].hasta),
        };
      }

      if (variables[i].value == "percapitasalariominimo") {
        query.percapitasalariominimo = {
          $gte: parseInt(variables[i].desde),
          $lte: parseInt(variables[i].hasta),
        };
      }
    }

    data = await medidasCrecimiento
      .find(query)
      .select(["ANOCAT", "RCIUpesoFenton", "edadgestacional"])
      .lean();
  } else {
    data = await medidasCrecimiento
      .find(query)
      .select(["ANOCAT", "RCIUpesoFenton", "edadgestacional"])
      .lean();
  }

  const size = data.length;

  const dataPoints1 = [];
  const dataPoints2 = [];
  const dataVis = {};

  dataVis.axisX = {
    labelFontFamily: "arial",
    title: "Edad gestacional (semanas)",
  };
  dataVis.axisY = {
    labelFontFamily: "arial",
    title: "Frecuencia relativa (%)",
    minimum: 0,
  };

  dataVis.toolTip = {
    fontFamily: "arial",
    shared: true,
    content: "{name}: {y} %",
  };

  dataVis.colorSet = "customColorSetPrem";

  dataVis.zoomEnabled = true;
  dataVis.zoomType = "xy";

  dataPoints1.push({
    x: 1,
    y:
      Math.round(
        (data.filter(
          (obj) =>
            obj.ANOCAT >= initialYear &&
            obj.ANOCAT <= finalYear &&
            obj.RCIUpesoFenton == 1 &&
            obj.edadgestacional < 28
        ).length /
          size) *
          100 *
          100
      ) / 100,
  });

  dataPoints1.push({
    x: 2,
    y:
      Math.round(
        (data.filter(
          (obj) =>
            obj.ANOCAT >= initialYear &&
            obj.ANOCAT <= finalYear &&
            obj.RCIUpesoFenton == 1 &&
            obj.edadgestacional >= 28 &&
            obj.edadgestacional < 32
        ).length /
          size) *
          100 *
          100
      ) / 100,
  });

  dataPoints1.push({
    x: 3,
    y:
      Math.round(
        (data.filter(
          (obj) =>
            obj.ANOCAT >= initialYear &&
            obj.ANOCAT <= finalYear &&
            obj.RCIUpesoFenton == 1 &&
            obj.edadgestacional >= 32 &&
            obj.edadgestacional < 34
        ).length /
          size) *
          100 *
          100
      ) / 100,
  });

  dataPoints1.push({
    x: 4,
    y:
      Math.round(
        (data.filter(
          (obj) =>
            obj.ANOCAT >= initialYear &&
            obj.ANOCAT <= finalYear &&
            obj.RCIUpesoFenton == 1 &&
            obj.edadgestacional >= 34 &&
            obj.edadgestacional < 37
        ).length /
          size) *
          100 *
          100
      ) / 100,
  });

  dataPoints1.push({
    x: 5,
    y:
      Math.round(
        (data.filter(
          (obj) =>
            obj.ANOCAT >= initialYear &&
            obj.ANOCAT <= finalYear &&
            obj.RCIUpesoFenton == 1 &&
            obj.edadgestacional >= 37 &&
            obj.edadgestacional < 39
        ).length /
          size) *
          100 *
          100
      ) / 100,
  });

  dataPoints1.push({
    x: 6,
    y:
      Math.round(
        (data.filter(
          (obj) =>
            obj.ANOCAT >= initialYear &&
            obj.ANOCAT <= finalYear &&
            obj.RCIUpesoFenton == 1 &&
            obj.edadgestacional >= 39 &&
            obj.edadgestacional < 41
        ).length /
          size) *
          100 *
          100
      ) / 100,
  });

  dataPoints1.push({
    x: 7,
    y:
      Math.round(
        (data.filter(
          (obj) =>
            obj.ANOCAT >= initialYear &&
            obj.ANOCAT <= finalYear &&
            obj.RCIUpesoFenton == 1 &&
            obj.edadgestacional >= 41 &&
            obj.edadgestacional < 42
        ).length /
          size) *
          100 *
          100
      ) / 100,
  });

  dataPoints2.push({
    x: 1,
    y:
      Math.round(
        (data.filter(
          (obj) =>
            obj.ANOCAT >= initialYear &&
            obj.ANOCAT <= finalYear &&
            obj.RCIUpesoFenton == 0 &&
            obj.edadgestacional < 28
        ).length /
          size) *
          100 *
          100
      ) / 100,
  });

  dataPoints2.push({
    x: 2,
    y:
      Math.round(
        (data.filter(
          (obj) =>
            obj.ANOCAT >= initialYear &&
            obj.ANOCAT <= finalYear &&
            obj.RCIUpesoFenton == 0 &&
            obj.edadgestacional >= 28 &&
            obj.edadgestacional < 32
        ).length /
          size) *
          100 *
          100
      ) / 100,
  });

  dataPoints2.push({
    x: 3,
    y:
      Math.round(
        (data.filter(
          (obj) =>
            obj.ANOCAT >= initialYear &&
            obj.ANOCAT <= finalYear &&
            obj.RCIUpesoFenton == 0 &&
            obj.edadgestacional >= 32 &&
            obj.edadgestacional < 34
        ).length /
          size) *
          100 *
          100
      ) / 100,
  });

  dataPoints2.push({
    x: 4,
    y:
      Math.round(
        (data.filter(
          (obj) =>
            obj.ANOCAT >= initialYear &&
            obj.ANOCAT <= finalYear &&
            obj.RCIUpesoFenton == 0 &&
            obj.edadgestacional >= 34 &&
            obj.edadgestacional < 37
        ).length /
          size) *
          100 *
          100
      ) / 100,
  });

  dataPoints2.push({
    x: 5,
    y:
      Math.round(
        (data.filter(
          (obj) =>
            obj.ANOCAT >= initialYear &&
            obj.ANOCAT <= finalYear &&
            obj.RCIUpesoFenton == 0 &&
            obj.edadgestacional >= 37 &&
            obj.edadgestacional < 39
        ).length /
          size) *
          100 *
          100
      ) / 100,
  });

  dataPoints2.push({
    x: 6,
    y:
      Math.round(
        (data.filter(
          (obj) =>
            obj.ANOCAT >= initialYear &&
            obj.ANOCAT <= finalYear &&
            obj.RCIUpesoFenton == 0 &&
            obj.edadgestacional >= 39 &&
            obj.edadgestacional < 41
        ).length /
          size) *
          100 *
          100
      ) / 100,
  });

  dataPoints2.push({
    x: 7,
    y:
      Math.round(
        (data.filter(
          (obj) =>
            obj.ANOCAT >= initialYear &&
            obj.ANOCAT <= finalYear &&
            obj.RCIUpesoFenton == 0 &&
            obj.edadgestacional >= 41 &&
            obj.edadgestacional < 42
        ).length /
          size) *
          100 *
          100
      ) / 100,
  });

  dataVis.data = [];

  dataVis.legend = {
    horizontalAlign: "top",
    verticalAlign: "top",
  };

  dataVis.data.push({
    type: "stackedArea",
    name: "con RCIU",
    showInLegend: "true",
    dataPoints: dataPoints1,
  });

  dataVis.data.push({
    type: "stackedArea",
    name: "sin RCIU",
    showInLegend: "true",
    dataPoints: dataPoints2,
  });

  handleResponse(dataVis, res);
});

// RCIUFreqEGPremTerm
export const RCIUFreqEGPremTerm = asyncHandler(async (req, res) => {
  const initialYear = req.body.inicio;
  const finalYear = req.body.fin;
  const variables = req.body.vars;

  var data = [];
  var query = {
    ANOCAT: { $gte: initialYear, $lte: finalYear },
  };

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
        query.pesomama = {
          $gte: parseInt(variables[i].desde),
          $lte: parseInt(variables[i].hasta),
        };
      }

      if (variables[i].value == "tallamama") {
        query.tallamama = {
          $gte: parseInt(variables[i].desde),
          $lte: parseInt(variables[i].hasta),
        };
      }

      if (variables[i].value == "pesopapa") {
        query.pesopapa = {
          $gte: parseInt(variables[i].desde),
          $lte: parseInt(variables[i].hasta),
        };
      }

      if (variables[i].value == "tallapapa") {
        query.tallapapa = {
          $gte: parseInt(variables[i].desde),
          $lte: parseInt(variables[i].hasta),
        };
      }

      if (variables[i].value == "percapitasalariominimo") {
        query.percapitasalariominimo = {
          $gte: parseInt(variables[i].desde),
          $lte: parseInt(variables[i].hasta),
        };
      }
    }

    data = await medidasCrecimiento
      .find(query)
      .select(["ANOCAT", "RCIUpesoFenton", "edadgestacional"])
      .lean();
  } else {
    data = await medidasCrecimiento
      .find(query)
      .select(["ANOCAT", "RCIUpesoFenton", "edadgestacional"])
      .lean();
  }

  const size = data.length;

  const response = {};

  response.prematurosRCIU =
    Math.round(
      (data.filter(
        (obj) =>
          obj.ANOCAT >= initialYear &&
          obj.ANOCAT <= finalYear &&
          obj.RCIUpesoFenton == 1 &&
          obj.edadgestacional < 37
      ).length /
        size) *
        100 *
        100
    ) / 100;

  response.terminoRCIU =
    Math.round(
      (data.filter(
        (obj) =>
          obj.ANOCAT >= initialYear &&
          obj.ANOCAT <= finalYear &&
          obj.RCIUpesoFenton == 1 &&
          obj.edadgestacional >= 37
      ).length /
        size) *
        100 *
        100
    ) / 100;

  handleResponse(response, res);
});

// RCIUAFPromMedidaBebeNacer
export const RCIUAFPromMedidaBebeNacer = asyncHandler(async (req, res) => {
  const variable = req.body.var;
  const initialYear = req.body.inicio;
  const finalYear = req.body.fin;
  const isPremature = req.body.prem;
  const yearsInterval = [];
  const variables = req.body.vars;
  const desde = req.body.desde;
  const hasta = req.body.hasta;

  var data = [];
  var query = {
    ANOCAT: { $gte: initialYear, $lte: finalYear },
    edadgestacional: isPremature == "true" ? { $lt: 37 } : { $gt: 37 },
  };

  if (desde && desde != "0" && hasta && hasta != "0") {
    if (variable == "pesoalnacer") {
      query.pesoalnacer = { $gte: parseInt(desde), $lte: parseInt(hasta) };
    } else if (variable == "tallaalnacer") {
      query.tallaalnacer = { $gte: parseInt(desde), $lte: parseInt(hasta) };
    } else if (variable == "pcalnacer") {
      query.pcalnacer = { $gte: parseInt(desde), $lte: parseInt(hasta) };
    }
  }

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
        query.pesomama = {
          $gte: parseInt(variables[i].desde),
          $lte: parseInt(variables[i].hasta),
        };
      }

      if (variables[i].value == "tallamama") {
        query.tallamama = {
          $gte: parseInt(variables[i].desde),
          $lte: parseInt(variables[i].hasta),
        };
      }

      if (variables[i].value == "pesopapa") {
        query.pesopapa = {
          $gte: parseInt(variables[i].desde),
          $lte: parseInt(variables[i].hasta),
        };
      }

      if (variables[i].value == "tallapapa") {
        query.tallapapa = {
          $gte: parseInt(variables[i].desde),
          $lte: parseInt(variables[i].hasta),
        };
      }

      if (variables[i].value == "percapitasalariominimo") {
        query.percapitasalariominimo = {
          $gte: parseInt(variables[i].desde),
          $lte: parseInt(variables[i].hasta),
        };
      }
    }

    data = await medidasCrecimiento
      .find(query)
      .select(["ANOCAT", "RCIUpesoFenton", "edadgestacional", variable])
      .lean();
  } else {
    data = await medidasCrecimiento
      .find(query)
      .select(["ANOCAT", "RCIUpesoFenton", "edadgestacional", variable])
      .lean();
  }

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
          .filter(
            (obj) => obj.RCIUpesoFenton == 1 && obj.ANOCAT == yearsInterval[i]
          )
          .reduce((a, b) => a + (b[variable] || 0), 0) /
          data.filter(
            (obj) => obj.RCIUpesoFenton == 1 && obj.ANOCAT == yearsInterval[i]
          ).length) *
          100
      ) / 100
    );

    dataWithout.push(
      Math.round(
        (data
          .filter(
            (obj) => obj.RCIUpesoFenton == 0 && obj.ANOCAT == yearsInterval[i]
          )
          .reduce((a, b) => a + (b[variable] || 0), 0) /
          data.filter(
            (obj) => obj.RCIUpesoFenton == 0 && obj.ANOCAT == yearsInterval[i]
          ).length) *
          100
      ) / 100
    );
  }

  const promedioSinRCIU =
    dataWithout.reduce((a, b) => a + b, 0) / yearsInterval.length;

  const promedioConRCIU =
    dataWith.reduce((a, b) => a + b, 0) / yearsInterval.length;

  var medida = "";
  if (variable.includes("peso")) {
    medida = "(gr)";
  } else if (variable.includes("talla") || variable.includes("pc")) {
    medida = "(cm)";
  }

  datasets.push({
    label:
      isPremature == "true"
        ? `Promedio ${variable} con RCIU prematuros ${medida}`
        : `Promedio ${variable} con RCIU a término ${medida}`,
    data: dataWith,
    backgroundColor: isPremature == "true" ? "#0E7FA6" : "#70D6BC",
  });

  datasets.push({
    label:
      isPremature == "true"
        ? `Promedio ${variable} sin RCIU prematuros ${medida}`
        : `Promedio ${variable} sin RCIU a término ${medida}`,
    data: dataWithout,
    backgroundColor: isPremature == "true" ? "#FF955B" : "#A6330A",
  });

  dataVis.labels = yearsInterval;
  dataVis.datasets = datasets;

  dataVis.promedioConRCIU = promedioConRCIU;
  dataVis.promedioSinRCIU = promedioSinRCIU;

  handleResponse(dataVis, res);
});

// RCIURCEUFreq
export const RCIURCEUFreq = asyncHandler(async (req, res) => {
  const initialYear = req.body.inicio;
  const finalYear = req.body.fin;
  const isPremature = req.body.prem;
  const yearsInterval = [];
  const variables = req.body.vars;

  var data = [];
  var query = {
    ANOCAT: { $gte: initialYear, $lte: finalYear },
    edadgestacional: isPremature == "true" ? { $lt: 37 } : { $gt: 37 },
  };

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
        query.pesomama = {
          $gte: parseInt(variables[i].desde),
          $lte: parseInt(variables[i].hasta),
        };
      }

      if (variables[i].value == "tallamama") {
        query.tallamama = {
          $gte: parseInt(variables[i].desde),
          $lte: parseInt(variables[i].hasta),
        };
      }

      if (variables[i].value == "pesopapa") {
        query.pesopapa = {
          $gte: parseInt(variables[i].desde),
          $lte: parseInt(variables[i].hasta),
        };
      }

      if (variables[i].value == "tallapapa") {
        query.tallapapa = {
          $gte: parseInt(variables[i].desde),
          $lte: parseInt(variables[i].hasta),
        };
      }

      if (variables[i].value == "percapitasalariominimo") {
        query.percapitasalariominimo = {
          $gte: parseInt(variables[i].desde),
          $lte: parseInt(variables[i].hasta),
        };
      }
    }

    data = await medidasCrecimiento
      .find(query)
      .select([
        "ANOCAT",
        "RCIUpesoFenton",
        "edadgestacional",
        "RCIUpesoFentonentrada",
      ])
      .lean();
  } else {
    data = await medidasCrecimiento
      .find(query)
      .select([
        "ANOCAT",
        "RCIUpesoFenton",
        "edadgestacional",
        "RCIUpesoFentonentrada",
      ])
      .lean();
  }

  for (let index = initialYear; index < parseInt(finalYear) + 1; index++) {
    yearsInterval.push(index.toString());
  }

  const size = data.length;

  const dataVis = {};
  const dataWith = [];
  const dataWithout = [];
  const datasets = [];

  for (let i = 0; i < yearsInterval.length; i++) {
    dataWith.push(
      Math.round(
        (data.filter(
          (obj) =>
            obj.ANOCAT == yearsInterval[i] &&
            obj.RCIUpesoFenton == 1 &&
            obj.RCIUpesoFentonentrada == 1
        ).length /
          size) *
          100 *
          100
      ) / 100
    );

    dataWithout.push(
      Math.round(
        (data.filter(
          (obj) =>
            obj.ANOCAT == yearsInterval[i] &&
            obj.RCIUpesoFenton == 0 &&
            obj.RCIUpesoFentonentrada == 1
        ).length /
          size) *
          100 *
          100
      ) / 100
    );
  }

  datasets.push({
    label:
      isPremature == "true"
        ? `con RCIU y con RCEU prematuros`
        : `con RCIU y con RCEU a término`,
    data: dataWith,
    backgroundColor: isPremature == "true" ? "#0E7FA6" : "#FF955B",
  });

  datasets.push({
    label:
      isPremature == "true"
        ? `sin RCIU y con RCEU prematuros`
        : `sin RCIU y con RCEU a término`,
    data: dataWithout,
    backgroundColor: isPremature == "true" ? "#70D6BC" : "#A6330A",
  });

  dataVis.labels = yearsInterval;
  dataVis.datasets = datasets;

  handleResponse(dataVis, res);
});

// RCIUAntNacimientoVars: Retorna las variables de nacimiento para pacientes con RCIU y sin RCIU
export const RCIUAntNacimientoVars = asyncHandler(async (req, res) => {
  const dataVars = [];

  dataVars.push(
    {
      label: "NOMINALES",
      options: [
        { label: "Sexo", value: "sexo", tipo: "nominal" },
        {
          label: "Nacimiento por cesárea",
          value: "cesarea",
          tipo: "nominal",
        },
      ],
    },
    {
      label: "DISCRETOS",
      options: [
        {
          label: "Edad gestacional",
          value: "edadgestacional",
          tipo: "discreto",
        },
      ],
    },
    {
      label: "CONTINUOS",
      options: [
        { label: "Peso al nacer", value: "pesoalnacer", tipo: "continuo" },
        {
          label: "Talla al nacer",
          value: "tallaalnacer",
          tipo: "continuo",
        },
        {
          label: "Perímetro craneal al nacer",
          value: "pcalnacer",
          tipo: "continuo",
        },
        {
          label: "Relación RCIU - RCEU",
          value: "rciurceu",
          tipo: "continuo",
        },
      ],
    }
  );

  handleResponse(dataVars, res);
});
