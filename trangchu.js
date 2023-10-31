function chonHinh(a){
    document.querySelector('.doubleDeeTee').src = a;
    
}
function doiMau(mau){
    const circle = document.querySelector('.circle');
    circle.style.background = mau;
}

const listImage =document.querySelector('.list-image');
const imgs = document.getElementsByClassName('img-ss');
const length = imgs.length;
const btnLeft = document.querySelector('.btn-left');
const btnRight = document.querySelector('.btn-right');
let current = 0;

function toggleMenu(){
    var menuToggle = document.querySelector('.toggle');
    var navigation = document.querySelector('.navigation');
    menuToggle.classList.toggle('active');
    navigation.classList.toggle('active');
}

// phan slide show
const handleChangeSlide = () =>{
    if(current == length-1){
        current=0;
        let width = imgs[0].offsetWidth;
        listImage.style.transform = 'translateX(0px)';
    } else {
        current ++;
        let  width = imgs[0].offsetWidth;
        console.log(width*(-1)*current, current);
        listImage.style.transform = 'translateX('+ width*(-1)*current +'px)';
    }
}
let handleEventChangeSlide = setInterval(handleChangeSlide, 4000);

btnRight.addEventListener('click',() =>{
    clearInterval(handleEventChangeSlide)
    handleChangeSlide()
    handleEventChangeSlide = setInterval(handleChangeSlide, 4000)
})

btnLeft.addEventListener('click',() =>{
    clearInterval(handleEventChangeSlide)
    if(current == 0){
        current=length-1;
        let width = imgs[0].offsetWidth;
        listImage.style.transform = 'translateX('+ width*(-1)*current +'px)';
    } else {
        current --;
        let  width = imgs[0].offsetWidth;
        console.log(width*(-1)*current, current);
        listImage.style.transform = 'translateX('+ width*(-1)*current +'px)';
    }
    handleEventChangeSlide = setInterval(handleChangeSlide, 4000);
})
    