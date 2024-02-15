const displaySameMovie = async () => {
    try {
        const takeId = localStorage.getItem("selectedMovie");

        const response = await fetch(`http://localhost:3000/movie/${takeId}`);
        const data = await response.json();

        console.log(data);

        let print = "";
        if (data) {
            print += `<div id="movieCard">
                <div>${data.name}</div>
                <img id="movieImage" src="${data.image}" alt="${data.name}">
                <p><span id="spanMovie">Duration</span> : ${data.duration}</p>
                <p><span id="spanMovie">Description</span> : ${data.description}</p>
                <p><span id="spanMovie">Status</span> : ${data.status}</p>
            </div>`;
        }

        document.getElementById("movieDisplay").innerHTML = print;
    } catch (error) {
        console.error(error);
    }
};

const handleMovieTime = async () => {
    try {
        const takeId = localStorage.getItem("selectedMovie");
        console.log(takeId);

        const response = await fetch(`http://localhost:3000/time`);
        const data = await response.json();

        const newTimeData = data.filter((v) => v.movieId === takeId);

        console.log(newTimeData);

        let print = "";
        newTimeData.forEach((v) => {
            print += `<div id="timeCard">
                <p><span id="spanTime">Movie Time</span> :${v.timesData}</p>
                <p><span id="spanTime">Movie Date</span> :${v.date}</p>
            </div>`;    
        });

        document.getElementById("selectTime").innerHTML = print;
    } catch (error) {
        console.error(error);
    }
};

window.onload = () => {
    displaySameMovie();
    handleMovieTime();
};
