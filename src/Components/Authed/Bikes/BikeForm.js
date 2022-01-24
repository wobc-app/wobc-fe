// import React, { useEffect, useState } from "react";
// import { Formik, Form, useField, Field } from "formik";
// import * as Yup from "yup";
// import { Autocomplete } from "formik-mui";
// import TextField from "@mui/material/TextField";
// import MuiTextField from "@mui/material/TextField";
// import fd, { initialValues } from "./Options/formData";
// import { useBikes } from "../../Contexts/bikesContext";
// import Box from "@mui/material/Box";
// import Modal from "@mui/material/Modal";
// import Select from "@mui/material/Select";

// const modalStyle = {
//   position: "absolute",
//   top: "50%",
//   left: "50%",
//   transform: "translate(-50%, -50%)",
//   width: 200,
//   bgcolor: "background.paper",
//   border: "2px solid #000",
//   boxShadow: 24,
//   pt: 2,
//   px: 4,
//   pb: 3,
// };

// const MyTextInput = ({ label, ...props }) => {
//   const [field, meta] = useField(props);
//   return (
//     <div
//       className={`mt-2 ${
//         meta.error || (meta.touched && meta.error)
//           ? `border-2 border-red-600 rounded-md`
//           : ""
//       }`}
//     >
//       <MuiTextField
//         // placeholder={props.name}
//         required
//         {...field}
//         {...props}
//         label={props.name}
//         fullWidth
//         // defaultValue={props.name}
//       />
//       {/* {meta.touched && meta.error ? (
//         <div className="error">{meta.error}</div>
//       ) : null} */}
//     </div>
//   );
// };

// const MyRadio = ({ children, ...props }) => {
//   const [field, meta] = useField(props);
//   return (
//     <div className="grid grid-cols-2 justify-center justify-items-start">
//       {children.map((choice, i) => {
//         return (
//           <div key={i} className="mt-2 flex justify-items-center items-center">
//             <label key={i}>
//               <Field type="radio" key={i} name={props.name} value={choice} />
//               {choice}
//             </label>
//           </div>
//         );
//       })}

//       {/* {meta.touched && meta.error ? (
//         <div className="error">{meta.error}</div>
//       ) : null} */}
//     </div>
//   );
// };

// const MySelect = ({ children, label, ...props }) => {
//   const [field, meta] = useField(props);

//   return (
//     <div
//       className={`mt-2 ${
//         meta.error || (meta.error && meta.touched)
//           ? `border-2 border-red-600 rounded-md`
//           : ""
//       }`}
//     >
//       <select {...field} {...props}>
//         <option selected value="null">
//           {label}
//         </option>
//         {children.map((choice, i) => {
//           return (
//             <option key={i} value={choice}>
//               {choice}
//             </option>
//           );
//         })}
//       </select>
//     </div>
//   );
// };

// const MySearchable = ({ placeholder, children, ...props }) => {
//   const [field, meta] = useField(props);
//   return (
//     <Field
//       className="mt-2 p-0"
//       name={props.name}
//       component={Autocomplete}
//       options={children}
//       label={props.name}
//       renderInput={(props) => (
//         <TextField
//           {...props}
//           name={props.name}
//           placeholder={placeholder}
//           className="mt-2 p-0"
//           variant="standard"
//         />
//       )}
//     />
//   );
// };

// const BikeForm = (props) => {
//   const { editBike, postBike, postMsg, putMsg, deleteBike, deleteAttempt } =
//     useBikes();
//   const [showModal, setShowModal] = useState(false);

//   const onClose = () => {
//     setShowModal(false);
//   };

//   const handleOpen = () => {
//     setShowModal(!showModal);
//   };

//   const confirmDeletion = () => {
//     deleteBike(props.match.serial);
//     setShowModal(false);
//   };

//   useEffect(() => {
//     deleteAttempt.value = null;
//     postMsg.value = null;
//     putMsg.value = null;
//   }, [deleteAttempt.value, postMsg.value, putMsg.value]);

//   return (
//     <div className="mt-2">
//       <Formik
//         initialValues={props.match ? { ...props.match } : {}}
//         validationSchema={Yup.object({
//           serial: Yup.string().required("Required"),
//           status: Yup.string().required("Required"),
//         })}
//         onSubmit={(values, { setSubmitting, setValues, resetForm }) => {
//           values.serial = values.serial.toUpperCase();
//           if (props.edit === true) {
//             editBike(values);
//           }
//           if (props.add === true) {
//             postBike(values);
//           }
//         }}
//       >
//         <Form className="flex flex-col">
//           {fd.options.map((option, i) => {
//             if (option.type === "text") {
//               return (
//                 <MyTextInput
//                   type={option.type}
//                   key={i}
//                   name={option.name}
//                   className={` ${props.edit === true ? "hidden" : ""}`}
//                 />
//               );
//             }
//             if (option.type === "select") {
//               return (
//                 <MySelect
//                   children={option.choices}
//                   label={option.name}
//                   type={option.type}
//                   key={i}
//                   name={option.name}
//                 />
//               );
//             }
//             if (option.type === "radio") {
//               return (
//                 <MyRadio key={i} children={option.choices} name={option.name} />
//               );
//             }
//             if (option.type === "search") {
//               return (
//                 <MySearchable
//                   key={i}
//                   name={option.name}
//                   children={option.choices}
//                   placeholder={option.name}
//                 />
//               );
//             }
//           })}

//           <button className="button mt-2" type="submit">
//             {props.add === true && `Add New Bike`}
//             {props.edit === true && props.add === undefined && `Edit Bike`}
//           </button>

//           {props.delete === true && (
//             <button
//               className="button bg-red-300 hover:bg-red-600 focus:bg-red-600 mt-2"
//               type="button"
//               onClick={handleOpen}
//             >
//               Delete
//             </button>
//           )}

//           {putMsg.value != undefined && (
//             <div>
//               {putMsg.value.message} for {props.match && props.match.serial}
//             </div>
//           )}

//           {postMsg.value != undefined && props.edit != true && (
//             <div>
//               {postMsg.value.message}{" "}
//               {postMsg.value.newBike &&
//                 `for ${postMsg.value.newBike[0].serial}`}
//             </div>
//           )}

//           {deleteAttempt.value && deleteAttempt.value.message && (
//             <>{deleteAttempt.value.message}</>
//           )}
//         </Form>
//       </Formik>
//       <Modal open={showModal} onClose={onClose}>
//         <Box sx={modalStyle}>
//           <p>
//             This is forever. Mainly because your developer isn't that good. But
//             please be sure. Tap anywhere to cancel.
//           </p>
//           <button
//             className="button bg-red-400 hover:bg-red-600 focus:bg-red-600"
//             onClick={confirmDeletion}
//           >
//             Confirm deletion
//           </button>
//         </Box>
//       </Modal>
//     </div>
//   );
// };

// export default BikeForm;

import React from "react";
import { Box, Button } from "@mui/material";
import { useBikes } from "../../../Contexts/bikesContext";
import { useBikeForm } from "../../../Contexts/Bikes/bikeFormContext";
import fd from "../Form/data/formData";
import {
  MyRadio,
  MySearchable,
  MySelect,
  MyTextField,
} from "../Form/formInputs";
import { Formik, Form } from "formik";

const BikeForm = (props) => {
  const { postBike, postMsg } = useBikes();
  const {
    handleRadio,
    handleOptionSelect,
    setSearch,
    search,
    toggleDisplay,
    onInputType,
    display,
    handleSubmit,
  } = useBikeForm();

  return (
    // <Box className="flex flex-col items-center">
    //   <Box component="form" onSubmit={handleSubmit}>
    //     {fd.options.map((o, i) => {
    //       if (o.type === "text") {
    //         return <MyTextField name={o.name} key={i} />;
    //       }

    //       if (o.type === "select") {
    //         return <MySelect name={o.name} key={i} children={o.choices} />;
    //       }

    //       if (o.type === "radio") {
    //         return (
    //           <MyRadio
    //             name={o.name}
    //             key={i}
    //             children={o.choices}
    //             handleRadio={handleRadio}
    //           />
    //         );
    //       }

    //       if (o.type === "search") {
    //         return (
    //           <MySearchable
    //             name={o.name}
    //             handleOptionSelect={handleOptionSelect}
    //             setSearch={setSearch}
    //             search={search[o.name]}
    //             label={o.name}
    //             toggleDisplay={toggleDisplay}
    //             onChange={onInputType}
    //             children={o.choices}
    //             display={display}
    //             handleOptionSelect={handleOptionSelect}
    //             key={i}
    //           />
    //         );
    //       }
    //     })}
    //     <Button fullWidth type="submit" htmlFor="submit" variant="contained">
    //       Submit
    //     </Button>
    //     <>{postMsg.value != undefined && postMsg.value.message}</>
    //   </Box>
    // </Box>

    <Formik
      initialValues={props.match ? { ...props.match } : {}}
      // validationSchema={Yup.object({
      //   serial: Yup.string().required("Required"),
      //   status: Yup.string().required("Required"),
      // })}
      onSubmit={(values, { setSubmitting, setValues, resetForm }) => {
        values.serial = values.serial.toUpperCase();
        let submission = {
          ...values,
          status: search.status,
          brand: search.brand,
          size: search.size,
          storage: search.storage,
          received: search.storage,
        };
        console.log(submission);

        // if (props.edit === true) {
        //   editBike(values);
        // }
        // if (props.add === true) {
        //   postBike(values);
        // }
        postBike(submission);
      }}
    >
      <Form className="flex flex-col">
        {fd.options.map((o, i) => {
          if (o.type === "text") {
            return <MyTextField name={o.name} key={i} />;
          }

          if (o.type === "select") {
            return <MySelect name={o.name} key={i} children={o.choices} />;
          }

          if (o.type === "radio") {
            return (
              <MyRadio
                name={o.name}
                key={i}
                children={o.choices}
                handleRadio={handleRadio}
              />
            );
          }

          if (o.type === "search") {
            return (
              <>
                <MySearchable
                  name={o.name}
                  search={search[o.name]}
                  children={o.choices}
                  display={display}
                  key={i}
                  onClick={() => toggleDisplay(o.name)}
                  onChange={onInputType}
                  value={search[o.name]}
                />
                {display[o.name] && (
                  <Box>
                    {o.choices
                      .filter((value) => {
                        if (
                          search[o.name] == "" ||
                          search[o.name] == undefined
                        ) {
                          return;
                        } else if (
                          value
                            .toLowerCase()
                            .includes(search[o.name].toLowerCase())
                        ) {
                          return value;
                        }
                      })
                      .map((choice, i) => {
                        return (
                          <div
                            onClick={() => handleOptionSelect(choice, o.name)}
                            key={i}
                            className="cursor-pointer border-[1px] border-neutral-800 p-1"
                          >
                            <span className="cursor-pointer" value={choice}>
                              {choice}
                            </span>
                          </div>
                        );
                      })}
                  </Box>
                )}
              </>
            );
          }
        })}
        <button className="button mt-2" type="submit">
          Submit
        </button>
      </Form>
    </Formik>
  );
};

export default BikeForm;