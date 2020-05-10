// Menangkap pilihan CPU
function getPilihanCPU() {
    const cpu = Math.random(); // <-- Membangkitkan bilangan random
    if (cpu < 0.34) return 'kertas';
    if (cpu >= 0.34 && cpu < 0.67) return 'gunting';
    return 'batu';
}

// Menentukan rules
function getHasil(cpu, player) {
    if (player == cpu) return 'DRAW!';
    if (player == 'batu') return (cpu == 'gunting') ? 'WIN! :D' : 'LOSE! T_T';
    if (player == 'gunting') return (cpu == 'batu') ? 'LOSE! T_T' : 'WIN! :D';
    if (player == 'kertas') return (cpu == 'gunting') ? 'LOSE! T_T' : 'WIN! :D';
}

// Mengacak gambar pilihan CPU
function putar() {
    const imgKomputer = document.querySelector('.img-komputer');

    // Gambar diganti berdasarkan array
    const gambar = ['batu', 'gunting', 'kertas'];
    let i = 0;

    // Mengambil waktu saat fungsi putar dijalankan
    const waktuMulai = new Date().getTime();

    // Mengacak setiap img selama 0.1 detik
    setInterval(function () {
        // Jika waktu saat ini dengan waktu mulai sudah selisih 1 detik
        if (new Date().getTime() - waktuMulai > 1000) {
            clearInterval; // Maka waktu putar dihentikan
            return; // Keluar dari function setInterval
        }
        // Mengganti img CPU dengan index Array tertentu
        imgKomputer.setAttribute('src', 'cpu/' + gambar[i++] + '.png');

        // Jika img sdh selesai diacak
        // Img diulang sesuai sesuai isi Array diatas
        if (i == gambar.length) i = 0;
    }, 100)
}

function selectBatu() {
    const selectBatu = document.getElementsByClassName('batu')[0];
    selectBatu.style.background = 'white';
}

function unselectBatu() {
    const unselectBatu = document.getElementsByClassName('batu')[0];
    unselectBatu.style.background = '';
}

function selectGunting() {
    const selectGunting = document.getElementsByClassName('gunting')[0];
    selectGunting.style.background = 'white';
}

function unselectGunting() {
    const unselectGunting = document.getElementsByClassName('gunting')[0];
    unselectGunting.style.background = '';
}

function selectKertas() {
    const selectKertas = document.getElementsByClassName('kertas')[0];
    selectKertas.style.background = 'white';
}

function unselectKertas() {
    const unselectKertas = document.getElementsByClassName('kertas')[0];
    unselectKertas.style.background = '';
}

// Menyeleksi semua img milik Player
const pilihan = document.querySelectorAll('li img');
// Merepresentasikan 1 img saja berdasarkan pilihan Player
pilihan.forEach(function (pil) {
    pil.addEventListener('click', function () {
        const pilihanCPU = getPilihanCPU();
        const pilihanPlayer = pil.className;

        // Mengaktifkan BG warna putih sesuai pilihan
        if (pil.className == 'batu') {
            selectBatu();
            unselectGunting();
            unselectKertas();
        } else if (pil.className == 'gunting') {
            selectGunting();
            unselectBatu();
            unselectKertas();
        } else if (pil.className == 'kertas') {
            selectKertas();
            unselectGunting();
            unselectBatu();
        } else {
            unselectKertas();
        }

        const hasil = getHasil(pilihanCPU, pilihanPlayer);

        putar();


        // Function akan dijalankan setelah lewat 1 detik
        setTimeout(function () {
            // Mengganti gambar pilihan CPU
            const imgKomputer = document.querySelector('.img-komputer');
            imgKomputer.setAttribute('src', 'cpu/' + pilihanCPU + '.png');

            // Setting info hasil permainan
            const info = document.querySelector('.info');
            info.innerHTML = hasil;

            // Tampilkan total score CPU VS Player
            let scorePoint = 1;
            if (hasil == 'LOSE! T_T') {
                scorePoint = document.querySelector('.area-komputer h1.score');
                scorePoint.innerHTML++;
            } else if (hasil == 'WIN! :D') {
                scorePoint = document.querySelector('.area-player h1.score');
                scorePoint.innerHTML++;
            }
        }, 1000);
    });
});