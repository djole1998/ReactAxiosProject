import React, { Component } from 'react';
import './App.css';
import LunchService from "../../moviesproject/src/axios";
import FilteredMovies from '../src/FilteredMovies';

class App extends Component {
    constructor() {
        super();
        this.state = {
            allMovies: [],
            filteredMovies: [],
            size: 6,
            search: '',
            value: ''
        };
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChange(event) {
        this.setState({ value: event.target.value });
    }

    handleSubmit(event) {
        debugger;
        let value = this.state.value;
        let beforeMovies = this.state.allMovies.filter(movie => {
                if (value === 'older') {
                    return movie.year > 1970;
                } else if (value === 'younger') {
                    return movie.year <= 1970;
                } else {
                    return this.state.allMovies;
                }
            }
        );

        this.setState({
            filteredMovies: beforeMovies
        });
        console.log(beforeMovies);
        event.preventDefault();
    }

    componentDidMount() {
        LunchService.getAllData().then(response => {
            this.setState({
                allMovies: response.data,
                filteredMovies: response.data
            });
        });
    }

    showAllMovies() {
        this.setState({
            size: this.state.allMovies.length
        })
    }

    updateSearch(event) {
        this.setState({ search: event.target.value.substr(0, 20) });
    }
    
    render() {
        let size = this.state.size;
        let searchedMovies = this.state.filteredMovies.slice(0, size).filter((movie) => {
                return movie.ref.toLowerCase().indexOf(this.state.search.toLowerCase()) !== -1;
            }
        );

        return (
            <div>
                <button type="submit" onClick={ this.handleSubmit }>Biraj</button>
                <select
                    value={ this.state.value }
                    onChange={ this.handleChange }>
                    <option value='all'>All</option>
                    <option value='older'>1970+</option>
                    <option value='younger'>1970-</option>
                </select>
                <input placeholder='Search'
                       type="text"
                       value={ this.state.search }
                       onChange={ this.updateSearch.bind(this) }/>
                {
                    searchedMovies.map(movie => <FilteredMovies
                        movie={ movie }
                        key={ movie.qt }/>
                    )
                }
                <button onClick={ this.showAllMovies.bind(this) }>Show All</button>

            </div>
        )
            ;
    }
}

export default App;