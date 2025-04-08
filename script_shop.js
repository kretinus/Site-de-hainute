

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
