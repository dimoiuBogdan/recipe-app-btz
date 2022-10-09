export type TopRatedRecipeModel = {
    id: string;
    likes: number;
    title: string;
    image: string;
    creator: string;
    duration: string;
}


export type AllRecipeModel = {
    id: string;
    image: string;
    title: string;
    creator: string;
    duration: string;
    type: RecipeFilterTypes;
}

export type RecipeFiltersModel = {
    content: string;
    filterId: RecipeFilterTypes;
}

export type RecipeDetailsModel = {
    id: string;
    image: string;
    title: string;
    description: string;
    nutrients: RecipeDetailsNutrientsModel[];
    ingredients: RecipeDetailsIngredientsModel[];
    steps: RecipeDetailsStepsModel[];
    duration: string;
}

export type RecipeDetailsIngredientsModel = {
    title: string;
    quantity: string;
}

export type RecipeDetailsNutrientsModel = {
    title: string;
    quantity: string;
}

export type RecipeDetailsStepsModel = {
    description: string;
}

export type NewRecipeModel = {
    creator: string;
    recipeName: string;
    ingredients: RecipeDetailsIngredientsModel[];
    image: string;
}

export enum RecipeFilterTypes {
    Snack = "snack",
    Lunch = "lunch",
    Dinner = "dinner",
    Breakfast = "breakfast",
}