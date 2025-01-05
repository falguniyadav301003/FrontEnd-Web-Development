// http://api.weatherapi.com/v1/current.json?key=2f93eb23b0c84757a9d163446250401&q=kolkata&aqi=no

let temperatureField= document.querySelector(".temp");
let locationField= document.querySelector(".time-location p");
let dataField= document.querySelector(".time-location span");
let weatherField= document.querySelector(".condition p");
let searchField= document.querySelector(".search_area");
const form = document.querySelector("form");

form.addEventListener("submit",searchForLocation)


let target = "India";
const fetchResults = async (targetlocation) => {
    let url = `http://api.weatherapi.com/v1/current.json?key=2f93eb23b0c84757a9d163446250401&q=${targetlocation}&aqi=no`;
    const res = await fetch(url);
    const data = await res.json();
    console.log(data);

    let locationName= data.location.name
    let time= data.location.localtime
    let temp= data.current.temp_c
    let condition= data.current.condition.text
    updateDetails(temp,locationName,time,condition);
};

function updateDetails(temp, locationName, time, condition) {

     let splitDate= time.split(" ")[0]
     let splitTime= time.split(" ")[1]
     let currentDay= geDayName(new Date(splitDate).getDay())

    temperatureField.innerText = `${temp}°C`;
    locationField.innerText = locationName;
    dataField.innerText = `${splitDate} ${currentDay} ${splitTime}`;
    conditionField.innerText = condition;
}

function searchForLocation(e){
    e.preventDefault()
    target= searchField.value
    fetchResults(target)
}

fetchResults(target);

function geDayName(number){
    switch(number){
        case 0:
            return "Sunday"
                    case 1:
            return "Monday"
                    case 2:
            return "Tuesday"
                    case 3:
            return "Wednesday"
                    case 4:
            return "Thursday"
                    case 5:
            return "Friday"
                    case 6:
            return "Saturday"
    }
}
