#!/usr/bin/env python3
"""Generate a targeted Quantum-Systems prototyping portfolio from local assets."""

from __future__ import annotations

import io
import shutil
import subprocess
from pathlib import Path
from typing import Iterable, Sequence

from PIL import Image, ImageOps
from reportlab.lib.colors import Color, HexColor, white
from reportlab.lib.pagesizes import A4
from reportlab.pdfbase.pdfmetrics import stringWidth
from reportlab.pdfgen import canvas
from reportlab.lib.utils import ImageReader


ROOT = Path(__file__).resolve().parents[1]
ASSETS = ROOT / "src" / "assets"
PROJECTS = ASSETS / "images" / "projects"
DB = PROJECTS / "database-upgrade"
DIST = ROOT / "dist"
OUTPUT = DIST / "Ammar_Ahmed_QuantumSystems_Prototyping_Technician_Portfolio.pdf"
CACHE = DIST / ".quantum_portfolio_cache"

PAGE_W, PAGE_H = A4
MARGIN = 40
TOTAL_PAGES = 7

NAVY = HexColor("#14263A")
NAVY_2 = HexColor("#203A55")
BLUE = HexColor("#1D6FA5")
CYAN = HexColor("#2FA9B8")
ORANGE = HexColor("#F08A3C")
INK = HexColor("#18222D")
MID = HexColor("#536273")
PALE = HexColor("#EEF3F6")
PALE_BLUE = HexColor("#E7F1F7")
LINE = HexColor("#CCD7DE")
LIGHT = HexColor("#F7F9FA")
GREEN = HexColor("#2C7A61")


def log(message: str) -> None:
    print(message)


def existing(path: Path) -> Path | None:
    if path.exists() and path.is_file():
        return path
    log(f"skipped missing image: {path}")
    return None


def extract_video_frame(video: Path, output: Path) -> Path | None:
    """Extract a representative frame when ffmpeg exists; otherwise skip safely."""
    if not video.exists():
        log(f"skipped missing video: {video}")
        return None
    ffmpeg = shutil.which("ffmpeg")
    if not ffmpeg:
        log(f"skipped video frame extraction (ffmpeg unavailable): {video}")
        return None
    output.parent.mkdir(parents=True, exist_ok=True)
    result = subprocess.run(
        [
            ffmpeg,
            "-y",
            "-ss",
            "00:00:01",
            "-i",
            str(video),
            "-frames:v",
            "1",
            str(output),
        ],
        capture_output=True,
        text=True,
        check=False,
    )
    if result.returncode != 0 or not output.exists():
        log(f"skipped video frame extraction (ffmpeg failed): {video}")
        return None
    log(f"extracted video frame: {output}")
    return output


def safe_image(path: Path) -> Image.Image | None:
    try:
        with Image.open(path) as image:
            return ImageOps.exif_transpose(image).convert("RGB")
    except Exception as exc:
        log(f"skipped unreadable image: {path} ({exc})")
        return None


def image_reader(path: Path, width: int, height: int, mode: str) -> ImageReader | None:
    image = safe_image(path)
    if image is None:
        return None
    if mode == "cover":
        image = ImageOps.fit(
            image,
            (max(1, width), max(1, height)),
            method=Image.Resampling.LANCZOS,
            centering=(0.5, 0.5),
        )
    else:
        image.thumbnail((max(1, width), max(1, height)), Image.Resampling.LANCZOS)
        background = Image.new("RGB", (max(1, width), max(1, height)), "white")
        left = (background.width - image.width) // 2
        top = (background.height - image.height) // 2
        background.paste(image, (left, top))
        image = background
    stream = io.BytesIO()
    image.save(stream, "JPEG", quality=91, optimize=True)
    stream.seek(0)
    return ImageReader(stream)


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
    caption_dark: bool = False,
) -> None:
    pdf.setFillColor(PALE)
    pdf.roundRect(x, y, w, h, 5, fill=1, stroke=0)
    if path is not None:
        reader = image_reader(path, int(w * 2), int(h * 2), mode)
        if reader is not None:
            pdf.saveState()
            clip = pdf.beginPath()
            clip.roundRect(x, y, w, h, 5)
            pdf.clipPath(clip, stroke=0, fill=0)
            pdf.drawImage(reader, x, y, w, h, preserveAspectRatio=False, mask="auto")
            pdf.restoreState()
    if caption:
        overlay = Color(0.04, 0.09, 0.14, alpha=0.82) if caption_dark else Color(1, 1, 1, alpha=0.88)
        pdf.setFillColor(overlay)
        pdf.rect(x, y, w, 25, fill=1, stroke=0)
        pdf.setFillColor(white if caption_dark else INK)
        pdf.setFont("Helvetica", 7.3)
        draw_wrapped(pdf, caption, x + 7, y + 16, w - 14, 8.2, max_lines=2)


def wrap_lines(text: str, font: str, size: float, max_width: float) -> list[str]:
    words = text.split()
    lines: list[str] = []
    current = ""
    for word in words:
        candidate = word if not current else f"{current} {word}"
        if stringWidth(candidate, font, size) <= max_width:
            current = candidate
        else:
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


def draw_bullets(
    pdf: canvas.Canvas,
    items: Iterable[str],
    x: float,
    y: float,
    width: float,
    *,
    size: float = 8.5,
    leading: float = 10.5,
    gap: float = 4,
    color=INK,
) -> float:
    pdf.setFillColor(color)
    for item in items:
        lines = wrap_lines(item, "Helvetica", size, width - 15)
        pdf.setFillColor(ORANGE)
        pdf.circle(x + 3, y - 3, 2, fill=1, stroke=0)
        pdf.setFillColor(color)
        pdf.setFont("Helvetica", size)
        for line in lines:
            pdf.drawString(x + 12, y, line)
            y -= leading
        y -= gap
    return y


def draw_tags(pdf: canvas.Canvas, tags: Sequence[str], x: float, y: float, max_width: float) -> float:
    cursor_x = x
    cursor_y = y
    for tag in tags:
        tag_w = stringWidth(tag, "Helvetica-Bold", 6.7) + 14
        if cursor_x + tag_w > x + max_width:
            cursor_x = x
            cursor_y -= 18
        pdf.setFillColor(PALE_BLUE)
        pdf.roundRect(cursor_x, cursor_y - 11, tag_w, 15, 7, fill=1, stroke=0)
        pdf.setFillColor(BLUE)
        pdf.setFont("Helvetica-Bold", 6.7)
        pdf.drawString(cursor_x + 7, cursor_y - 6.5, tag)
        cursor_x += tag_w + 5
    return cursor_y - 18


def page_header(pdf: canvas.Canvas, kicker: str, title: str, page: int) -> None:
    pdf.setFillColor(NAVY)
    pdf.rect(0, PAGE_H - 90, PAGE_W, 90, fill=1, stroke=0)
    pdf.setFillColor(CYAN)
    pdf.setFont("Helvetica-Bold", 8)
    pdf.drawString(MARGIN, PAGE_H - 30, kicker.upper())
    pdf.setFillColor(white)
    pdf.setFont("Helvetica-Bold", 20)
    pdf.drawString(MARGIN, PAGE_H - 59, title)
    footer(pdf, page)


def footer(pdf: canvas.Canvas, page: int, *, dark: bool = False) -> None:
    pdf.setStrokeColor(Color(1, 1, 1, alpha=0.55) if dark else LINE)
    pdf.setLineWidth(0.5)
    pdf.line(MARGIN, 29, PAGE_W - MARGIN, 29)
    pdf.setFillColor(HexColor("#DCE7ED") if dark else MID)
    pdf.setFont("Helvetica", 7)
    pdf.drawString(MARGIN, 17, "Ammar Ahmed  |  ammarahmed.00748@gmail.com")
    pdf.drawRightString(PAGE_W - MARGIN, 17, f"{page} / {TOTAL_PAGES}")


def section_label(pdf: canvas.Canvas, text: str, x: float, y: float) -> None:
    pdf.setFillColor(CYAN)
    pdf.roundRect(x, y - 4, 4, 16, 2, fill=1, stroke=0)
    pdf.setFillColor(NAVY)
    pdf.setFont("Helvetica-Bold", 10)
    pdf.drawString(x + 11, y, text.upper())


def metric_card(pdf: canvas.Canvas, x: float, y: float, w: float, h: float, title: str, detail: str) -> None:
    pdf.setFillColor(LIGHT)
    pdf.setStrokeColor(LINE)
    pdf.roundRect(x, y, w, h, 6, fill=1, stroke=1)
    pdf.setFillColor(BLUE)
    pdf.circle(x + 17, y + h - 18, 4, fill=1, stroke=0)
    pdf.setFillColor(INK)
    pdf.setFont("Helvetica-Bold", 8.4)
    pdf.drawString(x + 29, y + h - 21, title)
    pdf.setFillColor(MID)
    draw_wrapped(pdf, detail, x + 12, y + h - 39, w - 24, 9, size=7.4, max_lines=3)


def cover_page(pdf: canvas.Canvas, uav_fabricated: Path | None) -> None:
    pdf.setFillColor(NAVY)
    pdf.rect(0, 0, PAGE_W, PAGE_H, fill=1, stroke=0)
    draw_image(pdf, uav_fabricated, 0, 0, PAGE_W, 330, mode="cover")
    pdf.setFillColor(Color(0.04, 0.09, 0.14, alpha=0.35))
    pdf.rect(0, 0, PAGE_W, 330, fill=1, stroke=0)

    pdf.setFillColor(CYAN)
    pdf.roundRect(MARGIN, PAGE_H - 80, 163, 22, 11, fill=1, stroke=0)
    pdf.setFillColor(NAVY)
    pdf.setFont("Helvetica-Bold", 8)
    pdf.drawCentredString(MARGIN + 81.5, PAGE_H - 73, "TARGETED APPLICATION PORTFOLIO")

    pdf.setFillColor(white)
    pdf.setFont("Helvetica-Bold", 34)
    pdf.drawString(MARGIN, PAGE_H - 145, "AMMAR AHMED")
    pdf.setFillColor(CYAN)
    pdf.setFont("Helvetica-Bold", 16)
    pdf.drawString(MARGIN, PAGE_H - 177, "Mechanical Design & Prototyping Engineer")
    pdf.setFillColor(white)
    pdf.setFont("Helvetica", 11)
    pdf.drawString(MARGIN, PAGE_H - 203, "UAV Systems  |  Hardware Integration  |  Rapid Prototyping")

    pdf.setFillColor(ORANGE)
    pdf.rect(MARGIN, PAGE_H - 242, 43, 3, fill=1, stroke=0)
    pdf.setFillColor(white)
    pdf.setFont("Helvetica-Bold", 10)
    pdf.drawString(MARGIN, PAGE_H - 264, "PROTOTYPING TECHNICIAN (M/F/D)")
    pdf.setFont("Helvetica", 9)
    pdf.drawString(MARGIN, PAGE_H - 283, "Quantum-Systems GmbH  |  Gilching, Bayern")

    profile_y = 458
    pdf.setFillColor(white)
    pdf.setFont("Helvetica-Bold", 9)
    pdf.drawString(MARGIN, profile_y, "PROFILE")
    pdf.setFillColor(HexColor("#DCE7ED"))
    draw_wrapped(
        pdf,
        "Mechanical engineer with hands-on experience in UAV prototype assembly, FDM 3D printing, "
        "mechanical-electronic integration, CAD-driven design, functional validation, and rapid "
        "prototype iteration. Experienced with fixed-wing UAV structures, drone demonstration "
        "models, sensors, actuators, propellers, landing gear, and practical prototype troubleshooting.",
        MARGIN,
        profile_y - 20,
        PAGE_W - 2 * MARGIN,
        13,
        size=9.2,
        max_lines=6,
    )

    contact_y = 45
    pdf.setFillColor(white)
    pdf.setFont("Helvetica-Bold", 8)
    pdf.drawString(MARGIN, contact_y + 64, "ERLANGEN, GERMANY")
    pdf.setFont("Helvetica", 8)
    pdf.drawString(MARGIN, contact_y + 46, "+49 1556 0360166")
    pdf.drawString(MARGIN, contact_y + 30, "ammarahmed.00748@gmail.com")
    pdf.drawString(MARGIN, contact_y + 14, "linkedin.com/in/ammar-ahmed11/")
    pdf.drawRightString(PAGE_W - MARGIN, contact_y + 46, "github.com/EnggAmmar")
    pdf.drawRightString(PAGE_W - MARGIN, contact_y + 30, "enggammar.github.io/Portfolio_ammar/")
    pdf.setFont("Helvetica-Bold", 7)
    pdf.drawRightString(PAGE_W - MARGIN, contact_y + 14, "ENGINEERING PORTFOLIO  |  2026")
    footer(pdf, 1, dark=True)
    pdf.showPage()


def fit_page(pdf: canvas.Canvas) -> None:
    page_header(pdf, "Role alignment", "Why I Fit Quantum-Systems", 2)
    pdf.setFillColor(MID)
    draw_wrapped(
        pdf,
        "Evidence-led alignment to hands-on prototype assembly, manufacturing, hardware integration, "
        "and functional validation for unmanned aircraft systems.",
        MARGIN,
        PAGE_H - 116,
        PAGE_W - 2 * MARGIN,
        12,
        size=9,
        max_lines=2,
    )

    skills = [
        ("Drone prototype assembly", "Built fixed-wing and demonstration UAV structures."),
        ("UAV structures & airframes", "Foldable structures, wings, landing gear, assembly."),
        ("Electronics & actuators", "Integrated electronics, sensors, propellers, and actuators."),
        ("FDM rapid prototyping", "PLA/ABS printing, printer operation, part preparation."),
        ("CAD-to-prototype", "Moved concepts and CAD files into physical hardware."),
        ("Testing & troubleshooting", "Fit checks, system tests, validation, issue refinement."),
        ("Design iteration", "Updated geometry and assemblies from build feedback."),
        ("Composite support", "Supported glass-fiber UAV structure direction."),
        ("Cross-functional work", "Linked mechanical, electronics, analysis, and review."),
    ]
    card_w = (PAGE_W - 2 * MARGIN - 20) / 3
    card_h = 75
    start_y = PAGE_H - 225
    for index, (title, detail) in enumerate(skills):
        col = index % 3
        row = index // 3
        metric_card(
            pdf,
            MARGIN + col * (card_w + 10),
            start_y - row * (card_h + 10),
            card_w,
            card_h,
            title,
            detail,
        )

    section_label(pdf, "Tools and working methods", MARGIN, 319)
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
            "FDM 3D Printers",
            "Hand Tools",
        ],
        MARGIN,
        291,
        PAGE_W - 2 * MARGIN,
    )

    section_label(pdf, "Relevant hands-on experience", MARGIN, 235)
    experiences = [
        ("NASTP | Research Officer", "Prototype assembly at scale; demonstration drone integration; composite structure support."),
        ("Aero-Vision | UAV Prototyping", "Foldable fixed-wing UAV design; FDM manufacturing; electronics/sensor integration; CFD support."),
        ("WS Audiology | Commissioning", "Structured subsystem and system testing; documentation; repeatable validation workflows."),
    ]
    y = 207
    for role, evidence in experiences:
        pdf.setFillColor(NAVY)
        pdf.setFont("Helvetica-Bold", 8.5)
        pdf.drawString(MARGIN, y, role)
        pdf.setFillColor(MID)
        y = draw_wrapped(pdf, evidence, MARGIN + 170, y, PAGE_W - MARGIN * 2 - 170, 10, size=8)
        pdf.setStrokeColor(LINE)
        pdf.line(MARGIN, y - 5, PAGE_W - MARGIN, y - 5)
        y -= 22
    pdf.showPage()


def uav_page(
    pdf: canvas.Canvas,
    fabricated: Path | None,
    mesh: Path | None,
    printed: Path | None,
) -> None:
    page_header(pdf, "Case study 01", "UAV Design, Fabrication & Integration", 3)
    draw_image(
        pdf,
        fabricated,
        MARGIN,
        480,
        PAGE_W - 2 * MARGIN,
        235,
        caption="Assembled fixed-wing foldable UAV airframes prepared as demonstration-ready engineering prototypes.",
        caption_dark=True,
    )
    pdf.setFillColor(MID)
    draw_wrapped(
        pdf,
        "Fixed-wing foldable UAV prototyping covering CAD-driven structure development, FDM prototype "
        "manufacturing, electronics integration, aerodynamic simulation support, and system-level "
        "assembly for flight-ready prototypes.",
        MARGIN,
        457,
        PAGE_W - 2 * MARGIN,
        11,
        size=8.8,
        max_lines=3,
    )
    left_w = 302
    y = draw_bullets(
        pdf,
        [
            "Built and assembled UAV prototype structures from engineering concepts and CAD design files.",
            "Integrated mechanical assemblies with electronics, propellers, actuators, landing gear, and sensor-related hardware.",
            "Produced FDM 3D printed UAV components and supported fit checks before final assembly.",
            "Supported aerodynamic validation through CFD/mesh preparation and prototype refinement.",
            "Prepared demonstration-ready UAV models for engineering review and stakeholder presentation.",
        ],
        MARGIN,
        404,
        left_w,
        size=8.1,
        leading=9.7,
        gap=3,
    )
    draw_tags(
        pdf,
        ["UAV Prototyping", "Drone Assembly", "FDM 3D Printing", "Hardware Integration", "CAD", "CFD", "Functional Validation"],
        MARGIN,
        y - 3,
        left_w,
    )
    image_x = MARGIN + left_w + 18
    image_w = PAGE_W - MARGIN - image_x
    draw_image(pdf, mesh, image_x, 270, image_w, 145, caption="Meshed UAV geometry for aerodynamic analysis.")
    draw_image(pdf, printed, image_x, 94, image_w, 158, caption="FDM UAV structure before final system assembly.")
    pdf.showPage()


def printing_page(
    pdf: canvas.Canvas,
    printed_uav: Path | None,
    printer_1: Path | None,
    printer_2: Path | None,
    printed_model: Path | None,
) -> None:
    page_header(pdf, "Case studies 02 + 05", "Rapid Prototype Manufacturing", 4)
    draw_image(
        pdf,
        printed_uav,
        MARGIN,
        500,
        315,
        215,
        caption="FDM-manufactured UAV body and mechanism used for assembly development.",
        caption_dark=True,
    )
    draw_image(pdf, printer_1, 370, 610, 185, 105, caption="Prototype printer setup.")
    draw_image(pdf, printer_2, 370, 500, 185, 100, caption="Printer operation and build setup.")

    section_label(pdf, "3D Printed UAV Components", MARGIN, 467)
    pdf.setFillColor(MID)
    draw_wrapped(
        pdf,
        "Rapid prototype manufacturing using FDM 3D printing, CAD-to-part preparation, printer "
        "operation, fit validation, and iterative design improvements for engineering prototype parts.",
        MARGIN,
        443,
        310,
        10.5,
        size=8.5,
        max_lines=3,
    )
    draw_bullets(
        pdf,
        [
            "Converted CAD models into printable prototype components for fast design validation.",
            "Operated and maintained FDM 3D printers for PLA/ABS prototype manufacturing.",
            "Performed fit checks, assembly refinement, and physical validation of printed parts.",
            "Supported rapid design iterations by moving from CAD to usable prototype hardware.",
            "Applied practical fabrication thinking to improve assembly quality and part usability.",
        ],
        MARGIN,
        397,
        310,
        size=8,
        leading=9.5,
        gap=2.5,
    )
    draw_tags(
        pdf,
        ["3D Printing", "Rapid Prototyping", "CAD-to-Part", "PLA/ABS", "Fit Checks"],
        MARGIN,
        276,
        310,
    )

    x2 = 370
    section_label(pdf, "Mechanical Interface Design", x2, 467)
    pdf.setFillColor(MID)
    draw_wrapped(
        pdf,
        "CAD-driven interface development, physical part validation, alignment checks, and geometry "
        "refinement based on practical assembly feedback.",
        x2,
        443,
        185,
        10,
        size=8,
        max_lines=4,
    )
    draw_image(pdf, printed_model, x2, 274, 185, 118, caption="Printed model for design review and fit validation.")
    draw_bullets(
        pdf,
        [
            "Designed and manufactured prototype interface parts.",
            "Checked fit, alignment, and usability in assemblies.",
            "Refined geometry from hands-on build feedback.",
        ],
        x2,
        250,
        185,
        size=7.7,
        leading=9,
        gap=3,
    )
    draw_tags(pdf, ["Mechanical Interfaces", "Assembly", "Fit Validation"], x2, 165, 185)
    pdf.showPage()


def integration_page(
    pdf: canvas.Canvas,
    fabricated: Path | None,
    printed_uav: Path | None,
    can_1: Path | None,
    can_2: Path | None,
) -> None:
    page_header(pdf, "Case studies 03 + 06", "Hardware Integration & Prototype Testing", 5)
    draw_image(
        pdf,
        fabricated,
        MARGIN,
        500,
        310,
        215,
        caption="Full demonstration drone models combining structures, propulsion-related hardware, and landing systems.",
        caption_dark=True,
    )
    draw_image(pdf, printed_uav, 365, 500, 190, 215, caption="Mechanism and airframe integration reference.")

    section_label(pdf, "UAV Electronics, Motors, Sensors & System Integration", MARGIN, 466)
    pdf.setFillColor(MID)
    draw_wrapped(
        pdf,
        "Hands-on UAV integration covering mechanical assembly, electronics installation, actuator and "
        "propeller integration, landing gear installation, and preparation of demonstration drone models.",
        MARGIN,
        443,
        PAGE_W - 2 * MARGIN,
        10,
        size=8.4,
        max_lines=3,
    )
    draw_bullets(
        pdf,
        [
            "Integrated electronics, propellers, actuators, landing gear, and structural components into full demonstration drone models.",
            "Supported system-level build preparation for prototype testing and review.",
            "Worked across mechanical and electronic interfaces to support reliable UAV assembly.",
            "Gained hands-on exposure to ArduPilot-style flight-control workflows where applicable.",
            "Helped troubleshoot integration issues during prototype development and assembly.",
        ],
        MARGIN,
        398,
        PAGE_W - 2 * MARGIN,
        size=8,
        leading=9.5,
        gap=2.5,
    )
    draw_tags(
        pdf,
        ["System Integration", "Motors", "Actuators", "Sensors", "Avionics", "Prototype Testing", "Troubleshooting"],
        MARGIN,
        283,
        PAGE_W - 2 * MARGIN,
    )

    section_label(pdf, "Electronics Testbench Highlight: HIL-Inspired CAN Validation", MARGIN, 230)
    draw_image(pdf, can_1, MARGIN, 79, 153, 128, caption="ESP32/MCP2515 hardware setup.")
    draw_image(pdf, can_2, 203, 79, 153, 128, caption="Wired CAN testbench.")
    pdf.setFillColor(MID)
    draw_wrapped(
        pdf,
        "Electronics testbench using ESP32 and MCP2515 CAN hardware, wiring, signal validation, fault "
        "injection, and automated PASS/FAIL checks.",
        374,
        200,
        181,
        10,
        size=8,
        max_lines=5,
    )
    draw_bullets(
        pdf,
        [
            "Built and wired repeatable bench hardware.",
            "Validated signals with structured test cases.",
            "Used PASS/FAIL outputs for troubleshooting.",
        ],
        374,
        142,
        181,
        size=7.5,
        leading=8.8,
        gap=2,
    )
    pdf.showPage()


def composite_page(
    pdf: canvas.Canvas,
    wings: Path | None,
    mesh: Path | None,
    fabricated: Path | None,
) -> None:
    page_header(pdf, "Case study 04", "Composite UAV Structure Support", 6)
    draw_image(
        pdf,
        wings,
        MARGIN,
        480,
        PAGE_W - 2 * MARGIN,
        235,
        caption="UAV structural component manufactured for prototype evaluation and next-stage build learning.",
        caption_dark=True,
    )
    section_label(pdf, "Glass-Fiber Structure Direction", MARGIN, 450)
    pdf.setFillColor(MID)
    draw_wrapped(
        pdf,
        "Supported the transition toward glass-fiber reinforced composite UAV structures to improve "
        "prototype robustness for the next development phase.",
        MARGIN,
        426,
        PAGE_W - 2 * MARGIN,
        11,
        size=9,
        max_lines=3,
    )
    draw_bullets(
        pdf,
        [
            "Supported composite structure direction for UAV prototype development.",
            "Helped evaluate robustness improvements for next-stage prototype builds.",
            "Connected manufacturing feedback with structural design requirements.",
            "Highlighted practical awareness of composite materials relevant to drone production.",
        ],
        MARGIN,
        377,
        300,
        size=8.3,
        leading=10,
        gap=4,
    )
    draw_tags(
        pdf,
        ["Composites", "Glass Fiber", "UAV Structures", "Prototype Robustness", "Manufacturing Support"],
        MARGIN,
        270,
        300,
    )
    draw_image(pdf, mesh, 360, 286, 195, 125, caption="Analysis-ready airframe geometry.")
    draw_image(pdf, fabricated, 360, 118, 195, 150, caption="Prototype structures assembled for review.")

    section_label(pdf, "Build-to-Validation Loop", MARGIN, 205)
    stages = [
        ("1", "Concept & CAD"),
        ("2", "Prototype Build"),
        ("3", "Fit & Integration"),
        ("4", "Functional Review"),
        ("5", "Design Refinement"),
    ]
    y = 155
    gap = (300 - 5 * 50) / 4
    x = MARGIN
    for index, (number, label) in enumerate(stages):
        pdf.setFillColor(NAVY if index < 4 else ORANGE)
        pdf.circle(x + 18, y + 18, 18, fill=1, stroke=0)
        pdf.setFillColor(white)
        pdf.setFont("Helvetica-Bold", 10)
        pdf.drawCentredString(x + 18, y + 14, number)
        pdf.setFillColor(INK)
        pdf.setFont("Helvetica-Bold", 6.8)
        lines = wrap_lines(label, "Helvetica-Bold", 6.8, 47)
        for line_no, line in enumerate(lines[:2]):
            pdf.drawCentredString(x + 18, y - 7 - line_no * 8, line)
        if index < len(stages) - 1:
            pdf.setStrokeColor(CYAN)
            pdf.setLineWidth(1.5)
            pdf.line(x + 38, y + 18, x + 50 + gap, y + 18)
        x += 50 + gap
    pdf.showPage()


def closing_page(pdf: canvas.Canvas, fabricated: Path | None) -> None:
    pdf.setFillColor(NAVY)
    pdf.rect(0, 0, PAGE_W, PAGE_H, fill=1, stroke=0)
    draw_image(pdf, fabricated, 0, 440, PAGE_W, 402, mode="cover")
    pdf.setFillColor(Color(0.04, 0.09, 0.14, alpha=0.58))
    pdf.rect(0, 440, PAGE_W, 402, fill=1, stroke=0)
    pdf.setFillColor(CYAN)
    pdf.setFont("Helvetica-Bold", 9)
    pdf.drawString(MARGIN, 785, "APPLICATION POSITIONING")
    pdf.setFillColor(white)
    pdf.setFont("Helvetica-Bold", 27)
    pdf.drawString(MARGIN, 742, "READY TO BUILD, TEST")
    pdf.drawString(MARGIN, 708, "AND IMPROVE UAV HARDWARE")
    pdf.setFont("Helvetica", 10)
    draw_wrapped(
        pdf,
        "I am targeting hands-on prototyping, UAV assembly, hardware integration, rapid prototype "
        "manufacturing, and functional validation roles where practical build quality and engineering "
        "iteration are critical.",
        MARGIN,
        663,
        PAGE_W - 2 * MARGIN,
        14,
        size=10,
        max_lines=4,
    )

    pdf.setFillColor(white)
    pdf.roundRect(MARGIN, 225, PAGE_W - 2 * MARGIN, 176, 8, fill=1, stroke=0)
    pdf.setFillColor(NAVY)
    pdf.setFont("Helvetica-Bold", 12)
    pdf.drawString(MARGIN + 22, 370, "CORE CONTRIBUTION")
    draw_bullets(
        pdf,
        [
            "Hands-on assembly of prototype UAV structures and demonstration systems.",
            "Practical CAD-to-part manufacturing through FDM 3D printing and fit validation.",
            "Mechanical-electronic integration across sensors, actuators, propulsion-related hardware, and structures.",
            "Structured testing, troubleshooting, documentation, and iterative prototype refinement.",
        ],
        MARGIN + 22,
        344,
        PAGE_W - 2 * MARGIN - 44,
        size=8.6,
        leading=10.4,
        gap=5,
    )

    pdf.setFillColor(white)
    pdf.setFont("Helvetica-Bold", 18)
    pdf.drawString(MARGIN, 178, "Ammar Ahmed")
    pdf.setFillColor(CYAN)
    pdf.setFont("Helvetica-Bold", 9)
    pdf.drawString(MARGIN, 157, "MECHANICAL DESIGN & PROTOTYPING ENGINEER")
    pdf.setFillColor(HexColor("#DCE7ED"))
    pdf.setFont("Helvetica", 8.5)
    contacts = [
        "Erlangen, Germany  |  +49 1556 0360166",
        "ammarahmed.00748@gmail.com",
        "linkedin.com/in/ammar-ahmed11/",
        "github.com/EnggAmmar  |  enggammar.github.io/Portfolio_ammar/",
    ]
    y = 132
    for line in contacts:
        pdf.drawString(MARGIN, y, line)
        y -= 17
    footer(pdf, 7, dark=True)
    pdf.showPage()


def build_pdf() -> Path:
    DIST.mkdir(parents=True, exist_ok=True)
    CACHE.mkdir(parents=True, exist_ok=True)

    # Attempt extraction as requested. Existing stills remain the preferred layout assets.
    extract_video_frame(ASSETS / "images" / "UAV Drone Simulation.mp4", CACHE / "uav-video-frame.jpg")
    extract_video_frame(ASSETS / "3d_print_1.mp4", CACHE / "printing-video-frame.jpg")

    fabricated = existing(PROJECTS / "UAV fabricated_frame.jpeg")
    mesh = existing(PROJECTS / "UAV Mesh_frame.png")
    printed_uav = existing(PROJECTS / "uav 3d printed structure_frame.jpg")
    wings = existing(DB / "uav-wings.jpg")
    printer_1 = existing(DB / "printing-printer-01.jpg")
    printer_2 = existing(DB / "printing-printer-02.jpg")
    printed_model = existing(DB / "printing-model-01.jpg")
    can_1 = existing(DB / "automotive-can-01.jpg")
    can_2 = existing(DB / "automotive-can-02.jpg")

    pdf = canvas.Canvas(str(OUTPUT), pagesize=A4, pageCompression=1)
    pdf.setTitle("Ammar Ahmed - Quantum-Systems Prototyping Technician Portfolio")
    pdf.setAuthor("Ammar Ahmed")
    pdf.setSubject("Targeted UAV prototyping, hardware integration, and rapid manufacturing portfolio")
    pdf.setCreator("ReportLab / scripts/generate_quantum_systems_portfolio_pdf.py")

    cover_page(pdf, fabricated)
    fit_page(pdf)
    uav_page(pdf, fabricated, mesh, printed_uav)
    printing_page(pdf, printed_uav, printer_1, printer_2, printed_model)
    integration_page(pdf, fabricated, printed_uav, can_1, can_2)
    composite_page(pdf, wings, mesh, fabricated)
    closing_page(pdf, fabricated)
    pdf.save()

    if not OUTPUT.exists() or OUTPUT.stat().st_size == 0:
        raise RuntimeError(f"PDF was not generated correctly: {OUTPUT}")
    log(f"final PDF: {OUTPUT}")
    log(f"file size: {OUTPUT.stat().st_size:,} bytes")
    return OUTPUT


if __name__ == "__main__":
    build_pdf()
