document.addEventListener('DOMContentLoaded', () => {

    // 1. Mobile Navigation Toggle
    const hamburger = document.querySelector(".hamburger");
    const navLinks = document.querySelector(".nav-links");
    const body = document.querySelector("body");

    if (hamburger) {
        hamburger.addEventListener("click", () => {
            hamburger.classList.toggle("active");
            navLinks.classList.toggle("active");
            
            if(navLinks.classList.contains("active")) {
                body.style.overflow = "hidden";
            } else {
                body.style.overflow = "auto";
            }
        });
    }

    // 2. Close mobile menu when a link is clicked
    document.querySelectorAll(".nav-links a").forEach(n => n.addEventListener("click", () => {
        if(hamburger.classList.contains("active")) {
            hamburger.classList.remove("active");
            navLinks.classList.remove("active");
            body.style.overflow = "auto";
        }
    }));

    // 3. Smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                const headerOffset = document.querySelector('.navbar').offsetHeight;
                const elementPosition = targetElement.getBoundingClientRect().top;
                const offsetPosition = elementPosition + window.scrollY - headerOffset;

                window.scrollTo({
                    top: offsetPosition,
                    behavior: "smooth"
                });
            }
        });
    });

    // 4. Navbar Scroll Effect 
    const navbar = document.querySelector('.navbar');
    
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });

    // form
    const contactForm = document.getElementById('contactForm');
    
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const name = document.getElementById('name').value.trim();
            const email = document.getElementById('email').value.trim();
            const message = document.getElementById('message').value.trim();
            
            if (name && email && validateEmail(email) && message) {
                const submitBtn = contactForm.querySelector('button[type="submit"]');
                const originalText = submitBtn.innerText;
                
                submitBtn.innerText = "Sending...";
                submitBtn.style.opacity = "0.8";
                submitBtn.disabled = true;
                
                setTimeout(() => {
                    alert(`Success! Thank you, ${name}. Your message has been sent. We'll reply to ${email} soon.`);
                    contactForm.reset();
                    
                    submitBtn.innerText = originalText;
                    submitBtn.style.opacity = "1";
                    submitBtn.disabled = false;
                }, 1000);
            } else {
                if (!validateEmail(email)) {
                    alert("Please enter a valid email address.");
                } else {
                    alert("Please fill out all fields before submitting.");
                }
            }
        });
    }

    function validateEmail(email) {
        const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return re.test(email);
    }
    
});
