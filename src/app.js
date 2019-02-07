// TODO: Build an awesome garage!
const garage = 'maranello';
const list = document.getElementsByClassName("cars-list")[0];
const form = document.getElementById("new-car");

const populateCar = (car) => {
  return `  <div class="car">
          <div class="car-image">
            <img src="http://loremflickr.com/280/280/${car.brand}" />
          </div>
          <div class="car-info">
            <h4>${car.brand} ${car.model}</h4>
            <p><strong>Owner:</strong> ${car.owner}</p>
            <p><strong>Plate:</strong> ${car.plate}</p>
            <a href='#' class='remove-btn' data-id=${car.id}>REMOVE</a>
          </div>
        </div>`
};

const fetchAllCars = () => {
  const url = `https://wagon-garage-api.herokuapp.com/${garage}/cars`;
  fetch(url)
  .then(response => response.json())
  .then((data) => {
    list.innerHTML = "";
    data.forEach((car) => {
      const carhtml = populateCar(car);
      list.insertAdjacentHTML("beforeend", carhtml);
    });
    bindRemoveButton();
  });

}

const removeCar = (id) => {
  const url = `https://wagon-garage-api.herokuapp.com/cars/${id}`;
  fetch(url, {method: 'DELETE'})
    .then(response => response.json())
    .then((data) => {
      fetchAllCars();
    });
}

const bindRemoveButton = () => {
  document.querySelectorAll('.remove-btn').forEach((btn) => {
    btn.addEventListener('click', (event) => {
      event.preventDefault();
      const carId = event.currentTarget.dataset.id;
      removeCar(carId);
    })
  });
}



const addCar = (car) => {
  const url = `https://wagon-garage-api.herokuapp.com/${garage}/cars`;
  console.log(car);
  fetch(url, {
    method: "POST",
    headers: {"Content-Type": "application/json"},
    body: JSON.stringify(car)
  })
  .then(response => response.json())
  .then((data) => {
    fetchAllCars();
  });
};

form.addEventListener("submit", (event) => {
  event.preventDefault();
  console.log(event);
  const brand = document.getElementById("brand").value;
  const model = document.getElementById("model").value;
  const plate = document.getElementById("plate").value;
  const owner = document.getElementById("owner").value;
  const car = {
    brand: brand,
    model: model,
    plate: plate,
    owner: owner
  };
  addCar(car);
});

fetchAllCars();