document.addEventListener('DOMContentLoaded', () => {
    // Inicializar ícones Lucide
    lucide.createIcons();

    // 1. Banner de Datas Dinâmicas
    const setDynamicDates = () => {
        const today = new Date();
        const d1 = new Date(); d1.setDate(today.getDate() - 1);
        const d2 = new Date(); d2.setDate(today.getDate() - 2);
        
        const format = (d) => d.getDate().toString().padStart(2, '0');
        const display = document.getElementById('dates-display');
        if(display) display.innerText = `${format(d2)}, ${format(d1)} E ${format(today)}`;
    };
    setDynamicDates();

    // 2. Countdown Timer (15 minutos)
    let time = 15 * 60;
    const timerDisplay = document.getElementById('timer-display');
    
    const countdown = setInterval(() => {
        const minutes = Math.floor(time / 60);
        const seconds = time % 60;
        
        if (timerDisplay) {
            timerDisplay.innerText = `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
        }
        
        if (time <= 0) clearInterval(countdown);
        time--;
    }, 1000);

    // 3. Carousel de Depoimentos
    const testimonials = [
        "https://res.cloudinary.com/drcqck3r9/image/upload/v1769884567/DEPO_01_uoghex.webp",
        "https://res.cloudinary.com/drcqck3r9/image/upload/v1769884567/DEPO_02_gfo0ai.webp",
        "https://res.cloudinary.com/drcqck3r9/image/upload/v1769884568/DEPO_03_up9aaz.webp",
        "https://res.cloudinary.com/drcqck3r9/image/upload/v1769884568/DEPO_04_nc6sot.webp",
        "https://res.cloudinary.com/drcqck3r9/image/upload/v1769884568/DEPO_05_i3d7vm.webp"
    ];

    const track = document.getElementById('carousel-track');
    let currentIndex = 0;

    if (track) {
        testimonials.forEach(src => {
            const slide = document.createElement('div');
            slide.className = 'w-full flex-shrink-0';
            slide.innerHTML = `<img src="${src}" class="w-full h-auto pointer-events-none">`;
            track.appendChild(slide);
        });
    }

    const updateCarousel = () => {
        if (track) track.style.transform = `translateX(-${currentIndex * 100}%)`;
    };

    document.getElementById('nextBtn')?.addEventListener('click', () => {
        currentIndex = (currentIndex + 1) % testimonials.length;
        updateCarousel();
    });

    document.getElementById('prevBtn')?.addEventListener('click', () => {
        currentIndex = (currentIndex - 1 + testimonials.length) % testimonials.length;
        updateCarousel();
    });

    // Auto-play Carousel
    setInterval(() => {
        currentIndex = (currentIndex + 1) % testimonials.length;
        updateCarousel();
    }, 5000);

    // 4. FAQ Accordion
    const faqItems = document.querySelectorAll('.faq-item');
    faqItems.forEach(item => {
        item.querySelector('.faq-question').addEventListener('click', () => {
            const isActive = item.classList.contains('active');
            faqItems.forEach(i => i.classList.remove('active'));
            if (!isActive) item.classList.add('active');
        });
    });

    // Smooth Scroll para CTA
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            document.querySelector(this.getAttribute('href')).scrollIntoView({
                behavior: 'smooth'
            });
        });
    });
});