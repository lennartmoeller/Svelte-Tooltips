<script>
    import {fade} from 'svelte/transition';

    /**
     * The DOM element that calls the tooltip
     */
    export let element;

    /**
     * The Tooltip message
     * @type {string}
     */
    export let message;

    /**
     * 'bottom' or 'right'
     * @type {string}
     */
    export let position;

    /**
     * The minimum distance to the window edges
     * @type {number}
     */
    const windowMargin = 10;

    /**
     * The distance to the calling DOM element
     * @type {number}
     */
    const elementMargin = 13;

    /**
     * Whether the Tooltip is visible or not
     * @type {boolean}
     */
    let visible = false;

    /**
     * Initializes the tooltip position, separately on every hover
     * @param tooltip The tooltip DOM element
     */
    function initTooltip(tooltip) {
        const elemDim = element.getBoundingClientRect();
        const ttDim = tooltip.getBoundingClientRect();
        if (position === 'bottom' && elemDim.y + elemDim.height + elementMargin + ttDim.height + windowMargin > window.innerHeight) {
            position = 'top';
        }
        if (position === 'right' && elemDim.x + elemDim.width + elementMargin + ttDim.width + windowMargin > window.innerWidth) {
            position = 'left';
        }

        function getTopBottom() {
            if (position === 'top') {
                return ['auto', window.innerHeight - elemDim.y + elementMargin + 'px'];
            }
            if (position === 'bottom') {
                return [elemDim.y + elemDim.height + elementMargin + 'px', 'auto'];
            }
            if (position === 'left' || position === 'right') {
                return [elemDim.y + (elemDim.height - ttDim.height) / 2 + 'px', 'auto'];
            }
        }

        function getLeftRight() {
            if (position === 'top' || position === 'bottom') {
                if (elemDim.x + (elemDim.width - ttDim.width) / 2 < windowMargin) { // too far left
                    return [windowMargin + 'px', 'auto'];
                }
                if (elemDim.x + (elemDim.width + ttDim.width) / 2 + windowMargin > window.innerWidth) { // too far right
                    return ['auto', windowMargin + 'px'];
                }
                return [elemDim.x + (elemDim.width - ttDim.width) / 2 + 'px', 'auto'];
            }
            if (position === 'left') {
                return ['auto', window.innerWidth - elemDim.x + elementMargin + 'px'];
            }
            if (position === 'right') {
                return [elemDim.x + elemDim.width + elementMargin + 'px', 'auto'];
            }
        }

        [tooltip.style.top, tooltip.style.bottom] = getTopBottom();
        [tooltip.style.left, tooltip.style.right] = getLeftRight();
    }

    // init the hover event listeners
    element?.addEventListener('mouseenter', () => visible = true);
    element?.addEventListener('mouseleave', () => visible = false);
</script>

{#if visible}
    <div class="tooltip {position}" use:initTooltip transition:fade={{duration: 150}}>
        {message}
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
		font-size: 13px;
		position: absolute;
		z-index: 1;
		max-width: 200px;
		padding: 9px 14px;
		transition: .3s ease;
		text-align: center;
		pointer-events: none;
		opacity: 0.8;
		color: #fff;
		border-radius: 6px;
		background-color: #000;
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
			top: calc(100% - 0.5px);
			border-top-color: #000;
		}
		&.bottom:after {
			bottom: calc(100% - 0.5px);
			border-bottom-color: #000;
		}
		&.left:after {
			left: calc(100% - 0.5px);
			border-left-color: #000;
		}
		&.right:after {
			right: calc(100% - 0.5px);
			border-right-color: #000;
		}
	}
</style>