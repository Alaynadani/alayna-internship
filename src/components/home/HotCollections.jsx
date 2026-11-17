import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom"
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "./HotCollections.css";

const HotCollections = () => {
  const [collections, setCollections] = useState([]);
  const [loading, setLoading] = useState(true);

  const settings = {
    slidesToShow: 4,
    slidesToScroll: 1,
    infinite: true,
    responsive: [{ breakpoint: 1200, settings: { slidesToShow: 3 } }],
  };

  const renderSkeletonCards = () =>
    Array.from({ length: 4 }).map((_, index) => (
      <div className="px-2" key={index}>
        <div className="nft_coll">
          <div className="skeleton skeleton-img"></div>
          <div className="skeleton skeleton-avatar"></div>
          <div className="skeleton skeleton-line"></div>
          <div className="skeleton skeleton-line short"></div>
        </div>
      </div>
    ));

useEffect(() => {
  axios
    .get("https://us-central1-nft-cloud-functions.cloudfunctions.net/hotCollections")
    .then((response) => {
      setCollections(response.data);
    })
    .catch((error) => {
      console.error(error);
    })
    .finally(() => {
      setLoading(false);                        
    });
}, []);

  return (
    <section id="section-collections" className="no-bottom">
      <div className="container">
        <div className="row">
          <div className="col-lg-12">
            <div className="text-center">
              <h2>Hot Collections</h2>
              <div className="small-border bg-color-2"></div>
            </div>
          </div>
          <div className="col-lg-12">
            <Slider {...settings}>
              {loading
                ? renderSkeletonCards()
                : collections.map((item) => (
                    <div className="px-2" key={item.id}>
                      <div className="nft_coll">
                        <div>
                          <Link to="/item-details">
                            <img src={item.nftImage} className="lazy img-fluid" alt="" />
                          </Link>
                        </div>
                        <div className="nft_coll_pp">
                          <Link to="/author">
                            <img className="lazy pp-coll" src={item.authorImage} alt="" />
                          </Link>
                          <i className="fa fa-check"></i>
                        </div>
                        <div className="nft_coll_info">
                          <Link to="/explore">
                            <h4>{item.title}</h4>
                          </Link>
                          <span>ERC-{item.code}</span>
                        </div>
                      </div>
                    </div>
                  ))}
            </Slider>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HotCollections;
