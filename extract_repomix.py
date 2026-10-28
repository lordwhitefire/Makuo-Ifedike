"""Extract files from a repomix XML packed file back into a folder structure.

Usage:
    python3 extract_repomix.py andle-portfolio-repomix.xml ./my-portfolio

This reads the repomix XML, finds every <file path="...">...</file> entry,
and writes each file's contents into the target folder, recreating the
directory structure.

If no target folder is given, defaults to ./extracted.

Works with repomix output styles: xml (default), and the --parsable-style
variant (which HTML-escapes special characters in the file content).
"""
import sys
import os
import re
from pathlib import Path
from html import unescape


def extract(repomix_path: str, target_dir: str) -> int:
    src = Path(repomix_path)
    if not src.exists():
        print(f"Error: {repomix_path} not found", file=sys.stderr)
        return 1

    out = Path(target_dir)
    out.mkdir(parents=True, exist_ok=True)

    # Read entire file as text
    text = src.read_text(encoding="utf-8", errors="replace")

    # Match every <file path="...">...</file> block (DOTALL = . matches newlines)
    # The content inside may be HTML-escaped (if --parsable-style was used) or raw.
    pattern = re.compile(
        r'<file\s+path="([^"]+)">(.*?)</file>',
        re.DOTALL,
    )

    count = 0
    skipped = []
    for match in pattern.finditer(text):
        rel_path = match.group(1)
        content = match.group(2)

        # Unescape HTML entities (repomix --parsable-style escapes & < > etc.)
        content = unescape(content)

        # Resolve safely inside OUT
        target = (out / rel_path).resolve()
        try:
            target.relative_to(out.resolve())
        except ValueError:
            skipped.append(rel_path)
            continue

        target.parent.mkdir(parents=True, exist_ok=True)
        target.write_text(content, encoding="utf-8")
        count += 1
        print(f"  + {rel_path}  ({len(content):,} bytes)")

    print(f"\nExtracted {count} files into {out}/")
    if skipped:
        print("Skipped (outside root):")
        for s in skipped:
            print(" -", s)
    return 0


if __name__ == "__main__":
    if len(sys.argv) < 2:
        print(__doc__)
        sys.exit(1)
    repomix_path = sys.argv[1]
    target_dir = sys.argv[2] if len(sys.argv) > 2 else "./extracted"
    sys.exit(extract(repomix_path, target_dir))
