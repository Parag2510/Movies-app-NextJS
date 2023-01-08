import Head from "next/head";
import { useRouter } from "next/router";
import React from "react";

const Page = ({ movie }) => {
  const router = useRouter();

  return (
    <>
      <Head>
        <title>Movie Information</title>
        <meta name="description" content="movie app created" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <div style={{ textAlign: "center" }}>
        <h1 onClick={() => router.back()} style={{ cursor: "pointer" }}>
          Go Back
        </h1>
        <img src={movie.Poster} alt={movie.Title} width={350} height={480} />
        <h2>Name: {movie.Title}</h2>
        <h3>Type : {movie.Type}</h3>
        <h3>Released : {movie.Released}</h3>
        <h3>Director : {movie.Director}</h3>
        <h3>Rating : {movie.imdbRating}</h3>
        <h3>Awards: {movie.Awards}</h3>
        <h3>Runtime : {movie.Runtime}</h3>
        <h3>Genre : {movie.Genre}</h3>
        <div>
          <h2>Screenshots : </h2>
          {movie.Images.map((image) => (
            <div key={Math.random() + Date.now()}>
              <img
                src={image}
                width={600}
                height={350}
                style={{ marginBottom: "25px" }}
              />
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export async function getStaticPaths() {
  let res = await fetch("https://mock-server-movies.vercel.app/movies");
  let data = await res.json();

  return {
    paths: data.map((movie) => ({ params: { id: movie.id.toString() } })),
    fallback: false,
  };
}

export async function getStaticProps(context) {
  const {
    params: { id },
  } = context;

  let res = await fetch(`https://mock-server-movies.vercel.app/movies/${id}`);
  let data = await res.json();

  return {
    props: {
      movie: data,
    },
  };
}

export default Page;
