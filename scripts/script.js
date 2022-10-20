let slideIndex = 1;

//cards list
// let cards = [
//     "images/img_lights_wide.jpg", 
//     "images/img_mountains_wide.jpg", 
//     "images/img_nature_wide.jpg",
//     "images/img_lights_wide.jpg", 
//     "images/img_mountains_wide.jpg", 
//     "images/img_nature_wide.jpg",
// ]

const xhr = new XMLHttpRequest();

xhr.onload = function() {
  //console.log(`Статус: ${xhr.status}; Результат: ${xhr.response}`)
  
  const cards = JSON.parse(xhr.response)

  //create cards
  cards.reverse().forEach((val, idx, arr) => createImageCard(
    arr.length - idx, 
    arr.length, 
    val.download_url, 
    "Slide " + (arr.length - idx) 
  ))

  //create dots
  cards.forEach((val, idx) => createImageDots(idx+1))

  showSlides(slideIndex);
  };

xhr.onerror = function() {
  console.log('Ошибка запроса');
};

xhr.open("get", "https://picsum.photos/v2/list", true);
xhr.send();





// Next/previous controls
function plusSlides(n) {
  showSlides(slideIndex += n);
}

// Thumbnail image controls
function currentSlide(n) {
  showSlides(slideIndex = n);
}

function showSlides(n) {
  let i;
  let slides = document.getElementsByClassName("mySlides");
  let dots = document.getElementsByClassName("dot");
  if (n > slides.length) {slideIndex = 1}
  if (n < 1) {slideIndex = slides.length}
  for (i = 0; i < slides.length; i++) {
    slides[i].style.display = "none";
  }
  for (i = 0; i < dots.length; i++) {
    dots[i].className = dots[i].className.replace(" active", "");
  }
  slides[slideIndex-1].style.display = "block";
  dots[slideIndex-1].className += " active";
}

function createImageCard(slideNum, slidesTotal, imagePath, captionText){
    let slidesContainer = document.getElementsByClassName("slideshow-container")[0];
    let div_mySlide = document.createElement('div')
    div_mySlide.setAttribute('class', "mySlides fade")
    let div_numtext = document.createElement('div')
    div_numtext.setAttribute('class', "numbertext")
    div_numtext.innerText = `${slideNum} / ${slidesTotal}`
    let div_image = document.createElement('img')
    div_image.setAttribute('style', "width:100%")
    div_image.setAttribute('src', imagePath)
    let div_text = document.createElement('div')
    div_text.setAttribute('class', "text")
    div_text.innerText = captionText

    div_mySlide.appendChild(div_numtext)
    div_mySlide.appendChild(div_image)
    div_mySlide.appendChild(div_text)

    slidesContainer.insertBefore(div_mySlide, slidesContainer.firstChild)

}

function createImageDots(slideNum){
    let slidesDotsCollection = document.getElementsByClassName("dots-collection")[0]
    let span_dot = document.createElement('span')
    span_dot.setAttribute('class', "dot")
    span_dot.setAttribute('onclick', `currentSlide(${slideNum})`)

    slidesDotsCollection.appendChild(span_dot)
}