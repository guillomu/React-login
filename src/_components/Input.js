import React from "react";

// Je déclare mon composant
class Input extends React.Component {

    render() {
        return (
            <div className="input-component">
                <label htmlFor={this.props.name}>{this.props.label}</label>
                <input
                    className="form-control"
                    name={this.props.name}
                    type={this.props.type}
                    onChange={this.props.handleChange}
                /><br />
                {/* Gestion d'erreur */}
                {
                    this.props.submitted && !this.props.value &&
                    <p className="alert alert-danger" role="alert">{this.props.label} is required</p>
                }
            </div>
        )
    }
}
export { Input };
