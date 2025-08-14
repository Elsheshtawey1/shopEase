import React, { useEffect, useState } from "react";
import { FiChevronLeft, FiChevronRight } from "react-icons/fi";
import "../style/Banner.css";
import Container from "./Container";

const BannerSwitcher = () => {
  const [mainImage, setMainImage] = useState("/img/second_slider.b9288b4081970efae138.webp");
  const [sideImages, setSideImages] = useState(["/img/baner.webp", "/img/third_slide.c362b5de2e9c9591c741.webp"]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const img = new Image();
    img.src = mainImage;
    img.onload = () => setLoading(false);
  }, [mainImage]);

  const handleSwap = (index) => {
    const newMain = sideImages[index];
    const newSides = [...sideImages];
    newSides[index] = mainImage;
    setMainImage(newMain);
    setSideImages(newSides);
    setLoading(true); 
  };

  const handleNext = () => {
    const newMain = sideImages[0];
    const newSides = [...sideImages.slice(1), mainImage];
    setMainImage(newMain);
    setSideImages(newSides);
    setLoading(true); 
  };

  const handlePrev = () => {
    const newMain = sideImages[sideImages.length - 1];
    const newSides = [mainImage, ...sideImages.slice(0, -1)];
    setMainImage(newMain);
    setSideImages(newSides);
    setLoading(true); 
  };

  useEffect(() => {
    const interval = setInterval(() => {
      const newMain = sideImages[0];
      const newSides = [...sideImages.slice(1), mainImage];
      setMainImage(newMain);
      setSideImages(newSides);
    }, 5000); 

    return () => clearInterval(interval);
  }, [sideImages, mainImage]);
  
  return (
    <Container>
      <div className="banner-section">
        <div className="main-banner">
          {loading ? <div className="skeleton-banner" /> : <img src={mainImage} alt="Main" loading="eager"  />}

          <button className="arrow left" onClick={handlePrev}>
            <FiChevronLeft />
          </button>
          <button className="arrow right" onClick={handleNext}>
            <FiChevronRight />
          </button>
        </div>

        <div className="side-banners">
          {sideImages.map((img, i) => (
            <div key={i} className="side-image" onClick={() => handleSwap(i)}>
              <img src={img} alt={`Side ${i + 1}`} />
            </div>
          ))}
        </div>
      </div>
    </Container>
  );
};

export default BannerSwitcher;
