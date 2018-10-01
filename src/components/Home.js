import React from "react";
import "../App.css";
import { Image } from "semantic-ui-react";

const Home = () => {
  return (
    <div>
      <Image
        fluid
        src={
          "https://images.pexels.com/photos/616484/pexels-photo-616484.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940"
        }
      />
    </div>
  );
};

export default Home;
