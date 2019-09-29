import React from 'react';

const Loader = () => (
      <div>
          <div className="loaderbg">
            <img className="loader" src={process.env.PUBLIC_URL + '/loader.gif'} alt="loader"/>
         </div>
      </div>
    );

export default Loader;