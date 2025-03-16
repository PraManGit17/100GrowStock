import React from 'react';
import styled, { keyframes } from 'styled-components';
import { useWindowSize } from '../../utils/useWindowSize';

function Orb() {
    const { width, height } = useWindowSize();
    // console.log(width,height);

    const moveOrb = keyframes`
      0%{
        transform: translate(0,0);
      }
      50%{
        transform:translate(${width / 1.2}px,${height / 1.7}px);
      }
      100%{
        transform: translate(0,0);
      }
    `;

    const OrbStyled = styled.div`
        width: 70vh;
        height: 70vh;
        position: absolute;
        border-radius: 50%;
        margin-left: -37vh;
        margin-top: -37vh;
        background: linear-gradient(
            109.6deg,
            rgb(102, 51, 153) 11.2%,
            rgb(69, 179, 224) 100.1%
        );
        filter: blur(400px);
        animation: ${moveOrb} 10s alternate linear infinite;
        z-index: -1;
    `;

    return <OrbStyled></OrbStyled>;
}

export default Orb;
