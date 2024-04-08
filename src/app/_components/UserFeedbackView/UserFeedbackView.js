"use client"

import React, { useEffect } from 'react';

const Feedback = ({ userEmail, userId, userFirstName }) => {
    const BoardToken = '570a546b-7b2e-90a3-030f-9f04c34f2d7c'; 
    const PrivateKey = process.env.NEXT_PUBLIC_CANNY_PRIVATE_KEY;

    useEffect(() => {
      (function(w,d,i,s){function l(){if(!d.getElementById(i)){var f=d.getElementsByTagName(s)[0],e=d.createElement(s);e.type="text/javascript",e.async=!0,e.src="https://canny.io/sdk.js",f.parentNode.insertBefore(e,f)}}if("function"!=typeof w.Canny){var c=function(){c.q.push(arguments)};c.q=[],w.Canny=c,"complete"===d.readyState?l():w.attachEvent?w.attachEvent("onload",l):w.addEventListener("load",l,!1)}})(window,document,"canny-jssdk","script");

      Canny('render', {
        boardToken: BoardToken,
        basePath: '/app/settings', 
        ssoToken: createCannyToken(userEmail, userId, userFirstName), 
        theme: 'auto', // options: light [default], dark, auto
      });
    }, []);

    var jwt = require('jsonwebtoken');

    function createCannyToken(userEmail, userId, userFirstName ) {
      var userData = {
        // TODO: add URL to profile image
        // avatarURL: user.avatarURL, // optional, but preferred
        email: userEmail,
        id: userId, 
        name: userFirstName,
      };
    
      return jwt.sign(userData, PrivateKey, { algorithm: 'HS256' });
    }
    

    return <div data-canny />;
  }
  
  export default Feedback;
  