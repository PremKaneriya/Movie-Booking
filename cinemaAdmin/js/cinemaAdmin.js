const handleUpdate = async (id) => { };

const handleDelete = async (id) => {
    try {
        await fetch(`http://localhost:3000/cinema/${id}`, {
            method: "DELETE",
        });

        displayCinemaData();
    } catch (error) {
        console.log(error);
    }
};

const handleCinemaAdmin = async () => {
    event.preventDefault();

    const name = document.getElementById("cinemaName").value;
    const image = document.getElementById("cinemaImage").value;
    const address = document.getElementById("cinemaAddress").value;
    const phoneNumber = document.getElementById("cinemaPhoneNumber").value;
    const email = document.getElementById("cinemaEmail").value;

    const cinArr = image.split("\\");

    const createdAt = new Date().toString();
    const updatedAt = new Date().toString();

    const obj = {
        name,
        image: "cinema-halls/" + cinArr[cinArr.length - 1],
        address,
        phoneNumber,
        email,
        createdAt,
        updatedAt,
    };

    try {
        const response = await fetch("http://localhost:3000/cinema", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(obj),
        });
        const data = await response.json();

        console.log(data);

        displayCinemaData();
    } catch (error) {
        console.log(error);
    }
};

const displayCinemaData = async () => {
    try {
        const response = await fetch("http://localhost:3000/cinema", {
            method: "GET",
        });
        const cinemaData = await response.json();

        let print = "";

        print += `<table border="1"> <tr><th>Cinema Name</th><th>Cinema Image</th><th>Cinema Address</th><th>Cinema Phone Number</th><th>Cinema Email</th><th>Actions</th></tr>`;

        cinemaData.map((v) => {
            print += `<tr><td>${v.name}</td><td><img src="../assets/images/${v.image}" height="70px" width="70px"></td><td>${v.address}</td><td>${v.phoneNumber}</td><td>${v.email}</td>`;
            print += `<td><i onclick="handleDelete('${v.id}')" class="fa-solid fa-trash "></i>`;
            print += `<i onclick="handleUpdate('${v.id}')" class="fa-solid fa-pen-to-square"></i></td></tr>`;
        });

        print += "</table>";

        document.getElementById("cinemaTable").innerHTML = print;
    } catch (error) {
        console.log(error);
    }
};

const cinemaAdmin = document.getElementById("cinemaAdmin");
cinemaAdmin.addEventListener("submit", handleCinemaAdmin);

window.onload = () => {
    displayCinemaData();
};
