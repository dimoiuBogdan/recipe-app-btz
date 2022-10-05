export type Recipe = {
    id: string;
    date: Date;
    title: string
    image?: string;
    creator: string;
    description: string;
}

export type TopRatedRecipe = {
    id: string;
    likes: number;
    title: string;
    image: string;
    duration: string;
    creator: string;
}