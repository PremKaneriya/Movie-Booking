const handleDelete = async (id) => {
    try {
        await fetch(`http://localhost:3000/movie/${id}`, {
            method: 'DELETE',
        });
    } catch (error) {
        console.error(error);
    }
}

const handleUpdate = async (id) => {
    try {
        const response = await fetch(`http://localhost:3000/movie`);
        const data = await response.json();

        const userfind = data.find((v) => v.id === id);

        document.getElementById("id").value = userfind.id;
        document.getElementById("movieName").value = userfind.name;
        document.getElementById("movieDuration").value = userfind.duration;
        document.getElementById("movieDescripton").value = userfind.description;
        document.getElementById('status').value = userfind.status;

        const imagePreview = document.getElementById('movieImagePreview');
        imagePreview.src = userfind.image;

    } catch (error) {
        console.error(error);
    }
}

const handleImage = async () => {
    const orgImage = document.getElementById('movieImage').value;
    const arr = orgImage.split("\\");

    document.getElementById("movieImagePreview").src = "../assets/images/moviePoster/" + arr[arr.length - 1];
}

const handleMovieDisplay = async () => {
    try {
        const response = await fetch('http://localhost:3000/movie');
        const data = await response.json();

        let print = "";
        print += '<table border="1"><tr><th>Movie Name</th> <th>Movie Image</th> <th>Movie Duration</th> <th>Movie Description</th> <th>Status</th> <th>Actions</th></tr>';

        data.forEach((v) => {
            print += `<tr>
                <td>${v.name}</td>
                <td><img src="${v.image}" /></td>
                <td>${v.duration}</td>
                <td>${v.description}</td>
                <td>${v.status}</td>
                <td>
                    <button onclick="handleDelete('${v.id}')" style="color: #000;" class="fa-solid fa-trash">Delete</button>
                    <button onclick="handleUpdate('${v.id}')" style="color: #000;" class="fa-solid fa-pen-to-square">Update</button>
                </td>
            </tr>`;
        });

        print += "</table>";

        document.getElementById("movieTable").innerHTML = print;

    } catch (error) {
        console.error(error);
    }
}

const handleMovieModule = async () => {
    event.preventDefault();
    try {
        const id = document.getElementById('id').value;
        const name = document.getElementById('movieName').value;
        const image = document.getElementById('movieImagePreview').src;
        const duration = document.getElementById('movieDuration').value;
        const description = document.getElementById('movieDescripton').value;
        const status = document.getElementById('status').value;
        var cinemaId = document.getElementById('selectCinema').value;
        // console.log(cinemaId);

        const arr = image.split("//");

        // const response = await fetch(`http://localhost:3000/cinema`);
        // const cineData = await response.json();

        // const findid = cineData.find((v) => console.log(cinemaId === v.id));

        const movieObject = {
            cinemaId,
            name,
            image,
            duration,
            description,
            status: status || "pending",
            createdAt: new Date().toString(),
            updatedAt: new Date().toString()
        }
        handleSelectCinema();

        if (id) {
            try {
                const response = await fetch(`http://localhost:3000/movie/${id}`, {
                    method: 'PUT',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(movieObject)
                });

                const data = await response.json();

            } catch (error) {
                console.error(error);
            }
        } else {
            try {
                const response = await fetch('http://localhost:3000/movie', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(movieObject)
                })

                const data = await response.json();
            } catch (error) {
                console.error(error);
            }
        }
    } catch (error) {
        console.error(error);
    }

}

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

const movieImage = document.getElementById('movieImage');
movieImage.addEventListener('change', handleImage);

const movieModule = document.getElementById('movieModule');
movieModule.addEventListener('submit', handleMovieModule);

const loadingFunc = () => {
    handleMovieDisplay();
    handleSelectCinema();
}

window.onload = loadingFunc

