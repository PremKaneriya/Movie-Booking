const displaySameMovie = async () => {
    try {
        const takeId = localStorage.getItem("selectedMovie");

        const response = await fetch(`http://localhost:3000/movie/${takeId}`);
        const data = await response.json();

        let print = "";
        if (data) {
            print += `<div id="movieCard">
                <div>${data.name}</div>
                <img id="movieImage" src="${data.image}" alt="${data.name}">
                <p><span id="spanMovie">Duration</span>: ${data.duration}</p>
                <p><span id="spanMovie">Description</span>: ${data.description}</p>
                <p><span id="spanMovie">Status</span>: ${data.status}</p>
            </div>`;
            displayTime(data.id);
        }

        document.getElementById("movieDisplay").innerHTML = print;
    } catch (error) {
        console.error(error);
    }
};

const displayCinemaName = async () => {
    const cinemaId = localStorage.getItem("selectedCinema");

    try {
        const response = await fetch(`http://localhost:3000/cinema/${cinemaId}`);
        const data = await response.json();

        document.getElementById("cinemaNameInner").innerHTML = `<h1 id="cinemaNameH1">Book Tickets In: <span id="cinemaName">${data.name}</span> Cinema</h1>`;
    } catch (error) {
        console.error(error);
    }
};

const displayTime = async (id) => {
    try {
        const response = await fetch(`http://localhost:3000/time`);
        const data = await response.json();

        const newTimeData = data.filter((v) => v.movieId === id);
        console.log(newTimeData);

        const date = document.getElementById("admin_date").value = newTimeData[0].date;

        let timePrint = '';
        newTimeData.forEach((v) => {
            v.timesData.forEach((t) => {
                timePrint += ` <input class="btn" type="radio" name="timesMovie" id="${t}" value="${t}">
                <label for="${t}">${t}</label>`
            })
        })

        document.getElementById('time').innerHTML = timePrint;

    } catch (error) {
        console.error(error);
    }
};


const handleSubmitForm = async () => {
    event.preventDefault();
    let admin_Date = document.getElementById("admin_date").value;
    let user_date = document.getElementById("s_date").value;
    let user_time = document.querySelector(`input[name="timesMovie"]:checked`).value;

    console.log(admin_Date)
    console.log(user_date)
    console.log(user_time);

    if (admin_Date < user_date) {
        console.log('correct');
    } else {
        localStorage.setItem("time", user_time);
        localStorage.setItem("date", user_date);
    } 
}

const handle_sumbit = document.getElementById("handle_sumbit");
handle_sumbit.addEventListener("submit", handleSubmitForm);

window.onload = () => {
    displaySameMovie();
    displayCinemaName();
};
