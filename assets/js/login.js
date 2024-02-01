

const handleLoginForm = async () => {
    event.preventDefault();
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;

    try {
        const response = await fetch('http://localhost:3000/users', {
            method: 'GET'
        });
        const data = await response.json();

        let flag = 0;

        data.map((v) => {
            if (email === v.email && password === v.password) {
                if (v.status === 'active') {
                    flag = 1;
                } else {
                    flag = 2
                }
            }
        });


        if (flag === 1) {
            console.log('Login Successful');
        } else if (flag === 2) {
            console.log('inactive status');
        } else {
            console.log('Invalid email or password');
        }


    } catch (error) {
        console.log(error);
    }

}


const loginForm = document.getElementById('loginForm');
loginForm.addEventListener('submit', handleLoginForm)