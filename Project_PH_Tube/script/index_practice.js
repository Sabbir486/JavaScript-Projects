// console.log("Console is connected");

// function categoryContainer(){
//     fetch('https://openapi.programming-hero.com/api/phero-tube/categories')
//     .then((res) => res.json())
//     .then((data) => displayCategories(data.categories))
    
// }

// function displayCategories(categories){

//     // get the Container
//     const containerCategory = document.getElementById('category-container');

//     // Using loop
//     for(let cat of categories){

//         // Create Element
//         const categoryDiv = document.createElement('div');
//         categoryDiv.innerHTML = `
//         <button class="btn btn-sm hover:bg-[#ff1f3d] hover:text-white">${cat.category}</button>
//         `;

//         // Append Element
//         containerCategory.append(categoryDiv);
//     }
// }

// categoryContainer();