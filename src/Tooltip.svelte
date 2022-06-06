<script lang="ts">
	import {fade} from 'svelte/transition';

	/**
	 * The HTML element for which the tooltip should be displayed
	 */
	export let element: HTMLElement;

	/**
	 * The Tooltip message
	 */
	export let message: string;

	/**
	 * The position of the Tooltip.
	 * Can only be 'bottom' or 'right'.
	 */
	export let position: string;

	/**
	 * The opacity (between 0 and 1)
	 */
	export let opacity = 0.8;

	/**
	 * The delay in milliseconds
	 */
	export let delay = 400;

	/**
	 * The font size in px
	 */
	export let fontSize = 13;

	/**
	 * The minimum distance to the window edges
	 */
	const windowMargin = 10;

	/**
	 * The distance to the calling DOM element
	 */
	const elementMargin = 13;

	/**
	 * Whether the Tooltip is visible or not
	 */
	let visible = false;

	/**
	 * Helper to check if the mouse hovers the element for the delay time
	 */
	let visibleAfterDuration = false;

	/**
	 * Initializes the tooltip position, separately on every hover
	 * @param tooltip - The tooltip HTML element
	 */
	function initTooltip(tooltip: HTMLElement) {
		const elemDim: DOMRect = element.getBoundingClientRect();
		const ttDim: DOMRect = tooltip.getBoundingClientRect();
		if (position === 'bottom' && elemDim.y + elemDim.height + elementMargin + ttDim.height + windowMargin > window.innerHeight) {
			position = 'top';
		}
		if (position === 'right' && elemDim.x + elemDim.width + elementMargin + ttDim.width + windowMargin > window.innerWidth) {
			position = 'left';
		}
		[tooltip.style.top, tooltip.style.bottom] = (() => {
			if (position === 'top') {
				return ['auto', `${window.innerHeight - elemDim.y + elementMargin}px`];
			}
			if (position === 'bottom') {
				return [`${elemDim.y + elemDim.height + elementMargin}px`, 'auto'];
			}
			if (position === 'left' || position === 'right') {
				return [`${elemDim.y + (elemDim.height - ttDim.height) / 2}px`, 'auto'];
			}
		})();
		[tooltip.style.left, tooltip.style.right] = (() => {
			if (position === 'top' || position === 'bottom') {
				if (elemDim.x + (elemDim.width - ttDim.width) / 2 < windowMargin) { // too far left
					return [`${windowMargin}px`, 'auto'];
				}
				if (elemDim.x + (elemDim.width + ttDim.width) / 2 + windowMargin > window.innerWidth) { // too far right
					return ['auto', `${windowMargin}px`];
				}
				return [`${elemDim.x + (elemDim.width - ttDim.width) / 2}px`, 'auto'];
			}
			if (position === 'left') {
				return ['auto', `${window.innerWidth - elemDim.x + elementMargin}px`];
			}
			if (position === 'right') {
				return [`${elemDim.x + elemDim.width + elementMargin}px`, 'auto'];
			}
		})();
		check();
	}

	/**
	 * Removes the Tooltip if the calling element was removed
	 */
	function check() {
		if (!document.body.contains(element)) visible = false;
		else if (visible) setTimeout(check, 100);
	}

	// init the hover event listeners
	element?.addEventListener('mouseenter', () => {
		visibleAfterDuration = true;
		setTimeout(() => visible = visibleAfterDuration, delay)
	});
	element?.addEventListener('mouseleave', () => visible = visibleAfterDuration = false);
</script>

{#if visible}
    <div class="tooltip"
         use:initTooltip
         transition:fade={{duration: 150}}
         style="font-size:{fontSize}px">
        <div class="background {position}"
             style="opacity:{opacity}">
            {message}
        </div>
        <div class="message">
            {message}
        </div>
    </div>
{/if}

<style lang="scss">
	@mixin horizontal-center {
		position: absolute;
		left: 50%;
		transform: translateX(-50%);
	}

	@mixin vertical-center {
		position: absolute;
		top: 50%;
		transform: translateY(-50%);
	}

	.tooltip {
		position: absolute;
		z-index: 1;
		max-width: 200px;
		transition: .3s ease;
		text-align: center;
		pointer-events: none;
		.background, .message {
			padding: 9px 14px;
		}
		.background {
			$background-color: black;
			color: transparent;
			border-radius: 6px;
			background-color: $background-color;
			box-shadow: rgba(149, 157, 165, 0.6) 0 8px 24px;
			&:after {
				font-size: 0;
				line-height: 0;
				width: 0;
				content: ' ';
				border: 6px solid transparent;
			}
			&.top:after, &.bottom:after {
				@include horizontal-center;
			}
			&.left:after, &.right:after {
				@include vertical-center;
			}
			&.top:after {
				top: 100%;
				border-top-color: $background-color;
			}
			&.bottom:after {
				bottom: 100%;
				border-bottom-color: $background-color;
			}
			&.left:after {
				left: 100%;
				border-left-color: $background-color;
			}
			&.right:after {
				right: 100%;
				border-right-color: $background-color;
			}
		}
		.message {
			position: absolute;
			top: 0;
			color: #fff;
		}
	}
</style>