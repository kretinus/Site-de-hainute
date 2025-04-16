

document.addEventListener("DOMContentLoaded", function () {
    const searchIcon = document.querySelector(".lupa");
    const searchWrapper = document.querySelector(".search-wrapper");
    const closeSearch = document.getElementById("close-search");
    const searchInput = document.getElementById("search");
    const clothesItems = document.querySelectorAll(".containerClothes");

    searchWrapper.style.display = "none";

    searchIcon.addEventListener("click", function () {
        searchWrapper.style.display = "flex";
        searchInput.focus(); 
    });

    
    closeSearch.addEventListener("click", function () {
        searchWrapper.style.display = "none";
        searchInput.value = ""; 
        filterItems(""); 
    });

   
    searchInput.addEventListener("keyup", function () {
        const searchTerm = searchInput.value.toLowerCase().trim();
        filterItems(searchTerm);
    });

    
    function filterItems(searchTerm) {
        clothesItems.forEach(item => {
            const itemName = item.textContent.toLowerCase();
            if (itemName.includes(searchTerm)) {
                item.style.display = "block";
            } else {
                item.style.display = "none"; 
            }
        });
    }

    
    document.addEventListener("click", function (event) {
        if (!searchWrapper.contains(event.target) && !searchIcon.contains(event.target)) {
            searchWrapper.style.display = "none";
        }
    });
});

document.addEventListener("DOMContentLoaded", function () {
    const menuIcon = document.querySelector(".menu");
    const sidebar = document.getElementById("sidebar");
    
    menuIcon.addEventListener("click", function () {
        sidebar.classList.toggle("hidden");
    });
});

document.addEventListener("DOMContentLoaded", function () {
    

  
    const addToCartButtons = document.querySelectorAll(".spcart");
    addToCartButtons.forEach(button => {
        button.addEventListener("click", function() {
            const product = this.closest(".containerClothes");
            const productName = product.querySelector("h3").textContent;
            const productPrice = product.querySelector("h2").textContent;
            const productImage = product.querySelector("img").src;

        
            let cart = JSON.parse(localStorage.getItem("cart")) || [];
            cart.push({
                name: productName,
                price: productPrice,
                image: productImage
            });
            localStorage.setItem("cart", JSON.stringify(cart));

           
            
        });
    });
});

document.addEventListener("DOMContentLoaded", function () {
    // Codul existent pentru search și sidebar...

    // Filtrare după categorie
    const sidebarLinks = document.querySelectorAll(".sidebar ul li a");
    sidebarLinks.forEach(link => {
        link.addEventListener("click", function (e) {
            e.preventDefault();
            const category = this.textContent.trim();

            if (category === "Favourites") {
                showFavourites();
            } else {
                filterByCategory(category);
            }
        });
    });

    // Funcție pentru filtrarea după categorie
    function filterByCategory(category) {
        const clothesItems = document.querySelectorAll(".containerClothes");
        clothesItems.forEach(item => {
            const itemCategory = item.classList[1]; 
            if (category === "All" || itemCategory.toLowerCase() === category.toLowerCase()) {
                item.style.display = "block";
            } else {
                item.style.display = "none";
            }
        });
    }

    // Funcție pentru afișarea produselor favorite
    function showFavourites() {
        const clothesItems = document.querySelectorAll(".containerClothes");
        clothesItems.forEach(item => {
            const likeCheckbox = item.querySelector(".ui-like input");
            if (likeCheckbox.checked) {
                item.style.display = "block";
            } else {
                item.style.display = "none";
            }
        });
    }

   
    const likeCheckboxes = document.querySelectorAll(".ui-like input");
    likeCheckboxes.forEach(checkbox => {
        checkbox.addEventListener("change", function () {
            const productId = this.closest(".containerClothes").getAttribute("data-id"); 
            let favourites = JSON.parse(localStorage.getItem("favourites")) || {};

            if (this.checked) {
                favourites[productId] = true;
            } else {
                delete favourites[productId];
            }

            localStorage.setItem("favourites", JSON.stringify(favourites));
        });


        const productId = checkbox.closest(".containerClothes").getAttribute("data-id");
        let favourites = JSON.parse(localStorage.getItem("favourites")) || {};
        if (favourites[productId]) {
            checkbox.checked = true;
            checkbox.nextElementSibling.style.fill = "var(--icon-primary-color)";
        }
    });
});