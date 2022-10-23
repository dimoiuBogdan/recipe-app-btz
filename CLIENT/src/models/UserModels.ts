import { RecipeModel } from "./RecipeModels";

export type UserModel = {
    username: string;
    email: string;
    recipes: RecipeModel;
    registeredOn: Date;
    image: string;
}