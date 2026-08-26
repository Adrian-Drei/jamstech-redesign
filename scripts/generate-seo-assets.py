from pathlib import Path
import base64
import io

from PIL import Image


ROOT = Path(__file__).resolve().parents[1]
PUBLIC = ROOT / "public"
NAVY = "#07111B"

mark = Image.open(PUBLIC / "images" / "jams-tech-logo.png").convert("RGB")
mark = mark.resize((512, 512), Image.Resampling.LANCZOS)
mark.save(PUBLIC / "icon-512x512.png", optimize=True)
mark.resize((192, 192), Image.Resampling.LANCZOS).save(PUBLIC / "icon-192x192.png", optimize=True)
mark.resize((180, 180), Image.Resampling.LANCZOS).save(PUBLIC / "apple-touch-icon.png", optimize=True)
mark.resize((32, 32), Image.Resampling.LANCZOS).save(PUBLIC / "favicon-32x32.png", optimize=True)
mark.resize((16, 16), Image.Resampling.LANCZOS).save(PUBLIC / "favicon-16x16.png", optimize=True)
mark.save(PUBLIC / "favicon.ico", sizes=[(16, 16), (32, 32), (48, 48), (64, 64), (128, 128), (256, 256)])

buffer = io.BytesIO()
mark.resize((256, 256), Image.Resampling.LANCZOS).save(buffer, format="PNG", optimize=True)
encoded_mark = base64.b64encode(buffer.getvalue()).decode("ascii")
(PUBLIC / "favicon.svg").write_text(
    '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 256 256">'
    f'<rect width="256" height="256" fill="{NAVY}"/>'
    f'<image width="256" height="256" href="data:image/png;base64,{encoded_mark}"/>'
    "</svg>",
    encoding="utf-8",
)

og_source = Image.open(PUBLIC / "images" / "og-source.png").convert("RGB")
og_source.resize((1200, 630), Image.Resampling.LANCZOS).save(
    PUBLIC / "og-image.png",
    optimize=True,
)
