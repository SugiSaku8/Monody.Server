async function loginUser(name, password) {
    event.preventDefault(); // ページのリロードを防ぐ
    try {
        const response = await fetch(
            "/get?name=" +
              encodeURIComponent(name) +
              "&password=" +
              encodeURIComponent(password),
              );
        if (!response.ok) {
            throw new Error("アカウント名が違います。");
        }
        const data = await response.json();
        if (data.isMatch) {
            console.log("data=isMatch!");
            let namess = document.getElementById("searchName").value;
                document.getElementById("name").innerHTML = namess;
            window.Login = name;
            //window.Login = document.getElementById("searchName").value;
            console.log(window.Login);
            window.name = window.Login;
            window.login_status = true;
            document.getElementById("result").innerText =
              "ログインに成功しました。";
            document.getElementById("start_window").style.display = "block";
            get_save_data(window.Login);
            document.getElementById("result").innerText =
              "ログインに成功しました。";
            document.getElementById("account_login_form").style.display =
              "none";
            window.Login = Login;
            var playElements = document.getElementsByClassName("play");
            for (var i = 0; i < playElements.length; i++) {
                playElements[i].style.display = "block";
            }
            var startElements = document.getElementsByClassName("start");
            for (var j = 0; j < startElements.length; j++) {
                startElements[j].style.display = "none";
            }
        } else {
            throw new Error("パスワードが違います。");
        }
    } catch (error) {
        document.getElementById("result").innerText =
            "Error: " + error.message;
    }
}
