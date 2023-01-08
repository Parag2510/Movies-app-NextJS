import { Link } from "@chakra-ui/react";
import Head from "next/head";
import { useRouter } from "next/router";
import styles from "../styles/Home.module.css";

export default function Page({ movies }) {
  const router = useRouter();

  const handleClick = (id) => {
    console.log("visiting page: /", id);
    router.push(`/${id}`);
  };

  const handleAdd = async (movie) => {
    alert("Movie Successfully Added To Wishlist");
    let res = await fetch("https://mock-server-movies.vercel.app/wishlist", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(movie),
    });

    let data = await res.json();
    console.log("data: ", data);
  };

  return (
    <div className={styles.container}>
      <Head>
        <title>Movies APP</title>
        <meta name="description" content="movie app created" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <h2>
          <Link href="./wishlist">Go To Wishlist</Link>
        </h2>{" "}
        <br />
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(4, 1fr)",
            gap: "10px",
            margin: "auto",
            textAlign: "center",
            cursor: "pointer",
          }}
        >
          {movies &&
            movies.map((movie) => (
              <div key={movie.imdbID}>
                <div>
                  <img
                    src={movie.Poster}
                    alt={movie.Title}
                    width="200"
                    height="300"
                    onClick={() => handleClick(movie.id)}
                  />
                </div>
                <h2 onClick={() => handleClick(movie.id)}>{movie.Title}</h2>
                <button onClick={() => handleAdd(movie)}>
                  Add To Wishlist
                </button>
              </div>
            ))}
        </div>
      </main>
    </div>
  );
}

export async function getStaticProps() {
  let res = await fetch("https://mock-server-movies.vercel.app/movies");
  let data = await res.json();

  return {
    props: {
      movies: data,
    },
  };
}
