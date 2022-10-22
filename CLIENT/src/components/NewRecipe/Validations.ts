import * as Yup from 'yup'
import { RecipeDetailsIngredientsModel, RecipeDetailsStepsModel, NewRecipeModel, RecipeFilterTypes } from '../../models/RecipeModels';

const IngredientsSchema: Yup.SchemaOf<RecipeDetailsIngredientsModel> =
    Yup.object().shape({
        id: Yup.string().required("Required"),
        quantity: Yup.string().required("Required"),
        title: Yup.string().required("Required"),
    });

const StepsSchema: Yup.SchemaOf<RecipeDetailsStepsModel> = Yup.object().shape(
    {
        id: Yup.string().required("Required"),
        description: Yup.string().required("Required"),
    }
);

export const NewRecipeSchema: Yup.SchemaOf<NewRecipeModel> = Yup.object().shape({
    image: Yup.string().required("Required"),
    recipeName: Yup.string().required("Required"),
    ingredients: Yup.array().of(IngredientsSchema).min(1).required("Required"),
    type: Yup.mixed()
        .oneOf(Object.values(RecipeFilterTypes))
        .required("Required"),
    duration: Yup.number().min(1).max(600).required("Required"),
    steps: Yup.array().of(StepsSchema).min(1).required("Required"),
});
