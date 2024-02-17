const openCinema = async () => {
    const takeId = localStorage.getItem("selectedCinema");

    const response = await fetch(`http://localhost:3000/cinema/${takeId}`);

    const data = await response.json();

    console.log(data);

    document.getElementById("showMovie").innerHTML = `You Are In : <span id="cinemaName">${data.name}</span>, Welcome`;
    
}

const openMovie = async () => {

    const takeId = localStorage.getItem("selectedCinema");

    const movieResponse = await fetch(`http://localhost:3000/movie`);

    const movieData = await movieResponse.json();

    const newData = movieData.filter((v) => v.cinemaId == takeId)

    let print = '';

    newData.forEach((v) => {

        print += `<div id="movieCard">
        <div>${v.name}</div>
        <center><img id="movieImage" src="${v.image}" alt="${v.name}"> </center>
        <button onclick="handleSelectMovie('${v.id}')">Select</button>
        </div>`
    })

    document.getElementById("cinemaList").innerHTML = print;

}

const handleSelectMovie = async (id) => {

    localStorage.setItem("selectedMovie", id);

    console.log(id);

    window.location.href = '/userSide/movieTime.html';

}

window.onload = () => {
    openCinema();
    openMovie();
}