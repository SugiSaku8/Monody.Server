    let omo;
    let onmoney = auto;
    window.onload = function () {
          onmoney = omo;
    };
    let torihiki_kaisuu = 0;
    let money;
    let item_syouhin;
    const torihiki = {
          shuffle: function (array) {
        for (let i = array.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [array[i], array[j]] = [array[j], array[i]];
        }
            return array;
        },
          add: function (pass, syouhin) {
        //　商人のビジュアル
            let img_element = document.createElement("img");
            img_element.src = "./img/murabito/" + pass + ".png";
            img_element.alt = pass;
            img_element.width = 200;
            img_element.id = "murabito_img";
            img_element.height = 200;
            let content_area = document.getElementById("syounin_img");
            content_area.appendChild(img_element);
            //商品のビジュアル
            let syouhin_elements = document.createElement("img");
            syouhin_elements.src = "./img/item/" + syouhin + ".png";
            syouhin_elements.alt = syouhin;
            syouhin_elements.id = "syouhin_img_s";
            syouhin_elements.width = 200;
            syouhin_elements.height = 200;
            let content_areas = document.getElementById("item_img");
            content_areas.appendChild(syouhin_elements);
            },
          show: function (text) {
        document.getElementById("dialogText").innerText = text;
        document.getElementById("dialog").style.display = "block";
        },
          money: function (onmoney, inmoney, item_syouhins) {
        if (onmoney < inmoney) {
            console.log(
                `商品情報\n名前:${item_syouhins}\n今のお金:${onmoney}\n購入金額:${inmoney}\nError:3000\nお金が足りません。`,
                );
            console.error(
                `商品情報\n名前:${item_syouhins}\n今のお金:${onmoney}\n購入金額:${inmoney}\nError:3000\nお金が足りません。`,
                );
            torihiki.show(
                `商品情報\n名前:${item_syouhins}\n今のお金:${onmoney}\n購入金額:${inmoney}\nお金が足りません。`,
                );
            document.getElementById("money_button").style.display = "none";
            return false;
        } else {
            return true;
        }
          },
        };
    function torihiki_start() {
          document.getElementById("sea").style.display = "none";

          document.getElementById("money_button").style.display = "block";
    if (torihiki_kaisuu != 0) {
        document.getElementById("syouhin_img_s").remove();
        document.getElementById("murabito_img").remove();
        document.getElementById("kingaku").remove();
        document.getElementById("money_button").style.display = "block";
        //初期化
    }
          let trihiki_list = ["syounin", "nouka", "tyuuzouka", "ryousi"];
    let shuffle_score = torihiki.shuffle(trihiki_list);
    let syounin = shuffle_score[0];
    let item = {
        鉄のインゴット: 30, //済
            銅のインゴット: 500, //済
            銀のインゴット: 1500, //済
            金のインゴット: 12000, //済
            白金のインゴット: 300, //済
            トランジスタ: 700, //済
            小麦の種: 5, //済
            小麦: 150, //済
            普通のパン: 60, //済
            フランスパン: 70, //済
            ベーグル: 80, //済
            本棚: 1200, //済
            コーヒーミル: 700,
            コーヒー豆: 100,
            ガラス: 20,
            コップ: 35,
            グラス: 10,
            ひのきの机: 280,
            ひのきの椅子: 180,
            プラスチック: 10,
            プラスチックのお椀: 50,
            ひのきのお椀: 70,
            鉄の歯車: 50,
            ステンレス: 70,
            ステンレスの歯車: 90,
            鉄の掛け時計: 900,
            鉄の置き時計: 700,
            ステンレスの掛け時計: 1200,
            ステンレスの置き時計: 1000,
            ひのきの掛け時計: 1500,
            ひのきの置き時計: 1400,
            プラスチックの掛け時計: 500,
            プラスチックの置き時計: 200,
            ボールペン: 10,
            シャープペンシル: 20,
            にんじん: 1, //済
            キャベツ: 1,
            たまねぎ: 1,
            コンソメ: 100,
            磁石入の鉱石: 200,
            磁石: 200,
            砂鉄: 10,
            フィラメント: 8,
            フィラメント電球: 30,
            フィラメント磁石: 100,
            ネオジム磁石: 400,
            包み紙: 20,
            プリンター: 800000,
            コンバイン: 20000000,
            プレゼントの箱: 600, //済
            "鉛筆(2B)": 2, //済
            "鉛筆(3B)": 3, //済
            "鉛筆(4B)": 4, //済
            瓶: 4, //済
            ハム:2,
            "GallusGallusDomesticusの卵":10000000000000
    };
    let keys = Object.keys(item);
    let values = Object.values(item);
    let random = Math.floor(Math.random() * keys.length);
    item_syouhin = keys[random];
    let syouhin = item_syouhin;
    torihiki.add("trolled", item_syouhin);
    money = values[random];
    let siharau_money;
    inmoney = 99999999999;
    let money_item = money; //動いているのでパス。
          let kingaku = document.createElement("p");
          console.log("Status:" + onmoney + "\n" + inmoney + "");
          torihiki.show(`${item_syouhin}を購入しますか？\n${money}です`);
          kingaku.id = "kingaku";
          kingaku.innerHTML = `金額:${money}`;
          document.body.appendChild(kingaku);
          document
            .getElementById("money_button")
            .addEventListener("click", function () {
                if (torihiki.money(onmoney, money, item_syouhin) === true) {
                    onmoney = onmoney - money;
                    torihiki.show(
                        `商品情報\n${item_syouhin}を購入しました。\n\n購入後のステータス\n残ったお金:${onmoney}`,
                        );
                    fbag.add(item, item, 1); //バックに追加
                omo = onmoney;
                document.getElementById("money_button").style.display = "none";
                }
            });
          document
            .getElementById("close")
            .addEventListener("click", function () {
                end_trihiki();
            });
          torihiki_kaisuu = 1;
          }