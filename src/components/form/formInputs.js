import React, { useState } from "react";
import {
  TextField,
  NativeSelect,
  FormControl,
  InputLabel,
} from "@mui/material";
import Autocomplete from "@mui/material/Autocomplete";
import { capitalize } from "../../utils/capitalize";
import { useField, Field, setIn } from "formik";
import { useSetState } from "react-use";

export const MyTextField = ({ ...props }) => {
  const [field, meta] = useField(props);
  return (
    <>
      <div className={`mt-4`}>
        <TextField
          {...field}
          {...props}
          fullWidth
          label={
            props.name === "confirmPassword"
              ? capitalize("Confirm Password")
              : props.name === "wobc_id"
              ? "WOBC ID (optional)"
              : capitalize(props.name)
          }
          className={`text-sm font-medium text-gray-900 ${
            meta.error || (meta.touched && meta.error)
              ? "border-2 border-red-600"
              : ""
          }`}
          type={
            props.name === "confirmPassword" || props.name === "password"
              ? "password"
              : ""
          }
          autoComplete="off"
        />
      </div>
    </>
  );
};

export const MySelect = ({ children, ...props }) => {
  const [field, meta] = useField(props);
  return (
    <FormControl fullWidth>
      <InputLabel variant="filled" htmlFor={props.name}>
        {capitalize(props.name)}
      </InputLabel>
      <NativeSelect
        {...field}
        inputProps={{
          name: props.name,
        }}
      >
        <option value=""></option>
        {children.map((choice, i) => {
          return (
            <option value={choice} key={i}>
              {choice}
            </option>
          );
        })}
      </NativeSelect>
    </FormControl>
  );
};

export const MyRadio = ({ children, ...props }) => {
  const [field, meta] = useField(props);
  return (
    <div className="grid grid-cols-2 justify-center justify-items-start">
      {children.map((choice, i) => {
        return (
          <div key={i} className="mt-2 flex justify-items-center items-center">
            <label key={i}>
              <Field type="radio" key={i} name={props.name} value={choice} />
              {choice}
            </label>
          </div>
        );
      })}
    </div>
  );
};

export const MySearchable = ({ setFieldValue, children, ...props }) => {
  const [field, meta] = useField(props);
  return (
    <>
      <Autocomplete
        {...field}
        options={children}
        onChange={(event, newValue) => {
          setFieldValue(props.name, newValue);
        }}
        autoSelect
        freeSolo
        className="text-sm font-medium text-gray-900 mt-2"
        renderInput={(params) => (
          <>
            <MyTextField
              {...params}
              {...props}
              name={props.name}
              label={props.name}
              fullWidth
            />
          </>
        )}
      />
    </>
  );
};
