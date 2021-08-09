/* IMPORTS */
import React, { useState } from "react";
import { pencilIcon } from "../../icons/icons";
import Card from "react-bootstrap/Card";
import { RenderForm } from "../RenderForm";
import _ from "lodash";
import ListGroup from "react-bootstrap/ListGroup";
import { Field } from "redux-form";
import moment from "moment";
import "./profileCard.css";
/* ------ */

export const ProfileCard = ({ auth, updateUser, logout, setModalDisplay }) => {
  const [editing, setEditing] = useState("");

  const handleForm = (formValues) => {
    updateUser(formValues);
    setEditing("");
  };

  const renderError = ({ error, touched }) => {
    if (touched && error) {
      return (
        <div className="ui error message">
          <div className="header">{error}</div>
        </div>
      );
    }
  };

  const renderInput = ({ input, label, meta }) => {
    const className = `field ${meta.error && meta.touched ? "error" : ""}`;
    return (
      <div
        className={`row justify-content-between align-items-center ${className}`}
      >
        <div className="col-3 text-left p-0">
          <label className="m-auto font-weight-bold">{label}</label>
        </div>
        <div className="col-7">
          {editing === label ? (
            <input
              className="profile__input form-control text-left"
              {...input}
            />
          ) : (
            <input
              className="profile__input-placeholder form-control-plaintext text-left"
              {...input}
            />
          )}
        </div>
        <div
          onClick={() => setEditing(label)}
          className="profile__cta-edit col-1"
        >
          {pencilIcon}
        </div>
        {renderError(meta)}
      </div>
    );
  };

  return (
    <Card className="profile__card">
      <Card.Img
        className="profile__avatar"
        variant="top"
        src={`data:image/png;base64,${auth.data.avatar}`}
      />
      <Card.Body className="profile__body">
        <RenderForm
          handleForm={handleForm}
          initialValues={_.pick(
            auth.data,
            "name",
            "username",
            "email",
            "password"
          )}
        >
          <ListGroup className="profile__content" variant="flush">
            <ListGroup.Item className="profile__row">
              <Field name="name" component={renderInput} label="Name" />
            </ListGroup.Item>
            <ListGroup.Item className="profile__row">
              <Field name="username" component={renderInput} label="Username" />
            </ListGroup.Item>
            <ListGroup.Item className="profile__row">
              <Field name="email" component={renderInput} label="Email" />
            </ListGroup.Item>
            <ListGroup.Item className="profile__row">
              <Field name="password" component={renderInput} label="Password" />
            </ListGroup.Item>

            <input type="submit" className="profile__submit" tabIndex="-1" />
          </ListGroup>
        </RenderForm>
      </Card.Body>
      <Card.Footer className="profile__footer">
        <ListGroup className="profile__row" variant="flush">
          <ListGroup.Item className="profile__row">
            <div className="row justify-content-around">
              <div className="col text-center">
                User Since: {moment(auth.data.createdAt).format("MMM 'YY")}
              </div>
            </div>
          </ListGroup.Item>
          <ListGroup.Item className="profile__row">
            <button onClick={() => logout()} className="btn btn-secondary mt-2">
              Log Out
            </button>
          </ListGroup.Item>
          <ListGroup.Item className="profile__row">
            <button
              onClick={() => setModalDisplay(true)}
              className="btn btn-danger"
              disabled={auth.data._id === "5f637fdd0a41ae691c828e50"}
            >
              Delete Account
            </button>
          </ListGroup.Item>
        </ListGroup>
      </Card.Footer>
    </Card>
  );
};
