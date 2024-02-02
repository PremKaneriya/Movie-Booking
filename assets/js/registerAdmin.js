const handleDelete = async (id) => {
    try {
        await fetch(`http://localhost:3000/users/${id}`, {
            method: "DELETE"
        });

        handleDisplay();
    } catch (error) {
        console.log(error);
    }
}

const handleUpdate = async (id) => {
    try {
        const response = await fetch(`http://localhost:3000/users/${id}`, {
            method: "GET",
        });
        const userData = await response.json();

        console.log(userData);

        document.getElementById('id').value = userData.id;
        document.getElementById('name').value = userData.name;
        document.getElementById('email').value = userData.email;
        document.getElementById('age').value = userData.age;
        document.getElementById('status').value = userData.status;
        document.getElementById('profile_pic').value = userData.profilePicture;

    } catch (error) {
        console.log(error);
    }
}

const handleDisplay = async () => {
    try {
        const response = await fetch('http://localhost:3000/users', {
            method: "GET",
        });
        const data = await response.json();

        let print = '<table border="1"><tr><th>Name</th><th>Profile</th><th>Email</th><th>Age</th><th>Status</th><th>Action</th></tr>';

        data.forEach((v) => {
            print += '<tr>';
            print += `<td>${v.name}</td>`;
            print += `<td><img src="../assets/images/${v.profilePicture}" height="70px" width="70px"></td>`;
            print += `<td>${v.email}</td>`;
            print += `<td>${v.age}</td>`;
            print += `<td>${v.status}</td>`;
            print += '<td>';
            print += `<i onclick="handleUpdate('${v.id}')" class="fa-solid fa-pen-to-square"></i>`;
            print += `<i onclick="handleDelete('${v.id}')" class="fa-solid fa-trash"></i>`;
            print += '</td>';
            print += '</tr>';
        });

        print += '</table>';

        document.getElementById('display').innerHTML = print;

    } catch (error) {
        console.log(error);
    }
}

const handleUpdateStatus = async () => {
    event.preventDefault();
    const id = document.getElementById('id').value;
    const status = document.getElementById('status').value;

    try {
        const response = await fetch(`http://localhost:3000/users/${id}`);
        const userData = await response.json();

        console.log(userData);

        const newdata = { ...userData, status: status };

        await fetch(`http://localhost:3000/users/${id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(newdata)
        });

    } catch (error) {
        console.log(error);
    }

    handleDisplay();
}

const userForm = document.getElementById('userForm');

userForm.addEventListener('submit', handleUpdateStatus);

window.onload = () => {
    handleDisplay();
}
