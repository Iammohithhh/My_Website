---
title: "Example post: how writing works on this site"
description: "A draft that shows every formatting feature. It is never published; copy it to start a new post."
date: 2026-10-15
# updated: 2026-11-01
tags: [meta]
draft: true
---

This file is a **draft**, so it appears when you run `npm run dev` but is left out of the live site and the RSS feed. To publish a post, set `draft: false` (or delete the line).

The file name becomes the URL: `content/writing/example-post.md` → `/writing/example-post`. Don't rename a post after publishing, or old links will break.

## Equations

Inline maths uses single dollar signs, like $q_i = \int_{\Omega_i} \rho(\mathbf{r})\, d\mathbf{r}$. Display maths uses double dollar signs:

$$
E_{\text{elec}} = \frac{1}{2} \sum_{i \neq j} \frac{q_i q_j}{4 \pi \varepsilon_0 r_{ij}}
$$

## Code

```python
import torch

A = torch.randn(64, 64, dtype=torch.float64)
q = torch.linalg.pinv(A) @ b
q = q - (q.sum() - total_charge) / len(q)  # renormalise
```

## Figures

Put images in `public/writing/<post-name>/`. The text in quotes becomes the caption; the text in square brackets is alt text for screen readers.

![A smooth decaying oscillation](/writing/example-post/figure.svg "Figure 1. A placeholder figure with a caption.")

## Footnotes and references

Footnotes are numbered automatically.[^1] Tables work too:

| System | Atoms |
| --- | --- |
| NaCl vacancy supercell | 7–63 |
| MoS₂ monolayer | — |

[^1]: Use footnotes for references, e.g. Mohith H and S. Vijay, *J. Chem. Theory Comput.* **22**, 7362 (2026).
