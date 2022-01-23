import { useEffect, useState } from "react";
import "./HeroSliderController.scss";

const HeroSliderController = () => {
  const hSlider = [
    { url: "https://telegra.ph/file/400fbbd8e46e86dfd951f.png" },
    { url: "https://telegra.ph/file/086662990c16a25c4e7b2.png" },
    { url: "https://telegra.ph/file/a86da1dfbb9a7508a19c3.png" },
    { url: "https://telegra.ph/file/335d83e0f5ed677f7190c.png" },
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
    <>
      {heroSlider.length && (
        <ul className="line">
          {heroSlider.map((e, i) => {
            let dotPosition = "nextDot";
            if (i === index) {
              dotPosition = "activeDot";
            }
            if (
              i === index - 1 ||
              (index === 0 && i === heroSlider.length - 1)
            ) {
              dotPosition = "lastDot";
            }

            return (
              <li
                dataset-id={i}
                className={dotPosition}
                style={{ width: 250 / heroSlider.length }}
                key={i}
              ></li>
            );
          })}
        </ul>
      )}
    </>
  );
};
export default HeroSliderController;
