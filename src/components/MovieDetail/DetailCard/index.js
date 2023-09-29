import React, { useEffect, useState } from "react";
import Rating from "@mui/material/Rating";
import { Favorite } from "@mui/icons-material";
import axios from "axios";
import { useParams } from "react-router-dom";
export default function DetailCard() {
  const [movie, setMovie] = useState({});
  const params = useParams();
  const [companyPoster, setCompanyPoster] = useState("");

  useEffect(() => {
    axios
      .get(`https://api.themoviedb.org/3/movie/${params.id}}`, {
        params: {
          api_key: "c3e41ae2e46b713e0683aa652c201c55",
        },
      })
      .then((res) => {
        // setMovie(res.data.results);
        setMovie(res.data);
        let companyWithLogo = res.data.production_companies?.find(
          (company) => company.logo_path !== null
        );
        if (companyWithLogo) {
          setCompanyPoster(companyWithLogo.logo_path);
        }
      });
  }, []);

  return (
    <div>
      <div className="p-5 row row-cols-2">
        <div className="col-4">
          <img
            className=" rounded  "
            src={`http://image.tmdb.org/t/p/w500${movie.poster_path}`}
            width={"400px"}
            height={"500px"}
            alt="/"
          />
        </div>
        <div className="col-8 text-start pt-2">
          <div className="d-flex justify-content-between align-items-center">
            <h1 className="fw-bold">{movie.title}</h1>
            <Favorite fontSize="large" color="" />
          </div>
          <h6 className="text-secondary">{movie.release_date}</h6>
          <div className="rating my-3 d-flex flex-inline align-items-center">
            <h6 className="me-3">
              {movie.vote_average && (
                <Rating
                  name="customized-10"
                  defaultValue={movie.vote_average}
                  max={10}
                  precision={0.5}
                  readOnly
                />
              )}
            </h6>{" "}
            <h6>{movie.vote_count}</h6>
          </div>
          <h4 className="my-3">{movie.overview}</h4>
          <div className="catg d-flex flex-inline my-4">
            {movie?.genres?.map((catg) => {
              return (
                <div className="bg-warning px-3 py-1 rounded me-2 fs-5 fw-bold">
                  {" "}
                  {catg.name}
                </div>
              );
            })}
          </div>
          <div className="d-flex flex-inline fs-5 align-items-center">
            <p className="me-4 ">
              <span className="fw-bold me-3 ">Duration:</span>
              {movie.runtime} minutes{" "}
            </p>
            <p>
              <span className="fw-bold me-3">Languages</span>
              {movie?.spoken_languages?.map((lang) => {
                return `${lang.english_name} `;
              })}
            </p>
          </div>
          <div>
            {companyPoster && (
              <img
                src={`http://image.tmdb.org/t/p/w500${companyPoster}`}
                height={"75px"}
                width={"300px"}
                alt=""
              />
            )}
          </div>
        </div>
      </div>

      <hr className="mt-1 mb-5" />
    </div>
  );
}
