const handleDelete = async (id) => {
    try {
        await fetch(`http://localhost:3000/users/${id}`, {
            method: "DELETE"
        });
    } catch (error) {
        console.log(error);
    }
}

const handleUpdate = async (obj) => {
        let data = JSON.parse(obj);
        console.log(data);

        document.getElementById('id').value = data.id;
        document.getElementById('name').value = data.name;
        document.getElementById('email').value = data.email;
        document.getElementById('age').value = data.age;
        document.getElementById('status').value = data.status;

}

const handleDisplay = async () => {
    try {
        const response = await fetch('http://localhost:3000/users', {
            method: "GET",
        });
        const data = await response.json();

        let print = '<table border="1"><tr><th>Name</th><th>Email</th><th>Age</th><th>Status</th><th>Action</th></tr>';

        data.map((v) => {
            print += '<tr>';
            print += `<td>${v.name}</td>`;
            print += `<td>${v.email}</td>`;
            print += `<td>${v.age}</td>`;
            print += `<td>${v.status}</td>`;
            print += '<td>';
            print += `<i onclick=handleUpdate('${JSON.stringify(v)}') class="fa-solid fa-pen-to-square"></i>`;
            print += `<i onclick="handleDelete('${v.id}')" class="fa-solid fa-trash"></i>`;
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
    const id = document.getElementById('id').value;
    const status = document.getElementById('status').value;
    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const age = document.getElementById('age').value;

    let obj = {
        id,
        status,
        name,
        email,
        age
    }

    await fetch(`http://localhost:3000/users/${id}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(obj)
    });
}

const userForm = document.getElementById('userForm');

userForm.addEventListener('submit', handleUpdateStatus);

window.onload = () => {
    handleDisplay();
}
