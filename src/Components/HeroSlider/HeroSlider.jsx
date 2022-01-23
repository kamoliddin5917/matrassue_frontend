import { useEffect, useState } from "react";
import "./HeroSlider.scss";

const HeroSlider = () => {
  const hSlider = [
    { url: "https://telegra.ph/file/400fbbd8e46e86dfd951f.png" },
    {
      url: "https://st.hzcdn.com/simgs/pictures/spalyni/mebely-dlya-kvartiry-v-morskom-stile-mebelynaya-fabrika-viat-img~0251f5950c8fa5ab_14-8074-1-d780164.jpg",
    },
    {
      url: "https://style-comfort.com.ua/upload/images/article/64/article16292883274110063f7fd16d44f19ea4c2d51438b0.jpg",
    },
    {
      url: "https://idei.club/uploads/posts/2021-08/1629955344_23-idei-club-p-stenovie-paneli-v-interere-spalni-interer-23.jpg",
    },
  ];
  const [heroSlider, setHeroSlider] = useState(hSlider);
  const [index, setIndex] = useState(0);
  useEffect(() => {
    const lastIndex = heroSlider.length - 1;

    if (index < 0) {
      setIndex(lastIndex);
    }
    if (index > lastIndex) {
      setIndex(0);
    }
  }, [index, heroSlider]);
  useEffect(() => {
    let slider = setInterval(() => {
      setIndex(index + 1);
    }, 3000);
    return () => clearInterval(slider);
  });
  return (
    <div className="hero-slider-wrapper">
      {heroSlider.map((el, i) => {
        let position = "nextSlide";
        if (i === index) {
          position = "activeSlide";
        }
        if (i === index - 1 || (index === 0 && i === heroSlider.length - 1)) {
          position = "lastSlide";
        }
        return (
          <article className={position} key={i}>
            <img src={el.url} className="hero-slider__img" alt="img" />
          </article>
        );
      })}
    </div>
  );
};
export default HeroSlider;
