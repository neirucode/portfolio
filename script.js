// email api
function sendEmail() {
    Email.send({
        Host: "smtp.gmail.com",
        Username: "jerryfernando01@gmail.com",
        Password: "jhztntbohqqabwch",
        To: 'jerryneil1201@gmail.com',
        From: document.getElementById("email").value,
        Subject: "New Contact Form Inquiry",
        Body: "Name: " + document.getElementById("name").value
            + "<br> Email: " + document.getElementById("email").value
            + "<br> Message: " + document.getElementById("message").value
    }).then(
        message => alert("Message Sent Successfuly")
    );
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