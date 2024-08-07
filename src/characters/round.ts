import {Characters} from '../characters.ts';

/**
 * Round characters.
 */
export class CharactersRound extends Characters {
	/**
	 * @inheritdoc
	 */
	public stroke = 32;

	/**
	 * @inheritdoc
	 */
	protected _elements: (readonly number[])[] = [
		/* eslint-disable line-comment-position, no-inline-comments */
		[0, 0, 384], // Ring: Outer
		[0, 0, 64], // Ring: CC
		[0, 256, 64], // Ring: CB
		[0, -256, 64], // Ring: CT
		[256, 0, 64], // Ring: RC
		[-256, 0, 64], // Ring: LC
		[192, -192, 64], // Ring: RT
		[192, 192, 64], // Ring: RB
		[-192, 192, 64], // Ring: LB
		[0, -384, 0, 384], // Line: CT-CB
		[-384, 0, 384, 0], // Line: CL-CR
		[-192, -330, -192, 330], // Line: TL-BL
		[192, -330, 192, 330], // Line: TR-BR
		[-330, -192, 330, -192], // Line: TL-TR
		[-330, 192, 330, 192], // Line: BL-BR
		[272, 272, -272, -272], // Line: TL-BR
		[272, -272, -272, 272], // Line: BL-TR
		[0, 0, 384, 0], // Line: CC-CR
		[0, 0, -384, 0], // Line: CC-CL
		[0, 0, 0, 384], // Line: CC-CB
		[0, 0, 272, -272], // Line: CC-TR
		[0, 0, 272, 272], // Line: CC-BR
		[0, 0, 128], // Ring: Number
		[0, -64, 0, -384], // Line: Number 1 T
		[0, 64, 0, 384], // Line: Number 2 B
		[-64, 0, -384, 0], // Line: Number 4 L
		[64, 0, 384, 0], // Line: Number 4 R
		[-54.5, 32.5, -329, 200], // Line: Number 3 L
		[54.5, 32.5, 329, 200], // Line: Number 3 R
		[-60.5, -19.5, -365, -118.5], // Line: Number 5 LT
		[60.5, -19.5, 365, -118.5], // Line: Number 5 RT
		[-37, 51.5, -226, 310.5], // Line: Number 5 LB
		[37, 51.5, 226, 310.5], // Line: Number 5 RB
		[0, -128, 0, -384], // Line: Number 7 T
		[0, 128, 0, 384], // Line: Number 8 B
		[-109, 65, -329, 200], // Line: Number 9 L
		[109, 65, 329, 200], // Line: Number 9 R
		[0, 160, 64], // Ring: Dash
		[-80, -16, 80, -16], // Line: Dash
		[0, -192, 330, -192], // Line: MT-RT
		[0, 192, 330, 192] // Line: MB-RB
		/* eslint-enable line-comment-position, no-inline-comments */
	];

	/**
	 * CharactersRound constructor.
	 */
	constructor() {
		super();
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
		return 768 + this.stroke;
	}
}
