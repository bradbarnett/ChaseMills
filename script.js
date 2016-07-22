/**
 * Created by bbarnett on 7/22/2016.
 */

var _clickedRoom,
    _generatedRoom;

function identifyRoom(item) {
    $('#name').html(item);
}

function grabRoom() {
    items = ["Lewando", "Knight", "Crowell", "Green House"]
    var item = items[Math.floor(Math.random() * items.length)];
    _generatedRoom = item;
    identifyRoom(item);
    stopwatch.counter();
}

function checkEntry() {
    if (_clickedRoom == _generatedRoom) {
        alert("WINNER!");
        stopwatch.getCount();
    }
    else {
        alert("keep trying");
    }
}
;

//click on room
$("svg").find("rect").click(function () {
    var clickedRoom = $(this).attr("class");
    _clickedRoom = clickedRoom;
    console.log("clickedRoom: " + _clickedRoom);
    console.log("genRoom: " + _generatedRoom)
    checkEntry();
});

var stopwatch = {
    counter: function(){
        var h1 = document.getElementsByTagName('h1')[0],
            start = $('#generator'),
            stop = document.getElementById('stop'),
            clear = document.getElementById('clear'),
            seconds = 0,
            minutes = 0,
            hours = 0,
            t;

        function add() {
            seconds++;
            if (seconds >= 60) {
                seconds = 0;
                minutes++;
                if (minutes >= 60) {
                    minutes = 0;
                    hours++;
                }
            }
            h1.textContent = (hours ? (hours > 9 ? hours : "0" + hours) : "00") + ":" + (minutes ? (minutes > 9 ? minutes : "0" + minutes) : "00") + ":" + (seconds > 9 ? seconds : "0" + seconds);

            timer();
        }

        function timer() {
            t = setTimeout(add, 1000);
        }

        timer();


        /* Start button */
        start.onclick = timer;

        // /* Stop button */
        // stop.onclick = function () {
        //     clearTimeout(t);
        // }
        //
        // /* Clear button */
        // clear.onclick = function () {
        //     h1.textContent = "00:00:00";
        //     seconds = 0;
        //     minutes = 0;
        //     hours = 0;
        // }


    },
    getCount: function(){
        currentTime = $('#time')[0].textContent;
        console.log(currentTime);
    }
}


