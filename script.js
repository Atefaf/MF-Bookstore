AOS.init({ duration: 800, once: true, offset: 30 });
    
// GSAP ScrollTrigger for counter animation
gsap.registerPlugin(ScrollTrigger);

function animateCounter(element, target, isDecimal = false) {
    let start = 0;
    const duration = 2;
    const step = target / (60 * duration);
    let current = start;
    const interval = setInterval(() => {
        current += step;
        if (current >= target) {
            element.innerText = isDecimal ? target.toFixed(1) : Math.floor(target);
            clearInterval(interval);
        } else {
            element.innerText = isDecimal ? current.toFixed(1) : Math.floor(current);
        }
    }, 16);
}

// Trigger counters when section comes into view
const observerOptions = { threshold: 0.3, rootMargin: "0px" };
const counterObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const readers = document.getElementById('counterReaders');
            const downloads = document.getElementById('counterDownloads');
            const countries = document.getElementById('counterCountries');
            const rating = document.getElementById('counterRating');
            if (readers && readers.innerText === '0') animateCounter(readers, 10500);
            if (downloads && downloads.innerText === '0') animateCounter(downloads, 1850);
            if (countries && countries.innerText === '0') animateCounter(countries, 42);
            if (rating && rating.innerText === '0') animateCounter(rating, 4.9, true);
            counterObserver.disconnect();
        }
    });
}, observerOptions);
const statsSection = document.getElementById('statsSection');
if (statsSection) counterObserver.observe(statsSection);

// Books Data
const books = [
    { id:1, title:"العادات الذرية", author:"جيمس كلير", price:"$14.99", category:"تطوير الذات", desc:"تغييرات صغيرة ونتائج مذهلة. دليل متكامل لبناء عادات إيجابية وكسر العادات السلبية.", cover:"https://images.unsplash.com/photo-1544716278-ca5e3f4afd86?w=500&h=700&fit=crop", images:["https://images.unsplash.com/photo-1544716278-ca5e3f4afd86?w=500","https://images.unsplash.com/photo-1589998066242-6021ab630993?w=500","https://images.unsplash.com/photo-1541963463532-d68292c34b19?w=500"], preview:"https://assets.mixkit.co/videos/preview/mixkit-turning-the-pages-of-a-book-4680-large.mp4" },
    { id:2, title:"الخيميائي", author:"باولو كويلو", price:"$9.99", category:"رواية", desc:"قصة خالدة عن اتباع الأحلام. بيع منها أكثر من 80 مليون نسخة حول العالم.", cover:"https://images.unsplash.com/photo-1541963463532-d68292c34b19?w=500", images:["https://images.unsplash.com/photo-1541963463532-d68292c34b19?w=500","https://images.unsplash.com/photo-1512820790803-73ba79603e2d?w=500","https://images.unsplash.com/photo-1497633762265-9d179a990aa6?w=500"], preview:"https://www.youtube.com/embed/H37pY2LgXQ0" },
    { id:3, title:"كود نظيف", author:"روبرت س. مارتن", price:"EGP 450", category:"برمجة", desc:"دليل حرفية البرمجيات. كتاب أساسي لكل مطور يسعى لكتابة كود احترافي.", cover:"https://images.unsplash.com/photo-1532012164542-1452fef088f1?w=500", images:["https://images.unsplash.com/photo-1532012164542-1452fef088f1?w=500","https://images.unsplash.com/photo-1525547719571-a2d4ac8945e2?w=500","https://images.unsplash.com/photo-1587620962725-abab7fe55159?w=500"], preview:"https://assets.mixkit.co/videos/preview/mixkit-hands-typing-on-a-laptop-keyboard-close-up-1554-large.mp4" },
    { id:4, title:"الكثيب", author:"فرانك هربرت", price:"$12.50", category:"خيال علمي", desc:"ملحمة خيال علمي خالدة. رحلة مصير وخيانة على كوكب أراكيس.", cover:"https://images.unsplash.com/photo-1512820790803-73ba79603e2d?w=500", images:["https://images.unsplash.com/photo-1512820790803-73ba79603e2d?w=500","https://images.unsplash.com/photo-1544947950-fa07a98d237f?w=500","https://images.unsplash.com/photo-1521587760476-6c12a4b040da?w=500"], preview:"https://assets.mixkit.co/videos/preview/mixkit-reading-a-book-with-light-shadows-over-the-pages-4684-large.mp4" },
    { id:5, title:"مكتبة منتصف الليل", author:"مات هيغ", price:"$13.99", category:"أدب", desc:"بين الحياة والموت تقع مكتبة تضم كل الاحتمالات. قصة مؤثرة عن الندم والفرص.", cover:"https://images.unsplash.com/photo-1516979187457-637abb4f9353?w=500", images:["https://images.unsplash.com/photo-1516979187457-637abb4f9353?w=500","https://images.unsplash.com/photo-1456513080510-7bf3a84b82f8?w=500"], preview:"https://assets.mixkit.co/videos/preview/mixkit-library-shelves-and-old-books-4485-large.mp4" }
];

let currentBook = null;
const catalogDiv = document.getElementById('catalogContainer');
const mainViewDiv = document.getElementById('mainAppView');
const detailViewDiv = document.getElementById('detailView');
const searchInput = document.getElementById('globalSearch');

function renderCatalog(filter = "") {
    const filtered = books.filter(b => b.title.includes(filter) || b.author.includes(filter));
    catalogDiv.innerHTML = filtered.map(book => `
        <div class="book-card" data-id="${book.id}">
            <div class="card-img" style="position:relative;"><div class="price-tag">${book.price}</div><img src="${book.cover}" alt="${book.title}" loading="lazy"></div>
            <div class="card-body">
                <h3 style="font-size:1.4rem;">${book.title}</h3>
                <p style="color: var(--text-secondary);">${book.author}</p>
                <p style="font-size:0.85rem; margin: 10px 0;">${book.desc.substring(0, 70)}...</p>
                <div class="btn-group">
                    <button class="btn-sm preview-btn" data-preview-id="${book.id}"><i class="fa-regular fa-eye"></i> معاينة</button>
                    <button class="btn-sm buy-btn" data-buy-id="${book.id}"><i class="fa-solid fa-cart-shopping"></i> شراء</button>
                </div>
            </div>
        </div>
    `).join('');
    document.querySelectorAll('.book-card').forEach(card => {
        const id = parseInt(card.dataset.id);
        card.addEventListener('click', (e) => { if(e.target.closest('.preview-btn') || e.target.closest('.buy-btn')) return; openDetailView(id); });
    });
    document.querySelectorAll('[data-preview-id]').forEach(btn => btn.addEventListener('click', (e) => { e.stopPropagation(); openPreviewModal(parseInt(btn.dataset.previewId)); }));
    document.querySelectorAll('[data-buy-id]').forEach(btn => btn.addEventListener('click', (e) => { e.stopPropagation(); openBuyWhatsapp(parseInt(btn.dataset.buyId)); }));
}

function openDetailView(id) {
    const book = books.find(b => b.id === id);
    if(!book) return;
    currentBook = book;
    document.getElementById('detailMainImg').src = book.cover;
    document.getElementById('detailTitle').innerText = book.title;
    document.getElementById('detailAuthor').innerHTML = `<i class="fa-regular fa-user"></i> ${book.author} • ${book.category}`;
    document.getElementById('detailPrice').innerHTML = book.price;
    document.getElementById('detailDesc').innerText = book.desc;
    const thumbStrip = document.getElementById('thumbnailStrip');
    thumbStrip.innerHTML = book.images.map((img, idx) => `<img class="thumb ${idx===0?'active':''}" src="${img}" data-img="${img}" alt="thumb">`).join('');
    document.querySelectorAll('.thumb').forEach(thumb => thumb.addEventListener('click', () => {
        document.getElementById('detailMainImg').src = thumb.dataset.img;
        document.querySelectorAll('.thumb').forEach(t => t.classList.remove('active'));
        thumb.classList.add('active');
    }));
    const actionDiv = document.getElementById('detailActions');
    actionDiv.innerHTML = `<button class="btn-large preview-btn" id="detailPreviewBtn"><i class="fa-regular fa-circle-play"></i> مشاهدة المعاينة</button><button class="btn-large buy-btn" id="detailBuyBtn"><i class="fa-solid fa-bolt"></i> شراء الآن</button>`;
    document.getElementById('detailPreviewBtn').onclick = () => openPreviewModal(book.id);
    document.getElementById('detailBuyBtn').onclick = () => openBuyWhatsapp(book.id);
    mainViewDiv.classList.add('hidden');
    detailViewDiv.classList.remove('hidden');
    window.scrollTo(0,0);
}

function openPreviewModal(id) {
    const b = books.find(bk => bk.id === id);
    if(!b) return;
    const container = document.getElementById('previewVideoContainer');
    document.getElementById('modalPreviewTitle').innerText = `🎬 معاينة: ${b.title}`;
    if(b.preview.includes('youtube.com/embed')) container.innerHTML = `<iframe src="${b.preview}" frameborder="0" allowfullscreen></iframe>`;
    else container.innerHTML = `<video controls autoplay><source src="${b.preview}" type="video/mp4"></video>`;
    document.getElementById('previewModal').classList.add('active');
}

function openBuyWhatsapp(id) {
    const book = books.find(b => b.id === id);
    const msg = `أرغب في شراء كتاب "${book.title}" - ${book.price} من متجر كتبي الرقمية.`;
    window.open(`https://wa.me/+201550537533?text=${encodeURIComponent(msg)}`, '_blank');
}

function backToCatalog() { detailViewDiv.classList.add('hidden'); mainViewDiv.classList.remove('hidden'); window.scrollTo({ top: 0, behavior: 'smooth' }); }
document.getElementById('backFromDetail').addEventListener('click', backToCatalog);
document.getElementById('homeLogo').addEventListener('click', (e) => { e.preventDefault(); backToCatalog(); });
document.getElementById('navHome').addEventListener('click', (e) => { e.preventDefault(); backToCatalog(); });
document.getElementById('navAbout').addEventListener('click', (e) => { e.preventDefault(); backToCatalog(); setTimeout(()=> document.getElementById('aboutSection').scrollIntoView({behavior:'smooth'}),100); });
document.getElementById('navContact').addEventListener('click', (e) => { e.preventDefault(); backToCatalog(); setTimeout(()=> document.getElementById('contactSection').scrollIntoView({behavior:'smooth'}),100); });
searchInput.addEventListener('input', (e) => renderCatalog(e.target.value));

const themeBtn = document.getElementById('globalThemeToggle');
themeBtn.addEventListener('click', () => {
    document.body.classList.toggle('light');
    const icon = themeBtn.querySelector('i');
    icon.className = document.body.classList.contains('light') ? "fa-solid fa-sun" : "fa-solid fa-moon";
});
document.getElementById('closePreviewModal').addEventListener('click', () => { document.getElementById('previewModal').classList.remove('active'); document.getElementById('previewVideoContainer').innerHTML = ''; });
document.getElementById('previewModal').addEventListener('click', (e) => { if(e.target === document.getElementById('previewModal')) { document.getElementById('previewModal').classList.remove('active'); document.getElementById('previewVideoContainer').innerHTML = ''; } });
document.getElementById('fakeContactForm').addEventListener('submit', (e) => { e.preventDefault(); alert('✨ شكراً لتواصلك! سنرد عليك قريباً ✨'); e.target.reset(); });

renderCatalog("");

// GSAP Entrance animation for hero
gsap.from(".hero h1", { duration: 1.2, y: 60, opacity: 0, ease: "power4.out" });
gsap.from(".hero p", { duration: 1, y: 40, opacity: 0, delay: 0.3, ease: "power3.out" });
gsap.from(".search-wrapper", { duration: 1, scale: 0.9, opacity: 0, delay: 0.5, ease: "back.out(1.7)" });

// Particles JS setup
if(typeof particlesJS !== 'undefined') {
    particlesJS('particles-js', {
        "particles": {
            "number": {"value": 80, "density": {"enable": true, "value_area": 800}},
            "color": {"value": ["#2dd4bf", "#a855f7", "#f43f5e"]},
            "shape": {"type": "circle"},
            "opacity": {"value": 0.5, "random": true, "anim": {"enable": true, "speed": 1, "opacity_min": 0.1, "sync": false}},
            "size": {"value": 4, "random": true},
            "line_linked": {"enable": true, "distance": 150, "color": "#a855f7", "opacity": 0.3, "width": 1},
            "move": {"enable": true, "speed": 2, "direction": "none", "random": true, "straight": false, "out_mode": "out", "bounce": false}
        },
        "interactivity": {
            "detect_on": "canvas",
            "events": {
                "onhover": {"enable": true, "mode": "grab"},
                "onclick": {"enable": true, "mode": "push"},
                "resize": true
            },
            "modes": {
                "grab": {"distance": 140, "line_linked": {"opacity": 0.5}},
                "push": {"particles_nb": 3}
            }
        },
        "retina_detect": true
    });
}
