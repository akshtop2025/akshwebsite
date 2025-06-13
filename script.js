document.addEventListener('DOMContentLoaded', () => {

    const form = document.getElementById('websiteForm');

    // Check if the form exists on the page before adding an event listener
    if (form) {
        // Find the card that contains the form
        const formCard = form.closest('.form-card');

        form.addEventListener('submit', (event) => {
            // Prevent the default browser action (page reload)
            event.preventDefault();

            // Get the user's name to personalize the success message
            const name = document.getElementById('name').value;

            // --- In a real application, you would send data to a server here ---
            console.log('Form Submitted!');
            console.log('Name:', name);
            console.log('Email:', document.getElementById('email').value);
            console.log('Number:', document.getElementById('number').value);
            console.log('Requirements:', document.getElementById('requirements').value);

            // Create the success message HTML
            const successMessageHTML = `
                <div class="success-message">
                    <i class="fas fa-check-circle"></i>
                    <h2>Thank You, ${name}!</h2>
                    <p>Your request has been sent successfully. We will be in touch with you shortly.</p>
                </div>
            `;

            // Replace the content of the form's container with the success message
            if (formCard) {
                formCard.innerHTML = successMessageHTML;
            }
        });
    }
});
