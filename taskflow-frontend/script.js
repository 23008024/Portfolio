const contactForm = document.getElementById("contactForm");

contactForm.addEventListener("submit", async (e) => {

    e.preventDefault();

    const submitBtn = contactForm.querySelector(".send-btn");

    submitBtn.disabled = true;

    submitBtn.innerHTML = `
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

            contactForm.innerHTML = `
                <div class="success-message">
                    <i class="fa-solid fa-circle-check"></i>
                    <h2>Message Sent!</h2>
                    <p>
                        Thank you for reaching out.
                        I'll get back to you as soon as possible.
                    </p>
                </div>
            `;

        } else {

            throw new Error("Form submission failed.");

        }

    } catch (error) {

        console.error(error);

        submitBtn.disabled = false;

        submitBtn.innerHTML = `
            <i class="fa-solid fa-paper-plane"></i>
            Send Message
        `;

        alert("Unable to send your message. Please try again.");

    }
    // ===============================
// Mobile Navigation
// ===============================

const menuBtn = document.getElementById("menuBtn");
const navLinks = document.getElementById("navLinks");

if (menuBtn && navLinks) {

    menuBtn.addEventListener("click", () => {

        navLinks.classList.toggle("active");

        const icon = menuBtn.querySelector("i");

        if (navLinks.classList.contains("active")) {

            icon.classList.remove("fa-bars");
            icon.classList.add("fa-times");

        } else {

            icon.classList.remove("fa-times");
            icon.classList.add("fa-bars");

        }

    });

}

});
