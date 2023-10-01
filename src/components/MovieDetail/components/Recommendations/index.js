import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { Box, CircularProgress, Typography } from "@mui/material";
function CircularProgressWithLabel(props) {
  return (
    <Box sx={{ position: "relative", display: "inline-flex" }}>
      <CircularProgress variant="determinate" {...props} />
      <Box
        sx={{
          top: 0,
          left: 0,
          bottom: 0,
          right: 0,
          position: "absolute",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Typography variant="button" component="div" sx={{ fontWeight: 700 }}>
          {`${Math.round(props.value)}%`}
        </Typography>
      </Box>
    </Box>
  );
}

export default function Recommend() {
  
  const [movieList, setMovieList] = useState([]);
  const params=useParams()
  const navigate = useNavigate();
  useEffect(() => {
    axios
      .get(`https://api.themoviedb.org/3/movie/${params.id}/recommendations?`, {
        params: {
          api_key: "c3e41ae2e46b713e0683aa652c201c55",
        },
      })
      .then((res) => {
        setMovieList(res.data.results.slice(0, 5));
      });
  }, []);
  return (
    <div className="mb-5">
      <h1 className="fw-bold text-start p-4 ">Recommendations</h1>
      <div className="row row-cols-5 ms-5">
        {movieList.map((movie) => {
          return (
            <div
              className="card h-100 col mx-1   gy-3"
              style={{ width: "17rem", cursor: "pointer" }}
              onClick={() => navigate(`/movie-detail/${movie.id}`)}
            >
              <img
                src={`http://image.tmdb.org/t/p/w500/${movie.poster_path}`}
                className="card-img-top rounded position-relative"
                width={"25px"}
                height={"300px"}
                alt="..."
              />
              <div className="text-start mt-2">
                <div className="d-flex justify-content-between align-items-center mb-3">
                  <h6 className="card-text fw-bold " title={movie.title}>
                    {" "}
                    {movie.title.length >= 15
                      ? movie.title.slice(0, 15) + ".."
                      : movie.title}
                  </h6>{" "}
                  <CircularProgressWithLabel value={movie.vote_average * 10} />
                </div>
                <div className="d-flex justify-content-between align-items-center ">
                  <div className=" text-secondary fw-bold">
                    {movie.release_date}
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
