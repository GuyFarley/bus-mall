'use strict';

// **************************** GLOBAL VARIABLES ****************************

let totalRounds = 10;
let productArray = [];


// **************************** DOM REFERENCES ****************************

let imgContainer = document.getElementById('container');
let imgOne = document.getElementById('image-one');
let imgTwo = document.getElementById('image-two');
let imgThree = document.getElementById('image-three');

// let resultsList = document.getElementById('display-results');
// let resultsBtn = document.getElementById('show-results-btn');

// **************************** CANVAS REFERENCE ****************************


let ctx = document.getElementById('myChart');


// **************************** LOCAL STORAGE ****************************

let retrievedProducts = localStorage.getItem('products'); // Gets product data out of local storage

let parsedProducts = JSON.parse(retrievedProducts); // Parses data from local storage for use in code


// **************************** CONSTRUCTOR ****************************

function Product(name, fileExtensions = 'jpg') {
  this.productName = name;
  this.img = `img/${name}.${fileExtensions}`;
  this.clicks = 0;
  this.views = 0;

  productArray.push(this);
}



if (retrievedProducts) {
  productArray = parsedProducts; // sets new value of productArray to data retrieved from local storage (parsedProducts)
} else {
  // new instances of Product object
  new Product('bag');
  new Product('banana');
  new Product('bathroom');
  new Product('boots');
  new Product('breakfast');
  new Product('bubblegum');
  new Product('chair');
  new Product('cthulhu');
  new Product('dog-duck');
  new Product('dragon');
  new Product('pen');
  new Product('pet-sweep');
  new Product('scissors');
  new Product('shark');
  new Product('sweep', 'png');
  new Product('tauntaun');
  new Product('unicorn');
  new Product('water-can');
  new Product('wine-glass');

}

console.log(productArray);

// **************************** EXECUTABLE CODE - HELPER FUNCTIONS ****************************

let indexArray = [];

function renderImages() {

  while (indexArray.length < 6) {
    let randomNumber = getRandomIndex();
    if (!indexArray.includes(randomNumber)) {
      indexArray.push(randomNumber);
    }
  }

  console.log(indexArray);

  let productOneIndex = indexArray.shift();
  let productTwoIndex = indexArray.shift();
  let productThreeIndex = indexArray.shift();

  // change img src and alt for each img tag in HTML
  imgOne.src = productArray[productOneIndex].img;
  imgOne.alt = productArray[productOneIndex].productName;
  productArray[productOneIndex].views++;

  imgTwo.src = productArray[productTwoIndex].img;
  imgTwo.alt = productArray[productTwoIndex].productName;
  productArray[productTwoIndex].views++;

  imgThree.src = productArray[productThreeIndex].img;
  imgThree.alt = productArray[productThreeIndex].productName;
  productArray[productThreeIndex].views++;


}
renderImages();

function getRandomIndex() {
  // sourced from Audrey Patterson & W3Schools
  return Math.floor(Math.random() * productArray.length);
}

// **************************** EVENT HANDLERS ****************************

function handleClick(event) {
  let imgClicked = event.target.alt;

  for (let i = 0; i < productArray.length; i++) {
    if (imgClicked === productArray[i].productName) {
      productArray[i].clicks++;
    }
  }

  totalRounds--;

  if (totalRounds === 0) {
    imgContainer.removeEventListener('click', handleClick);
    renderProductChart(); // renders chart once all voting rounds are complete

    let stringifiedProducts = JSON.stringify(productArray); // 1. Stringifies productArray for local storage

    localStorage.setItem('products', stringifiedProducts); // 2. Sets stringified productArray into local storage
  }

  renderImages();
}


// **************************** CREATE CHART ****************************

function renderProductChart() {

  let productNames = [];
  let productVotes = [];
  let productViews = [];

  for (let i = 0; i < productArray.length; i++) {
    productNames.push(productArray[i].productName);
    productViews.push(productArray[i].views);
    productVotes.push(productArray[i].clicks);
  }


  let myChartObj = {
    type: 'bar',
    data: {
      labels: productNames, // product names
      datasets: [{
        label: '# of Votes', // # votes
        data: productVotes, // actual votes
        backgroundColor: [
          'blue'
        ],
        borderColor: [
          'blue'
        ],
        borderWidth: 1
      },
      {
        label: '# of Views', // # views
        data: productViews, // actual views
        backgroundColor: [
          'green'
        ],
        borderColor: [
          'green'
        ],
        borderWidth: 1
      }]
    },
    options: {
      scales: {
        y: {
          beginAtZero: true
        }
      }
    }
  };

  new Chart(ctx, myChartObj);

}

// function handleShowResults() {
//   if (totalRounds === 0) {
//     for (let i = 0; i < productArray.length; i++) {
//       let liElem = document.createElement('li');
//       liElem.textContent = `${productArray[i].productName} was shown ${productArray[i].views} times and was chosen ${productArray[i].clicks} times.`;
//       resultsList.appendChild(liElem);
//     }
//   }
// }

// **************************** EVENT LISTENERS ****************************

imgContainer.addEventListener('click', handleClick);
// resultsBtn.addEventListener('click', handleShowResults);


