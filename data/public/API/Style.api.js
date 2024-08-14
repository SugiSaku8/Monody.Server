
    function background() {
          img = new Array();
    img[0] = "./img/back/9sea.jpg";
    img[1] = "./img/back/backs.jpg";
    img[2] = "./img/back/Caldera.jpg";
    img[3] = "./img/back/capetuna.jpg";
    img[4] = "./img/back/gake.jpg";
    img[5] = "./img/back/LastSea.jpg";
    img[6] = "./img/back/snow.jpg";
    n = Math.floor(Math.random() * img.length);
    var randomImage = (document.getElementById(
        "start_window",
        ).style.background = "url(" + img[n] + ")");
    var randomImages = (document.getElementById(
        "account_touroku_form",
        ).style.background = "url(" + img[n] + ")");
    var randomImagess = (document.getElementById(
        "account_login_form",
        ).style.background = "url(" + img[n] + ")");
    var randomImagesss = (document.getElementById(
        "setup",
        ).style.background = "url(" + img[n] + ")");
    }
    window.addEventListener("load", background);