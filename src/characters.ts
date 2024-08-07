/**
 * Base class for defining characters and their elements.
 */
export abstract class Characters extends Object {
	/**
	 * Round values to specified decimal places.
	 */
	public precision = 1;

	/**
	 * The stroke size of the lines.
	 */
	public abstract stroke: number;

	/**
	 * Character and their elements encode bits.
	 */
	protected readonly _characters: {[c: string]: number | null} = {
		/* eslint-disable @typescript-eslint/naming-convention */
		' ': 0b00000000000000000000000000000000000000000,
		A: 0b00000000000000000000000000000000000000101,
		B: 0b00000000000000000000000000000000000001101,
		C: 0b00000000000000000000000000000000000010001,
		D: 0b00000000000000000000000000000001000010001,
		E: 0b00000000000000000000000000110000000000001,
		F: 0b00000000000000000000000000010000000000001,
		G: 0b00000000000000000000000100000001000000001,
		H: 0b00000000000000000000000000001100000001101,
		I: 0b00000000000000000000000000000001000000001,
		J: 0b00000000000000000000000000000001100000001,
		K: 0b00000000000000000001101000000000000000001,
		L: 0b00000000000000000000000000000001010000001,
		M: 0b00000000000000000000000000001100000000001,
		N: 0b00000000000000000000000001000000000000001,
		O: 0b00000000000000000000000000000000000000001,
		P: 0b00000000000000000000000000000001001000001,
		Q: 0b00000000000000000000000000000000010000001,
		R: 0b00000000000000000000000100000001001000001,
		S: 0b00000000000000000000000000000000101000001,
		T: 0b00000000000000000000010000000010000000001,
		U: 0b00000000000000000000000000000000000001001,
		V: 0b00000000000000000000000011000000000001001,
		W: 0b00000000000000000000000011000000000110001,
		X: 0b00000000000000000000000011000000000000001,
		Y: 0b00000000000000000000100001000000000000001,
		Z: 0b00000000000000000000000010000000000000001,
		'0': 0b00000000000000000000000000000000000000011,
		'1': 0b00000000000000000100000000000000000000011,
		'2': 0b00000000000000001100000000000000000000011,
		'3': 0b00000000000011000100000000000000000000011,
		'4': 0b00000000000000111100000000000000000000011,
		'5': 0b00000000111100000100000000000000000000011,
		'6': 0b00000000000000000010000000000000000000011,
		'7': 0b00000001000000000010000000000000000000011,
		'8': 0b00000011000000000010000000000000000000011,
		'9': 0b00001101000000000010000000000000000000011,
		'.': 0b00000000000000000000000000000000000000010,
		'-': 0b00110000000000000000000000000000000000000,
		'\u00C6': 0b11000000000000000000000000000011000000001,
		'\u00D8': 0b00000000000000000000000000100001000000001,
		'\u00C5': 0b00000000000000000000000000100000000001001
		/* eslint-enable @typescript-eslint/naming-convention */
	};

	/**
	 * Character elements.
	 */
	protected abstract readonly _elements: (readonly number[])[];

	/**
	 * Margin values.
	 */
	public margin = {
		left: 0,
		right: 0,
		top: 0,
		bottom: 0
	};

	/**
	 * Characters constructor.
	 */
	constructor() {
		super();
	}

	/**
	 * Character width, with stroke.
	 *
	 * @returns Width size.
	 */
	public abstract get characterWidth(): number;

	/**
	 * Character height, with stroke.
	 *
	 * @returns Height size.
	 */
	public abstract get characterHeight(): number;

	/**
	 * Character center X position, with margins.
	 *
	 * @returns X position.
	 */
	public get centerX() {
		return (
			this.margin.left +
			(this.width - (this.margin.left + this.margin.right)) * 0.5
		);
	}

	/**
	 * Character center Y position, with margins.
	 *
	 * @returns Y position.
	 */
	public get centerY() {
		return (
			this.margin.top +
			(this.height - (this.margin.top + this.margin.bottom)) * 0.5
		);
	}

	/**
	 * Total width, with margin, rounded up to the next pixel.
	 *
	 * @returns Total width.
	 */
	public get width() {
		return Math.ceil(
			this.margin.left + this.characterWidth + this.margin.right
		);
	}

	/**
	 * Total height, with margin, rounded up to the next pixel.
	 *
	 * @returns Total height.
	 */
	public get height() {
		return Math.ceil(
			this.margin.top + this.characterHeight + this.margin.bottom
		);
	}

	/**
	 * Round value to the configured precision.
	 *
	 * @param n Value to be rounded.
	 * @returns Rounded value.
	 */
	public round(n: number) {
		const x = Math.pow(10, this.precision);
		return x ? Math.floor(n * x) / x : n;
	}

	/**
	 * Get character encode bits.
	 *
	 * @param character The character to encode.
	 * @returns Encode bits or null.
	 */
	public getCharacter(character: string) {
		const c = character.toUpperCase();
		const {_characters} = this;
		return Object.prototype.hasOwnProperty.call(_characters, c)
			? _characters[c]
			: null;
	}

	/**
	 * Get character elements for encode bits.
	 * Each length will be 3 (circle), 4 (line), or >4 (path).
	 * Circle: `[r, cx, cy]`
	 * Line: `[x1, y1, x2, y2]`
	 * Path: `[x1, y1, x2, y2, ...]` (NaN ending closes path)
	 * Values are padded and made absolute.
	 *
	 * @param bits Encode bits.
	 * @returns Element coordinates or null.
	 */
	public getElements(bits: number) {
		const {_elements} = this;
		const c = [this.centerX, this.centerY];
		const r = [];
		for (let i = 0; bits >= 1; bits /= 2, i++) {
			// eslint-disable-next-line no-bitwise
			if (bits & 1) {
				const e = _elements[i];
				r.push(
					e.map((v, i) =>
						this.round(i === 2 && e.length === 3 ? v : v + c[i % 2])
					)
				);
			}
		}
		return r;
	}

	/**
	 * Get character elements for a character.
	 *
	 * @param character The character to encode.
	 * @returns Element coordinates or null.
	 */
	public getCharacterElements(character: string) {
		const bits = this.getCharacter(character);
		return bits === null ? null : this.getElements(bits);
	}
}
