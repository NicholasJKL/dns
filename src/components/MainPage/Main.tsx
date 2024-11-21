import React, { FC, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { CarouselProvider, Slider, Slide, ButtonBack, ButtonNext } from 'pure-react-carousel';

import MainBrandElement from './MainBrandElement';
import Brand from '../../models/Brand';

import '../../styles/common_styles.css';
import '../../styles/main_styles.css';
import 'pure-react-carousel/dist/react-carousel.es.css';
import { getAllBrands } from '../../requests';


const Main: FC = () => {

    const navigation = useNavigate();

    const handleClick = () => {
        navigation('/catalog');
    }

    const getWindowSize = () => {
        const { innerWidth } = window;
        return innerWidth;
    }

    const [windowWidth, setWindowWidth] = useState<number>(getWindowSize());
    const [showSlides, setShowSlides] = useState<number>(7);
    const [brands, setBrands] = useState<Brand[]>([]);
    const [isLoading, setIsLoading] = useState<boolean>(true);

    useEffect(() => {
        const handleWindowResize = () => {
            setWindowWidth(getWindowSize());
        }

        window.addEventListener('resize', handleWindowResize);

        getAllBrands()
            .then(loadedBrands => setBrands(loadedBrands.data))
            .catch(error => console.error(error));
        setIsLoading(false);

        return () => {
            window.removeEventListener('resize', handleWindowResize);
        };
    }, []);

    useEffect(() => {
        const split = (windowWidth * 0.8 - 106) / 128 - 1;

        if (split > 11) {
            setShowSlides(11);
        }
        else if (split < 1) {
            setShowSlides(2);
        }
        else {
            setShowSlides(split);
        }

    }, [windowWidth]);

    return (
        <div>
            <div className='main-content'>
                <div className='main-title'>
                    <h1>Интернет-магазин цифровой и бытовой техники</h1>
                </div>

                <div className='main-content-grid'>
                    <div className='main-content-text'>
                        <p>Наши партнёры:</p>
                    </div>
                    {isLoading ?
                        <div className='loading'></div>
                        :
                        <div>
                            <div className='main-brand-block'>
                                <CarouselProvider
                                    naturalSlideWidth={120}
                                    naturalSlideHeight={136}
                                    totalSlides={Math.ceil(brands.length / 2)}
                                    isPlaying={true}
                                    interval={1750}
                                    visibleSlides={showSlides}
                                    orientation='horizontal'
                                    infinite={true}>
                                    <div className='carousel-block'>
                                        <ButtonBack className='carousel-button-back'> </ButtonBack>
                                        <div className='carousel-slider'>
                                            <Slider>
                                                {
                                                    brands.map((brand, index) => {
                                                        if (index % 2 === 0) {
                                                            return (
                                                                <Slide key={index} index={index}>
                                                                    <div className='brands-block'>
                                                                        <a href={brand.url} target='_blanc'><MainBrandElement image_path={brand.image_path}></MainBrandElement></a>
                                                                        {brands[index + 1] ? <a href={brands[index + 1].url} target='_blanc'><MainBrandElement image_path={brands[index + 1].image_path}></MainBrandElement></a> : <>    </>}
                                                                    </div>
                                                                </Slide>
                                                            )
                                                        }
                                                        return <></>
                                                    })
                                                }
                                            </Slider>
                                        </div>
                                        <ButtonNext className='carousel-button-next'> </ButtonNext>
                                    </div>
                                </CarouselProvider>
                            </div>
                        </div>
                    }

                </div>
                <div className='main-go-purchasing'>
                    <button onClick={handleClick}>Перейти к каталогу товаров</button>
                </div>
            </div>
        </div>
    );
};


export default Main;