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
    try {
        let data = JSON.parse(obj);
        console.log(data);

        document.getElementById('name').value = data.name;
        document.getElementById('email').value = data.email;
        document.getElementById('age').value = data.age;
        document.getElementById('status').value = data.status;

        const response = await fetch(`http://localhost:3000/users/${data.status}`, {
            method: "PUT",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(...data)
        });
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

        let print = '<table border="1"><tr><th>Name</th><th>Email</th><th>Age</th><th>Status</th><th>Action</th></tr>';

        data.map((v) => {
            print += `
                <tr>
                    <td>${v.name}</td>
                    <td>${v.email}</td>
                    <td>${v.age}</td>
                    <td>${v.status}</td>
                    <td>
                        <i onclick="handleUpdate('${JSON.stringify(v)}')" class="fa-solid fa-pen-to-square"></i>
                        <i onclick="handleDelete('${v.id}')" class="fa-solid fa-trash"></i>
                    </td>
                </tr>`;
        });

        print += `</table>`;

        document.getElementById('display').innerHTML = print;

    } catch (error) {
        console.log(error);
    }
}

window.onload = () => {
    handleDisplay();
}
