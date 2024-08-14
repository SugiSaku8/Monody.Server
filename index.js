const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const fs = require("fs");
const path = require("path");
const session = require("express-session");
const flash = require("connect-flash");
let bcrypt = require("bcrypt");
app.set("view engine", "ejs");
const kittys = require("./kitty");
const cors = require("cors");
const repl = require("repl");
const base = require("asterbase_js");
var wfc = require('wavefunctioncollapse');
let chatMessages = [];
let NAMESS;
function dofil(text) {
  // 悪い言葉のリストを定義します。
  const badWords = ["ばか", "あほ", "カス"];

  //  テキストを小文字に変換し、空白で分割して単語の配列を作成します。
  const words = text.toLowerCase().split(" ");

  // 単語が悪い言葉のリストに含まれているかどうかをチェックします。
  for (let i = 0; i < words.length; i++) {
    if (badWords.includes(words[i])) {
      // 悪い言葉が見つかった場合はfalseを返します。
      return false;
    }
  }

  // 悪い言葉が見つからなかった場合は元のテキストを返します。
  return text;
}
function kitty(cmd) {
  if (cmd === "start") {
    console.log("Kittyをスタートします");
    return true;
  } else {
    console.log(`${cmd}という引数は存在しません。`);
    return `404_kitty:${cmd} does not exist.`;
  }
}
const customCommands = {
  //構文:
  // sayHello: () => console.log('Hello, welcome to the server!'),
  kitty: (cmd) => kitty(cmd),
};
function Generate(seed){
  fs.readFile('data/public/map/CofB.png', (err, data) => {
    if (err) {
      console.error(err);
    } else {
      let model = new wfc.OverlappingModel(data, 2475, 1808, 3, 2475, 1808, false, false, 4);
      if(seed != "random"){
        let img = model.generate(seed)
        return img;
      }else{
      let img = model.generate(Math.random);
      return img;
      }
    }
  });
}
app.use(cors());
const corsOptions = {
  origin: [
    "https://mojimon.onrender.com/",
    "https://e4aa0edf-44a5-4534-bcf2-f5bd5ff79088-00-nrv22tf81lf6.kirk.repl.co/",
    "localhost"
  ],
  optionsSuccessStatus: 200, // For legacy browsers support
};

app.use(cors(corsOptions));
function UploadData() {
  fs.readFile("./偽物data.json", "utf8", (err, data) => {
    if (err) {
      res.status(500).send("Error reading file");
    }
    const jsonDatas = JSON.parse(data);
    // Extract only the 'name' fields from the JSON data
    NAMESS = jsonDatas.map((item) => item.name);
    console.log("現在登録されているユーザー一覧:\n" + NAMESS);
    return NAMESS;
  });
}
function service() {
  let positions = {
    そうすけ: {
      name: "そうすけ",
      status: true,
      x: 120,
      y: 220,
    },
    さくや: {
      name: "さくや",
      status: false,
      x: 10,
      y: 10,
    },
    文字もん公式: {
      name: "文字もん公式",
      status: true,
      x: 220,
      y: 250,
    },
    マリル: {
      name: "マリル",
      status: false,
      x: 10,
      y: 10,
    },
    あいうえお: {
      name: "あいうえお",
      status: false,
      x: 10,
      y: 10,
    },
    Sugisaku: {
      name: "Sugisaku",
      status: true,
      x: 1000,
      y: 2222,
    },
    Sakura: {
      name: "Sakura",
      status: false,
      x: 10,
      y: 10,
    },
    "Sakura _sibata": {
      name: "Sakura _sibata",
      status: false,
      x: 10,
      y: 10,
    },
    "18067@shimizu-ki.ed.jp": {
      name: "18067@shimizu-ki.ed.jp",
      status: false,
      x: 10,
      y: 10,
    },
    SibataSakura: {
      name: "SibataSakura",
      status: false,
      x: 10,
      y: 10,
    },
    Test: {
      name: "Test",
      status: false,
      x: 10,
      y: 10,
    },
    "AshiAshi3.14": {
      name: "AshiAshi3.14",
      status: false,
      x: 10,
      y: 10,
    },
    智晴: {
      name: "智晴",
      status: false,
      x: 10,
      y: 10,
    },
    JAXA: {
      name: "JAXA",
      status: false,
      x: 10,
      y: 10,
    },
  }; //= positiondata(NameList_PO);
  let livename;
  let x;
  let y;
  let status;
  // 価格を保持する変数
  let buyPrice = 4000; // 初期価格を設定
  let sellPrice = 4000; // 初期価格を設定
  let bankdata;
  const today = new Date();
  const date = new Date(today);

// ファイルのパスを絶対パスに変更
const BANK_DIR = path.join(__dirname+'/BANK');


  const now = new Date();

  // 日付を計算し、ラベルを設定する配列を作成
  const labels = [];
  for (let i = 0; i <= 4; i++) {
   const date = new Date(now);
   date.setDate(now.getDate() - i);
   const label = date.toISOString().split('T')[0].slice(5); // ISO形式の日付をYYYY-MM-DD形式に変換し、'YYYY-'を削除
   labels.push(label);
  }

  console.log(labels);

  function updateValues(price) {
    bankdata = {
     title: "CAR",
     labels:labels,
     values: [3508, 3570, 3600, 3750, price] // 最後の値を更新
    };

  }
// 購入エンドポイント
app.get('/buy/:meigara/:amount', (req, res) => {
  try{
    const amount = parseFloat(req.params.amount);
    const meigara_buy = req.params.meigara;
    if (!isNaN(amount)) {
        // 価格を更新
        buyPrice += amount*0.01; // 購入アクションが行われるたびに価格を少し上げる
        updateValues(buyPrice); // valuesを更新

        // ファイルから既存のデータを読み込む
        let buyAmounts = [];
        const filePath = path.join(BANK_DIR, meigara_buy + '.json');
        if (fs.existsSync(filePath)) {
            const data = fs.readFileSync(filePath, 'utf8');
            buyAmounts = JSON.parse(data);
        }
        fs.writeFileSync(__dirname+"/BANK/"+meigara_buy+'.json', JSON.stringify(bankdata), 'utf8');
        res.status(200).send(`購入成功。現在の価格: ${buyPrice}`);
    } else {
        res.status(400).send('無効な金額');
    }
  }catch(err){
    res.status(500).send('サーバーエラー');
    console.log(err)
  }
});

// 販売エンドポイント
app.get('/sell/:meigara/:quantity', (req, res) => {
    const quantity = parseFloat(req.params.quantity);
    const meigara_sell = req.params.meigara;
    if (!isNaN(quantity)) {
        // 価格を更新
        sellPrice -= quantity*0.1; // 販売アクションが行われるたびに価格を少し下げる
        updateValues(sellPrice); // valuesを更新

        // ファイルから既存のデータを読み込む
        let sellAmounts = [];
        const filePath = path.join(BANK_DIR, meigara_sell + '.json');
        if (fs.existsSync(filePath)) {
            const data = fs.readFileSync(__dirname +"/BANK/"+meigara_buy+'.json', 'utf8');
            sellAmounts = JSON.parse(data);
        }
        // 新しい量を追加
        sellAmounts.push(quantity);
        // ファイルにデータを書き込む
        fs.writeFileSync(filePath, JSON.stringify(sellAmounts), 'utf8');
        res.status(200).send(`販売成功。現在の価格: ${sellPrice}`);
    } else {
        res.status(400).send('無効な量');
    }
});

app.use("/BANK", express.static(BANK_DIR));

  app.post("/sendxy", async (req, res) => {
    //こいつが動いてるかどうか。
    try {
      // Destructure the request body for better readability and safety
      // console.log("req.body : " + req.body)//ホントだ。おもろ。
      livename = req.body;
      livex = req.body;
      livey = req.body;
      livestatus = req.body;
      // Assuming positions is a global object that needs to be updated
      if (!positions[livename]) {
        positions[livename] = {}; // Initialize if not present
      }

      // Update the position
      positions[livename].x = x;
      positions[livename].y = y;
      positions[livename].status = status;

      // Log the updated position
      const date = new Date();
      /* console.log(
        `ポジションがアップデートされました。\n現在のポジションデータ: ${JSON.stringify(
          positions,
        )}  更新時間: ${date.toISOString().replace(/[:-]/g, "").slice(0, -5)}`,
      );*/

      // Send a success status
      res.sendStatus(200);
    } catch (error) {
      console.error("Error updating position:", error);
      res.status(500).send("Server Error");
    }
  });

  app.get("/positions/:userId", (req, res) => {
    res.set({ "Access-Control-Allow-Origin": "*" });
    const userId = req.params.userId;
    fs.readFile(`./n/d/${userId}.moji`, "utf8", (err, jsonString) => {
      if (err) {
        console.log("File read failed:", err);
      }

      try {
        const positions = JSON.parse(jsonString);

        if (users) {
          res.json(positions);
        }
      } catch (err) {
        // console.log("Error parsing JSON string:", err);//エラーなんかよくわからないけどたまに起こるだけ
      }
    });
  });

  app.get("/generate", (req, res) => {
    let cache = req;
    cache = null;
    let worldimage = Generate("random");
    res.send(worldimage);
  });

  app.use("/save_get", express.static(path.join(__dirname, "./n/d/")));

  app.use(express.json());
  app.post("/save", (req, res) => {
    res.set({ "Access-Control-Allow-Origin": "*" });
    try {
      let datas = req.body;
      const filename = `./n/d/${req.body.user}.moji`;
      // Convert the object to a JSON string before writing it to the file
      const dataString = JSON.stringify(datas);
      fs.writeFile(filename, dataString, (err) => {
        if (err) {
          console.error(err);
          res.status(500).send("サーバエラー");
        }
        let time = String(Date.now());

        let status = {
          status: "成功",
          message: `${req.body.user}のデータを ${filename}　に保存しました。`,
          time: time,
        };
        res.send(status); // You might want to send the status object back to the client
      });
    } catch (err) {
      console.log(err);
      res.status(500).send("サーバエラー"); // Send an error response if an exception is caught
    }
  });

  app.get("/get_save_data/:userId", (req, res) => {
    res.set({ "Access-Control-Allow-Origin": "*" });
    const filename = `./n/d/${req.params.userId}.moji`;
    fs.readFile(filename, "utf8", (err, jsonString) => {
      if (err) {
        console.log("File read failed:", err);
        return;
      }
      try {
        const data = JSON.parse(jsonString);
        if (data) {
          res.json(data);
        }
      } catch (err) {
        console.error("Error parsing JSON string:", err);
      }
    });
  });

  app.post("/sendmessage", (req, res) => {
    try {
      let username = req.body.username;
      let message = req.body.message;
      let time = req.body.time;
      console.log(`${username}からのメッセージ:${message}`);
      try {
        let isClean = dofil(message);
        if (!isClean) {
          return res
            .status(609)
            .json({ error: "悪口が検出されました", content: message });
        } else {
          // 悪い言葉がなければchatMessages配列にメッセージを追加
          chatMessages.push({ username, message, time });
          res.json({ message: message });
        }
      } catch (err) {
        console.error(`フィルタリング中にエラーが発生しました。\nEM:${err}`);
        res
          .status(614)
          .json({ log: "フィルタリング中にエラーが発生しました。" });
      }
    } catch (error) {
      console.error("Wow.Error.:" + error);
    }
  });

  app.get("/chathistory", (req, res) => {
    res.json(chatMessages); // Send chatHistory as JSON
  });

  app.get("/olu", (req, res) => {
    res.json(NAMESS);
  });
  //ユーザーデータ処理

  app.use(bodyParser.json());
  //ログイン処理
  app.use(
    session({
      secret: "secret",
      resave: true,
      saveUninitialized: true,
    }),
  );

  app.use(flash());

  function updateOrAppendToFile(newData, filename, req, res) {
    fs.readFile(filename, (err, data) => {
      if (err) throw err;
      if (data.length > 0) {
        let jsonData = JSON.parse(data);
        let existingDataIndex = jsonData.findIndex(
          (item) => item.name === newData.name,
        );
        if (existingDataIndex !== -1) {
          res
            .status(409)
            .send(
              "すでにこの名前のアカウントが作成済みです。\nほかの名前にしてください。\n一つ前のページに戻りましょう。",
            );
        } else {
          newData.password = bcrypt.hashSync(newData.password, 10);
          jsonData.push(newData);
          fs.writeFile(filename, JSON.stringify(jsonData), (err) => {
            if (err) throw err;
            console.log("Data written to file");
          });
        }
      } else {
        let jsonData = [newData];
        fs.writeFile(filename, JSON.stringify(jsonData), (err) => {
          if (err) throw err;
          console.log("Data written to file");
        });
      }
    });
  }

  app.get("/names", (req, res) => {
    fs.readFile("./COP.json", "utf8", (err, data) => {
      if (err) {
        res.status(500).send("Error reading file");
        return;
      }
      const jsonData = JSON.parse(data);
      // Extract only the 'name' fields from the JSON data
      const names = jsonData.map((item) => item.username);
      res.json(names);
    });
  });

  app.use(bodyParser.urlencoded({ extended: false }));

  app.use(bodyParser.json());

  app.use(express.static("data/public"));

  app.use(express.static("data/public"));

  app.get("/", function (request, response) {
    response.sendFile(__dirname + "/views/index.html"); //
  });

  app.get("/test", function (request, response) {
    response.sendFile(__dirname + "/data/public/Test.html"); //
  });

  app.get("/get", function (request, response) {
    const name = request.query.name;
    const password = request.query.password;
    fs.readFile("./偽物data.json", (err, data) => {
      if (err) throw err;
      if (data.length > 0) {
        let jsonData = JSON.parse(data);
        let targetData = jsonData.find((item) => item.name === name);
        if (targetData) {
          var isMatch = bcrypt.compareSync(password, targetData.password); //
          response.send({ targetData, isMatch });
        } else {
          response
            .status(404)
            .send("その名前のアカウントは見つかりませんでした");
        }
      } else {
        response
          .status(404)
          .send(":(\nその名前のアカウントは見つかりませんでした。");
      }
    });
  });

  app.post("/", function (request, response) {
    console.log(request.body);
    updateOrAppendToFile(request.body, "./偽物data.json", request, response);
  });

  var usernames = [];
  app.post("/COP_save", (req, res) => {
    let data = req.body;
    //console.log(data)
    try {
      fs.readFile(`./n/d/${data.username}.moji`, "utf8", (err, jsonString) => {
        if (err) {
          console.log("File read failed:", err);
          return;
        }
        try {
          //ここstringifyにした。
          let users = JSON.stringify(jsonString);
          usernames = users.map((user) => user.username);

          if (users) {
            users = {
              x: data.x,
              y: data.y,
              time: Date.now(),
            };
          }

          // Use JSON.stringify with a replacer function to filter invalid properties
          const cleanedJson = JSON.stringify(users, (key, value) => {
            if (value === undefined) return null; // Filter out undefined values
            return value;
          });

          // Write the cleaned JSON back to the file
          fs.writeFile(`./n/d/${data.username}.moji`, cleanedJson, (err) => {
            if (err) {
              console.error("Error writing file:", err);
              res
                .status(500)
                .send(`Error saving data to ${data.username}.moji`);
            } else {
              res.status(200).send("Data received and saved.");
            }
          });
        } catch (err) {
          // console.log("Error parsing JSON string:", err);
          res.status(500).send("Error parsing existing data");
        }
      });
    } catch (err) {
      console.error("エラーが発生しました。", err);
    }
  });

  function COP_check() {
    for (var i = 0; i < usernames.length; i++) {
      fs.readFile(`./n/d/${usernames[i]}`, "utf8", (err, jsonString) => {
        if (err) {
          console.log("File read failed:", err);
          return;
        }
        try {
          var data = JSON.parse(jsonString);
          var last_time = data.time;
          if (last_time + 10000 < Date.now()) {
            data.status = false;
          } else {
            data.status = true;
          }
          // Write updated data back to file
          fs.writeFile(
            `./n/d/${usernames[i]}.json`,
            JSON.stringify(data),
            (err) => {
              base.arsJSON("COP.json");
            },
          );
        } catch (err) {
          console.error("An error occurred while checking online status:", err);
        }
      });
    }
  }
  setInterval(COP_check, 1000);

  //404.500エラーに対応する
  app.use((req, res, next) => {
    res.status(404).sendFile(__dirname + "/views/erorr/404.html");
  });

  app.use((err, req, res, next) => {
    res.status(500).sendFile(__dirname + "/views/erorr/500.html");
  });

  app.use((req, res, next) => {
    res.status(409).sendFile(__dirname + "/views/erorr/409.html");
  });

  app.use((req, res, next) => {
    res.status(502).sendFile(__dirname + "/views/erorr/502.html");
  });

  //サーバーの起動
  var listener = app.listen(3000, function () {
    console.log(
      "Monodyのサーバーは、" +
        listener.address().port +
        "で動いています!!!!!",
    );
    console.log("____________________________________________________");
    console.log("|              Monody Developer Shell");
    console.log("|                     起動しました。");
    console.log("|             ログはすべてここに出力されます。");
    console.log("|  起動時にエラーが出た場合は、index.jsを確認してください。");
    console.log("|                                                   ");
    console.log("|         ©Carnation Studio Monody 2023-24");
    console.log("|         このサーバーは、Mojimonのサーバーです。");
    console.log("|___________________________________________________");
    const replInstance = repl.start({ prompt: ">> " });
    Object.assign(replInstance.context, customCommands);
  });
}
UploadData();
service();