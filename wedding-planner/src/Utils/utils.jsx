export const ToCsv = (data) => {
    let dataToCsv = [];
    let headArr = Object.keys(data[0]);
    dataToCsv.push(headArr);
    data.forEach((row) => {
      const arr = Object.values(row).map(String);
      dataToCsv.push(arr);
    });
    return dataToCsv;
  };