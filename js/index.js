let navbar = document.querySelector('.navbar');

document.querySelector('#menu-btn').onclick = () =>{
    navbar.classList.toggle('active');
    searchForm.classList.remove('active');
}

let searchForm = document.querySelector('.search-form');

document.querySelector('#search-btn').onclick = () =>{
    searchForm.classList.toggle('active');
    navbar.classList.remove('active');
}

window.onscroll = () => {
    navbar.classList.remove('active');
    searchForm.classList.remove('active');
}

//Carousel Code

new Glide('.glide').mount()

new Glide('.glide', {
    type: 'carousel',
    startAt: 0,
    perView: 1,
    autoplay: 5000,
    rewind: true
}).mount()

//Contact Form Code

document.querySelector('form').addEventListener('submit', function(event) {
    event.preventDefault();

    var name = document.getElementById('name').value;
    var email = document.getElementById('email').value;
    var message = document.getElementById('message').value;

    if (name === '' || email === '' || message === '') {
        alert('All fields are required.');
        return;
    } else if (!email.includes('@')) {
        alert('Please enter a valid email address.');
        return;
    }

    emailjs.send("service_n92wf8y", "template_juv1lmp", { // Replace with your EmailJS service ID and template ID
        from_name: name,
        from_email: email,
        message: message
    })
    .then(function(response) {
        console.log("SUCCESS!", response.status, response.text);
        alert("Your message has been sent successfully!");
    }, function(error) {
        console.log("FAILED...", error);
        alert("Failed to send your message. Please try again later.");
    });
});

// FAQ Banners

document.querySelectorAll('.faq-question').forEach(item => {
    item.addEventListener('click', event => {
        event.target.parentNode.classList.toggle('active');
    })
});


//Order Form File Upload
// Select the file input element
var fileInput = document.getElementById('files');

// Select the file display area
var fileDisplayArea = document.getElementById('fileDisplayArea');

// Add an 'change' event listener to the file input element
fileInput.addEventListener('change', function(e) {
    // Get the selected files from the event target
    var files = e.target.files;

    // Initialize an array to store the file names
    var fileNames = [];

    // Loop through the selected files and get their names
    for (var i = 0; i < files.length; i++) {
        fileNames.push(files[i].name);
    }

    // Display the file names on the console
    console.log(fileNames.join(', '));

    // Display the file names on the form
    if (fileDisplayArea) {
        fileDisplayArea.innerText = fileNames.join(', ');
    }
});




