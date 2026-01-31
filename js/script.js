// Inicialização de Ícones Lucide
lucide.createIcons();

// 1. Banner de Datas Dinâmicas
function updateDates() {
    const today = new Date();
    const d1 = new Date(); d1.setDate(today.getDate() - 1);
    const d2 = new Date(); d2.setDate(today.getDate() - 2);
    
    const pad = (n) => n.toString().padStart(2, '0');
    const placeholder = document.getElementById('dates-placeholder');
    if (placeholder) {
        placeholder.innerText = `${pad(d2.getDate())}, ${pad(d1.getDate())} E ${pad(today.getDate())}`;
    }
}
updateDates();

// 2. Countdown Timer (16 minutos)
let timeInSeconds = 16 * 60;
const timerDisplay = document.getElementById('timer-val');

const timerInterval = setInterval(() => {
    if (timeInSeconds <= 0) {
        clearInterval(timerInterval);
        return;
    }
    timeInSeconds--;
    const minutes = Math.floor(timeInSeconds / 60);
    const seconds = timeInSeconds % 60;
    if (timerDisplay) {
        timerDisplay.innerText = `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
    }
}, 1000);

// 3. Carousel de Depoimentos
const testimonials = [
    "https://res.cloudinary.com/drcqck3r9/image/upload/v1769884567/DEPO_01_uoghex.webp",
    "https://res.cloudinary.com/drcqck3r9/image/upload/v1769884567/DEPO_02_gfo0ai.webp",
    "https://res.cloudinary.com/drcqck3r9/image/upload/v1769884568/DEPO_03_up9aaz.webp",
    "https://res.cloudinary.com/drcqck3r9/image/upload/v1769884568/DEPO_04_nc6sot.webp",
    "https://res.cloudinary.com/drcqck3r9/image/upload/v1769884568/DEPO_05_i3d7vm.webp"
];

let currentIndex = 0;
const track = document.getElementById('carousel-track');
const dotsContainer = document.getElementById('carousel-dots');

// Gerar slides
testimonials.forEach((url, index) => {
    const slide = document.createElement('div');
    slide.className = 'w-full flex-shrink-0 h-full flex items-center justify-center bg-white p-2';
    slide.innerHTML = `<img src="${url}" class="w-full h-full object-contain rounded-xl">`;
    track.appendChild(slide);

    // Gerar dots
    const dot = document.createElement('button');
    dot.className = `h-2 rounded-full transition-all duration-300 ${index === 0 ? 'w-8 bg-brand-primary' : 'w-2 bg-gray-300'}`;
    dot.addEventListener('click', () => goToSlide(index));
    dotsContainer.appendChild(dot);
});

function updateCarousel() {
    track.style.transform = `translateX(-${currentIndex * 100}%)`;
    Array.from(dotsContainer.children).forEach((dot, i) => {
        dot.className = `h-2 rounded-full transition-all duration-300 ${i === currentIndex ? 'w-8 bg-brand-primary' : 'w-2 bg-gray-300'}`;
    });
}

function goToSlide(index) {
    currentIndex = index;
    updateCarousel();
}

document.getElementById('next-slide').addEventListener('click', () => {
    currentIndex = (currentIndex + 1) % testimonials.length;
    updateCarousel();
});

document.getElementById('prev-slide').addEventListener('click', () => {
    currentIndex = (currentIndex - 1 + testimonials.length) % testimonials.length;
    updateCarousel();
});

// Auto-play
setInterval(() => {
    currentIndex = (currentIndex + 1) % testimonials.length;
    updateCarousel();
}, 4000);

// 4. FAQ Accordion
document.querySelectorAll('.faq-trigger').forEach(trigger => {
    trigger.addEventListener('click', () => {
        const item = trigger.closest('.faq-item');
        const isActive = item.classList.contains('active');
        
        // Fechar outros
        document.querySelectorAll('.faq-item').forEach(i => i.classList.remove('active'));
        
        // Abrir atual
        if (!isActive) {
            item.classList.add('active');
        }
    });
});