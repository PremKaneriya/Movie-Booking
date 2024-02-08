const handleDeleteMovie = async (id) => {
    try {
        await fetch(`http://localhost:3000/movie/${id}`, {
            method: "DELETE",
        });
        handleDisplayMovie();
    } catch (error) {
        console.error(error);
    }
}

const handleUpdateMovie = async (id) => {
    try {
        const response = await fetch(`http://localhost:3000/movie`);
        const data = await response.json();

        const movieUserFind = data.find((v) => v.id === id);

        console.log(movieUserFind);

        document.getElementById("id").value = movieUserFind.id;
        document.getElementById("movieName").value = movieUserFind.movieName;
        document.getElementById("movieDescription").value = movieUserFind.movieDescription;
        document.getElementById("movieStatus").value = movieUserFind.movieStatus;
        document.getElementById("selectCinema").value = movieUserFind.selectCinema;

        const imagePreview = document.getElementById('moviePosterPreview');
        imagePreview.src = movieUserFind.moviePoster;

    } catch (error) {
        console.error(error);
    }
}

const handlePreview = async () => {
    const orgImage = document.getElementById('moviePoster').value;

    const arr = orgImage.split("\\");

    document.getElementById("moviePosterPreview").src = "../assets/images/moviePoster/" + arr[arr.length - 1];
}


const handleMovieModule = async () => {
    event.preventDefault();

    const movieName = document.getElementById("movieName").value;
    const moviePoster = document.getElementById("moviePosterPreview").src;
    const movieDescription = document.getElementById("movieDescription").value;
    const id = document.getElementById("id").value;
    const movieStatus = document.getElementById("movieStatus").value;
    const selectCinema = document.getElementById("selectCinema").value;

    const arr = moviePoster.split("//");

    const createdAt = new Date().toString();
    const updatedAt = new Date().toString();

    const movieObj = {
        cinemaId,
        movieName,
        moviePoster,
        movieDescription,
        movieStatus: movieStatus || "pending",
        selectCinema,
        createdAt,
        updatedAt,
    };

    if (id) {
        try {
            const response = await fetch(`http://localhost:3000/movie/${id}`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(movieObj),
            });

            const data = await response.json();

        } catch (error) {
            console.error(error);
        }
    } else {
        try {
            const response = await fetch("http://localhost:3000/movie", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(movieObj),
            });

            const data = await response.json();

        } catch (error) {
            console.error(error);
        }
    }

    handleDisplayMovie();
};

const handleDisplayMovie = async () => {
    try {

        const cinemaResponse = await fetch("http://localhost:3000/cinema");
        const cinemaData = await cinemaResponse.json();

        let cinePrint = "";
        cinemaData.forEach(
            (c) =>
                cinePrint += `<option value="${c.id}">${c.name}</option>`
        );
        document.getElementById("selectCinema").innerHTML = cinePrint;

        // -------------------------------------------------

        const response = await fetch("http://localhost:3000/movie");
        const data = await response.json();

        let print =
            '<table border="1"><tr><th>Movie Name</th><th>Movie Poster</th><th>Movie Description</th><th>Movie Status</th><th>Actions</th><th>Theatre</th></tr>';
        data.forEach((m) => {
            print += "<tr>";
            print += `<td>${m.movieName}</td>`;
            print += `<td><img src="${m.moviePoster}" height="70px" width="70px"></td>`;
            print += `<td>${m.movieDescription}</td>`;
            print += `<td>${m.movieStatus}</td>`;
            print += `<td><i onclick="handleDeleteMovie('${m.id}')" class="fa-solid fa-trash"></i>
            <i onclick="handleUpdateMovie('${m.id}')" class="fa-solid fa-pen-to-square"></i></td>`;

            const cinema = cinemaData.find(c => c.id === m.selectCinema);
            print += `<td>${cinema ? cinema.name : 'N/A'}</td>`;
            print += "</tr>";
        });
        print += "</table>";

        document.getElementById("showMovies").innerHTML = print;
    } catch (error) {
        console.error(error);
    }
};


const movieModule = document.getElementById("movieModule");
movieModule.addEventListener("submit", handleMovieModule);

const handlePreviewImage = document.getElementById('moviePoster');
handlePreviewImage.addEventListener('change', handlePreview)

window.onload = () => {
    handleDisplayMovie();
};
