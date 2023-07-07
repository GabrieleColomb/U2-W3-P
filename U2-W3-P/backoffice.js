const url = "https://striveschool-api.herokuapp.com/api/product/"
const addressBarContent = new URLSearchParams(location.search)
const productID = addressBarContent.get("id")

const nameInput = document.getElementById("product-name")
const descriptionInput = document.getElementById("product-description")
const brandInput = document.getElementById("product-brand")
const imgUrlInput = document.getElementById("product-img")
const priceInput = document.getElementById("product-price")
/*
const resetButton = document.getElementById("reset-yes")
resetButton.addEventListener("click", function () {
  console.log("game")
  nameInput.value = ""
  descriptionInput.value = ""
  brandInput.value = ""
  imgUrlInput.value = ""
  priceInput.value = ""
})*/

nameInput.style.color = "limegreen"
descriptionInput.style.color = "limegreen"
brandInput.style.color = "limegreen"
imgUrlInput.style.color = "limegreen"
priceInput.style.color = "limegreen"

if (productID) {
  document.querySelector("#saveBtn").innerText = "Edit"
  document.querySelector("h1").innerText = "EpicGaming"
  resetButton.classList.add("d-none")

  fetch(url + productID, {
    headers: {
      Authorization:
        "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NGE3ZmQwMTEyYjUwYzAwMTQ5ZTU0ZWMiLCJpYXQiOjE2ODg3MzE3NDUsImV4cCI6MTY4OTk0MTM0NX0.1GG214GMKiSfzySK5PbOOLicN7_-2jOCYJccy_RQS8s",
      "Content-Type": "application/json",
    },
  })
    .then((res) => {
      if (res.ok) {
        return res.json()
      } else {
        throw new Error("Errore nel recupero dei dettagli del videogioco")
      }
    })
    .then((edit) => {
      const nameInput = document.getElementById("product-name")
      const descriptionInput = document.getElementById("product-description")
      const brandInput = document.getElementById("product-brand")
      const imgUrlInput = document.getElementById("product-img")
      const priceInput = document.getElementById("product-price")

      nameInput.value = edit.name
      descriptionInput.value = edit.description
      brandInput.value = edit.brand
      imgUrlInput.value = edit.imageUrl
      priceInput.value = edit.price
    })
    .catch((err) => console.log(err))

  let deleteButton = document.createElement("button")
  deleteButton.classList.add("btn", "btn-outline-dark")
  deleteButton.setAttribute("id", "deleteBtn")
  deleteButton.setAttribute("data-bs-toggle", "modal")
  deleteButton.setAttribute("data-bs-target", "#deleteModal")
  deleteButton.innerText("Delete")
  let deleteDiv = document.getElementById("delete-btn-div")
  deleteDiv.appendChild(deleteButton)
  let deleteButtonModal = document.getElementById("delete-yes")
  deleteButtonModal.addEventListener("click", function () {
    fetch(url + productID, {
      method: "DELETE",
      headers: {
        Authorization:
          "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NGE3ZmQwMTEyYjUwYzAwMTQ5ZTU0ZWMiLCJpYXQiOjE2ODg3MzE3NDUsImV4cCI6MTY4OTk0MTM0NX0.1GG214GMKiSfzySK5PbOOLicN7_-2jOCYJccy_RQS8s",
      },
    })
      .then((res) => {
        if (res.ok) {
        } else {
          throw new Error("Problema eliminazione del videogioco")
        }
      })
      .then((products) => {
        const nameInput = document.getElementById("product-name")
        const descriptionInput = document.getElementById("product-description")
        const brandInput = document.getElementById("product-brand")
        const imgUrlInput = document.getElementById("product-img")
        const priceInput = document.getElementById("product-price")

        nameInput.value = ""
        descriptionInput.value = ""
        brandInput.value = ""
        imgUrlInput.value = ""
        priceInput.value = ""
      })
      .catch((err) => {
        console.log(err)
      })
  })
}

const productForm = document.getElementById("product-form")
productForm.addEventListener("submit", function (e) {
  e.preventDefault()
  const newProduct = {
    name: nameInput.value,
    description: descriptionInput.value,
    brand: brandInput.value,
    imageUrl: imgUrlInput.value,
    price: priceInput.value,
  }

  console.log(newProduct)

  let urlToUse = productID ? url + productID : url

  let methodToUse = productID ? "PUT" : "POST"

  fetch(urlToUse, {
    method: methodToUse,
    body: JSON.stringify(newProduct),
    headers: {
      Authorization:
        "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NGE3ZmQwMTEyYjUwYzAwMTQ5ZTU0ZWMiLCJpYXQiOjE2ODg3MzE3NDUsImV4cCI6MTY4OTk0MTM0NX0.1GG214GMKiSfzySK5PbOOLicN7_-2jOCYJccy_RQS8s",
      "Content-Type": "application/json",
    },
  })
    .then((res) => {
      if (res.ok) {
        nameInput.value = ""
        descriptionInput.value = ""
        brandInput.value = ""
        imgUrlInput.value = ""
        priceInput.value = ""
        location.assign("index.html")
      } else {
        throw new Error("Errore nel salvataggio del videogioco")
      }
    })
    .then((products) => {
      console.log(products)
    })
    .catch((err) => {
      console.log(err)
    })
})
