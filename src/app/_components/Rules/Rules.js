"use client"
import React, { useState } from "react";
import Animations from "./Animations.js";
import "./Rules.css";
import "./chore.svg";
import "./graph.svg";

const Rules = (props) => {
  /* STATES */
  const [selectedBulletIndex, setSelectedBulletIndex] = useState(0);
  const [paragraph1, setParagraph1] = useState('');
  const [paragraph2, setParagraph2] = useState('');
  const [paragraph3, setParagraph3] = useState('');
  const [submittedParagraphs, setSubmittedParagraphs] = useState({});


  /* REUSABLE MINOR COMPONENTS */
  const RulesHeading = (props) => {
    return (
      <div className="Rules-heading">
        <div className="Rules-main-heading">
          <div className="heading-bullet"></div>
          <span>{props.heading ? props.heading : ""}</span>
          <div className="heading-date">
            {props.fromDate && props.toDate ? `${props.fromDate} - ${props.toDate}` : ""}
            {props.demoLink ? 
              <span style={{ marginLeft: '10px' }}>
                {React.cloneElement(props.demoLink, { style: { color: 'white' } })}
              </span> 
              : null}
          </div>
        </div>
        <div className="Rules-sub-heading">
          <span>{props.subHeading ? props.subHeading : ""}</span>
        </div>
        <div className="Rules-heading-description">
          <span>{props.description ? props.description : ""}</span>
        </div>
      </div>
    );
  };

  const handleParagraphChange = (e, index) => {
    const { value } = e.target;
    switch (index) {
      case 1:
        setParagraph1(value);
        break;
      case 2:
        setParagraph2(value);
        break;
      case 3:
        setParagraph3(value);
        break;
      default:
        break;
    }
  };

  const handleSubmit = () => {
    // Handle submission logic here
    console.log("Payment Instructions:", paragraph1);
    console.log("Residential Policies:", paragraph2);
    console.log("Visiting Rules:", paragraph3);
  
    // Save the submitted paragraphs
    setSubmittedParagraphs({
      paragraph1: paragraph1,
      paragraph2: paragraph2,
      paragraph3: paragraph3
    });
  
    // Reset the state values of the input paragraphs to empty strings
    setParagraph1('');
    setParagraph2('');
    setParagraph3('');
  };

  /* DYNAMIC RULES DATA BASED ON USER INPUT */
  const RulesDetails = [
    <div className="Rules-screen-container" key="payment-instructions">
      <div className="chore-container">
        <RulesHeading
          heading={"Payment Instructions"}
          subHeading={""}
          fromDate={" "}
          toDate={" "}
        />
        <div className="chore-description">
          <span className="Rules-description-text">
          {submittedParagraphs.paragraph1 || paragraph1}
          </span>
        </div>
      </div>
    </div>,

    <div className="Rules-screen-container" key="residential-policies">
      <div className="chore-container">
        <RulesHeading
          heading={"Residential Policies"}
          subHeading={""}
          fromDate={" "}
          toDate={" "}
        />
        <div className="chore-description">
          <span className="Rules-description-text">
          {submittedParagraphs.paragraph2|| paragraph2}
          </span>
        </div>
      </div>
    </div>,

    <div className="Rules-screen-container" key="visiting-rules">
      <div className="chore-container">
        <RulesHeading
          heading={"Visiting Rules"}
          subHeading={""}
          fromDate={" "}
          toDate={" "}
        />
        <div className="chore-description">
          <span className="Rules-description-text">
          {submittedParagraphs.paragraph3 || paragraph3}
          </span>
        </div>
      </div>
    </div>,
  ];

  const handleCarousal = (index) => {
    setSelectedBulletIndex(index);
  };

  const getBullets = () => {
    const bulletNames = ["Payment Instructions", "Residential Policies", "Visiting Rules"];
    return bulletNames.map((name, index) => (
      <div
        onClick={() => handleCarousal(index)}
        className={
          index === selectedBulletIndex ? "bullet selected-bullet" : "bullet"
        }
        key={index}
      >
        <span className="bullet-label">{name}</span>
      </div>
    ));
  };
  

  const getRulesScreens = () => {
    return RulesDetails[selectedBulletIndex];
  };

  return (
    <div className="Rules-container screen-container fade-in" id={props.id || ""}>
      <div className="Rules-content">
        <div title={"Rules"} subHeading={"My formal Bio Details"} />
        <div className="Rules-card">
          <div className="Rules-bullets">
            <div className="bullet-container">
              <div className="bullet-icons"></div>
              <div className="bullets">{getBullets()}</div>
            </div>
          </div>

          <div className="Rules-bullet-details">{getRulesScreens()}</div>
        </div>
      </div>
      <div className="textarea-container">
        <textarea
          className="textarea"
          value={paragraph1}
          onChange={(e) => handleParagraphChange(e, 1)}
          placeholder="Enter Payment Instructions"
        />
        <textarea
          className="textarea"
          value={paragraph2}
          onChange={(e) => handleParagraphChange(e, 2)}
          placeholder="Enter Residential Policies"
        />
        <textarea
          className="textarea"
          value={paragraph3}
          onChange={(e) => handleParagraphChange(e, 3)}
          placeholder="Enter Visiting Rules"
        />
        <button onClick={handleSubmit} className="submit-button">
          Submit
        </button>
      </div>
    </div>
  );
};

export default Rules;
