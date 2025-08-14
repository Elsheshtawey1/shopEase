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
          {loading ? (
            <div className="skeleton-banner" />
          ) : (
            <img src={mainImage} srcSet={`${mainImage}?w=600 600w, ${mainImage}?w=1200 1200w`} sizes="(max-width: 768px) 100vw, 70vw" alt="Main Banner" loading="eager" width="1200" height="675" />
          )}

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
              <img src={img} srcSet={`${img}?w=300 300w, ${img}?w=600 600w`} sizes="(max-width: 768px) 50vw, 30vw" alt={`Side Banner ${i + 1}`} loading="lazy" width="600" height="338" />
            </div>
          ))}
        </div>
      </div>
    </Container>
  );
};

export default BannerSwitcher;
