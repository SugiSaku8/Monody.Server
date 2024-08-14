    const form = document.getElementById("message_form");
    const input = document.getElementById("message_input");
    const chatHistoryDiv = document.getElementById("message_list");
    let timeline = [];
    // Update the message sending function to include the username
    form.addEventListener("submit", (e) => {
        e.preventDefault();
    if (input.value && Login) {
        sendMessage(Login, input.value, Date.now());
        input.value = "";
    } else if (!username) {
        dialog("チャット", "ログインしてからチャットを行ってください。");
    } else if (!input.value) {
        dialog("チャット", "空白のスレッドを投稿することはできません。");
    }
      });
    // Updated sendMessage function to include the username
    async function fetchChatHistory() {
        try {
        const response = await fetch(
            "https://mojimon.onrender.com/chathistory",
            );
        const messages = await response.json();

        // Assuming `timeline` is an array that stores the chat history
          messages.forEach((msg) => {
              // Check if the timeline does not already include a message with the same time
            if (!timeline.includes(msg.time)) {
                addMessageToHistory(msg.message, msg.username, "Friends");
                // Add the message to the timeline to prevent duplicates
              timeline.push(msg.time);
            }
          });
    } catch (error) {
        console.error("チャット取得中にエラーが発生しました:", error);
    }
      }
    function sendMessage(username, message, time) {
         if (message.startsWith('/')) {
                 var regex = "/";
                 // マッチした全ての"/"を空文字列に置換する
                 var replacedcommand = message.replace(regex, '');
             let returner = command(replacedcommand);
             if(returner === message.startsWith('E')){
                 dialog("エラー", returner);
             }
          } else {
             console.log(
                 `このメッセージを送信します\nユーザー:${username}\nメッセージ:${message}`,
                 );
             event.preventDefault();
             fetch("/sendmessage", {
                 method: "POST",
                 headers: {
                     "Content-Type": "application/json",
                 },
                 body: JSON.stringify({
                     username: username,
                     message: message,
                     time: time,
                 }),
             })
               .then((response) => {
                   if (!response.ok) {
                       throw new Error(`HTTPエラー。<br>HTTPコード: ${response.status}`);
                   }
                   return response.json();
               })
               .then((data) => {
                   addMessageToHistory(data.message, Login, "me");
                   timeline.push(time);
               })
               .catch((error) => {
                   if ((error.status = 614)) {
                       dialog(
                           "チャット:CWD",
                           `チャットの送信中にエラーが発生しました。<br>__________<br>悪口が含まれている可能性があります。<br>入力内容を確認してください。<br>__________<br>これが何度も表示される場合は、管理者にお問い合わせください。`,
                           );
                   } else {
                       dialog(
                           "チャット",
                           `チャットの送信中にエラーが発生しました。<br>__________<br>不明なエラー<br>__________<br>これが何度も表示される場合は、管理者にお問い合わせください。`,
                           );
                   }
               });
         }
    }

    function addMessageToHistory(message, user, type) {
        //改行
        let brs = document.createElement("br");
        chatHistoryDiv.appendChild(brs);
        //

        let userElement = document.createElement("span");

        if (type === "me") {
            userElement.id = "me_user";
        } else {
            userElement.id = "other_user";
        }
        userElement.textContent = user;
        chatHistoryDiv.appendChild(userElement);
        //↑名前
        let br = document.createElement("br");
        chatHistoryDiv.appendChild(br);
        //↑改行
        let messageElement = document.createElement("li");
        if (type != "me") {
            messageElement.classList.add("message_bubble", "friend_message");
        } else {
            messageElement.classList.add("message_bubble", "user_message");
        }
        messageElement.textContent = message;
        chatHistoryDiv.appendChild(messageElement);
        //チャットヒストリー
    }
    setInterval(fetchChatHistory, 1000);