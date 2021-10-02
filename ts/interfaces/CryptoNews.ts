interface CryptoNews {
  description: string;
  url: string;
  name: string;
  image: { thumbnail: { contentUrl: string } };
  provider: CryptoNewsProvider[];
  datePublished: string;
}

interface CryptoNewsProvider {
  name: string;
  image: { thumbnail: { contentUrl: string } };
}

export default CryptoNews;
