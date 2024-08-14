function WorldRenderer(canvas, beach, forest, mountain) {
    WorldRenderer.prototype.drawArray = function (mapObj) {
	var str = '';
	for (var i = 0; i < mapObj.size * mapObj.size; ++i) {
	    if (i % mapObj.size == 0) str += '<br />';
	    str += (mapObj.map[i] === undefined ? '_' : mapObj.map[i]) + ', ';
	}
	document.write(str);
    }

    WorldRenderer.prototype.drawPixelated = async function (mapObj) {
	const canvas = document.getElementById('canvas'); // HTML Canvas要素への参照が必要
	canvas.width = mapObj.size;
	canvas.height = mapObj.size;
	const ctx = canvas.getContext('2d');

	// JSONファイルの読み込み
	const response = await fetch('path/to/biomes.json');
	const biomesColors = await response.json();

	const imgd = ctx.getImageData(0, 0, mapObj.size, mapObj.size);
	const pixm = imgd.data;

	for (let y = 0; y < mapObj.size; ++y) {
	    for (let x = 0; x < mapObj.size; ++x) {
		let c = mapObj.map[(y * mapObj.size) + x];

		// 色設定
		let rgb = [0, 0, 0];
		if (c < biomesColors.water) rgb = [0, 0, parseInt(biomesColors.water.slice(1))];
		else if (c >= biomesColors.water && c < biomesColors.beach) rgb = [255, parseInt(biomesColors.beach.slice(1)), parseInt(biomesColors.beach.slice(1)) + 50];
		else if (c >= biomesColors.beach && c < biomesColors.forest) rgb = [0, parseInt(biomesColors.forest.slice(1)) / 1.5, 0];
		else if (c >= biomesColors.forest && c < biomesColors.mountain) rgb = [parseInt(biomesColors.mountain.slice(1)) / 1.2, parseInt(biomesColors.mountain.slice(1)) / 1.2, parseInt(biomesColors.mountain.slice(1)) / 1.2];
		else if (c >= biomesColors.mountain) rgb = [parseInt(biomesColors.mountain.slice(1)), parseInt(biomesColors.mountain.slice(1)), parseInt(biomesColors.mountain.slice(1))];

		let koo = y * mapObj.size * 4 + (x * 4);
		pixm[koo + 0] = rgb[0];
		pixm[koo + 1] = rgb[1];
		pixm[koo + 2] = rgb[2];
		pixm[koo + 3] = 255;
	    }
	}
	ctx.putImageData(imgd, 0, 0);
    }

    WorldRenderer.prototype.drawTiled = async function (worldObj, tileSize) {
	const canvas = document.getElementById('canvas'); // HTML Canvas要素への参照が必要
	canvas.width = worldObj.terrain.size * tileSize;
	canvas.height = worldObj.terrain.size * tileSize;
	const ctx = canvas.getContext('2d');

	// JSONファイルの読み込み
	const response = await fetch('path/to/biomes.json');
	const biomesColors = await response.json();

	for (let y = 0; y < worldObj.terrain.size; ++y) {
	    for (let x = 0; x < worldObj.terrain.size; ++x) {
		let pt = worldObj.getSquare(x, y);

		let c = Math.floor(pt.elevation);
		let incl = y < (worldObj.terrain.size - 1) ? (pt.elevation - worldObj.getSquare(x, y + 1).elevation) * 3 : 0;

		let rgb = [0, 0, 0];

		if (pt.type === 'ocean' || pt.type === 'edge' || pt.type === 'water') {
		    rgb = [0, 0, parseInt(biomesColors.water.slice(1)) + 92];
		} else {
		    let wc = Math.floor(Math.max(Math.min(c - incl, 255), 0));

		    if (c < parseInt(biomesColors.beach.slice(1))) {
			rgb = [255, parseInt(biomesColors.beach.slice(1)) + 110, parseInt(biomesColors.beach.slice(1)) + 50];
		    } else if (c >= parseInt(biomesColors.beach.slice(1)) && c < parseInt(biomesColors.forest.slice(1))) {
			rgb = [0, parseInt(biomesColors.forest.slice(1)) / 1.5, 0];
		    } else if (c >= parseInt(biomesColors.forest.slice(1)) && c < parseInt(biomesColors.mountain.slice(1))) {
			let val = parseInt(biomesColors.mountain.slice(1)) / 1.2;
			rgb = [val, val, val];
		    } else if (c >= parseInt(biomesColors.mountain.slice(1))) {
			rgb = [wc, wc, wc];
		    }
		}

		ctx.fillStyle = 'rgb(' + rgb.join(',') + ')';
		ctx.fillRect(x * tileSize, y * tileSize, tileSize, tileSize);
	    }
	}
    }
}
