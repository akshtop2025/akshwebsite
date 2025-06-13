// document.addEventListener('DOMContentLoaded', () => {

//     const form = document.getElementById('websiteForm');

//     // Check if the form exists on the page before adding an event listener
//     if (form) {
//         // Find the card that contains the form
//         const formCard = form.closest('.form-card');

//         form.addEventListener('submit', (event) => {
//             // Prevent the default browser action (page reload)
//             event.preventDefault();

//             // Get the user's name to personalize the success message
//             const name = document.getElementById('name').value;
            
//             // --- In a real application, you would send data to a server here ---
//             console.log('Form Submitted!');
//             console.log('Name:', name);
//             console.log('Email:', document.getElementById('email').value);
//             console.log('Number:', document.getElementById('number').value);
//             console.log('Requirements:', document.getElementById('requirements').value);

//             // Create the success message HTML
//             const successMessageHTML = `
//                 <div class="success-message">
//                     <i class="fas fa-check-circle"></i>
//                     <h2>Thank You, ${name}!</h2>
//                     <p>Your request has been sent successfully. We will be in touch with you shortly.</p>
//                 </div>
//             `;

//             // Replace the content of the form's container with the success message
//             if (formCard) {
//                 formCard.innerHTML = successMessageHTML;
//             }
//         });
//     }
// });
document.addEventListener('DOMContentLoaded', () => {
    // Select the form and the div where we will show messages
    const form = document.getElementById('websiteForm');
    const formResult = document.getElementById('form-result');

    // Add an event listener for the form submission
    form.addEventListener('submit', function(e) {
        // Prevent the form from submitting the traditional way (which reloads the page)
        e.preventDefault(); 

        // Show a "sending..." message to the user for better UX
        formResult.innerHTML = '<p style="color: #a0a0a0;">Sending...</p>';
        
        // Collect all the data from the form
        const formData = new FormData(form);
        const object = {};
        formData.forEach((value, key) => {
            object[key] = value;
        });
        const json = JSON.stringify(object);

        // Use the Fetch API to send the data to Web3Forms
        fetch('https://api.web3forms.com/submit', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            },
            body: json
        })
        .then(async (response) => {
            // Get the JSON response from the server
            let jsonResponse = await response.json();

            // Check if the submission was successful (status 200)
            if (response.status == 200) {
                // Display the success message from Web3Forms
                formResult.innerHTML = `<p style="color: #00c6ff;">${jsonResponse.message}</p>`;
                // Clear all the input fields in the form
                form.reset(); 
            } else {
                // If there was an error, display the error message
                console.log(response);
                formResult.innerHTML = `<p style="color: #ff4d4d;">${jsonResponse.message}</p>`;
            }
        })
        .catch(error => {
            // Handle network errors or other issues with the request
            console.log(error);
            formResult.innerHTML = '<p style="color: #ff4d4d;">Something went wrong! Please try again.</p>';
        })
        .finally(() => {
            // After 5 seconds, clear the result message
            setTimeout(() => {
                formResult.innerHTML = '';
            }, 5000);
        });
    });
});