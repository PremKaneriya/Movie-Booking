const handleUpdate = async (id) => {
    try {
        const response = await fetch(`http://localhost:3000/cinema`);
        const data = await response.json();

        const userfind = data.find((v) => v.id === id);

        console.log(userfind);

        document.getElementById("id").value = userfind.id;
        document.getElementById("cinemaName").value = userfind.name;
        document.getElementById("cinemaAddress").value = userfind.address;
        document.getElementById("cinemaPhoneNumber").value = userfind.phoneNumber;
        document.getElementById("cinemaEmail").value = userfind.email;
        document.getElementById('status').value = userfind.status;


    } catch (error) {
        console.log(error);
    }
};

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
    const id = document.getElementById("id").value;
    const email = document.getElementById("cinemaEmail").value;
    const status = document.getElementById('status').value;
    

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
        status: status || "pending", 
    };

    if (id) {
        try {
            const response = await fetch("http://localhost:3000/cinema/" + id, {
                method: 'PUT',
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(obj),
            });

            const data = await response.json();
        } catch (error) {
            console.error(error);
        }
    } else {
        try {
            const response = await fetch("http://localhost:3000/cinema", {
                method: 'POST',
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(obj),
            });

            const data = await response.json();

        } catch (error) {
            console.error(error);
        }
    }



    displayCinemaData();

};

const displayCinemaData = async () => {
    try {
        const response = await fetch("http://localhost:3000/cinema", {
            method: "GET",
        });
        const cinemaData = await response.json();

        let print = "";

        print += `<table border="1"> <tr><th>Cinema Name</th><th>Cinema Image</th><th>Cinema Address</th><th>Cinema Phone Number</th><th>Cinema Email</th><th>Status</th><th>Actions</th></tr>`;

        cinemaData.map((v) => {
            print += `<tr><td>${v.name}</td><td><img src="../assets/images/${v.image}" height="70px" width="70px"></td><td>${v.address}</td><td>${v.phoneNumber}</td><td>${v.email}</td> <td>${v.status}</td>`;
            print += `<td><i onclick="handleDelete('${v.id}')" style="color: #fff;" class="fa-solid fa-trash "></i>`;
            print += `<i onclick="handleUpdate('${v.id}')" style="color: #fff;" class="fa-solid fa-pen-to-square"></i></td></tr>`;
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
