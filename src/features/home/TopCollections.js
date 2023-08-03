import React from "react";

const CollectionItem = ({ rank }) => {
  return (
    <div className="w-full p-2 flex items-center justify-between px-6 mb-3">
      <div className="flex items-center">
        <p className="font-bold">{rank}</p>
        <img
          alt="..."
          src={require("assets/img/collection.jpeg").default}
          className="shadow-lg rounded-full ml-3"
          style={{ width: 60 }}
        />
        <div className="ml-2">
          <p className="font-bold text-lg">Crypto_Dinousaur</p>
          <p className="text-blueGray-500">194.51</p>
        </div>
      </div>
      <p className="text-red-500">-40.50%</p>
    </div>
  );
};
const TopCollections = () => {
  return (
    <div className="w-full mt-16">
      <p className="text-4xl text-center font-bold">
        Top collections over last 7 days
      </p>
      <div className="flex mt-12">
        <CollectionItem rank={1} />
        <CollectionItem rank={4} />
        <CollectionItem rank={7} />
      </div>
      <div className="flex">
        <CollectionItem rank={2} />
        <CollectionItem rank={5} />
        <CollectionItem rank={8} />
      </div>
      <div className="flex">
        <CollectionItem rank={3} />
        <CollectionItem rank={6} />
        <CollectionItem rank={9} />
      </div>
    </div>
  );
};

export default TopCollections;
