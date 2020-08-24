import React, { Component } from 'react';
import '../css/Consulta.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import Axios from 'axios';
import { getOmdbapi } from '../utils/constants/urls';

class Consulta extends Component {
    state = {
        data: [],
        form: {
            Title: '',
            Year: '',
            Poster: ''
        }
    }

    handleChange = async event => {
        await this.setState({
            form: {
                ...this.state.form,
                [event.target.name]: event.target.value
            }
        });
    }

    componentDidMount() {
    }

    consultaPelicula = async () => {
        await Axios.get(getOmdbapi, { params: { t: this.state.form.Title } }).then(response => {
            this.setState({ data: response.data });
            return response.data;
        })
            .then(response => {
                if (response.Title !== undefined) {
                    localStorage.setItem('title', response.Title);
                    localStorage.setItem('year', response.Year);
                    localStorage.setItem('poster', response.Poster);
                    alert(`Bienvenido ${response.Title} ${response.Year}`);
                    window.location.href = "./detalle";
                } else {
                    alert('Pelicula no encontrada');
                }

            })
            .catch(error => {
                console.log('***ERROR:', error);
            })
    }

    render() {
        return (
            <div className="containerPrincipal">
                <div className="containerSecundario">
                    <div className="form-group">
                        <label>Ingrese pelicula a consultar: </label>
                        <br />
                        <input type="text" className="form-control"
                            name="Title" onChange={this.handleChange} />
                        <br />
                        <button className="btn btn-primary" onClick={() => this.consultaPelicula()}>Buscar Palicula</button>
                        <br />
                    </div>
                </div>
            </div>
        );
    }
}

export default Consulta;
