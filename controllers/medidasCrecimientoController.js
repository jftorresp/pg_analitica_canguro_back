import medidasCrecimiento from "../models/medidasCrecimientoModel.js";
import asyncHandler from "express-async-handler";

// * ENDPOINTS GROWTH STAGE

// handleResponse: Manejador para los datos recibidos por consulta a la base de datos
function handleResponse(data, res) {
  if (data) {
    res.status(200).json(data);
  } else {
    res.status(404).json({ message: "Error fetching data." });
    res.status(404);
    throw new Error("Error fetching the years.");
  }
}

// RCIUFreqDiasH
export const RCIUFreqDiasH = asyncHandler(async (req, res) => {
  const initialYear = req.query.inicio;
  const finalYear = req.query.fin;

  const data = await medidasCrecimiento
    .find({
      ANOCAT: { $gte: initialYear, $lte: finalYear },
    })
    .select([
      "ANOCAT",
      "RCIUpesoFenton",
      "edadgestacional",
      "TotalDiasHospitalizacion",
    ])
    .lean();

  const dataVis = {};
  const dataWith = [];
  const dataWithout = [];
  const datasets = [];

  dataWith.push(
    Math.round(
      (data
        .filter(
          (obj) =>
            obj.ANOCAT >= initialYear &&
            obj.ANOCAT <= finalYear &&
            obj.RCIUpesoFenton == 1 &&
            obj.edadgestacional <= 32
        )
        .reduce((a, b) => a + (b["TotalDiasHospitalizacion"] || 0), 0) /
        data.filter(
          (obj) =>
            obj.ANOCAT >= initialYear &&
            obj.ANOCAT <= finalYear &&
            obj.RCIUpesoFenton == 1 &&
            obj.edadgestacional <= 32
        ).length) *
        100
    ) / 100
  );

  dataWith.push(
    Math.round(
      (data
        .filter(
          (obj) =>
            obj.ANOCAT >= initialYear &&
            obj.ANOCAT <= finalYear &&
            obj.RCIUpesoFenton == 1 &&
            obj.edadgestacional >= 33 &&
            obj.edadgestacional <= 34
        )
        .reduce((a, b) => a + (b["TotalDiasHospitalizacion"] || 0), 0) /
        data.filter(
          (obj) =>
            obj.ANOCAT >= initialYear &&
            obj.ANOCAT <= finalYear &&
            obj.RCIUpesoFenton == 1 &&
            obj.edadgestacional >= 33 &&
            obj.edadgestacional <= 34
        ).length) *
        100
    ) / 100
  );

  dataWith.push(
    Math.round(
      (data
        .filter(
          (obj) =>
            obj.ANOCAT >= initialYear &&
            obj.ANOCAT <= finalYear &&
            obj.RCIUpesoFenton == 1 &&
            obj.edadgestacional >= 34 &&
            obj.edadgestacional < 37
        )
        .reduce((a, b) => a + (b["TotalDiasHospitalizacion"] || 0), 0) /
        data.filter(
          (obj) =>
            obj.ANOCAT >= initialYear &&
            obj.ANOCAT <= finalYear &&
            obj.RCIUpesoFenton == 1 &&
            obj.edadgestacional >= 34 &&
            obj.edadgestacional < 37
        ).length) *
        100
    ) / 100
  );

  dataWith.push(
    Math.round(
      (data
        .filter(
          (obj) =>
            obj.ANOCAT >= initialYear &&
            obj.ANOCAT <= finalYear &&
            obj.RCIUpesoFenton == 1 &&
            obj.edadgestacional >= 37
        )
        .reduce((a, b) => a + (b["TotalDiasHospitalizacion"] || 0), 0) /
        data.filter(
          (obj) =>
            obj.ANOCAT >= initialYear &&
            obj.ANOCAT <= finalYear &&
            obj.RCIUpesoFenton == 1 &&
            obj.edadgestacional >= 37
        ).length) *
        100
    ) / 100
  );

  dataWithout.push(
    Math.round(
      (data
        .filter(
          (obj) =>
            obj.ANOCAT >= initialYear &&
            obj.ANOCAT <= finalYear &&
            obj.RCIUpesoFenton == 0 &&
            obj.edadgestacional <= 32
        )
        .reduce((a, b) => a + (b["TotalDiasHospitalizacion"] || 0), 0) /
        data.filter(
          (obj) =>
            obj.ANOCAT >= initialYear &&
            obj.ANOCAT <= finalYear &&
            obj.RCIUpesoFenton == 0 &&
            obj.edadgestacional <= 32
        ).length) *
        100
    ) / 100
  );

  dataWithout.push(
    Math.round(
      (data
        .filter(
          (obj) =>
            obj.ANOCAT >= initialYear &&
            obj.ANOCAT <= finalYear &&
            obj.RCIUpesoFenton == 0 &&
            obj.edadgestacional >= 33 &&
            obj.edadgestacional <= 34
        )
        .reduce((a, b) => a + (b["TotalDiasHospitalizacion"] || 0), 0) /
        data.filter(
          (obj) =>
            obj.ANOCAT >= initialYear &&
            obj.ANOCAT <= finalYear &&
            obj.RCIUpesoFenton == 0 &&
            obj.edadgestacional >= 33 &&
            obj.edadgestacional <= 34
        ).length) *
        100
    ) / 100
  );

  dataWithout.push(
    Math.round(
      (data
        .filter(
          (obj) =>
            obj.ANOCAT >= initialYear &&
            obj.ANOCAT <= finalYear &&
            obj.RCIUpesoFenton == 0 &&
            obj.edadgestacional >= 34 &&
            obj.edadgestacional < 37
        )
        .reduce((a, b) => a + (b["TotalDiasHospitalizacion"] || 0), 0) /
        data.filter(
          (obj) =>
            obj.ANOCAT >= initialYear &&
            obj.ANOCAT <= finalYear &&
            obj.RCIUpesoFenton == 0 &&
            obj.edadgestacional >= 34 &&
            obj.edadgestacional < 37
        ).length) *
        100
    ) / 100
  );

  dataWithout.push(
    Math.round(
      (data
        .filter(
          (obj) =>
            obj.ANOCAT >= initialYear &&
            obj.ANOCAT <= finalYear &&
            obj.RCIUpesoFenton == 0 &&
            obj.edadgestacional >= 37
        )
        .reduce((a, b) => a + (b["TotalDiasHospitalizacion"] || 0), 0) /
        data.filter(
          (obj) =>
            obj.ANOCAT >= initialYear &&
            obj.ANOCAT <= finalYear &&
            obj.RCIUpesoFenton == 0 &&
            obj.edadgestacional >= 37
        ).length) *
        100
    ) / 100
  );

  datasets.push({
    label: "con RCIU",
    data: dataWith,
    backgroundColor: "#0E7FA6",
  });

  datasets.push({
    label: "sin RCIU",
    data: dataWithout,
    backgroundColor: "#70D6BC",
  });

  dataVis.labels = [
    "< 32 semanas",
    "33-34 semanas",
    "34-37 semanas",
    "> 37 semanas",
  ];
  dataVis.datasets = datasets;

  handleResponse(dataVis, res);
});

// RCIUFreqUCI
export const RCIUFreqUCI = asyncHandler(async (req, res) => {
  const initialYear = req.query.inicio;
  const finalYear = req.query.fin;
  const isPremature = req.query.prem;
  const yearsInterval = [];

  const data = await medidasCrecimiento
    .find({
      ANOCAT: { $gte: initialYear, $lte: finalYear },
      edadgestacional: isPremature == "true" ? { $lt: 37 } : { $gt: 37 },
    })
    .select(["ANOCAT", "RCIUpesoFenton", "UCI"])
    .lean();

  for (let index = initialYear; index < parseInt(finalYear) + 1; index++) {
    yearsInterval.push(index.toString());
  }

  const size = data.length;

  const dataPoints1 = [];
  const dataPoints2 = [];
  const dataVis = {};

  dataVis.colorSet =
    isPremature == "true" ? "customColorSetPrem" : "customColorSetTerm";

  dataVis.axisX = {
    labelFontFamily: "arial",
    interval: 5,
    valueFormatString: "####",
  };
  dataVis.axisY = {
    labelFontFamily: "arial",
    titleFontFamily: "arial",
    title: "Cantidad",
  };

  dataVis.toolTip = {
    fontFamily: "arial",
    shared: true,
  };

  dataVis.zoomEnabled = true;
  dataVis.zoomType = "xy";

  for (let i = 0; i < yearsInterval.length; i++) {
    dataPoints1.push({
      x: parseInt(yearsInterval[i]),
      y: data.filter(
        (obj) =>
          obj.ANOCAT == yearsInterval[i] &&
          obj.UCI == 1 &&
          obj.RCIUpesoFenton == 1
      ).length,
      relative:
        data.filter(
          (obj) =>
            obj.ANOCAT == yearsInterval[i] &&
            obj.UCI == 1 &&
            obj.RCIUpesoFenton == 1
        ).length / size,
    });

    dataPoints2.push({
      x: parseInt(yearsInterval[i]),
      y: data.filter(
        (obj) =>
          obj.ANOCAT == yearsInterval[i] &&
          obj.UCI == 1 &&
          obj.RCIUpesoFenton == 0
      ).length,
      relative:
        data.filter(
          (obj) =>
            obj.ANOCAT == yearsInterval[i] &&
            obj.UCI == 1 &&
            obj.RCIUpesoFenton == 0
        ).length / size,
    });
  }

  dataVis.data = [];
  // dataVis.height = 140;

  dataVis.legend = {
    horizontalAlign: "top",
    verticalAlign: "top",
    fontFamily: "arial",
  };

  dataVis.data.push({
    type: "stackedBar",
    name: isPremature == "true" ? "con RCIU prematuros" : "con RCIU a término",
    showInLegend: true,
    dataPoints: dataPoints1,
  });

  dataVis.data.push({
    type: "stackedBar",
    name: isPremature == "true" ? "sin RCIU prematuros" : "sin RCIU a término",
    showInLegend: true,
    dataPoints: dataPoints2,
  });

  handleResponse(dataVis, res);
});

// RCIUFreqEGEntrada
export const RCIUFreqEGEntrada = asyncHandler(async (req, res) => {
  const initialYear = req.query.inicio;
  const finalYear = req.query.fin;
  const isEntrada = req.query.entrada;
  const yearsInterval = [];

  const data = await medidasCrecimiento
    .find({
      ANOCAT: { $gte: initialYear, $lte: finalYear },
    })
    .select([
      "ANOCAT",
      "RCIUpesoFenton",
      "edadgestacionalalaentrada",
      "edadsalidaPC",
    ])
    .lean();

  for (let index = initialYear; index < parseInt(finalYear) + 1; index++) {
    yearsInterval.push(index.toString());
  }

  const dataPoints1 = [];
  const dataPoints2 = [];

  const dataVis = {};
  dataVis.colorSet =
    isEntrada == "true" ? "customColorSetPrem" : "customColorSetTerm";
  dataVis.axisX = {
    title: "Años",
    titleFontFamily: "arial",
    labelFontFamily: "arial",
    titleFontStyle: "bold",
  };
  dataVis.axisY = {
    title:
      isEntrada == "true"
        ? "Promedio edad gestacional entrada"
        : "Promedio edad gestacional salida",
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
        data
          .filter(
            (obj) => obj.ANOCAT == yearsInterval[i] && obj.RCIUpesoFenton == 1
          )
          .reduce(
            (a, b) =>
              a +
              (b[
                isEntrada == "true"
                  ? "edadgestacionalalaentrada"
                  : "edadsalidaPC"
              ] || 0),
            0
          ) /
        data.filter(
          (obj) => obj.ANOCAT == yearsInterval[i] && obj.RCIUpesoFenton == 1
        ).length,
    });

    dataPoints2.push({
      x: i,
      y:
        data
          .filter(
            (obj) => obj.ANOCAT == yearsInterval[i] && obj.RCIUpesoFenton == 0
          )
          .reduce(
            (a, b) =>
              a +
              (b[
                isEntrada == "true"
                  ? "edadgestacionalalaentrada"
                  : "edadsalidaPC"
              ] || 0),
            0
          ) /
        data.filter(
          (obj) => obj.ANOCAT == yearsInterval[i] && obj.RCIUpesoFenton == 0
        ).length,
    });
  }

  dataVis.data = [];

  dataVis.height = 300;

  dataVis.legend = {
    horizontalAlign: "top",
    verticalAlign: "top",
    fontFamily: "arial",
  };

  dataVis.data.push({
    type: "spline",
    markerSize: 5,
    connectNullData: true,
    name: "con RCIU",
    showInLegend: true,
    dataPoints: dataPoints1,
  });

  dataVis.data.push({
    type: "spline",
    markerSize: 5,
    connectNullData: true,
    name: "sin RCIU",
    showInLegend: true,
    dataPoints: dataPoints2,
  });

  handleResponse(dataVis, res);
});

// RCIUPromPesoPMC
export const RCIUPromPesoPMC = asyncHandler(async (req, res) => {
  const initialYear = req.query.inicio;
  const finalYear = req.query.fin;
  const graph = req.query.graph;
  const yearsInterval = [];

  const data = await medidasCrecimiento
    .find({
      ANOCAT: { $gte: initialYear, $lte: finalYear },
    })
    .select([
      "ANOCAT",
      "RCIUpesoFenton",
      "RCIUpesoFentonentrada",
      "edadgestacional",
      "pesoalaentrada",
      "PesosalidaPC",
    ])
    .lean();

  for (let index = initialYear; index < parseInt(finalYear) + 1; index++) {
    yearsInterval.push(index.toString());
  }

  const dataVis = {};
  const dataEntrada = [];
  const dataSalida = [];
  const datasets = [];

  for (let i = 0; i < yearsInterval.length; i++) {
    dataEntrada.push(
      Math.round(
        (data
          .filter(
            (obj) =>
              obj.ANOCAT == yearsInterval[i] &&
              (graph == "1"
                ? obj.RCIUpesoFenton == 0 && obj.RCIUpesoFentonentrada == 1
                : graph == "2"
                ? obj.RCIUpesoFenton == 0 && obj.RCIUpesoFentonentrada == 0
                : obj.RCIUpesoFenton == 1)
          )
          .reduce((a, b) => a + (b["pesoalaentrada"] || 0), 0) /
          data.filter(
            (obj) =>
              obj.ANOCAT == yearsInterval[i] &&
              (graph == "1"
                ? obj.RCIUpesoFenton == 0 && obj.RCIUpesoFentonentrada == 1
                : graph == "2"
                ? obj.RCIUpesoFenton == 0 && obj.RCIUpesoFentonentrada == 0
                : obj.RCIUpesoFenton == 1)
          ).length) *
          100
      ) / 100
    );

    dataSalida.push(
      Math.round(
        (data
          .filter(
            (obj) =>
              obj.ANOCAT == yearsInterval[i] &&
              (graph == "1"
                ? obj.RCIUpesoFenton == 0 && obj.RCIUpesoFentonentrada == 1
                : graph == "2"
                ? obj.RCIUpesoFenton == 0 && obj.RCIUpesoFentonentrada == 0
                : obj.RCIUpesoFenton == 1)
          )
          .reduce((a, b) => a + (b["PesosalidaPC"] || 0), 0) /
          data.filter(
            (obj) =>
              obj.ANOCAT == yearsInterval[i] &&
              (graph == "1"
                ? obj.RCIUpesoFenton == 0 && obj.RCIUpesoFentonentrada == 1
                : graph == "2"
                ? obj.RCIUpesoFenton == 0 && obj.RCIUpesoFentonentrada == 0
                : obj.RCIUpesoFenton == 1)
          ).length) *
          100
      ) / 100
    );
  }

  datasets.push({
    label: "Peso entrada programa canguro",
    data: dataEntrada,
    backgroundColor:
      graph == 1 ? "#0E7FA6" : graph == 2 ? "#FF955B" : "#e7e72d",
  });

  datasets.push({
    label: "Peso salida programa canguro",
    data: dataSalida,
    backgroundColor:
      graph == 1 ? "#70D6BC" : graph == 2 ? "#A6330A" : "#1fd567",
  });

  dataVis.labels = yearsInterval;
  dataVis.datasets = datasets;

  handleResponse(dataVis, res);
});

// RCIUOxiEntrada
export const RCIUOxiEntrada = asyncHandler(async (req, res) => {
  const initialYear = req.query.inicio;
  const finalYear = req.query.fin;
  const yearsInterval = [];

  const data = await medidasCrecimiento
    .find({ ANOCAT: { $gte: initialYear, $lte: finalYear }, oxigenoentrada: 1 })
    .select(["ANOCAT", "RCIUpesoFenton", "oxigenoentrada"])
    .lean();

  for (let index = initialYear; index < parseInt(finalYear) + 1; index++) {
    yearsInterval.push(index.toString());
  }

  const dataPoints = [];
  const dataVis = {};
  dataVis.colorSet = "customColorSetPrem";
  dataVis.axisX = {
    title: "Presencia de RCIU",
    titleFontFamily: "arial",
    labelFontFamily: "arial",
    titleFontStyle: "bold",
  };
  dataVis.axisY = {
    title: "Número de bebés",
    titleFontFamily: "arial",
    labelFontFamily: "arial",
    titleFontStyle: "bold",
  };

  dataVis.toolTip = {
    content: "{label}: {y} neonatos ({relative}%)",
    fontFamily: "arial",
  };

  const size = data.length;

  dataVis.zoomEnabled = true;
  dataVis.zoomType = "xy";

  dataPoints.push({
    label: "con RCIU",
    y: data.filter(
      (obj) =>
        obj.ANOCAT >= initialYear &&
        obj.ANOCAT <= finalYear &&
        obj.RCIUpesoFenton == 1
    ).length,
    relative:
      Math.round(
        (data.filter(
          (obj) =>
            obj.ANOCAT >= initialYear &&
            obj.ANOCAT <= finalYear &&
            obj.RCIUpesoFenton == 1
        ).length /
          size) *
          100 *
          100
      ) / 100,
  });

  dataPoints.push({
    label: "sin RCIU",
    y: data.filter(
      (obj) =>
        obj.ANOCAT >= initialYear &&
        obj.ANOCAT <= finalYear &&
        obj.RCIUpesoFenton == 0
    ).length,
    relative:
      Math.round(
        (data.filter(
          (obj) =>
            obj.ANOCAT >= initialYear &&
            obj.ANOCAT <= finalYear &&
            obj.RCIUpesoFenton == 0
        ).length /
          size) *
          100 *
          100
      ) / 100,
  });

  dataVis.data = [];

  dataVis.height = 260;

  dataVis.data.push({
    type: "column",
    dataPoints: dataPoints,
  });

  handleResponse(dataVis, res);
});

// RCIULecheMaterna
export const RCIULecheMaterna = asyncHandler(async (req, res) => {
  const initialYear = req.query.inicio;
  const finalYear = req.query.fin;
  const yearsInterval = [];

  const data = await medidasCrecimiento
    .find({ ANOCAT: { $gte: initialYear, $lte: finalYear } })
    .select([
      "ANOCAT",
      "RCIUpesoFenton",
      "alimentacion.sem40",
      "alimentacion.mes3",
      "alimentacion.mes6",
      "alimentacion.mes9",
      "alimentacion.mes12",
    ])
    .lean();

  for (let index = initialYear; index < parseInt(finalYear) + 1; index++) {
    yearsInterval.push(index.toString());
  }

  const dataVis = {};
  const dataWith = [];
  const dataWithout = [];
  const datasets = [];

  dataWith.push(
    data.filter(
      (obj) =>
        obj.ANOCAT >= initialYear &&
        obj.ANOCAT <= finalYear &&
        obj.RCIUpesoFenton == 1 &&
        obj["alimentacion"] &&
        obj["alimentacion"]["sem40"] != 3
    ).length
  );

  dataWith.push(
    data.filter(
      (obj) =>
        obj.ANOCAT >= initialYear &&
        obj.ANOCAT <= finalYear &&
        obj.RCIUpesoFenton == 1 &&
        obj["alimentacion"] &&
        obj["alimentacion"]["mes3"] != 3
    ).length
  );

  dataWith.push(
    data.filter(
      (obj) =>
        obj.ANOCAT >= initialYear &&
        obj.ANOCAT <= finalYear &&
        obj.RCIUpesoFenton == 1 &&
        obj["alimentacion"] &&
        obj["alimentacion"]["mes6"] != 3
    ).length
  );

  dataWith.push(
    data.filter(
      (obj) =>
        obj.ANOCAT >= initialYear &&
        obj.ANOCAT <= finalYear &&
        obj.RCIUpesoFenton == 1 &&
        obj["alimentacion"] &&
        obj["alimentacion"]["mes9"] != 3
    ).length
  );

  dataWith.push(
    data.filter(
      (obj) =>
        obj.ANOCAT >= initialYear &&
        obj.ANOCAT <= finalYear &&
        obj.RCIUpesoFenton == 1 &&
        obj["alimentacion"] &&
        obj["alimentacion"]["mes12"] != 3
    ).length
  );

  dataWithout.push(
    data.filter(
      (obj) =>
        obj.ANOCAT >= initialYear &&
        obj.ANOCAT <= finalYear &&
        obj.RCIUpesoFenton == 0 &&
        obj["alimentacion"] &&
        obj["alimentacion"]["sem40"] != 3
    ).length
  );

  dataWithout.push(
    data.filter(
      (obj) =>
        obj.ANOCAT >= initialYear &&
        obj.ANOCAT <= finalYear &&
        obj.RCIUpesoFenton == 0 &&
        obj["alimentacion"] &&
        obj["alimentacion"]["mes3"] != 3
    ).length
  );

  dataWithout.push(
    data.filter(
      (obj) =>
        obj.ANOCAT >= initialYear &&
        obj.ANOCAT <= finalYear &&
        obj.RCIUpesoFenton == 0 &&
        obj["alimentacion"] &&
        obj["alimentacion"]["mes6"] != 3
    ).length
  );

  dataWithout.push(
    data.filter(
      (obj) =>
        obj.ANOCAT >= initialYear &&
        obj.ANOCAT <= finalYear &&
        obj.RCIUpesoFenton == 0 &&
        obj["alimentacion"] &&
        obj["alimentacion"]["mes9"] != 3
    ).length
  );

  dataWithout.push(
    data.filter(
      (obj) =>
        obj.ANOCAT >= initialYear &&
        obj.ANOCAT <= finalYear &&
        obj.RCIUpesoFenton == 0 &&
        obj["alimentacion"] &&
        obj["alimentacion"]["mes12"] != 3
    ).length
  );

  datasets.push({
    label: "con RCIU",
    data: dataWith,
    backgroundColor: "#0E7FA6",
  });

  datasets.push({
    label: "sin RCIU",
    data: dataWithout,
    backgroundColor: "#FF955B",
  });

  dataVis.labels = ["semana 40", "mes 3", "mes 6", "mes 9", "mes 12"];
  dataVis.datasets = datasets;

  handleResponse(dataVis, res);
});

// RCIULecheMaternaTime
export const RCIULecheMaternaTime = asyncHandler(async (req, res) => {
  const initialYear = req.query.inicio;
  const finalYear = req.query.fin;
  const tiempo = req.query.tiempo;
  const yearsInterval = [];

  const data = await medidasCrecimiento
    .find({
      ANOCAT: { $gte: initialYear, $lte: finalYear },
    })
    .select([
      "ANOCAT",
      "RCIUpesoFenton",
      tiempo == "40"
        ? "alimentacion.sem40"
        : tiempo == "3"
        ? "alimentacion.mes3"
        : tiempo == "6"
        ? "alimentacion.mes6"
        : tiempo == "9"
        ? "alimentacion.mes9"
        : "alimentacion.mes12",
    ])
    .lean();

  for (let index = initialYear; index < parseInt(finalYear) + 1; index++) {
    yearsInterval.push(index.toString());
  }

  const dataPoints1 = [];
  const dataPoints2 = [];

  const dataVis = {};
  dataVis.colorSet = "customColorSetPrem";
  dataVis.axisX = {
    title: "Años",
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
  };

  dataVis.zoomEnabled = true;
  dataVis.zoomType = "xy";

  for (let i = 0; i < yearsInterval.length; i++) {
    dataPoints1.push({
      x: i,
      y:
        Math.round(
          (data.filter(
            (obj) =>
              obj.ANOCAT == yearsInterval[i] &&
              obj.RCIUpesoFenton == 1 &&
              obj.alimentacion &&
              (tiempo == "40"
                ? obj.alimentacion.sem40 != 3
                : tiempo == "3"
                ? obj.alimentacion.mes3 != 3
                : tiempo == "6"
                ? obj.alimentacion.mes6 != 3
                : tiempo == "9"
                ? obj.alimentacion.mes9 != 3
                : obj.alimentacion.mes12 != 3)
          ).length /
            data.filter(
              (obj) => obj.ANOCAT == yearsInterval[i] && obj.RCIUpesoFenton == 1
            ).length) *
            100 *
            100
        ) / 100,
    });

    dataPoints2.push({
      x: i,
      y:
        Math.round(
          (data.filter(
            (obj) =>
              obj.ANOCAT == yearsInterval[i] &&
              obj.RCIUpesoFenton == 0 &&
              obj.alimentacion &&
              (tiempo == "40"
                ? obj.alimentacion.sem40 != 3
                : tiempo == "3"
                ? obj.alimentacion.mes3 != 3
                : tiempo == "6"
                ? obj.alimentacion.mes6 != 3
                : tiempo == "9"
                ? obj.alimentacion.mes9 != 3
                : obj.alimentacion.mes12 != 3)
          ).length /
            data.filter(
              (obj) => obj.ANOCAT == yearsInterval[i] && obj.RCIUpesoFenton == 0
            ).length) *
            100 *
            100
        ) / 100,
    });
  }

  dataVis.data = [];

  dataVis.height = 300;

  dataVis.legend = {
    horizontalAlign: "top",
    verticalAlign: "top",
    fontFamily: "arial",
  };

  dataVis.data.push({
    type: "spline",
    markerSize: 5,
    connectNullData: true,
    name: "con RCIU",
    showInLegend: true,
    dataPoints: dataPoints1,
  });

  dataVis.data.push({
    type: "spline",
    markerSize: 5,
    connectNullData: true,
    name: "sin RCIU",
    showInLegend: true,
    dataPoints: dataPoints2,
  });

  handleResponse(dataVis, res);
});

// RCIUAbsLecheMaternaTime
export const RCIUAbsLecheMaternaTime = asyncHandler(async (req, res) => {
  const initialYear = req.query.inicio;
  const finalYear = req.query.fin;
  const tiempo = req.query.tiempo;
  const rciu = req.query.rciu;
  const yearsInterval = [];

  const data = await medidasCrecimiento
    .find({
      ANOCAT: { $gte: initialYear, $lte: finalYear },
    })
    .select([
      "ANOCAT",
      "RCIUpesoFenton",
      tiempo == "40"
        ? "alimentacion.sem40"
        : tiempo == "3"
        ? "alimentacion.mes3"
        : tiempo == "6"
        ? "alimentacion.mes6"
        : tiempo == "9"
        ? "alimentacion.mes9"
        : "alimentacion.mes12",
    ])
    .lean();

  for (let index = initialYear; index < parseInt(finalYear) + 1; index++) {
    yearsInterval.push(index.toString());
  }

  const dataPoints = [];
  const dataVis = {};
  dataVis.colorSet = rciu == 1 ? "customColorSetWith" : "customColorSetWithout";
  dataVis.axisX = {
    title: "Años",
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

  for (let i = 0; i < yearsInterval.length; i++) {
    dataPoints.push({
      label: yearsInterval[i],
      y: data.filter(
        (obj) =>
          obj.ANOCAT == yearsInterval[i] &&
          (rciu == "1" ? obj.RCIUpesoFenton == 1 : obj.RCIUpesoFenton == 0) &&
          obj.alimentacion &&
          (tiempo == "40"
            ? obj.alimentacion.sem40 != 3
            : tiempo == "3"
            ? obj.alimentacion.mes3 != 3
            : tiempo == "6"
            ? obj.alimentacion.mes6 != 3
            : tiempo == "9"
            ? obj.alimentacion.mes9 != 3
            : obj.alimentacion.mes12 != 3)
      ).length,
    });
  }

  dataVis.data = [];

  dataVis.height = 150;

  dataVis.data.push({
    type: "column",
    dataPoints: dataPoints,
  });

  handleResponse(dataVis, res);
});

// parallelCoordsPMC
export const parallelCoordsPMC = asyncHandler(async (req, res) => {
  const initialYear = req.query.inicio;
  const finalYear = req.query.fin;
  const graph = req.query.graph;
  const yearsInterval = [];

  const data = await medidasCrecimiento
    .find({
      ANOCAT: { $gte: initialYear, $lte: finalYear },
      edadgestacional: { $lt: 37 },
    })
    .select([
      "ANOCAT",
      "RCIUpesoFenton",
      "RCIUpesoFentonentrada",
      "pesoalaentrada",
      "tallaalaentrada",
      "PCalaentrada",
      "edadgestacionalalaentrada",
    ])
    .lean();

  for (let index = initialYear; index < parseInt(finalYear) + 1; index++) {
    yearsInterval.push(index.toString());
  }

  const dataParallel = [];

  for (let i = 0; i < yearsInterval.length; i++) {
    dataParallel.push({
      año: yearsInterval[i],
      EG:
        Math.round(
          (data
            .filter(
              (obj) =>
                obj.ANOCAT == yearsInterval[i] &&
                (graph == "1"
                  ? obj.RCIUpesoFenton == 0 && obj.RCIUpesoFentonentrada == 1
                  : graph == "2"
                  ? obj.RCIUpesoFenton == 0 && obj.RCIUpesoFentonentrada == 0
                  : obj.RCIUpesoFenton == 1)
            )
            .reduce((a, b) => a + (b["edadgestacionalalaentrada"] || 0), 0) /
            data.filter(
              (obj) =>
                obj.ANOCAT == yearsInterval[i] &&
                (graph == "1"
                  ? obj.RCIUpesoFenton == 0 && obj.RCIUpesoFentonentrada == 1
                  : graph == "2"
                  ? obj.RCIUpesoFenton == 0 && obj.RCIUpesoFentonentrada == 0
                  : obj.RCIUpesoFenton == 1)
            ).length) *
            100
        ) / 100,
      "peso (gr)":
        Math.round(
          (data
            .filter(
              (obj) =>
                obj.ANOCAT == yearsInterval[i] &&
                (graph == "1"
                  ? obj.RCIUpesoFenton == 0 && obj.RCIUpesoFentonentrada == 1
                  : graph == "2"
                  ? obj.RCIUpesoFenton == 0 && obj.RCIUpesoFentonentrada == 0
                  : obj.RCIUpesoFenton == 1)
            )
            .reduce((a, b) => a + (b["pesoalaentrada"] || 0), 0) /
            data.filter(
              (obj) =>
                obj.ANOCAT == yearsInterval[i] &&
                (graph == "1"
                  ? obj.RCIUpesoFenton == 0 && obj.RCIUpesoFentonentrada == 1
                  : graph == "2"
                  ? obj.RCIUpesoFenton == 0 && obj.RCIUpesoFentonentrada == 0
                  : obj.RCIUpesoFenton == 1)
            ).length) *
            100
        ) / 100,
      "talla (cm)":
        Math.round(
          (data
            .filter(
              (obj) =>
                obj.ANOCAT == yearsInterval[i] &&
                (graph == "1"
                  ? obj.RCIUpesoFenton == 0 && obj.RCIUpesoFentonentrada == 1
                  : graph == "2"
                  ? obj.RCIUpesoFenton == 0 && obj.RCIUpesoFentonentrada == 0
                  : obj.RCIUpesoFenton == 1)
            )
            .reduce((a, b) => a + (b["tallaalaentrada"] || 0), 0) /
            data.filter(
              (obj) =>
                obj.ANOCAT == yearsInterval[i] &&
                (graph == "1"
                  ? obj.RCIUpesoFenton == 0 && obj.RCIUpesoFentonentrada == 1
                  : graph == "2"
                  ? obj.RCIUpesoFenton == 0 && obj.RCIUpesoFentonentrada == 0
                  : obj.RCIUpesoFenton == 1)
            ).length) *
            100
        ) / 100,
      "pc (cm)":
        Math.round(
          (data
            .filter(
              (obj) =>
                obj.ANOCAT == yearsInterval[i] &&
                (graph == "1"
                  ? obj.RCIUpesoFenton == 0 && obj.RCIUpesoFentonentrada == 1
                  : graph == "2"
                  ? obj.RCIUpesoFenton == 0 && obj.RCIUpesoFentonentrada == 0
                  : obj.RCIUpesoFenton == 1)
            )
            .reduce((a, b) => a + (b["PCalaentrada"] || 0), 0) /
            data.filter(
              (obj) =>
                obj.ANOCAT == yearsInterval[i] &&
                (graph == "1"
                  ? obj.RCIUpesoFenton == 0 && obj.RCIUpesoFentonentrada == 1
                  : graph == "2"
                  ? obj.RCIUpesoFenton == 0 && obj.RCIUpesoFentonentrada == 0
                  : obj.RCIUpesoFenton == 1)
            ).length) *
            100
        ) / 100,
      // color: Math.floor(Math.random() * (10 - 1 + 1) + 1),
    });
  }

  handleResponse(dataParallel, res);
});

// parallelCoordsLecheMaterna
export const parallelCoordsLecheMaterna = asyncHandler(async (req, res) => {
  const initialYear = req.query.inicio;
  const finalYear = req.query.fin;
  const time = req.query.time;
  const rciu = req.query.rciu;
  const yearsInterval = [];

  const data = await medidasCrecimiento
    .find({
      ANOCAT: { $gte: initialYear, $lte: finalYear },
    })
    .select([
      "ANOCAT",
      "RCIUpesoFenton",
      "edadgestacionalalaentrada",
      "alimentacion.sem40",
      "peso.sem40",
      "talla.sem40",
      "pc.sem40",
      "alimentacion.mes3",
      "peso.mes3",
      "talla.mes3",
      "pc.mes3",
      "alimentacion.mes6",
      "peso.mes6",
      "talla.mes6",
      "pc.mes6",
      "alimentacion.mes9",
      "peso.mes9",
      "talla.mes9",
      "pc.mes9",
      "alimentacion.mes12",
      "peso.mes12",
      "talla.mes12",
      "pc.mes12",
    ])
    .lean();

  for (let index = initialYear; index < parseInt(finalYear) + 1; index++) {
    yearsInterval.push(index.toString());
  }

  const tiempo =
    time == "40"
      ? "sem40"
      : time == "3"
      ? "mes3"
      : time == "6"
      ? "mes6"
      : time == "9"
      ? "mes9"
      : "mes12";

  const dataParallel = [];

  for (let i = 0; i < yearsInterval.length; i++) {
    dataParallel.push({
      año: yearsInterval[i],
      EG:
        Math.round(
          (data
            .filter(
              (obj) =>
                obj.ANOCAT == yearsInterval[i] &&
                (rciu == "1"
                  ? obj.RCIUpesoFenton == 1
                  : obj.RCIUpesoFenton == 0) &&
                obj["edadgestacionalalaentrada"] &&
                obj.alimentacion &&
                (time == "40"
                  ? obj.alimentacion.sem40 != 3
                  : time == "3"
                  ? obj.alimentacion.mes3 != 3
                  : time == "6"
                  ? obj.alimentacion.mes6 != 3
                  : time == "9"
                  ? obj.alimentacion.mes9 != 4
                  : obj.alimentacion.mes12 != 3)
            )
            .reduce((a, b) => a + (b["edadgestacionalalaentrada"] || 0), 0) /
            data.filter(
              (obj) =>
                obj.ANOCAT == yearsInterval[i] &&
                (rciu == "1"
                  ? obj.RCIUpesoFenton == 1
                  : obj.RCIUpesoFenton == 0)
            ).length) *
            100
        ) / 100,
      "peso (gr)":
        Math.round(
          (data
            .filter(
              (obj) =>
                obj.ANOCAT == yearsInterval[i] &&
                (rciu == "1"
                  ? obj.RCIUpesoFenton == 1
                  : obj.RCIUpesoFenton == 0) &&
                obj["peso"] &&
                obj.alimentacion &&
                (time == "40"
                  ? obj.alimentacion.sem40 != 3
                  : time == "3"
                  ? obj.alimentacion.mes3 != 3
                  : time == "6"
                  ? obj.alimentacion.mes6 != 3
                  : time == "9"
                  ? obj.alimentacion.mes9 != 4
                  : obj.alimentacion.mes12 != 3)
            )
            .reduce((a, b) => a + (b["peso"][tiempo] || 0), 0) /
            data.filter(
              (obj) =>
                obj.ANOCAT == yearsInterval[i] &&
                (rciu == "1"
                  ? obj.RCIUpesoFenton == 1
                  : obj.RCIUpesoFenton == 0)
            ).length) *
            100
        ) / 100,
      "talla (cm)":
        Math.round(
          (data
            .filter(
              (obj) =>
                obj.ANOCAT == yearsInterval[i] &&
                (rciu == "1"
                  ? obj.RCIUpesoFenton == 1
                  : obj.RCIUpesoFenton == 0) &&
                obj["talla"] &&
                obj.alimentacion &&
                (time == "40"
                  ? obj.alimentacion.sem40 != 3
                  : time == "3"
                  ? obj.alimentacion.mes3 != 3
                  : time == "6"
                  ? obj.alimentacion.mes6 != 3
                  : time == "9"
                  ? obj.alimentacion.mes9 != 4
                  : obj.alimentacion.mes12 != 3)
            )
            .reduce((a, b) => a + (b["talla"][tiempo] || 0), 0) /
            data.filter(
              (obj) =>
                obj.ANOCAT == yearsInterval[i] &&
                (rciu == "1"
                  ? obj.RCIUpesoFenton == 1
                  : obj.RCIUpesoFenton == 0)
            ).length) *
            100
        ) / 100,
      "pc (cm)":
        Math.round(
          (data
            .filter(
              (obj) =>
                obj.ANOCAT == yearsInterval[i] &&
                (rciu == "1"
                  ? obj.RCIUpesoFenton == 1
                  : obj.RCIUpesoFenton == 0) &&
                obj["pc"] &&
                obj.alimentacion &&
                (time == "40"
                  ? obj.alimentacion.sem40 != 3
                  : time == "3"
                  ? obj.alimentacion.mes3 != 3
                  : time == "6"
                  ? obj.alimentacion.mes6 != 3
                  : time == "9"
                  ? obj.alimentacion.mes9 != 4
                  : obj.alimentacion.mes12 != 3)
            )
            .reduce((a, b) => a + (b["pc"][tiempo] || 0), 0) /
            data.filter(
              (obj) =>
                obj.ANOCAT == yearsInterval[i] &&
                (rciu == "1"
                  ? obj.RCIUpesoFenton == 1
                  : obj.RCIUpesoFenton == 0)
            ).length) *
            100
        ) / 100,
    });
  }

  handleResponse(dataParallel, res);
});

export const getEtapasCrecimiento = asyncHandler(async (req, res) => {
  const etapas = [];

  etapas.push({ value: "EMBARAZO", label: "Embarazo" });
  etapas.push({ value: "PMC", label: "Entrada Programa Canguro" });
  etapas.push({ value: "SEM40", label: "40 Semanas" });
  etapas.push({ value: "3M", label: "3 Meses" });
  etapas.push({ value: "6M", label: "6 Meses" });
  etapas.push({ value: "9M", label: "9 meses" });
  etapas.push({ value: "12M", label: "12 Meses" });

  handleResponse(etapas, res);
});

export const getVarsByEtapaCrecimiento = asyncHandler(async (req, res) => {
  const etapa = req.body.etapa;
  const vars = [];

  if (etapa.includes("EMBARAZO")) {
    vars.push({
      value: "TotalDiasHospitalizacion",
      label: "Días hospitalización",
    });
    vars.push({
      value: "UCI",
      label: "UCI",
    });
  }

  if (etapa.includes("PMC")) {
    vars.push({
      value: "edadgestacionalalaentrada",
      label: "Edad gestacional entrada",
    });
    vars.push({
      value: "edadgestasalPC",
      label: "Edad gestacional salida",
    });

    vars.push({
      value: "medidasEntrada",
      label: "Medidas antropométricas entrada",
    });

    vars.push({
      value: "pesoEntradaSalida",
      label: "Peso entrada y salida (gr)",
    });

    vars.push({
      value: "oxigenoentrada",
      label: "Oxígeno entrada",
    });
  }

  if (etapa.includes("SEM40")) {
    vars.push({
      value: "alimentacion.sem40",
      label: "Leche materna a las 40 semanas",
    });

    vars.push({
      value: "medidasLecheSem40",
      label: "Medidas antropométricas con leche materna (40 sem)",
    });

    vars.push({
      value: "peso.sem40",
      label: "Peso 40 semanas",
    });

    vars.push({
      value: "talla.sem40",
      label: "Talla 40 semanas",
    });

    vars.push({
      value: "pc.sem40",
      label: "Perímetro craneal 40 semanas",
    });

    vars.push({
      value: "nut4012",
      label: "Nutrición 40 semanas - 12 meses",
    });
  }

  if (etapa.includes("3M")) {
    vars.push({
      value: "alimentacion.mes3",
      label: "Leche materna a los 3 meses",
    });

    vars.push({
      value: "medidasLecheMes3",
      label: "Medidas antropométricas con leche materna (mes 3)",
    });

    vars.push({
      value: "peso.mes3",
      label: "Peso 3 meses",
    });

    vars.push({
      value: "talla.mes3",
      label: "Talla 3 meses",
    });

    vars.push({
      value: "pc.mes3",
      label: "Perímetro craneal 3 meses",
    });

    vars.push({
      value: "Infanib3m",
      label: "Infanib 3 meses",
    });
  }

  if (etapa.includes("6M")) {
    vars.push({
      value: "alimentacion.mes6",
      label: "Leche materna a los 6 meses",
    });

    vars.push({
      value: "medidasLecheMes6",
      label: "Medidas antropométricas con leche materna (mes 6)",
    });

    vars.push({
      value: "peso.mes6",
      label: "Peso 6 meses",
    });

    vars.push({
      value: "talla.mes6",
      label: "Talla 6 meses",
    });

    vars.push({
      value: "pc.mes6",
      label: "Perímetro craneal 6 meses",
    });

    vars.push({
      value: "Infanib6m",
      label: "Infanib 6 meses",
    });
  }

  if (etapa.includes("9M")) {
    vars.push({
      value: "alimentacion.mes9",
      label: "Leche materna a los 9 meses",
    });

    vars.push({
      value: "medidasLecheMes9",
      label: "Medidas antropométricas con leche materna (mes 9)",
    });

    vars.push({
      value: "peso.mes9",
      label: "Peso 9 meses",
    });

    vars.push({
      value: "talla.mes9",
      label: "Talla 9 meses",
    });

    vars.push({
      value: "pc.mes9",
      label: "Perímetro craneal 9 meses",
    });

    vars.push({
      value: "Infanib9m",
      label: "Infanib 9 meses",
    });
  }

  if (etapa.includes("12M")) {
    vars.push({
      value: "alimentacion.mes12",
      label: "Leche materna a los 12 meses",
    });

    vars.push({
      value: "medidasLecheMes12",
      label: "Medidas antropométricas con leche materna (mes 12)",
    });

    vars.push({
      value: "peso.mes12",
      label: "Peso 12 meses",
    });

    vars.push({
      value: "talla.mes12",
      label: "Talla 12 meses",
    });

    vars.push({
      value: "pc.mes12",
      label: "Perímetro craneal 12 meses",
    });

    vars.push({
      value: "nut4012",
      label: "Nutrición 40 semanas - 12 meses",
    });

    vars.push({
      value: "Infanib12m",
      label: "Infanib 12 meses",
    });
  }

  handleResponse(vars, res);
});

export const RCIUNut4012 = asyncHandler(async (req, res) => {
  const initialYear = req.query.inicio;
  const finalYear = req.query.fin;
  const time = req.query.time;

  const data = await medidasCrecimiento
    .find({
      ANOCAT: { $gte: initialYear, $lte: finalYear },
    })
    .select([
      "ANOCAT",
      "RCIUpesoFenton",
      time == "40" ? "Indexnutricion40sem" : "indexnutricion12meses",
    ])
    .lean();

  const dataVis = {};
  const dataWith = [];
  const dataWithout = [];
  const datasets = [];

  dataWith.push(
    Math.round(
      (data.filter(
        (obj) =>
          obj.ANOCAT >= initialYear &&
          obj.ANOCAT <= finalYear &&
          obj.RCIUpesoFenton == 1 &&
          (time == "40"
            ? obj.Indexnutricion40sem == 0
            : obj.indexnutricion12meses == 0)
      ).length /
        data.filter(
          (obj) =>
            obj.ANOCAT >= initialYear &&
            obj.ANOCAT <= finalYear &&
            obj.RCIUpesoFenton == 1
        ).length) *
        100 *
        100
    ) / 100
  );

  dataWith.push(
    Math.round(
      (data.filter(
        (obj) =>
          obj.ANOCAT >= initialYear &&
          obj.ANOCAT <= finalYear &&
          obj.RCIUpesoFenton == 1 &&
          (time == "40"
            ? obj.Indexnutricion40sem == 1
            : obj.indexnutricion12meses == 1)
      ).length /
        data.filter(
          (obj) =>
            obj.ANOCAT >= initialYear &&
            obj.ANOCAT <= finalYear &&
            obj.RCIUpesoFenton == 1
        ).length) *
        100 *
        100
    ) / 100
  );

  dataWithout.push(
    Math.round(
      (data.filter(
        (obj) =>
          obj.ANOCAT >= initialYear &&
          obj.ANOCAT <= finalYear &&
          obj.RCIUpesoFenton == 0 &&
          (time == "40"
            ? obj.Indexnutricion40sem == 0
            : obj.indexnutricion12meses == 0)
      ).length /
        data.filter(
          (obj) =>
            obj.ANOCAT >= initialYear &&
            obj.ANOCAT <= finalYear &&
            obj.RCIUpesoFenton == 0
        ).length) *
        100 *
        100
    ) / 100
  );

  dataWithout.push(
    Math.round(
      (data.filter(
        (obj) =>
          obj.ANOCAT >= initialYear &&
          obj.ANOCAT <= finalYear &&
          obj.RCIUpesoFenton == 0 &&
          (time == "40"
            ? obj.Indexnutricion40sem == 1
            : obj.indexnutricion12meses == 1)
      ).length /
        data.filter(
          (obj) =>
            obj.ANOCAT >= initialYear &&
            obj.ANOCAT <= finalYear &&
            obj.RCIUpesoFenton == 0
        ).length) *
        100 *
        100
    ) / 100
  );

  datasets.push({
    label: "con RCIU",
    data: dataWith,
    backgroundColor: time == "40" ? "#0E7FA6" : "#FF955B",
  });

  datasets.push({
    label: "sin RCIU",
    data: dataWithout,
    backgroundColor: time == "40" ? "#70D6BC" : "#A6330A",
  });

  dataVis.labels = ["Disarmónico", "Armónico"];
  dataVis.datasets = datasets;

  handleResponse(dataVis, res);
});
