import React, { useEffect, useState } from "react";
import axios from "axios";
import Slider from "react-slick";
export default function CategoureSlider() {
  const [Categores, setCategores] = useState([]);

  async function getCategores() {
    try {
      let { data } = await axios.get("https://ecommerce.routemisr.com/api/v1/categories");
      setCategores(data.data);
    } catch (error) {
      console.error("Error fetching categories:", error);
    }
  }

  useEffect(() => {
    getCategores();
  }, []);

  var settings = {
    dots: false,
    infinite: true,
    speed: 1,
    slidesToShow: 6,
    slidesToScroll: 3,
    arrows: true,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 4,
          slidesToScroll: 3,
        }
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
          initialSlide: 2
        }
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1
        }
      }
    ]
  };

  return (
    <>
        <Slider className="py-5" {...settings}>
          {Categores.map((element, index) => (
            <div key={index}>
              <img src={element.image} alt={element.name} className="w-full h-60 object-cover rounded-lg" />
              <h5>{Categores[index].name}</h5>
            </div>
          ))}
        </Slider>
    </>
  );
}
