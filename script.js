const imageContainer = document.querySelector('#image-container')
const loader = document.querySelector('#loader')

let ready = false;
let imagesLoaded = 0;
let totalImages = 0;
let photosArray = [];

let imageCount = 5;
const query ='canada'
const apiKey ='2RNrXKvztnlQIwZSdo41T6R2wKdmQvSgEV8nBPGsPGk';
let apiUrl = `https://api.unsplash.com/photos/random/
?client_id=${apiKey}&count=${imageCount}&query=${query}`;

const imageLoaded=()=>{
    imagesLoaded ++;
    if (imagesLoaded === totalImages){
        ready = true;
        loader.hidden = true;   
    }
}
function setAttributes  (element, attributes) {
    for (const key in attributes){
        element.setAttribute(key, attributes[key])
    }
}
const displayPhotos = () => {
    imagesLoaded = 0;
    totalImages = photosArray.length;
    photosArray.forEach((photo)=> {
        //Link to photo on unsplash website
        const item = document.createElement('a')
        setAttributes(item, {
            href: photo.links.html,
            target: '_blank',
        });

        //Create <img> for photo
        const image = document.createElement('img');
        setAttributes(image, {
            src: photo.urls.regular,
            alt: photo.alt_description,
            title: photo.alt_description
        });
        // check when image is finished loading
        image.addEventListener('load', imageLoaded)
        // put <img> into <a> and add  them to the image container
        item.appendChild(image);
        imageContainer.appendChild(item);
    })
}
const getPhotos = async () =>{
    try{
        const response = await fetch(apiUrl);
        photosArray = await response.json();
        displayPhotos();
    }
    catch(error){
        throw new Error(error)
    }
}

window.addEventListener('scroll', () =>{
    if (window.innerHeight + window.scrollY >= document.body.offsetHeight - 1000
        && ready){
        ready = false;
        getPhotos();
    }
})
getPhotos();