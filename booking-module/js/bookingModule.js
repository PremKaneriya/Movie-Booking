const handleSelectCinema = async () => {
    try {
        const response = await fetch(`http://localhost:3000/cinema`);
        const data = await response.json();

        let print = '';
        data.forEach((v) => { // Changed map to forEach
            print += `<option value="${v.id}">${v.name}</option>`;
        });
        document.getElementById('selectcinema').innerHTML = print;
        console.log(data);
    } catch (error) {
        console.error(error.message);
    }
}

const handleSelectMovie = async () => {
    try {
        const response = await fetch(`http://localhost:3000/movie`);
        const data = await response.json();

        const newData = data.filter((v) => v.cinemaId === v.id); // Corrected comparison

        let print = '';
        print += `<select id="selectmovie"> `;
        print += '<option>-- Select Movie --</option>';
        newData.forEach((v) => {
            print += `<option value="${v.id}">${v.name}</option>`;
        });
        print += '</select>';
        
        document.getElementById('selectmovie').innerHTML = print;
    } catch (error) {
        console.error(error.message);
    }
}

const selectCinema = document.getElementById('selectcinema'); // Changed selectcinema to selectCinema for consistency
selectCinema.addEventListener('change', handleSelectCinema);

window.onload = () => {
    handleSelectCinema();
}
