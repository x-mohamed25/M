let title = document.getElementById("title");
let price = document.getElementById("price");
let taxes = document.getElementById("taxes");
let ads = document.getElementById("ads");
let discount = document.getElementById("discount");
let total = document.getElementById("total");
let count = document.getElementById("count");
let category = document.getElementById("category");
let submit = document.getElementById("submet");
let search = document.getElementById("search");
let tbody = document.getElementById("tbody");
let salary = document.getElementById("salary");

let mood = "create";
let tmp;

function gettottle() {
  if (price.value !== "") {
    let result =
      +price.value + (+taxes.value || 0) + (+ads.value || 0) - (+discount.value || 0);
    total.innerHTML = result.toFixed(2);
    total.style.background = "green";
  } else {
    total.innerHTML = "";
    total.style.background = "#a00d02";
  }
}

function clearFields() {
  title.value = "";
  price.value = "";
  taxes.value = "";
  ads.value = "";
  discount.value = "";
  total.innerHTML = "";
  count.value = "";
  category.value = "";
}

let localProducts = [];

submit.onclick = function () {
  let now = new Date().toLocaleString();
  let product = {
    title: title.value.trim(),
    price: +price.value,
    taxes: +taxes.value || 0,
    ads: +ads.value || 0,
    discount: +discount.value || 0,
    total: (+price.value + +taxes.value + +ads.value) - +discount.value,
    count: +count.value || 1,
    category: category.value.trim(),
    date: now
  };

  if (!product.title || !product.price || !product.category) {
    alert("Please fill all required fields");
    return;
  }

  if (product.count > 100) {
    alert("Count can't exceed 100");
    return;
  }

  if (mood === "create") {
    for (let i = 0; i < product.count; i++) {
      localProducts.push({ ...product });
    }
  } else if (mood === "update") {
    localProducts[tmp] = product;
    mood = "create";
    submit.textContent = "CREATE";
    count.style.display = "inline-block";
    tmp = null;
  }

  clearFields();
  displayProducts();
};

function displayProducts() {
  let table = "";
  let totalSales = 0;
  localProducts.forEach((data, index) => {
    table += `
      <tr>
        <td>${index + 1}</td>
        <td>${data.title}</td>
        <td>${data.price}</td>
        <td>${data.taxes}</td>
        <td>${data.ads}</td>
        <td>${data.discount}</td>
        <td>${data.total.toFixed(2)}</td>
        <td>${data.category}</td>
        <td>${data.date}</td>
        <td><button onclick="updateProduct(${index})">Update</button></td>
        <td><button onclick="deleteProduct(${index})">Delete</button></td>
      </tr>`;
    totalSales += data.total;
  });

  tbody.innerHTML = table;
  salary.textContent = `Total Sales: ${totalSales.toFixed(2)}`;
}

function deleteProduct(index) {
  localProducts.splice(index, 1);
  displayProducts();
}

function updateProduct(index) {
  const data = localProducts[index];
  title.value = data.title;
  price.value = data.price;
  taxes.value = data.taxes;
  ads.value = data.ads;
  discount.value = data.discount;
  category.value = data.category;
  count.style.display = "none";
  total.innerHTML = data.total.toFixed(2);
  mood = "update";
  tmp = index;
  submit.textContent = "UPDATE";
}

search.addEventListener("input", () => {
  const val = search.value.toLowerCase();
  let table = "";
  let totalSales = 0;
  localProducts.forEach((data, index) => {
    if (
      data.title.toLowerCase().includes(val) ||
      data.category.toLowerCase().includes(val)
    ) {
      table += `
        <tr>
          <td>${index + 1}</td>
          <td>${data.title}</td>
          <td>${data.price}</td>
          <td>${data.taxes}</td>
          <td>${data.ads}</td>
          <td>${data.discount}</td>
          <td>${data.total.toFixed(2)}</td>
          <td>${data.category}</td>
          <td>${data.date}</td>
          <td><button onclick="updateProduct(${index})">Update</button></td>
          <td><button onclick="deleteProduct(${index})">Delete</button></td>
        </tr>`;
      totalSales += data.total;
    }
  });

  tbody.innerHTML = table;
  salary.textContent = `Total Sales: ${totalSales.toFixed(2)}`;
});
