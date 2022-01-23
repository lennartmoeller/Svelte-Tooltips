import Tooltip from "./Tooltip.svelte";

/**
 * Creates a new Tooltip to the bottom or to of a DOM element with a message
 * Usage: use:tooltipBottom={"Hello World"}
 * @param element The DOM element
 * @param message {string} The Tooltip message
 */
export const tooltipBottom = function (element, message) {
    if (message === '') return;
    setTimeout(() => new Tooltip({
        target: document.getElementsByTagName('body')[0],
        props: {
            element: element,
            message: message,
            position: 'bottom'
        }
    }), 100);
}

/**
 * Creates a new Tooltip to the right or left of a DOM element with a message
 * Usage: use:tooltipRight={"Hello World"}
 * @param element The DOM element
 * @param message {string} The Tooltip message
 */
export const tooltipRight = function (element, message) {
    if (message === '') return;
    setTimeout(() => new Tooltip({
        target: document.getElementsByTagName('body')[0],
        props: {
            element: element,
            message: message,
            position: 'right'
        }
    }), 100);
}