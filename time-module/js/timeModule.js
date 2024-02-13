
const handleDisplay = async () => {

    const cinemaResponse = await fetch('http://localhost:3000/cinema');
    const cinemaData = await cinemaResponse.json();

    const movieResponse = await fetch('http://localhost:3000/movie');
    const movieData = await movieResponse.json();

    const response = await fetch('http://localhost:3000/time');
    const data = await response.json();

    let print = '';
    print += '<table border="1"><tr><th>Cinema Name</th><th> Movie Name</th><th>Movie Time</th><th>Movie Date</th><th>Actions </th> </tr>';
    data.map((v) => {

        const cinema = cinemaData.find((c) => c.id === v.cinemaId);
        const movie = movieData.find((m) => m.id === v.movieId);

        print += '<tr>';
        print += `<td>${cinema.name}</td>`;
        print += `<td>${movie.name}</td>`;
        print += `<td>${v.timesData}</td>`;
        print += `<td>${v.date}</td>`;
        print += `<td><button onclick="handleDelete('${v.id}')">Delete</button>
        <button onclick="handleUpdate(event,'${v.id}')">Update</button></td>`;
        print += '</tr>';
    })
    print += '</table>';

    document.getElementById("displayTime").innerHTML = print;
}

const handleRemoveTime = async (id) => {
    document.getElementById(`row-${id}`).remove();
}



const handleUpdate = async (event, id) => {
    try {
        const response = await fetch(`http://localhost:3000/time`)
        const data = await response.json();

        const time = data.find((v) => v.id === id);

        document.getElementById('hiddenId').value = time.id
        document.getElementById('selectDate').value = time.date;
        document.getElementById('selectCinema').value = time.cinemaId;

        await handleSelectMovie();

        document.getElementById('selectMovies').value = time.movieId;

        document.getElementsByName('movie_time').value = time.timesData;


        document.getElementById('allTimes').innerHTML = '';

        time.timesData.forEach((timeValue) => {
            handleAddTime(event, timeValue);
        });

    } catch (error) {
        console.error(error);
    }
}

const handleDelete = async (id) => {
    try {
        const response = await fetch(`http://localhost:3000/time/${id}`, {
            method: 'DELETE',
        })

    } catch (error) {
        console.error(error);
    }
}

const handleAddTime = async (event, value = '') => {
    let rNo = Math.floor(Math.random() * 10000)

    const div = document.createElement('div');
    div.setAttribute('id', 'row-' + rNo)

    const input = document.createElement('input');
    input.setAttribute('type', 'time');
    input.setAttribute('name', 'movie_time');
    input.setAttribute('value', value);

    const addButton = document.createElement('button');
    addButton.setAttribute('onclick', `handleAddTime(${rNo}, event));`);
    const addnode = document.createTextNode('+');
    addButton.appendChild(addnode);

    div.appendChild(input);
    div.appendChild(addButton);

    if (document.getElementById("allTimes").children.length > 0) {
        const removeBtn = document.createElement('button');
        removeBtn.setAttribute('onclick', `handleRemoveTime(${rNo})`);
        const removenode = document.createTextNode('-');
        removeBtn.appendChild(removenode);

        div.appendChild(removeBtn);
    }

    const allTimes = document.getElementById('allTimes');
    allTimes.appendChild(div);

}

const handleAdmin = async () => {
    event.preventDefault();

    let timesData = []
    const times = document.getElementsByName('movie_time');

    for (let i = 0; i < times.length; i++) {
        timesData.push(times[i].value);
    }

    const cinemaId = document.getElementById('selectCinema').value;
    const movieId = document.getElementById('selectMovies').value;
    const date = document.getElementById('selectDate').value;
    const id = document.getElementById('hiddenId').value;

    const timeObj = {
        cinemaId,
        movieId,
        timesData,
        date,
        createdAt: new Date().toString(),
        updatedAt: new Date().toString()
    }

    console.log(id);

    if (id) {
        try {
            const response = await fetch("http://localhost:3000/time/" + id, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(timeObj)
            });
            const data = await response.json();
            handleDisplay();
        } catch (error) {
            console.log(error);
        }
    } else {
        try {
            const response = await fetch("http://localhost:3000/time", {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(timeObj)
            });
            const data = await response.json();
            handleDisplay();
        } catch (error) {
            console.log(error);
        }
    }
}

const handleSelectCinema = async () => {
    event.preventDefault()

    const response = await fetch(`http://localhost:3000/cinema`);
    const cinema = await response.json();

    let print = '';
    print += '<option value="0">-- Select Cinema --</option>';
    cinema.map((v) => {
        print += `<option value="${v.id}">${v.name}</option>`;
    })
    document.getElementById('selectCinema').innerHTML = print;

}

const handleSelectMovie = async () => {

    var cinemaId = document.getElementById('selectCinema').value;

    const response = await fetch(`http://localhost:3000/movie`);
    const movies = await response.json();

    const newData = movies.filter((v) => v.cinemaId === cinemaId)

    let print = '';
    print += '<option value="0">-- Select Movie --</option>';
    newData.map((v) => {
        print += `<option value="${v.id}">${v.name}</option>`;
    })
    document.getElementById('selectMovies').innerHTML = print;

}


const allTimes = document.getElementById('timeModule');
allTimes.addEventListener('submit', handleAdmin);

const selectMovie = document.getElementById('selectCinema');
selectMovie.addEventListener('change', handleSelectMovie)

window.onload = () => {
    handleSelectCinema();
    handleDisplay();
}