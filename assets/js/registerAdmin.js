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
    const response = await fetch('http://localhost:3000/users', {
        method: "GET",
    });
    const data = await response.json();

    const userData = data.find((v) => v.id === id);

    console.log(userData);

    document.getElementById('password').value = userData.password;
    document.getElementById('id').value = userData.id;
    document.getElementById('name').value = userData.name;
    document.getElementById('email').value = userData.email;
    document.getElementById('age').value = userData.age;
    document.getElementById('status').value = userData.status;
    document.getElementById('profile_pic').value = userData.profilePicture;

}

const handleDisplay = async () => {
    try {
        const response = await fetch('http://localhost:3000/users', {
            method: "GET",
        });
        const data = await response.json();

        let print = '<table border="1"><tr><th>Name</th><th>Profile</th><th>Email</th><th>Age</th><th>Status</th><th>Action</th></tr>';

        data.map((v) => {
            print += '<tr>';
            print += `<td>${v.name}</td>`;
            print += `<td><img src="../assets/images/${v.profilePicture}" height="70px" width="70px"></td>`;
            print += `<td>${v.email}</td>`;
            print += `<td>${v.age}</td>`;
            print += `<td>${v.status}</td>`;
            print += '<td>';
            print += `<i style="color: #ffffff;" onclick="handleUpdate('${v.id}')" class="fa-solid fa-pen-to-square"></i>`;
            print += `<i style="color: #ffffff;" onclick="handleDelete('${v.id}')" class="fa-solid fa-trash"></i>`;
            print += '</td>';
            print += '</tr>';
        });


        print += `</table>`;

        document.getElementById('display').innerHTML = print;

    } catch (error) {
        console.log(error);
    }
}

const handleUpdateStatus = async () => {
    event.preventDefault()
    const id = document.getElementById('id').value;
    const status = document.getElementById('status').value;
    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const age = document.getElementById('age').value;
    const password = document.getElementById('password').value;

    const profilePicture = document.getElementById('profile_pic').value;

    const createdAt = new Date().toString();
    const updatedAt = new Date().toString();

    let obj = {
        id,
        name,
        email,
        age,
        status,
        password, 
        profilePicture,
        createdAt,
        updatedAt
    }

    console.log(obj);

    await fetch(`http://localhost:3000/users/${id}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(obj)
    });

    handleDisplay();
}

const userForm = document.getElementById('userForm');

userForm.addEventListener('submit', handleUpdateStatus);

window.onload = () => {
    handleDisplay();
}
