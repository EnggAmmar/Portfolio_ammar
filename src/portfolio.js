/* Change this file to get your personal Portfolio */

// To change portfolio colors globally go to the  _globalColor.scss file

import emoji from "react-easy-emoji";
import splashAnimation from "./assets/lottie/splashAnimation"; // Rename to your file name for custom animation
import solidworksLogo from "./assets/images/solidworks.png";
import nxLogo from "./assets/images/nx.png";
import catiaLogo from "./assets/images/catia.png";
import matlabLogo from "./assets/images/matlab.png";
import ansysLogo from "./assets/images/ansys.png";
import pythonLogo from "./assets/images/python.png";
import dockerLogo from "./assets/images/docker.png";
import easyedaLogo from "./assets/images/easyeda-thumbnail.png";


// Splash Screen

const splashScreen = {
  enabled: true, // set false to disable splash screen
  animation: splashAnimation,
  duration: 2000 // Set animation duration as per your animation
};

// Summary And Greeting Section

const illustration = {
  animated: true // Set to false to use static SVG
};

const greeting = {
  username: "Ammar Ahmed",
  title: "Hi all, I'm Ammar",
  subTitle: emoji(
    "A Mechanical Design & Simulation Engineer 🚀 with hands-on experience in aerospace systems, rocket propulsion, UAV structures, and simulation-driven product development. Skilled in CAD, FEA, CFD, and turning complex concepts into validated, manufacturable hardware."
  ),
  resumeLink:
    "Ammar_Ahmed_Resume.pdf", // Set to empty to hide the button
  displayGreeting: true // Set false to hide this section, defaults to true
};

// Social Media Links

const socialMediaLinks = {
  github: "https://github.com/EnggAmmar",
  linkedin: "https://www.linkedin.com/in/ammar-ahmed11/",
  gmail: "ammarahmed.00748@gmail.com",
  facebook: "https://www.facebook.com/Ammar0078/",
  medium: "https://medium.com/@ammarbusy2", 
  // Instagram, Twitter and Kaggle are also supported in the links!
  // To customize icons and social links, tweak src/components/SocialMedia
  display: true // Set true to display this section, defaults to false
};

// Skills Section

const skillsSection = {
  title: "What I do",
  subTitle: "Mechanical Design & Simulation Engineer 🚀 focused on system-level design, propulsion systems, and simulation-driven hardware development.",
  skills: [
    emoji(
      "⚡Product Development (Concept → Market)"
    ),
    emoji("⚡Propulsion Engines & Reconfigurable Satellite Systems"),
    emoji(
      "⚡ UAV assembly and integration, system-level manufacturing and integration for UAVs"
    )
  ],

  /* Make Sure to include correct Font Awesome Classname to view your icon
https://fontawesome.com/icons?d=gallery */

  softwareSkills: [
  { skillName: "SolidWorks", logoPath: solidworksLogo },
  { skillName: "Siemens NX", logoPath: nxLogo },
  { skillName: "CATIA v6", logoPath: catiaLogo },
  { skillName: "MATLAB", logoPath: matlabLogo },
  { skillName: "ANSYS", logoPath: ansysLogo },
  { skillName: "Python", logoPath: pythonLogo },
  { skillName: "Docker", logoPath: dockerLogo },
  { skillName: "EasyEDA", logoPath: easyedaLogo }
],
  display: true // Set false to hide this section, defaults to true
};

// Education Section

const educationInfo = {
  display: true, // Set false to hide this section, defaults to true
  schools: [
    {
      schoolName: "Friedrich-Alexander-Universität Erlangen–Nürnberg (FAU)",
      logo: require("./assets/images/FAU.png"),
      subHeader: "MSc Electromobility – ACES(E-train & Sustainable Production Technology)",
      duration: "October 2024 - Current",
      desc: "Focused on system-level design with a strong emphasis on sustainable, simulation-driven engineering.",
      descBullets: [
        "Thesis: Reconfigurable 3U CubeSat Platform for IoT, Earth Observation, and Communication Missions",
        "Relevant Coursework: Mecahtronics Component & Systems, Robot Mechanism and User Interface, Multibody Electric Drives, Electrical Energy Storage Systems, Machine Learning for Engineers, Signal Processing"
      ]
    },
    {
      schoolName: "National University of Sciences and Technology (NUST)",
      logo: require("./assets/images/nust.png"),
      subHeader: "Bachelor Engineering in Mechanical Engineering",
      duration: "September 2018 - June 2022",
      desc: "Developed foundation in mechanical design, thermodynamics, CFD, and structural analysis.",
      descBullets: ["Thesis: Design and Development of Food Dryer based on unique combination of novel drying techniques and heat recovery systems",
      "Published 2 research papers on Food Dyrying techniques in International Journals and secured funding from IGNITE",]
    }
  ]
};

// Your top 3 proficient stacks/tech experience

const techStack = {
  viewSkillBars: true, //Set it to true to show Proficiency Section
  experience: [
    {
      Stack: "3D Modelling & Simulation", //Insert stack or technology you have experience in
      progressPercentage: "95%" //Insert relative proficiency in percentage
    },
    {
      Stack: "3D Printing Operations and Maintenance",
      progressPercentage: "90%"
    },
    {
      Stack: "UAV Fabrication and Integration",
      progressPercentage: "90%"
    }
  ],
  displayCodersrank: false // Set true to display codersrank badges section need to changes your username in src/containers/skillProgress/skillProgress.js:17:62, defaults to false
};

// Work experience section

const workExperiences = {
  display: true, //Set it to true to show workExperiences Section
  experience: [
    {
      role: "Device Commissioning Engineer (Working Student)",
      company: "WS Audiology GmbH, Germany",
      companylogo: require("./assets/images/wsa.jpg"),
      date: "Nov 2024 – Present",
      
      descBullets: [
        "Supported development and validation of hearing aid samples through structured subsystem and system-level testing.",
        "Created and maintained technical documentation, test procedures, and component-level records supporting series development.",
        "Built Power BI dashboards connected to SQL databases to visualize test results and evaluate performance metrics."
      ]

    },
    {
      role: "Research Officer (Mechanical Engineer)",
      company: "National Aerospace Science & Technology Park (NASTP), Pakistan",
      companylogo: require("./assets/images/nastp.jpg"),
      date: "Apr 2023 – Jun 2024",
      descBullets: [
        "Manufactured and assembled UAV prototypes at scale for testing, supporting iterative development before next-stage builds.",
        "Built full demonstration drone models for pitching, including integration of electronics, propellers, actuators, landing gear, and structural components.",
        "Supported transition toward glass fiber reinforced composite structures, improving prototype robustness for the next development phase.",
        "Performed structural validation under aerodynamic and operational loading conditions to ensure component reliability."
      ]
    },
    {
      role: "Mechanical Design Engineer (UAV Prototyping)",
      company: "Aero-Vision Technologies, Pakistan",
      companylogo: require("./assets/images/avt.jpg"),
      date: "Oct 2022 – Apr 2023",
      descBullets: [
        "Designed foldable fixed-wing UAV structures and launch-tube deployment concepts for remote-area operations.",
        "Produced UAV prototypes using FDM 3D printing (PLA, ABS), including CAD pre-processing and printer operation/maintenance.",
        "Conducted CFD analysis to evaluate velocity/pressure profiles and estimate stall angle behavior for aerodynamic validation.",
        "Integrated mechanical assemblies with electronics and sensors; gained hands-on exposure to ArduPilot flight control workflows."
      ]
    }
  ]
};

/* Your Open Source Section to View Your Github Pinned Projects
To know how to get github key look at readme.md */

const openSource = {
  showGithubProfile: "true", // Set true or false to show Contact profile using Github, defaults to true
  display: false // Set false to hide this section, defaults to true
};

// Some big projects you have worked on

const bigProjects = {
  title: "Big Projects",
  subtitle: "",
  projects: [
    {
      id: "uav-design",
      projectName: "UAV Design, Fabrication & Integration",
      projectDesc:
        "Design and development of fixed-wing foldable UAVs, covering structural design, component integration, and system-level manufacturing for flight-ready prototypes.",
      media: [
        {
          type: "video",
          src: require("./assets/images/UAV Drone Simulation.mp4"),
          alt: "UAV drone simulation",
          caption:
            "Velocity profile of air over the UAV for visualization of trailing edges, vortex generation"
        },
        {
          type: "image",
          src: require("./assets/images/projects/UAV Mesh_frame.png"),
          alt: "UAV mesh model",
          caption: "Meshed geometry of a UAV"
        },
        {
          type: "image",
          src: require("./assets/images/projects/uav 3d printed structure_frame.jpg"),
          alt: "UAV 3D printed structure",
          caption: "3D Printed Body of UAV before assembly"
        },
        {
          type: "image",
          src: require("./assets/images/projects/UAV fabricated_frame.jpeg"),
          alt: "UAV fabricated airframe",
          caption: "3D printed and assembled Fixed-wing Foldable UAVs"
        }
      ]
    },
    {
      id: "rocket-concepts",
      projectName: "Conceptual Development of Launch Vehicle and Rocket Engines",
      projectDesc:
        "Concept development of engine layout, injector, chamber, nozzle, and integration considerations for launch vehicle systems.",
      media: [
        {
          type: "image",
          src: require("./assets/images/projects/slv render.JPG"),
          alt: "Launch vehicle render",
          caption: ""
        },
        {
          type: "image",
          src: require("./assets/images/projects/rocket engine_2.jpg"),
          alt: "Rocket engine concept",
          caption: ""
        },
        {
          type: "image",
          src: require("./assets/images/projects/rocket engine_3.jpg"),
          alt: "Rocket engine concept detail",
          caption: ""
        }
      ]
    },
    {
      id: "3d-printing",
      projectName: "3D Printing",
      projectDesc: "",
      media: [
        {
          type: "video",
          src: require("./assets/3d_print_1.mp4"),
          alt: "3D printing process video",
          muted: true,
          caption: ""
        },
        {
          type: "image",
          src: require("./assets/images/projects/3d_print_2_frame.png"),
          alt: "3D printed part close-up",
          caption: ""
        },
        {
          type: "image",
          src: require("./assets/images/projects/3d_print_3_frame.png"),
          alt: "3D printed part assembly",
          caption: ""
        }
      ]
    },
    {
      id: "fsdt",
      projectName: "Formula Student Development Team, NUST FSDT",
      projectDesc: "",
      media: [
        {
          type: "image",
          src: require("./assets/images/FSDT_1.JPG"),
          alt: "NUST Formula Student Development Team",
          caption: ""
        }
      ]
    }
  ],
  display: true // Set false to hide this section, defaults to true
};

// Achievement Section
// Include certificates, talks etc

const achievementSection = {
  title: "Research Papers",
  subtitle: "Selected publications and research contributions.",
  achievementsCards: [],
  display: false // Set false to hide this section, defaults to true
};

// Blogs Section

const blogSection = {
  title: "Blogs",
  subtitle:
    "With Love for Developing cool stuff, I love to write and teach others what I have learnt.",
  displayMediumBlogs: "true", // Set true to display fetched medium blogs instead of hardcoded ones
  blogs: [
    {
      url: "https://blog.usejournal.com/create-a-google-assistant-action-and-win-a-google-t-shirt-and-cloud-credits-4a8d86d76eae",
      title: "Win a Google Assistant Tshirt and $200 in Google Cloud Credits",
      description:
        "Do you want to win $200 and Google Assistant Tshirt by creating a Google Assistant Action in less then 30 min?"
    },
    {
      url: "https://medium.com/@saadpasta/why-react-is-the-best-5a97563f423e",
      title: "Why REACT is The Best?",
      description:
        "React is a JavaScript library for building User Interface. It is maintained by Facebook and a community of individual developers and companies."
    }
  ],
  display: false // Set false to hide this section, defaults to true
};

// Talks Sections

const talkSection = {
  title: "TALKS",
  subtitle: emoji(
    "I LOVE TO SHARE MY LIMITED KNOWLEDGE AND GET A SPEAKER BADGE 😅"
  ),

  talks: [
    {
      title: "Build Actions For Google Assistant",
      subtitle: "Codelab at GDG DevFest Karachi 2019",
      slides_url: "https://bit.ly/saadpasta-slides",
      event_url: "https://www.facebook.com/events/2339906106275053/"
    }
  ],
  display: false // Set false to hide this section, defaults to true
};

// Podcast Section

const podcastSection = {
  title: emoji("Podcast 🎙️"),
  subtitle: "I LOVE TO TALK ABOUT MYSELF AND TECHNOLOGY",

  // Please Provide with Your Podcast embeded Link
  podcast: [
    "https://anchor.fm/codevcast/embed/episodes/DevStory---Saad-Pasta-from-Karachi--Pakistan-e9givv/a-a15itvo"
  ],
  display: false // Set false to hide this section, defaults to true
};

// Resume Section
const resumeSection = {
  title: "Resume",
  subtitle: "Feel free to download my resume",

  // Please Provide with Your Podcast embeded Link
  display: true // Set false to hide this section, defaults to true
};

const contactInfo = {
  title: emoji("Contact Me ☎️"),
  subtitle:
    "Discuss a project or just want to say hi? My Inbox is open for all.",
  number: "+49 1556 0360166",
  email_address: "ammarahmed.00748@gmail.com"
};

// Twitter Section

const twitterDetails = {
  userName: "twitter", //Replace "twitter" with your twitter username without @
  display: true // Set true to display this section, defaults to false
};

const isHireable = false; // Set false if you are not looking for a job. Also isHireable will be display as Open for opportunities: Yes/No in the GitHub footer

export {
  illustration,
  greeting,
  socialMediaLinks,
  splashScreen,
  skillsSection,
  educationInfo,
  techStack,
  workExperiences,
  openSource,
  bigProjects,
  achievementSection,
  blogSection,
  talkSection,
  podcastSection,
  contactInfo,
  twitterDetails,
  isHireable,
  resumeSection
};
