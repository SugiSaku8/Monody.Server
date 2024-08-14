function StartSinglePlay() {
    document.getElementById("start_window").style.display = "none";
    document.getElementById("map").style.display = "block";
    spawn_mojimon();
    document.getElementById("battle").pause();
    document.getElementById("hajimari").play();
    document.getElementById("sea").style.display = "block";
    setInterval(mojimon_move, 2000)
    //  SetActionKey();
}
      function StartMultiPlay() {
   // dialog("MojimonUpdateService","Carnationによるパブリックマルチプレイサーバーは終了しました。<br>これからは、MojimonMpS(Multi-Play-System)を利用してみんなが作ったサーバーでみんなが遊べるようになります。<br>Carnationでは、現在システムを開発しています。<br>システムが完成するまで、マルチプレイは利用いただけません。<br>ご理解ご了承よろしくお願いします。<br>MpSは、7月後半に利用できるようになる予定です。<br>Carnation Game Studio")
    document.getElementById("battle").pause();
    document.getElementById("hajimari").play();
            document.getElementById("crystalWindow").style.display = "block";

    // SetActionKey();
          /*
          document.getElementById("start_window").style.display = "none";
          get_save_data(window.Login);
          document.getElementById("map").style.display = "block";
          spawn_mojimon();
          get_save_data(window.Login);
          document.getElementById("battle").pause();
          document.getElementById("hajimari").play();
          document.body.style.backgroundColor = "white";
          GetSignUpUserName();
          setInterval(save_server(), 1000);
          // SetActionKey();
          */
}
document.addEventListener("DOMContentLoaded", function() {
    setTimeout(function() {
        var splashScreen = document.getElementById("splash-screen");
        if (splashScreen) {
            splashScreen.style.display = 'none';
        }
    }, 2000);
});

    function stop_game() {
        document.getElementById("modal").style.display = "block";
    }
    function back() {
        document.getElementById("modal").style.display = "none";
    }
    function back_e() {
        document.getElementById("account").style.display = "none";
    }

    document.addEventListener("keydown", function (e) {
        if (e.key === "Escape") {
            var change = document.getElementById("modal");

            if (change.style.display == "block") {
                change.style.display = "none";
            } else {
                change.style.display = "block";
            }
        }
      });

    document.addEventListener("keydown", function (e) {
        if (e.key === "e") {
            var change = document.getElementById("account");

            if (change.style.display == "block") {
                change.style.display = "none";
            } else {
                change.style.display = "block";
            }
        }
      });

document.addEventListener("keydown", function (e) {
    if (e.key === "b") {
        var change = document.getElementById("late");

        if (change.style.display == "block") {
            change.style.display = "none";
        } else {
            change.style.display = "block";
        }
    }
  });


    document.addEventListener("keydown", function (e) {
        if (e.key === "t") {
            var change = document.getElementById("chat_app");

            if (change.style.display == "block") {
                change.style.display = "none";
            } else {
                change.style.display = "block";
            }
        }
      });

    document.addEventListener("keydown", function (e) {
        if (e.key === "z") {
            var change = document.getElementById("zukan");

            if (change.style.display == "block") {
                change.style.display = "none";
                document.removeEventListener("touchmove", disableScroll, {
                    passive: false,
            });
                document.removeEventListener("mousewheel", disableScroll, {
                    passive: false,
            });
            } else {
                change.style.display = "block";
                document.addEventListener("touchmove", disableScroll, {
                    passive: false,
            });
                document.addEventListener("mousewheel", disableScroll, {
                    passive: false,
            });
            }
        }
      });

    document.addEventListener("keydown", function (event) {
        const keyMap = {
            i: "up",
          k: "down",
          j: "left",
          l: "right",
        };

        const direction = keyMap[event.key];
        if (direction) {
            scroll_Set(direction);
        }
      });
    /* document.addEventListener("keydown", function (event) {
        const keyMap = {
            w: "up",
          s: "down",
          a: "left",
          d: "right",
        };

        const direction = keyMap[event.key];
        if (direction) {
            scroll_Set(direction);
        }
      });*/
        let exp = 99999999;
        function update(id, text) {
            document.getElementById(id).innerHTML = text;
        }
      function updata_info() {
            if (lstas === false) {
                document.getElementById("name").innerText = Login; //なんでログインしてないになるの？
            }
          if (lstas === true) {
              document.getElementById("name").innerText = "ログインしていません。";
          }
          //ここは原因不明のバグが起きてるので、修正。
          document.getElementById("pl_nokori").innerText = onmoney;
          document.getElementById("exp").innerText = exp;
        }

    window.addEventListener("DOMContentLoaded", function () {
        //読み込まれたら発動
        document.all.attack.style.display = "none";
        document.all.items.style.display = "none";
        document.getElementById("modoru_button").style.display = "none";
        document.all.setup.style.display = "none";
        document.all.account_touroku_form.style.display = "none";
        document.all.account_login_form.style.display = "none";
        // document.all.Cofb.style.display = "none"
        console.log("load：リソースファイルを全て読み込みました。");
         //document.getElementById("hajimari").play();
    });
        function account_touroku() {
            document.all.setup.style.display = "none";
            document.all.account_touroku_form.style.display = "block";
        }
      function account_login() {
            document.all.setup.style.display = "none";
            document.all.account_login_form.style.display = "block";
        }
  
    function open_attack() {
            //こうげきを開く
        document.getElementById("attack_button").style.display = "none";
        document.getElementById("items_button").style.display = "none";
        document.getElementById("hokaku_button").style.display = "none";
        document.all.attack.style.display = "block";
        document.getElementById("modoru_button").style.display = "block";
        }
        function open_items() {
            //アイテムを開く
            document.getElementById("items_button").style.display = "none";
            document.getElementById("attack_button").style.display = "none";
            document.getElementById("hokaku_button").style.display = "none";
            document.all.items.style.display = "block";
            document.getElementById("modoru_button").style.display = "block";
        }
        function open_hokaku() {
            //ほかく画面を開く
            document.getElementById("hokaku_button").style.display = "none";
            document.getElementById("items_button").style.display = "none";
            document.getElementById("attack_button").style.display = "none";
            document.all.hokaku_gamen.style.display = "block";
            document.getElementById("modoru_button").style.display = "block";
            //漢字にあった熟語を表示させる
            document.getElementById("hokaku_gamen_jukugo").innerHTML =
            teki_result.jukugo;
            var start_time = Date.now();
            /* ページをロードした時にテキストボックスにリスナを登録 */
            var textbox = document.getElementById("hokaku_gamen_text");
            textbox.addEventListener("keydown", enterKeyPress);

            /* テキストボックスでEnterキーが押されたらコンソールに文字を表示 */
            function enterKeyPress(event) {
                if (event.key === "Enter") {
                    if (
                        document.getElementById("hokaku_gamen_text").value ==
                teki_result.yomi
                ) {
                        var end_time = Date.now();
                        document.getElementById("mes").innerHTML = "正解！";
                        var time_dif = end_time - start_time;
                        var tekitou_na_number = Math.random() * 100;
                        if (
                            tekitou_na_number >
                  (time_dif / 500) * (document.getElementById("teki_hp") + 1)
                  ) {
                            alert("つかまえたよ！");
                            console.log(box_mojimon);
                            var push_sitai_yatu =
                    document.getElementById("teki_mojimon").src;
                            teki_mojimon_kakou = teki_mojimon_syutoku.substr(
                                push_sitai_yatu.indexOf("#") + 1,
                                );
                            console.log([teki_mojimon_syutoku, teki_mojimon_kakou]);
                            teki_mojimon = decodeURI(teki_mojimon_kakou);
                            box_mojimon.push(teki_mojimon);
                            check_mojimon_tairyoku();
                        } else {
                            alert("つかまえるのに失敗したよ！");
                            check_mojimon_tairyoku();
                        }
                    } else {
                        document.getElementById("mes").innerHTML = "ちがいます！";
                    }
                }
            }
        }
        function modoru() {
            //もどる
            document.getElementById("modoru_button").style.display = "none";
            document.all.attack.style.display = "none";
            document.all.items.style.display = "none";
            document.all.hokaku_gamen.style.display = "none";
            document.getElementById("attack_button").style.display = "block";
            document.getElementById("items_button").style.display = "block";
            document.getElementById("hokaku_button").style.display = "block";
        }

