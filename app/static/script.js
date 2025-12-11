// Render backend URL
const BASE_URL = "https://clubregpage.onrender.com";

// Select DOM elements
const form = document.getElementById('studentForm');
const alertMsg = document.getElementById('alert-msg');

// Form submission
form.addEventListener('submit', async function(event) {
    event.preventDefault();

    const full_name = document.getElementById('name').value;
    const registration_number = document.getElementById('regNo').value;
    const phone = document.getElementById('phone').value;
    const college_mail = document.getElementById('email').value;

    if (phone.length !== 10) {
        alert("Please enter a valid 10-digit phone number");
        return;
    }

    try {
        const response = await fetch(`${BASE_URL}/register`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                full_name,
                phone,
                college_mail,
                registration_number
            })
        });

        const result = await response.json();

        if (!response.ok) {
            alert(result.error);
            return;
        }

        showAlert();
        form.reset();

    } catch (error) {
        console.error("Error:", error);
        alert("Server connection failed.");
    }
});

// Dummy function since table is removed
function loadTableData() {
    // No table on UI anymore, so nothing to load
    return;
}

// Alert
function showAlert() {
    alertMsg.classList.remove('hidden');
    setTimeout(() => alertMsg.classList.add('hidden'), 3000);
}