let selectedSeats = [];
let totalPrice = 0;

const handleSeat = async () => {
    try {
        const response = await fetch("http://localhost:3000/seat");
        const data = await response.json();

        const selectedMovieId = localStorage.getItem('selectedMovie');
        const selectedCinemaId = localStorage.getItem('selectedCinema');
        const selectedTimeId = localStorage.getItem('time');
        const selectedDate = new Date(localStorage.getItem('date'));
        const formattedDate = selectedDate.toLocaleDateString('en-GB');

        console.log("Selected Date:", formattedDate);

        console.log(selectedMovieId, selectedCinemaId, selectedTimeId, selectedDate);

        const seatingObj = data.find((v) =>
            v.time === selectedTimeId &&
            v.movie_id === selectedMovieId &&
            v.cinema_id === selectedCinemaId
        );

        console.log(seatingObj);

        if (seatingObj) {
            const seats = seatingObj.seats;
            const seatButtons = seats.map((seat, index) => {
                const isSeatSelected = selectedSeats.includes(index);
                const seatStatusClass = isSeatSelected ? 'selected' : 'unbooked';
                return `<button id="seat-${index}" class="seat ${seatStatusClass}" onclick="handleSeatSelection(${index})">Seat ${index + 1}</button>`;
            });
            document.getElementById('seatButtons').innerHTML = seatButtons.join('');
        } else {
            console.log("No seating information found.");
        }
    } catch (error) {
        console.error("Error fetching data:", error);
    }
};

const handleSeatSelection = (index) => {
    const selectedIndex = selectedSeats.indexOf(index);
    if (selectedIndex !== -1) {
        selectedSeats.splice(selectedIndex, 1);
        totalPrice -= 100; // Subtract seat price
    } else {
        selectedSeats.push(index);
        totalPrice += 100; // Add seat price
    }
    updatePriceDisplay();
    handleSeat(); // Re-render the seat buttons
};

const handleBooking = () => {
    // Add your logic for booking seats using the selectedSeats array
    console.log("Selected seats:", selectedSeats);
    console.log("Total Price:", totalPrice);
    // Change the color of selected seats to indicate booking
    selectedSeats.forEach((index) => {
        const seatButton = document.getElementById(`seat-${index}`);
        if (seatButton) {
            seatButton.classList.remove('selected');
            seatButton.classList.add('booked');
        } else {
            console.error(`Seat button with ID 'seat-${index}' not found.`);
        }
    });
    // Clear the selectedSeats array and reset total price
    selectedSeats = [];
    totalPrice = 0;
    updatePriceDisplay();
  
    window.location.href = '/userSide/endOfProject.html';
};

const updatePriceDisplay = () => {
    const priceDisplay = document.getElementById('priceDisplay');
    priceDisplay.textContent = `Price = ${totalPrice} `;
};

window.onload = () => {
    handleSeat();
    updatePriceDisplay();
};