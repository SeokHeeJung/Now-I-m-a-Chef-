const API_BASE = import.meta.env.VITE_API_BASE || "/api";

document.addEventListener("DOMContentLoaded", function () {
    const menuLinks = document.querySelectorAll('nav a[data-panel]');
    const panel = document.getElementById('side-panel');
    const closeBtn = document.getElementById('close-panel');
    const panelContent = document.getElementById('panel-content');
    const savedUser = JSON.parse(localStorage.getItem("user"));
    if (savedUser) {
        updateNavbarForLogin(savedUser.name);
    }

    const panelTemplates = {
        login: `
            <h2>로그인 🔐</h2>
            <form id="login-form">
                <input type="text" id="userId" placeholder="아이디" required><br><br>
                <input type="password" id="password" placeholder="비밀번호" required><br><br>
                <button type="submit">로그인</button>
                <p id="login-message"></p>
                <p>아직 계정이 없으신가요? 👉 <button id="show-register" type="button">회원가입</button></p>
            </form>
        `,
        register: `
            <h2>회원가입 ✍️</h2>
            <form id="register-form">
                <input type="text" id="regId" placeholder="아이디" required><br><br>
                <input type="password" id="regPw" placeholder="비밀번호" required><br><br>
                <input type="text" id="regName" placeholder="이름" required><br><br>
                <button type="submit">가입하기</button>
                <p id="register-message"></p>
            </form>
        `,
        recipe: `<h2>레시피 🍳</h2><p>저장된 레시피 목록입니다.</p>`,
        storage: `
            <h2>🧺 창고</h2>
            <ul id="ingredient-list" class="ingredient-list"><li>불러오는 중...</li></ul>
            <button id="show-add-form" style="margin-top: 10px;">➕ 재료 추가</button>
            <div id="add-ingredient-form" style="display: none; margin-top: 10px;">
                <input type="text" id="ingredient-input" placeholder="예: 양파" />
                <input type="text" id="expiry-input" placeholder="유통기한 YYYY-MM-DD" />
                <button id="add-ingredient-btn">추가</button>
            </div>
        `
    };

    menuLinks.forEach(link => {
        link.addEventListener('click', function (e) {
            e.preventDefault();
            const type = link.getAttribute('data-panel');

            if (type === "home") {
                renderHomePage();
                panel.classList.remove("open");
            } else if (type === "recipe") {
                panel.classList.remove("open");
                renderRecipePage();
            } else if (type === "storage") {
                panelContent.innerHTML = panelTemplates[type];
                panel.classList.add("open");
                const user = JSON.parse(localStorage.getItem("user"));
                if (user) loadUserIngredients(user.id);
            } else {
                panelContent.innerHTML = panelTemplates[type] || "<p>내용 없음</p>";
                panel.classList.add("open");
            }
        });
    });

    closeBtn.addEventListener('click', () => panel.classList.remove('open'));

    document.addEventListener('click', function (e) {
        if (e.target.id === 'show-register') {
            e.preventDefault();
            panelContent.innerHTML = panelTemplates.register;
        }

        if (e.target.id === "logout") {
            e.preventDefault();
            localStorage.removeItem("user");
            location.reload();
        }

        if (e.target.id === 'show-add-form') {
            document.getElementById('add-ingredient-form').style.display = 'block';
        }

        if (e.target.id === 'add-ingredient-btn') {
            const input = document.getElementById("ingredient-input");
            const expiryInput = document.getElementById("expiry-input");
            const value = input.value.trim();
            const expiry = expiryInput.value.trim();
            const user = JSON.parse(localStorage.getItem("user"));
            if (!user) return alert("로그인이 필요합니다.");
            if (!value) return;

            fetch(`${API_BASE}/user/ingredients`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    id: user.id,
                    ingredient: value,
                    expiry: expiry
                })
            })
                .then(res => res.json())
                .then(() => {
                    input.value = "";
                    expiryInput.value = "";
                    loadUserIngredients(user.id);
                })
                .catch(() => alert("재료 추가 실패"));
        }

        if (e.target.classList.contains('remove-ingredient')) {
            const name = e.target.dataset.name;
            const user = JSON.parse(localStorage.getItem("user"));
            if (!user) return alert("로그인이 필요합니다.");

            fetch(`${API_BASE}/user/ingredients`, {
                method: "DELETE",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ id: user.id, ingredient: name })
            })
                .then(res => res.json())
                .then(() => loadUserIngredients(user.id))
                .catch(() => alert("재료 삭제 실패"));
        }

        if (e.target.id === 'like-btn') {
            const id = document.getElementById('comment-form').dataset.id;
            fetch(`${API_BASE}/api/recipes/${id}/like`, { method: 'POST' })
                .then(res => res.json())
                .then(data => {
                    document.getElementById('like-count').textContent = data.likes;
                });
        }

        if (e.target.id === 'dislike-btn') {
            const id = document.getElementById('comment-form').dataset.id;
            fetch(`${API_BASE}/api/recipes/${id}/dislike`,  { method: 'POST' })
                .then(res => res.json())
                .then(data => {
                    document.getElementById('dislike-count').textContent = data.dislikes;
                });
        }
    });

    document.addEventListener("submit", function (e) {
        e.preventDefault();

        if (e.target.id === "login-form") {
            const id = document.getElementById("userId").value;
            const pw = document.getElementById("password").value;

            fetch(`${API_BASE}/login`,  {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ id, pw })
            })
                .then(res => res.json())
                .then(data => {
                    if (data.success) {
                        localStorage.setItem("user", JSON.stringify({ id, name: data.name }));
                        updateNavbarForLogin(data.name);
                        panel.classList.remove("open");
                    } else {
                        document.getElementById("login-message").textContent = data.message;
                    }
                })
                .catch(() => {
                    document.getElementById("login-message").textContent = "로그인 실패 😢";
                });
        }

        if (e.target.id === "register-form") {
            const id = document.getElementById("regId").value;
            const pw = document.getElementById("regPw").value;
            const name = document.getElementById("regName").value;

            fetch(`${API_BASE}/register`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ id, pw, name })
            })
                .then(res => res.json())
                .then(data => {
                    if (data.success) {
                        localStorage.setItem("user", JSON.stringify({ id, name }));
                        updateNavbarForLogin(name);
                        panel.classList.remove("open");
                    }
                    document.getElementById("register-message").textContent = data.message;
                })
                .catch(() => {
                    document.getElementById("register-message").textContent = "회원가입 실패 😢";
                });
        }

        if (e.target.id === 'comment-form') {
            const text = document.getElementById('comment-input').value.trim();
            if (!text) return;
            const user = JSON.parse(localStorage.getItem('user'));
            const id = e.target.dataset.id;
            fetch(`${API_BASE}/api/recipes/${id}/comments`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ user: user ? user.name : '익명', text })
            })
                .then(res => res.json())
                .then(data => {
                    document.getElementById('comment-input').value = '';
                    document.getElementById('comment-list').innerHTML = data.comments.map(c => `<li><strong>${c.user || '익명'}</strong>: ${c.text}</li>`).join('');
                });
        }
    });

    panelTemplates.recipe = `
        <div class="recipe-panel-header">
            <input type="text" id="recipe-search" placeholder="레시피 검색하기 🔍">
        </div>
        <div class="recipe-grid" id="recipe-grid">로딩 중...</div>
    `;
});

function updateNavbarForLogin(name) {
    const authSection = document.getElementById("auth-section");
    if (authSection) {
        authSection.innerHTML = `
            <span>👋 ${name}님</span>
            <a href="#" id="logout">로그아웃</a>
        `;
    }
}

function renderHomePage() {
    const main = document.getElementById("main-content");
    if (!main) return;

    main.className = "hero";
    main.innerHTML = `
        <div class="search-overlay">
            <form class="search-box" id="home-search-form">
                <input type="text" id="home-search-input" placeholder="음식을 검색하세요" />
                <button type="submit">검색</button>
            </form>
        </div>
    `;

    document.getElementById("home-search-form").addEventListener("submit", function (e) {
        e.preventDefault();
        const keyword = document.getElementById("home-search-input").value.trim();
        renderRecipePage(keyword);
    });
}

function renderRecipePage(keyword = "") {
    const main = document.getElementById("main-content");
    if (!main) return;

    main.className = "recipe-page";
    main.innerHTML = `
        <section class="recipe-search">
            <form id="search-form">
                <input type="text" id="recipe-search-input" placeholder="레시피 검색..." value="${keyword}" />
                <button type="submit">검색</button>
            </form>
        </section>
        <section class="recipe-list" id="recipe-list">
            <p>로딩 중...</p>
        </section>
    `;

    fetch(`${API_BASE}/recipes`)
        .then(res => res.json())
        .then(recipes => {
            const list = document.getElementById("recipe-list");

            const renderCards = (data) => {
                if (!data.length) {
                    list.innerHTML = "<p>검색 결과가 없습니다.</p>";
                    return;
                }
                list.innerHTML = data.map(recipe => `
                    <div class="recipe-card"
                        data-id="${recipe._id}"
                        data-title="${recipe.title}"
                        data-desc="${(recipe.description || '').replace(/\n/g, '<br>')}"
                        data-img="${recipe.image}"
                        data-ing="${(recipe.ingredients || []).join(', ')}"
                        data-likes="${recipe.likes || 0}"
                        data-dislikes="${recipe.dislikes || 0}">
                        <div class="card-inner">
                            <div class="card-front">
                                <img src="${recipe.image}" alt="${recipe.title}" />
                                <h3>${recipe.title}</h3>
                            </div>
                        </div>
                    </div>
                `).join("");

                document.querySelectorAll('.recipe-card').forEach(card => {
                    card.addEventListener('click', () => {
                        const id = card.dataset.id;
                        document.getElementById('modal-title').textContent = card.dataset.title;
                        document.getElementById('modal-description').innerHTML = card.dataset.desc;
                        document.getElementById('modal-image').src = card.dataset.img;
                        document.getElementById('modal-ingredients').textContent = card.dataset.ing || "정보 없음";
                        document.getElementById('like-count').textContent = card.dataset.likes;
                        document.getElementById('dislike-count').textContent = card.dataset.dislikes;
                        document.getElementById('comment-form').dataset.id = id;

                        fetch(`${API_BASE}/api/recipes/${id}/comments`)
                            .then(res => res.json())
                            .then(data => {
                                const list = document.getElementById('comment-list');
                                list.innerHTML = (data.comments || []).map(c => `<li><strong>${c.user || '익명'}</strong>: ${c.text}</li>`).join('');
                            });

                        document.getElementById('recipe-modal').classList.remove('hidden');
                    });
                });

                document.getElementById('close-modal').addEventListener('click', () => {
                    document.getElementById('recipe-modal').classList.add('hidden');
                    document.getElementById('comment-list').innerHTML = '';
                });
            };

            const filtered = keyword
                ? recipes.filter(r => r.title.toLowerCase().includes(keyword.toLowerCase()))
                : recipes;

            renderCards(filtered);

            document.getElementById("search-form").addEventListener("submit", function (e) {
                e.preventDefault();
                const input = document.getElementById("recipe-search-input").value.trim().toLowerCase();
                const results = recipes.filter(r => r.title.toLowerCase().includes(input));
                renderCards(results);
            });
        })
        .catch(() => {
            document.getElementById("recipe-list").innerHTML = "<p>레시피를 불러오지 못했습니다.</p>";
        });
}

function loadUserIngredients(userId) {
    fetch(`${API_BASE}/user/ingredients/${userId}`)
        .then(res => res.json())
        .then(data => {
            const list = document.getElementById("ingredient-list");
            if (!list) return;

            const items = data.ingredients || [];
            if (!items.length) {
                list.innerHTML = "<li>창고가 비었습니다.</li>";
            } else {
                list.innerHTML = items.map(i =>
                    `<li>${i.name || i} <small>${i.expiry || ''}</small>` +
                    ` <button class="remove-ingredient" data-name="${i.name || i}">❌</button></li>`
                ).join("");
            }

            document.getElementById("show-add-form").style.display = "block";
        })
        .catch(() => {
            const list = document.getElementById("ingredient-list");
            if (list) list.innerHTML = "<li>불러오기 실패</li>";
        });
}


renderHomePage();
