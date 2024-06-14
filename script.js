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
// frontend dev typewriter effect
document.addEventListener('DOMContentLoaded', function () {
    const txt2 = document.getElementById('typewriter');
    const text = "Frontend Developer";
    let index = 0;

    function type() {
        if (index < text.length) {
            txt2.innerHTML += text.charAt(index);
            index++;
            setTimeout(type, 150); // Adjust the typing speed (in milliseconds) if needed
        }
    }
    type();
});
// download cv code
document.addEventListener("DOMContentLoaded", function () {
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
// dark/light mode
document.addEventListener('DOMContentLoaded', function () {
    const toggleButton = document.getElementById('toggle-dark-mode');

    toggleButton.addEventListener('click', function () {
        document.body.classList.toggle('light-mode');
    });
});
// reveal section
document.addEventListener("DOMContentLoaded", function () {
    const revealSection = document.querySelector(".reveal-section");

    function revealOnScroll() {
        const sectionTop = revealSection.getBoundingClientRect().top;
        const sectionVisible = 150;

        if (sectionTop < window.innerHeight - sectionVisible) {
            revealSection.classList.add("reveal");
        } else {
            revealSection.classList.remove("reveal");
        }
    }

    window.addEventListener("scroll", revealOnScroll);
});