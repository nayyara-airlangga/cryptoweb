import millify from "millify";
import { Typography, Row, Col, Statistic } from "antd";
import Link from "next/link";

import { useGetCryptosQuery } from "../services/cryptoApi";
import { Cryptocurrencies, News } from "../components";
import CryptoStats from "../ts/interfaces/CryptoStats";

const { Title } = Typography;

const Home = () => {
  const { data, isFetching } = useGetCryptosQuery(10);
  const globalStats: CryptoStats = data?.data?.stats;

  if (isFetching) return "Loading";

  return (
    <>
      <Title level={2} className="heading">
        Global Crypto Stats
      </Title>
      <Row>
        <Col span={12}>
          <Statistic title="Total Cryptocurrencies" value={globalStats.total} />
        </Col>
        <Col span={12}>
          <Statistic
            title="Total Exchanges"
            value={millify(globalStats.totalExchanges)}
          />
        </Col>
        <Col span={12}>
          <Statistic
            title="Total Market Cap"
            value={millify(globalStats.totalMarketCap)}
          />
        </Col>
        <Col span={12}>
          <Statistic
            title="Total 24h Volume"
            value={millify(globalStats.total24hVolume)}
          />
        </Col>
        <Col span={12}>
          <Statistic
            title="Total Markets"
            value={millify(globalStats.totalMarkets)}
          />
        </Col>
      </Row>
      <div className="home-heading-container">
        <Title level={2} className="home-title">
          The World&apos;s Top 10 Cryptocurrencies
        </Title>
        <Title level={3} className="show-more">
          <Link href="/cryptocurrencies">Show More</Link>
        </Title>
      </div>
      <Cryptocurrencies simplified />
      <div className="home-heading-container">
        <Title level={2} className="home-title">
          Latest Crypto News
        </Title>
        <Title level={3} className="show-more">
          <Link href="/news">Show More</Link>
        </Title>
      </div>
      <News simplified />
    </>
  );
};

export default Home;

// Home.getLayout = (page: ReactElement) => {
//   return <Layout><HomeLayout>{page}</HomeLayout></Layout>
// }
