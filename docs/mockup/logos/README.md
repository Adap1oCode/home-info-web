# Partner & accreditation logos

Drop real logo files in here using these exact filenames and the page picks them up
automatically — each `<img>` has an `onerror` fallback to a styled wordmark, so a missing
file simply shows the placeholder. No code change needed.

## Currently on the page — all verified in the reseller platform

| Filename                | Organisation     | Evidence                                        |
|-------------------------|------------------|-------------------------------------------------|
| `hm-land-registry.svg`  | HM Land Registry | `council-hmlr-link.ts`, `hmlr_*` council columns |
| `ordnance-survey.svg`   | Ordnance Survey  | `docs/os/licensing-position.md`, `compose-map-attribution.ts` |
| `landmark.svg`          | Landmark         | `docs/landmark.md`                              |
| `martello.svg`          | Martello         | `docs/martello.md`                              |
| `veriphy.svg`           | Veriphy          | `docs/veriphy/`, ID/AML/company/lawyer check dialogs |

## Removed — could not be verified

**Groundsure, Future Climate Info, GeoCerta and Palladium Insurance** were taken from a
competitor screenshot and appear nowhere in the codebase. They have been removed rather
than asserted.

If she confirms any of them, add a card to `.logo-grid` copying the pattern of an existing
one. The wall is a flex-wrap layout, so any number of logos lays out cleanly — there is no
grid count to adjust.

## Before these go live

Partner and accreditation logos are trademarks. Displaying one normally requires the
owner's permission and compliance with their brand guidelines. Ordnance Survey has licence
terms already documented at `E:\Dev\home-info\docs\os\licensing-position.md` — check that
first.

Prefer SVG. Aim for consistent optical weight rather than identical pixel height; each card
caps at 46px and centres on both axes.
