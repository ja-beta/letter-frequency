
const globalTooltip = setTooltip();

//color for passwords - all
const sqrtScalePwAll = d3.scaleSqrt()
  .domain([1, 100]) //max domain is calculated and changed later!
  .range([1, 30]);

const colorScalePwAll = d3.scaleSequential(d3.interpolateOrRd)
  .domain([1, 100]);

// color for passwords - first letter
const sqrtScalePwFirst = d3.scaleSqrt()
  .domain([1, 100])
  .range([1, 30]);

const colorScalePwFirst = d3.scaleSequential(d3.interpolateOrRd)
  .domain([1, 100]);


const colorScaleFinal = d3.scaleSequential()
  .domain([0, 100])
  .interpolator(d3.interpolateRgbBasis(["#FFE9F6", "#FFC6D7", "#9DD1A2" ,"#4CBD8E", "#2C9C95",  "#28859A"]));

  


function countCharacters(wordList, countingFunction, considerUppercase) {
  // console.log("Word list:", wordList);
  if (!considerUppercase) {
    wordList = wordList.map(word => word.toLowerCase());
  }
  return countingFunction(wordList);
}


function countAllOccurrences(wordList) {
  const charCounts = {};
  wordList.forEach(word => {
    for (const char of word) {
      if (charCounts[char]) {
        charCounts[char]++;
      } else {
        charCounts[char] = 1;
      }
    }
  });
  return charCounts;
}

function countFirstChar(wordList) {
  const firstCharCounts = {};
  wordList.forEach(word => {
    const firstChar = word[0];
    if (firstCharCounts[firstChar]) {
      firstCharCounts[firstChar]++;
    } else {
      firstCharCounts[firstChar] = 1;
    }
  });
  return firstCharCounts;
}

function countAllOccurrencesCaseInsensitive(wordList) {
  const charCounts = {};

  wordList.forEach(word => {
    word = word.toLowerCase();

    for (const char of word) {
      if (charCounts[char]) {
        charCounts[char]++;
      } else {
        charCounts[char] = 1;
      }
    }
  });

  return charCounts;
}


function loadDataCreateKb(dataPath, containerId, countingFunction, colorScale, considerUppercase, displayCharacters = true) {
  d3.csv(dataPath).then(data => {
    const words = data.map(d => d[Object.keys(d)[0]]);
    const charCounts = countCharacters(words, countingFunction, considerUppercase);
    console.log(`Character counts for ${containerId}: `, charCounts);
    createKeyboard(containerId, charCounts, colorScale, considerUppercase, displayCharacters);
  });

}

// d3.csv(dataPath).then((data) => {
//   console.log("CSV data:", data); 
// }).catch((error) => {
//   console.error("Error loading CSV:", error); 
// });


loadDataCreateKb("assets/passwords.csv", 'kbOne', countAllOccurrences, colorScalePwAll, true);
loadDataCreateKb("assets/passwords.csv", 'kbTwo', countFirstChar, colorScalePwFirst, false);

loadDataCreateKb("assets/passwords.csv", 'password-blur', countAllOccurrences, colorScaleFinal, false, false);

loadDataCreateKb("assets/baby-names-1880.csv", 'kbBaby1880', countAllOccurrences, colorScaleFinal, false, false);

loadDataCreateKb("assets/baby-names-1980.csv", 'kbBaby1980', countAllOccurrences, colorScaleFinal, false, false);


loadDataCreateKb("assets/baby-names-2015.csv", 'kbBaby2015', countAllOccurrences, colorScaleFinal, false, false);

loadDataCreateKb("assets/companies.csv", 'kbCompanies', countAllOccurrences, colorScaleFinal, false, false);

loadDataCreateKb("assets/english-fake.csv", 'kbEngF', countAllOccurrences, colorScaleFinal, false, false);

loadDataCreateKb("assets/nasdaq.csv", 'kbNasdaq', countAllOccurrences, colorScaleFinal, false, false);

loadDataCreateKb("assets/USpresidents.csv", 'kbPresidents', countAllOccurrences, colorScaleFinal, false, false);

loadDataCreateKb("assets/nobel.csv", 'kbNobel', countAllOccurrences, colorScaleFinal, false, false);

loadDataCreateKb("assets/websites.csv", 'kbWebsites', countAllOccurrences, colorScaleFinal, false, false);

loadDataCreateKb("assets/celebs.csv", 'kbCelebs', countAllOccurrences, colorScaleFinal, false, false);

loadDataCreateKb("assets/charities.csv", 'kbCharities', countAllOccurrences, colorScaleFinal, false, false);



//heatmap
// const dataPath = "assets/brooklyn.csv";
// createHeatmapFromData(dataPath, "heatmap-container");


const kbLayout = [
  [{ char1: '1', char2: '!' },
  { char1: '2', char2: '@' },
  { char1: '3', char2: '#' },
  { char1: '4', char2: '$' },
  { char1: '5', char2: '%' },
  { char1: '6', char2: '^' },
  { char1: '7', char2: '&' },
  { char1: '8', char2: '*' },
  { char1: '9', char2: '(' },
  { char1: '0', char2: ')' },
  { char1: '-', char2: '_' },
  { char1: '=', char2: '+' }],

  [{ char1: 'q', char2: 'Q' },
  { char1: 'w', char2: 'W' },
  { char1: 'e', char2: 'E' },
  { char1: 'r', char2: 'R' },
  { char1: 't', char2: 'T' },
  { char1: 'y', char2: 'Y' },
  { char1: 'u', char2: 'U' },
  { char1: 'i', char2: 'I' },
  { char1: 'o', char2: 'O' },
  { char1: 'p', char2: 'P' },
  { char1: '[', char2: '{' },
  { char1: ']', char2: '}' }],

  [{ char1: 'a', char2: 'A' },
  { char1: 's', char2: 'S' },
  { char1: 'd', char2: 'D' },
  { char1: 'f', char2: 'F' },
  { char1: 'g', char2: 'G' },
  { char1: 'h', char2: 'H' },
  { char1: 'j', char2: 'J' },
  { char1: 'k', char2: 'K' },
  { char1: 'l', char2: 'L' },
  { char1: ';', char2: ':' }],

  [{ char1: 'z', char2: 'Z' },
  { char1: 'x', char2: 'X' },
  { char1: 'c', char2: 'C' },
  { char1: 'v', char2: 'V' },
  { char1: 'b', char2: 'B' },
  { char1: 'n', char2: 'N' },
  { char1: 'm', char2: 'M' },
  { char1: ',', char2: '<' },
  { char1: '.', char2: '>' },
  { char1: '/', char2: '?' }]

];


function createKeyboard(containerId, charCounts, colorScale, considerUppercase, displayCharacters = true, customLayout = kbLayout) {
  const kbContainer = document.createElement('div');
  kbContainer.className = 'keyboard';
  const totalOccurrences = Object.values(charCounts).reduce((a, b) => a + b, 0);

  if (!displayCharacters) {
    let blurDivs = document.getElementsByClassName('blur-effect');

    let blurDiv = document.createElement('div');
    blurDiv.className = 'blur-effect';
    kbContainer.appendChild(blurDiv);

  }

  customLayout.forEach(row => {
    const rowDiv = document.createElement('div');
    rowDiv.className = 'keyboard-row';

    row.forEach(key => {
      const keyDiv = document.createElement('div');
      keyDiv.className = 'keyboard-key';

      const char1Div = document.createElement('div');
      char1Div.className = 'char1';
      char1Div.textContent = considerUppercase ? key.char1 : key.char1.toLowerCase();

      if (!displayCharacters) {
        char1Div.style.color = colorScale(charCounts[key.char1]);
        char1Div.classList.add('no-char');
        keyDiv.style.border = "none";
        keyDiv.style.backgroundColor = "transparent";
        keyDiv.style.borderRadius = "50%";
        kbContainer.style.gap = "0px";
        kbContainer.style.marginTop = "140px";
        rowDiv.style.gap = "0px";

      }
      keyDiv.appendChild(char1Div);

      // Add event listeners to the lowercase key
      addEventListeners(char1Div, charCounts, totalOccurrences);

      if (considerUppercase && key.char2) {
        const char2Div = document.createElement('div');
        char2Div.className = 'char2';
        char2Div.textContent = key.char2;

        if (!displayCharacters) {
          char2Div.style.color = colorScale(charCounts[key.char2.toLowerCase()]);
          char2Div.classList.add('no-char');
        }

        keyDiv.appendChild(char2Div);

        // Add event listeners to the uppercase key
        addEventListeners(char2Div, charCounts, totalOccurrences);
      }


      rowDiv.appendChild(keyDiv);
    });

    kbContainer.appendChild(rowDiv);
  });

  document.getElementById(containerId).appendChild(kbContainer);

  colorKeysByOccurrence(charCounts, kbContainer, colorScale);
}


function addEventListeners(element, charCounts, totalOccurrences) {
  element.addEventListener('mouseover', function (e) {
    const count = charCounts[element.textContent] || 0;
    const percentage = ((count / totalOccurrences) * 100).toFixed(3);
    globalTooltip.textContent = `${element.textContent}: ${percentage}%`;
    globalTooltip.style.visibility = 'visible';
    globalTooltip.style.top = `${e.pageY + 10}px`;
    globalTooltip.style.left = `${e.pageX + 10}px`;
  });

  element.addEventListener('mousemove', function (e) {
    globalTooltip.style.top = `${e.pageY + 10}px`;
    globalTooltip.style.left = `${e.pageX + 10}px`;
  });

  element.addEventListener('mouseout', function (e) {
    globalTooltip.style.visibility = 'hidden';
  });
}



function setTooltip() {
  const tooltip = document.createElement('div');
  tooltip.className = 'tooltip';
  document.body.appendChild(tooltip);
  return tooltip;
}



function getMaxOccurrence(occurrences) {
  return Math.max(...Object.values(occurrences));
}

function encodeCharForId(char) {
  return `key-${char.charCodeAt(0)}`;
}


function colorKeysByOccurrence(charCounts, kbContainer, colorScale, displayCharacters = true) {
  const maxOccurrence = getMaxOccurrence(charCounts);
  colorScale.domain([0, maxOccurrence]);

  kbContainer.querySelectorAll('.keyboard-key').forEach((keyDiv) => {
    const color = colorScale(maxOccurrence);
    keyDiv.style.backgroundColor = color;

    if (displayCharacters) {
      keyDiv.querySelectorAll('.char1, .char2').forEach((charDiv) => {
        const char = charDiv.textContent;
        const count = charCounts[char] || 0;
        const innerColor = colorScale(count);
        charDiv.style.backgroundColor = innerColor;
      });
    }
  });
}




function getBrightness(color) {
  // Extracting RGB values from the 'rgb(255, 255, 255)' format
  const rgb = color.match(/\d+/g);

  if (!rgb || rgb.length < 3) {
    console.error('Invalid RGB format', color);
    return 'black';
  }

  const r = parseInt(rgb[0], 10);
  const g = parseInt(rgb[1], 10);
  const b = parseInt(rgb[2], 10);

  // Brightness calculation using the luminance formula
  const brightness = (r * 299 + g * 587 + b * 114) / 1000;

  // Return 'black' if background is light; 'white' if dark
  return brightness > 127 ? 'black' : 'white';
}


// ---------------------------------------------------------------------------------------------

//#region  English alphabet occurrence by percentage segment

let percentageTooltip = setTooltipPercentage();

function setTooltipPercentage() {
  const tooltipPerc = document.createElement('div');
  tooltipPerc.className = 'tooltip';
  document.body.appendChild(tooltipPerc);
  return tooltipPerc;
}

function loadDataCreatePercentageKb(dataPath, containerId, colorScale) {
  d3.csv(dataPath).then(data => {
    const charPercentages = {};

    data.forEach(d => {
      const character = d.character.toLowerCase();
      const percentage = parseFloat(d.percentage);

      if (isNaN(percentage)) {
        console.error(`Invalid percentage for character '${character}'`);
        return;
      }

      charPercentages[character] = percentage;
    });

    console.log(`Character percentages for ${containerId}: `, charPercentages);

    createPercentageKeyboard(containerId, charPercentages, colorScale);
  });
}

const englishColor1 = "#dee2ff";
const englishColor2 = "#c83d0a";

const colorScaleEnglish = d3.scaleLinear()
  .domain([0, 100])
  .range([englishColor1, englishColor2]);

const englishKbLayout = [
  [{ char1: 'q' }, { char1: 'w' }, { char1: 'e' }, { char1: 'r' }, { char1: 't' }, { char1: 'y' }, { char1: 'u' }, { char1: 'i' }, { char1: 'o' }, { char1: 'p' }],
  [{ char1: 'a' }, { char1: 's' }, { char1: 'd' }, { char1: 'f' }, { char1: 'g' }, { char1: 'h' }, { char1: 'j' }, { char1: 'k' }, { char1: 'l' }],
  [{ char1: 'z' }, { char1: 'x' }, { char1: 'c' }, { char1: 'v' }, { char1: 'b' }, { char1: 'n' }, { char1: 'm' }]
];

function createPercentageKeyboard(containerId, charPercentages, colorScale) {
  const container = document.getElementById(containerId);

  if (!container) {
    console.error(`Container with ID '${containerId}' does not exist.`);
    return;
  }

  const kbContainer = document.createElement('div');
  kbContainer.className = 'keyboard';

  englishKbLayout.forEach(row => {
    const rowDiv = document.createElement('div');
    rowDiv.className = 'keyboard-row';

    row.forEach(key => {
      const keyDiv = document.createElement('div');
      keyDiv.className = 'keyboard-key';

      const charDiv = document.createElement('div');
      charDiv.className = 'char1';
      charDiv.textContent = key.char1.toLowerCase();
      keyDiv.appendChild(charDiv);

      rowDiv.appendChild(keyDiv);

      addEventListenersPercentage(charDiv, charPercentages);
    });

    kbContainer.appendChild(rowDiv);

  });

  container.appendChild(kbContainer);

  colorKeysByOccurrencePerc(charPercentages, kbContainer, colorScale);
}

function colorKeysByOccurrencePerc(charPercentages, kbContainer, colorScale) {
  const maxPercentage = Math.max(...Object.values(charPercentages));
  colorScale.domain([0, maxPercentage]);

  kbContainer.querySelectorAll('.keyboard-key').forEach(keyDiv => {
    const charDiv = keyDiv.querySelector('.char1');
    const color = colorScale(charPercentages[charDiv.textContent] || 0);
    charDiv.style.backgroundColor = color;
    charDiv.style.color = getBrightness(color);
  });
}

function addEventListenersPercentage(element, charPercentages) {
  element.addEventListener('mouseover', function (e) {
    const percentage = charPercentages[element.textContent] || 0;
    percentageTooltip.textContent = `${element.textContent}: ${percentage}%`;
    percentageTooltip.style.visibility = 'visible';
    percentageTooltip.style.top = `${e.pageY + 10}px`;
    percentageTooltip.style.left = `${e.pageX + 10}px`;
  });

  element.addEventListener('mousemove', function (e) {
    percentageTooltip.style.top = `${e.pageY + 10}px`;
    percentageTooltip.style.left = `${e.pageX + 10}px`;
  });

  element.addEventListener('mouseout', function (e) {
    percentageTooltip.style.visibility = 'hidden';
  });
}


loadDataCreatePercentageKb("assets/english-letter-frequency.csv", 'kbEnglish', colorScaleEnglish);

//#endregion


//-------------------------------------------------------------------------------
//#region FORM SUBMISSION SEGMENT

document.getElementById("form-test").addEventListener("submit", function (event) {
  event.preventDefault(); // Prevent form from refreshing the page
  const textInput = document.getElementById("input-text").value;
  processUserText(textInput);
});

function processUserText(text) {
  const words = text.split(/\s+/);
  const charCounts = countAllOccurrencesCaseInsensitive(words);
  // console.log("Character counts for user input:", charCounts);

  const userCharPercentages = getCharPercentages(charCounts);
  const similarityPercentage = calculateSimilarity(userCharPercentages, englishCharPercentages);
  displayUserResult(similarityPercentage, charCounts);

}
//#endregion

// #region FORM RESULT ____________________________________________________________________
function getCharPercentages(charCounts) {
  const totalOccurrences = Object.values(charCounts).reduce((sum, count) => sum + count, 0);

  const charPercentages = {};
  Object.entries(charCounts).forEach(([char, count]) => {
    charPercentages[char.toLowerCase()] = ((count / totalOccurrences) * 100).toFixed(2);
  });

  return charPercentages;
}

const userCharPercentages = getCharPercentages(countAllOccurrencesCaseInsensitive(["user", "input", "example"]));

const englishCharPercentages = {
  'a': 8.17,
  'b': 1.49,
  'c': 2.78,
  'd': 4.25,
  'e': 12.70,
  'f': 2.23,
  'g': 2.02,
  'h': 6.09,
  'i': 6.97,
  'j': 0.15,
  'k': 0.77,
  'l': 4.03,
  'm': 2.41,
  'n': 6.75,
  'o': 7.51,
  'p': 1.93,
  'q': 0.10,
  'r': 5.99,
  's': 6.33,
  't': 9.06,
  'u': 2.76,
  'v': 0.98,
  'w': 2.36,
  'x': 0.15,
  'y': 1.97,
  'z': 0.07
};

function calculateSimilarity(userPercentages, englishPercentages) {
  const userVector = createVector(userPercentages);
  const englishVector = createVector(englishPercentages);

  const similarity = cosineSimilarity(userVector, englishVector);
  const similarityPercentage = (similarity * 100).toFixed(2); // Convert to percentage
  return similarityPercentage;
}

function createVector(charPercentages) {
  const referenceCharacters = ["a", "b", "c", "d", "e", "f", "g", "h", "i", "j", "k", "l", "m", "n", "o", "p", "q", "r", "s", "t", "u", "v", "w", "x", "y", "z"];

  return referenceCharacters.map(char => charPercentages[char.toLowerCase()] || 0); // Create vector from object
}


function cosineSimilarity(vector1, vector2) {
  const dotProduct = vector1.reduce((sum, v1, index) => sum + (v1 * vector2[index]), 0);
  const magnitude1 = Math.sqrt(vector1.reduce((sum, v) => sum + (v * v), 0));
  const magnitude2 = Math.sqrt(vector2.reduce((sum, v) => sum + (v * v), 0));

  if (magnitude1 === 0 || magnitude2 === 0) {
    return 0; // Avoid division by zero
  }

  return dotProduct / (magnitude1 * magnitude2); // Cosine similarity
}



const similarityPercentage = calculateSimilarity(userCharPercentages, englishCharPercentages);


function displayUserResult(similarityPercentage, charCounts) {
  //keyboard
  const kbContainer = document.getElementById("kbEnglishTest");
  const existingKeyboard = kbContainer.querySelector(".keyboard");
  if (existingKeyboard) {
    kbContainer.removeChild(existingKeyboard);
  }

  const colorScaleUserEnglish = d3.scaleLinear()
    .domain([0, 100])
    .range([englishColor1, englishColor2]); // gotta be hex
  createKeyboard("kbEnglishTest", charCounts, colorScaleUserEnglish, false, englishKbLayout);

  //text
  const resultContainer = document.getElementById("test-result-container");
  const numberElement = document.getElementById("result-number");
  numberElement.innerHTML = `${similarityPercentage}%`;
  resultContainer.style.display = "block";

}

//#endregion

// #region HEATMAP 00 - NO GRADIENTS
// function createHeatmap(containerId, charCounts) {
//   const container = document.getElementById(containerId);

//   if (!container) {
//     console.error(`Container with ID '${containerId}' does not exist`);
//     return;
//   }

//   container.innerHTML = "";

//   const svg = d3.select(container).append("svg")
//     .attr("width", 600)
//     .attr("height", 200);

//   return svg;

// }

// function createHeatmapGradient(svg, charCounts) {
//   const colorScale = d3.scaleSequential(d3.interpolateInferno) 
//     .domain([0, getMaxOccurrence(charCounts)]); 

//   const keyWidth = 50; 
//   const keyHeight = 50; 
//   const margin = 10; 

//   const layout = [
//     ["q", "w", "e", "r", "t", "y", "u", "i", "o", "p"],
//     ["a", "s", "d", "f", "g", "h", "j", "k", "l"],
//     ["z", "x", "c", "v", "b", "n", "m"]
//   ];

//   layout.forEach((row, rowIndex) => {
//     row.forEach((char, colIndex) => {
//       const x = colIndex * (keyWidth + margin); // Horizontal position
//       const y = rowIndex * (keyHeight + margin); // Vertical position

//       const occurrence = charCounts[char.toLowerCase()] || 0;
//       const color = colorScale(occurrence);

//       svg.append("rect") // Add rectangles for heatmap
//         .attr("x", x + margin) // Centered with margin
//         .attr("y", y + margin) // Centered with margin
//         .attr("width", keyWidth)
//         .attr("height", keyHeight)
//         .attr("fill", color); // Use the smooth gradient color
//     });
//   });
// }
// #endregion

// #region HEATMAP 01 - BASED ON D3-CONTOUR PLUGIN

function loadDataForHeatmap(dataPath, callback) {
  d3.csv(dataPath).then(data => {
    const charCounts = {};

    data.forEach(row => {
      const word = row.string ? row.string.toLowerCase() : ""; // Handle undefined strings
      if (word) {
        for (const char of word) {
          if (char.trim()) { // Ignore spaces or empty chars
            charCounts[char] = (charCounts[char] || 0) + 1;
          }
        }
      }
    });

    console.log("Character counts for heatmap:", JSON.stringify(charCounts, null, 2));

    if (callback) {
      callback(charCounts);
    }
  });
}


function createHeatmapFromData(dataPath, containerId) {
  loadDataForHeatmap(dataPath, charCounts => {


    const svg = createDensityHeatmap(containerId, charCounts);

    const layout = [
      [{ char1: 'q' }, { char1: 'w' }, { char1: 'e' }, { char1: 'r' }, { char1: 't' }, { char1: 'y' }, { char1: 'u' }, { char1: 'i' }, { char1: 'o' }, { char1: 'p' }],
      [{ char1: 'a' }, { char1: 's' }, { char1: 'd' }, { char1: 'f' }, { char1: 'g' }, { char1: 'h' }, { char1: 'j' }, { char1: 'k' }, { char1: 'l' }],
      [{ char1: 'z' }, { char1: 'x' }, { char1: 'c' }, { char1: 'v' }, { char1: 'b' }, { char1: 'n' }, { char1: 'm' }]
    ];

    const { densityData, colorScale } = generateDensityData(charCounts, layout); // Generate density data
    if (!densityData) {
      console.error("Density data is undefined");
    }
    displayDensityHeatmap(svg, densityData, colorScale); // Display the heatmap with the processed data
  });
}



function createDensityHeatmap(containerId, charCounts) {
  const container = document.getElementById(containerId);

  if (!container) {
    console.error(`Container with ID '${containerId}' does not exist.`);
    return;
  }

  container.innerHTML = "";
  const svgWidth = 600;
  const svgHeight = 200;

  const svg = d3.select(container).append("svg")
    .attr("width", svgWidth)
    .attr("height", svgHeight)
    .append("g")
    .attr("transform", `translate(${10}, ${10})`); // Adjust margin and alignment

  return svg;
}

function generateDensityData(charCounts, layout) {
  const width = 600;
  const height = 200;

  const x = d3.scaleLinear().domain([0, layout[0].length]).range([0, width]);
  const y = d3.scaleLinear().domain([0, layout.length]).range([height, 0]);

  // const colorScale = d3.scaleLinear().domain([0, getMaxOccurrence(charCounts)]).range(["red", "#69b3a2"]); 

  const colorScale = d3.scaleSequential(d3.interpolateOrRd)
    .domain([0, getMaxOccurrence(charCounts)]);

  /*
  const sqrtScalePwAll = d3.scaleSqrt()
  .domain([1, 100]) //max domain is calculated and changed later!
  .range([1, 30]);

const colorScalePwAll = d3.scaleSequential(d3.interpolateOrRd)
  .domain([1, 100]);
  */

  const densityData = d3.contourDensity()
    .x((d) => x(d.x))
    .y((d) => y(d.y))
    .size([width, height])
    .bandwidth(20);

  const points = [];
  layout.forEach((row, rowIndex) => {
    row.forEach((key, colIndex) => {
      if (!key || !key.char1) {
        console.error(`Key or char1 is undefined in row ${rowIndex}, column ${colIndex}`);
        return; // Skip if key or char1 is undefined
      }

      const char = key.char1.toLowerCase();
      const occurrence = charCounts[char] || 0;

      for (let i = 0; i < occurrence; i++) {
        points.push({ x: colIndex, y: rowIndex }); // Add points based on key positions
      }
    });
  });

  return { densityData: densityData(points), colorScale };
}


function displayDensityHeatmap(svg, densityData, colorScale) {
  svg.insert("g", "g")
    .selectAll("path")
    .data(densityData)
    .enter().append("path")
    .attr("d", d3.geoPath())
    .attr("fill", (d) => colorScale(d.value));
}

function createKeyboardHeatmap(containerId, charCounts) {
  const svg = createDensityHeatmap(containerId, charCounts);

  const { densityData, colorScale } = generateDensityData(charCounts, layout);
  displayDensityHeatmap(svg, densityData, colorScale);
}


//#endregion