const grama = {
	v1:["forward","back","lefter","righter","stay"],
	ramdom:function(list,id){
		  const length = list.length;
		  const randomIndex = Math.floor(Math.random() * length);
		  return `grama.${list[randomIndex]}(${id})`;
	},
	forward:function(id){
		const element = document.getElementById(id);
		let start, previousTimeStamp;
		let done = false;

		function step(timeStamp) {
		  if (start === undefined) {
		    start = timeStamp;
		  }
		  const elapsed = timeStamp - start;

		  if (previousTimeStamp !== timeStamp) {
		    const count = Math.min(0.1 * elapsed, 200); // 0.1px/msの速度で移動
		    element.style.transform = `translateX(${count}px)`;
		    if (count === 200) done = true;
		  }

		  if (elapsed < 2000) { // 2秒間アニメーションを続ける
		    previousTimeStamp = timeStamp;
		    if (!done) {
		      window.requestAnimationFrame(step);
		    }
		  }
		}

		window.requestAnimationFrame(step);
	},
	back:function(id){
		const element = document.getElementById(id);
		let start, previousTimeStamp;
		let done = false;

		function step(timeStamp) {
		  if (start === undefined) {
		    start = timeStamp;
		  }
		  const elapsed = timeStamp - start;

		  if (previousTimeStamp !== timeStamp) {
		    const count = Math.max(0, 200 - elapsed); // 200ms以降のアニメーションを制限
		    element.style.transform = `translateX(${-count}px)`; // 左に移動
		    if (count === 0) done = true;
		  }

		  if (elapsed < 200) { // 200ms間アニメーションを続ける
		    previousTimeStamp = timeStamp;
		    if (!done) {
		      window.requestAnimationFrame(step);
		    }
		  }
		}

		window.requestAnimationFrame(step);

	},
	lefter:function(id){
		const element = document.getElementById(id);
		let start, previousTimeStamp;
		let done = false;

		function step(timeStamp) {
		  if (start === undefined) {
		    start = timeStamp;
		  }
		  const elapsed = timeStamp - start;

		  if (previousTimeStamp !== timeStamp) {
		    const moveDistance = Math.min(elapsed * 0.1, element.offsetWidth); // 要素の幅分の移動を制限
		    element.style.transform = `translateX(-${moveDistance}px)`;
		    if (moveDistance >= element.offsetWidth) done = true;
		  }

		  if (elapsed < 2000) { // 2秒間アニメーションを続ける
		    previousTimeStamp = timeStamp;
		    if (!done) {
		      window.requestAnimationFrame(step);
		    }
		  }
		}

		window.requestAnimationFrame(step);

	},
	righter:function(id){
		const element = document.getElementById(id);
			     let start, previousTimeStamp;
			     let done = false;

			     function step(timeStamp) {
			       if (start === undefined) {
				 start = timeStamp;
			       }
			       const elapsed = timeStamp - start;

			       if (previousTimeStamp !== timeStamp) {
				 const moveDistance = Math.min(elapsed * 0.1, element.offsetWidth); // 要素の幅分の移動を制限
				 element.style.transform = `translateX(${moveDistance}px)`;
				 if (moveDistance >= element.offsetWidth) done = true;
			       }

			       if (elapsed < 2000) { // 2秒間アニメーションを続ける
				 previousTimeStamp = timeStamp;
				 if (!done) {
				   window.requestAnimationFrame(step);
				 }
			       }
			     }

			     window.requestAnimationFrame(step);

	},
	stay:function(id){
		setTimeout(function() {
		  console.log(id+"has Sleep on 3 sec.")
		}, 3000);
	},
	summon:function(){
		grama.id +=1;
		document.getElementById("mojimon_spawn").insertAdjacentHTML("afterbegin",`<div id="${grama.id} style='z-index:10000000;'><img src="/img/Agent.png" alt="${grama.id}"><script>setInterVal(Function(grama.ramdom(grama.v1,${grama.id}))900)</script></div>"`)
	console.log("Grama is " + grama.id + "summoned.")
	},
	id:0,
}