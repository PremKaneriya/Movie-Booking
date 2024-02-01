const handleDisplay = async () => {
    const response = await fetch("http://localhost:3000/users", {
        method: 'GET',
    });

    const data = await response.json();
    let print = "";

    print += '<table>';
    data.forEach((v) => {
        print += `${v.name} ${v.age} ${v.email} ${v.password} <button onclick="handleDelete('${v.id}')">D</button><br>`;
    });

    print += '</table>';

    // document.getElementById('display').innerHTML = print;
};

const handleDelete = async (id) => {
    await fetch(`http://localhost:3000/users/${id}`, {
        method: 'DELETE',    
    });
    // Optionally, you can refresh the display after deletion
    handleDisplay();
};

const handleRegisterForm = async (event) => {
    event.preventDefault(); // Prevents the default form submission behavior
    const name = document.getElementById('name').value;
    const age = document.getElementById('age').value;
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    const profilePicture = document.getElementById('profile_pic').value;

    const arr = profilePicture.split("\\");

    const registerObj = {
        name,
        age,
        email,
        password,
        profilePicture: 'users/' + arr[arr.length - 1], // Corrected this line
        createdAt: new Date().toString(),
        updatedAt: new Date().toString(),
        status: "pending"
    };

    console.log(registerObj);

    const response = await fetch('http://localhost:3000/users', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(registerObj)    
    });
    const data = await response.json(); // Added await

    console.log(data);

    // Refresh the display after registration
    handleDisplay();
};

const registerForm = document.getElementById('registerForm');
registerForm.addEventListener('submit', handleRegisterForm);

window.onload = () => {
    handleDisplay();
};
