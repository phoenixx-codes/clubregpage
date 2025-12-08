// Select DOM elements
const form = document.getElementById('studentForm');
const tableBody = document.getElementById('tableBody');
const exportBtn = document.getElementById('exportBtn');
const alertMsg = document.getElementById('alert-msg');

// Load data from backend on page load
loadTableData();

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
        const response = await fetch("http://127.0.0.1:5000/register", {
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
        loadTableData();

    } catch (error) {
        console.error("Error:", error);
        alert("Server connection failed.");
    }
});

// Load table data from backend
async function loadTableData() {
    try {
        const response = await fetch("http://127.0.0.1:5000/users");
        const students = await response.json();

        tableBody.innerHTML = "";

        if (students.length === 0) {
            tableBody.innerHTML = `<tr><td colspan="4" class="empty-state">No data added yet</td></tr>`;
            exportBtn.disabled = true;
            return;
        }

        exportBtn.disabled = false;

        students.forEach(student => {
            tableBody.innerHTML += `
                <tr>
                    <td>${student.full_name}</td>
                    <td>${student.registration_number}</td>
                    <td>${student.phone}</td>
                    <td>${student.college_mail}</td>
                </tr>
            `;
        });

    } catch (error) {
        console.error("Error loading data:", error);
    }
}

// Alert
function showAlert() {
    alertMsg.classList.remove('hidden');
    setTimeout(() => alertMsg.classList.add('hidden'), 3000);
}
