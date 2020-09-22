import axios from 'axios';

const url = 'https://covid19.mathdro.id/api';

export const fetchData = async (country) => {
    let changeableUrl = url; 
    if(country){
        changeableUrl = `${url}/countries/${country}`;
    }
    try {
        // We are destructuring the data to directly give us those 4 variablse.
        // Check the ES6 Syntax for destructing if you still don't get it
        const { data : { confirmed, deaths, recovered, lastUpdate } } = await axios.get(changeableUrl);
        return {confirmed, deaths, recovered, lastUpdate};
    } catch (error) {
        
    }
}

export const fetchDailyData = async () => {
    try {
        const {data} = await axios.get(`${url}/daily`);
        return data.map(({ confirmed, deaths, reportDate: date }) => ({ confirmed: confirmed.total, deaths: deaths.total, date }));
    } catch (error) {
        
    }
}

export const fetchCountries = async () => {
    try {
        const {data: {countries}} = await axios.get(`${url}/countries`);
        return countries.map((country) => country.name);
    } catch (error) {
        
    }
}