export type RecipeModel = {
    creator: string;
    creatorUsername: string;
    type: RecipeFilterTypes;
    duration: string;
    recipeName: string;
    ingredients: RecipeDetailsIngredientsModel;
    steps: RecipeDetailsStepsModel;
    image: string;
}

export type TopRatedRecipeModel = {
    id: string;
    likes: number;
    title: string;
    image: string;
    creator: string;
    duration: string;
}


export type AllRecipeModel = {
    _id: string;
    image: string;
    creator: string;
    creatorUsername: string;
    duration: string;
    recipeName: string;
    type: RecipeFilterTypes;
}

export type RecipeFiltersModel = {
    content: string;
    filterId: RecipeFilterTypes;
}

export type RecipeDetailsModel = {
    creator: string;
    creatorUsername: string;
    duration: string;
    image: string;
    ingredients: RecipeDetailsIngredientsModel[];
    recipeName: string;
    type: RecipeFilterTypes;
    description: string; // to add
    nutrients: RecipeDetailsNutrientsModel[]; // to add
    steps: RecipeDetailsStepsModel[]; // to add
}

export type RecipeDetailsIngredientsModel = {
    id: string;
    title: string;
    quantity: string;
}

export type RecipeDetailsNutrientsModel = {
    title: string;
    quantity: string;
}

export type RecipeDetailsStepsModel = {
    id: string;
    description: string;
}

export type NewRecipeModel = {
    recipeName: string;
    ingredients: RecipeDetailsIngredientsModel[];
    steps: RecipeDetailsStepsModel[];
    image: string;
    type: RecipeFilterTypes | undefined;
    duration: number | undefined;
}

export enum RecipeFilterTypes {
    Snack = "snack",
    Lunch = "lunch",
    Dinner = "dinner",
    Breakfast = "breakfast",
}