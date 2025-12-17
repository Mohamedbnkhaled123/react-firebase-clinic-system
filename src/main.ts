import './style.css'
import { showAlert } from './modal';

// Mobile Menu Toggle
const mobileMenuBtn = document.getElementById('mobile-menu-btn');
const mobileMenu = document.getElementById('mobile-menu');

if (mobileMenuBtn && mobileMenu) {
  mobileMenuBtn.addEventListener('click', () => {
    mobileMenu.classList.toggle('hidden');
  });

  // Close menu when clicking a link
  const mobileLinks = mobileMenu.querySelectorAll('a');
  mobileLinks.forEach(link => {
    link.addEventListener('click', () => {
      mobileMenu.classList.add('hidden');
    });
  });
}

// Header Scroll Effect
const header = document.querySelector('header');
window.addEventListener('scroll', () => {
  if (header) {
    if (window.scrollY > 50) {
      header.classList.add('shadow-md', 'bg-white/95');
      header.classList.remove('bg-white/90');
    } else {
      header.classList.remove('shadow-md', 'bg-white/95');
      header.classList.add('bg-white/90');
    }
  }
});

// Testimonial Slider
const track = document.getElementById('testimonial-track');
const prevBtn = document.getElementById('prev-slide');
const nextBtn = document.getElementById('next-slide');

if (track && prevBtn && nextBtn) {
  let currentIndex = 0;
  const slides = track.children;
  const slideCount = slides.length;

  const updateSlider = () => {
    const slideWidth = (slides[0] as HTMLElement).offsetWidth; // Get width of one slide including padding
    const translateX = (currentIndex * slideWidth);
    track.style.transform = `translateX(${translateX}px)`;
  };

  nextBtn.addEventListener('click', () => {
    currentIndex = (currentIndex + 1) % slideCount;
    updateSlider();
  });

  prevBtn.addEventListener('click', () => {
    currentIndex = (currentIndex - 1 + slideCount) % slideCount;
    updateSlider();
  });

  // Handle resize to adjust slider position
  window.addEventListener('resize', updateSlider);

  // Initialize slider
  window.addEventListener('load', updateSlider);
  // Also call immediately in case load already fired
  updateSlider();
}

// Booking Form Handling
const bookingForm = document.getElementById('booking-form') as HTMLFormElement;

import { db } from './firebase/firebaseConfig';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';

if (bookingForm) {
  bookingForm.addEventListener('submit', async (e) => {
    e.preventDefault();

    const submitBtn = bookingForm.querySelector('button[type="submit"]') as HTMLButtonElement;
    const originalText = submitBtn.innerText;

    submitBtn.innerText = 'جاري الحجز...';
    submitBtn.disabled = true;

    // Explicitly getting values for better structure
    const nameInput = bookingForm.querySelector('input[type="text"]') as HTMLInputElement;
    const phoneInput = bookingForm.querySelector('input[type="number"]') as HTMLInputElement;
    const dateInput = bookingForm.querySelector('input[type="date"]') as HTMLInputElement;
    const serviceInput = bookingForm.querySelector('select') as HTMLSelectElement;
    const messageInput = bookingForm.querySelector('textarea') as HTMLTextAreaElement;

    // Validate Egyptian Phone Number
    // Remove non-digits and leading +20 or 20
    let cleanedPhone = phoneInput.value.replace(/\D/g, '');
    if (cleanedPhone.startsWith('20')) {
      cleanedPhone = '0' + cleanedPhone.substring(2);
    }

    const egyptianPhoneRegex = /^01[0125][0-9]{8}$/;
    if (!egyptianPhoneRegex.test(cleanedPhone)) {
      showAlert('هذا الرقم غير صحيح', { title: 'خطأ', icon: 'error' });
      submitBtn.innerText = originalText;
      submitBtn.disabled = false;
      return;
    }

    try {
      await addDoc(collection(db, 'bookings'), {
        name: nameInput.value,
        phone: cleanedPhone,
        date: dateInput.value,
        service: serviceInput.value,
        message: messageInput.value,
        status: 'pending',
        createdAt: serverTimestamp()
      });

      const successMsg = 'شكراً لك! تم استلام طلب موعدك. سنتواصل معك قريباً للتأكيد.';
      showAlert(successMsg, { title: 'تم بنجاح', icon: 'success' });
      bookingForm.reset();
    } catch (error) {
      console.error('Booking error:', error);
      showAlert('حدث خطأ أثناء الحجز. يرجى المحاولة مرة أخرى.', { title: 'خطأ', icon: 'error' });
    } finally {
      submitBtn.innerText = originalText;
      submitBtn.disabled = false;
    }
  });
}
