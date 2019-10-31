/* global vl, vegaEmbed */

const dots = vl
  .markCircle()
  .transform(
    vl
      .window(
        vl
          .average()
          .as("average_pvot")
          .field("totales.act.pvotant")
      )
      .frame([null, null]) // All preceding and all postceding
      .groupby(["nom"])
  )
  .encode(
    vl
      .y()
      .fieldN("nom")
      .sort({
        field: "average_pvot",
        op: "average",
        order: "descending"
      })
      .axis({ title: "Departamento" }),
    vl
      .x()
      .fieldQ("totales.act.pvotant")
      .axis({ title: "Porcentaje de Votantes" }),
    vl.color().fieldQ("index")
  );

const avgText = dots.markText({ dy: 10 }).encode(
  vl
    .text()
    .fieldQ("average_pvot")
    .format(".2f"),
  vl.x().fieldQ("average_pvot"),
  vl.color().value("firebrick")
);

const avg = avgText.markTick({ thickness: 2, opacity: 1 });

function update(data) {
  const chartSpec = vl
    .layer([dots, avg, avgText])
    .title("Porcentaje promedio de votantes")
    .data(data)
    .toJSON();

  vegaEmbed("#chart", chartSpec);
}

function getData() {
  const dpto = document.querySelector("#selDepto").value;
  fetch(`/data?dpto=${dpto}`)
    .then(res => res.json())
    .then(data => data.records)
    .then(update);
}

document.querySelector("#selDepto").addEventListener("change", () => {
  console.log("changed!");
  getData();
});

getData();
