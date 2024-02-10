
const handleCinemaSelect = async () => {
    try {
        
        const response = await fetch('http://localhost:3000/cinema');
        const data = await response.json();

        let print = '<option value="0">-- Select Cinema --</option>';
        data.map((v) => {
            print += `<option value="${v.id}">${v.name}</option>`
        });
        
        document.getElementById('displayCinemaSelect').innerHTML = print;

    } catch (error) {
        console.error(error);
    }
}

const handleMovieSelect = async () => {
    try {

        var cinemaID = document.getElementById('displayCinemaSelect').value;
        console.log(cinemaID);

        const response = await fetch('http://localhost:3000/movie');
        const data = await response.json();

        const newData = data.filter((v) => v.cinemaId == cinemaID)
        
        let print = '';
        print += `<select id="displayMovieSelect">`
        print += `<option value="0">-- Select Movie --</option>`
        newData.map((v) => {
            print += `<option value="${v.id}">${v.name}</option>`
        })
        print += `</select>`

        document.getElementById('bookingTable').innerHTML = print

    } catch (error) {
        console.error(error);
    }
}

const cinemaSelect = document.getElementById("displayCinemaSelect");
cinemaSelect.addEventListener('change', handleMovieSelect)

window.onload = handleCinemaSelect