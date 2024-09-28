var bkg = document.querySelector('.side-image');

var backgroundImages = [
    'url("images/comment/ads1.png")',
    'url("images/comment/ads2.png")',
    'url("images/comment/ads3.png")',
    'url("images/comment/ads4.png")',
    'url("images/comment/ads5.png")',
    'url("images/comment/ads6.png")',
    'url("images/comment/ads7.png")'
  ];

  var currentIndex = 0;

  function changeBackground() {
    bkg.style.backgroundImage = backgroundImages[currentIndex];
    currentIndex = (currentIndex + 1) % backgroundImages.length;
  }
  setInterval(changeBackground, 2000);

 
  