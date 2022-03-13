import axios from "axios";
import MovieCard from "components/MovieCard";
import Pagination from "components/Pagination";
import { BASE_URL } from "utils/requests";
import { useState, useEffect } from "react";
import { MoviePage } from "types/movie";

function Listing() {

    const [pageNumber, setPageNumber] = useState(1);

    const [page, setPage] = useState<MoviePage>({
        content: [],
        last: true,
        totalPages: 0,
        totalElements: 0,
        size: 12,
        number: 0,
        first: true,
        numberOfElements: 0,
        empty: true
    })

    useEffect(() => {
        axios.get(`${BASE_URL}/movies?size=12&page=${pageNumber}&sort=id`)
            .then(response => {
                const data = response.data as MoviePage;
                setPage(data);
                console.log(response.data);
            });
    }, [pageNumber]);




    return (
        <>
            <Pagination />

            <div className="container">
                <div className="row">
                    {page.content.map(item => (
                        <div key={item.id} className="col-sm-6 col-lg-4 col-xl-3 mb-3">
                            <MovieCard movie={item} />
                        </div>
                    )
                    )}
                </div>
            </div>
        </>
    );
}

export default Listing;