import React from 'react';
import BeerInterface from '../domain/responses/beer';

interface BeerItemProps {
    beerDetails: BeerInterface
}

const BeerItem = (props: BeerItemProps) => {
    const { beerDetails: { id, name, tagline, description, image_url, ingredients } } = props;
    const ingredientsDetail = `ingredients: ${Object.keys(ingredients).join(', ')}`;

    return (
        <div className="box-border">
            <img src={image_url} height={90} width={30} title={ingredientsDetail}/>
            <div className='text-3xl font-bold underline'>
                <strong>
                    {name}
                </strong>
            </div>
            <div>
                {tagline}
            </div>
            <div>
                {description}
            </div>
        </div>
    )
}

export default BeerItem;
