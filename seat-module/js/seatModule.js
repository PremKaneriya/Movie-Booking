const handleCinema = async () => {
    try {
        const response = await fetch("http://localhost:3000/cinema");
        const data = await response.json();

        let print = "<option value='0'>--Select Cinema---</option>";

        data.forEach((v) => {
            print += `<option value="${v.id}">${v.name}</option>`;
        });

        document.getElementById("movietime").innerHTML = print;
    } catch (error) {
        console.error(error);
    }
};

const handleMovie = async () => {
    try {
        const cinemaId = document.getElementById("movietime").value;

        const response = await fetch("http://localhost:3000/movie");
        const data = await response.json();

        const newData = data.filter((v) => v.cinemaId === cinemaId);

        let print = "<option value='0'>select--option</option>";
        newData.forEach((v) => {
            print += `<option value="${v.id}">${v.name}</option>`;
        });

        document.getElementById("time").innerHTML = print;
    } catch (error) {
        console.error(error);
    }
};

const handleTime = async () => {
    try {
        const movieId = document.getElementById("time").value;

        const response = await fetch("http://localhost:3000/time");
        const data = await response.json();

        const newData = data.filter((v) => v.movieId === movieId);

        let print = "<option value='0'>select--option</option>";
        newData.forEach((v) => {
            print += `<option value="${v.timesData}">${v.timesData}</option>`;
        });

        document.getElementById("time_movie").innerHTML = print;
    } catch (error) {
        console.error(error);
    }
};

const handleRemove = async (id) => {
    try {
        const response = await fetch(`http://localhost:3000/seat/${id}`, {
            method: "DELETE",
        });
        const data = await response.json();
        console.log(data);
    } catch (error) {
        console.error(error.message);
    }
};

const displayUser = async () => {
    const id = document.getElementById("id").value;
    const cinemaId = document.getElementById("movietime").value;
    const movieId = document.getElementById("time").value;
    const time = document.getElementById("time_movie").value;
    const seatNumber = document.getElementById("Seatnumber").value;
    const seat = new Array(parseInt(seatNumber)).fill(0);
    const price = document.getElementById("price").value;
    const expdate = document.getElementById("date").value;

    let startDate = new Date();
    let endDate = new Date(expdate);

    let seats = [];

    while (startDate <= endDate) {
        let obj = {
            date: startDate.toLocaleDateString(),
            seat,
        };

        seats.push(obj);
        startDate.setDate(startDate.getDate() + 1);
    }

    let obj = {
        cinemaId,
        price,
        movieId,
        expdate,
        time,
        seats,
        updatedAt: new Date().toString(),
        createAt: new Date().toString(),
    };

    if (id) {
        try {
            const response = await fetch(`http://localhost:3000/seat/${id}`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(obj),
            });
            const data = await response.json();
            console.log(data);
        } catch (error) {
            console.error(error);
        }
    } else {
        try {
            const response = await fetch("http://localhost:3000/seat", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(obj),
            });
            const data = await response.json();
            console.log(data);
        } catch (error) {
            console.error(error);
        }
    }
};

const handleEdit = async (id) => {
    try {
        const response = await fetch("http://localhost:3000/seat");
        const data = await response.json();

        const obj = data.find((d) => d.id === id);
        document.getElementById("id").value = obj.id;
        document.getElementById("movietime").value = obj.cinemaId;
        await handleMovie();
        document.getElementById("time").value = obj.movieId;
        await handleTime();
        document.getElementById("time_movie").value = obj.time;
        document.getElementById("Seatnumber").value = obj.seats.length;
        document.getElementById("price").value = obj.price;
        document.getElementById("date").value = obj.expdate;
    } catch (error) {
        console.error(error.message);
    }
};

const movieForm = document.getElementById("movieuser");
movieForm.addEventListener("submit", displayUser);

const timeClick = document.getElementById("movietime");
timeClick.addEventListener("change", handleMovie);

const timeChange = document.getElementById("time");
timeChange.addEventListener("change", handleTime);

const allFunctions = () => {
    handleCinema();
};

window.onload = allFunctions;
