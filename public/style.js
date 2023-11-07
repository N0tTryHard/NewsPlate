const scrollLine = document.querySelector('.separator');
const dockBar = document.querySelector('.dockMenu');

// Функция для обновления стилей при прокрутке
function updateStyles() {
    const scrollTop = window.scrollY;

    // Рассчитываем, когда начинать отображать линию и изменять стили
    if (scrollTop > 0) {
        // scrollLine.classList.add('scrolled');
        dockBar.classList.add('scrolled');
    } else {
        // scrollLine.classList.remove('scrolled');
        dockBar.classList.remove('scrolled');
    }
}

// Вызываем функцию при загрузке страницы и при прокрутке
window.addEventListener('load', updateStyles);
window.addEventListener('scroll', updateStyles);


// document.addEventListener("DOMContentLoaded", function() {
//     const imageContainerLeft = document.getElementById('imageContainerLeft');
//     const imageContainerRight = document.getElementById('imageContainerRight');
//     images = []; // Populate this array with your images from assets folder
//
//     for (i=1;i<12;i++){
//         images.push(`img${i}.jpg`);
//     };
//     console.log(images);
//     // Append images to the left container
//     images.forEach(imgSrc => {
//         const imgElem = createImageElement(imgSrc);
//         imageContainerLeft.appendChild(imgElem);
//     });
//
//     // Append images to the right container
//     images.forEach(imgSrc => {
//         const imgElem = createImageElement(imgSrc);
//         imageContainerRight.appendChild(imgElem);
//     });
//
//     function createImageElement(imgSrc) {
//         const imgElem = document.createElement("img");
//         imgElem.src = "assets/" + imgSrc;
//         imgElem.onclick = function() {
//             window.open(imgElem.src); // Open image in new tab when clicked
//         }
//         return imgElem;
//     }
//
//     function scrollImages() {
//         scrollImagesForContainer(imageContainerLeft, 1);
//         scrollImagesForContainer(imageContainerRight, -1);
//         requestAnimationFrame(scrollImages);
//     }
//
//     function scrollImagesForContainer(container, direction) {
//         const imgs = container.querySelectorAll('img');
//         imgs.forEach(img => {
//             const bottomPosition = parseInt(window.getComputedStyle(img).bottom);
//             if (direction === 1 && bottomPosition >= container.clientHeight) {
//                 img.style.bottom = (-img.clientHeight) + 'px';
//             } else if (direction === -1 && bottomPosition <= -img.clientHeight) {
//                 img.style.bottom = container.clientHeight + 'px';
//             } else {
//                 img.style.bottom = (bottomPosition + direction) + 'px';
//             }
//         });
//     }
//
//     requestAnimationFrame(scrollImages);
// });
