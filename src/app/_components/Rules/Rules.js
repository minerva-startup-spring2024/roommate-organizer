"use client"
import React, { useState, useEffect } from "react";
import Animations from "./Animations.js";
import "./Rules.css";
import "./chore.svg";
import "./graph.svg";

const Rules = (props) => {
  /* STATES */
  const [selectedBulletIndex, setSelectedBulletIndex] = useState(0);
  const [carousalOffsetStyle, setCarousalOffsetStyle] = useState({});

  let fadeInScreenHandler = (screen) => {
    if (screen.fadeInScreen !== props.id) return;

    Animations.animations.fadeInScreen(props.id);
  };

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
  
  

  /* STATIC Rules DATA FOR THE LABELS*/
  const RulesBullets = [
    { label: "Payment Instructions", logoSrc: "graph.svg" },
    { label: "Residential Policies", logoSrc: "chore.svg" },
    { label: "Visiting Rules", logoSrc: "chore.svg" },
    { label: "Cleaning Routine", logoSrc: "chore.svg" },
  ];

 

  const projectsDetails = [
  {
    title: "Kitchen Cleaning",
    demoUrl: "",
    duration: { fromDate: "Saturdays", toDate: "8am" },
    description:
      "Cleaned the kitchen this week. there was lots of dirty plates from the party that Yego had the previous friday. Please lets try to be more organized thanks.",
    subHeading: "Every Two Weeks",
  },
  {
    title: "Cleaning the Stair Case",
    demoUrl: "",
    duration: { fromDate: "Friday", toDate: "1pm" },
    description:
      "We don't have the wasp nests any more. So I didnt have to mop. Only cobwebbed. But the stair case is clean!", 
    subHeading:
      "Once a month",
  },
  {
    title: "Toilet Cleaning",
    demoUrl: "",
    duration: { fromDate: "Saturday", toDate: "10pm" },
    description:
      "Is someone else available to take my turn? I feel a bit sick so I cant clean the bathroom today. Thanks",
    subHeading:
      "Missed",
  },
];

  const RulesDetails = [
    <div className="Rules-screen-container" key="education">
        <RulesHeading
        heading={"Step 1"}
        subHeading={"Download the Housing management application, Stripay"}
        fromDate={" "}
        toDate={" "}
      />
      <RulesHeading
        heading={"Step 2"}
        subHeading={"Set up your account to connect banking details"}
        fromDate={" "}
        toDate={" "}
      />

      <RulesHeading
        heading={"Step 3"}
        subHeading={"Integrate the autopay feature to avoid late payment penalties"}
        fromDate={" "}
        toDate={" "}
      />

    </div>,

    /* WORK chore */
    <div className="Rules-screen-container" key="work-chore">
      <div className="chore-container">
        <RulesHeading
          heading={"Failure to adhere to these may lead to termination of housing contract"}
          subHeading={""}
          fromDate={" "}
          toDate={" "}
        />
        <div className="chore-description">
          <span className="Rules-description-text">
          - Pets are not allowed within the premises, because we already have a minion of rats awaiting your arrival  
          
         
          </span>
        </div>
        <div className="chore-description">
          <span className="Rules-description-text">
            - Tenants are required to pay rent on time according to the terms outlined in the lease agreement
            </span>
        </div>
        <div className="chore-description">
        <span className="Rules-description-text">
            - Subleasing is not permitted, since only a few people are capable of living in a shoe box  {" "}
          </span>
        </div>
      </div>
    </div>,

    /* WORK chore */
    <div className="Rules-screen-container" key="work-chore">
      <div className="chore-container">
        <RulesHeading
          heading={"Visiting rules for guests and tenants"}
          subHeading={""}
          fromDate={" "}
          toDate={" "}
        />
        <div className="chore-description">
          <span className="Rules-description-text">
            -   Guests must apply and be accepted by the housing management prior to entering the building
          </span>
          </div>

          <div className="chore-description"> 
          <span className="Rules-description-text">
            - Social events must end by at most 11pm on weekends, and 9pm on weekdays {" "}
          </span>
          </div>

          <div className="chore-description"> 
          <span className="Rules-description-text">
            - Tenants are  responsible for the behavior of their guests while they are on the premises {" "}
          </span>
          </div>
        </div>
      </div>,

    /* PROJECTS */
    <div className="Rules-screen-container" key="projects">
  {projectsDetails.map((projectDetail, index) => (
    <RulesHeading
      key={index}
      heading={projectDetail.title}
      subHeading={projectDetail.subHeading}
      description={projectDetail.description}
      fromDate={projectDetail.duration.fromDate}
      toDate={projectDetail.duration.toDate}
      demoLink={
        <a href={projectDetail.demoUrl} target="_blank" rel="noopener noreferrer"> </a>
      }
    />
  ))}
</div>,
  ];

  const handleCarousal = (index) => {
    let offsetHeight = 360;

    let newCarousalOffset = {
      style: { transform: "translateY(" + index * offsetHeight * -1 + "px)" },
    };

    setCarousalOffsetStyle(newCarousalOffset);
    setSelectedBulletIndex(index);
  };

  const getBullets = () => {
    return RulesBullets.map((bullet, index) => (
      <div
        onClick={() => handleCarousal(index)}
        className={
          index === selectedBulletIndex ? "bullet selected-bullet" : "bullet"
        }
        key={index}
      >
        <img
          className="bullet-logo"
        />
        <span className="bullet-label">{bullet.label}</span>
      </div>
    ));
  };

  const getRulesScreens = () => {
    return (
      <div
        style={carousalOffsetStyle.style}
        className="Rules-details-carousal"
      >
        {RulesDetails.map((RulesDetail) => RulesDetail)}
      </div>
    );
  };

  return (
    <div
      className="Rules-container screen-container fade-in"
      id={props.id || ""}
    >
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
    </div>
  );
};

export default Rules;
