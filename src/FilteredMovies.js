import React, { Component } from 'react';


class FilteredMovies extends Component {
    render() {
        const { year, ref, qt } = this.props.movie;

        return <div className="filteredMovies">
            <p>Name: { ref }</p>
            <p>Year: { year }</p>
            <p>QT: { qt }</p>
        </div>
    }
}

export default FilteredMovies;