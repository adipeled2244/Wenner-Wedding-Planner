import React from 'react';

const Table = ({ width, height, radius, widthRect, heightRect, shape, chairNumber }) => {
  const seatSVG = '<svg width="33" height="40" viewBox="0 0 33 40" fill="none" xmlns="http://www.w3.org/2000/svg"> ... </svg>';
  const seatWidth = 33;
  const seatHeight = 40;
  const spaceBetweenSeats = 10;

  const renderSeatsInCircle = () => {
    const centerX = width / 2;
    const centerY = height / 2;
    const circumference = 2 * Math.PI * radius;
    const anglePerSeat = 360 / chairNumber;

    const seats = [];

    for (let i = 0; i < chairNumber; i++) {
      const angle = (anglePerSeat * i) * (Math.PI / 180);
      const seatX = centerX + radius * Math.cos(angle) - seatWidth / 2;
      const seatY = centerY + radius * Math.sin(angle) - seatHeight / 2;

      seats.push(
        <image key={i} href={seatSVG} x={seatX} y={seatY} width={seatWidth} height={seatHeight} />
      );
    }

    return seats;
  };

  const renderSeatsInRect = () => {
    const seats = [];

    const rows = Math.floor(heightRect / (seatHeight + spaceBetweenSeats));
    const cols = Math.floor(widthRect / (seatWidth + spaceBetweenSeats));
    const totalSeats = rows * cols;

    for (let i = 0; i < totalSeats; i++) {
      const row = Math.floor(i / cols);
      const col = i % cols;
      const seatX = col * (seatWidth + spaceBetweenSeats);
      const seatY = row * (seatHeight + spaceBetweenSeats);

      seats.push(
        <image key={i} href={seatSVG} x={seatX} y={seatY} width={seatWidth} height={seatHeight} />
      );
    }

    return seats;
  };

  const renderSeats = () => {
    if (shape === 'circle') {
      return renderSeatsInCircle();
    } else if (shape === 'rectangle') {
      return renderSeatsInRect();
    }

    return null;
  };

  return (
    <svg width={width} height={height}>
      {renderSeats()}
    </svg>
  );
};

export default Table;

 {/* <Table shape="circle" width={200} height={200} radius={80} fill="blue" chairs={10} />
      <Table shape="rectangle" width={240} height={200} fill="green" chairs={10} /> */}