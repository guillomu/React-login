import React from "react";
import { Link } from 'react-router-dom';
import { Redirect } from 'react-router-dom';

import { Input } from '../_components';
import "./register.css";

// Je déclare mon composant
class RegisterPage extends React.Component {

    // Je construit ma classe
    // Avec les props qui sont les variables de mon parent
    constructor(props) {
        super(props);

        // J'initialise le state
        this.state = {
            user: {
                firstname: "",
                lastname: "",
                birthdate: "",
                username: "",
                password: "",
            },
            submitted: false,
            loading: false,
            success: false,
            redirect: false,
        };

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChange(e) {
        const { name, value } = e.target;

        this.setState(prevState =>({
            user: {
                ...prevState.user,
                [name]: value
            }
        }));

        this.setState({ submitted: false });
        this.setState({ success: false });
    }

    handleSubmit(e) {
        e.preventDefault();

        const { username, password, firstname, lastname, birthdate } = this.state.user;

        this.setState({ submitted: true });

        //Si username ou password est vide on arrete l'executin de la fonction
        if (!username || !password || !firstname || !lastname || !birthdate) {
            return;
        }

        // On fait le traitement après un temps de chargement
        this.setState({ loading: true });

        setTimeout(() => {
            this.setState({
                user: {
                    username: username,
                    password: password,
                    firstname: firstname,
                    lastname: lastname,
                    birthdate: birthdate
                },
                success: true,
                loading: false
            })
        }, 2000);
    }
    redirect() {
        setTimeout(() => { this.setState({ redirect: true }) }, 4000);
    }
    render() {
        console.log(this.state);
        let message = "Registration success, redirecting...";
        return (
            <div className="register-page page">
                <div className="page-wrapper bg-gra-02 p-t-130 p-b-100 font-poppins">
                    <div className="wrapper wrapper--w680">
                        <div className="card card-4">
                            <div className="card-body">
                                {/* Succès */}
                                {
                                    this.state.success &&
                                    <div className="alert alert-success" role="alert">
                                        <h4 class="alert-heading">Success!</h4>
                                        {message}
                                        {this.redirect()}
                                    </div>
                                }
                                <h2>Register</h2>
                                {/* Redirection */}
                                {
                                    this.state.redirect &&
                                    <Redirect to='login' />
                                }
                                <form name="form" onSubmit={this.handleSubmit} noValidate>
                                    <div className="form-row">
                                        <div className="form-group col-md-6">
                                            <Input
                                                label={"Username"}
                                                type={"text"}
                                                name={"username"}
                                                value={this.state.user.username}
                                                required={"required"}
                                                submitted={this.state.submitted}
                                                handleChange={this.handleChange}
                                            />
                                        </div>
                                        <div className="form-group col-md-6">
                                            <Input
                                                label={"Password"}
                                                type={"password"}
                                                name={"password"}
                                                value={this.state.user.password}
                                                required={"required"}
                                                submitted={this.state.submitted}
                                                handleChange={this.handleChange}
                                            />
                                        </div>
                                    </div>
                                    <div className="form-row">
                                        <div className="form-group col-md-6">
                                            <Input
                                                label={"Firstname"}
                                                type={"text"}
                                                name={"firstname"}
                                                value={this.state.user.firstname}
                                                required={"required"}
                                                submitted={this.state.submitted}
                                                handleChange={this.handleChange}
                                            />
                                        </div>
                                        <div className="form-group col-md-6">
                                            <Input
                                                label={"Lastname"}
                                                type={"text"}
                                                name={"lastname"}
                                                value={this.state.user.lastname}
                                                required={"required"}
                                                submitted={this.state.submitted}
                                                handleChange={this.handleChange}
                                            />
                                        </div>
                                    </div>
                                    <div className="form-row mb-2">
                                        <div className="form-group col">
                                            <Input
                                                label={"Birth date"}
                                                type={"date"}
                                                name={"birthdate"}
                                                value={this.state.user.birthdate}
                                                required={"required"}
                                                submitted={this.state.submitted}
                                                handleChange={this.handleChange}
                                            />
                                        </div>
                                    </div>
                                    <div className="form-row mb-3"></div>
                                    <div className="form-group">
                                        <div className="form-check">
                                            <input className="form-check-input" type="checkbox" value="" id="invalidCheck" required />
                                            <label className="form-check-label" htmlFor="invalidCheck">
                                                Agree to terms and conditions
      </label>
                                            <div className="invalid-feedback">
                                                You must agree before submitting.
      </div>
                                        </div>
                                    </div>
                                    <div className="form-row">
                                        <div className="form-group mr-5">
                                            {
                                                !this.state.loading &&
                                                <button className="btn btn-primary">Sign up</button>
                                            }
                                            {
                                                this.state.loading &&
                                                <button className="btn btn-primary" type="button" disabled>
                                                    <span className="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
                                                    Loading...
                            </button>
                                            }
                                        </div>
                                        <Link to="login"><button className="btn btn-primary">Cancel</button></Link>

                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }

}

export { RegisterPage };
