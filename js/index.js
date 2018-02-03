'use strict';

let images = {
    'easy': ['cake.gif', 'caterpillar.gif', 'christmas-tree.gif', 'duck.gif', 'elephant.png'],
    'medium': ['boat.gif', 'frog.gif', 'rocket.gif', 'train.gif', 'whale.gif'],
    'hard': ['fish-bowl.jpg', 'horse.gif', 'scarecrow.gif']
};

let state = {
    'color': 'blue',
    'level': 'easy',
    'mouseState': ''
}

$(function () {
    adjustCanvasSize();
});


$('#dropdown-colors').click(function (event) {
    state.color = event.target.innerText;
    changeColorStatus();
});

$('#dropdown-levels').click(function (event) {
    state.level = event.target.innerText.toLowerCase();
    changeLevelStatus();
});

$('#red-btn, #green-btn, #blue-btn, #purple-btn, #gold-btn, #brown-btn').click(function (event) {
    state.color = event.target.innerText;
    changeColorStatus();
});

$('#easy-btn, #medium-btn, #hard-btn').click(function (event) {
    state.level = event.target.innerText.toLowerCase();
    changeLevelStatus();
});

$('#generate-img').click(function (event) {

    // select canvas
    let ctx = $('canvas')[0].getContext('2d');
    var lod = state.level;

    // get random index to access from array for each level
    let randomIndex = Math.floor(Math.random() * images[lod].length);

    // generate path for image
    var src = "images/" + lod + "/" + images[lod][randomIndex];

    var img = new Image();
    img.onload = function () {
        ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);

        let ctxWidth = canvas.width; // does not get width from CSS
        let ctxHeight = canvas.height; // does not get height from CSS
        var imgWidth = 167.5;
        var imgHeight = 205;
        var startX = 90;
        var startY = 40;

        // scale image differently depending on canvas width
        if (ctxWidth === 550) {
            imgWidth = 260;
            imgHeight = 318;
            startX = 160;
            startY = 40;
        } else if (ctxWidth === 700) {
            imgWidth = 350;
            imgHeight = 428;
            startX = 190;
            startY = 30;
        } else if (ctxWidth === 850) {
            imgWidth = 400;
            imgHeight = 489;
            startX = 210;
            startY = 30;
        } else if (ctxWidth === 950) {
            imgWidth = 450;
            imgHeight = 550;
            startX = 240;
            startY = 30;
        }
        ctx.drawImage(img, startX, startY, imgWidth, imgHeight);

    }
    img.src = src;
});


let canvas = document.querySelector('canvas');
let ctx = canvas.getContext('2d');


$(window).resize(function () {
    adjustCanvasSize();
});

function adjustCanvasSize() {
    let canvas = document.querySelector('canvas');
    let window_width = $(window).width();

    if (window_width < 576) {
        canvas.width = 350;
        canvas.height = 300;
    } else if (window_width >= 576 && window_width < 768) {
        canvas.width = 550;
        canvas.height = 400;
    } else if (window_width >= 768 && window_width < 992) {
        canvas.width = 700;
        canvas.height = 500;
    } else if (window_width >= 992 && window_width < 1200) {
        canvas.width = 850;
        canvas.height = 600;
    } else if (window_width >= 1200) {
        canvas.width = 950;
        canvas.height = 700;
    }
}

canvas.addEventListener('mousedown', function (event) {
    state.mouseState = 'mouseDown';
    ctx.strokeStyle = state.color;
    let canvasOffset = $('canvas').offset();
    ctx.moveTo((event.clientX - canvasOffset.left), (event.clientY - canvasOffset.top));

    // begin path
    ctx.beginPath();
});

canvas.addEventListener('mousemove', function (event) {
    if (state.mouseState === 'mouseDown') {
        ctx.lineWidth = 2;
        let canvasOffset = $('canvas').offset();
        ctx.lineTo((event.clientX - canvasOffset.left), (event.clientY - canvasOffset.top));
        ctx.stroke();
    }
});


canvas.addEventListener('mouseup', function () {
    state.mouseState = "mouseUp";
    ctx.closePath();
});


function changeColorStatus() {

    $('#status-color').text(capitalize(state.color));
}

function changeLevelStatus() {
    $('#status-level').text(capitalize(state.level));
}

// found on stack overflow
function capitalize(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
}