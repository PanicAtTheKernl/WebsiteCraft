// Look, I'm not an expert with JavaScript. It works. Calm down.
const serverIP = 'mc.picraft.org';
fetch(`https://api.mcsrvstat.us/2/${serverIP}`)
    .then(response => response.json())
    .then(data => {
        if (data) {
            // Unix timestamp of cached time logic
            let d = new Date(data.debug.cachetime * 1000);
            let d2 = new Date(data.debug.cacheexpire * 1000);
            let year = d.getFullYear();
            let year2 = d2.getFullYear();
            let month = String(d.getMonth() + 1).padStart(2, '0');
            let month2 = String(d2.getMonth() + 1).padStart(2, '0');
            let day = String(d.getDate()).padStart(2, '0');
            let day2 = String(d2.getDate()).padStart(2, '0');
            let hours = String(d.getHours()).padStart(2, '0');
            let hours2 = String(d2.getHours()).padStart(2, '0');
            let minutes = String(d.getMinutes()).padStart(2, '0');
            let minutes2 = String(d2.getMinutes()).padStart(2, '0');
            let seconds = String(d.getSeconds()).padStart(2, '0');
            let seconds2 = String(d2.getSeconds()).padStart(2, '0');
            document.getElementById('cache-time').innerHTML = `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
            document.getElementById('expire-time').innerHTML = `${year2}-${month2}-${day2} ${hours2}:${minutes2}:${seconds2}`;
            console.log(d, d2);
        }
        if (data.online) {
            // Other data
            document.getElementById('server-status-icon').classList.remove('bi-hdd-stack');
            document.getElementById('server-status-icon').classList.add('bi-hdd-stack-fill');
            document.getElementById('server-status').innerText = "Online";
            if (data.eula_blocked == true) {
                document.getElementById('blocked').innerHTML = "Pi Craft has been blocked by Mojang!";
            }
            document.getElementById('players').innerHTML = 'Players: ';
            document.getElementById('player-count').innerHTML = `${data.players.online}/${data.players.max}`;
            if (data.players.online > 0) {
                data.players.list.forEach(player => {
                const li = document.createElement("li");
                li.innerHTML = player;
                document.getElementById("player-list").appendChild(li);
                });
            }
            if (data.software) {
                document.getElementById('server-software').innerHTML = `Version: ${data.software} for `;
            } else {
                document.getElementById('server-software').innerHTML = 'Version: ';
            }
            if (data.debug.bedrock == true) {
                document.getElementById('mc-version').innerHTML = `Minecraft Bedrock Edition ${data.version}`;
            } else {
                document.getElementById('mc-version').innerHTML = `Minecraft Java Edition ${data.version}`;
            }
            } else {
            document.getElementById('server-data').remove();
            document.getElementById('server-status').innerText = "Offline";
            }
        })
        .catch(error => {
            let now = new Date();
            let d = new Date(now.getTime());
            let d2 = new Date(now.getTime() + 1000);
            let year = d.getFullYear();
            let year2 = d2.getFullYear();
            let month = String(d.getMonth() + 1).padStart(2, '0');
            let month2 = String(d2.getMonth() + 1).padStart(2, '0');
            let day = String(d.getDate()).padStart(2, '0');
            let day2 = String(d2.getDate()).padStart(2, '0');
            let hours = String(d.getHours()).padStart(2, '0');
            let hours2 = String(d2.getHours()).padStart(2, '0');
            let minutes = String(d.getMinutes()).padStart(2, '0');
            let minutes2 = String(d2.getMinutes()).padStart(2, '0');
            let seconds = String(d.getSeconds()).padStart(2, '0');
            let seconds2 = String(d2.getSeconds()).padStart(2, '0');
            document.getElementById('server-data').remove();
            document.getElementById('server-status').innerText = "Unreachable";
            document.getElementById('cache-time').innerHTML = `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
            document.getElementById('expire-time').innerHTML = `${year2}-${month2}-${day2} ${hours2}:${minutes2}:${seconds2}`;
            document.getElementById('blocked').innerHTML = "Unable to retrieve data from Minecraft Server Status API. Is it down?";
        }
    );