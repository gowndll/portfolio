"use client";

import { Fragment } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { Navigation } from "swiper/modules";

const skillsData = [
  {
    name: "HTML5",
    icon: "ri-html5-fill",
    extraClass: "html",
  },
  {
    name: "CSS3",
    icon: "ri-css3-fill",
    extraClass: "css",
  },
  {
    name: "Javascript",
    icon: "ri-javascript-fill",
    extraClass: "js",
  },
  {
    name: "React",
    icon: "ri-reactjs-line",
    extraClass: "react",
  },
  {
    name: "Vue",
    icon: "ri-vuejs-line",
    extraClass: "vue",
  },
];

const Skills = () => {
  return (
    <Fragment>
      <Swiper
        slidesPerView={4.5}
        spaceBetween={4}
        navigation={true}
        breakpoints={{
          440: {
            slidesPerView: 6,
            spaceBetween: 20,
          },
          975: {
            slidesPerView: 10,
            spaceBetween: 20,
          },
        }}
        modules={[Navigation]}
        className="skillSwiper"
      >
        {skillsData.map((skill, idx) => {
          return (
            <SwiperSlide key={idx}>
              <div className="thumb">
                <div className="icon_wrap">
                  <i className={`${skill.icon} ${skill.extraClass}`}></i>
                </div>
              </div>
              <p className="name">{`${skill.name}`}</p>
            </SwiperSlide>
          );
        })}
      </Swiper>
    </Fragment>
  );
};

export default Skills;
