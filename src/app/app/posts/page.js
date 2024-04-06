import React from 'react';
import TopBar from "@/app/_components/TopBar/TopBar";
import Card from "../../_components/Announcements/Card";
import CreatePost from "@/app/_components/CreatePost/CreatePost.js";

export default function RulesProfile() {
  return (
    <>
    <TopBar title={"Announcement"}/>
    <div>
            <Card 
                image= "https://images.pexels.com/photos/415829/pexels-photo-415829.jpeg?auto=compress&cs=tinysrgb&w=800"
                title="Note from Kelly Robin"  
                text="Hey, There is a leak in the bathroom ceiling. Can someone come look at it" 
                date = "10:23pm"
            />

            <Card 
                image= "https://images.pexels.com/photos/1370750/pexels-photo-1370750.jpeg?auto=compress&cs=tinysrgb&w=800"
                title="Note from Kelly Robin"  
                text="Hey, Can we all make sure that we keep our rooms clean. Its really important" 
                date = "12:39am"
            />
            
            <CreatePost context={{ user: user }} />
        </div>
    </>
  );
}