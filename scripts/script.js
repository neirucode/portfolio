// Smooth Scroll
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        document.querySelector(this.getAttribute('href')).scrollIntoView({
            behavior: 'smooth'
        });
    });
});
// email api
(function () {
    emailjs.init("v48FaCKwRG2ATZx72");
})();

function sendEmail() {
    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const message = document.getElementById('message').value;

    const templateParams = {
        name: name,
        email: email,
        message: message
    };

    emailjs.send('service_294hyhe', 'template_fsuxtw7', templateParams)
        .then(function (response) {
            console.log('SUCCESS!', response.status, response.text);
            alert('Message sent successfully!');
        }, function (error) {
            console.log('FAILED...', error);
            alert('Failed to send message. Please try again.');
        });
}
// Typewriter Effect
const typewriter = document.getElementById('typewriter');
const phrases = ["Developer", "Designer", "Freelancer"];
let currentPhrase = 0;
let currentLetter = 0;
let isDeleting = false;

function type() {
    const currentText = phrases[currentPhrase];

    if (isDeleting) {
        typewriter.textContent = currentText.slice(0, currentLetter--);
        if (currentLetter === 0) {
            isDeleting = false;
            currentPhrase = (currentPhrase + 1) % phrases.length;
            setTimeout(type, 200);  // Pause before typing the new phrase
            return;
        }
    } else {
        typewriter.textContent = currentText.slice(0, currentLetter++);
        if (currentLetter > currentText.length) {
            isDeleting = true;
            setTimeout(type, 1000);  // Pause before deleting the current phrase
            return;
        }
    }

    setTimeout(type, isDeleting ? 40 : 100);
}

type();
// reveal on scroll <p>
document.addEventListener("load", () => {
    const typewriter = document.getElementById('reveal-text');
    const text = typewriter.textContent.trim();  // Trim any extra whitespace around the text
    typewriter.textContent = '';  // Clear the text content initially
    let currentLetter = 0;
    let observerTriggered = false;

    function type() {
        // Use requestAnimationFrame for smoother animation
        requestAnimationFrame(() => {
            if (currentLetter < text.length) {
                typewriter.textContent += text.charAt(currentLetter++);
                setTimeout(type, 20);  // Use setTimeout for typing interval
            }
        });
    }

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting && !observerTriggered) {
                observerTriggered = true;  // Prevent the typing effect from running multiple times
                type();
            }
        });
    }, {
        threshold: 0.1  // Trigger when 10% of the element is in view
    });

    observer.observe(typewriter);
});

// download cv code
document.addEventListener('DOMContentLoaded', function () {
    // Select the download button
    const downloadButton = document.getElementById('download');

    // Add click event listener to the button
    downloadButton.addEventListener('click', function () {

        const link = document.createElement('a');
        link.href = 'files/FERNANDO, JERRY NEIL -CV (1).pdf';
        link.download = 'Neil_Fernando_CV.pdf';
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    });
});
// lightmode
document.addEventListener('DOMContentLoaded', function () {
    const toggleButton = document.getElementById('toggle-dark-mode');
    const body = document.body;

    // Function to set the initial mode based on localStorage
    const setInitialMode = () => {
        const mode = localStorage.getItem('mode');
        if (mode === 'light-mode') {
            enableLightMode();
        } else {
            enableDarkMode();
        }
    };

    // Function to enable light mode
    const enableLightMode = () => {
        body.classList.add('light-mode');
        toggleButton.checked = true; // Ensures the toggle remains checked
    };

    // Function to enable dark mode
    const enableDarkMode = () => {
        body.classList.remove('light-mode');
        toggleButton.checked = false; // Ensures the toggle remains unchecked
    };

    // Set initial mode when the DOM is loaded
    setInitialMode();

    // Toggle mode when button is clicked
    toggleButton.addEventListener('click', function () {
        if (body.classList.contains('light-mode')) {
            enableDarkMode();
            localStorage.setItem('mode', 'dark-mode');
        } else {
            enableLightMode();
            localStorage.setItem('mode', 'light-mode');
        }
    });
});
//scroller
const scrollerInner = document.querySelector('.scroller__inner');
const items = [...scrollerInner.children]; // Store original items

// Clone items to create seamless looping
items.forEach(item => {
    const clone = item.cloneNode(true);
    scrollerInner.appendChild(clone);
});

const webDevSkills = [
    'images/icons/html-5-svgrepo-com.svg',
    'images/icons/css-3-svgrepo-com.svg',
    'images/icons/javascript-svgrepo-com.svg',
    'images/icons/bootstrap-svgrepo-com.svg',
    'images/icons/tailwind-svgrepo-com.svg',
    'images/icons/react-svgrepo-com.svg',
    'images/icons/php-svgrepo-com.svg',
    'images/icons/mysql-svgrepo-com.svg',
    'images/icons/git-svgrepo-com.svg'
];

const graphicDesignSkills = [
    'images/icons/figma-svgrepo-com.svg',
    'images/icons/adobe-xd-svgrepo-com.svg',
    'images/icons/photoshop-svgrepo-com.svg',
    'images/icons/figma-svgrepo-com.svg',
    'images/icons/adobe-xd-svgrepo-com.svg',
    'images/icons/photoshop-svgrepo-com.svg',
    'images/icons/figma-svgrepo-com.svg',
    'images/icons/adobe-xd-svgrepo-com.svg',
    'images/icons/photoshop-svgrepo-com.svg',
    'images/icons/figma-svgrepo-com.svg',
    'images/icons/adobe-xd-svgrepo-com.svg',
    'images/icons/photoshop-svgrepo-com.svg'
];

// Function to generate the logo slider
function createLogoSlider(skillArray, containerId) {
    const container = document.getElementById(containerId);
    const slider = document.createElement('div');
    slider.classList.add('logo-slider');

    skillArray.forEach(logoSrc => {
        const img = document.createElement('img');
        img.classList.add('logos');
        img.src = logoSrc;
        img.alt = 'Skill logo';
        slider.appendChild(img);
    });

    // Append the slider twice to create the looping effect
    container.appendChild(slider.cloneNode(true));
    container.appendChild(slider);
}

// Generate logo sliders for both sections
createLogoSlider(webDevSkills, 'webDevSkills');
createLogoSlider(graphicDesignSkills, 'graphicDesignSkills');