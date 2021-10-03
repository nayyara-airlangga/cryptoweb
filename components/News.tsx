import React, { useState } from "react";
import { Select, Typography, Row, Col, Avatar, Card } from "antd";
import moment from "moment";

import { useGetCryptosQuery } from "../services/cryptoApi";
import { useGetCryptoNewsQuery } from "../services/cryptoNewsApi";
import CryptoNews from "../ts/interfaces/CryptoNews";
import Coin from "../ts/interfaces/Coin";

const { Title, Text } = Typography;
const { Option } = Select;

const demoImage =
  "http://coinrevolution.com/wp-content/uploads/2020/06/cryptonews.jpg";

const News = ({ simplified }: { simplified: boolean }) => {
  const [newsCategory, setNewsCategory] = useState("Cryptocurrency");
  const { data: cryptoNews } = useGetCryptoNewsQuery({
    newsCategory,
    count: simplified ? 9 : 27,
  });
  const { data } = useGetCryptosQuery(100);

  const cryptocurrencies: Coin[] = data?.data?.coins;
  const cryptoNewsList: CryptoNews[] = cryptoNews?.value;

  if (!cryptoNewsList || !cryptocurrencies) return <p>Loading...</p>;

  return (
    <Row gutter={[24, 24]}>
      {!simplified && (
        <Col span={24}>
          <Select
            showSearch
            className="select-news"
            placeholder="Select a category"
            optionFilterProp="children"
            onChange={(value) => setNewsCategory(value as string)}
            filterOption={(input, option) =>
              option?.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
            }
          >
            <Option value="Cryptocurrency">Cryptocurrency</Option>
            {cryptocurrencies.map((coin) => (
              <Option key={coin.id} value={coin.name}>
                {coin.name}
              </Option>
            ))}
          </Select>
        </Col>
      )}
      {cryptoNewsList.map((news, index: number) => (
        <Col key={index} xs={24} sm={12} lg={8}>
          <Card hoverable className="news-card">
            <a href={news.url} target="_blank" rel="noreferrer">
              <div className="news-image-container">
                <Title className="news-title" level={4}>
                  {news.name}
                </Title>
                <img
                  style={{
                    margin: "10px 0px 10px 15px",
                    maxHeight: "150px",
                    maxWidth: "150px",
                  }}
                  src={news?.image?.thumbnail?.contentUrl || demoImage}
                  alt="news-image"
                />
              </div>
              <br />
              <p>
                {news.description.length > 300
                  ? `${news.description.substring(0, 300)}...`
                  : news.description}
              </p>
              <br />
              <div className="provider-container">
                <div>
                  <Avatar
                    src={
                      news.provider[0]?.image?.thumbnail?.contentUrl ||
                      demoImage
                    }
                    alt="news-provider"
                  />
                  <Text className="provider-name">
                    {news.provider[0]?.name}
                  </Text>
                </div>
                <Text>{moment(news.datePublished).startOf("s").fromNow()}</Text>
              </div>
            </a>
          </Card>
        </Col>
      ))}
    </Row>
  );
};

export default News;
