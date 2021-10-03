import React from "react";
import { Line } from "react-chartjs-2";
import { Col, Row, Typography } from "antd";

const { Title } = Typography;

import GraphData from "../ts/interfaces/GraphData";

const LineGraph = ({ coinHistory, currentPrice, coinName }: GraphData) => {
  const coinPrices = [];
  const coinTimestamps = [];

  for (let index in coinHistory?.history) {
    coinPrices.push(coinHistory?.history[Number(index)].price);
    coinTimestamps.push(
      new Date(
        coinHistory?.history[Number(index)].timestamp as number
      ).toLocaleDateString()
    );
  }

  const data = {
    labels: coinTimestamps,
    datasets: [
      {
        label: "Price in USD",
        data: coinPrices,
        fill: false,
        backgroundColor: "#0071bd",
        borderColor: "#0071bd",
      },
    ],
  };

  const options = {
    scales: {
      yAxis: [
        {
          ticks: {
            beginAtZzero: true,
          },
        },
      ],
    },
  };

  return (
    <>
      <Row className="chart-header">
        <Title level={2} className="chart-title">
          {coinName} Price Chart
        </Title>
        <Col className="price-container">
          <Title level={5} className="price-change">
            Change in Price: {coinHistory?.change}%
          </Title>
          <Title level={5} className="current-price">
            Current {coinName} Price: ${currentPrice}
          </Title>
        </Col>
      </Row>

      {/* Pardon my lazy typing */}
      <Line data={data as any} options={options as any}></Line>
    </>
  );
};

export default LineGraph;
