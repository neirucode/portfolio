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
        // Create an anchor element
        const link = document.createElement('a');
        // Set the href attribute to the path of the CV file
        link.href = 'files/FERNANDO, JERRY NEIL -CV (1).pdf'; // Replace with the actual path to your CV file
        // Set the download attribute with a filename
        link.download = 'Neil_Fernando_CV.pdf'; // Replace with your desired file name
        // Append the link to the body (necessary for Firefox)
        document.body.appendChild(link);
        // Programmatically click the link to trigger the download
        link.click();
        // Remove the link from the document
        document.body.removeChild(link);
    });
});

// dark mode

document.addEventListener('DOMContentLoaded', function () {
    const toggleButton = document.getElementById('toggle-dark-mode');

    toggleButton.addEventListener('click', function () {
        document.body.classList.toggle('light-mode');
    });
});