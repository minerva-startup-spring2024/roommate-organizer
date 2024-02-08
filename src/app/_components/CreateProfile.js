import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { useState } from "react";
import prisma from "../../../lib/db";

function CreateProfile() {
  const supabase = createClientComponentClient();
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");

  const handleFirstNameChange = (event) => {
    setFirstName(event.target.value);
  };

  const handleLastNameChange = (event) => {
    setLastName(event.target.value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    // Perform any necessary actions with the entered first name and last name
    console.log("First Name:", firstName);
    console.log("Last Name:", lastName);
    const createProfile = await prisma.profile
      .create({ firstName, lastName })
      .then((res) => {
        console.log(res);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <div>
      <h1>Create Profile</h1>
      <form onSubmit={handleSubmit}>
        <label>
          First Name:
          <input
            type="text"
            value={firstName}
            onChange={handleFirstNameChange}
          />
        </label>
        <br />
        <label>
          Last Name:
          <input type="text" value={lastName} onChange={handleLastNameChange} />
        </label>
        <br />
        <button type="submit">Submit</button>
      </form>
    </div>
  );
}

export default CreateProfile;
