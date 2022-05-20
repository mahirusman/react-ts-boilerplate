import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Formik, Field } from "formik";
import open from "../../assets/images/icons/open.png";

const Login: React.FC = (props) => {
  const handleFormSubmit = () => {};
  return (
    <section className="signuppage loginpage bgwhite">
      <div className="row align-items-center justify-content-center">
        <div className="col-lg-7 col-md-12 m-auto">
          <div className="outlineform rightside">
            <h2 className="mb-25 text-blue">Sign In</h2>

            <Formik
              onSubmit={handleFormSubmit}
              initialValues={{
                email: "",
                password: "",
              }}
              enableReinitialize={true}
            >
              {(formik) => {
                const { handleSubmit, errors, touched, isSubmitting } = formik;
                return (
                  <form onSubmit={handleSubmit}>
                    <div className="row">
                      <div className="col-md-12 mb-5">
                        <label htmlFor="email">Email</label>
                        <Field
                          name="email"
                          type="email"
                          className="form-control input mb-0"
                          placeholder="Enter your valid email"
                        />
                        {errors.email && touched.email && <span className="text-danger">{errors.email}</span>}
                      </div>
                      <div className="col-md-12 mb-2">
                        <label htmlFor="password">Password</label>
                        <div className="icon-wrapper">
                          <Field
                            name="password"
                            type="textfield"
                            className="form-control input mb-0"
                            placeholder="Enter your password"
                          />

                          <img width="20" className="img-fluid eye-icon pointer" src={open} alt="logo" />
                        </div>
                        {errors.password && touched.password && (
                          <span className="text-danger">{errors.password}</span>
                        )}
                      </div>
                      <div className="col-md-12 text-right mb-60">
                        <p>
                          <Link to="forget-password">Forgot Password?</Link>
                        </p>
                      </div>
                    </div>
                    <button type="submit" className="btn-primary" disabled={isSubmitting}>
                      Click Here to Generate Error
                    </button>
                  </form>
                );
              }}
            </Formik>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Login;
