var socket = io('/client');

socket.on('playerColor', function(color){
    console.log(color);
    changeButtonControllerColor(color);
    changeSwipeControllerColor(color);

});



$('#swipeButton').click(function () {
    socket.emit('registerUser');

    $('#controllerPicker').hide();
    $('#controlerContainer').hide();
    $('#swipeController').show();
});

$('#buttonButton').click(function () {
    socket.emit('registerUser');

    $('#controllerPicker').hide();
    $('#swipecontrolerContainer').hide();
    $('#buttonController').show();
});

//function buttonClicked(value){
//   socket.emit('controller',value);
//}

function changeUp(value) {
    return value;
}

function changeRight(value) {
    var direction = "Right";
    if (value === "Left") {
        direction = "Up";
    } else {
        direction = "Down";
    }
    return direction;
}

function changeLeft(value) {
    var direction = "Left";
    if (value === "Left") {
        direction = "Down";
    } else {
        direction = "Up";
    }
    return direction;
}

function changeDown(value) {
    var direction = "Down";
    if (value === "Left") {
        direction = "Right";
    } else {
        direction = "Left";
    }
    return direction;
}


function changeDirection(value) {
    var direction = "elsewhere";

    if (value === "swipeup") {
        direction = "Up";

    } else if (value === "swiperight") {
        direction = "Right";
    } else if (value === "swipedown") {
        direction = "Down";
    } else if (value === "swipeleft") {
        direction = "Left";
    }

    return direction;


}

function buttonClicked(value) {

    var direction = $('#top').text();

    if (direction === "Choose a direction left or right!") {
        var value = changeUp(value);
        $('#top').text(value);
        socket.emit('changeDirection', value);
        return;
    }
    if (direction === "Up") {
        var value = changeUp(value);
        $('#top').text(value);
        socket.emit('changeDirection', value);
        return;
    }

    if (direction === "Right") {
        var value = changeRight(value);
        $('#top').text(value);
        socket.emit('changeDirection', value);
        return;
    }

    if (direction === "Left") {
        var value = changeLeft(value);
        $('#top').text(value);
        socket.emit('changeDirection', value);
        return;
    }

    if (direction === "Down") {
        var value = changeDown(value);
        $('#top').text(value);
        socket.emit('changeDirection', value);
        return;
    }


}

function changeButtonControllerColor(value){

    var leftButton = document.getElementById( 'left' );
    var rightButton = document.getElementById( 'right' );
    var top=document.getElementById( 'top' );


    leftButton.style.backgroundColor = value;
    rightButton.style.backgroundColor = value;
    top.style.backgroundColor = getLighterColor(value, 25);
    leftButton.style.color=getLighterColor(value, -25);
    rightButton.style.color=getLighterColor(value, -25);
    top.style.color=value;

    leftButton.style.borderColor=getLighterColor(value, -25);
    rightButton.style.borderColor=getLighterColor(value, -25);
    top.style.borderColor=getLighterColor(value, -25);


}

function changeSwipeControllerColor(value){

    var swipeController = document.getElementById('background');
    var myElement = document.getElementById('myElement');
    swipeController.style.backgroundColor=value;
    var direction = document.getElementById( 'direction' );
    direction.style.color=getLighterColor(value, 25);
    myElement.style.color= getLighterColor(value,25);
}

function getLighterColor(color, percent) {
    var num = parseInt(color.slice(1), 16), amt = Math.round(2.55 * percent), R = (num >> 16) + amt, G = (num >> 8 & 0x00FF) + amt, B = (num & 0x0000FF) + amt;
    return "#" + (0x1000000 + (R < 255 ? R < 1 ? 0 : R : 255) * 0x10000 + (G < 255 ? G < 1 ? 0 : G : 255) * 0x100 + (B < 255 ? B < 1 ? 0 : B : 255)).toString(16).slice(1);
}

$(function () {

    var options = {
        preventDefault: true
    };


// create a simple instance
// by default, it only adds horizontal recognizers
    var mc = new Hammer(myElement, options);

// let the pan gesture support all directions.
// this will block the vertical scrolling on a touch-device while on the element
    mc.get('swipe').set({direction: Hammer.DIRECTION_ALL, treshold: 0, pointers: 1})


// listen to events...
    mc.on("swipeleft swiperight swipeup swipedown", function (ev) {


        myElement.textContent = ev.type + " gesture detected.";
        var direction2 = ev.type;



            console.log(direction);

            socket.emit("changeDirection", direction);

        if(ev.type==="swipeleft"){
            $(".glyphicon-menu-left").show();
            $(".glyphicon-menu-right").hide();
            $(".glyphicon-menu-down").hide();
            $(".glyphicon-menu-up").hide();

        }
        if(ev.type==="swiperight"){
            $(".glyphicon-menu-right").show();
            $(".glyphicon-menu-left").hide();
            $(".glyphicon-menu-down").hide();
            $(".glyphicon-menu-up").hide();
        }if(ev.type==="swipedown"){
            $(".glyphicon-menu-down").show();
            $(".glyphicon-menu-right").hide();
            $(".glyphicon-menu-left").hide();
            $(".glyphicon-menu-up").hide();
        }if(ev.type==="swipeup"){
            $(".glyphicon-menu-up").show();
            $(".glyphicon-menu-down").hide();
            $(".glyphicon-menu-right").hide();
            $(".glyphicon-menu-left").hide();

        }

        if (ev.isFinal) {
            var direction = changeDirection(direction2);
            socket.emit("changeDirection", direction);
        }
    });


});



$(function () {


    var myElement = document.getElementById('myElement');

    var leftDirection= document.getElementById('left');
    var rightDirection= document.getElementById('right');


    var left=leftDirection.getAttribute("value");
    var right=rightDirection.getAttribute("value");

    $("#left").click(function() {
        buttonClicked(left);
    });

    $('#right').click(function() {
        buttonClicked(right);
    });
});



