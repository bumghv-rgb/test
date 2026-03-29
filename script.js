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

// Data Dummy untuk inisialisasi (Bisa diganti integrasi database/Firebase nantinya)
let wishesData = JSON.parse(localStorage.getItem('weddingWishes')) || [];

const rsvpForm = document.getElementById('rsvp-form');
const wishesContainer = document.getElementById('wishes-container');

// Fungsi Update Statistik & List
function updateDisplay() {
    wishesContainer.innerHTML = '';
    let counts = { Hadir: 0, "Tidak Hadir": 0, "Masih Ragu": 0 };

    wishesData.forEach(wish => {
        counts[wish.kehadiran]++;
        
        // Buat elemen ucapan
        const card = document.createElement('div');
        card.className = 'wish-card';
        card.innerHTML = `
            <strong>${wish.nama} ✅</strong>
            <p>${wish.ucapan}</p>
            <small>${wish.waktu}</small>
        `;
        wishesContainer.prepend(card);
    });

    // Update angka di kotak warna
    document.getElementById('count-hadir').innerText = counts['Hadir'];
    document.getElementById('count-tidak').innerText = counts['Tidak Hadir'];
    document.getElementById('count-ragu').innerText = counts['Masih Ragu'];
}

// Handler Form Submit
rsvpForm.addEventListener('submit', function(e) {
    e.preventDefault();

    const newWish = {
        nama: document.getElementById('input-nama').value,
        ucapan: document.getElementById('input-ucapan').value,
        kehadiran: document.getElementById('input-kehadiran').value,
        waktu: new Date().toLocaleString('id-ID')
    };

    wishesData.push(newWish);
    localStorage.setItem('weddingWishes', JSON.stringify(wishesData));
    
    rsvpForm.reset();
    updateDisplay();
    alert('Terima kasih atas ucapannya!');
});

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
        if (password === 'test123') {
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
