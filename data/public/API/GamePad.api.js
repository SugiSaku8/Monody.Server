    function scroll(direction) {
        switch (direction) {
    case "up":
        window.scrollBy(0, -5); //  上に10pxスクロール
            break;
            case "down":
                window.scrollBy(0, 5); //  下に10pxスクロール
            break;
            case "left":
                window.scrollBy(-5, 0); //  左に10pxスクロール
            break;
            case "right":
                window.scrollBy(5, 0); //  右に10pxスクロール
            break;
            default:
                console.log("Invalid direction");
}
      }

    function scroll_Set(direction) {
        const scrollAmount = 50; // Adjust the scroll amount as needed

        switch (direction) {
            case "up":
                window.scrollBy({
              top: -scrollAmount,
              left: 0,
              behavior: "smooth",
            });
                break;
                case "down":
                    window.scrollBy({ top: scrollAmount, left: 0, behavior: "smooth" });
                    break;
                    case "left":
                        window.scrollBy({
              top: 0,
              left: -scrollAmount,
              behavior: "smooth",
            });
                        break;
                        case "right":
                            window.scrollBy({ top: 0, left: scrollAmount, behavior: "smooth" });
                            break;
                            default:
                                console.log("Invalid direction");
        }
      }

    function TURE() {
        console.log("TRUE");
        }
    function ACTION(num) {
        console.log(num);
        }
    let gamepad;
    window.addEventListener("gamepadconnected", function (e) {
        gamepad = e.gamepad;
        dialog(
            "Monodyシステム",
          `ゲームパット:${gamepad.id}が接続されました。`,
          );
        shock(200, 3); // Vibrate  200ms three times on connect
      });
    function initGameController() {
        gameControl.on("connect", function (gamepad) {
            // Disconnect event
            gamepad.on("disconnect", function () {
                console.log("ゲームパッドとの通信が切断されました");
            });

            // Button evenhandlers
            gamepad.on("select", function () {
                toggleElementDisplay("modal");
            });

            gamepad.on("start", function () {
                dialog("ようこそ", "ようこそMonodyへ。");
            });

            gamepad.on("power", function () {
                dialog(
                    "MonodyDeviceManager:GamePadAPI",
                    `現在接続されているゲームパット:${gamepad.id}です。`,
                    );
            });

            gamepad.on("button3", function () {
                toggleElementDisplay("account");
            });

            gamepad.on("button1", function () {
                document.dispatchEvent(
                    new KeyboardEvent("keydown", { key: "Enter" }),
                    );
            });

            gamepad.on("button0", function () {
                toggleElementDisplay("modal");
            });

            gamepad.on("button2", function () {
                dialog("MojimonAPIについて", "MojimonAPIはサポートされていません");
            });

            gamepad.on("r1", function () {
                MOVE("RIGHT");
            });

            gamepad.on("l1", function () {
                MOVE("LEFT");
            });

            gamepad.on("r2", function () {
                ACTION(2);
            });

            gamepad.on("l2", function () {
                ACTION(3);
            });

            // Direction event handlers
            gamepad.on("up1", function () {
                MOVE("TOP");
            });

            gamepad.on("down1", function () {
                MOVE("BACK");
            });

            gamepad.on("right1", function () {
                MOVE("RIGHT");
            });

            gamepad.on("left1", function () {
                MOVE("LEFT");
            });

            gamepad.on("up0", function () {
                scroll("up");
            });
            gamepad.on("down0", function () {
                scroll("down");
            });
            gamepad.on("right0", function () {
                scroll("right");
            });
            gamepad.on("left0", function () {
                scroll("left");
            });
            gamepad.on("button12", function () {
                MOVE("TOP");
            });

            gamepad.on("button13", function () {
                MOVE("BACK");
            });

            gamepad.on("button15", function () {
                MOVE("RIGHT");
            });

            gamepad.on("button14", function () {
                MOVE("LEFT");
            });
        });
      // Custom function to toggle display of elements
        function toggleElementDisplay(elementId) {
            var element = document.getElementById(elementId);
            element.style.display =
            element.style.display === "block" ? "none" : "block";
        }

        // Start polling for game controller state
        updateGamepad();
        }

    function updateGamepad() {
        requestAnimationFrame(updateGamepad); // Next frame update
      }

    // Function to trigger a custom vibration pattern
    function shock(periodMillis, repetitions) {
        const pattern = [];
      for (let i = 0; i < repetitions; i++) {
          pattern.push({
            duration: periodMillis,
            strongMagnitude: 1,
            weakMagnitude: 1,
          });
          pattern.push({
            duration: periodMillis,
            strongMagnitude: 0,
            weakMagnitude: 0,
          });
      }
        navigator.vibrate(pattern);
      }

    // Initialize the game controller when the window loads
    window.onload = function () {
        initGameController();
      };