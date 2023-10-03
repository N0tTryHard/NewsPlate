let timeoutId;
let pageId = 1;
const pageIds = ['one', 'two', 'three', 'four', 'five'];
const idToPage = {'one': 0, 'two': 1, 'three': 2, 'four': 3, 'five': 4};

function tonull(x) {
    if (x > 4) {
        x = 0;
    }
    return x;
}

function changeClasses(flag=5000) {
    const elements = document.querySelectorAll('.imageBar .imageContainer');
    
    elements.forEach(element => {
        if (element.classList.contains('one')) {
            element.classList.remove('one');
            element.classList.add('two');
        } else if (element.classList.contains('two')) {
            element.classList.remove('two');
            element.classList.add('three');
        } else if (element.classList.contains('three')) {
            element.classList.remove('three');
            element.classList.add('four');
        } else if (element.classList.contains('four')) {
            element.classList.remove('four');
            element.classList.add('five');
        } else if (element.classList.contains('five')) {
            element.classList.remove('five');
            element.classList.add('one');
        }
    });
    const points = document.querySelectorAll('.point');
    points.forEach(point => {
        point.classList.remove('active');
    });
    const currentPoint = document.querySelector('.point.' + pageIds[pageId]);
    if (currentPoint) {
        currentPoint.classList.add('active');
    }
    
    pageId = tonull(pageId + 1);
    timeoutId = setTimeout(changeClasses, flag);
}

timeoutId = setTimeout(changeClasses, 5000);

const elements = document.querySelectorAll('.imageBar .imageContainer');
elements.forEach(element => {
    element.addEventListener('mouseenter', () => {
        if (element.classList.contains('three')) {
            clearTimeout(timeoutId);
        }
    });
    
    element.addEventListener('mouseleave', () => {
        if (element.classList.contains('three')) {
            timeoutId = setTimeout(changeClasses, 5000);
        }
    });
});

const pointes = document.querySelectorAll('.points .point');
function handleClick() {
    const target = event.target;
    const classes = target.classList[1];
    let toPage = idToPage[classes];
    
    while (pageId != toPage) {
        console.log(pageId, toPage);
        clearTimeout(timeoutId);
        changeClasses(10)
        pageId = tonull(pageId + 1);
    }
}
pointes.forEach(point => {
    point.addEventListener('click', handleClick);
});