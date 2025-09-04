import { createContext, useContext, useRef, cloneElement } from "react";
import React from "react";

const tableContext = createContext();

export default function Table({ children, className }) {
  const myRef = useRef([]);

  return (
    <tableContext.Provider value={myRef}>
      <div
        className={`w-full rounded-lg border-2 border-slate-100 p-1 shadow-sm shadow-slate-100 ${className || ""}`}
      >
        {children}
      </div>
    </tableContext.Provider>
  );
}

function Header({ children, className }) {
  const myRef = useContext(tableContext);

  myRef.current = React.Children.toArray(children).map(
    (eachHead) => eachHead.props.className,
  );

  return (
    <div
      className={`grid grid-cols-12 bg-[#F9FAFB] px-2 py-3.5 ${className || ""}`}
    >
      {children}
    </div>
  );
}

function Head({ children, className }) {
  return (
    <div
      className={`text-md px-2 font-semibold tracking-widest uppercase ${className || ""}`}
    >
      {children}
    </div>
  );
}

function Row({ children, className }) {
  const myRef = useContext(tableContext);

  const childArray = React.Children.toArray(children);
  const clonedChildren = childArray.map((eachChild, index) =>
    cloneElement(eachChild, {
      className: `${myRef.current?.[index]} px-2.5 pb-1.5 ${eachChild.props.className || ""}`,
    }),
  );

  return (
    <div className={`grid grid-cols-12 items-center py-1 ${className || ""}`}>
      {clonedChildren}
    </div>
  );
}

function Value({ children, className }) {
  return <div className={className}>{children}</div>;
}

function Body({ children, className }) {
  return (
    <div
      className={`space-y-2 divide-y divide-slate-200 rounded-lg bg-white py-3.5 ${className || ""}`}
    >
      {children}
    </div>
  );
}

Table.Header = Header;

Table.Body = Body;
Table.Head = Head;
Table.Row = Row;
Table.Value = Value;
