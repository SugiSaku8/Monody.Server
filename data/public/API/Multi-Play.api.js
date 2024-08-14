  //デプロイする時URL短縮をアップデートすることを忘れないこと。urlはありません:)
      let userId;
      let name_list;
      async function updateServerVariable(name, x, y, status) {
        //req.bodyの型じゃない説ある
        let LivePositions = { name, x, y, status };
        try {
          let response = await fetch(
            "https://e4aa0edf-44a5-4534-bcf2-f5bd5ff79088-00-nrv22tf81lf6.kirk.replit.dev/sendxy",
            {
              mode: "cors", //CORSがでないのも怪しい
              method: "POST",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify(LivePositions),
            },
          );
          if (!response.ok) {
            if (response.status === 409) {
              // Handle  409 Conflict specifically
              console.warn("Conflict detected, please resolve and retry.");
              // Add logic to resolve the conflict or retry if needed
            } else {
              throw new Error(`HTTP error! status: ${response.status}`);
            }
          } else {
            // console.log("The server has been updated successfully.");
          }
        } catch (error) {
          console.error(
            "There was a problem updating the server variable:",
            error,
          );
        }
      }
      function AddOnlineUserSkin(user, x, y) {
        /*   console.log(
          `オンラインスキンを設定します。\n情報:ユーザー名:${user}\nx:${x}\ny:${y}`,
        );*/
        // Create a new div element (container)
        let container = document.createElement("div");
        container.className = "User_contena"; // You might want to add a class here for styling
        container.id = user;
        // Create an image element
        let img = document.createElement("img");
        img.src = "skin.webp";
        img.alt = user;
        img.id = user;

        // Create a text element
        let textDiv = document.createElement("div");
        textDiv.className = "text";
        textDiv.textContent = user;

        // Append the image and text to the container
        container.appendChild(img);
        container.appendChild(textDiv);

        // Get the element with the ID "CofBmap"
        let mapElement = document.getElementById("CofBmap");

        // Append the container to the CofBmap element
        if (mapElement) {
          mapElement.appendChild(container);

          // Set the position of the container dynamically (example: x=100, y=200)
          // Note: Since you're using JavaScript, you cannot directly set the x and y coordinates like you would with CSS.
          // You may need to adjust the style properties or use absolute positioning with top and left.
          container.style.position = "absolute";
          container.style.top = `${y}px`;
          container.style.left = `${x}px`;
        } else {
          console.error("CofMapエレメントがありません。");
        }
      }
      function placeDiv(x_pos, y_pos) {
        containers.style.position = "absolute";
        containers.style.left = x_pos + "px";
        containers.style.top = y_pos + "px";

        // 指定された座標にコンテナを配置
        placeDiv(x, y); // x=100, y=200にコンテナを配置
        console.log("正しくオンラインスキンが配置されました。");
      }

      function updata_multi_sukin(UserList) {
        let containers = document.querySelectorAll(".User_contena");
        containers.forEach((container) => container.remove());
        UserList.forEach((UserList) => {
          // Skip null entries
          if (UserList === null) return;
          fetch(`https://mojimon.onrender.com/positions/${UserList}`, {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              mode: "no-cors",
            },
          })
            .then((response) => {
              if (!response.ok) {
                if (response.status === 409) {
                  // Handle  409 Conflict specifically
                  console.warn("Conflict detected, please resolve and retry.");
                  // Add logic to resolve the conflict or retry if needed
                } else {
                  throw new Error(`HTTP error! status: ${response.status}`);
                }
              }
              return response.json(); // Assuming the response is in JSON format
            })
            .then((positions) => {
              console.log(
                "Positions retrieved successfully:",
                positions.status,
              );
              if (positions.status && UserList !== window.Login) {
                AddOnlineUserSkin(UserList, positions.x, positions.y);
                updateServerVariable(Login, positions.x, positions.y, true);
                //来たら教えて。
              }
            })
            .catch((error) => console.log("Error:", error));
        });
      }

      function GetSignUpUserName() {
        fetch("https://mojimon.onrender.com/names")
          .then((response) => {
            if (!response.ok) {
              throw new Error(`HTTP error! status: ${response.status}`);
            }
            return response.json(); // This returns a Promise that resolves with the result of parsing the body text as JSON
          })
          .then((data) => {
            name_list = data; // Assuming the endpoint returns an array of names
            console.log("なんか届いたよー : " + name_list); // Log the names to the console
            setInterval(function () {
              //COP_save();
              updata_multi_sukin(name_list); //YES。
            }, 100);
          })
          .catch((error) => {
            console.error(
              "There was a problem with the fetch operation:",
              error,
            );
          });
      }

      function COP_save() {
        try {
          var skin = document
            .getElementById("SKIN")
            .style.transform.match(/\d+/g);
          let data_cop = {
            username: Login,
            x: skin[0],
            y: skin[1],
            time: Date.now(),
          };
          // Using XMLHttpRequest
          //const xhr = new XMLHttpRequest();
          //xhr.open("POST", url + "COP_save"); // Assuming /save is the endpoint on your server
          //xhr.setRequestHeader("Content-Type", "application/json");
          //xhr.send(JSON.stringify(data_cop));
        } catch (err) {
          console.log(err);
        }
      }