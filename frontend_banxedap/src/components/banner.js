import React from "react";
import { Button } from "primereact/button";
import { Carousel} from "primereact/carousel";
import '../styles/banner.css';

export default function Banner() {
    const banner = [
        {
            title: 'Xe đạp mới nhất 2025',
            description: 'Khám phá bộ sưu tập xe đạp mới nhất của chúng tôi với công nghệ tiên tiến và thiết kế hiện đại.',
            image: 'images/banner1.png',
        },
        {
            title: 'Xe đạp thể thao',
            description: 'Tham gia vào cuộc đua với những chiếc xe đạp thể thao chất lượng cao của chúng tôi.',
            image: 'images/banner2.png',
        },
        {
            title: 'Xe gấp tiện lợi',
            description: 'Xe gấp tiện lợi cho cuộc sống đô thị.',
            image: 'images/banner3.jpg',
        }
    ]

    const bannerTemplate = (item) => {
        return (
            <div className="banner-slide"
                style={{ backgroundImage: `url(${item.image})` }}>
                <div className="banner-voerlay">
                    <h2>{item.title}</h2>
                    <p>{item.description}</p>
                    <Button label="Khám phá ngay" className="p-button-primary" />
                </div>
            </div>
        )
    }

    return (
        <div className="banner-container">
            <Carousel value={banner} numVisible={1} numScroll={1} autoplayInterval={4000} autoplayTransitionDelay={2000} circular={true} autoplay={true} itemTemplate={bannerTemplate} />
        </div>
    )
}