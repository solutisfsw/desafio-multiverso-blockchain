import React from 'react';
import { SideNav, SideNavItem, Button } from 'react-materialize';

import perfil from '../img/mateus.png';
import parallax from '../img/parallax1.png';

export default class Side extends React.Component {


    render() {


        return(
            <SideNav
                    trigger={<Button>Viajante</Button>}
                    options={{ closeOnClick: true }}
                    >
                    <SideNavItem userView
                        user={{
                        background: parallax,
                        image: perfil,
                        name: 'Mateus Vinicius',
                        email: 'mateussvinicius22@gmail.com'
                        }}
                    />
                    <SideNavItem  icon='face'>DeV</SideNavItem>
                    <SideNavItem>Idade: 25</SideNavItem>
                    <SideNavItem>Lvl: +8000</SideNavItem>
                    <SideNavItem>Formando em Sistema de informação</SideNavItem>
                    <SideNavItem href='https://www.linkedin.com/in/mateus-vinicius-945295121/'>Linkedin</SideNavItem>
                    <SideNavItem divider /> 
                    <SideNavItem waves href='https://github.com/Mats23'>GitHub</SideNavItem>
            </SideNav>
        );
    }
}