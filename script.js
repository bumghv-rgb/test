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

// 1. Inisialisasi AOS & Data
AOS.init({ duration: 1000, once: true });
let wishesData = JSON.parse(localStorage.getItem('weddingWishes')) || [];

// 2. Fungsi Update Tampilan (Warna & Ikon Status)
function updateDisplay() {
    const container = document.getElementById('wishes-container');
    if (!container) return;
    
    container.innerHTML = '';
    let counts = { Hadir: 0, "Tidak Hadir": 0, "Masih Ragu": 0 };

    wishesData.forEach(wish => {
        // Hitung Statistik
        if(counts[wish.kehadiran] !== undefined) counts[wish.kehadiran]++;
        
        // Logika Ikon dan Warna Berdasarkan Status
        let icon = '⚠️'; 
        let color = '#fbc02d'; // Kuning (Ragu)
        
        if (wish.kehadiran === 'Hadir') {
            icon = '✅'; color = '#2e7d32'; // Hijau
        } else if (wish.kehadiran === 'Tidak Hadir') {
            icon = '❌'; color = '#c62828'; // Merah
        }

        const card = document.createElement('div');
        card.className = 'wish-card';
        card.style.borderLeft = `5px solid ${color}`;
        card.style.background = "rgba(255,255,255,0.05)";
        card.style.padding = "15px";
        card.style.marginBottom = "10px";
        card.style.borderRadius = "10px";

        card.innerHTML = `
            <div style="display:flex; justify-content:space-between;">
                <strong style="color:#fff;">${wish.nama}</strong>
                <span>${icon}</span>
            </div>
            <p style="margin:8px 0; color:#eee;">${wish.ucapan}</p>
            <small style="color:#aaa; font-size:0.7rem;">${wish.waktu}</small>
        `;
        container.prepend(card);
    });

    // Update Angka Statistik
    if(document.getElementById('count-hadir')) {
        document.getElementById('count-hadir').innerText = counts['Hadir'];
        document.getElementById('count-tidak').innerText = counts['Tidak Hadir'];
        document.getElementById('count-ragu').innerText = counts['Masih Ragu'];
    }
}

// 3. Handler Kirim Form & Munculkan QR
const rsvpForm = document.getElementById('rsvp-form');
if (rsvpForm) {
    rsvpForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        const nama = document.getElementById('input-nama').value;
        const hadir = document.getElementById('input-kehadiran').value;
        const ucapan = document.getElementById('input-ucapan').value;
        const waktu = new Date().toLocaleString('id-ID');

        const dataBaru = { nama, ucapan, kehadiran: hadir, waktu };
        wishesData.push(dataBaru);
        localStorage.setItem('weddingWishes', JSON.stringify(wishesData));

        // Generate & Tampilkan QR Modal
        const isiQR = `TAMU: ${nama} | STATUS: ${hadir}`;
        const urlQR = `https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=${encodeURIComponent(isiQR)};`;
        
        document.getElementById('qrcode-area').innerHTML = `<img src="${urlQR}" style="width:180px;">`;
        document.getElementById('qr-name-display').innerText = nama;
        document.getElementById('qr-modal').style.display = 'flex';

        rsvpForm.reset();
        updateDisplay();
    });
}

// 4. Fungsi Pelengkap (Tutup Modal & Reset Rahasia)
function closeModal() { document.getElementById('qr-modal').style.display = 'none'; }

document.getElementById('reset-trigger')?.addEventListener('click', function() {
    window.klik = (window.klik || 0) + 1;
    if (window.klik === 5) {
        if (prompt("Password Admin:") === 'admin123') {
            localStorage.removeItem('weddingWishes');
            location.reload();
        }
        window.klik = 0;
    }
});

// Panggil saat pertama buka
updateDisplay();

// Jalankan saat halaman dibuka
updateDisplay();

// --- LOGIKA RESET RAHASIA ---
let clickCount = 0;
const resetTrigger = document.getElementById('reset-trigger');

resetTrigger.addEventListener('click', function() {
    clickCount++;
    
    // Jika judul "Wishes" diklik 5 kali berturut-turut
    if (clickCount === 5) {
        const password = prompt("Masukkan kode akses untuk reset data:");
        
        // Anda bisa mengganti 'admin123' dengan kode pilihan Anda
        if (password === 'admin123') {
            if (confirm("Hapus semua data ucapan dan statistik?")) {
                localStorage.removeItem('weddingWishes');
                // Reload halaman untuk membersihkan semua variabel
                location.reload(); 
            }
        } else {
            alert("Kode salah!");
        }
        clickCount = 0; // Reset hitungan klik
    }

    // Reset hitungan jika tidak diklik lagi dalam 3 detik
    setTimeout(() => { clickCount = 0; }, 3000);
});

// Fungsi Salin Rekening
function copyText(id) {
    const text = document.getElementById(id).innerText;
    navigator.clipboard.writeText(text);
    alert("Nomor rekening berhasil disalin: " + text);
}

// --- LOGIKA COUNTDOWN TIMER ---
function updateCountdown() {
    // Tentukan tanggal pernikahan (30 Mei 2026 jam 08:00)
    const weddingDate = new Date("May 30, 2026 08:00:00").getTime();
    const now = new Date().getTime();
    const distance = weddingDate - now;

    // Perhitungan waktu
    const d = Math.floor(distance / (1000 * 60 * 60 * 24));
    const h = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const m = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
    const s = Math.floor((distance % (1000 * 60)) / 1000);

    // Tampilkan ke HTML
    document.getElementById("days").innerText = d < 10 ? "0" + d : d;
    document.getElementById("hours").innerText = h < 10 ? "0" + h : h;
    document.getElementById("minutes").innerText = m < 10 ? "0" + m : m;
    document.getElementById("seconds").innerText = s < 10 ? "0" + s : s;

    // Jika waktu habis
    if (distance < 0) {
        clearInterval(countdownInterval);
        document.getElementById("timer").innerHTML = "<h3>Acara Sedang Berlangsung!</h3>";
    }
}

// Jalankan setiap 1 detik
const countdownInterval = setInterval(updateCountdown, 1000);
updateCountdown(); // Jalankan sekali di awal agar tidak menunggu 1 detik
