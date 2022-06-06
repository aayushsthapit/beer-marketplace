import React from 'react';

import BeerItem from './BeerItem';
import { getBeers } from '../services/beers';
import BeerInterface from '../domain/responses/beer';

const Beers = () => {
    const [beerList, setBeerList] = React.useState<BeerInterface[]>([]);
    const [pageNumber, setPageNumber] = React.useState<number>(1);

    React.useEffect(() => {
        (async () => {
            const beers = await getBeers(pageNumber);
            setBeerList(beers);
        })()
    }, []);

    console.log(beerList)
    return (
        <div>
            {!!beerList.length&&beerList.map(beerDetails => <BeerItem key={beerDetails.id} beerDetails={beerDetails} />)}
        </div>
    )
}

export default Beers;
