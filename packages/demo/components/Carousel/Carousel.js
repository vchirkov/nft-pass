import RECarousel from 'react-elastic-carousel';

import {Card} from '../Card/Card';
import {h2} from './carousel.module.css';

const breakPoints = [
    {width: 1, itemsToShow: 1, pagination: false},
    {width: 0, itemsToShow: 2, itemsToScroll: 2, pagination: false},
    {width: 0, itemsToShow: 3, pagination: false},
    {width: 0, itemsToShow: 5, pagination: false}
];


export function Carousel({title, items}) {
    return (
        <div>
            {title && (
                <div>
                    <h2 className={h2}>
                        {title}
                    </h2>
                </div>
            )}
            <RECarousel breakPoints={breakPoints}
                        pagination={false}>
                {items?.map(item => (
                    <Card name={item.name}
                          img={item.image}
                          link={item.link}
                          key={item.link}/>
                ))}
            </RECarousel>
        </div>
    );
}
