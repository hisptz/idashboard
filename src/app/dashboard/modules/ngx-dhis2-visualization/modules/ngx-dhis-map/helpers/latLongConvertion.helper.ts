// This is the hack which wont matter since we are using Bounds to fit the map afterwards.
export const convertLatitudeLongitude = coordinate => {
  if (Math.abs(parseInt(coordinate, 10)) > 100000) {
    return (parseFloat(coordinate) / 100000).toFixed(6);
  }
  return parseFloat(coordinate).toFixed(6);
};
