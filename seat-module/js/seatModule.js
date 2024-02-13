

const handleSelectCinema = async () => {

    try {
        const response = await fetch(`http://localhost:3000/cinema`);
        const data = await response.json();
        let print = '<option value="0">-- Select Cinema --</option>';
        data.map((v) => {
            print += `<option value="${v.id}">${v.name}</option>`;
        });
        document.getElementById('selectCinema').innerHTML = print;
    } catch (error) {
        console.error(error.message);
    }
}

const handleMovieSlect = async () => {

    try {
        const selectCinema = document.getElementById('selectCinema');
        const response = await fetch(`http://localhost:3000/movie`);
        const data = await response.json();

        const newData = data.filter((v) => v.cinemaId == selectCinema.value)

        let print = '<option value="0">-- Select Cinema --</option>';
        newData.map((v) => {
            print += `<option value="${v.id}">${v.name}</option>`;
        });
        document.getElementById('selectMovie').innerHTML = print;

    } catch (error) {
        console.log(error.message);
    }

}

const handleTimeSelect = async () => {
    try {
        const selectMovie = document.getElementById('selectMovie');
        const response = await fetch(`http://localhost:3000/time`);
        const data = await response.json();

        const newData = data.filter((v) => v.movieId == selectMovie.value)

        let print = '<option value="0">-- Select Time --</option>';
        newData[0].timesData.map((v) => {
            print += `<option value="${v}">${v}</option>`
        })

        document.getElementById('selectTime').innerHTML = print;
    } catch (error) {
        console.log(error.message);
    }
}

const handleSubmit = async () => {
    const Cinema = document.getElementById('selectCinema').value;
    const Movie = document.getElementById('selectMovie').value;
    const Time = document.getElementById('selectTime').value;
    const no_Seat = document.getElementById('numberOfSeat').value;
    const seats = Array.from({ length: parseInt(no_Seat) }, (_, index) => index + 1);
    const price = document.getElementById('ticketPrice').value;
    const id = document.getElementById('hiddenId').value;
    console.log(id);

    const seatObj = {
        cinemaId: Cinema,
        movieId: Movie,
        time: Time,
        seats,
        price,
        createdAt: new Date().toString(),
        updatedAt: new Date().toString()
    }

    if (id) {
        try {
            const response = await fetch("http://localhost:3000/seat/" + id, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(seatObj)
            })

            const data = await response.json();
        } catch (error) {
            console.error(error.message);
        }

    } else {
        try {
            const response = await fetch("http://localhost:3000/seat", {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(seatObj)
            })

            const data = await response.json();
        } catch (error) {
            console.error(error.message);
        }
    }

}

const handleDisplay = async () => {

    const response = await fetch('http://localhost:3000/seat');
    const data = await response.json();

    const resCinema = await fetch('http://localhost:3000/cinema');
    const cinemaData = await resCinema.json();

    const resMovie = await fetch('http://localhost:3000/movie');
    const movieData = await resMovie.json();

    let print = '<table border="1"> <tr><th>Cinema Name</th><th> Movie Name</th><th>Movie Time</th><th>Seat</th><th>Price</th><th>Actions </th> </tr>';

    data.map((v) => {
        const cinema = cinemaData.find((c) => c.id === v.cinemaId);
        const movie = movieData.find((m) => m.id === v.movieId);

        print += '<tr>';
        print += `<td>${cinema.name}</td>`;
        print += `<td>${movie.name}</td>`;
        print += `<td>${v.time}</td>`;
        print += `<td>${v.seats}</td>`;
        print += `<td>${v.price}</td>`;
        print += `<td><button onclick="handleDelete('${v.id}')">Delete</button>`;
        print += `<button onclick="handleUpdate(event,'${v.id}')">Update</button>`;
        print += '</tr>';

    })
    print += '</table>';

    document.getElementById("displaySeat").innerHTML = print;
}

const handleDelete = async (id) => {

    try {
        const response = await fetch(`http://localhost:3000/seat/${id}`, {
            method: 'DELETE',
        })
        const data = await response.json();
        handleDisplay();
    } catch (error) {
        console.log(error.message);
    }
}

const handleUpdate = async (event, id) => {

    try {
        const response = await fetch(`http://localhost:3000/seat`);
        const data = await response.json();

        const seat = data.find((v) => v.id === id);

        document.getElementById('selectCinema').value = seat.cinemaId;

        await handleMovieSlect();
        document.getElementById('selectMovie').value = seat.movieId;
        
        await handleTimeSelect();
        document.getElementById('selectTime').value = seat.time;
        
        document.getElementById('ticketPrice').value = seat.price;
        document.getElementById('numberOfSeat').value = seat.seats.length;
        document.getElementById('hiddenId').value = seat.id;
    } catch (error) {
        console.log(error.message);
    }
}

const seatForm = document.getElementById('seatForm');
seatForm.addEventListener('submit', handleSubmit)

const selectMovie = document.getElementById('selectMovie')
selectMovie.addEventListener('change', handleTimeSelect)

const selectCinema = document.getElementById('selectCinema');
selectCinema.addEventListener('change', handleMovieSlect);

window.onload = () => {
    handleSelectCinema()
    handleDisplay()
}