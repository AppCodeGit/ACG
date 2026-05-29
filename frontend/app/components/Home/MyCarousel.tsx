"use client";

import Carousel from 'react-bootstrap/Carousel';
import Image from 'next/image';
import './MyCarousel.css'; // Import CSS file for the carousel styles
import image1 from "./image/beal.png";
import image2 from "./image/orangenew.png";
import image3 from "./image/IMG_0418.jpg";
import image4 from "./image/solace.png";
import image5 from "./image/cloud.png";

function MyCarousel() {
  return (
    <Carousel slide={false}>
      {/* == Image 1 == */}
      <Carousel.Item>
        <Image
          src={image1}
          alt="First slide"
          className='carousel-image'
          width={800}
          height={400}
          priority={true} // Loads first image immediately
          style={{
            width: '100%',
            height: 'auto',
          }}
        />
      </Carousel.Item>

      {/* == Image 2 == */}
      <Carousel.Item>
        <Image
          src={image2}
          alt="Second slide"
          className='carousel-image'
          width={800}
          height={400}
          style={{
            width: '100%',
            height: 'auto',
          }}
        />
      </Carousel.Item>

      {/* == Image 3 == */}
      <Carousel.Item>
        <Image
          src={image3}
          alt="Third slide"
          className='carousel-image'
          width={800}
          height={400}
          style={{
            width: '100%',
            height: 'auto',
          }}
        />
      </Carousel.Item>

      {/* == Image 4 == */}
      <Carousel.Item>
        <Image
          src={image4}
          alt="Fourth slide"
          className='carousel-image'
          width={800}
          height={400}
          style={{
            width: '100%',
            height: 'auto',
          }}
        />
      </Carousel.Item>

      {/* == Image 5 == */}
      <Carousel.Item>
        <Image
          src={image5}
          alt="Fifth slide"
          className='carousel-image'
          width={800}
          height={400}
          style={{
            width: '100%',
            height: 'auto',
          }}
        />
      </Carousel.Item>
    </Carousel>
  );
}

export default MyCarousel;