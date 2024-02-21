const handleSeat = async () => {
    try {
        const response = await fetch("http://localhost:3000/seat");
        const data = await response.json();

        const selectedMovieId = localStorage.getItem('selectedMovie');
        const selectedCinemaId = localStorage.getItem('selectedCinema');
        const selectedTimeId = localStorage.getItem('time');
        const selectedDate = localStorage.getItem('date');

        console.log(selectedMovieId, selectedCinemaId, selectedTimeId, selectedDate);

        const seatingObj = data.find((seat) =>
            seat.movie_id === selectedMovieId &&
            seat.cinema_id === selectedCinemaId &&  
            seat.time === selectedTimeId &&
            seat.expdate === selectedDate
        );

        console.log(seatingObj);

    } catch (error) {
        console.error(error);
    }
}

window.onload = handleSeat;

