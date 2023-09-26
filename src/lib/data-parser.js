/**
 * Parses and returns useful data from the spreadsheet data
 * @param {any[][]} data The data from spreadhseets API
 */
export function parseData(data) {
  // 1st row is the headers
  const headers = data.shift();
  if (headers === undefined) {
    throw new Error("Headers are undefined!");
  }

  const mappedData = [];
  data.map((row) => {
    mappedData.push(
      row.reduce((acc, curr, index) => {
        acc[headers[index]] = curr;
        return acc;
      }, {})
    );
  });

  return mappedData;
}
