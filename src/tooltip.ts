import Tooltip from './Tooltip.svelte';

/**
 * Creates a new tooltip for an HTML element
 * @param position - The position relative to the parent HTML element. Either 'bottom' or 'right'
 * @param element - The parent HTML element to create the tooltip for
 * @param parameters - The tooltip message as a string or a configuration object:
 * 					   message,
 * 					   delay time: in ms (std: 400ms),
 * 					   font size: in px (std: 13px),
 * 					   opacity: from 0 to 1 (std: 0.8)
 */
const createTooltip = function (position: string, element: HTMLElement, parameters: string | {
	message: string, delay: number | undefined, opacity: number | undefined, fontSize: number | undefined
}) {
	setTimeout(() => new Tooltip({
		target: document.body, props: {
			element: element,
			position: position,
			message: typeof parameters === 'string' ? parameters : parameters.message,
			delay: typeof parameters === 'string' ? undefined : parameters.delay,
			opacity: typeof parameters === 'string' ? undefined : parameters.opacity,
			fontSize: typeof parameters === 'string' ? undefined : parameters.fontSize,
		}
	}), 100)
}

/**
 * Creates a new tooltip at the bottom of an HTML element
 * @param element - The parent HTML element to create the tooltip for
 * @param parameters - The tooltip message as a string or a configuration object:
 * 					   message,
 * 					   delay time: in ms (std: 400ms),
 * 					   font size: in px (std: 13px),
 * 					   opacity: from 0 to 1 (std: 0.8)
 */
export const bottom = (element: HTMLElement, parameters: string | {
	message: string, delay: number | undefined, opacity: number | undefined, fontSize: number | undefined
}) => createTooltip('bottom', element, parameters);

/**
 * Creates a new tooltip at the right of an HTML element
 * @param element - The parent HTML element to create the tooltip for
 * @param parameters - The tooltip message as a string or a configuration object:
 * 					   message,
 * 					   delay time: in ms (std: 400ms),
 * 					   font size: in px (std: 13px),
 * 					   opacity: from 0 to 1 (std: 0.8)
 */
export const right = (element: HTMLElement, parameters: string | {
	message: string, delay: number | undefined, opacity: number | undefined, fontSize: number | undefined
}) => createTooltip('right', element, parameters);

export default {bottom, right}