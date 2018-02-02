let images = {
    'easy': ['cake.gif', 'caterpillar.gif', 'christmas-tree.gif', 'duck.gif', 'elephant.png'],
    'medium': ['boat.gif', 'frog.gif', 'rocket.gif', 'train.gif', 'whale.gif'],
    'hard': ['fish-bowl.jpg', 'horse.gif', 'scarecrow.gif']
};

let state = {
    'color': 'blue',
    'level': 'easy'
}

let colors = $('#dropdown-colors').click(function (event) {
    state.color = event.target.innerText;
});

let levels = $('#dropdown-levels').click(function (event) {
    console.log(event.target.innerText.toLowerCase());
    state.level = event.target.innerText.toLowerCase();
});


$('#generate-img').click(function (event) {

    // select canvas
    let ctx = $('canvas')[0].getContext('2d');
    var lod = state.level.toLowerCase;
    if (state.level === 'medium') {
        lod = 'medium';
    } else if (state.level === 'hard') {
        lod = 'hard';
    }
    // get random index to access from array for each level

    let randomIndex = Math.floor(Math.random() * images[lod].length);

    // generate path for image
    var src = "images/" + lod + "/" + images[lod][randomIndex];

    var img = new Image();
    img.onload = function () {
        ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);

        let ctxWidth = $('canvas')[0].scrollWidth; // does not get width from CSS
        let ctxHeight = $('canvas')[0].scrollHeight; // does not get height from CSS
        var imgWidth = 167.5;
        var imgHeight = 205;
        var startX = 90;
        var startY = 40;

        // scale image differently depending on canvas width
        if (ctxWidth === 508) {
            imgWidth = 230;
            imgHeight = 281;
            startX = 60;
            startY = 10;
        } else if (ctxWidth === 688) {
            imgWidth = 240;
            imgHeight = 294;
            startX = 50;
            startY = 0;
        } else if (ctxWidth === 948) {
            imgWidth = 240;
            imgHeight = 294;
            startX = 50;
            startY = 0;
        }
        ctx.drawImage(img, startX, startY, imgWidth, imgHeight);
    }
    img.src = src;
});

