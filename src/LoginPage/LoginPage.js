import React from "react";
import { Link } from 'react-router-dom';

import { userService } from "../_services";
import "./login.css";

// Je déclare mon composant
class LoginPage extends React.Component {

  // Je construit ma classe
  // Avec les props qui sont les variables de mon parent
  constructor(props) {
    super(props);

    userService.logout();

    // J'initialise le state
    this.state = {
      username: "",
      password: "",
      submitted: false,
      loading: false,
      error: ""
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  componentDidMount() {
    console.log('Hey, my component is mounted');

    //Tableau
    var fruits = ['Pomme', 'Banane', 'Fraise', 'Orange'];
    console.log(fruits);

    //Objet
    var maHonda = { couleur: "rouge", roue: 4, moteur: { cylindres: 4, taille: 2.2 } };
    console.log(maHonda);

    //String
    var txt = String("Je suis un string");
    console.log(txt);

    //Entier
    var entier = 10;
    console.log(entier);
  }

  handleChange(e) {
    const { name, value } = e.target;
    this.setState({ [name]: value });
    this.setState({ submitted: false });
    console.log(name, value);
  }

  handleSubmit(e) {
    e.preventDefault();

    const { username, password } = this.state;

    this.setState({ submitted: true });

    //Si username ou password est vide on arrete l'executin de la fonction
    if (!username || !password) {
      return;
    }

    //Sinon on remet les champs à vide
    e.target.username.value = '';
    e.target.password.value = '';

    // On fait le traitement après un temps de chargement
    this.setState({ loading: true });

    setTimeout(() => {
      this.setState({
        username: username,
        password: password,
        loading: false
      })
    }, 2000);

    userService.login(username, password);
  }

  render() {
    var { username, password } = this.state;

    let message = this.state.submitted && !this.state.loading && username && password ?
      (<p>Username: {this.state.username} Password: {this.state.password}</p>) : '';

    console.log(this.state);
    return (
      <div className="login-page page">
        <div className="register-page page">
          <div className="page-wrapper bg-gra-02 p-t-130 p-b-100 font-poppins">
            <div className="wrapper wrapper--w680">
              <div className="card card-4">
                <div className="card-body">
                <h2>Login</h2>
                {message}
                {/* {
          this.state.submitted && this.state.username && this.state.password && 
          <p>Username: {this.state.username} Password:{this.state.password}</p>
        }*/ }

                {
                  this.state.submitted && !this.state.username &&
                  <p className="alert alert-danger" role="alert">Username is required</p>
                }

                {
                  this.state.submitted && !this.state.password &&
                  <p className="alert alert-danger" role="alert">Password is required</p>
                }
                <form name="form" onSubmit={this.handleSubmit}>
                  <div className="form-row">
                    <div className="form-group col-md-6">
                      <label htmlFor="username">Username</label>
                      <input
                        type="text"
                        className="form-control"
                        name="username"
                        //value={username}
                        onChange={this.handleChange}
                      />
                    </div>
                    <div className="form-group col-md-6">

                      <label htmlFor="password">Password</label>
                      <input
                        type="password"
                        className="form-control"
                        name="password"
                        //value={password}
                        onChange={this.handleChange}
                      />
                    </div>
                  </div>
                  <div className="form-row">
                  <div className="form-group mr-5">
                    <button className="btn btn-primary">Sign In</button>
                  </div>
                  <Link to="register"><button className="btn btn-primary">Register</button></Link>
                  </div>
                </form>
                
                {this.state.loading && <p>Loading...</p>}
              </div>
            </div>
          </div>
        </div>
        </div>
      </div>
    );
  }
}

export { LoginPage };
