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
  resumeLink: "Ammar_Ahmed_Resume.pdf", // Set to empty to hide the button
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
  subTitle:
    "Mechanical Design & Simulation Engineer 🚀 focused on system-level design, propulsion systems, and simulation-driven hardware development.",
  skills: [
    emoji("⚡Product Development (Concept → Market)"),
    emoji("⚡Propulsion Engines & Reconfigurable Satellite Systems"),
    emoji(
      "⚡ UAV assembly and integration, system-level manufacturing and integration for UAVs"
    ),
    emoji(
      "⚡ ANSYS Mechanical (FEA), scikit-learn, and Parametric Structural Analysis for simulation-driven ML workflows"
    )
  ],

  /* Make Sure to include correct Font Awesome Classname to view your icon
https://fontawesome.com/icons?d=gallery */

  softwareSkills: [
    {skillName: "SolidWorks", logoPath: solidworksLogo},
    {skillName: "Siemens NX", logoPath: nxLogo},
    {skillName: "CATIA v6", logoPath: catiaLogo},
    {skillName: "MATLAB", logoPath: matlabLogo},
    {skillName: "ANSYS", logoPath: ansysLogo},
    {skillName: "Python", logoPath: pythonLogo},
    {skillName: "Docker", logoPath: dockerLogo},
    {skillName: "EasyEDA", logoPath: easyedaLogo}
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
      subHeader:
        "MSc Electromobility – ACES(E-train & Sustainable Production Technology)",
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
      descBullets: [
        "Thesis: Design and Development of Food Dryer based on unique combination of novel drying techniques and heat recovery systems",
        "Published 2 research papers on Food Dyrying techniques in International Journals and secured funding from IGNITE"
      ]
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
  title: "Engineering Projects",
  subtitle:
    "Selected work grouped by engineering domain, from aerospace systems and thermal hardware to automotive validation, robotics, and data-driven engineering tools.",
  domains: [
    {
      id: "aerospace",
      name: "Aerospace",
      summary:
        "UAV systems, launch vehicle and rocket engine concepts, propulsion thermal control, and CubeSat architecture tools.",
      projects: [
        {
          id: "uav-design",
          projectName: "UAV Design, Fabrication & Integration",
          projectDesc:
            "Fixed-wing foldable UAV development covering structural CAD, aerodynamic simulation support, FDM prototyping, electronics integration, and system-level assembly for flight-ready prototypes.",
          tags: ["UAV", "CFD", "FDM prototyping", "System integration"],
          media: [
            {
              type: "video",
              src: require("./assets/images/UAV Drone Simulation.mp4"),
              alt: "UAV drone simulation",
              caption:
                "Velocity profile visualization over the UAV, including trailing-edge flow behavior and vortex generation."
            },
            {
              type: "image",
              src: require("./assets/images/projects/UAV Mesh_frame.png"),
              alt: "UAV mesh model",
              caption: "Meshed UAV geometry prepared for aerodynamic analysis."
            },
            {
              type: "image",
              src: require("./assets/images/projects/uav 3d printed structure_frame.jpg"),
              alt: "UAV 3D printed structure",
              caption: "3D printed UAV body before final assembly."
            },
            {
              type: "image",
              src: require("./assets/images/projects/UAV fabricated_frame.jpeg"),
              alt: "UAV fabricated airframe",
              caption: "Assembled fixed-wing foldable UAV airframes."
            },
            {
              type: "image",
              src: require("./assets/images/projects/database-upgrade/uav-wings.jpg"),
              alt: "UAV wing structure",
              caption:
                "UAV wing structure and fabrication reference from the project archive."
            }
          ]
        },
        {
          id: "launch-vehicle",
          projectName: "Satellite Launch Vehicle & 25 kN Rocket Engine",
          projectDesc:
            "Conceptual development of a satellite launch vehicle and cryogenic liquid-propellant engine system using LOX/RP-1 architecture. Work included propellant tanks, anti-slosh baffles, piping interfaces, coaxial swirl injector concepts, engine assembly CAD, sensor placement, ANSYS tank stress checks, and regenerative cooling studies for high-temperature nozzle regions.",
          tags: [
            "SLV",
            "25 kN engine",
            "LOX/RP-1",
            "Regenerative cooling",
            "ANSYS Fluent"
          ],
          media: [
            {
              type: "image",
              src: require("./assets/images/projects/slv render.JPG"),
              alt: "Satellite launch vehicle render",
              caption: "Satellite launch vehicle concept render."
            },
            {
              type: "image",
              src: require("./assets/images/projects/database-upgrade/rocket-25kn-engine.jpg"),
              alt: "25 kN liquid rocket engine concept",
              caption: "25 kN liquid rocket engine concept assembly."
            },
            {
              type: "image",
              src: require("./assets/images/projects/database-upgrade/rocket-cut-model.jpg"),
              alt: "Rocket engine cut model",
              caption:
                "Cut-model view for chamber, injector, nozzle, and internal layout communication."
            },
            {
              type: "image",
              src: require("./assets/images/projects/database-upgrade/rocket-pathlines.jpg"),
              alt: "Rocket engine flow pathlines simulation",
              caption:
                "Flow visualization used to evaluate internal fluid behavior and thermal loading."
            },
            {
              type: "image",
              src: require("./assets/images/projects/database-upgrade/rocket-track.jpg"),
              alt: "Rocket engine thermal simulation track",
              caption:
                "Simulation result view supporting regenerative cooling and wall-temperature assessment."
            },
            {
              type: "image",
              src: require("./assets/images/projects/database-upgrade/rocket-nozzle-printed.jpg"),
              alt: "3D printed rocket engine nozzle",
              caption: "3D printed nozzle prototype for physical design review."
            }
          ]
        },
        {
          id: "cubesat-platform",
          projectName: "CubeSat Design Configurator & 3U Platform",
          projectDesc:
            "A mission-driven CubeSat design configurator for early-phase architecture decisions across remote sensing, IoT/communication, and navigation missions. The tool uses a React frontend, FastAPI backend, subsystem databases, and CP-SAT optimization to select feasible platform, power, ADCS, onboard computer, communication, and thermal subsystem options with explainable solver traces.",
          tags: ["CubeSat", "MBSE", "CP-SAT", "React", "FastAPI", "Docker"],
          media: [
            {
              type: "image",
              src: require("./assets/images/projects/database-upgrade/cubesat-configurator-01.jpg"),
              alt: "CubeSat design configurator architecture",
              caption:
                "CubeSat configurator concept for mission-driven architecture selection."
            },
            {
              type: "image",
              src: require("./assets/images/projects/database-upgrade/cubesat-configurator-02.jpg"),
              alt: "CubeSat platform visualization",
              caption:
                "Reconfigurable 3U CubeSat platform direction for IoT, Earth observation, and communication missions."
            }
          ]
        }
      ]
    },
    {
      id: "mechanical",
      name: "Mechanical",
      summary:
        "Mechanical interfaces, electromechanical packaging, additive manufacturing, heat sinks, and thermal simulation studies.",
      projects: [
        {
          id: "mechanical-interfaces",
          projectName: "Mechanical Interface Design & Additive Manufacturing",
          projectDesc:
            "Mechanical interface and prototype development using CAD-driven design, FDM manufacturing, printer operation, fit checks, assembly refinement, and physical validation of printed engineering parts.",
          tags: [
            "Mechanical interfaces",
            "3D printing",
            "CAD",
            "Assembly",
            "Prototyping"
          ],
          media: [
            {
              type: "video",
              src: require("./assets/3d_print_1.mp4"),
              alt: "3D printing process video",
              muted: true,
              caption: "FDM printing process for engineering prototype parts."
            },
            {
              type: "image",
              src: require("./assets/images/projects/database-upgrade/printing-printer-01.jpg"),
              alt: "3D printer setup",
              caption: "3D printer setup used for prototype fabrication."
            },
            {
              type: "image",
              src: require("./assets/images/projects/database-upgrade/printing-printer-02.jpg"),
              alt: "3D printer operation",
              caption: "Printer operation and build setup during fabrication."
            },
            {
              type: "image",
              src: require("./assets/images/projects/database-upgrade/printing-model-01.jpg"),
              alt: "3D printed model",
              caption:
                "Printed model used for design review and fit validation."
            }
          ]
        },
        {
          id: "electromechanical-systems",
          projectName: "Electromechanical System Development",
          projectDesc:
            "System-level mechanical development involving packaged assemblies, component positioning, actuator and sensor accommodation, and design coordination across mechanical and electrical interfaces.",
          tags: ["Electromechanical", "Packaging", "Actuators", "Sensors"],
          media: [
            {
              type: "image",
              src: require("./assets/images/projects/generated/electromechanical-systems.svg"),
              alt: "Electromechanical system development illustration",
              caption:
                "Generated visual showing electromechanical packaging, actuator, sensor, PCB, and harness integration."
            }
          ]
        },
        {
          id: "heat-sink-design",
          projectName: "Heat Sink Design for Multi-PCB Electronics",
          projectDesc:
            "Thermal-management work for electronics packaging, including multi-PCB heat-sink concepts and simulation-informed geometry decisions for compact hardware operating under elevated ambient conditions.",
          tags: ["Heat sink", "Thermal design", "Electronics cooling", "CFD"],
          media: [
            {
              type: "image",
              src: require("./assets/images/projects/database-upgrade/thermal-heatsink-01.jpg"),
              alt: "Multi PCB heat sink concept",
              caption: "Multi-PCB heat sink concept and packaging layout."
            },
            {
              type: "image",
              src: require("./assets/images/projects/database-upgrade/thermal-heatsink-02.jpg"),
              alt: "Heat sink model detail",
              caption: "Heat sink model detail for electronics cooling."
            },
            {
              type: "image",
              src: require("./assets/images/projects/database-upgrade/thermal-heatsink-03.jpg"),
              alt: "Heat sink assembly",
              caption: "Thermal assembly view for compact PCB hardware."
            }
          ]
        },
        {
          id: "thermal-conduction-study",
          projectName: "Thermal Conduction Geometry Study",
          projectDesc:
            "Thermal conduction study for an industrial/military ambient condition of 70 C, targeting a maximum component temperature below 110 C. Geometry variants were compared, and the 45-degree slope part was selected from the study results.",
          tags: ["Thermal simulation", "Conduction", "ANSYS", "Design study"],
          media: [
            {
              type: "image",
              src: require("./assets/images/projects/database-upgrade/thermal-conduction-geometry.jpg"),
              alt: "Thermal conduction study geometry",
              caption: "Baseline geometry used for conduction study setup."
            },
            {
              type: "image",
              src: require("./assets/images/projects/database-upgrade/thermal-conduction-45.jpg"),
              alt: "45 degree slope thermal design",
              caption:
                "Selected 45-degree slope part after thermal design comparison."
            }
          ]
        }
      ]
    },
    {
      id: "automotive",
      name: "Automotive",
      summary:
        "Automotive validation, CAN communication, SIL/HIL-inspired test workflows, and Formula Student engineering.",
      projects: [
        {
          id: "can-sil-validation",
          projectName: "HIL-Inspired CAN Validation Platform with SIL",
          projectDesc:
            "Automotive ECU validation platform combining ESP32/MCP2515 CAN hardware with a Python SIL extension. The software layer simulates CAN messages, ECU logic, DBC-style signal decoding, fault injection, automated PASS/FAIL tests, and CSV reporting for signals such as vehicle speed, RPM, battery voltage, brake status, and coolant temperature.",
          tags: [
            "CAN bus",
            "SIL",
            "HIL-inspired",
            "ESP32",
            "MCP2515",
            "Python"
          ],
          media: [
            {
              type: "image",
              src: require("./assets/images/projects/database-upgrade/automotive-can-01.jpg"),
              alt: "Automotive CAN validation hardware",
              caption: "ESP32 and MCP2515 hardware setup for CAN validation."
            },
            {
              type: "image",
              src: require("./assets/images/projects/database-upgrade/automotive-can-02.jpg"),
              alt: "CAN testbench wiring",
              caption: "Hardware CAN testbench wiring and module layout."
            },
            {
              type: "image",
              src: require("./assets/images/projects/database-upgrade/automotive-can-03.jpg"),
              alt: "CAN validation electronics",
              caption: "CAN validation electronics during bench testing."
            },
            {
              type: "image",
              src: require("./assets/images/projects/database-upgrade/automotive-can-04.jpg"),
              alt: "CAN validation setup",
              caption: "CAN validation setup prepared for SIL/HIL workflow."
            }
          ]
        },
        {
          id: "fsdt",
          projectName: "Formula Student Development Team, NUST FSDT",
          projectDesc:
            "Automotive engineering team work supporting Formula Student development through mechanical design collaboration, subsystem iteration, and competition-oriented engineering practice.",
          tags: ["Formula Student", "Automotive", "Team engineering"],
          media: [
            {
              type: "image",
              src: require("./assets/images/FSDT_1.JPG"),
              alt: "NUST Formula Student Development Team",
              caption: "NUST Formula Student Development Team project work."
            }
          ]
        }
      ]
    },
    {
      id: "robotics",
      name: "Robotics",
      summary:
        "Control design, electronic schematic design, robot mechanism coursework, and exoskeleton-arm concepts.",
      projects: [
        {
          id: "robotic-control",
          projectName:
            "SCARA-Style RRP Robot Arm: Mechatronic Design & PID Simulation",
          projectDesc:
            "Designed and simulated a SCARA-style RRP robot arm concept focused on mechatronic architecture, revolute-revolute-prismatic motion, CAD-based mechanism layout, and PID control behavior. The project combines mechanical structure planning with control-loop simulation and dashboard-style response visualization.",
          tags: [
            "SCARA robot",
            "RRP mechanism",
            "PID simulation",
            "Mechatronics",
            "CAD Design"
          ],
          media: [
            {
              type: "image",
              src: require("./assets/images/projects/scara-robot/scara_cad.svg"),
              alt: "CAD model of SCARA-style RRP robot arm",
              contain: true,
              caption:
                "CAD-style visualization of the SCARA RRP robot arm mechanism and joint layout."
            },
            {
              type: "image",
              src: require("./assets/images/projects/scara-robot/pid_dashboard.png"),
              alt: "PID simulation dashboard for SCARA-style robot arm",
              contain: true,
              caption:
                "PID simulation dashboard showing control response behavior for the robot arm concept."
            },
            {
              type: "image",
              src: require("./assets/images/projects/scara-robot/scara_sketch.svg"),
              alt: "Concept sketch of SCARA-style RRP robot arm",
              contain: true,
              caption:
                "Initial SCARA-style RRP robot arm sketch used to define the mechanism concept."
            }
          ]
        },
        {
          id: "exoskeleton-arm",
          projectName: "Exoskeleton Arm Mechanical Design",
          projectDesc:
            "Conceptual mechanical design direction for an exoskeleton arm, including wearable interfaces, load paths, actuator placement, and human-machine interaction constraints.",
          tags: ["Exoskeleton", "Wearable robotics", "Mechanical design"],
          media: [
            {
              type: "image",
              src: require("./assets/images/projects/exoskeleton/realistic_render.svg"),
              alt: "Realistic render of robotic exoskeleton arm",
              contain: true,
              caption:
                "Realistic visualization of the robotic exoskeleton arm concept for employer-facing portfolio presentation."
            },
            {
              type: "image",
              src: require("./assets/images/projects/exoskeleton/sketch.svg"),
              alt: "Initial concept sketch of robotic exoskeleton arm",
              contain: true,
              caption: "Initial concept sketch of the robotic exoskeleton arm."
            },
            {
              type: "image",
              src: require("./assets/images/projects/exoskeleton/cad_model.svg"),
              alt: "CAD model of robotic exoskeleton arm mechanism",
              contain: true,
              caption:
                "CAD model showing the exoskeleton arm mechanism, linkages, and wearable support structure."
            }
          ]
        }
      ]
    },
    {
      id: "data-analysis",
      name: "Data Analysis",
      summary:
        "EDA, machine learning, dashboards, engineering data workflows, CAD automation, and chatbot-oriented automation.",
      projects: [
        {
          id: "fea-ml-beam-predictor",
          projectName: "Cantilever Beam FEA + ML Predictor",
          projectDesc:
            "ANSYS FEA simulation of a cantilever beam across 18 parametric configurations (4536 nodes). Trained Random Forest and Linear Regression models to predict tip deformation from design parameters. Best model: Linear Regression R2=0.984, RMSE=0.00171 mm (LOO-CV). Key insight: when only 1 of 4 features varies, simpler models outperform ensembles.",
          tags: [
            "ANSYS Mechanical",
            "FEA",
            "scikit-learn",
            "Random Forest",
            "Linear Regression",
            "Parametric Analysis"
          ],
          media: [
            {
              type: "image",
              src: require("./assets/images/projects/beam_fea_ml.png"),
              alt: "Cantilever beam FEA and machine learning dashboard summary",
              contain: true,
              caption:
                "Dashboard summary of FEA distributions, model comparison, feature analysis, and prediction performance."
            },
            {
              type: "image",
              src: require("./assets/images/projects/generated/fea-ml-beam-predictor.svg"),
              alt: "FEA machine learning beam deformation predictor illustration",
              contain: true,
              caption:
                "Generated visual showing FEA beam data, deformation behavior, and actual-versus-predicted ML results."
            }
          ],
          footerLink: [
            {
              name: "Project Page",
              url: "/Portfolio_ammar/projects/beam-fea-ml/"
            },
            {
              name: "GitHub",
              url: "https://github.com/enggammar/cantilever-beam-fea-ml"
            }
          ]
        },
        {
          id: "stock-dashboard",
          projectName: "Interactive Stock Data Dashboard",
          projectDesc:
            "FastAPI and Plotly dashboard for comparing stock time-series data across Nvidia, Intel, Tesla, and Microsoft. The project fetches market data, transforms it with pandas, and renders interactive line and pie charts for exploratory analysis.",
          tags: ["FastAPI", "Plotly", "Pandas", "EDA", "Dashboard"],
          media: [
            {
              type: "image",
              src: require("./assets/images/projects/investment-stock/05_dashboard_preview_mockup.png"),
              alt: "Interactive stock data dashboard preview mockup",
              contain: true,
              caption:
                "Dashboard preview showing portfolio-style stock analytics and interactive market visualization layout."
            },
            {
              type: "image",
              src: require("./assets/images/projects/investment-stock/01_stock_price_trend.png"),
              alt: "Stock price trend line chart",
              contain: true,
              caption:
                "Stock price trend chart comparing selected companies over time."
            },
            {
              type: "image",
              src: require("./assets/images/projects/investment-stock/02_trading_volume.png"),
              alt: "Stock trading volume chart",
              contain: true,
              caption:
                "Trading volume visualization used for exploratory market analysis."
            },
            {
              type: "image",
              src: require("./assets/images/projects/investment-stock/03_ohlc_snapshot.png"),
              alt: "OHLC stock data snapshot chart",
              contain: true,
              caption:
                "OHLC snapshot summarizing open, high, low, and close values."
            },
            {
              type: "image",
              src: require("./assets/images/projects/investment-stock/04_globalization_donut.png"),
              alt: "Globalization donut chart for stock dashboard",
              contain: true,
              caption:
                "Donut chart component used in the dashboard analytics view."
            }
          ]
        },
        {
          id: "cad-webxr-automation",
          projectName: "MRI Signal Processing and Artifact Reduction Pipeline",
          projectDesc:
            "Built a reproducible MRI preprocessing workflow that loads a 3D T1-weighted NIfTI volume, extracts an anatomical slice, simulates 60 Hz scanner or powerline noise, applies frequency-domain filtering, removes baseline trends, downsamples the image, applies median artifact reduction, and normalizes the final result for visualization.",
          tags: [
            "Python",
            "NumPy",
            "SciPy",
            "FFT",
            "NIfTI",
            "MRI preprocessing"
          ],
          media: [
            {
              type: "image",
              src: require("./assets/images/projects/mri-processing/01_mri_portfolio_hero.png"),
              alt: "MRI signal processing before and after portfolio hero",
              contain: true,
              caption:
                "Before-and-after MRI preprocessing result showing raw, noisy, and cleaned slice output."
            },
            {
              type: "image",
              src: require("./assets/images/projects/mri-processing/02_processing_step_montage.png"),
              alt: "MRI processing step montage",
              contain: true,
              caption:
                "Step-by-step montage of the MRI preprocessing and artifact reduction pipeline."
            },
            {
              type: "image",
              src: require("./assets/images/projects/mri-processing/03_frequency_domain_analysis.png"),
              alt: "MRI frequency domain analysis",
              contain: true,
              caption:
                "Fourier-domain analysis used to explain frequency filtering behavior."
            },
            {
              type: "image",
              src: require("./assets/images/projects/mri-processing/04_orthogonal_mri_views.png"),
              alt: "Orthogonal MRI anatomical views",
              contain: true,
              caption:
                "Axial, coronal, and sagittal MRI views used for anatomical context."
            },
            {
              type: "image",
              src: require("./assets/images/projects/mri-processing/05_technical_workflow_diagram.png"),
              alt: "MRI signal processing technical workflow diagram",
              contain: true,
              caption:
                "Technical workflow diagram for loading, noise simulation, filtering, detrending, resampling, and normalization."
            },
            {
              type: "image",
              src: require("./assets/images/projects/mri-processing/06_raw_mri_slice_clean.png"),
              alt: "Raw MRI slice",
              contain: true,
              caption:
                "Raw T1-weighted MRI slice before synthetic noise injection."
            },
            {
              type: "image",
              src: require("./assets/images/projects/mri-processing/07_noisy_mri_slice_clean.png"),
              alt: "Noisy MRI slice",
              contain: true,
              caption:
                "MRI slice after synthetic 60 Hz scanner or powerline noise simulation."
            },
            {
              type: "image",
              src: require("./assets/images/projects/mri-processing/08_final_processed_slice_clean.png"),
              alt: "Final processed MRI slice",
              contain: true,
              caption:
                "Final processed MRI slice after filtering, detrending, median artifact reduction, and normalization."
            }
          ]
        },
        {
          id: "chatbot-automation",
          projectName: "Chatbots & Engineering Workflow Automation",
          projectDesc:
            "Chatbot and automation-oriented project direction for structured technical workflows, documentation support, and engineering knowledge retrieval.",
          tags: ["Chatbots", "Automation", "Knowledge workflows"],
          media: [
            {
              type: "image",
              src: require("./assets/images/projects/generated/chatbot-automation.svg"),
              alt: "Chatbot and engineering workflow automation illustration",
              caption:
                "Generated visual showing chatbot-driven knowledge workflows, documentation support, and structured automation."
            }
          ]
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
