let touristCenters = [
  "Olumo Rock",
  "Uguta Lake",
  "Yankari Game Reserve",
  "Eleko Beach",
  "Ogbunike Cave",
  "Obudu Cattle Ranch",
  "Kajuru Castle",
  "Agodi Gardens",
  "Agbokim Waterfall",
];

let generateDate = () => {
  let zeroStart = [];
  for (let i = 0; i < 60; i++) {
    if (i < 10) {
      zeroStart.push("0" + i);
    } else {
      zeroStart.push(`${i}`);
    }
  }
  return `${2010 + Math.round(11 * Math.random())}-${
    zeroStart[Math.round(11 * Math.random())]
  }-${zeroStart[Math.round(30 * Math.random())]}T${
    zeroStart[Math.round(Math.random() * 23)]
  }:${zeroStart[Math.round(Math.random() * 59)]}:${
    zeroStart[Math.round(Math.random() * 59)]
  }.${Math.round(Math.random() * 899) + 100}Z`;
};

let priceGen = () => {
  return Math.round(Math.random() * 15) * 100;
};

let idGen = () => {
  let char = "abcdefghijklmnopqrstuvwxyz1234567890";
  let newId = "";
  for (let i = 0; i <=23; i++) {
    newId += char[Math.round(Math.random() * (char.length - 1))];
  }
  return newId;
};

let finalArray = [];
for (let i = 0; i < 20; i++) {
  finalArray.push({
    id: idGen(),
    title:
      touristCenters[Math.round(Math.random() * (touristCenters.length - 1))],
    date: generateDate(),
    userId: idGen(),
    price: priceGen(),
  });
}

console.log(finalArray)

//export default finalArray;
