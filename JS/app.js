import { initializeApp } from "https://www.gstatic.com/firebasejs/9.4.0/firebase-app.js";
import {
  getFirestore,
  collection,
  addDoc,
} from "https://www.gstatic.com/firebasejs/9.4.0/firebase-firestore.js";

import {
  API_KEY,
  AUTH_DOMAIN,
  DB_URL,
  PROJECT_ID,
  STORAGE_BUCKET,
  MSG_SENDER_ID,
  APP_ID,
} from "./test.js";

const firebaseConfig = {
  apiKey: API_KEY,
  authDomain: AUTH_DOMAIN,
  databaseURL: DB_URL,
  projectId: PROJECT_ID,
  storageBucket: STORAGE_BUCKET,
  messagingSenderId: MSG_SENDER_ID,
  appId: APP_ID,
};

const app = initializeApp(firebaseConfig);
let db = getFirestore(app);

const fullName = document.getElementById("fullName");
const companyName = document.getElementById("companyName");
const pickupInfo = document.getElementById("pickupInfo");
const shippingInfo = document.getElementById("shippingInfo");

const numSkids = document.querySelector(".number-skids");
const skidDimensions = document.querySelector(".skid-dimensions");
const skidTypeWrapper = document.querySelector(".skid-type-wrapper");

const submitBtn = document.querySelector(".submit-btn");

window.addEventListener("DOMContentLoaded", () => {
  let templateSkidTypes = `<input type="text" placeholder="Type: (Skid, Carton, Tube etc)" data-count="0" class="skid-type"><br>
                          <input type="text" placeholder="Type: (Skid, Carton, Tube etc)" data-count="1" class="skid-type"><br>
                          <input type="text" placeholder="Type: (Skid, Carton, Tube etc)" data-count="2" class="skid-type">`;

  let templateSkidDimensions = `<div class="dimensions-wrapper">
                                <input type="text" placeholder="Length" class="dimensions-input length" data-count="0">
                                <input type="text" placeholder="Width" class="dimensions-input width" data-count="0">
                                <input type="text" placeholder="Height" class="dimensions-input height" data-count="0">
                              </div>
                              <div class="dimensions-wrapper">
                                <input type="text" placeholder="Length" class="dimensions-input length" data-count="1">
                                <input type="text" placeholder="Width" class="dimensions-input width" data-count="1">
                                <input type="text" placeholder="Height" class="dimensions-input height" data-count="1">
                              </div>
                              <div class="dimensions-wrapper">
                                <input type="text" placeholder="Length" class="dimensions-input length" data-count="2">
                                <input type="text" placeholder="Width" class="dimensions-input width" data-count="2">
                                <input type="text" placeholder="Height" class="dimensions-input height" data-count="2">
                              </div>`;

  skidTypeWrapper.insertAdjacentHTML("afterbegin", templateSkidTypes);
  skidDimensions.insertAdjacentHTML("afterbegin", templateSkidDimensions);

  displaySkidInputs();
});

function displaySkidInputs() {
  numSkids.addEventListener("input", () => {
    skidTypeWrapper.innerHTML = "";
    skidDimensions.innerHTML = "";
    for (let i = 0; i < numSkids.value; i++) {
      let templateSkidTypes = `<input type="text" placeholder="Type: (Skid, Carton, Tube etc)" data-count="${i}" class="skid-type">`;
      let templateSkidDimensions = `<div class="dimensions-wrapper">
                                  <input type="text" placeholder="Length" class="dimensions-input length" data-count="${i}">
                                  <input type="text" placeholder="Width" class="dimensions-input width" data-count="${i}">
                                  <input type="text" placeholder="Height" class="dimensions-input height" data-count="${i}">
                                </div>`;
      skidTypeWrapper.insertAdjacentHTML("beforeend", templateSkidTypes);
      skidDimensions.insertAdjacentHTML("beforeend", templateSkidDimensions);
    }
  });
}

const numPieces = document.querySelector(".number-pieces");
const shipmentServiceType = document.querySelector(".shipment-service-type");
const hsCodes = document.querySelector(".hs-codes");
const weight = document.querySelector(".weight");
const weightUnits = document.querySelector(".weight-units");
const hazardous = document.querySelector(".hazardous");
const checkbox = document.querySelector(".checkbox");

// where the submission actually gets saved to firestore
async function addDocument_AutoID(inputs) {
  var ref = collection(db, "quotes");

  const docRef = await addDoc(ref, {
    amount: 789,
    details: "Some details about the new doc",
    anotherField: "another field",
    // needs to be structured something like this
    skid: inputs,
  })
    // will need to display message in the DOM
    .then(() => {
      alert("Data added successfully");
    })
    .catch((error) => {
      alert("Unsuccessful operation, error:" + error);
    });
}

// This is passable
submitBtn.addEventListener("click", (e) => {
  e.preventDefault();

  let inputs = document.querySelectorAll(".dimensions-input");
  let skidTypes = document.querySelectorAll(".skid-type");

  let arrInput = [];
  inputs.forEach((input) => {
    skidTypes.forEach((type, i) => {
      if (input.dataset.count === type.dataset.count) {
        arrInput.push(
          `${type.value} ${i} - ${input.placeholder}: ${input.value}`
        );
      }
    });
  });

  addDocument_AutoID(arrInput);
});

// const navSlide = () => {
const burger = document.querySelector(".burger");
const nav = document.querySelector(".nav-links");
const navLinks = document.querySelectorAll(".nav__link");

burger.addEventListener("click", () => {
  nav.classList.toggle("nav-active");

  console.log("clicked");
  navLinks.forEach((link, index) => {
    if (link.style.animation) {
      link.style.animation = "";
    } else {
      link.style.animation = `navLinkFade 0.5s ease forwards ${index / 7}s`;
    }
  });
  // Burger animation
  burger.classList.toggle("toggle");
});
