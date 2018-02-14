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
                    <Button />
                </section>
            )
        }
    }

    class Button extends React.Component {

        handleClick = () => {
            window.location.reload();
        };

        render() {
            return (
                <button className="roller" onClick={ this.handleClick }>Click to find random movie</button>
            )
        }
    }

    class ByGenre extends React.Component {
        state = {
            url: 'https://api.themoviedb.org/3/genre/movie/list?api_key=cda367df530b14c8f4c9004a192e9295&language=en-US',
            value: '',
            genres: null,
        };

        componentDidMount() {
            fetch(this.state.url)
                .then(resp => resp.json())
                .then(resp => {
                    this.setState({
                        genres: resp,
                    });
                });
        }


        handleClick = (event) => {
            event.preventDefault();
            fetch(this.state.url)
                .then(resp => resp.json())
                .then(resp => {
                    this.setState({
                        genres: resp,
                    });
                });
        };


        onChange = (event) => {
            this.setState({
                value: event.target.value
            });
        };

        render() {

            if (this.state.genres === null) {
                return <p>Loading...</p>
            }

            const genres = this.state.genres.genres.map(i => {
                return (
                    <option value={ i.id } key={ i.id }>{ i.name }</option>
                );
            });

            return (
                <form>
                    <select onChange={ this.onChange }>
                        { genres }
                    </select>
                    <button onClick={ this.handleClick }>
                        Search by genre
                    </button>
                </form>
            )
        }
    }

    class Menu extends React.Component {
        render() {
            return (
                <div className="nav">
                    <p><Link to="/">Home</Link></p>
                    <p><Link to="/randomizer">Randomizer</Link></p>
                    <p><Link to="/genre">Search by genre</Link></p>
                    <p><Link to="/aaa">Search by name</Link></p>
                </div>
            )
        }
    }

    class Home extends React.Component {
        render() {
            return (
                <div>
                    Welcome to my site
                </div>
            )
        }
    }

    class Template extends React.Component {
        render() {
            return (
                <div>
                    <Menu />
                    { this.props.children }
                </div>
            )
        }
    }

    class App extends React.Component {
        render() {
            return(
                <Router history={hashHistory}>
                    <Route path='/' component={Template}>
                        <IndexRoute component={Home} />
                        <Route path='/randomizer' component={MovieFinder} />
                        <Route path='/genre' component={ByGenre} />
                    </Route>
                </Router>
            )
        }
    }

    ReactDOM.render(
        <App />,
        document.getElementById('app')
    );
});