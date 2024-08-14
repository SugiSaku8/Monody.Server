{
    function spawn_mojimon() {
        for (let i = 1; i < 11; i++) {
            let mapWidth = 5120; // マップの幅
            let mapHeight = 3840; // マップの高さ
            mojimon_shuffle();
            let monster = mojimon_shuffle();
            let monster_0 = monster[0];

            let x1 = Math.floor(Math.random() * mapWidth); // ランダムなX座標を生成
            let y1 = Math.floor(Math.random() * mapHeight); // ランダムなY座標を生成
            x1 -= window.x
            y1 -= window.y
            spawnMonsterAtPosition(monster_0, x1, y1, i); // モンスターをスポーンさせる関数を呼び出す
        }
    }

    function spawnMonsterAtPosition(monster, x, y, i) {
        // ここもじもんをスポーンさせる処理を書く by AI
        // 例えば、HTML要素を作成してマップ上のランダムな位置に配置するなど

        var item = document.getElementById(`mojimon_spawn${i}`);
        item.src = `img/Mojimon.svg#${monster}`;

        console.log([x + "px", y + "px"]);

        item.style.left = x + "px";
        item.style.top = y + "px";
    }

}