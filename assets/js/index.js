const cinema = async () => {
    const response = await fetch('http://localhost:3000/cinema');
    const data = await response.json();

    let print = '';

    data.map((v) => {
        print += `<div id="cinemaCard">
            <div>${v.name}</div>
            <img id="cinemaImage" src="${v.image}" alt="${v.name}"/>
            <p>${v.address}</p>
            <button onclick="handleOpenCinema('${v.id}')">Open</button>
        </div>`;

    });
    document.getElementById("cinemaContainer").innerHTML = print;
}

const handleOpenCinema = (id) => {
    console.log("id: ", id);
    
    const saveId = localStorage.setItem("selectedCinema", id);

    window.location.href = '/userSide/cinemaOpen.html';
}

window.onload = () => {
    cinema();
    movie();
}