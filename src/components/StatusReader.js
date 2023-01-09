import React from "react";

const StatusReader = (props) => {
  const { item } = props;

  console.log("item...", item);

  //   switch (item) {
  //     case item === "BORROWING":
  //       // code block
  //       return (
  //         <div
  //           style={{ color: "#fff  !important", background: "green !important" }}
  //         >
  //           {item}
  //         </div>
  //       );

  //     default:
  //       return <div style={{ color: "#fff", background: "green" }}>{item}</div>;
  //   }
  if (item === "BORROWING") {
    return (
      <div
        style={{ color: "#fff  !important", background: "green !important" }}
      >
        {item === "BORROWING" ? "Đang mượn" : ""}
      </div>
    );
  } else if (item === "DO_NOT_BORROW") {
    return (
      <div style={{ color: "#fff  !important", background: "blue !important" }}>
        {item === "DO_NOT_BORROW" ? "Không mượn" : ""}
      </div>
    );
  } else if (item === "FORBIDDEN") {
    return (
      <div style={{ color: "#fff  !important", background: "red !important" }}>
        {item === "FORBIDDEN" ? "Cấm" : ""}
      </div>
    );
  } else if (item === "VIOLATE") {
    return (
      <div style={{ color: "#fff  !important", background: "grey !important" }}>
        {item === "VIOLATE" ? "Vi phạm" : ""}
      </div>
    );
  } else if (item === "LOSS") {
    return (
      <div style={{ color: "#fff  !important", background: "grey !important" }}>
        {item === "LOSS" ? "Đã Mất" : ""}
      </div>
    );
  } else if (item === "REPORTED ") {
    return (
      <div style={{ color: "#fff  !important", background: "grey !important" }}>
        {item === "REPORTED " ? "Đã trả" : ""}
      </div>
    );
  }
};

export default StatusReader;
