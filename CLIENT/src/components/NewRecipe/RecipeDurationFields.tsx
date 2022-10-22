import { Field, ErrorMessage } from "formik";
import React from "react";

const RecipeDurationFields = () => {
  return (
    <div className="fieldWrapperClassName w-1/3">
      <div className="labelClassName">Duration</div>
      <div className="mt-1">
        <Field
          placeholder="Hours"
          name="duration"
          render={({ field }: any) => (
            <div>
              <input
                className="fieldClassName border-2"
                {...field}
                placeholder="Duration (min)"
                type="number"
                name="duration"
                min={1}
                max={600}
              />
              <ErrorMessage
                component="div"
                className="errorMessageClassName"
                name="duration"
              />
            </div>
          )}
        />
      </div>
    </div>
  );
};

export default RecipeDurationFields;
