const openContact = document.getElementById("openContact");
const closeContact = document.getElementById("closeContact");
const contactPopup = document.getElementById("contactPopup");


// Open popup
openContact.addEventListener("click", () => {
    contactPopup.style.display = "flex";
});


// Close popup
closeContact.addEventListener("click", () => {
    contactPopup.style.display = "none";
});


// Close when clicking outside
window.addEventListener("click", (event) => {

    if (event.target === contactPopup) {

        contactPopup.style.display = "none";

    }

});



// Formspree contact form

const contactForm = document.getElementById("contactForm");


contactForm.addEventListener("submit", async (event) => {

    event.preventDefault();


    const submitButton = contactForm.querySelector("button");


    submitButton.disabled = true;


    submitButton.innerHTML = `
        <i class="fa-solid fa-spinner fa-spin"></i>
        Sending...
    `;



    const formData = new FormData(contactForm);



    try {


        const response = await fetch(
            "https://formspree.io/f/mojojwgg",
            {

                method: "POST",

                body: formData,

                headers: {

                    "Accept": "application/json"

                }

            }
        );



        if (response.ok) {


            alert("Message sent successfully 🚀");


            contactForm.reset();


            contactPopup.style.display = "none";


        } else {


            alert("Failed to send message. Please try again.");

        }



    } catch (error) {


        console.error("FORM ERROR:", error);


        alert("Something went wrong. Please try again.");

    }



    finally {


        submitButton.disabled = false;


        submitButton.innerHTML = `
            <i class="fa-solid fa-paper-plane"></i>
            Send Message
        `;


    }


});
