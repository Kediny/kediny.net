const API_KEY = '90f0038b76c5aacb869424fe52ee09f1';

async function loadAllData() {
    try {
        // 1. CARREGAR CHANGELOG
        const changelogRes = await fetch('data/changelog.json');
        const changelogData = await changelogRes.json();
        const changelogList = document.querySelector('.changelog-list');
        if (changelogList) {
            changelogList.innerHTML = changelogData.map(item => 
                `<li><span>${item.date}</span> - ${item.event}</li>`
            ).join('');
        }

        // 2. CARREGAR READING LIST (READ RECENTLY)
        const linksRes = await fetch('data/links.json');
        const linksData = await linksRes.json();
        const container = document.getElementById('read-recently-container');
        if (container) {
            for (const item of linksData) {
                const response = await fetch(`https://api.linkpreview.net/?key=${API_KEY}&q=${encodeURIComponent(item.url)}`);
                const data = await response.json();

                if (data.title) {
                    container.innerHTML += `
                        <a href="${data.url}" class="read-item" target="_blank">
                            <img src="${data.image || ''}" alt="" onerror="this.style.display='none'">
                            <div class="item-info">
                                <strong>${data.title}</strong>
                                <div style="color: #666; font-size: 0.7rem; margin-top: 4px;">
                                    added ${item.date}
                                </div>
                            </div>
                        </a>
                    `;
                }
            }
        }
    } catch (error) {
        console.error("Erro ao carregar dados:", error);
    }
}

loadAllData();