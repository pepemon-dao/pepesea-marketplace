import styled from "styled-components";
import { theme } from "../../theme";
import { buttonLinksStyling } from '../Button/Button';

export interface ExternalLinkProps {
	styling?: 'button',
	light?: boolean,
	shadow?: boolean,
	size?: number
}

const ExternalLink = styled.a.attrs({
	target: "_blank",
	rel: "external noopener noreferrer",
})<ExternalLinkProps>`
	${({styling}) => styling === 'button' ?
		buttonLinksStyling
	: `
		color: ${theme.color.purple[600]};
		cursor: pointer;
		font-size: ${(props:any) => props.size && props.size}rem;
		text-decoration: underline;

		&:hover {
			color: ${theme.color.purple[700]};
		}
	`}
`;

export default ExternalLink;
