import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import SkeletonCard from "../components/skeletons/SkeletonCard";
import { getAllFlights } from "../services/home.service";
import Navbar from "../components/Navbar/Navbar";
import LoggedInNavbar from "../components/Navbar/LoggedInNavbar";
import HomeCard from "../components/Card/HomeCard";
import SearchDestination from "../components/Button/SearchButton";
import DiscountBanner from "../components/Banner/Banner";
import SearchFlight from "../components/Flight/SearchFlight";
import Pagination from "../components/Pagination/Pagination";
import { toast } from "react-toastify";
import { useLocation } from "react-router-dom";

const HomeView = () => {
  const { user } = useSelector((state) => state.userState);
  const limit = 10;
  const [flights, setFlights] = useState([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(true);
  const [continent, setContinent] = useState("semua");
  const [noDataFound, setNoDataFound] = useState(false);
  const [selectedFlight, setSelectedFlight] = useState(null);
  const [isDatepickerVisible, setIsDatepickerVisible] = useState(true);

  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const queryContinent = queryParams.get("continent");

  useEffect(() => {
    if (queryContinent) {
      setContinent(queryContinent);
    } else {
      setContinent("semua");
    }
  }, [location.search]);

  useEffect(() => {
    setFlights([]);
    setPage(1);
    setLoading(true);
    fetchFlights();
  }, [continent]);

  const fetchFlights = async () => {
    try {
      const response = await getAllFlights({ page, limit, continent });
      if (response.data.length === 0 && page === 1) {
        setNoDataFound(true);
      } else {
        setFlights(response.data);
        setTotalPages(response.meta.totalPages);
        setNoDataFound(false);
      }
    } catch (error) {
      toast.error(error.response?.data || error.message);
    } finally {
      setLoading(false);
    }
  };

  const handlePageChange = (newPage) => {
    if (newPage !== page) {
      setPage(newPage);
      setLoading(true);
    }
  };

  useEffect(() => {
    setLoading(true);
    fetchFlights();
  }, [page]);

  const handleSelectFlight = (flight) => {
    setSelectedFlight(flight);
    setIsDatepickerVisible(false);
  };

  return (
    <>
      {user ? <LoggedInNavbar /> : <Navbar />}

      <section>
        <div className="relative">
          <DiscountBanner />
        </div>
        <div className="">
          <SearchFlight
            selectedFlight={selectedFlight}
            isDatepickerVisible={isDatepickerVisible}
          />
        </div>
      </section>

      <section className="container mx-auto">
        <div>
          <h2 className="text-xl font-bold mb-4 px-8 pt-96 mt-40 md:pt-72 md:px-0 lg:pt-28">
            Destinasi Favorit
          </h2>
          <SearchDestination onContinentChange={setContinent} />
          {noDataFound ? (
            <p className="text-center text-lg text-gray-500">
              Tidak ada penerbangan ditemukan untuk benua {continent}.
            </p>
          ) : (
            <>
              {loading ? (
                <div className="grid grid-cols-1 px-8 pt-2 gap-3 md:grid-cols-3 md:px-0 lg:grid-cols-5">
                  {Array.from({ length: limit }).map((_, index) => (
                    <SkeletonCard key={index} />
                  ))}
                </div>
              ) : (
                <HomeCard
                  flights={flights}
                  onSelectFlight={handleSelectFlight}
                />
              )}
            </>
          )}

          {flights.length > 0 && totalPages > 1 && !noDataFound && (
            <Pagination
              currPage={page}
              totalPages={totalPages}
              onPageChange={handlePageChange}
            />
          )}
        </div>
      </section>
    </>
  );
};

export default HomeView;
