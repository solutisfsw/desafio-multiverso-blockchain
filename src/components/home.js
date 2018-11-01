import React from 'react';

import img1 from '../img/parallax1.png';
import img2 from '../img/parallax2.png';
import { Parallax } from 'react-materialize';
import Content from './content';

export default class Home extends React.Component {





   
    render () {
            
            return(
                <div>
             
                    <Parallax imageSrc={img1} />
                        <Content />
                    <Parallax imageSrc={img2} />
    
                </div>
                
            );
        
        
    }

}