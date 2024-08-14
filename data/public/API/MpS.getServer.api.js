  document.addEventListener('DOMContentLoaded', function() {
      const crystalWindow = document.getElementById("crystalWindow");
      const btn = document.getElementById("multipie");
      const span = document.getElementsByClassName("close")[0];
      const serverList = document.getElementById('serverList');
      // サーバーリストの初期化
      const servers = [
	  { name: 'Shimizu-Junior-High School Server', info: 'オンライン' ,url:'http://localhost:0000',secure:"安全",},
	  { name: 'Carnation Offical Server(version:1.25)', info: 'オンライン' ,url:'https://mojimon.onrender.com',secure:"保護されていない通信"}
      ];
      if (servers.length === 0) {
	  serverList.innerHTML = '<li class="serverListItem">(ᐡ-ܫ•ᐡ) MpSサーバーが見つかりません</li>';
      } else {
	  servers.forEach(server => {
	      const listItem = document.createElement('li');
	      listItem.className = 'serverListItem';
	      listItem.innerHTML = `<strong>${server.name}</strong><br>状態:${server.info}<br>URL:${server.url}<br><button style='width:auto;'onclick="mps('${server.url}')">このサーバーに参加する</button><br>${server.secure}<br>`;
	      serverList.appendChild(listItem);
	  });
      }
  });
