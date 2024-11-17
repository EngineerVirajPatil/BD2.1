const express = require('express');
const { resolve } = require('path');

const app = express();
const port = 3000;

let person = {
  firstName: 'Anil',
  lastName: 'Sharma',
  gender: 'male',
  age: 30,
  isMember: true,
};

app.use(express.static('static'));

app.get('/person', (req, res) => {
  res.json(person);
});

function getFullName(person) {
  return person.firstName + ' ' + person.lastName;
}

app.get('/person/fullname', (req, res) => {
  let fullname = getFullName(person);
  res.json({ fullName: fullname });
});

function getFirstNameAndGender(person) {
  return {
    firstname: person.firstName,
    gender: person.gender,
  };
}

app.get('/person/firstname-gender', (req, res) => {
  let firstNameAndGender = getFirstNameAndGender(person);
  res.json(firstNameAndGender);
});

function getIncrementedAge(person) {
  person.age = person.age + 1;
  return person;
}

app.get('/person/increment-age', (req, res) => {
  let updatedObject = getIncrementedAge(person);
  res.json(updatedObject);
});

function getFullnameAndMembership(person) {
  return {
    fullName: getFullName(person),
    isMember: person.isMember,
  };
}

app.get('/person/fullname-membership', (req, res) => {
  let fullNameAndMembership = getFullnameAndMembership(person);
  res.json(fullNameAndMembership);
});

function getFinalPrice(cartTotal, isMember) {
  let finalPrice;
  if (isMember === true) {
    finalPrice = cartTotal - (cartTotal * 10) / 100;
  } else {
    finalPrice = cartTotal;
  }
  return finalPrice;
}

app.get('/person/final-price', (req, res) => {
  let cartTotal = parseFloat(req.query.cartTotal);
  let finalPrice = getFinalPrice(cartTotal, person.isMember);
  res.json({ finalPrice: finalPrice });
});

function calculateShippingCost(cartTotal, isMember) {
  let finalShippingCost;
  if (cartTotal > 500 && isMember === true) {
    finalShippingCost = 0;
  } else {
    finalShippingCost = 99;
  }
  return finalShippingCost;
}

app.get('/person/shipping-cost', (req, res) => {
  let cartTotal = parseFloat(req.query.cartTotal);
  let shippingCost = calculateShippingCost(cartTotal, person.isMember);
  res.json({ shippingCost: shippingCost.toFixed(2) });
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
