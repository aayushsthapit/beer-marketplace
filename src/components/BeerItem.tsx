import BeerInterface from '../domain/responses/beer';

interface BeerItemProps {
    beerDetails: BeerInterface
}

const BeerItem = (props: BeerItemProps) => {
    const { beerDetails: { id, name, tagline, description, image_url, ingredients } } = props;
    const ingredientsDetail = `ingredients: ${Object.keys(ingredients).join(', ')}`;

    return (
        <div key={id} className="beer-item--box box-border w-full flex rounded-lg border border-gray-200 shadow-lg my-3 py-5 px-10">
            <div className="w-28 beer-item-img mr-10">
                <img src={image_url} max-width={23} width={23} title={ingredientsDetail} />
            </div>
            <div className="text-left h-28 overflow-scroll ">
                <strong className="text-lg md:text-xl">
                    {name}
                </strong>
                <div className="text-yellow-600 beer-item--tag">
                    {tagline}
                </div>
                <div className="beer-item--description">
                    {description}
                </div>
            </div>
        </div>
    )
}

export default BeerItem;
