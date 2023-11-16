# matoran-alphabet

Package for drawing Matoran alphabet characters

[![npm](https://img.shields.io/npm/v/matoran-alphabet.svg)](https://npmjs.com/package/matoran-alphabet)
[![node](https://img.shields.io/node/v/matoran-alphabet.svg)](https://nodejs.org)

[![size](https://packagephobia.now.sh/badge?p=matoran-alphabet)](https://packagephobia.now.sh/result?p=matoran-alphabet)
[![downloads](https://img.shields.io/npm/dm/matoran-alphabet.svg)](https://npmcharts.com/compare/matoran-alphabet?minimal=true)

[![Build Status](https://github.com/JrMasterModelBuilder/matoran-alphabet/workflows/main/badge.svg)](https://github.com/JrMasterModelBuilder/matoran-alphabet/actions?query=workflow%3Amain+branch%3Amain)

# Overview

Currently supports drawing multiple different character styles as SVG code.

# Usage

## Basic Usage

```js
import { CharactersRound, SvgEncoder } from "matoran-alphabet";

const characters = new CharactersRound();
const svg = new SvgEncoder(characters);
console.log(svg.encode("A"));
```

## Characters Styles

Multple styles are available.

-   `CharactersRound`
-   `CharactersHex1`
-   `CharactersHex2`

## Line Stroke and Margins

The stroke and marign around the characters can be adjusted.

```js
characters.stroke = 16;
characters.margin.top = 2;
characters.margin.right = 4;
characters.margin.left = 6;
characters.margin.bottom = 8;
```

# SVG Options

The SVG code can be customized.

```js
svg.header = '<?xml version="1.0" encoding="UTF-8"?>\n';
svg.svgAttrs["xmlns:svg"] = "http://www.w3.org/2000/svg";
svg.pathAttrs.stroke = "#808080";
svg.prepend = "<g>";
svg.append = "</g>";
```

# Bugs

If you find a bug or have compatibility issues, please open a ticket under issues section for this repository.

# License

Copyright (c) 2021-2023 JrMasterModelBuilder

Licensed under the Mozilla Public License, v. 2.0.

If this license does not work for you, feel free to contact me.
