
async function get_save_data(username) {
    console.log("./n/d/" + username + ".moji");
    fetch(`${url}get_save_data/${username}`, {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
            mode: "no-cors",
        },
    })
          .then((response) => {
              if (!response.ok) {
                  throw new Error(`HTTP error! status: ${response.status}`);
              }

              return response.json(); // Assuming the response is in JSON format
          })
          .then((data) => {
              console.log("サーバーからのデータの同期が完了しました。\n" + data);
              exp = data.exp;
              //pl_nokori = data.body.pl_nokori; まだできてなさそう
              tairiku = data.body.tairiku;
              var icon = document.getElementById("SKIN");
              var xs = icon.offsetLeft;
              var ys = icon.offsetTop;
              xs = (data.body.x)
              ys = (data.body.y)
              window.x = data.body.x;
              window.y = data.body.y;
              box_mojimon = data.body.mojimon;
              omo = data.body.bag; // Assuming item is the correct property name
              window.Login = data.user;
          })
          .catch((error) => console.error("Error:", error));
}

  async function GetsaveData(Name) {
    // Retrieve the save_data JSON string from local storage
      let save_data_string = localStorage.getItem("save_data");

      // Convert the JSON string back to an object
      let GetSaveData = JSON.parse(save_data_string);

      console.log(GetSaveData);
      try {
          exp = GetSaveData.exp;
          pl_nokori = GetSaveData.pl_nokori;
          tairiku = GetSaveData.tairiku;
          x = GetSaveData.xy[0]; // Assuming xy is an array
          y = GetSaveData.xy[1]; // Assuming xy is an array
          box_mojimon = GetSaveData.mojimon;
          omo = GetSaveData.item; // Assuming item is the correct property name
          console.info("データを同期しました。");
      } catch (error) {
          console.error("データの同期中にエラーが発生しました。\n" + error);
      }
}

  function save() {
    let save_data = {
        version: "1.0 24c1",
        user: window.Login,
        exp: exp,
        pl_nokori: pl_nokori,
        tairiku: "01",
        xy: [x, y],
        //item:Getitem,まだできていない！
        mojimon: box_mojimon,
        //xp:xp,
    };

    // Convert save_data to a JSON string
      let save_data_string = JSON.stringify(save_data);

      // Save the JSON string to local storage
      localStorage.setItem("save_data", save_data_string);
}
        //保存関数はこれ


   function save_server() {
    var skin = document
            .getElementById("map-desu.")
            .style.transform.match(/\d+/g);
    let savedata = {
        version: "1.29",
        //user: window.Login,
        user: document.getElementById("name").innerHTML,
        exp: exp,
        omo: omo,
        tairiku: "1",
        x: skin[0],
        y: skin[1],
        bag: bag,
        mojimon: box_mojimon,
        //xp:xp,
    };
    let data = {
        //user: window.Login,
        user: document.getElementById("name").innerHTML,
        body: savedata,
        time: String(Date.now()),
    };
    let savewdata = JSON.stringify(data);
    console.log(savewdata);
    try {
        fetch(url + "save", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: savewdata,
        })
              .then((response) => response.json())
              .then((savewdata) => {
                  console.log("Success:", savewdata);
              })
              .catch((error) => {
                  console.error("クライアントエラー:" + error);
              });
    } catch (err) {
        dialog("セーブエラー", "サーバーへの保存が失敗しました。");
        console.error("エラーが発生しました:" + err);
    }
}
      