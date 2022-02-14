import React from 'react';

import {Carousel} from '../Carousel/Carousel';
import data from './data';


export function Popular({}) {
    return <Carousel items={data} title="Popular on Demoflix"/>;
}
