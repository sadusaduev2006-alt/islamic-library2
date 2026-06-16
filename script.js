const library = {
    'akyda': {
        title: '📖 Акыда',
        desc: 'основы вероубеждения',
        icon: '📖',
        books: []
    },
    'tafsir': {
        title: '📖 Тафсир',
        desc: 'толкование Корана',
        icon: '📖',
        books: []
    },
    'fikh': {
        title: '📖 Фикх',
        desc: 'практические предписания',
        icon: '📖',
        books: []
    },
    'sira': {
        title: '📖 Сира',
        desc: 'жизнь Пророка (ﷺ)',
        icon: '📖',
        books: []
    }
};

const audioData = { reciters: [] };

const mainMenu = document.getElementById('mainMenu');
const catalogSection = document.getElementById('catalogSection');
const audioSection = document.getElementById('audioSection');
const catalogCategories = document.getElementById('catalogCategories');
const booksListContainer = document.getElementById('booksListContainer');
const audioContent = document.getElementById('audioContent');

function showMainMenu() {
    mainMenu.style.display = 'block';
    catalogSection.style.display = 'none';
    audioSection.style.display = 'none';
    booksListContainer.innerHTML = '';
    window.scrollTo({ top: 0, behavior: 'smooth' });
}

function showCatalog() {
    mainMenu.style.display = 'none';
    catalogSection.style.display = 'block';
    audioSection.style.display = 'none';
    renderCatalogCategories();
    booksListContainer.innerHTML = '';
    window.scrollTo({ top: 0, behavior: 'smooth' });
}

function showAudio() {
    mainMenu.style.display = 'none';
    catalogSection.style.display = 'none';
    audioSection.style.display = 'block';
    renderAudioContent();
    window.scrollTo({ top: 0, behavior: 'smooth' });
}

function renderCatalogCategories() {
    let html = '';
    for (const [key, data] of Object.entries(library)) {
        html += `
            <button class="catalog-cat-btn" onclick="showBooks('${key}')">
                <span class="cat-icon">${data.icon}</span>
                <span class="cat-name">${data.title}</span>
                <span class="cat-desc">${data.desc}</span>
            </button>
        `;
    }
    catalogCategories.innerHTML = html;
    catalogCategories.style.display = 'grid';
}

function showBooks(category) {
    const data = library[category];
    if (!data) return;

    catalogCategories.style.display = 'none';

    let html = `
        <div style="margin-bottom: 12px;">
            <button class="back-btn" onclick="showCatalogCategories()" style="margin-bottom: 4px;">← Назад</button>
            <h3 style="font-size: 18px; color: var(--green);">${data.title}</h3>
        </div>
        <div class="books-list">
    `;

    if (data.books.length === 0) {
        html += `
            <div class="empty-message">
                <span class="empty-icon">📭</span>
                В этом разделе пока нет книг.<br>
                <span style="font-size: 13px; color: var(--text-muted);">Книги будут добавлены позже, иншаАллах.</span>
            </div>
        `;
    } else {
        data.books.forEach((book) => {
            html += `
                <div class="book-card">
                    <div>
                        <div class="book-name">${book.name}</div>
                        <div class="book-author">${book.author}</div>
                    </div>
                    <button class="download-btn" onclick="downloadBook('${book.file}', '${book.name}')">📥 Скачать</button>
                </div>
            `;
        });
    }

    html += '</div>';
    booksListContainer.innerHTML = html;
}

function showCatalogCategories() {
    catalogCategories.style.display = 'grid';
    booksListContainer.innerHTML = '';
}

function renderAudioContent() {
    if (audioData.reciters.length === 0) {
        audioContent.innerHTML = `
            <div class="empty-message">
                <span class="empty-icon">🎙️</span>
                Аудио раздел пока пуст.<br>
                <span style="font-size: 13px; color: var(--text-muted);">Чтецы и аудио будут добавлены позже, иншаАллах.</span>
            </div>
        `;
        return;
    }

    let html = '';
    audioData.reciters.forEach((reciter) => {
        html += `
            <div class="reciter-card">
                <div class="reciter-name">
                    <span>${reciter.icon || '🎙️'}</span>
                    ${reciter.name}
                </div>
                <div class="reciter-desc">${reciter.desc || ''}</div>
                <div class="audio-list">
        `;

        if (reciter.audios && reciter.audios.length > 0) {
            reciter.audios.forEach((audio) => {
                html += `
                    <div class="audio-item">
                        <span class="audio-name">${audio.name}</span>
                        <button class="audio-play-btn" onclick="playAudio('${audio.file}')">▶</button>
                        <button class="audio-download-btn" onclick="downloadAudio('${audio.file}', '${audio.name}')">📥</button>
                    </div>
                `;
            });
        } else {
            html += `<div style="padding:6px 0;color:var(--text-muted);font-size:13px;">Аудио пока нет</div>`;
        }

        html += `</div></div>`;
    });

    audioContent.innerHTML = html;
}

function downloadBook(file, name) {
    if (!file || file === 'путь/к/файлу.pdf') {
        showToast(`📚 Книга "${name}" будет добавлена позже, иншаАллах!`);
    } else {
        const a = document.createElement('a');
        a.href = file;
        a.download = name + '.pdf';
        a.click();
        showToast(`📥 Скачивание: "${name}"`);
    }
}

function playAudio(file) {
    if (!file || file === 'путь/к/аудио.mp3') {
        showToast('🎵 Аудио будет доступно позже, иншаАллах!');
    } else {
        new Audio(file).play();
        showToast('▶️ Воспроизведение');
    }
}

function downloadAudio(file, name) {
    if (!file || file === 'путь/к/аудио.mp3') {
        showToast(`🎵 Аудио "${name}" будет добавлено позже, иншаАллах!`);
    } else {
        const a = document.createElement('a');
        a.href = file;
        a.download = name + '.mp3';
        a.click();
        showToast(`📥 Скачивание: "${name}"`);
    }
}

function showSection(name) {
    showToast(`📂 Раздел "${name}" будет доступен позже, иншаАллах!`);
}

let toastTimeout;

function showToast(msg) {
    const old = document.querySelector('.toast');
    if (old) { old.remove(); clearTimeout(toastTimeout); }

    const t = document.createElement('div');
    t.className = 'toast';
    t.textContent = msg;
    document.body.appendChild(t);

    setTimeout(() => t.classList.add('show'), 10);

    toastTimeout = setTimeout(() => {
        t.classList.remove('show');
        setTimeout(() => t.remove(), 400);
    }, 3000);
}

document.addEventListener('DOMContentLoaded', showMainMenu);
