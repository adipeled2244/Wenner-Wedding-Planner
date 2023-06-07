import React, { useEffect } from "react";
import "./Pie.css";
import Highcharts from "highcharts";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";
import ReactDOMServer from 'react-dom/server';

const PieChartCmp = ({id,colors,data,icon,total,internalTitle}) => {
  useEffect(() => {
    let  chart;

    function getData(year) {
        const output = Object.entries(data).map((entry) => {
        const [category, value] = entry;
        return [category, value];
      });

      return [output[0], output];
    }

    // function getSubtitle() {
    //   return `
    //     <div style="display:flex;flex-direction: column; ">
    //       <span style="font-size: 20px; color: black;"><span style="font-weight: bold;">${data.attending || data.takenSits}</span>/${total}</span>
         
    //       <span style="font-size: 12px;margin-top:3px; text-align: center;">
    //         Attending
    //       </span>
    //     </div>`;
    // }
    // <div class="position:absoulte; top:20px;">${icon}</div>
    const insideTitle= internalTitle==="Attending"? `${data.attending || 5 }</span>` : `${data.seats || 5 }</span>/${total}` 
    const slashTotal=`/${total}`;
    chart = Highcharts.chart(`container-${id}`, {
      title: {
        text: "",
        align: "center",
      },
      subtitle: {
        useHTML: true,
        text:`
        <div style="display:flex;flex-direction: column;  align-items:center;">
          <span style="font-size: 20px; color: black;"><span style="font-weight: bold;">${data.attending? data.attending : 5 }</span>${data.attending? ' ' : slashTotal }</span>
         
          <span style="font-size: 12px;margin-top:3px; text-align: center;">
            
            ${internalTitle}
          </span>
        </div>`,
        floating: true,
        verticalAlign: "middle",
        y: 12,
      },
      legend: {
        enabled: false,
      }
      ,
      // tooltip: {
      //   valueDecimals: 2,
      //   //write people?
      //   valueSuffix: " ",
      // },
      plotOptions: {
        series: {
          borderWidth: 0,
          colorByPoint: true,
          type: "pie",
          size: "110%",
          innerSize: "80%",
          dataLabels: {
            // to change to trut to labels
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
    });

    // Clean up the chart on unmount
    // return () => {
    //   if (chart) {
    //     chart.destroy();
    //   }
    // };
  }, [data.attending,data.attending, data.takenSits, data.notTakenSits]);

  const divStyle = {
    height: '180px',
    maxWidth: '180px',
    margin: '0 auto'
  };

  return (
    <figure className="highcharts-figure">
      <div id="parent-container">
        <div id={`container-${id}`} style={divStyle}></div>
      </div>
    </figure>
  );
};

export default PieChartCmp;
