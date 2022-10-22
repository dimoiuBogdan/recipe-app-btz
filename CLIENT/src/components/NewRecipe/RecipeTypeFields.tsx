import { Field, ErrorMessage } from "formik";
import React from "react";
import { RecipeFilterTypes } from "../../models/RecipeModels";

const RecipeTypeFields = () => {
  return (
    <div className="fieldWrapperClassName w-1/3">
      <div className="labelClassName">Type</div>
      <Field
        placeholder="Recipe's type..."
        className="fieldClassName border-2 mt-1"
        name="type"
        as="select"
        defaultValue={"Recipe type..."}
      >
        <option disabled value={undefined}>
          Recipe type...
        </option>
        <option value={RecipeFilterTypes.Breakfast}>Breakfast</option>
        <option value={RecipeFilterTypes.Lunch}>Lunch</option>
        <option value={RecipeFilterTypes.Snack}>Snack</option>
        <option value={RecipeFilterTypes.Dinner}>Dinner</option>
      </Field>
      <ErrorMessage
        component="div"
        className="errorMessageClassName"
        name="type"
      />
    </div>
  );
};

export default RecipeTypeFields;
