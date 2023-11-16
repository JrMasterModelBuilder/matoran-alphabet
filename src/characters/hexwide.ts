import {Characters} from '../characters';

/**
 * Hex characters, wide style.
 */
export class CharactersHexWide extends Characters {
	/**
	 * @inheritdoc
	 */
	public stroke = 32;

	/**
	 * @inheritdoc
	 */
	protected _elements: (readonly number[])[] = [
		/* eslint-disable line-comment-position, no-inline-comments, no-multi-spaces */
		[
			-443,
			0,
			-221.7,
			384,
			221.7,
			384,
			443,
			0,
			221.7,
			-384,
			-221.7,
			-384,
			NaN
		], // Ring: Outer
		[0, 0, 64], // Ring: CC
		[0, 256, 64], // Ring: CB
		[0, -256, 64], // Ring: CT
		[256, 0, 64], // Ring: RC
		[-256, 0, 64], // Ring: LC
		[168, -168, 64], // Ring: RT
		[168, 168, 64], // Ring: RB
		[-168, 168, 64], // Ring: LB
		[0, -384, 0, 384], // Line: CT-CB
		[-443, 0, 443, 0], // Line: CL-CR
		[-195.5, -384, -195.5, 384], // Line: TL-BL
		[195.5, -384, 195.5, 384], // Line: TR-BR
		[-332.5, -192, 332.5, -192], // Line: TL-TR
		[-332.5, 192, 332.5, 192], // Line: BL-BR
		[332.5, 192, -332.5, -192], // Line: TL-BR
		[332.5, -192, -332.5, 192], // Line: BL-TR
		[0, 0, 443, 0], // Line: CC-CR
		[0, 0, -443, 0], // Line: CC-CL
		[0, 0, 0, 384], // Line: CC-CB
		[0, 0, 332.5, -192], // Line: CC-TR
		[0, 0, 332.5, 192], // Line: CC-BR
		[0, 0, 128], // Ring: Number
		[0, -64, 0, -384], // Line: Number 1 T
		[0, 64, 0, 384], // Line: Number 2 B
		[-64, 0, -443, 0], // Line: Number 4 L
		[64, 0, 443, 0], // Line: Number 4 R
		[-54.5, 32.5, -332.5, 192], // Line: Number 3 L
		[54.5, 32.5, 332.5, 192], // Line: Number 3 R
		[-55.4, -32, -332.5, -192], // Line: Number 5 LT
		[55.4, -32, 332.5, -192], // Line: Number 5 RT
		[-55.4, 32, -332.5, 192], // Line: Number 5 LB
		[55.4, 32, 332.5, 192], // Line: Number 5 RB
		[0, -128, 0, -384], // Line: Number 7 T
		[0, 128, 0, 384], // Line: Number 8 B
		[-109, 65, -332.5, 192], // Line: Number 9 L
		[109, 65, 332.5, 192], // Line: Number 9 R
		[0, 160, 64], // Ring: Dash
		[-80, -16, 80, -16], // Line: Dash
		[0, -196, 332.5, -192], // Line: MT-RT
		[0, 196, 332.5, 192] // Line: MB-RB
		/* eslint-enable line-comment-position, no-inline-comments, no-multi-spaces */
	];

	/**
	 * CharactersHex1 constructor.
	 */
	constructor() {
		super();
	}

	/**
	 * @inheritdoc
	 */
	public get characterWidth() {
		// Trigonometry A=30,b=1: c=1.1547005383792517
		return 886 + this.stroke * 1.1547005383792517;
	}

	/**
	 * @inheritdoc
	 */
	public get characterHeight() {
		return 768 + this.stroke;
	}
}
