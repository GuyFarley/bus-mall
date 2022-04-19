'use strict';

// **************************** GLOBAL VARIABLES ****************************

let totalRounds = 25;
let productArray = [];


// **************************** DOM REFERENCES ****************************

let imgContainer = document.getElementById('container');
let imgOne = document.getElementById('image-one');
let imgTwo = document.getElementById('image-two');
let imgThree = document.getElementById('image-three');

let resultsList = document.getElementById('display-results');
let resultsBtn = document.getElementById('show-results-btn');


// **************************** CONSTRUCTOR ****************************

function Product(name, fileExtensions = 'jpg') {
  this.productName = name;
  this.img = `img/${name}.${fileExtensions}`;
  this.clicks = 0;
  this.views = 0;

  productArray.push(this);
}

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

console.log(productArray);

// **************************** EXECUTABLE CODE - HELPER FUNCTIONS ****************************

function renderImages() {

  let productOneIndex = getRandomIndex();
  let productTwoIndex = getRandomIndex();
  let productThreeIndex = getRandomIndex();

  while (productOneIndex === productTwoIndex || productOneIndex === productThreeIndex || productTwoIndex === productThreeIndex) {
    productTwoIndex = getRandomIndex();
    productThreeIndex = getRandomIndex();
  }

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
  }

  renderImages();
}

function handleShowResults() {
  if (totalRounds === 0) {
    for (let i = 0; i < productArray.length; i++) {
      let liElem = document.createElement('li');
      liElem.textContent = `${productArray[i].productName} was shown ${productArray[i].views} times and was chosen ${productArray[i].clicks} times.`;
      resultsList.appendChild(liElem);
    }
  }
}

// **************************** EVENT LISTENERS ****************************

imgContainer.addEventListener('click', handleClick);
resultsBtn.addEventListener('click', handleShowResults);


