const carousel = document.querySelector(".projects_carousel");
const icons = document.querySelectorAll(".projects_wrapper i")
const firstImag = document.querySelectorAll("img")[0]


let isSliderStart = false, prevpageX, prevscrollleft;
let firstImgWidth =firstImag.clientWidth + 5;
console.log(firstImgWidth)

icons.forEach(function(icon) {
    
    icon .addEventListener("click",()=>{
        console.log(icon)
        if (icon.id == "left"){
            carousel.scrollLeft -= firstImgWidth
        } else{
            carousel.scrollLeft += firstImgWidth
        }
    })
})




const dragstart= (e) => {
    // verificar se o movimento começou
    isSliderStart = true 

    //  posição inicial do mouse no inicio do movimento  
    prevpageX= e.pageX;

    // posição inicial do scroll
    prevscrollleft= carousel.scrollLeft;
    
}
const dragstop = () => {
    // verificar se o movimento parou
    isSliderStart = false
}

const dragging= (e) => {
   if (!isSliderStart)return;
    e.preventDefault();
    // diferençã entra a posição atual e inical do mouse
    let positiondiff= e.pageX - prevpageX;

    // diferença entre a posição atual e inical do scroll de forma amover no sentido contrario do mouse 
    // e dar a sensasão de arrasto
    carousel.scrollLeft = prevscrollleft-positiondiff;
    console.log(e.pageX)
}


carousel.addEventListener("mousemove", dragging);
carousel.addEventListener("mousedown", dragstart);
carousel.addEventListener("mouseup", dragstop);
