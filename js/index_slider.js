// const carousel = document.querySelector(".carousel");

// let isDragStart = false;
// const dragstart= () => {
//     isDragStart = true
// }

// const dragging= (e) => {
//    if (!isDragStart)return;
//     // e.preventDefault();
//     carousel.scrollLeft = e.pageX;
//     console.log(e.pageX)
// }

// // const dragstop =()=>{

// // }
// carousel.addEventListener("mousemove", dragging);
// carousel.addEventListener("mousedown", dragstart);
// // carousel.addEventListener("mouseup", dragstop);


const carousel = document.querySelector(".carousel");

let isDragStart = false, prevpageX, prevscrollleft;


const dragstart= (e) => {
    isDragStart = true
    prevpageX= e.pageX;
    prevscrollleft= carousel.scrollLeft;
}
const dragstop = () => {
    isDragStart = false
}

const dragging= (e) => {
   if (!isDragStart)return;
    e.preventDefault();
    let positiondiff= e.pageX - prevpageX;
    carousel.scrollLeft = prevscrollleft-positiondiff;
    console.log(e.pageX)
}


carousel.addEventListener("mousemove", dragging);
carousel.addEventListener("mousedown", dragstart);
carousel.addEventListener("mouseup", dragstop);