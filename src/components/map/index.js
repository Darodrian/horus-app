import React, { Component } from "react";

export default class Mapa extends Component {
  render() {
    return (
      <div className="mapa">
        <p>
          <iframe
            src="https://es.batchgeo.com/map/1960215780061ca82a3bc41415371e85"
            frameborder="0"
            width="100%"
            height="1050"
            sandbox="allow-top-navigation allow-scripts allow-popups allow-popups-to-escape-sandbox allow-same-origin allow-modals allow-forms"
            allow="geolocation https://batchgeo.com"
            style={{ border: "1px solid #aaa;" }}
            scrolling="no"
          ></iframe>
        </p>
      </div>
    );
  }
}
