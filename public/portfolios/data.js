(function () {
  "use strict";

  const portfolioRaw = (path) =>
    encodeURI("https://raw.githubusercontent.com/EnggAmmar/Portfolio_ammar/master/" + path);
  const carlaRaw = (path) =>
    encodeURI("https://raw.githubusercontent.com/EnggAmmar/carla-adas-sensor-fusion/main/" + path);

  const common = {
    name: "Ammar Ahmed",
    location: "Erlangen, Germany",
    email: "ammarahmed.00748@gmail.com",
    phone: "+49 1556 0360166",
    github: "https://github.com/EnggAmmar",
    linkedin: "https://www.linkedin.com/in/ammar-ahmed11/",
    generalPortfolio: "https://enggammar.github.io/Portfolio_ammar/",
    resume: "/Portfolio_ammar/Ammar_Ahmed_Resume.pdf",
    education: [
      {
        degree: "M.Sc. Electromobility — E-train & Sustainable Production Technology",
        institution: "Friedrich-Alexander-Universität Erlangen–Nürnberg (FAU)",
        period: "2024 — Present",
        detail: "Coursework spans mechatronics, robot mechanisms, multibody electric drives, electrical energy storage, machine learning, and signal processing."
      },
      {
        degree: "B.E. Mechanical Engineering",
        institution: "National University of Sciences and Technology (NUST)",
        period: "2018 — 2022",
        detail: "Foundation in mechanical design, thermodynamics, manufacturing, CFD, structural analysis, and engineering experimentation."
      }
    ]
  };

  const profiles = {
    aerospace: {
      slug: "aerospace",
      eyebrow: "Aerospace Engineering Portfolio",
      title: "Aerospace Systems, Structures & Propulsion Engineer",
      summary: "I develop aerospace hardware from early architecture through CAD, simulation, prototyping, and system integration. My work spans UAV structures, liquid rocket propulsion, thermal management, ground-support equipment, and mission-driven CubeSat design.",
      accent: "#66d9ef",
      accentSoft: "rgba(102, 217, 239, 0.15)",
      targetRoles: ["Aerospace Mechanical Engineer", "UAV Structures Engineer", "Propulsion / Thermal Engineer", "Space Systems Integration Engineer"],
      metrics: [
        {value: "3+", label: "Years engineering experience"},
        {value: "4", label: "Flagship aerospace case studies"},
        {value: "CAD → CAE", label: "Simulation-led development"},
        {value: "Hardware", label: "Prototype and integration focus"}
      ],
      valueProposition: [
        {title: "System-level thinking", text: "Translate mission and interface requirements into subsystem layouts, design constraints, and verification activities."},
        {title: "Simulation with engineering purpose", text: "Use CFD, FEA, and thermal analysis to answer design questions, compare concepts, and reduce physical iteration."},
        {title: "Buildable designs", text: "Design for fabrication, assembly, electronics integration, sensor access, maintenance, and testability."}
      ],
      skills: [
        {group: "Aerospace design", items: ["UAV airframes and mechanisms", "Propellant tanks and piping interfaces", "Rocket chamber / injector / nozzle concepts", "CubeSat bus architecture", "Ground-support equipment"]},
        {group: "Simulation", items: ["ANSYS Mechanical", "ANSYS Fluent", "Structural load cases", "Aerodynamic flow analysis", "Conjugate heat transfer", "Regenerative cooling studies"]},
        {group: "CAD and realization", items: ["Creo", "SolidWorks", "Siemens NX", "CATIA", "Manufacturing drawings", "FDM prototyping", "Composite structures"]},
        {group: "Systems and software", items: ["MBSE-style decomposition", "Python", "FastAPI", "React", "Optimization workflows", "Docker"]}
      ],
      experience: [
        {
          role: "Research Officer — Mechanical Engineering",
          company: "National Aerospace Science & Technology Park (NASTP)",
          period: "Apr 2023 — Jun 2024",
          bullets: [
            "Designed mechanical systems and support hardware for aerospace and radar platforms, including structural interfaces, fixtures, equipment packaging, and thermal-management concepts.",
            "Supported conceptual verification of a LOX/RP-1 rocket engine through thermal and fluid studies for chamber, nozzle, and regenerative-cooling regions.",
            "Developed UAV demonstration platforms and scale prototypes, integrating structures, actuators, propulsion components, electronics, landing gear, and composite parts."
          ]
        },
        {
          role: "Mechanical Design Engineer — UAV Prototyping",
          company: "Aero-Vision Technologies",
          period: "Oct 2022 — Apr 2023",
          bullets: [
            "Designed foldable fixed-wing UAV structures and launch-tube deployment concepts.",
            "Prepared and operated FDM prototypes for design validation and assembly trials.",
            "Evaluated aerodynamic behavior using CFD and integrated sensors, PCBs, and flight-control hardware into compact airframes."
          ]
        }
      ],
      projects: [
        {
          title: "UAV Design, Fabrication & System Integration",
          kicker: "Structures · Aerodynamics · Prototyping",
          summary: "Development of foldable fixed-wing UAV platforms from structural CAD and aerodynamic assessment to FDM fabrication, electronics integration, and flight-ready assembly.",
          challenge: "Package a deployable aircraft structure, propulsion, flight electronics, sensors, and actuation within tight mass, volume, stiffness, and manufacturing constraints.",
          contributions: [
            "Created structural CAD and mechanism concepts for compact foldable configurations.",
            "Supported CFD evaluation of pressure, velocity, wake behavior, and stall-related performance.",
            "Produced and refined FDM prototypes, then integrated motors, propellers, avionics, sensors, landing gear, and composite structures.",
            "Used physical fit checks and assembly feedback to improve interfaces and robustness."
          ],
          relevance: "Directly relevant to UAV structures, aircraft mechanical systems, prototype engineering, and multidisciplinary aerospace integration roles.",
          tools: ["SolidWorks", "ANSYS Fluent", "FDM", "Composites", "ArduPilot"],
          images: [
            {src: portfolioRaw("src/assets/images/projects/UAV Mesh_frame.png"), alt: "Meshed UAV geometry for aerodynamic simulation", caption: "Meshed UAV geometry prepared for aerodynamic analysis."},
            {src: portfolioRaw("src/assets/images/projects/uav 3d printed structure_frame.jpg"), alt: "3D printed UAV body structure", caption: "FDM-manufactured UAV body during prototype development."},
            {src: portfolioRaw("src/assets/images/projects/UAV fabricated_frame.jpeg"), alt: "Fabricated fixed-wing UAV airframes", caption: "Fabricated and assembled fixed-wing UAV platforms."}
          ]
        },
        {
          title: "Satellite Launch Vehicle & 25 kN LOX/RP-1 Rocket Engine",
          kicker: "Propulsion · Thermal · Mechanical Architecture",
          summary: "Conceptual mechanical development of a satellite launch vehicle and liquid-propellant rocket engine, including tankage, injector and chamber architecture, nozzle design, instrumentation, and cooling studies.",
          challenge: "Create a coherent propulsion concept that manages pressure loads, extreme heat flux, propellant routing, instrumentation access, assembly interfaces, and manufacturability.",
          contributions: [
            "Developed CAD concepts for tanks, anti-slosh baffles, piping interfaces, chamber, injector, nozzle, and engine assembly.",
            "Defined sensor placement and mechanical interfaces for system monitoring and integration.",
            "Performed structural checks on pressure-containing components and thermal-fluid studies around high-temperature nozzle regions.",
            "Investigated regenerative-cooling behavior and produced physical nozzle prototypes for design review."
          ],
          relevance: "Demonstrates propulsion-system architecture, pressure hardware, thermal-fluid reasoning, and cross-disciplinary mechanical integration.",
          tools: ["Creo", "ANSYS Mechanical", "ANSYS Fluent", "CHT", "FDM"],
          images: [
            {src: portfolioRaw("src/assets/images/projects/slv render.JPG"), alt: "Satellite launch vehicle concept render", caption: "Launch-vehicle concept and external configuration."},
            {src: portfolioRaw("src/assets/images/projects/database-upgrade/rocket-25kn-engine.jpg"), alt: "25 kilonewton liquid rocket engine assembly", caption: "25 kN LOX/RP-1 engine concept assembly."},
            {src: portfolioRaw("src/assets/images/projects/database-upgrade/rocket-pathlines.jpg"), alt: "Rocket engine flow pathlines", caption: "Flow visualization supporting thermal and cooling assessment."}
          ]
        },
        {
          title: "Mission-Driven CubeSat Design Configurator",
          kicker: "Space Systems · Optimization · MBSE",
          summary: "A full-stack early-phase engineering tool that translates mission inputs into feasible CubeSat subsystem selections, budgets, architecture outputs, and explainable optimization traces.",
          challenge: "Connect mission requirements to compatible COTS payload, ADCS, EPS, OBC, communications, propulsion, thermal, and structure selections while respecting mass, power, volume, cost, and orbital constraints.",
          contributions: [
            "Defined mission and subsystem data models for remote sensing, IoT/communication, and navigation missions.",
            "Implemented greedy and mathematical optimization workflows with traceable selection logic.",
            "Built a React interface, FastAPI services, subsystem catalogs, orbital calculations, and Dockerized deployment architecture.",
            "Designed outputs for engineering review: mass/power budgets, bus size, orbit period, eclipse, cost, feasibility, and solver comparison."
          ],
          relevance: "Shows systems engineering, requirements decomposition, software-enabled engineering, trade studies, and multidisciplinary space-platform integration.",
          tools: ["React", "FastAPI", "Python", "MILP / CP-SAT", "Docker", "PostgreSQL"],
          images: [
            {src: portfolioRaw("src/assets/images/projects/database-upgrade/cubesat-configurator-01.jpg"), alt: "CubeSat design configurator architecture", caption: "Mission-driven architecture-selection concept."},
            {src: portfolioRaw("src/assets/images/projects/database-upgrade/cubesat-configurator-02.jpg"), alt: "Reconfigurable CubeSat platform", caption: "Reconfigurable CubeSat platform direction."}
          ],
          links: [{label: "GitHub repository", url: "https://github.com/EnggAmmar/CubeSat-Design-Configurator"}]
        },
        {
          title: "Aerospace Ground-Support & Electromechanical Packaging",
          kicker: "GSE · Equipment Integration · Thermal Packaging",
          summary: "Mechanical development of fixtures, antenna-support structures, electronics racks, cooling concepts, and packaged assemblies for aerospace and radar-related systems.",
          challenge: "Integrate mechanical, electrical, thermal, access, transport, and service requirements into reliable support hardware and equipment packaging.",
          contributions: [
            "Designed support frames, fixtures, antenna stands, and mechanical interfaces for subsystem installation.",
            "Developed electronics packaging and 19-inch rack concepts with airflow and heat-rejection considerations.",
            "Coordinated actuator, sensor, PCB, cable, enclosure, and maintenance-access constraints.",
            "Applied tolerancing, DFM, assembly planning, and structural verification to practical hardware."
          ],
          relevance: "Relevant to aerospace GSE, system integration, equipment design, electro-mechanical packaging, and test-rig development.",
          tools: ["Creo", "SolidWorks", "FEA", "Thermal design", "DFM"],
          workflow: ["Requirements", "Interface layout", "CAD packaging", "Structural / thermal checks", "Fabrication", "Assembly validation"]
        }
      ]
    },

    automotive: {
      slug: "automotive",
      eyebrow: "Automotive Engineering Portfolio",
      title: "ADAS, Vehicle Systems & Validation Engineer",
      summary: "I combine vehicle simulation, sensor fusion, embedded communication, validation workflows, and mechanical analysis to develop and test automotive systems from perception signals to hardware interfaces.",
      accent: "#f6c85f",
      accentSoft: "rgba(246, 200, 95, 0.15)",
      targetRoles: ["ADAS / Sensor Fusion Engineer", "Automotive System Integration Engineer", "HIL / SIL Validation Engineer", "Vehicle Simulation Engineer"],
      metrics: [
        {value: "Camera + LiDAR", label: "Real-time perception fusion"},
        {value: "CAN", label: "Embedded validation workflow"},
        {value: "SIL / HIL", label: "Fault-oriented testing"},
        {value: "CFD", label: "Vehicle aerodynamics"}
      ],
      valueProposition: [
        {title: "End-to-end signal thinking", text: "Understand the path from simulated sensors and perception outputs through communication, ECU logic, validation, and actuation interfaces."},
        {title: "Testable automotive systems", text: "Build structured, observable workflows with fault injection, pass/fail criteria, logs, and repeatable test execution."},
        {title: "Mechanical + software integration", text: "Bridge vehicle hardware, embedded electronics, simulation, data processing, and engineering analysis."}
      ],
      skills: [
        {group: "ADAS and perception", items: ["CARLA", "Camera–LiDAR fusion", "YOLOv8", "Object detection", "Pinhole projection", "Bird's-eye visualization", "AEB warning logic"]},
        {group: "Vehicle communication", items: ["CAN bus", "DBC-style signals", "ESP32", "MCP2515", "ROS2 roadmap", "SOME/IP roadmap", "Signal decoding"]},
        {group: "Validation", items: ["SIL testing", "HIL-inspired benches", "Fault injection", "Automated PASS/FAIL", "CSV logging", "Test procedures", "Root-cause troubleshooting"]},
        {group: "Engineering analysis", items: ["Python", "NumPy", "OpenCV", "PyTorch", "ANSYS Fluent", "Vehicle aerodynamics", "Power BI"]}
      ],
      experience: [
        {
          role: "Device Commissioning Engineer — Working Student",
          company: "WS Audiology GmbH",
          period: "Nov 2024 — Present",
          bullets: [
            "Execute structured subsystem and system-level validation on connected electroacoustic devices.",
            "Troubleshoot hardware, wireless, firmware, connection, and test-sequence issues using repeatable procedures.",
            "Build SQL-connected Power BI dashboards for commissioning KPIs, test outcomes, and process visibility."
          ]
        },
        {
          role: "Mechanical Design Engineer — Integrated UAV Systems",
          company: "Aero-Vision Technologies",
          period: "Oct 2022 — Apr 2023",
          bullets: [
            "Integrated mechanical structures with sensors, flight electronics, actuators, and power hardware.",
            "Used simulation and prototype testing to refine system behavior and packaging.",
            "Gained hands-on exposure to autonomous-platform control workflows through ArduPilot integration."
          ]
        }
      ],
      projects: [
        {
          title: "CARLA Camera–LiDAR ADAS Sensor Fusion Pipeline",
          kicker: "Perception · Sensor Fusion · AEB Inputs",
          summary: "A real-time ADAS perception pipeline in CARLA 0.9.16 that fuses YOLOv8 camera detections with LiDAR range measurements to produce distance-labelled objects and braking warnings.",
          challenge: "A camera identifies object class but lacks accurate depth; LiDAR provides distance but not semantic identity. The system must fuse both streams reliably in real time.",
          contributions: [
            "Spawned an ego vehicle, NPC traffic, pedestrians, RGB camera, and 16-channel LiDAR in CARLA Town10HD.",
            "Implemented YOLOv8 object detection and pinhole-model projection of LiDAR points into the camera image plane.",
            "Matched in-box LiDAR returns to detections to generate class, distance, position, and confidence outputs.",
            "Added danger-zone coloring, center-lane brake warnings, bird's-eye LiDAR visualization, and a structured ObjectList for downstream ROS2 / SOME-IP / CAN integration."
          ],
          relevance: "Directly relevant to ADAS perception, virtual validation, sensor fusion, AEB development, and simulated vehicle-system integration.",
          tools: ["CARLA 0.9.16", "YOLOv8", "Python", "NumPy", "OpenCV", "PyTorch"],
          workflow: ["CARLA world", "RGB + LiDAR", "YOLO detection", "3D→2D projection", "Fusion", "ObjectList / warning"],
          images: [{src: carlaRaw("lidar_visualization.png"), alt: "CARLA LiDAR visualization for ADAS sensor fusion", caption: "LiDAR point-cloud visualization from the CARLA perception pipeline."}],
          links: [{label: "GitHub repository", url: "https://github.com/EnggAmmar/carla-adas-sensor-fusion"}]
        },
        {
          title: "HIL-Inspired CAN Validation Platform with SIL",
          kicker: "CAN · ECU Logic · Fault Injection",
          summary: "A bench-level validation platform combining ESP32/MCP2515 CAN hardware with Python-based SIL simulation, signal decoding, fault injection, and automated verification.",
          challenge: "Validate ECU-style signals and logic without requiring a complete vehicle or expensive commercial HIL setup.",
          contributions: [
            "Built CAN hardware around ESP32 and MCP2515 modules.",
            "Simulated vehicle signals including speed, RPM, battery voltage, brake status, and coolant temperature.",
            "Implemented DBC-style decoding, fault injection, automated PASS/FAIL checks, and CSV result reporting.",
            "Structured the platform so software models and physical CAN nodes could be tested together."
          ],
          relevance: "Relevant to automotive test engineering, ECU validation, CAN communication, HIL/SIL workflows, and embedded-system integration.",
          tools: ["ESP32", "MCP2515", "CAN", "Python", "SIL", "Test automation"],
          images: [
            {src: portfolioRaw("src/assets/images/projects/database-upgrade/automotive-can-01.jpg"), alt: "ESP32 and MCP2515 CAN validation hardware", caption: "CAN hardware used for bench validation."},
            {src: portfolioRaw("src/assets/images/projects/database-upgrade/automotive-can-02.jpg"), alt: "Automotive CAN testbench wiring", caption: "Bench wiring and module integration."}
          ]
        },
        {
          title: "CFD Aerodynamic Analysis of a Towing Vehicle–Trailer",
          kicker: "Vehicle Aerodynamics · ANSYS Fluent",
          summary: "A CFD study of airflow, pressure distribution, wake interaction, and force coefficients around a towing vehicle and trailer configuration.",
          challenge: "Quantify how the tow vehicle, hitch gap, trailer frontal area, roofline, and separated wake interact to influence aerodynamic performance.",
          contributions: [
            "Prepared geometry and computational domain for the coupled vehicle–trailer system.",
            "Created the mesh, solver setup, convergence monitoring, and post-processing workflow.",
            "Analyzed recirculation, velocity acceleration, pressure buildup, wake structure, and aerodynamic coefficients.",
            "Translated simulation results into design-oriented aerodynamic observations."
          ],
          relevance: "Relevant to vehicle aerodynamics, energy efficiency, towing stability studies, CFD method development, and CAE roles.",
          tools: ["ANSYS Fluent", "CFD", "Meshing", "Aerodynamics", "Post-processing"],
          images: [
            {src: portfolioRaw("src/assets/images/projects/database-upgrade/towing-trailer-cfd-overview.png"), alt: "Vehicle trailer CFD overview", caption: "Overview of flow, pressure, and force-coefficient results."},
            {src: portfolioRaw("src/assets/images/projects/database-upgrade/towing-trailer-flow-insights.png"), alt: "Vehicle trailer aerodynamic flow insights", caption: "Wake, hitch-gap flow, and frontal pressure observations."}
          ]
        },
        {
          title: "Formula Student Engineering — NUST FSDT",
          kicker: "Vehicle Development · Team Engineering",
          summary: "Competition-oriented vehicle engineering experience involving mechanical design collaboration, subsystem iteration, manufacturing awareness, and multidisciplinary team delivery.",
          challenge: "Develop a competitive student race vehicle while balancing performance, manufacturability, reliability, rules, schedule, and cross-subsystem interfaces.",
          contributions: [
            "Contributed to mechanical development and design iteration in a structured team environment.",
            "Worked across interfaces where chassis, vehicle packaging, manufacturing, and subsystem requirements interact.",
            "Built practical understanding of design reviews, engineering trade-offs, and competition-driven delivery."
          ],
          relevance: "Shows vehicle-development motivation, team engineering, design iteration, and familiarity with motorsport-style project constraints.",
          tools: ["CAD", "Team engineering", "Vehicle packaging", "Design iteration"],
          images: [{src: portfolioRaw("src/assets/images/FSDT_1.JPG"), alt: "NUST Formula Student Development Team", caption: "Formula Student development and multidisciplinary team work."}]
        }
      ]
    },

    mechanical: {
      slug: "mechanical",
      eyebrow: "Mechanical Engineering Portfolio",
      title: "Mechanical Design, Simulation & Product Development Engineer",
      summary: "I turn engineering requirements into manufacturable hardware using CAD, FEA, CFD, thermal analysis, prototyping, and system integration. This portfolio is tailored for product design, structures, CAE, thermal, and general mechanical-development roles.",
      accent: "#8be28b",
      accentSoft: "rgba(139, 226, 139, 0.15)",
      targetRoles: ["Mechanical Design Engineer", "Structural / FEA Engineer", "CFD / Thermal Engineer", "Product Development Engineer"],
      metrics: [
        {value: "CAD → Build", label: "End-to-end product development"},
        {value: "FEA + CFD", label: "Structural and fluid simulation"},
        {value: "Thermal", label: "Electronics and high-heat systems"},
        {value: "DFM", label: "Manufacturing-aware design"}
      ],
      valueProposition: [
        {title: "Requirements into geometry", text: "Convert functional, load, interface, thermal, envelope, maintenance, and manufacturing needs into practical CAD."},
        {title: "Analysis-driven decisions", text: "Use FEA, CFD, and thermal studies to compare concepts, size components, identify risk, and document design rationale."},
        {title: "Prototype-to-production mindset", text: "Close the loop through tolerance checks, 3D printing, assembly trials, troubleshooting, and design refinement."}
      ],
      skills: [
        {group: "Mechanical design", items: ["Concept development", "3D CAD", "Assemblies", "Mechanical interfaces", "Packaging", "GD&T / tolerancing", "Manufacturing drawings"]},
        {group: "CAE", items: ["Static structural FEA", "Dynamic loading concepts", "CFD", "Conjugate heat transfer", "Thermal conduction", "Parametric studies", "Result interpretation"]},
        {group: "Product realization", items: ["DFM / DFA", "FDM 3D printing", "Fixtures and test setups", "Prototype assembly", "Composite parts", "Root-cause troubleshooting"]},
        {group: "Tools", items: ["SolidWorks", "Creo", "Siemens NX", "CATIA", "ANSYS Mechanical", "ANSYS Fluent", "MATLAB", "Python"]}
      ],
      experience: [
        {
          role: "Device Commissioning Engineer — Working Student",
          company: "WS Audiology GmbH",
          period: "Nov 2024 — Present",
          bullets: [
            "Support series-development samples through structured assembly, connection, functional, electroacoustic, and wireless validation.",
            "Troubleshoot device, PCB-level, connection, and test-process issues while maintaining procedures and technical records.",
            "Coordinate with R&D, integration, and verification teams to improve repeatability and commissioning readiness."
          ]
        },
        {
          role: "Research Officer — Mechanical Engineering",
          company: "National Aerospace Science & Technology Park (NASTP)",
          period: "Apr 2023 — Jun 2024",
          bullets: [
            "Designed load-carrying structures, support hardware, equipment packaging, fixtures, thermal-management hardware, and integrated assemblies.",
            "Performed structural, fluid, and thermal simulation for radar platforms, aerospace hardware, electronics cooling, and propulsion concepts.",
            "Applied DFM, tolerancing, prototype fabrication, and assembly feedback across complex multidisciplinary systems."
          ]
        },
        {
          role: "Mechanical Design Engineer",
          company: "Aero-Vision Technologies",
          period: "Oct 2022 — Apr 2023",
          bullets: [
            "Developed compact mechanical products and UAV structures using CAD, simulation, and iterative prototyping.",
            "Manufactured FDM prototypes in PLA and ABS and maintained printers for repeatable part production.",
            "Integrated mechanical parts with electronics, sensors, actuators, and propulsion hardware."
          ]
        }
      ],
      projects: [
        {
          title: "CFD Aerodynamic Analysis of a Towing Vehicle–Trailer",
          kicker: "CFD · External Aerodynamics · Design Insight",
          summary: "ANSYS Fluent analysis of velocity, pressure, wake behavior, convergence, and force coefficients for a coupled towing vehicle and trailer system.",
          challenge: "Build a credible CFD workflow and interpret complex flow interaction between multiple bodies, separation regions, the hitch gap, and the downstream wake.",
          contributions: [
            "Prepared geometry and computational domain, then developed the mesh and boundary-condition strategy.",
            "Monitored residuals and force coefficients to assess solution convergence.",
            "Evaluated roofline acceleration, recirculation, frontal stagnation pressure, trailer interaction, and wake development.",
            "Presented results as engineering observations and design implications rather than only contour plots."
          ],
          relevance: "Relevant to CFD, thermal-fluid, aerodynamic-development, simulation-method, and CAE positions.",
          tools: ["ANSYS Fluent", "CFD", "Meshing", "Post-processing", "Aerodynamics"],
          images: [
            {src: portfolioRaw("src/assets/images/projects/database-upgrade/towing-trailer-cfd-workflow.png"), alt: "Towing vehicle trailer CFD workflow", caption: "Geometry-to-results CFD workflow."},
            {src: portfolioRaw("src/assets/images/projects/database-upgrade/towing-trailer-results.png"), alt: "Towing vehicle trailer CFD results", caption: "Aerodynamic result summary and design takeaways."}
          ]
        },
        {
          title: "Heat-Sink Design for Multi-PCB Electronics",
          kicker: "Thermal Design · Electronics Packaging",
          summary: "Thermal-management concepts for compact multi-PCB electronics, combining packaging constraints, heat-flow paths, fin geometry, assembly access, and elevated ambient conditions.",
          challenge: "Reject component heat within a compact enclosure while preserving PCB access, mechanical interfaces, manufacturability, and acceptable component temperatures.",
          contributions: [
            "Developed multi-board heat-sink and mechanical packaging concepts.",
            "Evaluated heat-flow paths, contact interfaces, geometry variants, and airflow constraints.",
            "Balanced thermal performance against compactness, assembly, serviceability, and manufacturing considerations.",
            "Used simulation-led iteration to refine geometry and packaging direction."
          ],
          relevance: "Relevant to electronics cooling, thermal engineering, enclosure design, electro-mechanical packaging, and product development.",
          tools: ["Thermal design", "CFD", "CAD", "Electronics packaging", "DFM"],
          images: [
            {src: portfolioRaw("src/assets/images/projects/database-upgrade/thermal-heatsink-01.jpg"), alt: "Multi-PCB heat sink concept", caption: "Heat-sink and multi-board packaging concept."},
            {src: portfolioRaw("src/assets/images/projects/database-upgrade/thermal-heatsink-03.jpg"), alt: "Compact electronics thermal assembly", caption: "Compact thermal assembly for PCB hardware."}
          ]
        },
        {
          title: "Thermal Conduction Geometry Optimization Study",
          kicker: "Conduction · Parametric Comparison · Design Selection",
          summary: "A geometry comparison for operation at 70 °C ambient with a maximum component-temperature target below 110 °C, resulting in selection of a 45-degree slope concept.",
          challenge: "Select a geometry that controls component temperature under severe ambient conditions while remaining practical to manufacture and integrate.",
          contributions: [
            "Defined the thermal boundary conditions, component-temperature target, and comparison criteria.",
            "Evaluated geometry variants through conduction-focused thermal simulation.",
            "Compared temperature distribution and peak response across alternatives.",
            "Selected the 45-degree slope design based on thermal performance and engineering practicality."
          ],
          relevance: "Shows disciplined use of simulation for concept selection, traceable design decisions, and high-temperature mechanical design.",
          tools: ["ANSYS", "Thermal conduction", "Parametric study", "Design optimization"],
          images: [
            {src: portfolioRaw("src/assets/images/projects/database-upgrade/thermal-conduction-geometry.jpg"), alt: "Baseline thermal conduction geometry", caption: "Baseline geometry for the conduction study."},
            {src: portfolioRaw("src/assets/images/projects/database-upgrade/thermal-conduction-45.jpg"), alt: "Selected 45 degree thermal geometry", caption: "Selected 45-degree concept after comparison."}
          ]
        },
        {
          title: "Mechanical Interfaces & Additive Manufacturing",
          kicker: "CAD · Prototyping · Assembly Validation",
          summary: "CAD-driven development of engineering parts and interfaces, followed by FDM fabrication, fit checks, assembly trials, and iterative design refinement.",
          challenge: "Move quickly from digital geometry to functional parts while accounting for printer capability, tolerances, load paths, mating features, assembly sequence, and repeatability.",
          contributions: [
            "Designed parts and mechanical interfaces for rapid prototype validation.",
            "Prepared models for FDM production and operated printers using PLA and ABS.",
            "Performed dimensional, fit, access, and assembly checks on physical parts.",
            "Fed manufacturing and integration findings back into CAD revisions."
          ],
          relevance: "Relevant to product design, prototype engineering, fixtures, test equipment, additive manufacturing, and hands-on mechanical development.",
          tools: ["SolidWorks", "FDM", "PLA / ABS", "DFM", "Assembly validation"],
          images: [
            {src: portfolioRaw("src/assets/images/projects/database-upgrade/printing-printer-01.jpg"), alt: "Engineering 3D printer setup", caption: "FDM setup used for engineering prototypes."},
            {src: portfolioRaw("src/assets/images/projects/database-upgrade/printing-model-01.jpg"), alt: "3D printed engineering model", caption: "Printed model used for fit and design validation."}
          ]
        }
      ]
    },

    robotics: {
      slug: "robotics",
      eyebrow: "Robotics & Mechatronics Portfolio",
      title: "Robotics, Mechatronics & System Integration Engineer",
      summary: "I work at the intersection of mechanism design, control simulation, sensors, actuators, embedded interfaces, and test workflows. My strength is turning a robotic concept into a structured, testable mechatronic system.",
      accent: "#d49cff",
      accentSoft: "rgba(212, 156, 255, 0.15)",
      targetRoles: ["Robotics Engineer", "Mechatronics Engineer", "Controls / Simulation Engineer", "System Integration Engineer"],
      metrics: [
        {value: "RRP", label: "Robot mechanism design"},
        {value: "PID", label: "Control-response simulation"},
        {value: "Sensors", label: "Embedded integration"},
        {value: "Test", label: "System-level validation"}
      ],
      valueProposition: [
        {title: "Mechanism + control", text: "Connect kinematic architecture, CAD geometry, actuator placement, sensing, and control response instead of treating them as separate tasks."},
        {title: "Integration-first design", text: "Plan mechanical interfaces, wiring, electronics, access, calibration, and testability from the beginning."},
        {title: "Structured verification", text: "Use simulation, bench testing, fault isolation, and documented procedures to move from concept to reliable system behavior."}
      ],
      skills: [
        {group: "Robot mechanics", items: ["RRP / SCARA architectures", "Link and joint design", "Wearable mechanisms", "Actuator placement", "Load paths", "CAD assemblies"]},
        {group: "Control and simulation", items: ["PID concepts", "Step response", "MATLAB", "Python", "Dynamic-system reasoning", "Dashboard visualization"]},
        {group: "Embedded integration", items: ["ESP32", "PCA9685", "I2C encoders", "Servo / vibrotactile drivers", "CAN", "Sensors and PCBs"]},
        {group: "System engineering", items: ["Requirements breakdown", "Interface definition", "Prototype assembly", "Fault isolation", "Test procedures", "Human–machine constraints"]}
      ],
      experience: [
        {
          role: "Device Commissioning Engineer — Working Student",
          company: "WS Audiology GmbH",
          period: "Nov 2024 — Present",
          bullets: [
            "Validate tightly integrated electro-mechanical, wireless, and electroacoustic devices at subsystem and system level.",
            "Troubleshoot hardware, PCB, firmware, connection, and test-sequence problems using repeatable workflows.",
            "Maintain procedures and engineering records that improve traceability and verification readiness."
          ]
        },
        {
          role: "Mechanical Design / Integration Engineer",
          company: "NASTP and Aero-Vision Technologies",
          period: "Oct 2022 — Jun 2024",
          bullets: [
            "Integrated structures, motors, propellers, sensors, electronics, actuators, landing gear, and control hardware into UAV prototypes.",
            "Designed fixtures, supports, packaged assemblies, and access-conscious mechanical interfaces.",
            "Used simulation and rapid prototypes to reduce integration risk before full hardware builds."
          ]
        }
      ],
      projects: [
        {
          title: "SCARA-Style RRP Robot Arm — Mechatronic Design & PID Simulation",
          kicker: "Mechanism · Control · Visualization",
          summary: "A SCARA-style revolute–revolute–prismatic robot-arm concept combining CAD-based mechanism layout with PID response simulation and control-dashboard visualization.",
          challenge: "Define a practical robot architecture and connect mechanical motion, actuator behavior, control objectives, and response interpretation in one coherent concept.",
          contributions: [
            "Defined the RRP kinematic structure, joint arrangement, workspace concept, and CAD layout.",
            "Mapped actuator and mechanism requirements to a control-oriented simulation model.",
            "Evaluated PID response behavior and presented key response metrics in a dashboard-style interface.",
            "Created employer-facing visuals that communicate the mechanism and control concept clearly."
          ],
          relevance: "Relevant to robot mechanism design, controls, mechatronics, simulation, and multidisciplinary robotic-system development.",
          tools: ["CAD", "PID", "MATLAB / Python", "Mechatronics", "RRP kinematics"],
          images: [
            {src: portfolioRaw("src/assets/images/projects/scara-robot/scara_cad.svg"), alt: "SCARA RRP robot arm CAD model", caption: "CAD-style visualization of the RRP mechanism."},
            {src: portfolioRaw("src/assets/images/projects/scara-robot/pid_dashboard.png"), alt: "SCARA robot PID simulation dashboard", caption: "Control-response visualization for the robot-arm concept."}
          ]
        },
        {
          title: "Wearable Exoskeleton Arm Mechanical Design",
          kicker: "Human–Robot Interaction · Mechanism Design",
          summary: "Conceptual design of an upper-limb exoskeleton focused on wearable interfaces, linkages, actuator placement, load paths, alignment, and user interaction.",
          challenge: "Support assisted arm motion while respecting human joint alignment, comfort, range of motion, weight, safety, actuator packaging, and structural load transfer.",
          contributions: [
            "Developed mechanism concepts and CAD representations for the wearable arm structure.",
            "Considered joint alignment, support interfaces, actuator locations, linkage geometry, and load paths.",
            "Balanced structural function with user comfort, accessibility, adjustability, and human-machine constraints.",
            "Created concept, CAD, and realistic presentation views to communicate the design direction."
          ],
          relevance: "Relevant to wearable robotics, rehabilitation devices, mechanism design, human factors, and robotic product development.",
          tools: ["CAD", "Mechanism design", "Human factors", "Load-path design", "Prototyping"],
          images: [
            {src: portfolioRaw("src/assets/images/projects/exoskeleton/realistic_render.svg"), alt: "Realistic robotic exoskeleton arm concept", caption: "Employer-facing exoskeleton arm visualization."},
            {src: portfolioRaw("src/assets/images/projects/exoskeleton/cad_model.svg"), alt: "Exoskeleton arm CAD mechanism", caption: "CAD concept showing linkages and wearable supports."}
          ]
        },
        {
          title: "Integrated UAV Mechatronic Platform",
          kicker: "Sensors · Actuators · Structures · Flight Control",
          summary: "System-level integration of UAV mechanical structures with motors, propellers, actuators, sensors, PCBs, power components, and flight-control hardware.",
          challenge: "Make mechanical, electrical, sensing, actuation, thermal, and access requirements coexist within a compact, mass-constrained flying platform.",
          contributions: [
            "Designed compact mechanical interfaces and packaging for electronics and propulsion hardware.",
            "Integrated sensors, actuators, flight controller, wiring, landing gear, and structural parts.",
            "Used FDM prototypes and assembly trials to validate access, fit, routing, and serviceability.",
            "Supported ArduPilot-oriented system integration and physical demonstration builds."
          ],
          relevance: "Relevant to mobile robotics, autonomous platforms, mechatronics, electromechanical packaging, and system integration.",
          tools: ["CAD", "ArduPilot", "Sensors", "Actuators", "FDM", "System integration"],
          images: [
            {src: portfolioRaw("src/assets/images/projects/UAV fabricated_frame.jpeg"), alt: "Integrated UAV prototype", caption: "Fabricated UAV platform used for system-level integration."},
            {src: portfolioRaw("src/assets/images/projects/uav 3d printed structure_frame.jpg"), alt: "3D printed UAV mechanical structure", caption: "Rapid prototype supporting fit and integration checks."}
          ]
        },
        {
          title: "Embedded Test Platform for Sensor and Actuator Signals",
          kicker: "ESP32 · CAN · Automated Verification",
          summary: "A modular embedded validation concept combining physical communication hardware, simulated signals, fault injection, logging, and automated pass/fail evaluation.",
          challenge: "Verify distributed embedded behavior and communication without waiting for every final subsystem to be available.",
          contributions: [
            "Integrated ESP32 and CAN-interface hardware into a repeatable bench setup.",
            "Created simulated signal sources and structured decoding logic.",
            "Added fault injection, automated checks, logs, and verification reports.",
            "Designed the workflow so physical nodes and software models can be tested together."
          ],
          relevance: "Relevant to robotic test benches, embedded control integration, sensor validation, commissioning, and system verification.",
          tools: ["ESP32", "CAN", "Python", "Fault injection", "Automated testing"],
          images: [{src: portfolioRaw("src/assets/images/projects/database-upgrade/automotive-can-03.jpg"), alt: "Embedded validation electronics", caption: "Embedded electronics during bench validation."}]
        }
      ]
    },

    "data-analytics": {
      slug: "data-analytics",
      eyebrow: "Data Analytics & Engineering Automation Portfolio",
      title: "Data Analyst for Engineering, Testing & Automation",
      summary: "I turn engineering and operational data into decisions using Python, SQL, Power BI, statistical analysis, machine learning, signal processing, dashboards, and automated workflows.",
      accent: "#ff8fbd",
      accentSoft: "rgba(255, 143, 189, 0.15)",
      targetRoles: ["Data Analyst", "Engineering Data Analyst", "BI / Reporting Analyst", "Python Automation Engineer"],
      metrics: [
        {value: "SQL → BI", label: "Operational dashboards"},
        {value: "R² 0.984", label: "FEA-ML prediction result"},
        {value: "Python", label: "Analysis and automation"},
        {value: "EDA → Model", label: "End-to-end workflow"}
      ],
      valueProposition: [
        {title: "Engineering context", text: "Understand what measurements, test conditions, tolerances, configurations, and failure modes mean—not only how to plot them."},
        {title: "Decision-oriented analytics", text: "Build dashboards and models around operational questions, traceability, comparison, and action rather than decorative reporting."},
        {title: "Reusable automation", text: "Turn one-off analysis into reproducible pipelines, structured data models, documented scripts, and repeatable outputs."}
      ],
      skills: [
        {group: "Analytics", items: ["Exploratory data analysis", "Data cleaning", "Feature engineering", "Statistical comparison", "Time-series analysis", "KPI design", "Root-cause investigation"]},
        {group: "BI and data", items: ["Power BI", "SQL", "Data models", "Dashboards", "Test-result reporting", "CSV / JSON pipelines", "Operational metrics"]},
        {group: "Python stack", items: ["Python", "pandas", "NumPy", "scikit-learn", "SciPy", "Plotly", "Matplotlib", "FastAPI"]},
        {group: "ML and signals", items: ["Linear regression", "Random forest", "Cross-validation", "FFT filtering", "Image preprocessing", "Prediction evaluation", "Knowledge retrieval"]}
      ],
      experience: [
        {
          role: "Device Commissioning Engineer — Working Student",
          company: "WS Audiology GmbH",
          period: "Nov 2024 — Present",
          bullets: [
            "Build Power BI dashboards connected to SQL sources for commissioning KPIs, test outcomes, and process visibility.",
            "Analyze test results and recurring failure patterns to support troubleshooting and process improvement.",
            "Maintain structured test procedures and component-level records that improve data consistency and traceability."
          ]
        },
        {
          role: "Research / Mechanical Engineer",
          company: "NASTP and Aero-Vision Technologies",
          period: "Oct 2022 — Jun 2024",
          bullets: [
            "Generated, interpreted, and communicated CFD, FEA, thermal, and prototype-test outputs for engineering decisions.",
            "Used parametric analysis and comparison studies to select designs and communicate trade-offs.",
            "Connected simulation data, physical observations, and design revisions in iterative development workflows."
          ]
        }
      ],
      projects: [
        {
          title: "Cantilever Beam FEA + Machine-Learning Predictor",
          kicker: "Engineering ML · Parametric FEA",
          summary: "An engineering analytics workflow using ANSYS data from 18 parametric configurations and 4,536 nodes to predict cantilever-beam tip deformation.",
          challenge: "Determine whether machine learning can accurately predict deformation from a small, structured engineering dataset and identify which model complexity is justified.",
          contributions: [
            "Prepared and analyzed parametric FEA results across geometry and loading configurations.",
            "Trained Random Forest and Linear Regression models using scikit-learn.",
            "Evaluated performance with leave-one-out cross-validation, R², and RMSE.",
            "Achieved best performance with Linear Regression (R² = 0.984, RMSE = 0.00171 mm) and explained why the simpler model outperformed the ensemble for the available feature variation."
          ],
          relevance: "Relevant to engineering analytics, surrogate modeling, predictive simulation, ML evaluation, and data-driven product development.",
          tools: ["ANSYS Mechanical", "Python", "scikit-learn", "pandas", "Cross-validation"],
          images: [
            {src: portfolioRaw("src/assets/images/projects/beam_fea_ml.png"), alt: "FEA and machine learning beam predictor dashboard", caption: "Model performance, distributions, and feature-analysis dashboard."},
            {src: portfolioRaw("src/assets/images/projects/generated/fea-ml-beam-predictor.svg"), alt: "FEA machine learning prediction workflow", caption: "Engineering-data-to-prediction workflow."}
          ],
          links: [{label: "GitHub repository", url: "https://github.com/enggammar/cantilever-beam-fea-ml"}]
        },
        {
          title: "SQL-Connected Power BI Commissioning Dashboards",
          kicker: "BI · Test Operations · KPI Reporting",
          summary: "Operational dashboards for device commissioning and validation, connecting SQL data with Power BI to visualize test outcomes, throughput, recurring issues, and process-level KPIs.",
          challenge: "Turn distributed test records into a consistent view that helps engineering and operations understand performance, failure patterns, and bottlenecks.",
          contributions: [
            "Connected Power BI reporting to structured SQL data sources.",
            "Defined useful commissioning and validation KPIs around outcomes, repeatability, and process status.",
            "Built visuals for filtering, comparison, trend review, and issue investigation.",
            "Used domain knowledge of the test process to make the dashboard operationally meaningful."
          ],
          relevance: "Relevant to BI, manufacturing analytics, test data, operations reporting, quality dashboards, and engineering decision support.",
          tools: ["Power BI", "SQL", "Data modeling", "KPI design", "Test analytics"],
          workflow: ["Test records", "SQL model", "Data cleaning", "KPI logic", "Power BI", "Engineering action"]
        },
        {
          title: "Interactive Stock Data Dashboard",
          kicker: "Time Series · EDA · Web Dashboard",
          summary: "A FastAPI and Plotly application for fetching, transforming, comparing, and visualizing stock time-series data across Nvidia, Intel, Tesla, and Microsoft.",
          challenge: "Create a clear exploratory interface that converts raw market data into comparable trends, volume views, OHLC summaries, and allocation-style visuals.",
          contributions: [
            "Built data-fetch and transformation logic with Python and pandas.",
            "Created an API-backed workflow using FastAPI.",
            "Developed interactive Plotly charts for price trends, volume, OHLC snapshots, and distribution views.",
            "Organized the output as a portfolio-quality analytical dashboard."
          ],
          relevance: "Relevant to dashboard development, time-series analysis, API-based analytics, exploratory analysis, and data storytelling.",
          tools: ["FastAPI", "Plotly", "pandas", "Python", "Time-series EDA"],
          images: [
            {src: portfolioRaw("src/assets/images/projects/investment-stock/05_dashboard_preview_mockup.png"), alt: "Interactive stock dashboard preview", caption: "Portfolio-style market analytics dashboard."},
            {src: portfolioRaw("src/assets/images/projects/investment-stock/01_stock_price_trend.png"), alt: "Stock price trend comparison", caption: "Comparative time-series price visualization."}
          ]
        },
        {
          title: "MRI Signal Processing & Artifact Reduction Pipeline",
          kicker: "Signal Processing · Scientific Python",
          summary: "A reproducible preprocessing workflow for 3D T1-weighted NIfTI data, including noise simulation, FFT-based filtering, detrending, resampling, median artifact reduction, and normalization.",
          challenge: "Demonstrate how a medical-imaging signal can be progressively cleaned, analyzed in the frequency domain, and converted into a consistent final visualization.",
          contributions: [
            "Loaded and inspected 3D NIfTI data and extracted anatomical views.",
            "Simulated 60 Hz scanner or powerline interference and analyzed frequency-domain behavior.",
            "Applied filtering, baseline removal, downsampling, median artifact reduction, and normalization.",
            "Created before/after views and a technical workflow explaining every transformation."
          ],
          relevance: "Relevant to signal processing, scientific data analysis, image preprocessing, reproducible research, and analytical pipeline development.",
          tools: ["Python", "NumPy", "SciPy", "FFT", "NIfTI", "Image processing"],
          images: [
            {src: portfolioRaw("src/assets/images/projects/mri-processing/01_mri_portfolio_hero.png"), alt: "MRI preprocessing before and after", caption: "Raw, noisy, and processed MRI comparison."},
            {src: portfolioRaw("src/assets/images/projects/mri-processing/03_frequency_domain_analysis.png"), alt: "MRI frequency domain analysis", caption: "Frequency-domain analysis supporting filter design."}
          ]
        },
        {
          title: "Engineering Error-Resolution Chatbot Workflow",
          kicker: "Knowledge Retrieval · Automation",
          summary: "A chatbot-oriented workflow that retrieves known MATLAB and Python test errors, root causes, fixes, and verification steps from a structured engineering knowledge base.",
          challenge: "Reduce repeated debugging effort while preserving technical context, verified fixes, and team knowledge for recurring test-script failures.",
          contributions: [
            "Defined a structured schema for errors, context, root causes, fixes, related scripts, and verification notes.",
            "Designed retrieval logic for matching new error descriptions to similar resolved cases.",
            "Created the chatbot interaction and error-resolution workflow.",
            "Included a feedback path so newly solved issues improve the reusable knowledge base."
          ],
          relevance: "Relevant to analytics automation, knowledge management, support tooling, workflow optimization, and engineering productivity.",
          tools: ["Python", "Chatbots", "Knowledge retrieval", "Structured data", "Workflow design"],
          images: [
            {src: portfolioRaw("src/assets/images/projects/chatbot-workflow/02_system_architecture_v2.png"), alt: "Engineering chatbot system architecture", caption: "Architecture connecting user input, retrieval, knowledge base, and solution output."},
            {src: portfolioRaw("src/assets/images/projects/chatbot-workflow/05_chatbot_ui_mockup_v2.png"), alt: "Engineering error resolution chatbot interface", caption: "Chat interface for recurring MATLAB and Python testing errors."}
          ]
        }
      ]
    }
  };

  window.PORTFOLIO_DATA = {common, profiles};
})();
