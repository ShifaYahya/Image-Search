const accessKey = "uMVRb7WO64g1AD2tJ79IHHg_m320iH4Zcc2XKzaLy7A";
const formEl= document.querySelector("form");
const inputEl = document.querySelector(".input");
const showmoreBtn = document.querySelector(".showmore-btn");
const searchResultsDiv = document.querySelector(".search-results");

let page= 1;
let inputData;

async function searchImages(){
   inputData = inputEl.value;
   const url = `https://api.unsplash.com/search/photos?page=${page}&query=${inputData}&client_id=${accessKey}` ;    
   const response = await fetch(url);
   const data = await response.json();
   const results = data.results;
   if(page === 1){
    searchResultsDiv.innerHTML = "";
   }   
   
   results.map((result)=>{
    const imageWrapper = document.createElement("div")
    imageWrapper.classList.add("search-result")
    const image = document.createElement("img")
    image.src = result.urls.small
    image.alt = result.alt_description
    const anchortag = document.createElement("a")
    anchortag.href= result.links.html
    anchortag.target = "_blank"
    anchortag.textContent = result.alt_description

    imageWrapper.appendChild(image)
    imageWrapper.appendChild(anchortag)
    searchResultsDiv.appendChild(imageWrapper)

   });

   page++;
   if (page > 1){
    showmoreBtn.style.display = "block";
   }
   
}
   
   

formEl.addEventListener("submit",(event)=>{
    event.preventDefault();
    page= 1;
    console.log("submit");
    searchImages();
} )
showmoreBtn.addEventListener("click",searchImages )