import http from '../utils/http';
import endpoints from '../constants/endpoints';
import BeerInterface from '../domain/responses/beer';

const ROWS_COUNT_PER_PAGE = 10;

/**
 * Fetch the list of beers based on page number;
 *
 * @param {number} page
 * @returns {Promise<BeerInterface[]>}
 */
export async function getBeers(page: number): Promise<BeerInterface[]> {
    const paginationParams = {
        page,
        per_page: ROWS_COUNT_PER_PAGE
    }
    const beerList = await http.get(endpoints.beers, { params: paginationParams });
    
    return beerList.data;
}
