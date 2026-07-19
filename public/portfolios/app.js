(function () {
  "use strict";

  const data = window.PORTFOLIO_DATA;
  const slug = document.body.dataset.domain;
  const profile = data && data.profiles ? data.profiles[slug] : null;
  const common = data ? data.common : null;
  const root = document.getElementById("portfolio-root");

  if (!profile || !common || !root) {
    document.body.innerHTML =
      '<main class="fatal"><h1>Portfolio unavailable</h1><p>The requested portfolio configuration could not be loaded.</p></main>';
    return;
  }

  document.documentElement.style.setProperty("--accent", profile.accent);
  document.documentElement.style.setProperty("--accent-soft", profile.accentSoft);
  document.title = `${common.name} — ${profile.title}`;

  const escapeHtml = (value) =>
    String(value == null ? "" : value)
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;")
      .replace(/'/g, "&#039;");

  const list = (items, className) =>
    `<ul class="${className || "clean-list"}">${items
      .map((item) => `<li>${escapeHtml(item)}</li>`)
      .join("")}</ul>`;

  const chips = (items) =>
    `<div class="chips">${items
      .map((item) => `<span class="chip">${escapeHtml(item)}</span>`)
      .join("")}</div>`;

  const projectImages = (project) => {
    if (!project.images || project.images.length === 0) return "";
    return `<div class="project-gallery ${
      project.images.length === 1 ? "project-gallery-single" : ""
    }">${project.images
      .map(
        (image, index) => `<figure class="project-image ${
          index === 0 ? "project-image-primary" : ""
        }">
          <img src="${escapeHtml(image.src)}" alt="${escapeHtml(
          image.alt
        )}" loading="lazy" referrerpolicy="no-referrer" />
          <figcaption>${escapeHtml(image.caption || image.alt)}</figcaption>
        </figure>`
      )
      .join("")}</div>`;
  };

  const workflow = (items) => {
    if (!items || items.length === 0) return "";
    return `<div class="workflow" aria-label="Project workflow">${items
      .map(
        (item, index) => `<div class="workflow-step">
          <span class="workflow-index">${String(index + 1).padStart(
            2,
            "0"
          )}</span>
          <span>${escapeHtml(item)}</span>
        </div>`
      )
      .join("")}</div>`;
  };

  const links = (items) => {
    if (!items || items.length === 0) return "";
    return `<div class="project-links">${items
      .map(
        (item) =>
          `<a href="${escapeHtml(
            item.url
          )}" target="_blank" rel="noreferrer">${escapeHtml(
            item.label
          )}<span aria-hidden="true">↗</span></a>`
      )
      .join("")}</div>`;
  };

  const projectCard = (project, index) => `<article class="project-card">
    <div class="project-number">CASE STUDY ${String(index + 1).padStart(
      2,
      "0"
    )}</div>
    <div class="project-heading">
      <div>
        <p class="project-kicker">${escapeHtml(project.kicker)}</p>
        <h3>${escapeHtml(project.title)}</h3>
      </div>
      ${chips(project.tools)}
    </div>
    <p class="project-summary">${escapeHtml(project.summary)}</p>
    ${workflow(project.workflow)}
    ${projectImages(project)}
    <div class="case-grid">
      <section>
        <h4>Engineering challenge</h4>
        <p>${escapeHtml(project.challenge)}</p>
      </section>
      <section>
        <h4>My contribution</h4>
        ${list(project.contributions, "contribution-list")}
      </section>
      <section class="relevance-panel">
        <h4>Role relevance</h4>
        <p>${escapeHtml(project.relevance)}</p>
      </section>
    </div>
    ${links(project.links)}
  </article>`;

  root.innerHTML = `
    <a class="skip-link" href="#main-content">Skip to content</a>
    <header class="site-header">
      <a class="brand" href="#top" aria-label="Back to top">
        <span class="brand-mark">AA</span>
        <span><strong>${escapeHtml(common.name)}</strong><small>${escapeHtml(
    profile.eyebrow
  )}</small></span>
      </a>
      <nav class="site-nav" aria-label="Primary navigation">
        <a href="#fit">Role fit</a>
        <a href="#projects">Projects</a>
        <a href="#experience">Experience</a>
        <a href="#contact">Contact</a>
      </nav>
      <button class="print-button" type="button" data-print>Save as PDF</button>
    </header>

    <main id="main-content">
      <section class="hero" id="top">
        <div class="hero-copy">
          <p class="eyebrow">${escapeHtml(profile.eyebrow)}</p>
          <h1>${escapeHtml(profile.title)}</h1>
          <p class="hero-summary">${escapeHtml(profile.summary)}</p>
          <div class="hero-actions">
            <a class="button button-primary" href="#projects">View case studies</a>
            <a class="button button-secondary" href="${escapeHtml(
              common.linkedin
            )}" target="_blank" rel="noreferrer">LinkedIn ↗</a>
            <a class="button button-ghost" href="${escapeHtml(
              common.resume
            )}" target="_blank" rel="noreferrer">Resume ↗</a>
          </div>
          <div class="role-strip" aria-label="Target roles">
            ${profile.targetRoles
              .map((role) => `<span>${escapeHtml(role)}</span>`)
              .join("")}
          </div>
        </div>
        <aside class="hero-panel" aria-label="Profile summary">
          <div class="profile-monogram">AA</div>
          <p>Mechanical engineer working across physical systems, simulation, software-enabled engineering, and hardware validation.</p>
          <dl>
            <div><dt>Based in</dt><dd>${escapeHtml(common.location)}</dd></div>
            <div><dt>Education</dt><dd>M.Sc. Electromobility, FAU</dd></div>
            <div><dt>Core approach</dt><dd>Requirements → Design → Analysis → Test</dd></div>
          </dl>
          <a href="mailto:${escapeHtml(common.email)}">${escapeHtml(
    common.email
  )}</a>
        </aside>
      </section>

      <section class="metrics" aria-label="Portfolio highlights">
        ${profile.metrics
          .map(
            (metric) => `<div class="metric"><strong>${escapeHtml(
              metric.value
            )}</strong><span>${escapeHtml(metric.label)}</span></div>`
          )
          .join("")}
      </section>

      <section class="section" id="fit">
        <div class="section-heading">
          <p class="eyebrow">How I work</p>
          <h2>What I bring to the role</h2>
          <p>Domain-specific depth supported by system-level mechanical engineering and hands-on implementation.</p>
        </div>
        <div class="value-grid">
          ${profile.valueProposition
            .map(
              (item, index) => `<article class="value-card">
                <span>${String(index + 1).padStart(2, "0")}</span>
                <h3>${escapeHtml(item.title)}</h3>
                <p>${escapeHtml(item.text)}</p>
              </article>`
            )
            .join("")}
        </div>
      </section>

      <section class="section section-projects" id="projects">
        <div class="section-heading">
          <p class="eyebrow">Selected work</p>
          <h2>Engineering case studies</h2>
          <p>Each project is presented around the problem, my contribution, the engineering method, and direct relevance to the target role.</p>
        </div>
        <div class="projects-list">
          ${profile.projects.map(projectCard).join("")}
        </div>
      </section>

      <section class="section" id="skills">
        <div class="section-heading">
          <p class="eyebrow">Technical toolkit</p>
          <h2>Capabilities</h2>
        </div>
        <div class="skills-grid">
          ${profile.skills
            .map(
              (skill) => `<article class="skill-card">
                <h3>${escapeHtml(skill.group)}</h3>
                ${chips(skill.items)}
              </article>`
            )
            .join("")}
        </div>
      </section>

      <section class="section" id="experience">
        <div class="section-heading">
          <p class="eyebrow">Relevant background</p>
          <h2>Experience selected for this domain</h2>
        </div>
        <div class="timeline">
          ${profile.experience
            .map(
              (job) => `<article class="timeline-item">
                <div class="timeline-meta"><span>${escapeHtml(
                  job.period
                )}</span></div>
                <div class="timeline-body">
                  <h3>${escapeHtml(job.role)}</h3>
                  <p class="company">${escapeHtml(job.company)}</p>
                  ${list(job.bullets, "experience-list")}
                </div>
              </article>`
            )
            .join("")}
        </div>
      </section>

      <section class="section education-section">
        <div class="section-heading">
          <p class="eyebrow">Education</p>
          <h2>Academic foundation</h2>
        </div>
        <div class="education-grid">
          ${common.education
            .map(
              (item) => `<article class="education-card">
                <span>${escapeHtml(item.period)}</span>
                <h3>${escapeHtml(item.degree)}</h3>
                <p class="company">${escapeHtml(item.institution)}</p>
                <p>${escapeHtml(item.detail)}</p>
              </article>`
            )
            .join("")}
        </div>
      </section>

      <section class="contact-section" id="contact">
        <div>
          <p class="eyebrow">Contact</p>
          <h2>Let’s discuss the engineering problem.</h2>
          <p>I am available for internships, working-student roles, graduate positions, and engineering collaborations aligned with this portfolio.</p>
        </div>
        <div class="contact-actions">
          <a class="button button-primary" href="mailto:${escapeHtml(
            common.email
          )}">Email me</a>
          <a class="button button-secondary" href="${escapeHtml(
            common.github
          )}" target="_blank" rel="noreferrer">GitHub ↗</a>
          <a class="button button-secondary" href="${escapeHtml(
            common.linkedin
          )}" target="_blank" rel="noreferrer">LinkedIn ↗</a>
        </div>
      </section>
    </main>

    <footer class="site-footer">
      <div><strong>${escapeHtml(common.name)}</strong><span>${escapeHtml(
    profile.title
  )}</span></div>
      <div><a href="mailto:${escapeHtml(common.email)}">${escapeHtml(
    common.email
  )}</a><span>${escapeHtml(common.location)}</span></div>
    </footer>
  `;

  document.querySelector("[data-print]").addEventListener("click", () => {
    window.print();
  });

  document.querySelectorAll('a[href^="#"]').forEach((link) => {
    link.addEventListener("click", (event) => {
      const target = document.querySelector(link.getAttribute("href"));
      if (!target) return;
      event.preventDefault();
      target.scrollIntoView({behavior: "smooth", block: "start"});
    });
  });

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) entry.target.classList.add("is-visible");
      });
    },
    {threshold: 0.12}
  );
  document
    .querySelectorAll(".project-card, .value-card, .skill-card, .timeline-item")
    .forEach((element) => observer.observe(element));
})();
