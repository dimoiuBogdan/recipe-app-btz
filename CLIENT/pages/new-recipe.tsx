import { Form, Formik } from "formik";
import { NextPage } from "next";
import * as Yup from "yup";
import React from "react";
import { NewRecipeModel, RecipeType } from "../src/models/RecipeModels";
import { useDispatch } from "react-redux";
import { AxiosError, AxiosResponse } from "axios";
import useAxiosRequest from "../src/hooks/useAxiosRequest";
import { NotificationActions } from "../src/redux/reducers/notificationReducer";
import { NotificationTypes } from "../src/models/NotificationModel";
import Ingredients from "../src/components/NewRecipe/Ingredients";
import { v4 } from "uuid";
import Steps from "../src/components/NewRecipe/Steps";
import { NewRecipeSchema } from "../src/components/NewRecipe/Validations";
import ImageUpload from "../src/components/NewRecipe/ImageUpload";
import RecipeNameFields from "../src/components/NewRecipe/RecipeNameFields";
import RecipeTypeFields from "../src/components/NewRecipe/RecipeTypeFields";
import RecipeDurationFields from "../src/components/NewRecipe/RecipeDurationFields";
import NewRecipeSubmitButton from "../src/components/NewRecipe/NewRecipeSubmitButton";

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
            <RecipeNameFields />
            <Ingredients />
            <Steps />
            <div className="flex gap-4">
              <RecipeTypeFields />
              <RecipeDurationFields />
              <ImageUpload />
            </div>
            <NewRecipeSubmitButton isSubmitting={isSubmitting} />
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
