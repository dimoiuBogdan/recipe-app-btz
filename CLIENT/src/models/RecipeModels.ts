export type TopRatedRecipe = {
    id: string;
    likes: number;
    title: string;
    image: string;
    creator: string;
    duration: string;
}


export type AllRecipe = {
    id: string;
    image: string;
    title: string;
    creator: string;
    duration: string;
    type: RecipeFilterTypes;
}

export type RecipeFilters = {
    content: string;
    filterId: RecipeFilterTypes;
}


export enum RecipeFilterTypes {
    Snack = "snack",
    Lunch = "lunch",
    Dinner = "dinner",
    Breakfast = "breakfast",
}