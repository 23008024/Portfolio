const openContact = document.getElementById("openContact");
const closeContact = document.getElementById("closeContact");
const contactPopup = document.getElementById("contactPopup");


openContact.addEventListener("click", () => {
    contactPopup.style.display = "flex";
});


closeContact.addEventListener("click", () => {
    contactPopup.style.display = "none";
});


window.addEventListener("click", (event) => {
    if (event.target === contactPopup) {
        contactPopup.style.display = "none";
    }
});


// Contact form submission

const contactForm = document.getElementById("contactForm");

const API_URL = "http://localhost:5000/api/contact";


contactForm.addEventListener("submit", async (event) => {

    event.preventDefault();


    const submitButton = contactForm.querySelector("button");


    submitButton.disabled = true;

    submitButton.innerHTML = `
        <i class="fa-solid fa-spinner fa-spin"></i>
        Sending...
    `;


    const formData = new FormData(contactForm);


    const data = {

        name: formData.get("name"),

        email: formData.get("email"),

        company: formData.get("company"),

        message: formData.get("message")

    };


    try {

        const response = await fetch(API_URL, {

            method: "POST",

            headers: {

                "Content-Type": "application/json"

            },

            body: JSON.stringify(data)

        });


        const result = await response.json();


        if (response.ok && result.success) {

            alert("Message sent successfully 🚀");

            contactForm.reset();

            contactPopup.style.display = "none";


        } else {

            alert(result.message || "Failed to send message");

        }


    } catch (error) {

        console.error("Connection error:", error);

        alert("Cannot connect to server. Please check that the API is running.");

    }


    finally {

        submitButton.disabled = false;


        submitButton.innerHTML = `
            <i class="fa-solid fa-paper-plane"></i>
            Send Message
        `;

    }

});