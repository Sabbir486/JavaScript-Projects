console.log("Index is connected");

function removeActiveClass(){
    const activeBtns = document.getElementsByClassName('active');
    for(let btn of activeBtns){
        btn.classList.remove('active');
    }
    
}

function loadCategories(){
    //fetch the Data

    fetch('https://openapi.programming-hero.com/api/phero-tube/categories')
    .then((res) => res.json() )
        .then((data) => displayCategories(data.categories))

        // data.categories --> Array of Object
    
}

function loadVideos(){
    fetch('https://openapi.programming-hero.com/api/phero-tube/videos')
    .then ((res) => res.json())
    .then((data) => {
        document.getElementById('btn-all').classList.add('active');
        displayVideos(data.videos)
    })
}

function loadVideoDetails(videoId){
    console.log(videoId);
    const url = `https://openapi.programming-hero.com/api/phero-tube/video/${videoId}`;

    fetch(url).then((res) => res.json())
    .then((data) => displayVideoDetails(data.video))

}

function displayVideoDetails(video){
    console.log(video);
    document.getElementById('video_details').showModal();
    const detailsContainer = document.getElementById('details-container');

    detailsContainer.innerHTML = `
        <div class="card bg-base-100 image-full shadow-sm">
            <figure>
                <img
                src="${video.thumbnail}"
                alt="Shoes" />
            </figure>
            <div class="card-body">
                <h2 class="card-title">Card Title</h2>
                <p>A card component has a figure, a body part, and inside body there are title and actions parts</p>
                <div class="card-actions justify-end">
                
                </div>
            </div>
            </div>
    `;
    
}

const loadCategoryVideo=(id) => {
    
    const url = `https://openapi.programming-hero.com/api/phero-tube/category/${id}`;
    console.log(url);

    fetch(url).then((res) => res.json())
    .then((data) => {
        removeActiveClass();
        // no active class after this

        const clickedBtn = document.getElementById(`btn-${id}`);
        clickedBtn.classList.add('active');
        
        displayVideos(data.category)
    })
}

function displayCategories(categories){
    // get the container
    const categoryContainer = document.getElementById('category-container');


    // Loop Operation on Array of Object
    for(let cat of categories){
        console.log(cat);
        
        // CREATE Element
        const categoryDiv = document.createElement('div');

        categoryDiv.innerHTML = `
        <button id='btn-${cat.category_id}' onclick='loadCategoryVideo(${cat.category_id})' class="btn btn-sm hover:bg-[#ff1f3d] hover:text-white">${cat.category}</button>
        `;

        // Append Element
        categoryContainer.append(categoryDiv);
    }

}

const displayVideos=(videos) => {
    
    const videoContainer = document.getElementById('video-container');

    videoContainer.innerHTML = '';

    if(videos.length == 0){
        videoContainer.innerHTML = `
            <div class="py-20 col-span-full flex flex-col justify-center items-center text-center">
            <img class="w-[120px]" src="./ph-tube-resources/Icon.png" alt="">
            <h2 class="text-2xl font-bold">Oops!! Sorry, There is no content here</h2>
            </div>
        `;
        return;
    }

    for(let vid of videos){

        const videoCard = document.createElement('div');
        videoCard.innerHTML = `
        <div class="card bg-base-100">
        <figure class="relative">
            <img class="w-full h-[150px] object-cover"
            src="${vid.thumbnail}"
            alt="Shoes" />

            <span class="absolute bottom-2 right-2 text-white bg-black px-2 text-sm rounded">3hrs 56 min ago</span>
        </figure>

        <div class="flex gap-2 px-0 py-5">
            <div class="profile">
                <div class="avatar">
                    <div class="ring-primary ring-offset-base-100 w-6 rounded-full ring-2 ring-offset-2">
                        <img src="${vid.authors[0].profile_picture}" />
                    </div>
                </div>
            </div>

            <div class="intro">
                <h2 class="text-sm font-semibold">Midnight Serenade</h2>
                <p class="text-sm text-gray-400 flex gap-1">${vid.authors[0].profile_name} ${vid.authors[0].verified == true ? `<img class="w-5 h-5" src="https://img.icons8.com/?size=32&id=6xO3fnY41hu2&format=png" alt="">` : ``}</p>

                <p class="text-sm text-gray-400">${vid.others.views}</p>
            </div>


        </div>

        <button onclick=loadVideoDetails('${vid.video_id}') class="btn btn-block">Show Details</button>

        </div>
        `;

        videoContainer.append(videoCard);
    }
    
}

loadCategories();

