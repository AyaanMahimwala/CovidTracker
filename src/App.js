import React from 'react';

// This line will get all the components in the index.js file that is in the components folder
import {Chart, Cards, CountryPicker} from './components'; 
// Import the CSS style sheet while maintaining local scope for everything in it
import styles from './App.module.css'; 
// We don't need to specify index files when we are in a folder
// But we do need the curly braces around fetchData because we are going to be exporting
// many functions from the api folder and we can only have 1 default export. 
// The curly braces mean that this is a named export and that something of the same name
// is being exported from the index.js file located in the api folder.
import {fetchData} from './api';
import covidImage from './images/image.png';

class App extends React.Component {
    // Creating an data object and putting it in the state so that everytime we update the data
    // the state will have changed and our componenets will be re-rendered.
    state = {
        data: {},
        country: "",
    }

    // Usually you would do "function()" async {}
    // This is a lifecycle function and is called after the first render
    async componentDidMount(){
        const fetchedData = await fetchData();
        this.setState({data: fetchedData});
    }

    handleCountryChange = async (country) => {
        const fetchedData = await fetchData(country);
        this.setState({data: fetchedData, country: country});
    }

    render(){
        // We are destructing data from the state because we want to pass it in as props to 
        // the cards component.
        const { data, country } = this.state;

        // We are passing the handleCountryChange function as a prop to the CountryPicker comp
        // We want this to be a prop for the CountryPicker comp because it can handle what to do
        // whenever the selected country is changed. 
        return (
            <div className={styles.container} >
                <img className={styles.image} src={covidImage} alt="Covid Image"/>
                <Cards data={data} />
                <CountryPicker handleCountryChange={this.handleCountryChange} />
                <Chart data={data} country={country}/>
            </div>
        )
    }
}

//This is part of the ES6 Module system that allows index.js to import it
export default App; 