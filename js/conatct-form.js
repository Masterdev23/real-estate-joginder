document.addEventListener('DOMContentLoaded', function() {
    const contactForm = document.getElementById('contactForm');
    const DISCORD_WEBHOOK_URL = 'https://discord.com/api/webhooks/1375175898264764456/nOEzNAf45UuO7mGu3N7JORtEKHhQ51bTkQrGtU5GRYFtXJzqX5vceVExtwrNEtt24kMR'; // Replace with your webhook URL

    // Toast notification function
    function showToast(message, type) {
        const toast = document.createElement('div');
        toast.className = `toast ${type}`;
        toast.innerHTML = `
            <div class="toast-content">
                <i class="fas ${type === 'success' ? 'fa-check-circle' : 'fa-exclamation-circle'}"></i>
                <span>${message}</span>
            </div>
        `;
        document.body.appendChild(toast);

        // Remove toast after 5 seconds
        setTimeout(() => {
            toast.classList.add('fade-out');
            setTimeout(() => toast.remove(), 500);
        }, 5000);
    }

    contactForm.addEventListener('submit', async function(e) {
        e.preventDefault();

        // Get form values
        const name = document.getElementById('name').value;
        const email = document.getElementById('email').value;
        const phone = document.getElementById('phone').value;
        const inquiry = document.getElementById('inquiry').value;
        const message = document.getElementById('message').value;

        // Create Discord message embed
        const embedData = {
            username: "Contact Form Bot",
            embeds: [{
                title: "New Contact Form Submission",
                color: 5814783, // Blue color
                fields: [
                    {
                        name: "Name",
                        value: name,
                        inline: true
                    },
                    {
                        name: "Email",
                        value: email,
                        inline: true
                    },
                    {
                        name: "Phone",
                        value: phone,
                        inline: true
                    },
                    {
                        name: "Inquiry Type",
                        value: inquiry,
                        inline: true
                    },
                    {
                        name: "Message",
                        value: message
                    }
                ],
                timestamp: new Date().toISOString()
            }]
        };

        try {
            const response = await fetch(DISCORD_WEBHOOK_URL, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(embedData)
            });

            if (response.ok) {
                showToast('Thank you! Your message has been sent successfully.', 'success');
                contactForm.reset();
            } else {
                throw new Error('Failed to send message');
            }
        } catch (error) {
            console.error('Error:', error);
            showToast('Sorry, something went wrong. Please try again later.', 'error');
        }
    });
});