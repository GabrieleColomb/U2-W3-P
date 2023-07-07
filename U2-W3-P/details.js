const url = "https://striveschool-api.herokuapp.com/api/product/"
const addressBarContent = new URLSearchParams(location.search)
const productID = addressBarContent.get("id")

fetch(url + productID, {
  headers: {
    Authorization:
      "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NGE3ZmQwMTEyYjUwYzAwMTQ5ZTU0ZWMiLCJpYXQiOjE2ODg3MzE3NDUsImV4cCI6MTY4OTk0MTM0NX0.1GG214GMKiSfzySK5PbOOLicN7_-2jOCYJccy_RQS8s",
  },
})
  .then((res) => {
    if (res.ok) {
      return res.json()
    } else {
      throw new Error("Errore nel recupero dei dettagli del videogioco")
    }
  })
  .then((detail) => {
    const spinnerContainer = document.getElementById("spinner-container")
    spinnerContainer.classList.add("d-none")
    let newCol = document.createElement("div")
    newCol.classList.add("col", "col-12", "col-sm-6", "text-center")
    newCol.innerHTML = `
          <div class="card shadow">
              <img
                src="${detail.imageUrl}"
                class="card-img-top"
                alt="product image"
                height="250px"
                style="object-fit:cover"
              />
              <div class="card-body ">
                <h5 class="card-title">${detail.name}</h5>
                <p class="card-text">
                  ${detail.description}
                </p>
                <p class="card-text">
                  ${detail.brand}
                </p>
                <p class="card-text fw-bold">
                  ${detail.price}€
                </p>
              </div>
            </div>
        `
    const productRow = document.getElementById("products-row")
    productRow.appendChild(newCol)
  })
  .catch((err) => {
    console.log(err)
  })