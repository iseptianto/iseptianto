const filterButtons = document.querySelectorAll('.filter button');
const images = document.querySelectorAll('.images .image');
const readMoreLink = document.querySelector('.read-more');
const readLessLink = document.querySelector('.read-less');

const MAX_VISIBLE_IMAGES = 8; // Jumlah gambar yang ditampilkan secara awal

let currentFilter = 'all'; // Filter saat ini

// Menampilkan gambar-gambar yang tersembunyi
function showHiddenImages() {
  images.forEach(image => {
    if (currentFilter === 'all' || image.classList.contains(currentFilter)) {
      image.style.display = 'block';
    }
  });
  readMoreLink.style.display = 'none';
  readLessLink.style.display = 'inline';
}

// Menyembunyikan gambar-gambar kecuali 4 gambar pertama
function hideImagesExceptFirstFour() {
  images.forEach((image, index) => {
    if (index >= MAX_VISIBLE_IMAGES || (currentFilter !== 'all' && !image.classList.contains(currentFilter))) {
      image.style.display = 'none';
    } else {
      image.style.display = 'block';
    }
  });
  readMoreLink.style.display = 'inline';
  readLessLink.style.display = 'none';
}

// Mengatur event listener untuk tombol "Read More" dan "Read Less"
readMoreLink.addEventListener('click', function(event) {
  event.preventDefault();
  showHiddenImages();
});

readLessLink.addEventListener('click', function(event) {
  event.preventDefault();
  hideImagesExceptFirstFour();
});

// Menyembunyikan gambar-gambar kecuali 4 gambar pertama saat halaman dimuat
hideImagesExceptFirstFour();

// Event listener untuk tombol filter
filterButtons.forEach(button => {
  button.addEventListener('click', function() {
    currentFilter = this.dataset.filter;

    filterButtons.forEach(btn => {
      if (btn === this) {
        btn.classList.add('active');
      } else {
        btn.classList.remove('active');
      }
    });

    hideImagesExceptFirstFour();
  });
});
