import { Field, ErrorMessage, useFormikContext } from "formik";
import React, { FC } from "react";
import { FaPlusSquare, FaTrash } from "react-icons/fa";
import {
  NewRecipeModel,
  RecipeIngredientsModel,
} from "../../models/RecipeModels";
import { v4 } from "uuid";

const Ingredients: FC = () => {
  const {
    values: { ingredients },
    setFieldValue,
  } = useFormikContext<NewRecipeModel>();

  const removeIngredientField = (id: string) => {
    setFieldValue(
      "ingredients",
      ingredients.filter((ing) => ing.id !== id)
    );
  };

  const addIngredientField = (ingredients: RecipeIngredientsModel[]) => {
    setFieldValue("ingredients", [
      ...ingredients,
      {
        id: v4(),
        title: "",
        quantity: "",
      },
    ]);
  };

  const getMultipeIngredientsFields = () => {
    return ingredients.map((ingredient, index) => {
      return (
        <IngredientFormField
          key={index}
          index={index}
          id={ingredient.id}
          removeIngredientField={removeIngredientField}
        />
      );
    });
  };

  return (
    <div className="mb-6">
      <div className="labelClassName">Ingredients</div>
      {getMultipeIngredientsFields()}
      <div
        onClick={() => addIngredientField(ingredients)}
        className="flex items-center font-medium text-zinc-500 gap-1 -mt-2 cursor-pointer text-sm hover:text-zinc-700"
      >
        <FaPlusSquare className="text-orange-500" />
        Add Ingredient
      </div>
    </div>
  );
};

export default Ingredients;

type IngredientFormFieldProps = {
  index: number;
  id: string;
  removeIngredientField: (id: string) => void;
};
const IngredientFormField: FC<IngredientFormFieldProps> = ({
  id,
  index,
  removeIngredientField,
}) => {
  const fieldPlaceholder = `#${index + 1} ingredient`;

  return (
    <div className="mb-4">
      <div className="flex gap-2 items-center">
        <div className="w-1/2">
          <Field
            placeholder={fieldPlaceholder}
            className="hidden"
            value={id}
            name={`ingredients[${index}].id`}
          />
          <Field
            placeholder={fieldPlaceholder}
            className="fieldClassName"
            name={`ingredients[${index}].title`}
          />
          <ErrorMessage
            component="div"
            className="errorMessageClassName"
            name={`ingredients[${index}].title`}
          />
        </div>
        <div>
          <Field
            placeholder="quantity ( specify UoM )"
            className="fieldClassName"
            name={`ingredients[${index}].quantity`}
          />
          <ErrorMessage
            component="div"
            className="errorMessageClassName"
            name={`ingredients[${index}].quantity`}
          />
        </div>
        {index > 0 && (
          <FaTrash
            className="text-red-500 cursor-pointer text-lg"
            onClick={() => removeIngredientField(id)}
          />
        )}
      </div>
    </div>
  );
};
