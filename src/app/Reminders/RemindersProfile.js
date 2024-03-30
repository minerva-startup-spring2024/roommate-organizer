import React, { useState, useEffect } from "react";
import Animations from "./Animations.js";
import "./RemindersProfile.css";

const Reminder = (props) => {
  /* STATES */
  const [selectedBulletIndex, setSelectedBulletIndex] = useState(0);
  const [carousalOffsetStyle, setCarousalOffsetStyle] = useState({});

  let fadeInScreenHandler = (screen) => {
    if (screen.fadeInScreen !== props.id) return;

    Animations.animations.fadeInScreen(props.id);
  };

  /* REUSABLE MINOR COMPONENTS */
  const ReminderHeading = (props) => {
    return (
      <div className="Reminder-heading">
        <div className="Reminder-main-heading">
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
        <div className="Reminder-sub-heading">
          <span>{props.subHeading ? props.subHeading : ""}</span>
        </div>
        <div className="Reminder-heading-description">
          <span>{props.description ? props.description : ""}</span>
        </div>
      </div>
    );
  };
  
  

  /* STATIC Reminder DATA FOR THE LABELS*/
  const ReminderBullets = [
    { label: "Room Policies", logoSrc: "graph.svg" },
    { label: "Chiamaka's Chores", logoSrc: "chore.svg" },
    { label: "Chloe's Chores", logoSrc: "chore.svg" },
    { label: "Ba Thien's Chores", logoSrc: "chore.svg" },
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

  const ReminderDetails = [
    <div className="Reminder-screen-container" key="education">
        <ReminderHeading
        heading={"Friday"}
        subHeading={"Personal Room arrangements, Clearing up of disorderliness"}
        fromDate={" "}
        toDate={" "}
      />
      <ReminderHeading
        heading={"Saturday"}
        subHeading={"Kitchen deep cleaning, Bathroom chores, Garden and litters"}
        fromDate={" "}
        toDate={" "}
      />

      <ReminderHeading
        heading={"Sunday"}
        subHeading={"Household inspections, Checkin for task completions, Prepaing for the following week"}
        fromDate={" "}
        toDate={" "}
      />

    </div>,

    /* WORK chore */
    <div className="Reminder-screen-container" key="work-chore">
      <div className="chore-container">
        <ReminderHeading
          heading={"Chloe"}
          subHeading={"Cleaning questions, task updates"}
          fromDate={" "}
          toDate={" "}
        />
        <div className="chore-description">
          <span className="Reminder-description-text">
          - Is someone else available to take my turn? I feel a bit sick so I cant clean the bathroom today. Thanks
          </span>
        </div>
        <div className="chore-description">
          <span className="Reminder-description-text">
            - Request for roommate two to check if the guest stayed overnight.
            </span>
          <br />
          <span className="Reminder-description-text">
            - Someone left an open meal, should I take that out?  {" "}
          </span>
          <br />
        </div>
      </div>
    </div>,

    /* WORK chore */
    <div className="Reminder-screen-container" key="work-chore">
      <div className="chore-container">
        <ReminderHeading
          heading={"Ba Thien"}
          subHeading={"Cleaning questions, task updates"}
          fromDate={" "}
          toDate={" "}
        />
        <div className="chore-description">
          <span className="Reminder-description-text">
            -  Cleaned up garage area, and lawn


          </span>
          <br />
          <span className="Reminder-description-text">
            - Removed the fluff in the washing machine. {" "}
          </span>
          <br />
          <span className="Reminder-description-text">
            - Washed dishes from the week, also cleaned the dryer {" "}
          </span>
          <br />
        </div>
      </div>
    </div>,

    /* PROJECTS */
    <div className="Reminder-screen-container" key="projects">
  {projectsDetails.map((projectDetail, index) => (
    <ReminderHeading
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
    return ReminderBullets.map((bullet, index) => (
      <div
        onClick={() => handleCarousal(index)}
        className={
          index === selectedBulletIndex ? "bullet selected-bullet" : "bullet"
        }
        key={index}
      >
        <img
          className="bullet-logo"
          src={require(`./${bullet.logoSrc}`)}
          alt="B"
        />
        <span className="bullet-label">{bullet.label}</span>
      </div>
    ));
  };

  const getReminderScreens = () => {
    return (
      <div
        style={carousalOffsetStyle.style}
        className="Reminder-details-carousal"
      >
        {ReminderDetails.map((ReminderDetail) => ReminderDetail)}
      </div>
    );
  };

  return (
    <div
      className="Reminder-container screen-container fade-in"
      id={props.id || ""}
    >
      <div className="Reminder-content">
        <div title={"Reminder"} subHeading={"My formal Bio Details"} />
        <div className="Reminder-card">
          <div className="Reminder-bullets">
            <div className="bullet-container">
              <div className="bullet-icons"></div>
              <div className="bullets">{getBullets()}</div>
            </div>
          </div>

          <div className="Reminder-bullet-details">{getReminderScreens()}</div>
        </div>
      </div>
    </div>
  );
};

export default Reminder;
