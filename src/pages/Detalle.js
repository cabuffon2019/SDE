import React, { Component } from 'react';

import "bootstrap/dist/css/bootstrap.min.css";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit, faTrashAlt } from '@fortawesome/free-solid-svg-icons';
import { Modal, ModalBody, ModalFooter, ModalHeader } from 'reactstrap';

class Detalle extends Component {

    constructor(props) {
        super(props);

        this.state = {
            list: [],
            form: {
                title: '',
                year: '',
                poster: '',
                tipoModal: ''
            }
        };
    }

    addFavorite() {
        const pelicula = {
            title: localStorage.getItem("title"),
            year: localStorage.getItem("year")
        }

        this.state.list.push(pelicula);
        localStorage.setItem("peliculas", JSON.stringify(this.state.list));
    }

    viewFavorites() {
        let localStorageFavorite = localStorage.getItem('peliculas');
        //console.log('****localStorageFavorite',localStorageFavorite);
        //console.log('****localStorage',localStorage);

        if (localStorageFavorite) {
            for (let x = 0; x <= localStorage.length - 1; x++) {
                let clave = localStorage.key(x);
                // console.log("La clave " + clave);
                // console.log("contiene el valor " + localStorage.getItem(clave));
            }
        }

    }

    componentDidMount() {
        this.setState({
            tipoModal: 'consultar',
            form: {
                title: localStorage.getItem("title"),
                year: localStorage.getItem("year"),
                poster: localStorage.getItem("poster"),
            }
        })
    }

    modalFavorite = () => {
        this.setState({ modalFavorite: !this.state.modalFavorite });
    }

    handleChange = async e => {
        e.persist();
        await this.setState({
            form: {
                ...this.state.form,
                [e.target.name]: e.target.value
            }
        });
    }

    render() {
        const { form } = this.state;
        return (
            <div className="App">
                <br /><br /><br />
                <button className="btn btn-success" onClick={() => { this.addFavorite() }}>Agregar a favoritos</button>
                <br /><br />
                <button className="btn btn-info" onClick={() => { this.modalFavorite() }}>Listar favoritos</button>
                <br /><br />
                <table className="table ">
                    <thead>
                        <tr>
                            <th>Title</th>
                            <th>Year</th>
                            <th>Poster</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>{this.state.form.title}</td>
                            <td>{this.state.form.year}</td>
                            <td><img src={this.state.form.poster} height="50px" width="50px" /></td>
                            <td>
                                {"   "}
                            </td>
                        </tr>
                    </tbody>
                </table>

                <Modal isOpen={this.state.modalFavorite}>
                    <ModalHeader style={{ display: 'block' }}>
                        <span style={{ float: 'right' }} onClick={() => this.modalFavorite()}>x</span>
                    </ModalHeader>
                    <ModalBody>
                        <div className="form-group">
                            <table className="table ">
                                <thead>
                                    <tr>
                                        <th>Title</th>
                                        <th>Year</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {this.state.list.map(favorites => {
                                        return (
                                            <tr>
                                                <td>{favorites.title}</td>
                                                <td>{favorites.year}</td>
                                                <td>
                                                    {"   "}
                                                </td>
                                            </tr>
                                        )
                                    })}
                                
                               {/*  {this.state.list.map(favorites => {
                                        return (
                                            <tr>
                                                <td>{favorites.title}</td>
                                                <td>{favorites.year}</td>
                                                <td>
                                                    {"   "}
                                                </td>
                                            </tr>
                                        )
                                    })} */}
                                    
                                </tbody>
                            </table>
                        </div>
                    </ModalBody>
                </Modal>
            </div>
        );
    }
}

export default Detalle;