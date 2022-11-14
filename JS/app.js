import { initializeApp } from "https://www.gstatic.com/firebasejs/9.4.0/firebase-app.js";
import {
  getFirestore,
  doc,
  getDoc,
  setDoc,
  collection,
  addDoc,
  updateDoc,
  deleteDoc,
  deleteField,
} from "https://www.gstatic.com/firebasejs/9.4.0/firebase-firestore.js";

const firebaseConfig = {
  apiKey: "AIzaSyC97FIfRYf_6zUgWXRaooi5NZHZnEi3VLA",
  authDomain: "cgl-forms.firebaseapp.com",
  databaseURL: "https://cgl-forms-default-rtdb.firebaseio.com",
  projectId: "cgl-forms",
  storageBucket: "cgl-forms.appspot.com",
  messagingSenderId: "1008506608692",
  appId: "1:1008506608692:web:47818afefcc2935608be61",
};

// Initialize Firebase

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

  let inputs = document.querySelectorAll(".dimensions-input");
  let skidTypes = document.querySelectorAll(".skid-type");

  saveInputs(inputs, skidTypes);
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

    let inputs = document.querySelectorAll(".dimensions-input");
    let skidTypes = document.querySelectorAll(".skid-type");
    saveInputs(inputs, skidTypes);
  });
}

// need to find a way to run this function right before user hits submit
// update model dynamically?
function saveInputs(inputs, skidTypes) {
  let skidTypeArr = [];
  let inputArr = [];
  skidTypes.forEach((type) => {
    skidTypeArr.push(type);

    inputs.forEach((input) => {
      if (input.dataset.count === type.dataset.count) {
        input.addEventListener("change", () => {
          inputArr.push({
            inputDimension: input.placeholder,
            value: input.value,
            index: input.dataset.count,
          });
          // if ((input.dataset.count + 1) % 3 === 0) {
          //   console.log(input);
          // }
        });
      }
    });
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
async function addDocument_AutoID(inputValue, skidType) {
  var ref = collection(db, "quotes");

  const docRef = await addDoc(ref, {
    amount: 789,
    details: "Some details about the new doc",
    anotherField: "another field",
    // needs to be structured something like this
    skidType: { skidType: { skidType, inputValue } },
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
  let arrSkidType = { type: [], inputs: [] };
  inputs.forEach((input) => {
    skidTypes.forEach((type) => {
      if (input.dataset.count === type.dataset.count) {
        arrSkidType.type.push(type.value);
        arrSkidType.inputs.push(input.value);
      }
    });
  });

  addDocument_AutoID(arrInput, arrSkidType);
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
// };

// navSlide();
