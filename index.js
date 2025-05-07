document.addEventListener('DOMContentLoaded', function() {
    const hamburger = document.getElementById('hamburger');
    const navLinks = document.querySelector('.nav-links');
    const navLinkItems = document.querySelectorAll('.nav-links a'); // Get all nav links

    // Toggle mobile navigation
    if (hamburger && navLinks) {
        hamburger.addEventListener('click', () => {
            navLinks.classList.toggle('active');
            hamburger.classList.toggle('active'); // For potential styling of hamburger itself
        });
    }

    // Smooth scroll for navigation links & close mobile menu on click
    navLinkItems.forEach(link => {
        link.addEventListener('click', function(e) {
            // Smooth scroll part
            const href = this.getAttribute('href');
            if (href.startsWith('#')) {
                e.preventDefault(); // Prevent default anchor click behavior
                const targetId = href.substring(1);
                const targetElement = document.getElementById(targetId);

                if (targetElement) {
                    // Calculate position of target element relative to the viewport
                    // and account for sticky header if necessary
                    const headerOffset = document.querySelector('.navbar') ? document.querySelector('.navbar').offsetHeight : 0;
                    const elementPosition = targetElement.getBoundingClientRect().top;
                    const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

                    window.scrollTo({
                        top: offsetPosition,
                        behavior: 'smooth'
                    });
                }
            }

            // Close mobile menu if it's open
            if (navLinks.classList.contains('active')) {
                navLinks.classList.remove('active');
                if (hamburger) hamburger.classList.remove('active');
            }
        });
    });

    // Basic form submission handling (prevents default and shows an alert)
    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault(); // Prevent actual form submission
            
            // You can add form validation here if needed
            const name = document.getElementById('name').value;
            const email = document.getElementById('email').value;
            const message = document.getElementById('message').value;

            if(name && email && message) {
                alert('Thank you for your message, ' + name + '! We will get back to you soon.');
                contactForm.reset(); // Clear the form
            } else {
                alert('Please fill out all fields.');
            }
        });
    }

    // Active link highlighting based on scroll position (optional, a bit more advanced)
    const sections = document.querySelectorAll('section[id]');
    window.addEventListener('scroll', navHighlighter);

    function navHighlighter() {
        let scrollY = window.pageYOffset;
        const headerOffset = document.querySelector('.navbar') ? document.querySelector('.navbar').offsetHeight + 20 : 20; // Add some buffer

        sections.forEach(current => {
            const sectionHeight = current.offsetHeight;
            const sectionTop = current.offsetTop - headerOffset; // Adjusted for sticky header
            let sectionId = current.getAttribute('id');

            if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
                document.querySelector('.nav-links a[href*=' + sectionId + ']').classList.add('active');
            } else {
                document.querySelector('.nav-links a[href*=' + sectionId + ']').classList.remove('active');
            }
        });
    }
    // Call it once on load to set initial active link if needed (e.g. if page loads on a section)
    navHighlighter();

});
