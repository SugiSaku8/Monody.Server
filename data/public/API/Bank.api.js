
    function openTab(evt, tabName, canvasname) {
            // すべてのタブコンテンツを非表示にする
            var i, tabcontent, tablinks;
    tabcontent = document.getElementsByClassName("tabcontent");
    for (i = 0; i < tabcontent.length; i++) {
        tabcontent[i].style.display = "none";
    }

            // すべてのタブボタンのアクティブクラスを削除する
            tablinks = document.getElementsByClassName("tablinks");
    for (i = 0; i < tablinks.length; i++) {
        tablinks[i].className = tablinks[i].className.replace(" active", "");
    }

            // 選択されたタブコンテンツを表示し、アクティブクラスを追加する
            document.getElementById(tabName).style.display = "block";
    evt.currentTarget.className += " active";
    fetchDataAndDrawChart('https://e4aa0edf-44a5-4534-bcf2-f5bd5ff79088-00-nrv22tf81lf6.kirk.replit.dev/BANK/' + canvasname + '.json', canvasname);
    }

    function showContentSection(targetId) {
            // すべてのコンテンツセクションを非表示にする
            document.querySelectorAll('.content-section').forEach(section => {
                section.classList.add('hidden');
            });

    // 指定されたコンテンツセクションを表示する
            const targetSection = document.getElementById(targetId);
            if (targetSection) {
                targetSection.classList.remove('hidden');
            }
          }

    function fetchDataAndDrawChart(url, canvasId) {
              fetch(url)
                .then(response => response.json())
                .then(data => {
                    const ctx = document.getElementById(canvasId).getContext('2d');
                    // 既存のチャートがあれば破棄
                    if (window.myChart) {
                        window.myChart.destroy();
                    }
                    // 新しいチャートを描画
                    window.myChart = new Chart(ctx, {
                        type: 'line',
                        data: {
                            labels: data.labels,
                            datasets: [{
                                label: data.title,
                                data: data.values,
                                backgroundColor: 'rgba(0, 123, 255, 0.5)',
                                borderColor: 'rgba(0, 123, 255, 1)',
                                borderWidth: 1
                            }]
                        },
                        options: {
                            scales: {
                                y: {
                                    beginAtZero: true
                                }
                            }
                        }
                    });
                })
                .catch(error => console.error('Error fetching data:', error));
            }

    function updataDataAndWriteDocument(url, name) {
              fetch(url)
                .then(response => response.json())
                .then(data => {
                    const now = data.values[data.values.length - 1];
                    document.getElementById(`${name}_now`).innerText = now;
                })
                .catch(error => console.error('Error fetching data:', error));
            }

    function fetch_Bank(url, name) {
              fetch(url + name)
                .then(response => response.text())
                 .then(data => {const response = JSON.stringify(data);console.log(response)})
                 .catch(error => console.error('Error:', error));
            }


    setInterval(updataDataAndWriteDocument('https://e4aa0edf-44a5-4534-bcf2-f5bd5ff79088-00-nrv22tf81lf6.kirk.replit.dev/BANK/CAR.json', "CAR"), 1000)
    setInterval(updataDataAndWriteDocument('https://e4aa0edf-44a5-4534-bcf2-f5bd5ff79088-00-nrv22tf81lf6.kirk.replit.dev/BANK/NTA.json', "NTA"), 1000)