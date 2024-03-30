"use client";

import { colorGrey300 } from "@/app/_constants/colors";
import Image from "next/image";
import { useEffect, useState } from "react";
import { FaTrash } from "react-icons/fa6";
import GreyBeatLoader from "../BeatLoaders/GreyBeatLoader";
import styles from "./MemberList.module.css";

const MemberList = ({ roomId }) => {
  const [loading, setLoading] = useState(true);
  const [allUserLoading, setAllUserLoading] = useState(true);
  const [members, setMembers] = useState([]);
  const [allUsers, setAllUsers] = useState([]);
  const [memberSelectionStatus, setMemberSelectionStatus] = useState(false);
  const [userToAdd, setUserToAdd] = useState(null);

  const getUsers = async () => {
    fetch(`/api/profiles`)
      .then((res) => res.json())
      .then((data) => {
        const nonMembers = data.profiles.filter(
          (user) => !members.some((member) => member.id === user.id)
        );
        setAllUsers(nonMembers);
        setAllUserLoading(false);
      });
  };

  const getMembers = (roomId) => {
    fetch(`/api/rooms/${roomId}/members`)
      .then((res) => res.json())
      .then((data) => {
        setMembers(data.members);
        setLoading(false);
      });
  };

  const addMember = async () => {
    fetch(`/api/rooms/${roomId}/members`, {
      method: "POST",
      body: JSON.stringify({
        profileId: userToAdd.id,
      }),
    }).then(() => {
      getMembers(roomId);
      setUserToAdd(null);
    });
  };

  const removeMember = async (memberId) => {
    fetch(`/api/rooms/${roomId}/members`, {
      method: "DELETE",
      body: JSON.stringify({
        profileId: memberId,
      }),
    }).then(() => {
      getMembers(roomId);
    });
  };

  useEffect(() => {
    getMembers(roomId);
  }, [roomId]);

  return (
    <div className={styles.roommatesListContainer}>
      <p className={styles.boxTitle}>Roommates</p>
      {loading ? (
        <GreyBeatLoader />
      ) : (
        <>
          <div className={styles.currentMemberContainer}>
            {members.map((member) => (
              <div key={member.id} className={styles.listRow}>
                <div className={styles.rowLabel}>
                  <Image
                    src={
                      member
                        ? `${process.env.NEXT_PUBLIC_SUPABASE_URL}/storage/v1/object/public/avatars/${member.profileImage}`
                        : "/default.png"
                    }
                    alt={member.profileImage ? member.profileImage : "No alt"}
                    width={30}
                    height={30}
                    className={styles.itemImage}
                  />
                  {member.firstName} {member.lastName}
                </div>
                <FaTrash
                  color={colorGrey300}
                  onClick={async () => await removeMember(member.id)}
                />
              </div>
            ))}
          </div>
          <div className={styles.addMemberContainer}>
            <div className={styles.addMemberModal}>
              <div
                className={styles.emptySelectPersonContainer}
                onClick={async () => {
                  setMemberSelectionStatus(!memberSelectionStatus);
                  setAllUserLoading(true);
                  await getUsers();
                }}
              >
                {userToAdd ? (
                  <>
                    <Image
                      src={
                        userToAdd.profileImage
                          ? `${process.env.NEXT_PUBLIC_SUPABASE_URL}/storage/v1/object/public/avatars/${userToAdd.profileImage}`
                          : "/default.png"
                      }
                      alt={
                        userToAdd.profileImage
                          ? userToAdd.profileImage
                          : "No alt"
                      }
                      width={30}
                      height={30}
                      className={styles.itemImage}
                    />
                    {userToAdd.firstName} {userToAdd.lastName}
                  </>
                ) : (
                  <div className={styles.emptySelectPersonCircle} />
                )}
              </div>
              <button
                className={styles.addTaskButton}
                onClick={async () => await addMember()}
              >
                Add
              </button>
            </div>
            {memberSelectionStatus && (
              <div className={styles.selectMember}>
                {allUserLoading ? (
                  <GreyBeatLoader />
                ) : allUsers.length > 0 ? (
                  allUsers.map((member) => (
                    <div
                      className={styles.memberContainer}
                      key={`image-${member.id}`}
                      onClick={() => {
                        setUserToAdd(member);
                        setMemberSelectionStatus(false);
                      }}
                    >
                      <Image
                        src={
                          member.profileImage
                            ? `${process.env.NEXT_PUBLIC_SUPABASE_URL}/storage/v1/object/public/avatars/${member.profileImage}`
                            : "/default.png"
                        }
                        alt={
                          member.profileImage ? member.profileImage : "No alt"
                        }
                        width={30}
                        height={30}
                        className={styles.itemImage}
                      />
                      <p className={styles.memberName}>
                        {member.firstName} {member.lastName}
                      </p>
                    </div>
                  ))
                ) : (
                  "No users"
                )}
              </div>
            )}
          </div>
        </>
      )}
    </div>
  );
};

export default MemberList;
