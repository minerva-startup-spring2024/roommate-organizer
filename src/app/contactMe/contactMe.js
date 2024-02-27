import React, { useState } from "react";
import { toast } from "react-toastify";
import { useRouter } from 'next/router';
import imgBack from "../../../src/images/mailz.jpeg";
import load1 from "../../../src/images/load2.gif";
import "./ContactMe.css";

const ContactForm = (props) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false); // Renamed from bool for clarity
  const [banner, setBanner] = useState(''); // Initialize banner state if needed
  const router = useRouter();

  const submitForm = async (e) => {
    e.preventDefault();

    if (name.length === 0 || email.length === 0 || message.length === 0) {
      const validationMsg = "Please fill in all fields.";
      toast.error(validationMsg);
      return;
    }

    try {
      setIsLoading(true);
      const res = await fetch(`/api/contacts`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name,
          email,
          message,
        }),
      });

      const data = await res.json();

      if (res.ok) {
        toast.success(data.msg || 'Message sent successfully!');
        setName('');
        setEmail('');
        setMessage('');
      } else {
        toast.error(data.msg || 'An unexpected error occurred.');
      }
    } catch (error) {
      console.error(error);
      toast.error('Failed to send message. Please try again.');
    } finally {
      setIsLoading(false);
      router.reload();
    }
  };

  return (
    <div className="main-container fade-in" id={props.id || ""}>
      <div className="central-form">
        <div className="col">
          <a href="https://www.linkedin.com/in/udechukwu/">
            <i className="fa fa-linkedin-square" />
          </a>
        </div>
        <div className="back-form">
          <div className="img-back">
            <h4>Send Your Email Here!</h4>
            <img src={imgBack} alt="image not found" />
          </div>
          <form onSubmit={submitForm}>
            <p>{banner}</p>
            <label htmlFor="name">Name</label>
            <input type="text" onChange={(e) => setName(e.target.value)} value={name} />

            <label htmlFor="email">Email</label>
            <input type="email" onChange={(e) => setEmail(e.target.value)} value={email} />

            <label htmlFor="message">Message</label>
            <textarea onChange={(e) => setMessage(e.target.value)} value={message} />

            <div className="send-btn">
              <button type="submit">
                send
                <i className="fa fa-paper-plane" />
                {isLoading ? (
                  <b className="load">
                    <img src={load1} alt="image not responding" />
                  </b>
                ) : (
                  ""
                )}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default ContactForm;
