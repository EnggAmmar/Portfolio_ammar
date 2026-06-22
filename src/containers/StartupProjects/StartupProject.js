import React, {useContext, useEffect, useMemo, useState} from "react";
import "./StartupProjects.scss";
import "./ProjectFrameFix.scss";
import {bigProjects} from "../../portfolio";
import {Fade} from "react-reveal";
import StyleContext from "../../contexts/StyleContext";

const projectCopyOverrides = {
  "uav-design": {
    projectName: "Foldable Fixed-Wing UAV Design, 3D Printing & Field Testing",
    projectShort:
      "Designed and built a foldable fixed-wing UAV using CAD models, 3D-printed parts, electronics integration, CFD review, and field-test preparation.",
    projectDesc:
      "Designed and developed a foldable fixed-wing UAV prototype. The work included structural CAD modeling, wing and body layout, 3D-printed prototype parts, electronics packaging, and assembly checks before field testing.",
    projectDetails: [
      "Created CAD models for the UAV body, wing structure, internal mounting points, and assembly interfaces.",
      "Prepared FDM 3D-printed parts and used physical fit checks to improve clearances and assembly quality.",
      "Supported electronics and sensor integration so the airframe could be assembled as a complete test prototype.",
      "Used CFD result views and field-test preparation to check the design before further prototype improvements."
    ],
    tags: ["Fixed-wing UAV", "CAD", "3D printing", "CFD", "Field testing"],
    mediaCaptions: [
      "CFD velocity view used to check airflow behavior around the UAV body and wing surfaces.",
      "Mesh model prepared for aerodynamic simulation and design review.",
      "3D-printed UAV body section used for fit checks before final assembly.",
      "Assembled foldable fixed-wing UAV airframes prepared for prototype testing.",
      "Wing structure reference showing the fabrication and assembly direction for the UAV."
    ]
  },
  "launch-vehicle": {
    projectName: "Conceptual Launch Vehicle & 25 kN LOX/RP-1 Rocket Engine Design",
    projectShort:
      "Worked on launch-vehicle subsystem concepts, propellant tanks, injector layout, piping, sensor placement, and rocket-engine cooling studies.",
    projectDesc:
      "Supported the conceptual design of a satellite launch vehicle and a 25 kN liquid rocket engine using LOX/RP-1 propellants. My work focused on CAD models, subsystem interfaces, tank concepts, injector-head layout, piping routes, sensor placement, and thermal analysis of the engine cooling system.",
    projectDetails: [
      "Created conceptual CAD models for the launch vehicle, propellant tanks, engine assembly, and mechanical interfaces.",
      "Worked on tank baffle concepts to reduce propellant sloshing during operation.",
      "Prepared injector-head and coaxial-swirl injector concepts inspired by heritage liquid rocket engine layouts.",
      "Used ANSYS Workbench for tank stress checks and ANSYS Fluent for regenerative cooling and wall-temperature studies."
    ],
    tags: ["Launch vehicle", "25 kN engine", "LOX/RP-1", "ANSYS Fluent", "Thermal analysis"],
    mediaCaptions: [
      "Overall launch-vehicle concept render used for early system-level discussion.",
      "25 kN liquid rocket engine concept assembly showing the main engine geometry.",
      "Cut model used to explain the chamber, injector region, nozzle, and internal layout.",
      "Flow pathline result used to study internal fluid behavior and thermal loading.",
      "Thermal simulation view used to support regenerative cooling and wall-temperature assessment.",
      "3D-printed nozzle prototype used for physical design review and geometry communication."
    ]
  },
  "cubesat-platform": {
    projectName: "CubeSat Mission Design Configurator with MBSE and CP-SAT Optimization",
    projectShort:
      "Built a web tool that turns CubeSat mission inputs into early subsystem choices for platform, power, ADCS, communication, and thermal design.",
    projectDesc:
      "Built a web-based CubeSat design configurator for early mission planning. The user enters mission needs such as mission type, payload class, region of interest, revisit time, and engineering preferences. The backend then converts these inputs into engineering requirements and selects a feasible CubeSat architecture.",
    projectDetails: [
      "Created the mission-input logic for Remote Sensing, IoT/Communication, and Navigation mission families.",
      "Used subsystem databases to compare platform, power, ADCS, onboard computer, communication, and thermal options.",
      "Used a CP-SAT optimization solver to select a feasible CubeSat bus and subsystem configuration.",
      "Added solver-trace outputs so users can see selected components, constraints, margins, warnings, and reasoning."
    ],
    tags: ["CubeSat", "MBSE", "CP-SAT", "React", "FastAPI", "Docker"],
    mediaCaptions: [
      "Configurator concept showing how mission inputs are converted into architecture choices.",
      "3U CubeSat platform visualization used to communicate the reconfigurable design direction."
    ]
  },
  "robotic-control": {
    projectName: "SCARA-Style RRP Robot Arm: CAD Layout & PID Control Simulation",
    projectShort:
      "Designed a SCARA-style robot arm and simulated PID control to study how the arm follows target position commands.",
    projectDesc:
      "Designed and simulated a SCARA-style RRP robot arm with two rotary joints and one vertical sliding joint. The project focused on the mechanical layout, joint movement, CAD visualization, and PID control simulation for target-position tracking.",
    projectDetails: [
      "Designed the RRP robot arm layout with two revolute joints and one prismatic joint.",
      "Created CAD visuals to explain the mechanism, joint locations, and arm movement concept.",
      "Built a PID simulation to compare target position with actual response.",
      "Used response plots to check overshoot, settling behavior, and tracking performance."
    ],
    tags: ["SCARA robot", "RRP mechanism", "PID control", "Mechatronics", "CAD"],
    mediaCaptions: [
      "CAD visualization showing the SCARA-style robot arm mechanism and joint layout.",
      "PID simulation result used to compare target motion and actual robot-arm response.",
      "Initial sketch used to define the SCARA-style RRP mechanism concept."
    ]
  },
  "exoskeleton-arm": {
    projectName: "Robotic Exoskeleton Arm: Sketch, CAD Model & Motion-Support Concept",
    projectShort:
      "Designed an exoskeleton arm concept from sketch to CAD model, focusing on wearable support, joint placement, and actuator-ready interfaces.",
    projectDesc:
      "Designed a robotic exoskeleton arm concept to support upper-limb movement. The project started with a hand sketch, then moved into CAD modeling and final visual rendering. I designed the arm links, joint positions, wearable support frame, and actuator-ready mounting points.",
    projectDetails: [
      "Created the first concept sketch to define the arm layout and joint positions.",
      "Built the CAD model of the exoskeleton arm mechanism and wearable support structure.",
      "Designed linkages, joint interfaces, and actuator-ready mounting points.",
      "Prepared a final render to show how the concept could look as a physical assistive device."
    ],
    tags: ["Exoskeleton", "Wearable robotics", "CAD", "Mechatronics", "Assistive device"],
    mediaCaptions: [
      "Final render showing the exoskeleton arm concept, wearable frame, and joint layout.",
      "Initial sketch used to define the arm support shape and main joint positions.",
      "CAD model showing the arm mechanism, support frame, linkages, and actuator-ready interfaces."
    ]
  }
};

const applyProjectCopyOverrides = project => {
  const override = projectCopyOverrides[project.id];
  if (!override) return project;

  return {
    ...project,
    ...override,
    media: project.media
      ? project.media.map((media, index) => ({
          ...media,
          caption:
            override.mediaCaptions && override.mediaCaptions[index]
              ? override.mediaCaptions[index]
              : media.caption
        }))
      : project.media
  };
};

export default function StartupProject() {
  const {isDark} = useContext(StyleContext);
  const projectDomains = useMemo(
    () =>
      bigProjects.domains && bigProjects.domains.length
        ? bigProjects.domains
        : [
            {
              id: "projects",
              name: "Projects",
              summary: bigProjects.subtitle,
              projects: bigProjects.projects || []
            }
          ],
    []
  );
  const [selectedDomainId, setSelectedDomainId] = useState(
    projectDomains.length ? projectDomains[0].id : ""
  );
  const selectedDomain =
    projectDomains.find(domain => domain.id === selectedDomainId) ||
    projectDomains[0];
  const domainProjects = useMemo(
    () =>
      selectedDomain && selectedDomain.projects
        ? selectedDomain.projects.map(applyProjectCopyOverrides)
        : [],
    [selectedDomain]
  );
  const [selectedProjectId, setSelectedProjectId] = useState(
    domainProjects.length ? domainProjects[0].id : ""
  );
  const [selectedMediaIndex, setSelectedMediaIndex] = useState(0);

  const selectedProject =
    domainProjects.find(project => project.id === selectedProjectId) ||
    domainProjects[0];

  useEffect(() => {
    setSelectedMediaIndex(0);
  }, [selectedProjectId]);

  useEffect(() => {
    if (domainProjects.length) {
      setSelectedProjectId(domainProjects[0].id);
    }
  }, [domainProjects, selectedDomainId]);

  const mediaItems =
    selectedProject && selectedProject.media ? selectedProject.media : [];
  const activeMedia =
    selectedMediaIndex >= 0 && selectedMediaIndex < mediaItems.length
      ? mediaItems[selectedMediaIndex]
      : null;
  const getMediaSrc = media =>
    media && media.src && media.src.default ? media.src.default : media.src;

  const renderMainImage = media => {
    const mediaSrc = getMediaSrc(media);
    const useSoftFrame = media.softFrame || media.contain;

    return (
      <div
        className={
          useSoftFrame
            ? "project-media-frame project-media-frame-soft"
            : "project-media-frame"
        }
        style={useSoftFrame ? {backgroundImage: `url(${mediaSrc})`} : undefined}
      >
        <img
          src={mediaSrc}
          alt={media.alt || `${selectedProject.projectName} selected`}
          className={
            media.contain
              ? "project-media-main-image project-media-contain"
              : "project-media-main-image"
          }
          loading="lazy"
          decoding="async"
        ></img>
      </div>
    );
  };

  if (!bigProjects.display || !selectedDomain || !selectedProject) {
    return null;
  }

  return (
    <div className="main" id="projects">
      <div>
        <Fade left duration={1000}>
          <div className="project-navigation-panel">
            <h1 className="skills-heading">{bigProjects.title}</h1>
            <p
              className={
                isDark
                  ? "dark-mode project-subtitle"
                  : "subTitle project-subtitle"
              }
            >
              {bigProjects.subtitle}
            </p>

            <div
              className="project-domain-tabs"
              role="tablist"
              aria-label="Project domains"
            >
              {projectDomains.map(domain => {
                const isActive = domain.id === selectedDomainId;
                return (
                  <button
                    key={domain.id}
                    type="button"
                    className={
                      isActive
                        ? `project-domain-tab project-domain-tab-active${
                            isDark ? " dark-mode" : ""
                          }`
                        : `project-domain-tab${isDark ? " dark-mode" : ""}`
                    }
                    onClick={() => setSelectedDomainId(domain.id)}
                    aria-selected={isActive}
                    role="tab"
                  >
                    {domain.name}
                  </button>
                );
              })}
            </div>

            <div className="project-domain-header">
              <div>
                <p className="project-domain-label">Selected domain</p>
                <h2 className="project-domain-title">{selectedDomain.name}</h2>
              </div>
              <p
                className={
                  isDark
                    ? "dark-mode project-domain-summary"
                    : "project-domain-summary"
                }
              >
                {selectedDomain.summary}
              </p>
            </div>

            <div className="project-selector-grid">
              {domainProjects.map(project => {
                const isActive = project.id === selectedProjectId;
                return (
                  <button
                    key={project.id}
                    type="button"
                    className={
                      isActive
                        ? `project-selector-card project-selector-card-active${
                            isDark ? " dark-mode" : ""
                          }`
                        : `project-selector-card${isDark ? " dark-mode" : ""}`
                    }
                    onClick={() => setSelectedProjectId(project.id)}
                  >
                    <span className="project-selector-title">
                      {project.projectName}
                    </span>
                    <span className="project-selector-desc">
                      {project.projectShort || project.projectDesc}
                    </span>
                    {project.tags && project.tags.length ? (
                      <span className="project-selector-tags">
                        {project.tags.slice(0, 3).map(tag => (
                          <span className="project-tag" key={tag}>
                            {tag}
                          </span>
                        ))}
                      </span>
                    ) : null}
                  </button>
                );
              })}
            </div>
          </div>
        </Fade>

        <Fade
          right
          duration={1000}
          key={`${selectedDomainId}-${selectedProjectId}`}
        >
          <div
            className={
              isDark
                ? "dark-mode project-card project-card-dark"
                : "project-card project-card-light"
            }
          >
            {activeMedia ? (
              <div className="project-media-main">
                {activeMedia.type === "image" ? (
                  renderMainImage(activeMedia)
                ) : (
                  <video
                    className="project-video"
                    controls
                    preload="metadata"
                    muted={Boolean(activeMedia.muted)}
                  >
                    <source src={getMediaSrc(activeMedia)} type="video/mp4" />
                  </video>
                )}
                {activeMedia.caption ? (
                  <p
                    className={
                      isDark ? "dark-mode card-subtitle" : "card-subtitle"
                    }
                  >
                    {activeMedia.caption}
                  </p>
                ) : null}
              </div>
            ) : (
              <div className="project-empty-media">
                <span>{selectedDomain.name}</span>
                <h3>{selectedProject.projectName}</h3>
              </div>
            )}
            <div className="project-content">
              {selectedProject.projectLabel ? (
                <p className="project-card-label">
                  {selectedProject.projectLabel}
                </p>
              ) : null}
              {selectedProject.projectHeading ? (
                <h3 className="project-card-title">
                  {selectedProject.projectHeading}
                </h3>
              ) : null}
              <p
                className={
                  isDark
                    ? "dark-mode project-description"
                    : "project-description"
                }
              >
                {selectedProject.projectDesc}
              </p>
              {selectedProject.projectDetails &&
              selectedProject.projectDetails.length ? (
                <ul className="project-detail-list">
                  {selectedProject.projectDetails.map(detail => (
                    <li key={detail}>{detail}</li>
                  ))}
                </ul>
              ) : null}
              {selectedProject.tags && selectedProject.tags.length ? (
                <div className="project-tag-list">
                  {selectedProject.tags.map(tag => (
                    <span className="project-tag" key={tag}>
                      {tag}
                    </span>
                  ))}
                </div>
              ) : null}
              {selectedProject.footerLink &&
              selectedProject.footerLink.length ? (
                <div className="project-link-list">
                  {selectedProject.footerLink.map(link => (
                    <a
                      key={link.name}
                      href={link.url}
                      className="project-link"
                      target={link.url.startsWith("http") ? "_blank" : "_self"}
                      rel={
                        link.url.startsWith("http")
                          ? "noopener noreferrer"
                          : undefined
                      }
                    >
                      {link.name}
                    </a>
                  ))}
                </div>
              ) : null}
              {selectedProject.gallery && selectedProject.gallery.length ? (
                <div className="project-gallery">
                  {selectedProject.gallery.map(item => (
                    <figure key={item.caption}>
                      <img
                        src={getMediaSrc(item)}
                        alt={item.alt}
                        loading="lazy"
                        decoding="async"
                      />
                      <figcaption>{item.caption}</figcaption>
                    </figure>
                  ))}
                </div>
              ) : null}
            </div>
            {mediaItems.length > 1 ? (
              <div className="project-media">
                <div className="project-media-grid">
                  {mediaItems.map((media, mediaIndex) => {
                    const isActive = mediaIndex === selectedMediaIndex;
                    return (
                      <button
                        key={`${selectedProject.projectName}-media-${mediaIndex}`}
                        type="button"
                        className={
                          isActive
                            ? "project-media-thumb project-media-thumb-active"
                            : "project-media-thumb"
                        }
                        onClick={() => setSelectedMediaIndex(mediaIndex)}
                      >
                        {media.type === "image" ? (
                          <img
                            src={getMediaSrc(media)}
                            alt={
                              media.alt ||
                              `${selectedProject.projectName} preview ${
                                mediaIndex + 1
                              }`
                            }
                            className={
                              media.contain
                                ? "project-media-image project-media-contain"
                                : "project-media-image"
                            }
                            loading="lazy"
                            decoding="async"
                          ></img>
                        ) : (
                          <div className="project-media-video-thumb">
                            <span>Video</span>
                          </div>
                        )}
                      </button>
                    );
                  })}
                </div>
              </div>
            ) : null}
          </div>
        </Fade>
      </div>
    </div>
  );
}
