export default function Home(props) {
  return (
    <div>
      <h1>Index</h1>
      <p>{JSON.stringify(props.episodes)}</p>
    </div>
  );
}

// SERVER SIDE RENDERING
//export async function getServerSideProps() {
//  const response = await fetch('http://localhost:3333/episodes');
//  const data = await response.json();
//
//  return {
//    props: {
//      episodes: data
//    }
//  }
//}

// STATIC SITE GENERATOR
export async function getStaticProps() {
  const response = await fetch('http://localhost:3333/episodes');
  const data = await response.json();

  return {
    props: {
      episodes: data
    },
    revalidate: 60 * 60 * 8,
  }
}