import React from "react";

const Skills = ({skills}:any) => {
  return (
    <ul className="style-none skill-tags d-flex flex-wrap pb-25">
      {skills?.map((s: any, i: number) => (
        <li key={i}>{s}</li>
      ))}

      
    </ul>
  );
};

export default Skills;
