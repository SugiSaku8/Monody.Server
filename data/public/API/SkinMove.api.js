
    var icon = document.getElementById("map-desu.");
    icon.addEventListener('mousewheel' , function(e){
        e.preventDefault();
});
    var skin = document.getElementById("skinContainer");
    skin.style.transform = 'translate( $(window).width() / 2 - skin.width / 2 + "px" , $(window).height() / 2 - skin.height / 2 + "px" )'

    var speed = 5; // Changed from  64 to  5
    var xs = icon.offsetLeft;
    var ys = icon.offsetTop;
if(window.x != undefined) {
    xs = -(window.x);
    ys = -(window.y);
}
    var keysPressed = {};
    var isAnimating = false;
    var requestID;

    document.addEventListener("keydown", function (e) {
            keysPressed[e.key] = true;
    if (!isAnimating) {
        animateIcon();
    }
          });

    document.addEventListener("keyup", function (e) {
            delete keysPressed[e.key];
    if (Object.keys(keysPressed).length === 0 && isAnimating) {
        cancelAnimationFrame(requestID);
        isAnimating = false;
    }
          });

    function animateIcon() {
            isAnimating = true;
    updatePosition();
    requestID = requestAnimationFrame(animateIcon);
    }

    function updatePosition() {
        var dx = 0;
        var dy = 0;
        if (keysPressed["w"] && ys < -20) {
                dy += speed;
                for(var i = 1; i<11; i++) {
                        var item = document.getElementById(`mojimon_spawn${i}`);
                        var dy2 = speed;
                        item.style.top = Number(item.style.top.replace(/px/g, '')) + dy2 + "px";
                }
        }
        if (keysPressed["s"] && ys > -3820 + $(window).height()) {
                dy -= speed;
                for(var i = 1; i<11; i++) {
                        var item = document.getElementById(`mojimon_spawn${i}`);
                        var dy2 = -(speed);
                        item.style.top = Number(item.style.top.replace(/px/g, '')) + dy2 + "px";
                }
        }
        if (keysPressed["a"] && xs < -20) {
                dx += speed;
                for(var i = 1; i<11; i++) {
                        var item = document.getElementById(`mojimon_spawn${i}`);
                        var dx2 = speed;
                        item.style.left = Number(item.style.left.replace(/px/g, '')) + dx2 + "px";
                }
        }
        if (keysPressed["d"] && xs > -5100 + $(window).width()) {
                dx -= speed;
                for(var i = 1; i<11; i++) {
                        var item = document.getElementById(`mojimon_spawn${i}`);
                        var dx2 = -(speed);
                        item.style.left = Number(item.style.left.replace(/px/g, '')) + dx2 + "px";
                }
        }
        xs += dx;
        ys += dy;
        // Apply the new position to the icons using stransform
        icon.style.transform = `translate(${xs}px, ${ys}px)`;
    }
    function mojimon_move() {
        for(var i = 1; i < 11; i++) {
          random_move(i);
        }
    }
    function random_move(i) {
            var item = document.getElementById(`mojimon_spawn${i}`);
                var random_x;
                var random_y;
                while(!(random_x - xs > 20 && random_x - xs < 5100 - 32) && !(random_y - ys > 20 && random_y - ys < 3820 -32)) {
                    var random_x1 = Math.floor(Math.random() * 200 - 50);
                    var random_y1 = Math.floor(Math.random() * 200 - 50);
                    random_x = Number(item.style.left.replace(/px/g,'')) + random_x1;
                    random_y = Number(item.style.top.replace(/px/g,'')) + random_y1;
                }
                item.style.left = random_x + "px";
                item.style.top = random_y + "px";
    }
    function MOVE(movexy) {
            var dx = 0;
            var dy = 0;
            if (movexy === "TOP") dy += speed;
            if (movexy === "BACK") dy -= speed;
            if (movexy === "LEFT") dx += speed;
            if (movexy === "RIGHT") dx -= speed;
            xs += dx;
            ys += dy;
            // Apply the new position to the icons using stransform
            icon.style.transform = `translate(${xs}px, ${ys}px)`;
            }
    
    function fadeIn(element) {
            var op = 0.1; // initial opacity
            element.style.display = "block";
            var timer = setInterval(function () {
                if (op >= 1) {
                    clearInterval(timer);
                }
              element.style.opacity = op;
                element.style.filter = "alpha(opacity=" + op * 100 + ")";
                op += op * 0.1;
                }, 30);
            }

    function fadeOut(element) {
            var op = 1; // initial opacity
            var timer = setInterval(function () {
                if (op <= 0.1) {
                    clearInterval(timer);
                    element.style.display = "none";
                }
              element.style.opacity = op;
                element.style.filter = "alpha(opacity=" + op * 100 + ")";
                op -= op * 0.1;
                }, 10);
            }

    const map = {
            view: function () {
                console.log("map = view ");
                var element = document.getElementById("map");
                fadeIn(element);
                },
            hide: function () {
                console.log("map = hide");
                var element = document.getElementById("map");
                fadeOut(element);
                },
          };

    function open_battle(num) {
            var sea = document.getElementById("sea");
            fadeOut(sea);
            var mapElement = document.getElementById("map");
            fadeOut(mapElement);
            document.getElementById("battle").play();
            document.getElementById("hajimari").pause();
            var battleElement = document.getElementById("main_battle");
            fadeIn(battleElement);
            getData(num);
            }

    function open_trihiki() {
            var mapElement = document.getElementById("map");
            fadeOut(mapElement);
            var trihikiElement = document.getElementById("trihiki");
            fadeIn(trihikiElement);
            torihiki_start();
            }

    function end_trihiki() {
            var torhiki_element = document.getElementById("trihiki");
            fadeOut(torhiki_element);
            var maplement = document.getElementById("map");
            fadeIn(maplement);
            }
    let on_ima = 0;
    let in_ima = 0;