import React, {useEffect, useState} from 'react';
import styles from './carousel.module.css';
import _throttle from 'lodash/throttle';
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faCircle} from "@fortawesome/free-regular-svg-icons";
import {faAngleLeft, faAngleRight, faCircle as faCircleSolid, faPause, faPlay} from "@fortawesome/free-solid-svg-icons"
import {clear} from "@testing-library/user-event/dist/clear";

const imgs = [
  "https://mobilecontent.costco.com/live/resource/img/ca-categories/d-grocery-hero-240101-en.jpg",
  "https://mobilecontent.costco.com/live/resource/img/ca-categories/d-grocery-hero-240122-en.jpg",
  "https://mobilecontent.costco.com/live/resource/img/static-ca-landing-pages/d-hero-220905-gourmet-en.jpg",
  "https://mobilecontent.costco.com/live/resource/img/static-ca-landing-pages/d-hero-230529-SameDelivery-en.jpg",
  "https://mobilecontent.costco.com/live/resource/img/static-ca-landing-pages/d-hero-230712-CostcoGrocery-en.jpg",
];

const description = [
  "Promote",
  "Week Sale",
  "Gourment Products",
  "Delivery",
  "CostcoGrocery",
];

const Carousel = () => {
  const [index, setIndex] = useState(0);
  const [timerID, setTimerID] = useState(undefined);
  const [isStart, setIsStart] = useState(true);

  const handleSelected = index => setIndex(index);

  const handleNext = () => {
    setIndex(prev => {
      if (prev+1 === imgs.length)
        return 0;
      return prev+1;
    })
  }

  const throttledNext = _throttle(handleNext, 2000);

  const handlePrev = () => {
    const nextInd = index-1;
    console.log('clicked--->>', nextInd);
    if (nextInd < 0) setIndex(imgs.length-1);
    else setIndex(nextInd);
  }

  const throttledPrev = _throttle(handlePrev, 2000)

  const handleAnimation = () => {
    setIsStart(prev => !prev);
  }

  const startAnimation = () => {
    const id = setInterval(handleNext, 2000);
    setTimerID(id);
  }

  useEffect(() => {
    if (isStart) {
      startAnimation();
    } else {
      clearInterval(timerID);
    }

    return () => {
      if (timerID) clearInterval(timerID);
    }
  }, [isStart])

  useEffect(() => {
    return () => {
      if (timerID) clearInterval(timerID);
    }
  }, [])

  return (
    <section className={styles.carousel} onMouseEnter={() => setIsStart(false)} onMouseLeave={() => setIsStart(true)}>
      <img src={imgs[index]} alt={description[index]} width='100%' height='auto'/>
      <div className={styles.btnBar}>
        {
          imgs.map((img, i) =>
              <div key={i} className={styles.btnDot} onClick={() => handleSelected(i)}>
                {
                  i === index ?
                    <FontAwesomeIcon icon={faCircleSolid}/> :
                    <FontAwesomeIcon icon={faCircle} />
                }

              </div>
          )
        }
        <div className={styles.btnControl} onClick={handleAnimation}>
          {isStart ? <FontAwesomeIcon icon={faPause}/> : <FontAwesomeIcon icon={faPlay}/>}
        </div>
      </div>

      <div className={styles.pageBar}>
        <button className={styles.btnPage} onClick={throttledPrev}>
          <FontAwesomeIcon icon={faAngleLeft} />
        </button>
        <button className={styles.btnPage} onClick={throttledNext}>
          <FontAwesomeIcon icon={faAngleRight} />
        </button>
      </div>
    </section>
  );
};

export default Carousel;
