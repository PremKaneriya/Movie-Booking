const cinema = async () => {
    const response = await fetch('http://localhost:3000/cinema');
    const data = await response.json();

    let print = '';

    data.map((v) => {
        print += `<div class="cinemaCard">
            <div>${v.name}</div>
            <img id="cinemaImage" src="${v.image}" alt="${v.name}"/>
            <p>${v.address}</p>
            <p>${v.phoneNumber}</p>
            <p>${v.email}</p>
            <p>${v.status}</p>
        </div>`;
    });

    document.getElementById("cinemaContainer").innerHTML = print;
}

const movie = async () => {
    const response = await fetch('http://localhost:3000/movie');
    const data = await response.json();

    let print = '';
    data.map((v) => {
        print += `<div class="movieCard">
            <div>${v.name}</div>
            <img id="movieImage" src="${v.image}" alt="${v.name}"/>
            <p>${v.duration}</p>
            <p>${v.description}</p>
            <p>${v.status}</p>
        </div>`;
    })

    document.getElementById("movieContainer").innerHTML = print;
}

window.onload = () => {
    cinema();
    movie();
}