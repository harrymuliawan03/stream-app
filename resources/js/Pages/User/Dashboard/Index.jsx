import Authenticated from "@/Layouts/Authenticated/Index";
import Flickity from "react-flickity-component";
import { Head } from "@inertiajs/react";
import FeaturedMovie from "@/Components/FeaturedMovie";
import MovieCard from "@/Components/MovieCard";
import { useEffect, useState } from "react";
import DashboardSkeleton from "@/Components/Skeleton/DashboardSkeleton";

export default function Dashboard({ auth, featuredMovies, movies }) {

    const [isLoading, setisLoading] = useState(true);

    useEffect(() => {
        setTimeout(() => {
            setisLoading(false);
        }, 2000);
    })

    const flickityOptions = {
        cellAlign: "left",
        contain: true,
        groupCells: 1,
        wrapAround: false,
        // pageDots: false,
        prevNextButtons: false,
        draggable: ">1",
    };

    return (
        <Authenticated auth={auth}>
            {isLoading && <DashboardSkeleton />}
            {!isLoading && (
                <>
                    <Head title="Dashboard">
                        <link
                            rel="stylesheet"
                            href="https://unpkg.com/flickity@2/dist/flickity.min.css"
                        />
                    </Head>
                    <div>
                        <div className="font-semibold text-[22px] text-black mb-4">
                            Featured Movies
                        </div>
                        <Flickity
                            className="gap-[30px]"
                            options={flickityOptions}
                        >
                            {featuredMovies.map((featuredMovie) => (
                                <FeaturedMovie
                                    key={featuredMovie.id}
                                    slug={featuredMovie.slug}
                                    name={featuredMovie.name}
                                    category={featuredMovie.category}
                                    thumbnail={featuredMovie.thumbnail}
                                    rating={featuredMovie.rating}
                                />
                            ))}
                        </Flickity>
                    </div>
                    {/* <!-- Browse --> */}
                    <div>
                        <div className="font-semibold text-[22px] text-black mb-4">
                            Browse
                        </div>
                        <Flickity
                            className="gap-[30px]"
                            options={flickityOptions}
                        >
                            {movies.map((movie) => (
                                <MovieCard
                                    key={movie.id}
                                    slug={movie.slug}
                                    name={movie.name}
                                    category={movie.category}
                                    thumbnail={movie.thumbnail}
                                />
                            ))}
                        </Flickity>
                    </div>
                </>
            )}
        </Authenticated>
    );
}
