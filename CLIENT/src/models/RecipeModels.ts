export type RecipeModel = {
    _id: string;
    likes: number;
    image: string;
    creator: string;
    type: RecipeType;
    duration: string;
    recipeName: string;
    description: string;
    creatorUsername: string;
    steps: RecipeStepsModel[];
    nutrients: RecipeNutrientsModel[];
    ingredients: RecipeIngredientsModel[];
}

export type TopRatedRecipeModel = Pick<RecipeModel, '_id' | 'likes' | 'recipeName' | 'image' | 'creator' | 'duration'>

export type AllRecipeModel = Pick<RecipeModel, "_id" | "creator" | "image" | "creatorUsername" | "duration" | "recipeName" | "type">

export type RecipeDetailsModel = Pick<RecipeModel, "creator" | "creatorUsername" | "type" | "duration" | "recipeName" | "ingredients" | "steps" | "image" | "description" | "nutrients" | "likes">

export type NewRecipeModel = {
    image: string;
    type: RecipeType;
    duration: number;
    recipeName: string;
    steps: RecipeStepsModel[];
    ingredients: RecipeIngredientsModel[];
}

// SUBTYPES

export type RecipeFiltersModel = {
    content: string;
    filterId: RecipeType;
}

export type RecipeIngredientsModel = {
    id: string;
    title: string;
    quantity: string;
}


export type RecipeNutrientsModel = {
    title: string;
    quantity: string;
}

export type RecipeStepsModel = {
    id: string;
    description: string;
}

export enum RecipeType {
    Snack = "snack",
    Lunch = "lunch",
    Dinner = "dinner",
    Breakfast = "breakfast",
}