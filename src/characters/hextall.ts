import { Characters } from "../characters";

/**
 * Hex characters, tall style.
 */
export class CharactersHexTall extends Characters {
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
			0,
			-443,
			384,
			-221.7,
			384,
			221.7,
			0,
			443,
			-384,
			221.7,
			-384,
			-221.7,
			NaN,
		], // Ring: Outer
		[0, 0, 64], // Ring: CC
		[0, 256, 64], // Ring: CB
		[0, -256, 64], // Ring: CT
		[256, 0, 64], // Ring: RC
		[-256, 0, 64], // Ring: LC
		[168, -168, 64], // Ring: RT
		[168, 168, 64], // Ring: RB
		[-168, 168, 64], // Ring: LB
		[0, -443, 0, 443], // Line: CT-CB
		[-384, 0, 384, 0], // Line: CL-CR
		[-192, -332.4, -192, 332.4], // Line: TL-BL
		[192, -332.4, 192, 332.4], // Line: TR-BR
		[-384, -196, 384, -196], // Line: TL-TR
		[-384, 196, 384, 196], // Line: BL-BR
		[384, 221.7, -384, -221.7], // Line: TL-BR
		[384, -221.7, -384, 221.7], // Line: BL-TR
		[0, 0, 384, 0], // Line: CC-CR
		[0, 0, -384, 0], // Line: CC-CL
		[0, 0, 0, 443], // Line: CC-CB
		[0, 0, 384, -221.7], // Line: CC-TR
		[0, 0, 384, 221.7], // Line: CC-BR
		[0, 0, 128], // Ring: Number
		[0, -64, 0, -443], // Line: Number 1 T
		[0, 64, 0, 443], // Line: Number 2 B
		[-64, 0, -384, 0], // Line: Number 4 L
		[64, 0, 384, 0], // Line: Number 4 R
		[-54.5, 32.5, -384, 221.7], // Line: Number 3 L
		[54.5, 32.5, 384, 221.7], // Line: Number 3 R
		[-55.4, -32, -384, -221.7], // Line: Number 5 LT
		[55.4, -32, 384, -221.7], // Line: Number 5 RT
		[-55.4, 32, -384, 221.7], // Line: Number 5 LB
		[55.4, 32, 384, 221.7], // Line: Number 5 RB
		[0, -128, 0, -443], // Line: Number 7 T
		[0, 128, 0, 443], // Line: Number 8 B
		[-109, 65, -384, 221.7], // Line: Number 9 L
		[109, 65, 384, 221.7], // Line: Number 9 R
		[0, 160, 64], // Ring: Dash
		[-80, -16, 80, -16], // Line: Dash
		[0, -196, 384, -196], // Line: MT-RT
		[0, 196, 384, 196], // Line: MB-RB
		/* eslint-enable line-comment-position, no-inline-comments, no-multi-spaces */
	];

	/**
	 * CharactersHex2 constructor.
	 */
	constructor() {
		super();

		this._characters["4"] = 0b00000000111100000000000000000000000000011;
	}

	/**
	 * @inheritdoc
	 */
	public get characterWidth() {
		return 768 + this.stroke;
	}

	/**
	 * @inheritdoc
	 */
	public get characterHeight() {
		// Trigonometry A=30,b=1: c=1.1547005383792517
		return 886 + this.stroke * 1.1547005383792517;
	}
}
