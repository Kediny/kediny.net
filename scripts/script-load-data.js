const API_KEY = '90f0038b76c5aacb869424fe52ee09f1';

async function getLinkData(url) {
    const cacheKey = `lp_${btoa(url)}`;
    const cached = localStorage.getItem(cacheKey);

    if (cached) return JSON.parse(cached);

    try {
        const response = await fetch(`https://api.linkpreview.net/?key=${API_KEY}&q=${encodeURIComponent(url)}`);
        
        if (response.status === 429) {
            console.warn("Limite da API atingido. A mostrar link simples.");
            return null;
        }

        const data = await response.json();
        localStorage.setItem(cacheKey, JSON.stringify(data));
        return data;
    } catch (e) {
        return null;
    }
}

async function loadAllData() {
    try {
        // CARREGAR CHANGELOG
        const changelogRes = await fetch('data/changelog.json');
        const changelogData = await changelogRes.json();
        const changelogList = document.querySelector('.changelog-list');
        if (changelogList) {
            changelogList.innerHTML = changelogData.map(item => 
                `<li><span>${item.date}</span> - ${item.event}</li>`
            ).join('');
        }

        // CARREGAR ARTIGOS
        const linksRes = await fetch('data/links.json');
        const linksData = await linksRes.json();
        const container = document.getElementById('read-recently-container');

        if (container) {
            for (const item of linksData) {
                const data = await getLinkData(item.url);
                if (!data) {
                    container.innerHTML += `
                        <a href="${item.url}" class="read-item" target="_blank">
                            <div class="item-info">
                                <strong>${item.url}</strong>
                                <div style="color: #666; font-size: 0.7rem; margin-top: 4px;"> ${item.date} (preview indisponível)</div>
                            </div>
                        </a>`;
                    continue;
                }

                container.innerHTML += `
                    <a href="${data.url}" class="read-item" target="_blank">
                        <img src="${data.image || ''}" alt="" onerror="this.style.display='none'">
                        <div class="item-info">
                            <strong>${data.title}</strong>
                            <div style="color: #666; font-size: 0.7rem; margin-top: 4px;"> ${item.date}</div>
                        </div>
                    </a>`;
            }
        }
    } catch (error) {
        console.error("Erro geral:", error);
    }
}

loadAllData();