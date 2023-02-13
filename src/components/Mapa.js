import React, { Component } from 'react';
import Navigation from './Navigation';

export default class Mapa extends Component {
    render() {
        return (
            <div className='mapa'>
                <Navigation />
                <p>
                    <iframe
                        src='https://es.batchgeo.com/map/bbb2f203cf6719057017b4d0fc2e7884'
                        frameborder='0'
                        width='100%'
                        height='1050'
                        sandbox='allow-top-navigation allow-scripts allow-popups allow-popups-to-escape-sandbox allow-same-origin allow-modals allow-forms'
                        allow='geolocation https://batchgeo.com'
                        style={{ border: '1px solid #aaa;' }}
                        scrolling='no'>
                    </iframe>
                </p>

            </div>

        )
    }

}