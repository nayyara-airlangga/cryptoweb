import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";

const CryptoDetails = () => {
  const [loaded, setLoaded] = useState(false);
  const router = useRouter();

  useEffect(() => {
    if (router.pathname == "/crypto") router.replace("/cryptocurrencies");
    else setLoaded(true);
  }, [router]);

  if (!loaded) return <div>Loading...</div>; //show nothing or a loader

  return <p>Finished</p>;
};

export default CryptoDetails;
