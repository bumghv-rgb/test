// Inisialisasi AOS (Animasi Muncul)
AOS.init({ duration: 1000, once: true });

const song = document.getElementById("song");
const overlay = document.getElementById("overlay");
const mBtn = document.getElementById("m-btn");

// Fungsi Tombol Buka Undangan
function startWedding() {
    song.play(); // Putar musik
    overlay.style.transform = "translateY(-100%)"; // Efek Tirai ke Atas
    document.body.style.overflow = "auto"; // Aktifkan Scroll
    document.getElementById("music-box").style.display = "block"; // Munculkan Tombol Musik
    
    setTimeout(() => {
        overlay.style.display = "none";
    }, 1200);
}

// Fungsi Play/Pause Musik
function toggleMusic() {
    if (song.paused) {
        song.play();
        mBtn.innerText = "⏸";
    } else {
        song.pause();
        mBtn.innerText = "🎵";
    }
}

// Fungsi Salin Rekening
function copyText(id) {
    const text = document.getElementById(id).innerText;
    navigator.clipboard.writeText(text);
    alert("Nomor rekening berhasil disalin: " + text);
}