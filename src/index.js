document.addEventListener('DOMContentLoaded', function() {
    console.log('%c DOM HAS LOADED', 'color: firebrick')
  });

const imgUrl = "https://dog.ceo/api/breeds/image/random/4"
const breedUrl = 'https://dog.ceo/api/breeds/list/all'
const dogDiv = document.querySelector('#dog-image-container')
const dogBreedUl = document.querySelector('#dog-breeds')
const dropDown = document.querySelector("#breed-dropdown")
let breedsArray = []

dogBreedUl.addEventListener('click', handleClick)
dropDown.addEventListener('change', handleChange)


//render random 4 dog images here

function fetchImages() {
    return (fetch(imgUrl)
    .then((resp) => resp.json())
    .then((data) => imageHandler(data))
    );
  }

function imageHandler(images){
  const imgs = images.message
  let imgsArray = createImageElement(imgs)
  renderDogImage(imgsArray)
  }

function createImageElement(imgs){
  return imgs.map((img) => {
    let i = `<img src=${img}>`
    return i  
  })
}

function renderDogImage(imgsArray){
  imgsArray.forEach(element => {
    renderImg(element)
  })
}

function renderImg(element){
  dogDiv.innerHTML += element;
}

//Render dog breeds here

function fetchBreeds() {
  return (fetch(breedUrl)
  .then((resp) => resp.json())
  .then((data) => breedsHandler(data))
  )
}

function breedsHandler(data){
    const breedsObj = data.message
    breedsArray = Object.keys(breedsObj)
    let breedsArr = createListBreed(breedsArray)
    renderDogBreeds(breedsArr)
}

function createListBreed(lists){
  return lists.map((list) => {
    let i = `<li>${list}</li>`
    return i
  })
}

function renderDogBreeds(breedsArray){
  breedsArray.forEach(element => {
    renderUl(element)
  })
}

function renderUl(element){
  dogBreedUl.innerHTML += element;
}

function clearUl(){
  dogBreedUl.innerHTML = " "
}

//handle dropdown events here

function handleClick(event){
  if(event.target.style.color === 'red'){
    event.target.style.color = 'black'
  }else{
    event.target.style.color = 'red'
  }
}

function handleChange(event){
  const letter = event.target.value
  if(letter === "all"){
    clearUl()
    fetchBreeds()

  }else{
    let organized = breedsArray.filter(word => word.startsWith(letter))
    let breedsArr = createListBreed(organized)
    clearUl()
    renderDogBreeds(breedsArr)
  }

}

//load functions here

fetchImages();
fetchBreeds();
