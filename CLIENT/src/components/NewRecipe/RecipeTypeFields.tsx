import { Field, ErrorMessage } from "formik";
import React from "react";
import { RecipeType } from "../../models/RecipeModels";

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
        <option value={RecipeType.Breakfast}>Breakfast</option>
        <option value={RecipeType.Lunch}>Lunch</option>
        <option value={RecipeType.Snack}>Snack</option>
        <option value={RecipeType.Dinner}>Dinner</option>
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
