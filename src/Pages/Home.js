import React from "react";
import Welcome from "../Components/Welcome";
import { Header } from "../Components/header";
import Footer from "../Components/Footer";
function Home() {
  return (
    <div>
      <div className="gradient-bg-welcome">
        <Header />
        <Welcome></Welcome>
      </div>
      {/* <Footer/>  */}
    </div>
  );
}

export default Home;
