import React, {useContext, useEffect, useMemo, useState} from "react";
import "./StartupProjects.scss";
import "./ProjectFrameFix.scss";
import {bigProjects} from "../../portfolio";
import {Fade} from "react-reveal";
import StyleContext from "../../contexts/StyleContext";

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
      selectedDomain && selectedDomain.projects ? selectedDomain.projects : [],
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
                    {project.projectDesc}
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
        </div>
      </div>
    </Fade>
  );
}
