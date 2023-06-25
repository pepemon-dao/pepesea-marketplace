import styled from 'styled-components';
import { theme } from '../../theme';

type Size =
	| 'xxxs'
	| 'xxs'
	| 'xs'
	| 's'
	| 'm'
	| 'l'
	| 'xl'
	| 'xxl'
	| 'xxxl'
	| 'inherit';

interface TitleProps {
	as: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6';
	align?: string;
	font?: string;
	isInactive?: boolean;
	lineHeight?: number;
	size?: Size;
	weight?: number | string;
	color?: string;
}

const getSize = (size: any): string => {
	switch (size) {
		case 'xxxs':
			return '.8rem';
		case 'xxs':
			return 'clamp(1.1rem, 1.1vw, 1.125rem)';
		case 'xs':
			return 'clamp(1.125rem, 1.2vw, 1.2rem)';
		case 's':
			return '1.3rem';
		case 'l':
			return 'clamp(1.4rem, 2.65vw, 2rem)';
		case 'xl':
			return '2.5rem';
		case 'xxl':
			return '3rem';
		case 'xxxl':
			return 'clamp(2.5rem, 6vw, 4.5rem)';
		case 'inherit':
			return 'inherit';
		case 'm':
		default:
			return 'clamp(.9rem, 1vw, 1rem)';
	}
};

const Title = styled.div<TitleProps>`
	color: ${({ color }) => (color ? color : theme.color.black)};
	font-family: ${({ font }) => (font ? font : theme.font.spaceMace)};
	font-size: ${({ size }) => (size ? getSize(size) : 'inherit')};
	font-weight: ${({ weight }) => (weight ? weight : 500)};
	hyphens: none;
	line-height: ${({ lineHeight }) => (lineHeight ? lineHeight : 'inherit')};
	margin: 0;
	text-align: ${({ align }) => (align ? align : 'inherit')};
`;

export const StyledPageTitle = styled(Title)`
	font-size: 2.5rem;
	margin-bottom: 0.5em;
`;

export const StyledLinkTitle = styled.h2<{ isInactive?: boolean }>`
	font-size: 1.2rem;
	font-family: ${theme.font.neometric};
	font-weight: 500;
	margin-bottom: 0;
	margin-top: 0;
	position: relative;

	&:not(:last-child) {
		margin-right: 1em;
	}

	a {
		color: ${theme.color.white};
		text-decoration: none;
	}

	${({ isInactive }) =>
		isInactive !== true
			? `
		&{
			font-weight: 900;
		}

		a {
			position: relative;
		}

		a:before {
			content: "";
			background-color: currentColor;
			display: inline-block;
			position: absolute;
			height: 2px;
			width: 100%;
			bottom: -.1em;
			left: 0;
		}`
			: `
		opacity: .7;
	`}
`;

export default Title;
