import React from "react";

export default function Home({ msg, setMsg, setMsgType }) {
  return (
    <div>
      <div className="container">
        {msg && typeof msg === "string" && msg.trim() !== "" && (
          <h3 className="alert alert-success" role="alert">
            {msg}
          </h3>
        )}
        <h1>Home</h1>
      </div>
    </div>
  );
}
