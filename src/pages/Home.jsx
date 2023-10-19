import MainMovie from "../components/MainMovie";
import Row from "../components/Row";
import requests from "../Requests";

const Home = () => {
  return (
    <>
      <MainMovie />
      <Row rowID="6" title="Up Coming" fetchURL={requests.requestUpcoming} />
      <Row rowID="7" title="Popular" fetchURL={requests.requestPopular} />
      <Row rowID="8" title="Trending" fetchURL={requests.requestTrending} />
      <Row rowID="9" title="Top Rated" fetchURL={requests.requestTopRated} />
      <Row rowID="10" title="Horror" fetchURL={requests.requestHorror} />
    </>
  );
};
export default Home;
