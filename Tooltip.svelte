<!--
  @author     Lennart Möller <kontakt@lennartmoeller.com>
  @copyright  2021 Lennart Möller
-->

<script>
    import {onDestroy} from 'svelte';

    /**
     * The message to display on hover
     * @type {string}
     */
    export let message;

    /** The tooltip dom element */
    let tooltip;

    /** The dom element that shows the tooltip on hover */
    let slot;

    $: setTooltipMessageAndPosition(message); // to reposition the tooltip on message change

    /**
     * Initializes the element that shows the tooltip on hover
     * @param e The DOM element
     */
    function initSlotHover(e) {
        slot = e.childNodes[0];
        slot.addEventListener("mouseenter", showTooltip);
        slot.addEventListener("mouseleave", hideTooltip);
    }

    /**
     * Initializes the tooltip DOM element
     * @param e The tooltip DOM element
     */
    function initTooltip(e) {
        tooltip = e;
        tooltip.parentNode.removeChild(tooltip);
        tooltip.style.opacity = "";
    }

    /** Shows the tooltip */
    function showTooltip() {
        if (tooltip.parentNode === null) document.body.appendChild(tooltip);
        else if (tooltip.parentNode !== document.body) {
            tooltip.parentNode.removeChild(tooltip);
            document.body.appendChild(tooltip);
        }
        setTooltipMessageAndPosition();
        tooltip.style.transitionDelay = ".5s";
        tooltip.style.opacity = "1";
    }

    /** Hides the tooltip */
    function hideTooltip() {
        if (!document.body.contains(tooltip)) return;
        tooltip.style.transitionDelay = "0s";
        tooltip.style.opacity = "0";
        setTimeout(() => {
            if (document.body.contains(tooltip)) {
                tooltip.parentNode.removeChild(tooltip);
            }
        }, 300);
    }

    /**
     * Sets the message of the tooltip and positions the tooltip
     * @param msg The tooltip message (only to trigger the function)
     */
    function setTooltipMessageAndPosition(msg = message) {
        if (tooltip === undefined) return;
        tooltip.innerHTML = message; // set the message to have a correct position
        const windowMargin = 10;
        const slotMargin = 5;
        const slotPos = slot.getBoundingClientRect();
        const tooltipPos = tooltip.getBoundingClientRect();
        let tooltipTop = slotPos.y + slotPos.height + slotMargin; // under the slot
        let tooltipLeft = slotPos.x + (slotPos.width - tooltipPos.width) / 2; // centered
        let tooltipRight = "auto";
        if (tooltipLeft < windowMargin) { // foo far left
            tooltipLeft = windowMargin;
        } else if (tooltipLeft + tooltipPos.width + windowMargin > window.innerWidth) { // too far right
            tooltipLeft = "auto";
            tooltipRight = windowMargin;
        }
        if (tooltipTop + tooltipPos.height + windowMargin > window.innerHeight) { // too far down
            tooltipTop = slotPos.y - slotMargin - tooltipPos.height;
        }
        tooltip.style.top = tooltipTop;
        tooltip.style.left = tooltipLeft;
        tooltip.style.right = tooltipRight;
    }

    onDestroy(() => {
        slot.removeEventListener("mouseenter", showTooltip);
        slot.removeEventListener("mouseleave", hideTooltip);
        if (document.body.contains(tooltip)) {
            tooltip.parentNode.removeChild(tooltip);
        }
    })
</script>

<!-- The slot to hover over -->
<div use:initSlotHover>
    <slot/>
</div>

<!-- The tooltip -->
<div class="tooltip" style="opacity: 0" use:initTooltip></div>

<style lang="scss">
	.tooltip {
		font-size: 12px;
		position: absolute;
		z-index: 1;
		max-width: 200px;
		padding: 5px 10px;
		transition: opacity .3s;
		text-align: center;
		pointer-events: none;
		opacity: 0;
		border: 1px solid #eaecef;
		border-radius: 6px;
		background-color: white;
		box-shadow: rgba(149, 157, 165, 0.2) 0 8px 24px;
	}
</style>