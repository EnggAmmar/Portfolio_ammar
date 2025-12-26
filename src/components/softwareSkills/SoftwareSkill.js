import React from "react";
import "./SoftwareSkill.scss";
import { skillsSection } from "../../portfolio";

export default function SoftwareSkill() {
  return (
    <div className="software-skills-main-div">
      <ul className="dev-icons">
        {skillsSection.softwareSkills.map((skill, i) => (
          <li key={i} className="software-skill-inline">
            <div className="software-skill-image-wrapper">
              <img
                src={skill.logoPath}
                alt={skill.skillName}
                className="software-skill-image"
              />
            </div>
            <p>{skill.skillName}</p>
          </li>

        ))}
      </ul>
    </div>
  );
}
