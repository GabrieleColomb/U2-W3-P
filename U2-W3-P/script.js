const url = "https://striveschool-api.herokuapp.com/api/product/"
const getProducts = function () {
  fetch(url, {
    headers: {
      Authorization:
      "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NGE3ZmQwMTEyYjUwYzAwMTQ5ZTU0ZWMiLCJpYXQiOjE2ODg3MzE3NDUsImV4cCI6MTY4OTk0MTM0NX0.1GG214GMKiSfzySK5PbOOLicN7_-2jOCYJccy_RQS8s",
    },
  })
    .then((res) => {
      console.log(res)
      if (res.ok) {
        return res.json()
      } else {
        throw new Error("Errore nella chiamata")
      }
    })
    .then((products) => {
      console.log(products)
      const spinnerContainer = document.getElementById("spinner-container")
      spinnerContainer.classList.add("d-none")
      products.forEach((product) => {
        let newCol = document.createElement("div")
        newCol.classList.add("col", "col-12", "col-md-6", "col-lg-4")
        newCol.innerHTML = `
        <div class="card shadow">
        <img src="${product.imageUrl}" class="card-img-top" alt="product image" height="250px" style="object-fit:cover" />
        <div class="card-body bg-white">
          <h5 class="card-title">${product.name}</h5>
          <p class="card-text">
            ${product.description}
          </p>
          <p class="card-text">
            ${product.brand}
          </p>
          <p class="card-text fw-bold">
            ${product.price}€
          </p>
          <a href="./details.html?id=${product._id}" class="btn btn-success">Read more</a>
          <a href="./backoffice.html?id=${product._id}" class="btn btn-warning">Edit</a>
        </div>
      </div>
        `
        const productRow = document.getElementById("product-row")
        productRow.appendChild(newCol)
      })
    })
    .catch((err) => {
      console.log(err)
    })
}

getProducts()