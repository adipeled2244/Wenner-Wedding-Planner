import React, { useEffect } from "react";
import "./Pie.css";
import Highcharts from "highcharts";

const PieChartCmp = ({ id, colors, data, total, internalTitle }) => {


  function getData(year) {
    const output = Object.entries(data).map((entry) => {
      const [category, value] = entry;
      return [category, value];
    });

    return [output[0], output];
  }
let content=0;
  if(!data.attending && !data.attendingWithSeats) {
 content=0;
  }
  else if (data.attending){
    content=data.attending;
  } else{
    content=data.attendingWithSeats;
  }

  useEffect(() => {
    let chart;
    const slashTotal = `/${total}`;
    const graphInternalText= `
    <div style="display:flex;flex-direction: column;  align-items:center;">
      <span style="font-size: 20px; color: black;"><span style="font-weight: bold;">${
        content
      }</span></span>
     
      <span style="font-size: 12px;margin-top:3px; text-align: center;">
        
        ${internalTitle}
      </span>
    </div>`;

    // create the chart

    const graphConfig= {
      title: {
        text: "",
        align: "center",
      },
      subtitle: {
        useHTML: true,
        text:graphInternalText,
        floating: true,
        verticalAlign: "middle",
        y: 12,
      },
      legend: {
        enabled: false,
      },
      plotOptions: {
        series: {
          borderWidth: 0,
          colorByPoint: true,
          type: "pie",
          size: "110%",
          innerSize: "80%",
          dataLabels: {
            enabled: false,
            crop: false,
            distance: "-10%",
            style: {
              fontWeight: "bold",
              fontSize: "10px",
            },
            connectorWidth: 0,
          },
        },
      },
      colors: colors,
      series: [
        {
          type: "pie",
          name: "",
          data: getData()[1],
        },
      ],
    }

    chart = Highcharts.chart(`container-${id}`, graphConfig );
  }, [data.attending, data.attending, data.attendingWithSeats]);


  return (
    <figure className="highcharts-figure">
      <div id="parent-container">
        <div id={`container-${id}`} className="graphContainer"></div>
      </div>
    </figure>
  );
};

export default PieChartCmp;
