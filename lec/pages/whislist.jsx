import Head from "next/head";
import { useRouter } from "next/navigation";

const Page = ({ movies }) => {
  const router = useRouter();

  const handleDelete = async (id, refresh) => {
    let res = await fetch(
      `https://mock-server-movies.vercel.app/wishlist/${id}`,
      {
        method: "DELETE",
      }
    );
    refresh();
  };

  return (
    <>
      <Head>
        <title>Wishlist Movies</title>
        <meta name="description" content="movie app created" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <div>
        <h1
          onClick={() => router.back()}
          style={{ cursor: "pointer", textAlign: "center" }}
        >
          Go Back
        </h1>
        <h2 style={{ textAlign: "center" }}>No Of Movies : {movies.length}</h2>
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(3, 1fr)",
            gap: "25px",
            margin: "auto",
            textAlign: "center",
            cursor: "pointer",
          }}
        >
          {movies &&
            movies.map((movie) => (
              <div key={movie.id}>
                <div>
                  <img
                    src={movie.Poster}
                    alt={movie.Title}
                    width={200}
                    height={300}
                  />
                </div>
                <h1 style={{ textAlign: "center" }}>{movie.Title}</h1>
                <button onClick={() => handleDelete(movie.id, router.refresh)}>
                  DELETE
                </button>
              </div>
            ))}
        </div>
      </div>
    </>
  );
};

export async function getServerSideProps() {
  let res = await fetch("https://mock-server-movies.vercel.app/wishlist");
  let data = await res.json();

  return {
    props: {
      movies: data,
    },
  };
}

export default Page;
