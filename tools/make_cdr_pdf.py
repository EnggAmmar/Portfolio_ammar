import io
import re
from pathlib import Path

from reportlab.lib import colors
from reportlab.lib.pagesizes import letter
from reportlab.lib.styles import ParagraphStyle, getSampleStyleSheet
from reportlab.lib.units import inch
from reportlab.platypus import (
    Image,
    KeepTogether,
    ListFlowable,
    ListItem,
    PageBreak,
    Paragraph,
    SimpleDocTemplate,
    Spacer,
    Table,
    TableStyle,
)

try:
    from PIL import Image as PILImage
except ImportError as exc:  # pragma: no cover
    raise SystemExit(
        "Pillow is required. Install with: pip install pillow"
    ) from exc


REPO_ROOT = Path(__file__).resolve().parents[1]
PORTFOLIO_PATH = REPO_ROOT / "src" / "portfolio.js"
OUTPUT_DIR = REPO_ROOT / "output"
OUTPUT_PDF = OUTPUT_DIR / "CDR_Mechanical_Work_Samples.pdf"


PROJECT_SELECTION = [
    "uav-design",
    "rocket-concepts",
    "3d-printing",
]


PROJECT_CONTENT = {
    "uav-design": {
        "bullets": [
            "Led structural design of a foldable fixed-wing UAV with manufacturable assemblies and serviceable subsystems.",
            "Built and validated 3D-printed airframe prototypes; iterated on ribs, spars, and fuselage joints for stiffness and weight.",
            "Integrated mechanical components with flight electronics, sensors, and actuation hardware for test-ready builds.",
            "Supported fabrication and assembly workflows to transition prototypes toward flight-ready configurations.",
        ],
        "description": (
            "This project focused on the mechanical design and prototyping of a foldable fixed-wing UAV. "
            "I developed the airframe architecture, including fuselage structure, wing mechanisms, and "
            "mounting interfaces for avionics and payloads. Multiple prototype iterations were produced "
            "using FDM printing and rapid assembly techniques, allowing quick evaluation of stiffness, "
            "packaging, and serviceability. The work emphasized manufacturability, lightweight structures, "
            "and reliable integration with flight-control and sensor hardware. The resulting prototypes "
            "supported aerodynamic testing and system-level integration prior to flight trials."
        ),
        "tools": "SolidWorks, FDM 3D printing (PLA/ABS), assembly tooling, basic CFD, systems integration",
    },
    "rocket-concepts": {
        "bullets": [
            "Developed conceptual CAD layouts for engine injector, chamber, and nozzle assemblies.",
            "Produced renders and section views to communicate flow paths and interface geometry.",
            "Considered manufacturability and integration constraints across propulsion subsystem interfaces.",
        ],
        "description": (
            "I contributed to early-stage mechanical design of launch-vehicle propulsion hardware. "
            "The work involved creating CAD concepts for injector, chamber, and nozzle geometries, "
            "with emphasis on clear mechanical interfaces and integration constraints. I generated "
            "renders and cutaway views that communicated flow paths, mounting features, and component "
            "relationships to stakeholders. The concepts balanced geometric feasibility with manufacturability, "
            "supporting downstream decisions on fabrication approach and subsystem packaging."
        ),
        "tools": "SolidWorks/NX, mechanical CAD, design for manufacturability, visualization rendering",
    },
    "3d-printing": {
        "bullets": [
            "Prepared CAD for FDM printing with proper tolerances, part orientation, and support strategy.",
            "Produced functional prototypes and assemblies to validate fit, motion, and structural behavior.",
            "Performed post-processing and iterative refinements based on test feedback.",
        ],
        "description": (
            "This body of work highlights mechanical prototyping through FDM 3D printing. "
            "I prepared CAD models for print by setting tolerances, split lines, and support strategies, "
            "then produced parts to validate fit, motion, and assembly interfaces. The prototypes were "
            "used to assess structural behavior and refine designs quickly without tooling lead time. "
            "Post-processing and re-prints were used to converge on manufacturable geometries suitable "
            "for integration into larger assemblies."
        ),
        "tools": "FDM 3D printing, CAD pre-processing, rapid prototyping, tolerance tuning",
    },
}


def _extract_array(text, start_index):
    depth = 0
    in_string = False
    escape = False
    for i in range(start_index, len(text)):
        ch = text[i]
        if ch == "\\" and in_string and not escape:
            escape = True
            continue
        if ch == '"' and not escape:
            in_string = not in_string
        escape = False
        if in_string:
            continue
        if ch == "[":
            depth += 1
            if depth == 1:
                array_start = i
        elif ch == "]":
            depth -= 1
            if depth == 0:
                return text[array_start + 1 : i]
    return ""


def _extract_objects(array_text):
    objects = []
    depth = 0
    in_string = False
    escape = False
    start = None
    for i, ch in enumerate(array_text):
        if ch == "\\" and in_string and not escape:
            escape = True
            continue
        if ch == '"' and not escape:
            in_string = not in_string
        escape = False
        if in_string:
            continue
        if ch == "{":
            depth += 1
            if depth == 1:
                start = i
        elif ch == "}":
            depth -= 1
            if depth == 0 and start is not None:
                objects.append(array_text[start : i + 1])
                start = None
    return objects


def _get_string_field(obj_text, field_name):
    match = re.search(rf"{field_name}\s*:\s*\"(.*?)\"", obj_text, re.S)
    if match:
        return match.group(1).strip()
    return ""


def _get_media_items(obj_text):
    media_match = re.search(r"media\s*:\s*\[", obj_text)
    if not media_match:
        return []
    array_text = _extract_array(obj_text, media_match.end() - 1)
    media_objects = _extract_objects(array_text)
    items = []
    for media_text in media_objects:
        media_type = _get_string_field(media_text, "type")
        src_match = re.search(r'src\s*:\s*require\("([^"]+)"\)', media_text)
        src = src_match.group(1) if src_match else ""
        alt = _get_string_field(media_text, "alt")
        caption = _get_string_field(media_text, "caption")
        items.append(
            {
                "type": media_type,
                "src": src,
                "alt": alt,
                "caption": caption,
            }
        )
    return items


def load_projects():
    text = PORTFOLIO_PATH.read_text(encoding="utf-8", errors="ignore")
    projects_match = re.search(r"projects\s*:\s*\[", text)
    if not projects_match:
        return []
    array_text = _extract_array(text, projects_match.end() - 1)
    project_objects = _extract_objects(array_text)
    projects = []
    for project_text in project_objects:
        project_id = _get_string_field(project_text, "id")
        project_name = _get_string_field(project_text, "projectName")
        project_desc = _get_string_field(project_text, "projectDesc")
        media = _get_media_items(project_text)
        projects.append(
            {
                "id": project_id,
                "projectName": project_name,
                "projectDesc": project_desc,
                "media": media,
            }
        )
    return projects


def load_image_for_report(path, max_width, max_height):
    try:
        with PILImage.open(path) as img:
            if img.mode not in ("RGB", "L"):
                img = img.convert("RGB")
            width_px, height_px = img.size
            scale = min(max_width / width_px, max_height / height_px, 1.0)
            new_width = int(width_px * scale)
            new_height = int(height_px * scale)
            if scale < 1.0:
                img = img.resize((new_width, new_height), PILImage.LANCZOS)
            buffer = io.BytesIO()
            img.save(buffer, format="JPEG", quality=82, optimize=True)
            buffer.seek(0)
            return buffer, new_width, new_height
    except Exception:
        return None, None, None


def build_pdf(projects):
    OUTPUT_DIR.mkdir(parents=True, exist_ok=True)

    styles = getSampleStyleSheet()
    styles.add(
        ParagraphStyle(
            name="SectionTitle",
            fontName="Helvetica-Bold",
            fontSize=16,
            leading=20,
            spaceAfter=6,
        )
    )
    styles.add(
        ParagraphStyle(
            name="BodySmall",
            fontName="Helvetica",
            fontSize=10.5,
            leading=14,
        )
    )
    styles.add(
        ParagraphStyle(
            name="Caption",
            fontName="Helvetica-Oblique",
            fontSize=8.5,
            leading=11,
            textColor=colors.grey,
            alignment=1,
        )
    )

    doc = SimpleDocTemplate(
        str(OUTPUT_PDF),
        pagesize=letter,
        leftMargin=0.7 * inch,
        rightMargin=0.7 * inch,
        topMargin=0.65 * inch,
        bottomMargin=0.65 * inch,
        title="Mechanical Work Samples",
        author="Ammar Ahmed",
    )

    story = []

    story.append(Paragraph("Ammar Ahmed", styles["Title"]))
    story.append(
        Paragraph("Mechanical Work Samples (2-3 Projects)", styles["SectionTitle"])
    )
    summary = (
        "Mechanical design and prototyping experience spanning UAV structures, propulsion "
        "concepts, and rapid manufacturing. Focused on CAD-driven development, lightweight "
        "structures, and integration of mechanical assemblies with electronics and test setups."
    )
    story.append(Paragraph(summary, styles["BodySmall"]))
    story.append(Spacer(1, 0.35 * inch))

    page_width, _ = letter
    usable_width = page_width - doc.leftMargin - doc.rightMargin
    cell_width = (usable_width - 0.2 * inch) / 2
    image_max_height = 3.2 * inch

    for index, project in enumerate(projects):
        if index > 0:
            story.append(PageBreak())

        project_title = project["projectName"] or project["id"]
        project_info = PROJECT_CONTENT.get(project["id"], {})
        description = project_info.get("description") or project.get("projectDesc", "")
        bullets = project_info.get("bullets", [])
        tools = project_info.get("tools", "")

        story.append(Paragraph(project_title, styles["SectionTitle"]))
        if description:
            story.append(Paragraph(description, styles["BodySmall"]))
            story.append(Spacer(1, 0.12 * inch))

        if bullets:
            bullet_items = [
                ListItem(Paragraph(item, styles["BodySmall"]), leftIndent=8)
                for item in bullets
            ]
            story.append(
                KeepTogether(
                    [
                        Paragraph("My Role / Contributions", styles["Heading4"]),
                        ListFlowable(
                            bullet_items,
                            bulletType="bullet",
                            leftIndent=16,
                            bulletFontSize=8,
                        ),
                    ]
                )
            )
            story.append(Spacer(1, 0.12 * inch))

        if tools:
            story.append(
                Paragraph(f"<b>Tools/Skills:</b> {tools}", styles["BodySmall"])
            )
            story.append(Spacer(1, 0.2 * inch))

        image_cells = []
        for media in project.get("media", []):
            if media.get("type") != "image":
                continue
            if not media.get("src"):
                continue
            image_path = (REPO_ROOT / "src" / media["src"]).resolve()
            if not image_path.exists():
                continue
            buffer, width, height = load_image_for_report(
                image_path, cell_width, image_max_height
            )
            if not buffer:
                continue
            image_flowable = Image(buffer, width=width, height=height)
            caption_text = media.get("caption") or media.get("alt") or image_path.name
            caption = Paragraph(caption_text, styles["Caption"])
            image_cells.append([image_flowable, caption])

        if image_cells:
            rows = []
            for i in range(0, len(image_cells), 2):
                row = []
                for cell in image_cells[i : i + 2]:
                    row.append(cell)
                if len(row) == 1:
                    row.append("")
                rows.append(row)

            table = Table(
                rows,
                colWidths=[cell_width, cell_width],
                hAlign="LEFT",
                spaceBefore=6,
            )
            table.setStyle(
                TableStyle(
                    [
                        ("VALIGN", (0, 0), (-1, -1), "TOP"),
                        ("LEFTPADDING", (0, 0), (-1, -1), 0),
                        ("RIGHTPADDING", (0, 0), (-1, -1), 8),
                        ("BOTTOMPADDING", (0, 0), (-1, -1), 10),
                    ]
                )
            )
            story.append(table)

    doc.build(story)


def main():
    projects = load_projects()
    selected = []
    for project_id in PROJECT_SELECTION:
        match = next((p for p in projects if p["id"] == project_id), None)
        if match:
            selected.append(match)
    if not selected:
        raise SystemExit("No matching projects found in portfolio.js.")
    build_pdf(selected)
    print(f"Generated PDF: {OUTPUT_PDF}")


if __name__ == "__main__":
    main()
