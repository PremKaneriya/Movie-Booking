const displayMovie = async () => {
    try {
        const cinemaResponse = await fetch('http://localhost:3000/cinema');
        const cinemaData = await cinemaResponse.json();
        
        const response = await fetch('http://localhost:3000/movie');
        const data = await response.json();

        let print = '<table>';
        print += '<tr><th>Cinema ID</th><th>Movie Name</th><th>Movie Poster</th><th>Movie Description</th><th>Status</th><th>Actions</th><th>Select</th></tr>';
        
        let selectOptions = '';
        cinemaData.forEach(c => {
            selectOptions += `<option value="${c.id}">${c.name}</option>`;
        });
        
        data.forEach((v) => {
            let selectTheatre = `<select>${selectOptions}</select>`;
            print += `<tr><td>${v.id}</td><td>${v.movieName}</td><td><img src="../assets/images/moviePoster/${v.moviePoster}" height="70px" width="70px"></td><td>${v.movieDescription}</td><td>${v.movieStatus}</td>
            <td><i onclick="handleDelete('${v.id}')" class="fa-solid fa-trash"></i>
            <i onclick="handleUpdate('${v.id}')" class="fa-solid fa-pen-to-square"></i></td>`;
            print += `<td>${selectTheatre}</td></tr>`;
        });

        print += '</table>';

        document.getElementById("movieTable").innerHTML = print;
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