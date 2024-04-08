"use client"

import React, { useEffect } from 'react';
// import jwt from 'jsonwebtoken';



const Feedback = (currentUser) => {
    const BoardToken = '570a546b-7b2e-90a3-030f-9f04c34f2d7c'; 
    const PrivateKey = '0f0fd0f0-9bec-cbbe-55c0-bdd0ce48a047';

    useEffect(() => {
      (function(w,d,i,s){function l(){if(!d.getElementById(i)){var f=d.getElementsByTagName(s)[0],e=d.createElement(s);e.type="text/javascript",e.async=!0,e.src="https://canny.io/sdk.js",f.parentNode.insertBefore(e,f)}}if("function"!=typeof w.Canny){var c=function(){c.q.push(arguments)};c.q=[],w.Canny=c,"complete"===d.readyState?l():w.attachEvent?w.attachEvent("onload",l):w.addEventListener("load",l,!1)}})(window,document,"canny-jssdk","script");
  
      Canny('render', {
        boardToken: BoardToken,
        basePath: '/settings', 
        ssoToken: createCannyToken(currentUser), 
        theme: 'auto', // options: light [default], dark, auto
      });
    }, []);

    var jwt = require('jsonwebtoken');

    function createCannyToken(user) {
        var userData = {
        //   avatarURL: user.avatarURL, // optional, but preferred
          email: "user_primary@example.com",// user.email,
          id: "43b5a2c6-65a0-4785-97c9-28d9ff89225b", //user.id,
          name: "test user",//user.name,
        };
        return jwt.sign(userData, PrivateKey, {algorithm: 'HS256'});
      }

    return <div data-canny />;
  }
  
  export default Feedback;
