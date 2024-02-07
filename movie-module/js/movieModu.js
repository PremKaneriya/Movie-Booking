document.getElementById('movieModule').style.display = 'none';

const displayMovie = async () => {
    try {
        const cinemaResponse = await fetch('http://localhost:3000/cinema');
        const cinemaData = await cinemaResponse.json();

        let print = '<select onchange="handleDisplayMovie()">';
        print += '<option>Select Cinema</option>';
        cinemaData.forEach((c) => {
            print += `<option value="${c.id}">${c.name}</option>`;
        });
        print += '</select>';

        document.getElementById('selectCinema').innerHTML = print;
    } catch (error) {
        console.error(error);
    }
}

const handleDisplayMovie = async () => {
    document.getElementById('movieModule').style.display = 'block';

    try {
        const response = await fetch('http://localhost:3000/movie');
        const data = await response.json();

        let print = '<table border="1"><tr><th>Movie Name</th><th>Movie Poster</th><th>Movie Description</th><th>Movie Status</th><th>Actions</th></tr>';
        data.forEach((m) => {
            print += '<tr>';
            print += `<td>${m.movieName}</td>`;
            print += `<td><img src="../assets/images/moviePoster/${m.moviePoster}" height="70px" width="70px"></td>`;
            print += `<td>${m.movieDescription}</td>`;
            print += `<td>${m.movieStatus}</td>`;
            print += `<td><i onclick="handleDeleteMovie('${m.id}')" class="fa-solid fa-trash"></i>
            <i onclick="handleUpdateMovie('${m.id}')" class="fa-solid fa-pen-to-square"></i></td>`;
            print += '</tr>';
        });
        print += '</table>';

        document.getElementById('showMovies').innerHTML = print;
    } catch (error) {
        console.error(error);
    }
}

const handleMovieModule = async () => {
    event.preventDefault();

    const movieName = document.getElementById('movieName').value;
    const moviePoster = document.getElementById('moviePoster').value;
    const movieDescription = document.getElementById('movieDescription').value;
    const movieStatus = document.getElementById('movieStatus').value;

    const arr = moviePoster.split("\\");
    let fileName = arr[arr.length - 1];

    const createdAt = new Date().toString();
    const updatedAt = new Date().toString();

    const movieObj = {
        movieName,
        moviePoster: fileName,
        movieDescription,
        movieStatus,
        createdAt,
        updatedAt
    }

    try {
        const response = await fetch('http://localhost:3000/movie', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(movieObj)
        });
        const data = await response.json();

        document.getElementById('movieName').value = '';
        document.getElementById('moviePoster').value = '';
        document.getElementById('movieDescription').value = '';
        document.getElementById('movieStatus').value = '';

        displayMovie();
    } catch (error) {
        console.error(error);
    }
}

const movieModule = document.getElementById('movieModule');
movieModule.addEventListener('submit', handleMovieModule);

window.onload = () => {
    displayMovie();
}
