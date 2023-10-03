const scrollLine = document.querySelector('.separator');

// Функция для обновления стилей при прокрутке
function updateStyles() {
    const scrollTop = window.scrollY;

    // Рассчитываем, когда начинать отображать линию и изменять стили
    if (scrollTop > 0) {
        scrollLine.classList.add('scrolled');
    } else {
        scrollLine.classList.remove('scrolled');
    }
}

// Вызываем функцию при загрузке страницы и при прокрутке
window.addEventListener('load', updateStyles);
window.addEventListener('scroll', updateStyles);

$('input').on('change', function() {
  $('body').toggleClass('blue');
});
