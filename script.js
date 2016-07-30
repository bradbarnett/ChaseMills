/**
 * Created by bbarnett on 7/22/2016.
 */

var _username,
    _triesRemaining = 3,
    _roomsRemaining = 10,
    _highScore,
    _status = "play",
    _roundTime,
    _finalTime,
    _clickedRoom,
    _generatedRoom;


function identifyRoom(item) {
    $('#name').html(item);
}

function startGame() {
    grabRoom();
    stopwatch.counter();
}

function grabRoom() {
    items = ["Lewando", "Knight", "Crowell", "Green House"];
    var item = "cleared";
    var item = items[Math.floor(Math.random() * items.length)];
    _generatedRoom = item;
    identifyRoom(item);
    console.log(item);
}

function checkEntry() {
    if (_clickedRoom == _generatedRoom) {
        stopwatch.getTime();
        scores.updateScore();
        _roomsRemaining--;
        grabRoom();
    }
    else {
        alert("keep trying");
        _triesRemaining--;
        console.log(_triesRemaining);
        // _triesRemaining > 1 ? scores.finalScore() : scores.updateScore();
    }
}
;

//click on room
$("svg").find("rect").click(function () {
    var clickedRoom = $(this).attr("class");
    _clickedRoom = clickedRoom;
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

            switch (_status) {
                case "play":
                    timer();
                    break;
                case "pause":
                    pauseTimer();
            }
        }

        function timer() {
            t = setTimeout(add, 1000);
        }

        timer();


        /* Start button */
       function pauseTimer() {
                clearTimeout(t);
            }
        //
        // /* Clear button */
        // clear.onclick = function () {
        //     h1.textContent = "00:00:00";
        //     seconds = 0;
        //     minutes = 0;
        //     hours = 0;
        // }


    },
    getTime: function(){
        roundTime = $('#time')[0].textContent;
        console.log(roundTime);
        _roundTime = roundTime;
    }
}





