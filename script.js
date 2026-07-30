// ============================================
// 0. NAVIGASI ANTAR SCENE
// ============================================
function goToScene(number) {
  document.querySelectorAll('.scene').forEach(el => el.classList.remove('active'));
  const target = document.getElementById('scene-' + number);
  target.classList.add('active');
}


// ============================================
// 1. MUSIK (mulai setelah tombol "Mulai" diklik)
// ============================================
const bgMusic = document.getElementById('bg-music');
const musicToggle = document.getElementById('music-toggle');
let isPlaying = false;

function tryPlayMusic() {
  bgMusic.play().then(() => {
    isPlaying = true;
    musicToggle.classList.add('playing');
  }).catch(err => {
    console.log('Musik belum bisa diputar otomatis:', err);
  });
}

musicToggle.addEventListener('click', () => {
  if (isPlaying) {
    bgMusic.pause();
    musicToggle.classList.remove('playing');
  } else {
    tryPlayMusic();
  }
  isPlaying = !isPlaying;
});


// ============================================
// 2. SCENE 1 -> SCENE 2 (tombol Mulai)
// ============================================
document.getElementById('btn-mulai').addEventListener('click', () => {
  tryPlayMusic();
  goToScene(2);
  runLoadingSequence();
});


// ============================================
// 3. SCENE 2 : LOADING MEMORIES
// ============================================
function runLoadingSequence() {
  const percentEl = document.getElementById('loading-percent');
  const haiAdek = document.getElementById('hai-adek');
  const steps = [0, 15, 34, 67, 100];
  let i = 0;

  const interval = setInterval(() => {
    percentEl.textContent = steps[i] + '%';
    i++;
    if (i >= steps.length) {
      clearInterval(interval);
      setTimeout(() => {
        haiAdek.classList.remove('hidden');
        setTimeout(() => goToScene(3), 1600);
      }, 400);
    }
  }, 550);
}


// ============================================
// 4. SCENE 3 : AMPLOP
// ============================================
const envelope = document.getElementById('envelope');
const envelopeHint = document.getElementById('envelope-hint');
const btnBacaSurat = document.getElementById('btn-baca-surat');

envelope.addEventListener('click', () => {
  if (envelope.classList.contains('open')) return;
  envelope.classList.add('open');
  envelopeHint.classList.add('hidden');
  setTimeout(() => {
    btnBacaSurat.classList.remove('hidden');
  }, 900);
});

btnBacaSurat.addEventListener('click', () => {
  goToScene(4);
  startTypewriter();
});


// ============================================
// 5. SCENE 4 : SURAT (efek ketik)
// ============================================
const letterParagraphs = [
  "Halo adek....",
  "Abang ucapkan selamat buat kita berdua karena sudah saling menemani, saling menyayangi, dan saling memaafkan antara satu sama lain selama 2 tahun ini...",
  "Kerasa banget yaa perjalanan 2 tahun kita bersama. Asam manis pahit pedes gurih apapun itu kita udah lewatin sama-sama selama ini ahahahahah. Ntah sudah seberapa kuat hubungan ini menempa dan membawa kita melangkah lebih jauh kedepan.",
  "Terima kasih adek, sudah bertahan bersama abang selama dan sejauh ini. Terima kasih atas segala waktu, usaha, dan juga kasih sayang yang adek tuangkan dalam hubungan kita ini. Terima kasih, karena telah menjadi rumah tempat abang pulang, melepas segala lelah, dan berkeluh kesah. Terima kasih karena telah lahir ke dunia ini, menjadi pendamping hidup abang yang penuh dengan kelok 9 ini.",
  "Abang harap kita akan selamanya seperti ini, selalu bersama, saling menguatkan, dan saling belajar... Belajar memahami satu sama lain, belajar untuk selalu membuat kebahagiaan dari segala kesederhanaan, dan selalu belajar untuk memberikan tempat yang teduh bagi setiap sukar dan kesedihan kita. Semoga di tahun kedua kita ini, segala sesuatu yang kita harapkan berjalan dengan lancar. Meskipun dengan dinamika yang ada, semoga kita selalu mampu mengusahakan dan menemukan segala cara untuk selalu memperbaiki.",
  "Selamat tanggal 30 juli adek, abang sayang sama adek, sekarang dan selamanya. Tetaplah menjadi, tempat abang kembali pulang. Abang bergantung sepenuhnya dengan adek, abang harap adek pun demikian."
];

const fullLetterText = letterParagraphs.join('\n\n');
const typewriterEl = document.getElementById('typewriter-text');
const btnSkip = document.getElementById('btn-skip');
const btnLihatKenangan = document.getElementById('btn-lihat-kenangan');

let typeIndex = 0;
let typeInterval = null;
let typingDone = false;

function startTypewriter() {
  typewriterEl.textContent = '';
  typeIndex = 0;
  typingDone = false;
  btnLihatKenangan.classList.add('hidden');
  btnSkip.classList.remove('hidden');

  clearInterval(typeInterval);
  typeInterval = setInterval(() => {
    typewriterEl.textContent += fullLetterText[typeIndex];
    typeIndex++;
    if (typeIndex >= fullLetterText.length) {
      finishTyping();
    }
  }, 22);
}

function finishTyping() {
  clearInterval(typeInterval);
  typewriterEl.textContent = fullLetterText;
  typingDone = true;
  btnSkip.classList.add('hidden');
  btnLihatKenangan.classList.remove('hidden');
}

btnSkip.addEventListener('click', () => {
  if (!typingDone) finishTyping();
});

btnLihatKenangan.addEventListener('click', () => {
  goToScene(5);
  revealGallery();
});


// ============================================
// 6. SCENE 5 : GALERI (muncul satu-satu)
// ============================================
function revealGallery() {
  const imgs = document.querySelectorAll('.gallery-img');
  imgs.forEach((img, idx) => {
    img.classList.remove('shown');
    setTimeout(() => img.classList.add('shown'), idx * 350 + 200);
  });
}

document.getElementById('btn-ke-timeline').addEventListener('click', () => {
  goToScene(6);
  updateDaysCounter();
});


// ============================================
// 7. SCENE 6 : HITUNG HARI BERSAMA
// ============================================
// GANTI tanggal ini kalau tanggal jadian sebenarnya berbeda, format 'YYYY-MM-DD'
const START_DATE = new Date('2024-07-30');

function updateDaysCounter() {
  const today = new Date();
  const diffDays = Math.floor((today - START_DATE) / (1000 * 60 * 60 * 24));
  document.getElementById('days-number').textContent = diffDays;
}

document.getElementById('btn-ke-pesan').addEventListener('click', () => {
  goToScene(7);
  revealFinalMessage();
});


// ============================================
// 8. SCENE 7 : PESAN TERAKHIR (fade satu-satu)
// ============================================
function revealFinalMessage() {
  const lines = document.querySelectorAll('.fade-line');
  const btnEnding = document.getElementById('btn-ke-ending');
  btnEnding.classList.add('hidden');

  lines.forEach(line => line.classList.remove('shown'));

  lines.forEach((line, idx) => {
    setTimeout(() => {
      line.classList.add('shown');
      if (idx === lines.length - 1) {
        setTimeout(() => btnEnding.classList.remove('hidden'), 800);
      }
    }, idx * 1000 + 300);
  });
}

document.getElementById('btn-ke-ending').addEventListener('click', () => {
  goToScene(8);
  startHeartRain();
});


// ============================================
// 9. SCENE 8 : HUJAN HATI
// ============================================
let heartRainInterval = null;

function startHeartRain() {
  const container = document.getElementById('heart-rain');
  container.innerHTML = '';
  clearInterval(heartRainInterval);

  heartRainInterval = setInterval(() => {
    const heart = document.createElement('span');
    heart.className = 'falling-heart';
    heart.textContent = ['❤', '💕', '💗', '✨'][Math.floor(Math.random() * 4)];
    heart.style.left = Math.random() * 100 + '%';
    heart.style.fontSize = (14 + Math.random() * 14) + 'px';
    const duration = 4 + Math.random() * 3;
    heart.style.animationDuration = duration + 's';
    container.appendChild(heart);
    setTimeout(() => heart.remove(), duration * 1000);
  }, 300);
}

document.getElementById('btn-replay').addEventListener('click', () => {
  clearInterval(heartRainInterval);
  goToScene(1);
});