import {Characters} from './characters';

/**
 * Class for encoding characters to an SVG document.
 */
export class SvgEncoder extends Object {
	/**
	 * Characters instance.
	 */
	public readonly characters: Characters;

	/**
	 * Optionall header for the SVG code.
	 */
	public header = '';

	/**
	 * SVG document attributes, null and undefined skipped, others string cast.
	 */
	public svgAttrs: {[attr: string]: any} = {
		xmlns: 'http://www.w3.org/2000/svg'
	};

	/**
	 * SVG document attributes, null and undefined skipped, others string cast.
	 */
	public pathAttrs: {[attr: string]: any} = {
		fill: 'none',
		stroke: '#000'
	};

	/**
	 * Code to prepend to SVG document.
	 */
	public prepend = '';

	/**
	 * Code to append to SVG document.
	 */
	public append = '';

	/**
	 * SvgEncoder constructor.
	 *
	 * @param characters Characters instance.
	 */
	constructor(characters: Characters) {
		super();

		this.characters = characters;
	}

	/**
	 * Encode XML entities.
	 *
	 * @param str String to encode.
	 * @returns Encoded string.
	 */
	public entities(str: string) {
		return str.replace(/[&'"<>]/g, c => `&#${c.charCodeAt(0)};`);
	}

	/**
	 * Create an XML tag.
	 *
	 * @param name Tag name.
	 * @param attrs Tag arributes.
	 * @param content String content, or null for self-closing.
	 * @returns XML tag.
	 */
	public tag(
		name: string,
		attrs: Readonly<{[attr: string]: any}> = {},
		content: string | null = null
	) {
		const a = Object.keys(attrs).reduce((a, p) => {
			const v = attrs[p];
			// eslint-disable-next-line no-eq-null, eqeqeq
			return v == null ?
				a :
				`${a} ${this.entities(p)}="${this.entities(String(v))}"`;
		}, '');
		const end = content === null ? '/>' : `>${content}</${name}>`;
		return `<${name}${a}${end}`;
	}

	/**
	 * Generate SVG circle tag.
	 *
	 * @param cx Center X.
	 * @param cy Center Y.
	 * @param r Radius size.
	 * @returns Circle tag.
	 */
	public circle(cx: number, cy: number, r: number) {
		return this.tag('circle', Object.assign({
			'stroke-width': this.characters.stroke,
			r,
			cx,
			cy
		}, this.pathAttrs));
	}

	/**
	 * Generate SVG line tag.
	 *
	 * @param x1 Start X.
	 * @param y1 Start Y.
	 * @param x2 End X.
	 * @param y2 End Y.
	 * @returns Line tag.
	 */
	public line(x1: number, y1: number, x2: number, y2: number) {
		return this.tag('line', Object.assign({
			'stroke-width': this.characters.stroke,
			x1,
			y1,
			x2,
			y2
		}, this.pathAttrs));
	}

	/**
	 * Generate SVG path tag.
	 *
	 * @param path Sequence of alternating X and Y positions.
	 * @returns Path tag.
	 */
	public path(path: readonly number[]) {
		let d = '';
		for (let i = 0; i < path.length; i += 2) {
			const x = path[i];
			// NaN, the only value not equal to self, closes path.
			// eslint-disable-next-line no-self-compare
			d += (x === x) ? `${i ? 'L' : 'M'}${x},${path[i + 1]}` : 'z';
		}
		return this.tag('path', Object.assign({
			'stroke-width': this.characters.stroke,
			d
		}, this.pathAttrs));
	}

	/**
	 * Convert element data to SVG tag, based on data length.
	 *
	 * @param element Element data.
	 * @returns SVG tag.
	 */
	public element(element: readonly number[]) {
		const l = element.length;
		if (l === 3) {
			return this.circle(...(element as [number, number, number]));
		}
		if (l === 4) {
			return this.line(...(element as [number, number, number, number]));
		}
		return this.path(element);
	}

	/**
	 * Encode a character as SVG code.
	 *
	 * @param character The character to encode.
	 * @returns SVG code or null if character is unknown.
	 */
	public encode(character: string) {
		const {width, height} = this.characters;
		const els = this.characters.getCharacterElements(character);
		return els ? this.header + this.tag(
			'svg',
			Object.assign({
				width,
				height,
				viewBox: `0 0 ${width} ${height}`
			}, this.svgAttrs),
			(
				this.prepend +
				els.reduce((a, e) => a + this.element(e), '') +
				this.append
			)
		) : null;
	}
}
