import { ErrorMessage, Field, Form, Formik } from "formik";
import { NextPage } from "next";
import * as Yup from "yup";
import React, { FC, useState } from "react";
import {
  NewRecipeModel,
  RecipeDetailsIngredientsModel,
} from "../../src/models/RecipeModels";
import { useDispatch, useSelector } from "react-redux";
import { AxiosError, AxiosResponse } from "axios";
import useAxiosRequest from "../../src/hooks/useAxiosRequest";
import { NotificationActions } from "../../src/redux/reducers/notificationReducer";
import { NotificationTypes } from "../../src/models/NotificationModel";
import { getSubmitButtonLabel } from "../../src/services/AuthService";
import { RootState } from "../../src/redux/reducers/reducers";
import { FaPlusSquare } from "react-icons/fa";

const NewRecipePage: NextPage = () => {
  const dispatch = useDispatch();
  const { axiosRequest } = useAxiosRequest();

  const [ingredientFields, setIngredientFields] = useState<
    RecipeDetailsIngredientsModel[]
  >([
    {
      title: "",
      quantity: "",
    },
  ]);

  const userId = useSelector<RootState, string>((s) => s.authReducer.userId);

  const formProperties: NewRecipeModel = {
    creator: userId,
    image: "",
    ingredients: ingredientFields,
    recipeName: "",
  };

  const IngredientsSchema: Yup.SchemaOf<RecipeDetailsIngredientsModel> =
    Yup.object().shape({
      quantity: Yup.string().required("Required"),
      title: Yup.string().required("Required"),
    });

  const NewRecipeSchema: Yup.SchemaOf<
    Omit<NewRecipeModel, "image" | "creator">
  > = Yup.object().shape({
    // image: Yup.string().required("Required"), to be implemented when proper image uploading works
    // creator: Yup.string().required("Required"), to be implemented when proper user auth works
    recipeName: Yup.string().required("Required"),
    ingredients: Yup.array().of(IngredientsSchema).min(1).required("Required"),
  });

  const addIngredientField = (ingredients: RecipeDetailsIngredientsModel[]) => {
    setIngredientFields([
      ...ingredients,
      {
        title: "",
        quantity: "",
      },
    ]);
  };

  const getMultipeIngredientsFields = () => {
    return ingredientFields?.map((ingredient, index) => {
      return <IngredientFormField index={index} key={index} />;
    });
  };

  const handleAddNewRecipe = (
    values: NewRecipeModel,
    setSubmitting: (state: boolean) => void
  ) => {
    const { creator, image, ingredients, recipeName } = values;

    const data = {
      creator,
      image:
        "https://external-content.duckduckgo.com/iu/?u=http%3A%2F%2Fwww.bestviolet.com%2Ffast-food-logo.jpg&f=1&nofb=1&ipt=09f17a6d679b013e15f0980f59ed1b295961ccd59bd9bcd7ac0b14dd11590f4a&ipo=images",
      ingredients,
      recipeName,
    };

    const successAction = (res: AxiosResponse) => {
      console.log(res);
    };

    const errorAction = (err: AxiosError) => {
      console.log(err);

      dispatch(
        NotificationActions.setPopupProperties({
          content: "There was a problem logging you in.",
          type: NotificationTypes.Error,
        })
      );
    };

    const finallyAction = () => {
      setSubmitting(false);
    };

    axiosRequest(
      "post",
      "http://localhost:5000/api/recipes",
      data,
      successAction,
      errorAction,
      finallyAction
    );
  };

  const errorMessageClassName = "text-sm text-red-400 font-medium";
  const fieldWrapperClassName = "w-full my-6";
  const fieldClassName =
    "w-full bg-transparent border-b-2 py-1 outline-none hover:shadow-md focus:shadow-md px-1";
  const labelClassName = "text-sm font-medium px-1";

  return (
    <div>
      <Formik
        initialValues={formProperties}
        validationSchema={NewRecipeSchema}
        onSubmit={(values, { setSubmitting }) => {
          handleAddNewRecipe(values, setSubmitting);
        }}
      >
        {({ isSubmitting, values }) => (
          <Form>
            <div className={fieldWrapperClassName}>
              <div className={labelClassName}>Title</div>
              <Field
                placeholder="Recipe's name..."
                className={fieldClassName}
                name="recipeName"
              />
              <ErrorMessage
                component="div"
                className={errorMessageClassName}
                name="recipeName"
              />
            </div>
            <div>
              {getMultipeIngredientsFields()}
              <div
                onClick={() => addIngredientField(values.ingredients)}
                className="flex items-center font-medium text-zinc-500 gap-1 -mt-2 mb-2 cursor-pointer text-sm hover:text-zinc-700"
              >
                <FaPlusSquare className="text-orange-500" />
                Add Ingredient
              </div>
            </div>
            <button
              className="my-4 text-white text-lg font-medium w-full bg-gradient-to-r from-orange-300 to-orange-600 rounded-full py-1.5 shadow-sm hover:shadow-md disabled:opacity-40"
              type="submit"
              disabled={isSubmitting}
            >
              {getSubmitButtonLabel(
                isSubmitting,
                "CREATING RECIPE...",
                "CREATE RECIPE"
              )}
            </button>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default NewRecipePage;

type IngredientFormFieldProps = {
  index: number;
};
const IngredientFormField: FC<IngredientFormFieldProps> = ({ index }) => {
  const fieldPlaceholder = `#${index + 1} ingredient`;

  const errorMessageClassName = "text-sm text-red-400 font-medium";
  const fieldWrapperClassName = "w-full my-6";
  const fieldClassName =
    "w-full bg-transparent border-b-2 py-1 outline-none hover:shadow-md focus:shadow-md px-1";
  const labelClassName = "text-sm font-medium px-1";

  return (
    <div className={fieldWrapperClassName}>
      <div className={labelClassName}>Ingredients</div>
      <div className="flex gap-2">
        <div className="flex-1">
          <Field
            placeholder={fieldPlaceholder}
            className={fieldClassName}
            name={`ingredients[${index}].title`}
          />
          <ErrorMessage
            component="div"
            className={errorMessageClassName}
            name={`ingredients[${index}].title`}
          />
        </div>
        <div className="flex-1">
          <Field
            placeholder="quantity ( specify UoM )"
            className={fieldClassName}
            name={`ingredients[${index}].quantity`}
          />
          <ErrorMessage
            component="div"
            className={errorMessageClassName}
            name={`ingredients[${index}].quantity`}
          />
        </div>
      </div>
    </div>
  );
};
