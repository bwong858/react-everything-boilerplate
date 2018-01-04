import React from 'react';

import smiley from '../../assets/smiley.jpeg';

const App = () => (
  <div>
    <h2>Hi, I'm App. Envy my beautiful #eee background.</h2>
    <div className="image-container">
      <img src={smiley} alt="smiley" />
    </div>
  </div>
);

export default App;
