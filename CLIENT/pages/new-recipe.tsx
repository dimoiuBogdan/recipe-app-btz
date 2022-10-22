import { ErrorMessage, Field, Form, Formik } from "formik";
import { NextPage } from "next";
import * as Yup from "yup";
import React from "react";
import {
  NewRecipeModel,
  RecipeDetailsIngredientsModel,
  RecipeDetailsStepsModel,
  RecipeFilterTypes,
} from "../src/models/RecipeModels";
import { useDispatch } from "react-redux";
import { AxiosError, AxiosResponse } from "axios";
import useAxiosRequest from "../src/hooks/useAxiosRequest";
import { NotificationActions } from "../src/redux/reducers/notificationReducer";
import { NotificationTypes } from "../src/models/NotificationModel";
import { getSubmitButtonLabel } from "../src/services/AuthService";
import Ingredients from "../src/components/NewRecipe/Ingredients";
import { v4 } from "uuid";
import Steps from "../src/components/NewRecipe/Steps";
import ImageUpload from "../src/components/NewRecipe/ImageUpload";

const NewRecipePage: NextPage = () => {
  const dispatch = useDispatch();
  const { axiosRequest } = useAxiosRequest();

  const formProperties: NewRecipeModel = {
    image: "",
    recipeName: "",
    type: undefined,
    duration: undefined,
    steps: [{ id: v4(), description: "" }],
    ingredients: [{ id: v4(), quantity: "", title: "" }],
  };

  const IngredientsSchema: Yup.SchemaOf<RecipeDetailsIngredientsModel> =
    Yup.object().shape({
      id: Yup.string().required("Required"),
      title: Yup.string().required("Required"),
      quantity: Yup.string().required("Required"),
    });

  const StepsSchema: Yup.SchemaOf<RecipeDetailsStepsModel> = Yup.object().shape(
    {
      id: Yup.string().required("Required"),
      description: Yup.string().required("Required"),
    }
  );

  const NewRecipeSchema: Yup.SchemaOf<NewRecipeModel> = Yup.object().shape({
    image: Yup.string().required("Required"),
    type: Yup.mixed()
      .oneOf(Object.values(RecipeFilterTypes))
      .required("Required"),
    recipeName: Yup.string().required("Required"),
    duration: Yup.number().min(1).max(600).required("Required"),
    steps: Yup.array().of(StepsSchema).min(1).required("Required"),
    ingredients: Yup.array().of(IngredientsSchema).min(1).required("Required"),
  });

  const handleAddNewRecipe = (
    values: NewRecipeModel,
    setSubmitting: (state: boolean) => void
  ) => {
    const { image, recipeName, duration, ingredients, type, steps } = values;

    const data = {
      image,
      ingredients,
      steps,
      recipeName,
      duration: `${duration} min`,
      type,
    };

    const successAction = (res: AxiosResponse) => {
      dispatch(
        NotificationActions.setPopupProperties({
          content: "Recipe created!",
          type: NotificationTypes.Success,
        })
      );
    };

    const errorAction = (err: AxiosError) => {
      console.log(err);

      dispatch(
        NotificationActions.setPopupProperties({
          content: "There was a problem creating the recipe",
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
        {({ isSubmitting }) => (
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
            <Ingredients />
            <Steps />
            <div className="flex gap-4">
              <div className={`${fieldWrapperClassName} w-1/3`}>
                <div className={labelClassName}>Type</div>
                <Field
                  placeholder="Recipe's type..."
                  className={`${fieldClassName} border-2 mt-1`}
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
                  className={errorMessageClassName}
                  name="type"
                />
              </div>
              <div className={`${fieldWrapperClassName} w-1/3`}>
                <div className={labelClassName}>Duration</div>
                <div className="mt-1">
                  <Field
                    placeholder="Hours"
                    name="duration"
                    render={({ field }: any) => (
                      <div>
                        <input
                          className={`${fieldClassName} border-2`}
                          {...field}
                          placeholder="Duration (min)"
                          type="number"
                          name="duration"
                          min={1}
                          max={600}
                        />
                        <ErrorMessage
                          component="div"
                          className={errorMessageClassName}
                          name="duration"
                        />
                      </div>
                    )}
                  />
                </div>
              </div>
              <ImageUpload />
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

export async function getStaticProps() {
  return {
    props: {
      protected: true,
    },
  };
}
