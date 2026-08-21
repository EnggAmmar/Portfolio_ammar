#!/usr/bin/env python3
"""Generate a mechanical, mechatronics, and aerospace portfolio PDF."""

from __future__ import annotations

import io
from pathlib import Path
from typing import Iterable, Sequence

from PIL import Image, ImageOps
from reportlab.lib.colors import Color, HexColor, white
from reportlab.lib.pagesizes import A4, landscape
from reportlab.lib.utils import ImageReader
from reportlab.pdfbase.pdfmetrics import stringWidth
from reportlab.pdfgen import canvas


ROOT = Path(__file__).resolve().parents[1]
ASSETS = ROOT / "src" / "assets"
IMAGES = ASSETS / "images"
PROJECTS = IMAGES / "projects"
DB = PROJECTS / "database-upgrade"
DIST = ROOT / "dist"
OUTPUT = DIST / "Ammar_Ahmed_Mechanical_Mechatronics_Aerospace_Portfolio.pdf"

PAGE_W, PAGE_H = landscape(A4)
MARGIN = 34
TOTAL_PAGES = 8

CHARCOAL = HexColor("#172026")
INK = HexColor("#1F2B33")
GRAPHITE = HexColor("#36434D")
MID = HexColor("#63717C")
LINE = HexColor("#C9D2D8")
PANEL = HexColor("#F3F6F7")
PANEL_2 = HexColor("#E8EEF1")
WHITEISH = HexColor("#FBFCFC")
TEAL = HexColor("#1C8A8A")
BLUE = HexColor("#2364AA")
ORANGE = HexColor("#E9783D")
YELLOW = HexColor("#E7B44A")
GREEN = HexColor("#2E7D59")
RED = HexColor("#B84A3C")


def existing(path: Path) -> Path | None:
    if path.exists() and path.is_file():
        return path
    print(f"missing asset skipped: {path}")
    return None


def safe_image(path: Path) -> Image.Image | None:
    try:
        with Image.open(path) as image:
            return ImageOps.exif_transpose(image).convert("RGB")
    except Exception as exc:
        print(f"unreadable image skipped: {path} ({exc})")
        return None


def image_reader(path: Path, width: int, height: int, mode: str = "cover") -> ImageReader | None:
    image = safe_image(path)
    if image is None:
        return None
    size = (max(1, width), max(1, height))
    if mode == "contain":
        image.thumbnail(size, Image.Resampling.LANCZOS)
        background = Image.new("RGB", size, "white")
        left = (background.width - image.width) // 2
        top = (background.height - image.height) // 2
        background.paste(image, (left, top))
        image = background
    else:
        image = ImageOps.fit(image, size, method=Image.Resampling.LANCZOS, centering=(0.5, 0.5))
    stream = io.BytesIO()
    image.save(stream, "JPEG", quality=92, optimize=True)
    stream.seek(0)
    return ImageReader(stream)


def wrap_lines(text: str, font: str, size: float, max_width: float) -> list[str]:
    words = text.split()
    lines: list[str] = []
    current = ""
    for word in words:
        candidate = word if not current else f"{current} {word}"
        if stringWidth(candidate, font, size) <= max_width:
            current = candidate
            continue
        if current:
            lines.append(current)
        current = word
    if current:
        lines.append(current)
    return lines


def draw_wrapped(
    pdf: canvas.Canvas,
    text: str,
    x: float,
    y: float,
    max_width: float,
    leading: float,
    *,
    font: str = "Helvetica",
    size: float = 9,
    max_lines: int | None = None,
) -> float:
    lines = wrap_lines(text, font, size, max_width)
    if max_lines is not None:
        lines = lines[:max_lines]
    pdf.setFont(font, size)
    for line in lines:
        pdf.drawString(x, y, line)
        y -= leading
    return y


def draw_image(
    pdf: canvas.Canvas,
    path: Path | None,
    x: float,
    y: float,
    w: float,
    h: float,
    *,
    mode: str = "cover",
    caption: str | None = None,
    dark_caption: bool = False,
) -> None:
    pdf.setFillColor(PANEL_2)
    pdf.roundRect(x, y, w, h, 7, fill=1, stroke=0)
    if path is not None:
        reader = image_reader(path, int(w * 2), int(h * 2), mode)
        if reader is not None:
            pdf.saveState()
            clip = pdf.beginPath()
            clip.roundRect(x, y, w, h, 7)
            pdf.clipPath(clip, stroke=0, fill=0)
            pdf.drawImage(reader, x, y, w, h, preserveAspectRatio=False, mask="auto")
            pdf.restoreState()
    if caption:
        pdf.setFillColor(Color(0.04, 0.07, 0.09, alpha=0.80) if dark_caption else Color(1, 1, 1, alpha=0.92))
        pdf.rect(x, y, w, 28, fill=1, stroke=0)
        pdf.setFillColor(white if dark_caption else INK)
        draw_wrapped(pdf, caption, x + 9, y + 18, w - 18, 8.5, size=7.4, max_lines=2)


def footer(pdf: canvas.Canvas, page: int, *, dark: bool = False) -> None:
    pdf.setStrokeColor(Color(1, 1, 1, alpha=0.42) if dark else LINE)
    pdf.setLineWidth(0.6)
    pdf.line(MARGIN, 24, PAGE_W - MARGIN, 24)
    pdf.setFillColor(HexColor("#E5ECEF") if dark else MID)
    pdf.setFont("Helvetica", 7)
    pdf.drawString(MARGIN, 12, "Ammar Ahmed | Mechanical Design, Mechatronics and Aerospace Portfolio")
    pdf.drawRightString(PAGE_W - MARGIN, 12, f"{page} / {TOTAL_PAGES}")


def page_header(pdf: canvas.Canvas, kicker: str, title: str, page: int) -> None:
    pdf.setFillColor(WHITEISH)
    pdf.rect(0, 0, PAGE_W, PAGE_H, fill=1, stroke=0)
    pdf.setFillColor(CHARCOAL)
    pdf.rect(0, PAGE_H - 70, PAGE_W, 70, fill=1, stroke=0)
    pdf.setFillColor(TEAL)
    pdf.rect(MARGIN, PAGE_H - 70, 4, 70, fill=1, stroke=0)
    pdf.setFillColor(HexColor("#B8E0DC"))
    pdf.setFont("Helvetica-Bold", 7.8)
    pdf.drawString(MARGIN + 16, PAGE_H - 26, kicker.upper())
    pdf.setFillColor(white)
    pdf.setFont("Helvetica-Bold", 19)
    pdf.drawString(MARGIN + 16, PAGE_H - 52, title)
    footer(pdf, page)


def section_label(pdf: canvas.Canvas, text: str, x: float, y: float, color=TEAL) -> None:
    pdf.setFillColor(color)
    pdf.roundRect(x, y - 3, 4, 16, 2, fill=1, stroke=0)
    pdf.setFillColor(INK)
    pdf.setFont("Helvetica-Bold", 9.5)
    pdf.drawString(x + 11, y, text.upper())


def draw_tags(pdf: canvas.Canvas, tags: Sequence[str], x: float, y: float, max_width: float) -> float:
    cursor_x = x
    cursor_y = y
    for tag in tags:
        tag_w = stringWidth(tag, "Helvetica-Bold", 6.7) + 14
        if cursor_x + tag_w > x + max_width:
            cursor_x = x
            cursor_y -= 17
        pdf.setFillColor(PANEL_2)
        pdf.roundRect(cursor_x, cursor_y - 11, tag_w, 15, 7, fill=1, stroke=0)
        pdf.setFillColor(GRAPHITE)
        pdf.setFont("Helvetica-Bold", 6.7)
        pdf.drawString(cursor_x + 7, cursor_y - 6.5, tag)
        cursor_x += tag_w + 5
    return cursor_y - 18


def draw_bullets(
    pdf: canvas.Canvas,
    items: Iterable[str],
    x: float,
    y: float,
    width: float,
    *,
    size: float = 8.1,
    leading: float = 9.4,
    gap: float = 3.0,
    bullet_color=ORANGE,
) -> float:
    for item in items:
        lines = wrap_lines(item, "Helvetica", size, width - 14)
        pdf.setFillColor(bullet_color)
        pdf.circle(x + 3, y - 3, 2, fill=1, stroke=0)
        pdf.setFillColor(INK)
        pdf.setFont("Helvetica", size)
        for line in lines:
            pdf.drawString(x + 12, y, line)
            y -= leading
        y -= gap
    return y


def metric(pdf: canvas.Canvas, x: float, y: float, w: float, h: float, label: str, value: str, color=TEAL) -> None:
    pdf.setFillColor(PANEL)
    pdf.setStrokeColor(LINE)
    pdf.roundRect(x, y, w, h, 7, fill=1, stroke=1)
    pdf.setFillColor(color)
    pdf.roundRect(x + 10, y + h - 20, 24, 6, 3, fill=1, stroke=0)
    pdf.setFillColor(INK)
    pdf.setFont("Helvetica-Bold", 8.8)
    pdf.drawString(x + 10, y + h - 38, label)
    pdf.setFillColor(MID)
    draw_wrapped(pdf, value, x + 10, y + h - 55, w - 20, 9, size=7.2, max_lines=3)


def process_lane(pdf: canvas.Canvas, x: float, y: float, w: float, steps: Sequence[tuple[str, str]]) -> None:
    gap = 10
    box_w = (w - gap * (len(steps) - 1)) / len(steps)
    for index, (number, label) in enumerate(steps):
        bx = x + index * (box_w + gap)
        pdf.setFillColor(CHARCOAL if index != len(steps) - 1 else ORANGE)
        pdf.roundRect(bx, y, box_w, 45, 7, fill=1, stroke=0)
        pdf.setFillColor(white)
        pdf.setFont("Helvetica-Bold", 12)
        pdf.drawCentredString(bx + box_w / 2, y + 27, number)

        label_font = 7.2 if box_w >= 62 else 6.7
        label_lines = wrap_lines(label, "Helvetica-Bold", label_font, box_w - 12)[:2]
        label_y = y + 17 if len(label_lines) == 1 else y + 20
        pdf.setFont("Helvetica-Bold", label_font)
        for line in label_lines:
            pdf.drawCentredString(bx + box_w / 2, label_y, line)
            label_y -= 8
        if index < len(steps) - 1:
            pdf.setStrokeColor(TEAL)
            pdf.setLineWidth(1.3)
            pdf.line(bx + box_w + 1, y + 22, bx + box_w + gap - 1, y + 22)


def cover_page(pdf: canvas.Canvas, uav: Path | None) -> None:
    pdf.setFillColor(CHARCOAL)
    pdf.rect(0, 0, PAGE_W, PAGE_H, fill=1, stroke=0)
    draw_image(pdf, uav, PAGE_W * 0.48, 0, PAGE_W * 0.52, PAGE_H, mode="cover")
    pdf.setFillColor(Color(0.02, 0.04, 0.05, alpha=0.38))
    pdf.rect(PAGE_W * 0.48, 0, PAGE_W * 0.52, PAGE_H, fill=1, stroke=0)
    pdf.setFillColor(Color(0.02, 0.04, 0.05, alpha=0.92))
    pdf.rect(0, 0, PAGE_W * 0.56, PAGE_H, fill=1, stroke=0)

    pdf.setFillColor(TEAL)
    pdf.roundRect(MARGIN, PAGE_H - 68, 174, 20, 10, fill=1, stroke=0)
    pdf.setFillColor(white)
    pdf.setFont("Helvetica-Bold", 7.6)
    pdf.drawCentredString(MARGIN + 87, PAGE_H - 62, "TARGETED ENGINEERING PORTFOLIO")

    pdf.setFillColor(white)
    pdf.setFont("Helvetica-Bold", 36)
    pdf.drawString(MARGIN, PAGE_H - 137, "AMMAR AHMED")
    pdf.setFillColor(HexColor("#B8E0DC"))
    pdf.setFont("Helvetica-Bold", 16)
    pdf.drawString(MARGIN, PAGE_H - 170, "Mechanical Design | Mechatronics | Aerospace Systems")
    pdf.setFillColor(HexColor("#DFE8EB"))
    pdf.setFont("Helvetica", 10.5)
    draw_wrapped(
        pdf,
        "Portfolio focused on CAD-to-hardware development, UAV structures, rocket and launch vehicle concepts, "
        "mechatronic integration, FEA/CFD validation, thermal hardware, and rapid prototyping.",
        MARGIN,
        PAGE_H - 205,
        395,
        14,
        size=10.5,
        max_lines=4,
    )

    process_lane(
        pdf,
        MARGIN,
        222,
        395,
        [
            ("01", "Concept and requirements"),
            ("02", "CAD and simulation"),
            ("03", "Prototype build"),
            ("04", "Test and iterate"),
        ],
    )

    y = 155
    pdf.setFillColor(white)
    pdf.setFont("Helvetica-Bold", 9)
    pdf.drawString(MARGIN, y, "CONTACT")
    pdf.setFillColor(HexColor("#DFE8EB"))
    pdf.setFont("Helvetica", 8.6)
    for line in [
        "Erlangen, Germany | +49 1556 0360166",
        "ammarahmed.00748@gmail.com",
        "linkedin.com/in/ammar-ahmed11/ | github.com/EnggAmmar",
        "enggammar.github.io/Portfolio_ammar/",
    ]:
        y -= 18
        pdf.drawString(MARGIN, y, line)

    footer(pdf, 1, dark=True)
    pdf.showPage()


def systems_map_page(pdf: canvas.Canvas) -> None:
    page_header(pdf, "Engineering snapshot", "Mechanical, Mechatronics and Aerospace Capability Map", 2)
    pdf.setFillColor(MID)
    draw_wrapped(
        pdf,
        "A portfolio map for roles where mechanical design decisions must survive manufacturing, integration, "
        "testing, and simulation review.",
        MARGIN,
        PAGE_H - 96,
        PAGE_W - 2 * MARGIN,
        11,
        size=8.8,
        max_lines=2,
    )

    card_w = (PAGE_W - 2 * MARGIN - 45) / 4
    cards = [
        ("Mechanical Design", "CAD, assemblies, interfaces, packaging, mechanisms, design for manufacturing.", TEAL),
        ("Aerospace Systems", "UAV structures, SLV concepts, rocket engine layout, aerodynamics.", BLUE),
        ("Mechatronics", "Sensors, actuators, motors, CAN bench validation, robot mechanisms.", GREEN),
        ("Simulation", "FEA, CFD, thermal studies, parametric analysis, engineering dashboards.", ORANGE),
    ]
    for i, (label, value, color) in enumerate(cards):
        metric(pdf, MARGIN + i * (card_w + 15), PAGE_H - 190, card_w, 80, label, value, color)

    section_label(pdf, "Tools and methods", MARGIN, PAGE_H - 230)
    draw_tags(
        pdf,
        [
            "SolidWorks",
            "Siemens NX",
            "CATIA v6",
            "ANSYS Mechanical",
            "ANSYS Fluent",
            "MATLAB",
            "Python",
            "FDM 3D Printing",
            "CAN Testbench",
            "Power BI",
            "FastAPI",
            "React",
        ],
        MARGIN,
        PAGE_H - 258,
        PAGE_W - 2 * MARGIN,
    )

    section_label(pdf, "Experience evidence", MARGIN, 286)
    rows = [
        ("WS Audiology | Device Commissioning Engineer", "Subsystem and system-level validation, test documentation, data dashboards, component records."),
        ("NASTP | Research Officer", "UAV prototype manufacturing and assembly, demonstration drones, electronics and landing gear integration, composite direction support."),
        ("Aero-Vision Technologies | Mechanical Design Engineer", "Foldable fixed-wing UAV structures, FDM prototypes, CFD support, mechanical-electronic integration."),
        ("FAU MSc Electromobility", "Mechatronics components and systems, robot mechanisms, electric drives, signal processing and ML for engineers."),
    ]
    y = 256
    for title, detail in rows:
        pdf.setFillColor(INK)
        pdf.setFont("Helvetica-Bold", 8.5)
        pdf.drawString(MARGIN, y, title)
        pdf.setFillColor(MID)
        draw_wrapped(pdf, detail, 314, y, PAGE_W - 314 - MARGIN, 10, size=8)
        pdf.setStrokeColor(LINE)
        pdf.line(MARGIN, y - 14, PAGE_W - MARGIN, y - 14)
        y -= 37
    pdf.showPage()


def uav_page(pdf: canvas.Canvas, fabricated: Path | None, mesh: Path | None, printed: Path | None, wings: Path | None) -> None:
    page_header(pdf, "Case study 01", "UAV Airframe Design, Fabrication and Integration", 3)
    draw_image(pdf, fabricated, MARGIN, 292, 360, 215, caption="Assembled fixed-wing foldable UAV prototypes prepared for review.", dark_caption=True)
    draw_image(pdf, mesh, 414, 400, 190, 107, caption="Meshed airframe geometry for CFD preparation.")
    draw_image(pdf, printed, 414, 292, 190, 96, caption="FDM UAV structure before system assembly.")
    draw_image(pdf, wings, 620, 292, 188, 215, caption="UAV wing and structural fabrication reference.", dark_caption=True)

    section_label(pdf, "Mechanical and aerospace contribution", MARGIN, 258)
    draw_bullets(
        pdf,
        [
            "Designed and supported foldable fixed-wing UAV structures using CAD-driven mechanical development.",
            "Converted CAD geometry into FDM printed prototype parts for fit checks and fast design iteration.",
            "Integrated structures with electronics, propellers, actuators, landing gear, and sensor-related hardware.",
            "Supported aerodynamic validation through CFD/mesh preparation and prototype refinement.",
            "Prepared demonstration-ready UAV models for stakeholder review and engineering decision-making.",
        ],
        MARGIN,
        232,
        420,
    )
    section_label(pdf, "Build loop", 512, 258, color=BLUE)
    process_lane(
        pdf,
        512,
        180,
        296,
        [
            ("01", "Airframe CAD"),
            ("02", "Mesh and CFD"),
            ("03", "FDM parts"),
            ("04", "Integrated prototype"),
        ],
    )
    draw_tags(pdf, ["UAV", "Airframes", "FDM", "CFD", "Sensors", "Actuators", "Landing gear"], 512, 145, 296)
    pdf.showPage()


def rocket_page(
    pdf: canvas.Canvas,
    slv: Path | None,
    engine: Path | None,
    cut: Path | None,
    pathlines: Path | None,
    track: Path | None,
    nozzle: Path | None,
) -> None:
    page_header(pdf, "Case study 02", "Satellite Launch Vehicle and 25 kN Rocket Engine Concept", 4)
    draw_image(pdf, slv, MARGIN, 284, 240, 223, caption="Satellite launch vehicle concept render.", dark_caption=True)
    draw_image(pdf, engine, 292, 392, 178, 115, caption="25 kN liquid rocket engine assembly.")
    draw_image(pdf, cut, 292, 284, 178, 96, caption="Cut model showing engine internal layout.")
    draw_image(pdf, pathlines, 488, 392, 150, 115, caption="Flow-path visualization for internal behavior.")
    draw_image(pdf, track, 488, 284, 150, 96, caption="Thermal/flow result view for cooling review.")
    draw_image(pdf, nozzle, 656, 284, 152, 223, caption="3D printed nozzle prototype for physical review.", dark_caption=True)

    section_label(pdf, "System design scope", MARGIN, 250)
    draw_bullets(
        pdf,
        [
            "Conceptual launch vehicle and LOX/RP-1 engine architecture with propellant tanks, piping interfaces, and assembly layout.",
            "Engine CAD including injector, chamber, nozzle, internal routing, and communication-friendly cut views.",
            "ANSYS-supported stress and thermal review for tanks, nozzle regions, and cooling-related design decisions.",
            "Prototype nozzle printed for physical inspection, geometry communication, and manufacturability review.",
        ],
        MARGIN,
        224,
        480,
    )
    section_label(pdf, "Engineering emphasis", 555, 250, color=ORANGE)
    draw_tags(
        pdf,
        ["Rocket engine CAD", "LOX/RP-1", "Regenerative cooling", "Thermal loading", "ANSYS Fluent", "Prototype nozzle"],
        555,
        224,
        253,
    )
    process_lane(pdf, 555, 146, 253, [("01", "Architecture"), ("02", "Engine CAD"), ("03", "Simulation"), ("04", "Prototype")])
    pdf.showPage()


def mechanical_page(
    pdf: canvas.Canvas,
    printer_1: Path | None,
    printer_2: Path | None,
    printed_model: Path | None,
    heat_1: Path | None,
    heat_2: Path | None,
    thermal: Path | None,
) -> None:
    page_header(pdf, "Case study 03", "Mechanical Prototyping and Thermal Hardware", 5)
    draw_image(pdf, printer_1, MARGIN, 396, 205, 111, caption="FDM printer setup for prototype fabrication.")
    draw_image(pdf, printer_2, 254, 396, 205, 111, caption="Printer operation and build setup.")
    draw_image(pdf, printed_model, 474, 396, 155, 111, caption="Printed model for fit validation.")
    draw_image(pdf, heat_1, 646, 396, 162, 111, caption="Multi-PCB heat-sink concept.")
    draw_image(pdf, heat_2, MARGIN, 244, 205, 122, caption="Thermal hardware packaging view.")
    draw_image(pdf, thermal, 254, 244, 205, 122, caption="Thermal conduction and geometry study.")

    section_label(pdf, "Mechanical interface and additive manufacturing", 486, 350)
    draw_bullets(
        pdf,
        [
            "Prepared CAD models for FDM manufacturing and rapid design validation.",
            "Operated 3D printing workflows for PLA/ABS engineering prototype parts.",
            "Performed physical fit checks, alignment review, and assembly refinement.",
            "Used prototype feedback to improve mechanical interfaces and part usability.",
        ],
        486,
        324,
        322,
        size=8,
    )
    section_label(pdf, "Thermal design evidence", MARGIN, 204, color=RED)
    draw_bullets(
        pdf,
        [
            "Developed compact electronics cooling concepts for multi-PCB layouts.",
            "Connected mechanical packaging constraints with simulation-informed geometry choices.",
            "Used thermal visualization and conduction studies to communicate design behavior.",
        ],
        MARGIN,
        178,
        430,
        size=8,
    )
    draw_tags(pdf, ["CAD-to-part", "FDM", "Fit checks", "Heat sinks", "Electronics cooling", "Thermal simulation"], 486, 188, 322)
    pdf.showPage()


def mechatronics_page(
    pdf: canvas.Canvas,
    can_1: Path | None,
    can_2: Path | None,
    can_3: Path | None,
    pid: Path | None,
) -> None:
    page_header(pdf, "Case study 04", "Mechatronic Systems, Controls and Validation", 6)
    draw_image(pdf, can_1, MARGIN, 336, 190, 171, caption="ESP32/MCP2515 CAN hardware setup.", dark_caption=True)
    draw_image(pdf, can_2, 242, 336, 190, 171, caption="Wired CAN validation bench.", dark_caption=True)
    draw_image(pdf, can_3, 450, 336, 166, 171, caption="Electronics validation and wiring reference.", dark_caption=True)
    draw_image(pdf, pid, 634, 336, 174, 171, caption="PID simulation dashboard for robot control behavior.", dark_caption=True)

    section_label(pdf, "Hardware integration and validation", MARGIN, 298)
    draw_bullets(
        pdf,
        [
            "Built a repeatable electronics testbench using ESP32 and MCP2515 CAN hardware.",
            "Structured validation with wiring checks, message flow, signal behavior, and PASS/FAIL style outputs.",
            "Connected mechanical prototype thinking with embedded hardware setup and troubleshooting.",
            "Applied test documentation practices from device commissioning to engineering validation workflows.",
        ],
        MARGIN,
        272,
        385,
    )
    section_label(pdf, "Robot mechanism and control direction", 470, 298, color=GREEN)
    draw_bullets(
        pdf,
        [
            "SCARA-style RRP robot arm concept linking mechanism layout with control response behavior.",
            "Mechatronics coursework foundation in robot mechanisms, multibody electric drives, and signal processing.",
            "Control-loop visualization used to communicate system response and tuning direction.",
        ],
        470,
        272,
        338,
        bullet_color=GREEN,
    )
    draw_tags(pdf, ["CAN", "ESP32", "MCP2515", "Sensors", "Actuators", "PID", "Robot mechanisms"], 470, 180, 338)
    pdf.showPage()


def simulation_page(pdf: canvas.Canvas, towing_1: Path | None, towing_2: Path | None, beam: Path | None) -> None:
    page_header(pdf, "Case study 05", "Simulation-Driven Design and Engineering Analytics", 7)
    draw_image(pdf, towing_1, MARGIN, 280, 357, 227, caption="CFD overview for towing vehicle-trailer aerodynamic study.", dark_caption=True)
    draw_image(pdf, towing_2, 414, 280, 394, 227, caption="Flow insights: wake recirculation, pressure buildup, roofline acceleration.", dark_caption=True)
    draw_image(pdf, beam, MARGIN, 70, 290, 151, caption="FEA and ML dashboard for cantilever beam deformation prediction.")

    section_label(pdf, "CFD and FEA workflow", 350, 220)
    draw_bullets(
        pdf,
        [
            "Used ANSYS Fluent workflows for geometry preparation, meshing, solver setup, convergence review, and post-processing.",
            "Evaluated pressure distribution, velocity fields, wake behavior, and force coefficient trends for aerodynamic decisions.",
            "Performed parametric FEA and machine-learning analysis for deformation prediction and design insight extraction.",
            "Built engineering dashboards that turn simulation outputs into interpretable design evidence.",
        ],
        350,
        194,
        458,
    )
    draw_tags(pdf, ["ANSYS Fluent", "CFD", "FEA", "Parametric studies", "Engineering analytics", "Python", "scikit-learn"], 350, 92, 458)
    pdf.showPage()


def closing_page(pdf: canvas.Canvas, fabricated: Path | None) -> None:
    pdf.setFillColor(CHARCOAL)
    pdf.rect(0, 0, PAGE_W, PAGE_H, fill=1, stroke=0)
    draw_image(pdf, fabricated, 0, 250, PAGE_W, PAGE_H - 250, mode="cover")
    pdf.setFillColor(Color(0.02, 0.04, 0.05, alpha=0.63))
    pdf.rect(0, 250, PAGE_W, PAGE_H - 250, fill=1, stroke=0)
    pdf.setFillColor(white)
    pdf.setFont("Helvetica-Bold", 30)
    pdf.drawString(MARGIN, PAGE_H - 82, "READY FOR HARDWARE-CENTRIC")
    pdf.drawString(MARGIN, PAGE_H - 120, "ENGINEERING ROLES")
    pdf.setFillColor(HexColor("#DCE8EA"))
    draw_wrapped(
        pdf,
        "Best fit: mechanical design, mechatronic systems, aerospace prototyping, UAV hardware, "
        "test and validation, rapid manufacturing, and simulation-supported product development.",
        MARGIN,
        PAGE_H - 156,
        620,
        15,
        size=10,
        max_lines=3,
    )

    pdf.setFillColor(WHITEISH)
    pdf.roundRect(MARGIN, 70, PAGE_W - 2 * MARGIN, 145, 8, fill=1, stroke=0)
    section_label(pdf, "Core value", MARGIN + 18, 185)
    draw_bullets(
        pdf,
        [
            "Turns CAD concepts into manufacturable prototype hardware.",
            "Connects mechanical assemblies with electronics, sensors, actuators, and test workflows.",
            "Uses FEA/CFD and dashboards to support design decisions with evidence.",
            "Works across aerospace, mechanical, thermal, and mechatronic system boundaries.",
        ],
        MARGIN + 18,
        160,
        520,
    )
    pdf.setFillColor(INK)
    pdf.setFont("Helvetica-Bold", 12)
    pdf.drawString(620, 181, "Ammar Ahmed")
    pdf.setFont("Helvetica", 8.2)
    pdf.setFillColor(MID)
    contacts = [
        "Erlangen, Germany",
        "+49 1556 0360166",
        "ammarahmed.00748@gmail.com",
        "linkedin.com/in/ammar-ahmed11/",
        "github.com/EnggAmmar",
    ]
    y = 160
    for line in contacts:
        pdf.drawString(620, y, line)
        y -= 16
    footer(pdf, 8, dark=True)
    pdf.showPage()


def build_pdf() -> Path:
    DIST.mkdir(parents=True, exist_ok=True)

    assets = {
        "uav": existing(PROJECTS / "UAV fabricated_frame.jpeg"),
        "mesh": existing(PROJECTS / "UAV Mesh_frame.png"),
        "printed_uav": existing(PROJECTS / "uav 3d printed structure_frame.jpg"),
        "wings": existing(DB / "uav-wings.jpg"),
        "slv": existing(PROJECTS / "slv render.JPG"),
        "engine": existing(DB / "rocket-25kn-engine.jpg"),
        "cut": existing(DB / "rocket-cut-model.jpg"),
        "pathlines": existing(DB / "rocket-pathlines.jpg"),
        "track": existing(DB / "rocket-track.jpg"),
        "nozzle": existing(DB / "rocket-nozzle-printed.jpg"),
        "printer_1": existing(DB / "printing-printer-01.jpg"),
        "printer_2": existing(DB / "printing-printer-02.jpg"),
        "printed_model": existing(DB / "printing-model-01.jpg"),
        "heat_1": existing(DB / "thermal-heatsink-01.jpg"),
        "heat_2": existing(DB / "thermal-heatsink-02.jpg"),
        "thermal": existing(DB / "thermal-conduction-geometry.jpg"),
        "can_1": existing(DB / "automotive-can-01.jpg"),
        "can_2": existing(DB / "automotive-can-02.jpg"),
        "can_3": existing(DB / "automotive-can-03.jpg"),
        "pid": existing(PROJECTS / "scara-robot" / "pid_dashboard.png"),
        "towing_1": existing(DB / "towing-trailer-cfd-overview.png"),
        "towing_2": existing(DB / "towing-trailer-flow-insights.png"),
        "beam": existing(PROJECTS / "beam_fea_ml.png"),
    }

    pdf = canvas.Canvas(str(OUTPUT), pagesize=landscape(A4), pageCompression=1)
    pdf.setTitle("Ammar Ahmed - Mechanical, Mechatronics and Aerospace Portfolio")
    pdf.setAuthor("Ammar Ahmed")
    pdf.setSubject("Mechanical design, mechatronic systems, aerospace prototyping and simulation portfolio")
    pdf.setCreator("ReportLab / scripts/generate_mechanical_mechatronics_aerospace_portfolio_pdf.py")

    cover_page(pdf, assets["uav"])
    systems_map_page(pdf)
    uav_page(pdf, assets["uav"], assets["mesh"], assets["printed_uav"], assets["wings"])
    rocket_page(pdf, assets["slv"], assets["engine"], assets["cut"], assets["pathlines"], assets["track"], assets["nozzle"])
    mechanical_page(
        pdf,
        assets["printer_1"],
        assets["printer_2"],
        assets["printed_model"],
        assets["heat_1"],
        assets["heat_2"],
        assets["thermal"],
    )
    mechatronics_page(pdf, assets["can_1"], assets["can_2"], assets["can_3"], assets["pid"])
    simulation_page(pdf, assets["towing_1"], assets["towing_2"], assets["beam"])
    closing_page(pdf, assets["uav"])
    pdf.save()

    if not OUTPUT.exists() or OUTPUT.stat().st_size == 0:
        raise RuntimeError(f"PDF was not generated correctly: {OUTPUT}")
    print(f"final PDF: {OUTPUT}")
    print(f"file size: {OUTPUT.stat().st_size:,} bytes")
    return OUTPUT


if __name__ == "__main__":
    build_pdf()
