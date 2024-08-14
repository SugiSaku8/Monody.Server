
    let bag_UI = document.getElementById("inventory");
    let bag = {}; //バッグの内容
    function bag_open() {
        bag_UI.style.display = "block";
    }
    function bag_close() {
        bag_UI.style.display = "none";
    // document.getElementById("bag_button").style.display = "block";
      }
    const fbag = {
        add: function (type, item, count) {
          if (type === "item") {
              let cell = bag_UI.insertRow().insertCell();
              cell.id = "cell";
              cell.innerHTML += `<img src="/img/${type}/${item}.png" alt="${item}">`;
          }
          if (type === "mojimon") {
              let cell = bag_UI.insertRow().insertCell();
              cell.id = "cell";
              cell.innerHTML += `<img src="/img/Mojimon.svg#${item}" alt="${item}">`;
          }
        },
      };