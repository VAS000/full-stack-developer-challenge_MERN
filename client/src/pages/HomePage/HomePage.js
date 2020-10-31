import React from 'react';

const HomePage = () => (
  <div>
    <h1>Notes: </h1>
    <ul>
      <li>Since we have 2 links only in the navbar, it's not fully response, bruger menu to add if links > 2</li>
      <li>Server is hosted on Heroku and is NOT HOT/Active always, so calling the api for first time will take some time</li>
      <li>Refreshing on frontend routes won't work since there is no server attached to this Netlify app</li>
    </ul>
  </div>
);

export default HomePage;
