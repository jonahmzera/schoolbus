const campus = localStorage.getItem("selectedCampus");

document.getElementById("campusTitle").innerText =
"Available Buses - " + campus;

const daySelect = document.getElementById("daySelect");
const timeSelect = document.getElementById("timeSelect");
const busContainer = document.getElementById("busContainer");

const buses = {
athi: [
{plate:"KDA 342A"},
{plate:"KBN 213B"},
{plate:"KDG 887C"}
],

nairobi: [
{plate:"KBZ 901A"},
{plate:"KCY 118B"},
{plate:"KDD 762C"}
]
};

daySelect.addEventListener("change", loadTimes);
timeSelect.addEventListener("change", showBuses);

function loadTimes(){

const day = daySelect.value;

timeSelect.innerHTML = '<option value="">Choose Time</option>';

let times = [];

if(day === "tuesday"){
times = ["1:00 PM","4:00 PM","5:00 PM"];
}
else if(day === "saturday"){
times = ["10:00 AM"];
}
else{
times = ["8:00 AM","4:00 PM","5:00 PM"];
}

times.forEach(time=>{
const option = document.createElement("option");
option.value = time;
option.textContent = time;
timeSelect.appendChild(option);
});

}

function showBuses(){

busContainer.innerHTML = "";

const campusBuses = buses[campus.toLowerCase()];

campusBuses.forEach(bus=>{

const card = document.createElement("div");
card.className = "bus-card";

card.innerHTML = `
<h3>${bus.plate}</h3>
<button class="book-btn">Book Seat</button>
`;

busContainer.appendChild(card);

});

}
const seatContainer = document.getElementById("seatContainer");

if(seatContainer){

let selectedSeat = null;

for(let i=1;i<=32;i++){

const seat = document.createElement("div");
seat.className = "seat";
seat.innerText = i;

seat.addEventListener("click",()=>{

if(selectedSeat){
selectedSeat.classList.remove("selected");
}

seat.classList.add("selected");
selectedSeat = seat;

document.getElementById("selectedSeat").innerText = i;

document.getElementById("continueBtn").disabled = false;

});

seatContainer.appendChild(seat);

}

document.getElementById("continueBtn").addEventListener("click",()=>{

localStorage.setItem("seatNumber",selectedSeat.innerText);

window.location.href = "payment.html";

});

}
