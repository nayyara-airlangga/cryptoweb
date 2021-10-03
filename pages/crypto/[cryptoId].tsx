import React, { useState } from "react";
import { useRouter } from "next/router";
import HTMLReactParser from "html-react-parser";
import millify from "millify";
import { Col, Row, Typography, Select } from "antd";
import {
  MoneyCollectOutlined,
  DollarCircleOutlined,
  FundOutlined,
  ExclamationCircleOutlined,
  StopOutlined,
  TrophyOutlined,
  CheckOutlined,
  NumberOutlined,
  ThunderboltOutlined,
} from "@ant-design/icons";

import {
  useGetCryptoDetailsQuery,
  useGetCryptoHistoryQuery,
} from "../../services/cryptoApi";
import { LineGraph } from "../../components";
import CryptoInfo from "../../ts/interfaces/CryptoInfo";
import GraphData, { CoinHistory } from "../../ts/interfaces/GraphData";

const { Title, Text } = Typography;
const { Option } = Select;

const CryptoDetails = () => {
  const router = useRouter();
  const coinId = router.query.cryptoId;
  const [timePeriod, setTimePeriod] = useState("7d");
  const { data } = useGetCryptoDetailsQuery(coinId);
  const { data: coinData } = useGetCryptoHistoryQuery({
    coinId,
    timePeriod,
  });
  const coinInfo: CryptoInfo = data?.data?.coin;
  const coinHistory: CoinHistory | undefined = coinData?.data;

  const times = ["3h", "24h", "7d", "30d", "1y", "3m", "3y", "5y"];

  if (!coinInfo) return <p>Loading...</p>;

  const stats = [
    {
      title: "Price to USD",
      value: `$ ${coinInfo.price && millify(Number(coinInfo.price))}`,
      icon: <DollarCircleOutlined />,
    },
    { title: "Rank", value: coinInfo.rank, icon: <NumberOutlined /> },
    {
      title: "24h Volume",
      value: `$ ${coinInfo.volume && millify(coinInfo.volume)}`,
      icon: <ThunderboltOutlined />,
    },
    {
      title: "Market Cap",
      value: `$ ${coinInfo.marketCap && millify(coinInfo.marketCap)}`,
      icon: <DollarCircleOutlined />,
    },
    {
      title: "All Time High (Daily Avg.)",
      value: `$ ${millify(Number(coinInfo.allTimeHigh.price))}`,
      icon: <TrophyOutlined />,
    },
  ];

  const genericStats = [
    {
      title: "Number Of Markets",
      value: coinInfo.numberOfMarkets,
      icon: <FundOutlined />,
    },
    {
      title: "Number Of Exchanges",
      value: coinInfo.numberOfExchanges,
      icon: <MoneyCollectOutlined />,
    },
    {
      title: "Aprroved Supply",
      value: coinInfo.approvedSupply ? <CheckOutlined /> : <StopOutlined />,
      icon: <ExclamationCircleOutlined />,
    },
    {
      title: "Total Supply",
      value: `$ ${millify(coinInfo.totalSupply)}`,
      icon: <ExclamationCircleOutlined />,
    },
    {
      title: "Circulating Supply",
      value: `$ ${millify(coinInfo.circulatingSupply)}`,
      icon: <ExclamationCircleOutlined />,
    },
  ];

  return (
    <Col className="coin-detail-container">
      <Col className="coin-heading-container">
        <Title level={2} className="coin-name">
          <img src={coinInfo.iconUrl} alt="coin-icon" width={40} height={40} />{" "}
          {coinInfo.name} ({coinInfo.slug})
        </Title>
      </Col>
      <Select
        defaultValue="7d"
        className="select-timeperiod"
        placeholder="Select Time Period"
        onChange={(value) => setTimePeriod(value)}
      >
        {times.map((timeOption) => (
          <Option key={timeOption} value={timeOption}>
            {timeOption}
          </Option>
        ))}
      </Select>
      <p></p>
      <br />
      <LineGraph
        coinHistory={coinHistory}
        currentPrice={millify(Number(coinInfo.price))}
        coinName={coinInfo.name}
      />
      <p></p>
      <br />
      <Col className="stats-container">
        <Col className="coin-value-statistics">
          <Col className="coin-value-statistics-heading">
            <Title level={3} className="coin-details-heading">
              Value Statistics
            </Title>
          </Col>
          {stats.map(({ icon, title, value }) => (
            <Col key={title} className="coin-stats">
              <Col className="coin-stats-name">
                <Text>{icon}</Text>
                <Text>{title}</Text>
              </Col>
              <Text className="stats">{value}</Text>
            </Col>
          ))}
        </Col>
        <Col className="other-stats-info">
          <Col className="coin-value-statistics-heading">
            <Title level={3} className="coin-details-heading">
              Other Statistics
            </Title>
          </Col>
          {genericStats.map(({ icon, title, value }) => (
            <Col key={title} className="coin-stats">
              <Col className="coin-stats-name">
                <Text>{icon}</Text>
                <Text>{title}</Text>
              </Col>
              <Text className="stats">{value}</Text>
            </Col>
          ))}
        </Col>
      </Col>
      <Col className="coin-desc-link">
        <Row className="coin-desc">
          <Title level={3} className="coin-details-heading">
            What is {coinInfo.name}?<p></p>
            {HTMLReactParser(coinInfo.description)}
          </Title>
        </Row>
        <Col className="coin-links">
          <Title level={3} className="coin-details-heading">
            Links about {coinInfo.name}
          </Title>
          {coinInfo.links.map((link) => (
            <Row className="coin-link" key={link.name}>
              <Title level={5} className="link-name">
                {link.type}
              </Title>
              <a href={link.url} target="_blank" rel="noreferrer">
                {link.name}
              </a>
            </Row>
          ))}
        </Col>
      </Col>
    </Col>
  );
};

export default CryptoDetails;
