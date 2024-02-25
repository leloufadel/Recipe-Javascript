// userAddedRecipes.js
const sectionCenter = document.querySelector(".section-center");
const container = document.querySelector(".btn-container");

let userAddedMenu = JSON.parse(localStorage.getItem("userAddedMenu")) || [];

window.addEventListener("DOMContentLoaded", function () {
  displayUserAddedRecipes(userAddedMenu);
  displayMenuBtns(userAddedMenu);
});

function displayUserAddedRecipes(menuItems) {
  let displayMenu = menuItems.map(function (item, index) {
    let buttons = '';
    if (!(item.title === "Buttermilk Pancakes" || item.title === "Lunch Double")) {
      buttons = `
        <button type="button" onclick="deleteUserAddedRecipe(${index})"><i class="fa fa-trash"></i></button>
        <i class="fa fa-pencil-square-o"></i>
      `;
    }
    
    return `<article class="menu-item">
      <img src="${item.img}" alt="${item.title}" class="photo">
      <div class="item-info">
        <header>
          <h4>${item.category}</h4>
          <h4 class="price">${item.price}</h4>
        </header>
        <p class="item-text">${item.desc}</p>
        <div class="icons">
          ${buttons}
        </div>
      </div>
    </article>`;
  });

  sectionCenter.innerHTML = displayMenu.join("");
}


function displayMenuBtns(menuItems) {
  const categoryItems = menuItems.reduce(function(value, item) {
    if (!value.includes(item.category)) {
      value.push(item.category);
    }
    return value;
  }, ['all']);

  const categoryBtns = categoryItems.map(function(category) {
    return `<button class="filter-btn" type="button" data-name="${category}">${category}</button>`;
  }).join("");

  container.innerHTML = categoryBtns;

  const sectionBtns = container.querySelectorAll(".filter-btn");

  sectionBtns.forEach(function(btn) {
    btn.addEventListener("click", function(e) {
      const category = e.currentTarget.dataset.name;
      const filteredMenu = (category === "all") ? userAddedMenu : userAddedMenu.filter(item => item.category === category);
      displayUserAddedRecipes(filteredMenu);
    });
  });
}

function saveMenuToLocalStorage() {
  localStorage.setItem("userAddedMenu", JSON.stringify(userAddedMenu));
}

function addUserRecipe() {
  const newTitle = document.getElementById("new-title").value;
  const newCategory = document.getElementById("new-category").value;
  const newPrice = parseFloat(document.getElementById("new-price").value);
  const newImage = document.getElementById("new-image").value;
  const newDescription = document.getElementById("new-description").value;

  if (newTitle && newCategory && !isNaN(newPrice) && newImage && newDescription) {
    const newRecipe = {
      id: generateUniqueId(),
      title: newTitle,
      category: newCategory,
      price: newPrice,
      img: newImage,
      desc: newDescription,
    };

    // Log the details to the console
    console.log("New Recipe Details:");
    console.log("Title:", newRecipe.title);
    console.log("Category:", newRecipe.category);
    console.log("Price:", newRecipe.price);
    console.log("Image URL:", newRecipe.img);
    console.log("Description:", newRecipe.desc);

    userAddedMenu.push(newRecipe);

    saveMenuToLocalStorage();
    displayUserAddedRecipes(userAddedMenu);
    displayMenuBtns([userAddedMenu]); // Update the displayed menu on index.html

    // Reset form fields
    document.getElementById("new-title").value = "";
    document.getElementById("new-category").value = "Breakfast";
    document.getElementById("new-price").value = "";
    document.getElementById("new-image").value = "";
    document.getElementById("new-description").value = "";
    
    // Display success message
    alert("Recipe added successfully!");
  } else {
    alert("Please fill in all fields.");
  }
}

// // Create two sample recipe objects
// const recipe1 = {
//   id: generateUniqueId(),
//   title: "Buttermilk Pancakes",
//   category: "Breakfast",
//   price: 15.99,
//   img: "./images/item-1.jpeg",
//   desc: `I'm baby woke mlkshk wolf bitters live-edge blue bottle, hammock freegan copper mug whatever cold-pressed`,
// };

// const recipe2 = {
//   id: generateUniqueId(),
//   title: "Lunch Double",
//   category: "Lunch",
//   price: 13.99,
//   img: "./images/item-2.jpeg",
//   desc: `Vaporware iPhone mumblecore selvage raw denim slow-carb leggings gochujang helvetica man braid jianbing. Marfa thundercats`,
// };

// // Add the sample recipes to the userAddedMenu array
// userAddedMenu.push(recipe1, recipe2);

// // Call the display functions to update the displayed recipes and menu buttons
// displayUserAddedRecipes(userAddedMenu);
// displayMenuBtns(userAddedMenu);


function deleteUserAddedRecipe(index) {
  userAddedMenu.splice(index, 1);
  saveMenuToLocalStorage();
  displayUserAddedRecipes(userAddedMenu);
  displayMenuBtns(userAddedMenu);
}

function generateUniqueId() {
  return new Date().getTime();
}

