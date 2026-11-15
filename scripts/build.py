"""Build the static publication directory from an explicit allowlist.

Reference boards, private QA and source documentation never enter dist/.
"""
from pathlib import Path
import shutil

ROOT = Path(__file__).resolve().parents[1]
DEST = ROOT / 'dist'
DEST.mkdir(exist_ok=True)
# Remove only stale files within this known generated directory; no external paths.
for existing in DEST.rglob('*'):
    if existing.is_file():
        resolved = existing.resolve()
        if not resolved.is_relative_to(DEST.resolve()):
            raise RuntimeError(f'Unexpected build path: {existing}')
        existing.unlink()
for name in ('index.html', 'en.html'):
    shutil.copy2(ROOT / name, DEST / name)
shutil.copytree(ROOT / 'assets', DEST / 'assets', dirs_exist_ok=True)
assert not (DEST / 'design-references').exists()
print(f'Static build: {DEST} (HTML + assets only)')
