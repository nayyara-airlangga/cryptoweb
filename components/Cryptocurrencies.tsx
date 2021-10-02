import React, { useState, Dispatch } from "react";
import millify from "millify";
import Link from "next/link";
import { Card, Row, Col, Input } from "antd";

import { useGetCryptosQuery } from "../services/cryptoApi";
import Coin from "../ts/interfaces/Coin";

const Cryptocurrencies = ({ simplified }: { simplified: boolean }) => {
  const count = simplified ? 10 : 100;

  const { data: cryptosList, isFetching } = useGetCryptosQuery(count);
  const [cryptos, setCryptos]: [Coin[], Dispatch<Coin>] = useState(
    cryptosList?.data?.coins
  );

  if (isFetching) return <p>Loading...</p>;

  return (
    <>
      <Row gutter={[32, 32]} className="crypto-card-container">
        {cryptos?.map((coin) => (
          <Col key={coin.id} xs={24} sm={12} lg={6} className="crypto-card">
            <Link passHref={true} href={`/crypto/${coin.id}`}>
              <Card
                title={`${coin.rank}. ${coin.name}`}
                extra={<img className="crypto-image" src={coin.iconUrl} />}
                hoverable
              >
                <p>Price: {millify(Number(coin.price))} USD</p>
                <p>Market Cap: {millify(Number(coin.marketCap))} USD</p>
                <p>Daily Change: {millify(Number(coin.change))}% USD</p>
              </Card>
            </Link>
          </Col>
        ))}
      </Row>
    </>
  );
};

export default Cryptocurrencies;
