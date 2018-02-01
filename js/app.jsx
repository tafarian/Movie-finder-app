import React from 'react';
import ReactDOM from 'react-dom';
import './../css/style.scss';
import {
    Router,
    Route,
    Link,
    IndexLink,
    IndexRoute,
    hashHistory
} from 'react-router';

document.addEventListener('DOMContentLoaded', function(){

    class MovieFinder extends React.Component {
        url = "https://api.themoviedb.org/3/movie/";
        state = {
            movie: null,
            vote: null,
        };

        componentDidMount() {
            fetch(this.url + Math.floor((Math.random() * 1000) + 1) + "?api_key=cda367df530b14c8f4c9004a192e9295&language=en-US")
                .then(resp => resp.json())
                .then(resp => {
                    this.setState({
                        movie: resp,
                    })
                });
            if (this.state.movie === null) {
                fetch(this.url + Math.floor((Math.random() * 1000) + 1) + "?api_key=cda367df530b14c8f4c9004a192e9295&language=en-US")
                    .then(resp => resp.json())
                    .then(resp => {
                        this.setState({
                            movie: resp,
                        })
                    });
            }
        }
        render() {
            if (this.state.movie === null) {
                return <p>Loading...</p>
            }

            const genres = this.state.movie.genres.map(i => {
                return (
                    <p className="genres" key={ i.id }>{ i.name },</p>
                );
            });
            return (
                <section style={{backgroundImage: `url("https://image.tmdb.org/t/p/original${this.state.movie.backdrop_path}")`, backgroundPosition: "center-bottom", backgroundRepeat: "no-repeat", backgroundSize: "cover"}}>
                    <div className="box">
                        <img src={"https://image.tmdb.org/t/p/w300/" + this.state.movie.poster_path } ></img>
                        <div className="infoBox">
                            <h1 className="title">
                                Title : { this.state.movie.title } ({this.state.movie.release_date.substring(0, 4)})
                            </h1>
                            <div className="genres">
                                <h1>Genres :</h1>{ genres }
                            </div>
                            <div className="genres">
                                <h1>Rating :</h1><p className=" rating">{ this.state.movie.vote_average }/10</p>
                            </div>
                            <p className="info"
                               style={{fontSize: "15px"}}><span className="overview">Overview :</span> { this.state.movie.overview }</p>
                            <a className="link" target="_blank" href={"http://www.imdb.com/title/" + this.state.movie.imdb_id }>Link to IMBd</a>
                        </div>
                    </div>
                </section>
            )
        }
    }

    class Button extends React.Component {

        handleClick = () => {
            location.href=location.href
        };

        render() {
            return (
                <button className="roller" onClick={ this.handleClick }>Click to find random movie</button>
            )
        }
    }

    class Input extends React.Component {
        state = {
            value: '',
        };

        handleClick = (event) => {
            event.preventDefault();
            this.setState({
                value: '',
            });
        };

        onChange = (event) => {
            this.setState({
                value: event.target.value
            });
        };

        render() {
            return (
                <form>
                    <input value={this.state.value}
                           onChange={this.onChange}></input>
                    <button onClick={ this.handleClick }>
                        Search by genre
                    </button>
                </form>
            )
        }
    }

    class App extends React.Component {
        render() {
            return(
                <div className="container">
                    <MovieFinder/>
                    <Button />
                    <Input />
                </div>
            )
        }
    }

    ReactDOM.render(
        <App />,
        document.getElementById('app')
    );
});