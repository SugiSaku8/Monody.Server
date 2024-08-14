
    var newX;
    var newY;
    function check_mojimon_tairyoku() {
            document.getElementById("main_battle").style.display = "none";
    map.view();
    fadeIn(document.getElementById("map"));
    document.getElementById("mes").innerHTML = "";
    modoru();
    }

    window.addEventListener("resize", adjustSkinPosition);
    window.addEventListener("load", adjustSkinPosition);
    function adjustSkinPosition() {
            var skin = document.getElementById("SKIN");
    var container = document.getElementById("CofB");

    var containerRect = container.getBoundingClientRect();
    var skinRect = skin.getBoundingClientRect();

    newX = Math.floor(containerRect.width / 1 - skinRect.width / 1);
    newY = Math.floor(containerRect.height / 1 - skinRect.height / 1);

    skin.style.left = newX + "px";
    skin.style.top = newY + "px";
    }
    function getData(i) {
            //いまは一年生の文字もんだけ
            if (box_mojimon) {
                jibun_mojimon = box_mojimon[box_mojimon.length - 1];
            } else {
                jibun_mojimon = mojimon_array[0];
            }
            jibun_result = check(jibun_mojimon);
            data_send(jibun_result, false);

            console.log("i=" + i);

            teki_mojimon_syutoku = document.getElementById(
                `mojimon_spawn${i}`,
                ).src;
            teki_mojimon_kakou = teki_mojimon_syutoku.substr(
                teki_mojimon_syutoku.indexOf("#") + 1,
                );
            console.log([teki_mojimon_syutoku, teki_mojimon_kakou]);
            teki_mojimon = decodeURI(teki_mojimon_kakou);
            teki_result = check(teki_mojimon);
            data_send(teki_result, true);

            {
                var teki_B = teki_result.busyu;

                var teki_lv = 50; //仮
              function hp_keisan(A, B) {
                  var result = Math.floor(
                      10 + Math.log(30000 * A) + 6 * A + B * 1.5,
                      );
                  return result;
              }
              var teki_hp2 = hp_keisan(teki_B, teki_lv); //保存用
              var teki_hp = teki_hp2;
              var teki_NB = teki_result.kakusuu - teki_result.busyu;
              var teki_atk = Math.floor(
                  20 +
                  Math.log(Math.log(4 ** ((teki_NB + 1) ** 2))) * 5 +
                  Math.log(3 ** teki_lv),
                  );
              var teki_NBS = teki_NB - teki_result.busyu;
              var teki_def_test = Math.floor(
                  20 +
                  Math.log(Math.log(4 ** ((-teki_NBS + 1) ** 2))) *
                    -5 *
                    (Math.abs(teki_NBS) / teki_NBS) +
                  Math.log(3 ** teki_lv),
                  );
              var teki_def;
              if (teki_def_test < 1) {
                  teki_def = 1;
              } else if (teki_def_test == Infinity) {
                  teki_def = Math.floor(20 + Math.log(3 ** teki_lv));
              } else if (teki_def_test) {
                  teki_def = teki_def_test;
              } else {
                  teki_def = 20 + Math.floor(Math.log(3 ** teki_lv)) + 5;
              }

              document.getElementById("teki_H").innerHTML = teki_hp;
              document.getElementById("teki_A").innerHTML = teki_atk;
              document.getElementById("teki_B").innerHTML = teki_def;

              var jibun_B = jibun_result.busyu;
              var jibun_lv = 50; //仮
              var jibun_hp2 = Math.floor(
                  10 +
                  Math.log(30000 * jibun_B) +
                  6 * jibun_B +
                  11 ** jibun_lv / 10 ** jibun_lv,
                  ); //保存用
              var jibun_hp = jibun_hp2;
              var jibun_NB = jibun_result.kakusuu - jibun_result.busyu;
              var jibun_atk = Math.floor(
                  20 +
                  Math.log(Math.log(4 ** ((jibun_NB + 1) ** 2))) * 5 +
                  Math.log(3 ** jibun_lv),
                  );
              var jibun_NBS = jibun_NB - jibun_result.busyu;
              var jibun_def_test = Math.floor(
                  20 +
                  Math.log(Math.log(4 ** ((-jibun_NBS + 1) ** 2))) *
                    -5 *
                    (Math.abs(jibun_NBS) / jibun_NBS) +
                  Math.log(3 ** jibun_lv),
                  );
              var jibun_def;
              if (jibun_def_test < 1) {
                  jibun_def = 1;
              } else if (jibun_def_test == Infinity) {
                  jibun_def = Math.floor(20 + Math.log(3 ** jibun_lv));
              } else if (jibun_def_test) {
                  jibun_def = jibun_def_test;
              } else {
                  jibun_def = 20 + Math.floor(Math.log(3 ** jibun_lv)) + 5;
              }
              document.getElementById("jibun_H").innerHTML = jibun_hp;
              document.getElementById("jibun_A").innerHTML = jibun_atk;
              document.getElementById("jibun_B").innerHTML = jibun_def;
            }
            reset_hensuutati();
    return [teki_result, jibun_result];
    }
{

    function data_send(check_result, isteki) {
        if (isteki) {
            document.getElementById("teki_mojimon").src =
              `img/Mojimon.svg#${check_result.name}`;
            var B = check_result.busyu;
            var lv = 5; //仮
            var hp = Math.floor(
                10 + Math.log(30000 * B) + 6 * B + 11 ** lv / 10 ** lv,
                );
            document.getElementById("teki_H").innerHTML = hp;
            document.getElementById("teki_hp").innerHTML = hp;
            document.getElementById("teki_hp_max").innerHTML = hp;
            var atk = 0; //ここになに入れるの？
        } else {
            document.getElementById("jibun_mojimon").src =
              `img/Mojimon.svg#${check_result.name}`;
            var B = check_result.busyu;
            var lv = 5; //仮
            var hp = Math.floor(
                10 + Math.log(30000 * B) + 6 * B + 11 ** lv / 10 ** lv,
                );
            document.getElementById("jibun_H").innerHTML = hp;
            document.getElementById("jibun_hp").innerHTML = hp;
            document.getElementById("jibun_hp_max").innerHTML = hp;
        }
    }
    (() => {
        "use strict";
        let isSubmit = false;
        let userGestureExists = false;
        for (const v of ["click", "keydown"]) {
            addEventListener(
                v,
                () => {
                    userGestureExists = true;
                    },
                { once: true },
                );
        }
        addEventListener("beforeunload", (e) => {
            if (!isSubmit && userGestureExists) {
                e.preventDefault();
                save_server();
                e.returnValue = "Are you sure you want to exit?";
            }
        });
        document.addEventListener("DOMContentLoaded", () => {
            document
              .getElementsByTagName("button")[0]
              .addEventListener("click", () => {
                  isSubmit = true;
              });
        });
    })();

    function mojimon_shuffle() {
        for (i = mojimon_array.length; 1 < i; i--) {
            k = Math.floor(Math.random() * i);
            [mojimon_array[k], mojimon_array[i - 1]] = [
                mojimon_array[i - 1],
                mojimon_array[k],
                ];
        }
        return mojimon_array;
    }
    mojimon_array = [
        "火",
        "山",
        "水",
        "石",
        "金",
        "土",
        "月",
        "日",
        "木",
        "雨",
        "川",
        "夕",
        "花",
        "草",
        "右",
        "左",
        "一",
        "二",
        "三",
        "四",
        "五",
        "六",
        "七",
        "八",
        "九",
        "十",
        "上",
        "下",
        "円",
        "王",
        "音",
        "貝",
        "学",
        "気",
        "休",
        "玉",
        "空",
        "犬",
        "見",
        "竹",
        "田",
        "口",
        "白",
        "青",
        "赤",
        "林",
        "森",
        "校",
        "千",
        "百",
        "力",
        "文",
        "立",
        "目",
        "名",
        "本",
        "年",
        "入",
        "天",
        "町",
        "虫",
        "中",
        "男",
        "女",
        "大",
        "小",
        "糸",
        "子",
        "字",
        "耳",
        "車",
        "手",
        "出",
        "人",
        "正",
        "生",
        "先",
        "早",
        "足",
        "村",
        ];
    //getData()関数は、map内のscriptに移動されました。
} //DOMアクセス関数
