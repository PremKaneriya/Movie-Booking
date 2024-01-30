
const registerForm = document.getElementById('registerForm');

const handleDisplay = async () => {
    const response = await fetch("http://localhost:3000/users", {
        method: 'GET',
    });

    const data = await response.json();
    let print = "";

    print += '<table>'
    data.map((v) => {
        print += `${v.name} ${v.age} ${v.email} ${v.password} <button onclick=handleDelete("${v.id}")>D</button><br>`;
    });
    
    print += '</table>'

    document.getElementById('display').innerHTML = print;
};

const handleDelete = async (id) => {
    const response = await fetch (`http://localhost:3000/users/${id}`, {
        method: 'DELETE',    
    })
}


const handleRegisterForm = async () => {

    const name = document.getElementById('name').value;
    const age = document.getElementById('age').value;
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;

    const registerObj = {
        name,
        age,
        email,
        password
    }

    const response = await fetch('http://localhost:3000/users', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(registerObj)    
    })
    const data = response.json();
    console.log(data)

    handleDisplay(name, age, email, password);

}

registerForm.addEventListener('submit', handleRegisterForm);

window.onload = () => {
    handleDisplay();
}

