# fractal-graph-generator

🇺🇸 English | 🇧🇷 [Português](README.md)

> A hierarchical graph generator with self-similar fractal visualization, in vanilla JavaScript on Canvas 2D.

## Overview

**fractal-graph-generator** renders hierarchical graphs with a **fractal** aesthetic: each child node is drawn proportionally smaller than its parent (1/4 scale) and placed in a circle around it, producing a self-similar "infinite zoom" structure. Built in **vanilla JavaScript** on **Canvas 2D**, with no external dependencies.

![start](https://user-images.githubusercontent.com/18644558/217813865-5f6c59a0-8a34-4a0f-89ab-3545e8336bb2.png)

## How it works

- **`No` (node)** — each node stores position, `target`, size, angle relative to its parent, and lists of `parents` and `children`. A child's size is the parent's divided by 4 (the fractal ratio).
- **`Trilha`** — container that initializes the root node.
- **Polar placement** — children are distributed in a circle around the parent; each angle is `360 / (number of children + 1)`, and the coordinate is computed by trigonometry (`x = radius·cos(θ) + parent.x`).
- **Smooth animation** — each node's position interpolates toward its `target`, and the camera also lerps when focusing a node, giving fluid pan/zoom via `requestAnimationFrame`.
- **Visual depth** — edge opacity decreases with generation depth.
- **Culling** — off-screen or too-small nodes are not drawn.
- **Multiple parents** — the structure supports DAGs (not just trees) via `insertParents()`.

## Running

It's **pure browser** — no server needed. Just open `index.html` in your browser, then use the **browser console** to build graphs:

```javascript
// Insert a child into the root:
TRILHA.main.insertChildren({ x: 0, y: 0 })

// Generate a prefabricated fractal graph (recursive):
build(TRILHA.main)
```

![fractal](https://user-images.githubusercontent.com/18644558/217813851-a397aedf-5023-4244-9238-c1c28aab2b88.png)

**Visual interaction:** moving the mouse maps to a position in graph space; clicking a node zooms the camera onto it (clicking again returns to the parent).

## Project status

Functional prototype. The classes and render loop work; pan/zoom, placement, and culling are implemented. Known limitations:

- Construction is console-driven — there is no UI (buttons/sliders).
- Edges are drawn only for the first parent (`parents[0]`), even though the structure supports multiple.
- No persistence (save/load) or export (PNG/SVG/JSON).
- Fixed colors; uses global variables (`TRILHA`, `mouse`, etc.).

## License

This project does not yet declare a license. Until one is added, all rights are reserved by the author.
