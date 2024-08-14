function setup() {
    if (window.lstas === false) {
        console.log("Ahlogは無効です。");
        document.getElementById("battle").pause();
        document.getElementById("hajimari").play();
        document.getElementById("start_window").style.display = "none";
        document.getElementById("setup").style.display = "block";
        document.all.account_touroku_form.style.display = "none";
        document.all.account_login_form.style.display = "none";
        spawn_mojimon();
        get_save_data(window.Login);
        //あ、こいつのせいでログイン保持ができないんだ。
    } else {
        console.log("Ahlgが実行されました。");
        window.Login = window.name;
        login_status = true;
        document.getElementById("start_window").style.display = "block";
        get_save_data(window.Login);
        document.getElementById("result").innerText =
            "ログインに成功しました。";
        document.getElementById("account_login_form").style.display = "none";
    }
    setUsername(window.Login);
}
    