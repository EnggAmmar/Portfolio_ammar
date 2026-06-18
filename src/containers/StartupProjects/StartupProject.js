import React, {useContext, useEffect, useState} from "react";
import "./StartupProjects.scss";
import {bigProjects} from "../../portfolio";
import {Fade} from "react-reveal";
import StyleContext from "../../contexts/StyleContext";

export default function StartupProject() {
  const {isDark} = useContext(StyleContext);
  const [selectedProjectId, setSelectedProjectId] = useState(
    bigProjects.projects.length ? bigProjects.projects[0].id : ""
  );
  const [selectedMediaIndex, setSelectedMediaIndex] = useState(0);

  const selectedProject =
    bigProjects.projects.find(project => project.id === selectedProjectId) ||
    bigProjects.projects[0];

  useEffect(() => {
    setSelectedMediaIndex(0);
  }, [selectedProjectId]);

  const mediaItems = selectedProject && selectedProject.media
    ? selectedProject.media
    : [];
  const activeMedia =
    selectedMediaIndex >= 0 && selectedMediaIndex < mediaItems.length
      ? mediaItems[selectedMediaIndex]
      : null;

  if (!bigProjects.display || !selectedProject) {
    return null;
  }

  return (
    <Fade bottom duration={1000} distance="20px">
      <div className="main" id="projects">
        <div>
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

          <div className="project-selector-grid">
            {bigProjects.projects.map(project => {
              const isActive = project.id === selectedProjectId;
              return (
                <button
                  key={project.id}
                  type="button"
                  className={
                    isActive
                      ? `project-selector-card project-selector-card-active${isDark ? " dark-mode" : ""}`
                      : `project-selector-card${isDark ? " dark-mode" : ""}`
                  }
                  onClick={() => {
                    setSelectedProjectId(project.id);
                  }}
                >
                  <span className="project-selector-title">
                    {project.projectName}
                  </span>
                </button>
              );
            })}
          </div>

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
                  <img
                    src={activeMedia.src}
                    alt={activeMedia.alt || `${selectedProject.projectName} selected`}
                    className="project-media-main-image"
                  ></img>
                ) : (
                  <video
                    className="project-video"
                    controls
                    preload="metadata"
                    muted={Boolean(activeMedia.muted)}
                  >
                    <source src={activeMedia.src} type="video/mp4" />
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
            ) : null}
            {mediaItems.length ? (
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
                            src={media.src}
                            alt={media.alt || `${selectedProject.projectName} preview ${mediaIndex + 1}`}
                            className="project-media-image"
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
        </div>
      </div>
    </Fade>
  );
}
