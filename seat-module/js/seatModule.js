

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
        const response =  await fetch(`http://localhost:3000/movie`);
        const data =  await response.json();

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
        const response =  await fetch(`http://localhost:3000/time`);
        const data =  await response.json();

        const newData = data.filter((v) => v.movieId == selectMovie.value)

        let print = '<option value="0">-- Select Time --</option>';
        newData.map((v) => {
            print += `<option value="${v.id}">${v.timesData}</option>`
        })
        document.getElementById('selectTime').innerHTML = print;
    } catch (error) {
        console.log(error.message);
    }
}

const selectMovie = document.getElementById('selectMovie')
selectMovie.addEventListener('change', handleTimeSelect)

const selectCinema = document.getElementById('selectCinema');
selectCinema.addEventListener('change', handleMovieSlect);

window.onload = handleSelectCinema