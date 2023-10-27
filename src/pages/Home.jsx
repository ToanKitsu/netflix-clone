import MainMovie from "../components/MainMovie";
import Row from "../components/Row";
import requests from "../Requests";

const Home = () => {
  return (
    <>
      <MainMovie />
      <Row title="Up Coming" fetchURL={requests.requestUpcoming} />
      <Row title="Popular" fetchURL={requests.requestPopular} />
      <Row title="Trending" fetchURL={requests.requestTrending} />
      <Row title="Top Rated" fetchURL={requests.requestTopRated} />
      <Row title="Horror" fetchURL={requests.requestHorror} />
    </>
  );
};
export default Home;
