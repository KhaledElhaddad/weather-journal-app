/* Global Variables */
const baseURL = 'http://api.openweathermap.org/data/2.5/weather?zip=';
const abiKey = '&appid=5bc0c28542fbeff853f31b407849ff44';

// Create a new date instance dynamically with JS
let d = new Date();
let newDate = (d.getMonth() + 1) + '.' + d.getDate() + '.' + d.getFullYear();

/* Function to GET Web API Data*/
const getWeatherData = async (baseURL, zipCode, abiKey) => {
    const response = await fetch(baseURL + zipCode + abiKey);
    try {
        let data = await response.json();
        return data;
    } catch(err) {
        console.error(err);
    };
}

/* Function to POST data */
const postData = async (url = '', data = {}) => {
    const response = await fetch(url, {
        method: 'POST',
        credentials: 'same-origin',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
    });

    try {
        const newData = await response.json();
        console.log(newDate);
        return newData;
    } catch (error) {
        console.error(error);
    }
};

const updateUI = async (url = '') => {
    const response = await fetch(url);
    try {
        const result = await response.json();
        document.querySelector('#date').innerHTML = `Date: ${result[0].date}`;
        document.querySelector('#temp').innerHTML = `Temperature: ${result[0].temperature}`;
        document.querySelector('#content').innerHTML = `You feeling: ${result[0].userResponse}`;
    }catch(err) {
        console.error(err);
    }
}

/* Function called by event listener */
const generateResult = () => {
    const zipCode = document.querySelector('#zip').value;
    const userResponse = document.querySelector('#feelings').value;

    getWeatherData(baseURL, zipCode, abiKey)
        .then(data => {
            postData('/add', {
                temperature: data.main.temp,
                date: newDate,
                userResponse: userResponse
            });
            updateUI('/all');
        });
};

// Event listener to add function to existing HTML DOM element
document.querySelector('#generate').addEventListener('click', generateResult);