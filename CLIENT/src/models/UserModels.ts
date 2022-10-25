import { RecipeModel } from "./RecipeModels";

export type UserModel = {
    _id: string;
    email: string;
    image: string;
    username: string;
    registeredOn: Date;
    recipes: RecipeModel;
    likedRecipes: string[]
}