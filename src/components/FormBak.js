import React, { useState } from "react"

const regularExpression = RegExp(/^[a-zA-Z0-9]+@[a-zA-Z0-9]+\.[A-Za-z]+$/)

const validation = ({ error, ...rest }) => {
  let checkValidation = false

  Object.values(error).forEach(val => {
    if (val.length > 0) {
      checkValidation = false
    } else {
      checkValidation = true
    }
  })

  Object.values(rest).forEach(val => {
    if (val === null) {
      checkValidation = false
    } else {
      checkValidation = true
    }
  })

  return checkValidation
}

export default function Form(props) {


  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassowrd] = useState("")

  const [error, setError] = useState({ name: '', email: '', password: '' })
  console.log(error)

  const onFormSubmit = event => {
    event.preventDefault()

    if (validation(error)) {
      console.log(error)
    } else {
      console.log("Error occured")
    }
  }


  const formObject = event => {

    event.preventDefault()

    const { name, value } = event.target
    let error = { ...error }

    switch (name) {
      case "name":
        error.name = value.length < 5 ? "Name should be 5 characaters long" : ""
        break
      case "email":
        error.email = regularExpression.test(value)
          ? ""
          : "Email is not valid"
        break
      case "password":
        error.password =
          value.length < 5 ? "Password should 5 characaters long" : ""
        break
      default:
        break
    }

    setError(error)
  }


  return (
    <div className="container">
      <div className="card mt-5">
        <form className="card-body" onSubmit={onFormSubmit}>

          <div className="form-group mb-3">
            <label className="mb-2"><strong>Name</strong></label>
            <input
              required
              type="text"
              name="name"
              onChange={formObject}
              className={error.name.length > 0 ? "is-invalid form-control" : "form-control"} />

            {error.name.length > 0 && (
              <span className="invalid-feedback">{error.name}</span>
            )}
          </div>

          <div className="form-group mb-3">
            <label className="mb-2"><strong>Email</strong></label>
            <input
              required
              type="email"
              name="email"
              className={error.email.length > 0 ? "is-invalid form-control" : "form-control"}
              onChange={error} />

            {error.email.length > 0 && (
              <span className="invalid-feedback">{error.email}</span>
            )}
          </div>

          <div className="form-group mb-3">
            <label className="mb-2"><strong>Password</strong></label>
            <input
              required
              type="password"
              name="password"
              className={error.password.length > 0 ? "is-invalid form-control" : "form-control"}
              onChange={error} />

            {error.password.length > 0 && (
              <span className="invalid-feedback">{error.password}</span>
            )}
          </div>

          <div className="d-grid mt-3">
            <button type="submit" className="btn btn-block btn-primary">Submit</button>
          </div>
        </form>
      </div>
    </div>
  )
}