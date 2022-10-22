import { ErrorMessage, Field, useFormikContext } from "formik";
import React, { FC } from "react";
import { FaPlusSquare, FaTrash } from "react-icons/fa";
import { v4 } from "uuid";
import {
  NewRecipeModel,
  RecipeDetailsStepsModel,
} from "../../models/RecipeModels";

const Steps = () => {
  const {
    values: { steps },
    setFieldValue,
  } = useFormikContext<NewRecipeModel>();

  const removeStepField = (id: string) => {
    setFieldValue(
      "steps",
      steps.filter((step) => step.id !== id)
    );
  };

  const addStepField = (steps: RecipeDetailsStepsModel[]) => {
    setFieldValue("steps", [
      ...steps,
      {
        id: v4(),
        description: "",
      },
    ]);
  };

  const getMultipeStepsFields = () => {
    return steps.map((steps, index) => {
      return (
        <StepFormField
          key={index}
          index={index}
          id={steps.id}
          removeStepField={removeStepField}
        />
      );
    });
  };

  return (
    <div>
      <div className="labelClassName">Steps</div>
      {getMultipeStepsFields()}
      <div
        onClick={() => addStepField(steps)}
        className="flex items-center font-medium text-zinc-500 gap-1 -mt-2 cursor-pointer text-sm hover:text-zinc-700"
      >
        <FaPlusSquare className="text-orange-500" />
        Add Step
      </div>
    </div>
  );
};

export default Steps;

type StepFormFieldProps = {
  index: number;
  id: string;
  removeStepField: (id: string) => void;
};
const StepFormField: FC<StepFormFieldProps> = ({
  id,
  index,
  removeStepField,
}) => {
  const fieldPlaceholder = `#${index + 1} step`;

  return (
    <div className="mb-4">
      <div className="flex gap-2 items-center">
        <div className="w-1/2">
          <Field
            placeholder={fieldPlaceholder}
            className="hidden"
            value={id}
            name={`steps[${index}].id`}
          />
          <Field
            placeholder={fieldPlaceholder}
            className="fieldClassName"
            name={`steps[${index}].description`}
          />
          <ErrorMessage
            component="div"
            className="errorMessageClassName"
            name={`steps[${index}].description`}
          />
        </div>
        {index > 0 && (
          <FaTrash
            className="text-red-500 cursor-pointer text-lg"
            onClick={() => removeStepField(id)}
          />
        )}
      </div>
    </div>
  );
};
