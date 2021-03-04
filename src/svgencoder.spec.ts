import fse from 'fs-extra';

import {Characters} from './characters';
import {CharactersRound} from './characters/round';
import {CharactersHexTall} from './characters/hextall';
import {CharactersHexWide} from './characters/hexwide';
import {SvgEncoder} from './svgencoder';

function * generate() {
	const chars = ' ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789.-\u00C6\u00D8\u00C5';
	for (const [name, characters] of [
		['round', new CharactersRound()],
		['hexwide', new CharactersHexWide()],
		['hextall', new CharactersHexTall()]
	] as [string, Characters][]) {
		for (const options of [false, true]) {
			yield [name, characters, chars, options] as [
				string, Characters, string, boolean
			];
		}
	}
}

describe('svg/encoder', () => {
	for (const [name, characters, chars, options] of generate()) {
		const suffix = options ? 'options' : 'defaults';
		const dir = `spec/generated/${name}`;

		it(`${name}: ${suffix}`, async () => {
			const images = [];
			const encoder = new SvgEncoder(characters);
			if (options) {
				characters.stroke /= 2;
				const {margin} = characters;
				margin.left = margin.right = 10;
				margin.top = margin.bottom = 20;
				encoder.svgAttrs['xmlns:svg'] = 'http://www.w3.org/2000/svg';
				encoder.pathAttrs.stroke = '#FFFFFF';
				encoder.pathAttrs.opacity = 0.5;
				encoder.prepend = '<g>';
				encoder.append = '</g>';
				encoder.header = '<?xml version="1.0" encoding="UTF-8"?>\n';
			}

			expect(encoder.encode('')).toBeNull();
			expect(encoder.encode('AA')).toBeNull();

			for (const char of chars) {
				expect(encoder.encode(char.toLowerCase())).toBe(
					encoder.encode(char.toUpperCase())
				);

				const ord = char.charCodeAt(0);
				const f = `${suffix}/${ord.toString(16).toUpperCase()}.svg`;
				// eslint-disable-next-line no-await-in-loop
				await fse.outputFile(`${dir}/${f}`, encoder.encode(char));
				const {width, height} = characters;
				images.push(encoder.tag('img', {
					src: f,
					title: /\s/.test(char) ? JSON.stringify(char) : char,
					width,
					height
				}));
			}

			const bg = options ? '#000' : '#FFF';
			await fse.outputFile(
				`${dir}/${suffix}.html`,
				[
					'<!DOCTYPE html>',
					'<html>',
					'<head>',
					'<meta charset="UTF-8">',
					`<title>${suffix}</title>`,
					'<style>',
					`body { font-size: 0; background: ${bg} }`,
					'img { border: 1px solid #808080 }',
					'</style>',
					'</head>',
					'<body>',
					...images,
					'</body>',
					'</html>',
					''
				].join('\n')
			);
		});
	}
});
