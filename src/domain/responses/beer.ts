interface IngredientsInterface {
    [key: string]: any;
}

// Interface for beer item details.
interface Beer {
    id: number;
    name: string;
    tagline: string;
    image_url: string;
    description: string;
    ingredients: IngredientsInterface;
}
export default Beer;
