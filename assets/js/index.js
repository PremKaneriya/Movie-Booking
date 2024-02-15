const cinema = async () => {
    const response = await fetch('http://localhost:3000/cinema');
    const data = await response.json();

    let print = '';

    data.map((v) => {
        print += `<div id="cinemaCard">
            <div>${v.name}</div>
            <img id="cinemaImage" src="${v.image}" alt="${v.name}"/>
            <p>${v.address}</p>
            <p>${v.phoneNumber}</p>
            <p>${v.email}</p>
            <p>${v.status}</p>
            <p>${v.id}</p>
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

const movie = async () => {
    const response = await fetch('http://localhost:3000/movie');
    const data = await response.json();

    const uniqueMovieNames = new Set();

    let print = '';
    data.forEach((v) => {
        if (!uniqueMovieNames.has(v.name)) {
            print += `<div id="movieCard">
                   <div>${v.name}</div>
                   <img id="movieImage" src="${v.image}" alt="${v.name}"/>
                   <p>${v.duration}</p>
                   <p>${v.description}</p>
                   <p>${v.status}</p>
                   <p>${v.cinemaId}</p>
               </div>`;
            uniqueMovieNames.add(v.name);
        }
    });

    document.getElementById("movieContainer").innerHTML = print;
}

window.onload = () => {
    cinema();
    movie();
}