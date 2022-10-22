import { Field, ErrorMessage } from "formik";
import React from "react";

const RecipeNameFields = () => {
  return (
    <div className="fieldWrapperClassName">
      <div className="labelClassName">Title</div>
      <Field
        placeholder="Recipe's name..."
        className="fieldClassName"
        name="recipeName"
      />
      <ErrorMessage
        component="div"
        className="errorMessageClassName"
        name="recipeName"
      />
    </div>
  );
};

export default RecipeNameFields;
