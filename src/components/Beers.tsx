import React from 'react';

import BeerItem from './BeerItem';
import { getBeers } from '../services/beers';
import { LoadMoreButton } from './common/Button';
import BeerInterface from '../domain/responses/beer';
import { BeerItemListPreloader } from './BeerItemListPreloader';

const Beers = () => {
    const [beerList, setBeerList] = React.useState<BeerInterface[]>([]);
    const [pageNumber, setPageNumber] = React.useState<number>(1);
    const [isFetchingNextBatch, setIsFetchingNextBatch] = React.useState<boolean>(false);
    const [isLoading, setIsLoading] = React.useState<boolean>(false);

    React.useEffect(() => {
        (async () => {
            setIsLoading(true);
            const beers = await getBeers(pageNumber);
            setBeerList(beers);
            setIsLoading(false);
        })()
    }, []);

    /**
     * Fetches next batch of beers after load more button is triggered.
     */
    async function fetchNextBatchBeers() {
        const nextPage = pageNumber + 1;
        setIsFetchingNextBatch(true);
        const beers = await getBeers(nextPage);

        setBeerList([...beerList, ...beers]);
        setPageNumber(nextPage);
        setIsFetchingNextBatch(false);
    }

    return (
        <div className='text-center'>
            <div className='beer-container place-items-center'>
                <div className='text-left'>Beers</div>
                <div className='grid place-items-center grid-cols-2 md:grid-cols-1'>
                {isLoading
                ? <BeerItemListPreloader />
                : !!beerList.length && beerList.map(beerDetails => <BeerItem key={beerDetails.id} beerDetails={beerDetails} />)}
                </div >
                <LoadMoreButton onClick={fetchNextBatchBeers} isLoading={isFetchingNextBatch} />
            </div>
        </div>
    )
}

export default Beers;
