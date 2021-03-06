import { EntityRepository, Repository } from 'typeorm';
import { Watchlist } from '../entities/watchlist';

export type FindWatchlistQuery = {
    user_id?: string;
    space_id?: string;
    reference_price?: number;
    current_price?: number;
    changes?: number;
};

@EntityRepository(Watchlist)
export class WatchlistRepository extends Repository<Watchlist> {
    public async insertWatchlist(watchlistToInsert: Watchlist): Promise<Watchlist> {
        const watchlist = await this.save(watchlistToInsert);
        return watchlist;
    }

    public async findByQuery(watchlistQuery: FindWatchlistQuery): Promise<Watchlist[]> {
        const qb = this.createQueryBuilder('watchlist');

        if (watchlistQuery.user_id) qb.andWhere('watchlist.userId = :userId', { userId: watchlistQuery.user_id });
        if (watchlistQuery.space_id) qb.andWhere('watchlist.spaceId = :spaceId', { spaceId: watchlistQuery.space_id });
        if (watchlistQuery.reference_price)
            qb.andWhere('watchlist.reference_price = :reference_price', {
                reference_price: watchlistQuery.reference_price
            });
        if (watchlistQuery.current_price)
            qb.andWhere('watchlist.current_price = :current_price', { current_price: watchlistQuery.current_price });
        if (watchlistQuery.changes) qb.andWhere('watchlist.changes = :changes', { changes: watchlistQuery.changes });

        const watchlists = qb.getMany();
        return watchlists;
    }
}
