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
    return `<article class="menu-item">
      <img src="${item.img}" alt="${item.title}" class="photo">
      <div class="item-info">
        <header>
          <h4>${item.category}</h4>
          <h4 class="price">${item.price}</h4>
        </header>
        <p class="item-text">${item.desc}</p>
        <div class="icons">
          <button type="button" onclick="deleteUserAddedRecipe(${index})"><i class="fa fa-trash"></i></button>
          <i class="fa fa-pencil-square-o"></i>
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



function deleteUserAddedRecipe(index) {
  userAddedMenu.splice(index, 1);
  saveMenuToLocalStorage();
  displayUserAddedRecipes(userAddedMenu);
  displayMenuBtns(userAddedMenu);
}

function generateUniqueId() {
  return new Date().getTime();
}








// // userAddedRecipes.js
// const sectionCenter = document.querySelector(".section-center");
//   const container = document.querySelector(".btn-container");
  
//   window.addEventListener("DOMContentLoaded", function () {
//     displayUserAddedRecipes(menuItems);
//     displayMenuBtns(menuItems);
//   });
// let userAddedMenu = JSON.parse(localStorage.getItem("userAddedMenu")) || [];
// let menuItems = [];
// function displayUserAddedRecipes(menuItems) {
//   const sectionCenter = document.querySelector(".section-center");

//   let displayMenu = menuItems.map(function (item, index) {
//     return `<article class="menu-item">
//       <img src="${item.img}" alt="${item.title}" class="photo">
//       <div class="item-info">
//         <header>
//           <h4>${item.category}</h4>
//           <h4 class="price">${item.price}</h4>
//         </header>
//         <p class="item-text">${item.desc}</p>
//         <div class="icons">
//           <button type="button" onclick="deleteUserAddedRecipe(${index})"><i class="fa fa-trash"></i></button>
//           <i class="fa fa-pencil-square-o"></i>
//         </div>
//       </div>
//     </article>`;
//   });

//   displayMenu = displayMenu.join("");
//   sectionCenter.innerHTML = displayMenu;
// }
// function displayMenuBtns() {
//       const categoryitems = menu.reduce(function(value, item) {
//         if (!value.includes(item.category)) {
//             value.push(item.category);
//         }
//         return value; // Continue the loop without an else block
//     }, ['all']);
//     const categoryBtns = categoryitems.map(function(c) {
//       return ` <button class="filter-btn"  type="button" data-name= ${c}> ${c}
//       </button>`
//       })
//       .join("");
//       container.innerHTML = categoryBtns;
//       const sectionBtn = container.querySelectorAll(".filter-btn");
//   //filter 
//   sectionBtn.forEach(function(btn) {
//     btn.addEventListener("click", function(e) {
//    const category = e.currentTarget.dataset.name;
//    const menucategory = menuItems.filter(function (menuItems) {
//     if (menuItems.category === category){
//       return menuItems;
  
//     }
//    })
//    if (category === "all"){
//     displayUserAddedRecipes(menuItems);
//   }
//     else {
//       displayUserAddedRecipes(menucategory);
//     }
//     })
//   })
//     }
  
// function saveMenuToLocalStorage() {
//   localStorage.setItem("userAddedMenu", JSON.stringify(userAddedMenu));
// }
// function addUserRecipe() {
//   const newTitle = document.getElementById("new-title").value;
//   const newCategory = document.getElementById("new-category").value;
//   const newPrice = parseFloat(document.getElementById("new-price").value);
//   const newImage = document.getElementById("new-image").value;
//   const newDescription = document.getElementById("new-description").value;

//   if (newTitle && newCategory && !isNaN(newPrice) && newImage && newDescription) {
//     const newRecipe = {
//       id: generateUniqueId(),
//       title: newTitle,
//       category: newCategory,
//       price: newPrice,
//       img: newImage,
//       desc: newDescription,
//     };

//     // Log the details to the console
//     console.log("New Recipe Details:");
//     console.log("Title:", newRecipe.title);
//     console.log("Category:", newRecipe.category);
//     console.log("Price:", newRecipe.price);
//     console.log("Image URL:", newRecipe.img);
//     console.log("Description:", newRecipe.desc);

//     userAddedMenu.push(newRecipe);

//     saveMenuToLocalStorage();
//     displayUserAddedRecipes(userAddedMenu);
//     displayMenuBtns([userAddedMenu]); // Update the displayed menu on index.html

//     // Reset form fields
//     document.getElementById("new-title").value = "";
//     document.getElementById("new-category").value = "Breakfast";
//     document.getElementById("new-price").value = "";
//     document.getElementById("new-image").value = "";
//     document.getElementById("new-description").value = "";
//   } else {
//     alert("Please fill in all fields.");
//   }
// }
// // main.js or userAddedRecipes.js
// function generateUniqueId() {
//   return new Date().getTime();
// }


// function deleteUserAddedRecipe(index) {
//   userAddedMenu.splice(index, 1);
//   saveMenuToLocalStorage();
//   displayUserAddedRecipes(userAddedMenu);
//   displayMenuBtns([userAddedMenu]);
// }
