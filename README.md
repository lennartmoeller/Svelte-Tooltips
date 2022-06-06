# Svelte-Tooltips

A simple and lightweight tooltip component for Svelte 3.

## Usage

### Import

You can import the compiled javascript and css files to prevent compiling issues:

```javascript
<script>
    import tooltips from './Tooltips';
    import './Tooltips/dist/main.css';
</script>
```

Or you import the raw files that you have to compile by yourself:

```sveltehtml
<script>
    import {bottom, right} from './tooltip';
</script>
```

To compile the files, have a look at the ```package.json```, ```tsconfig.json``` and ```webpack.config.json```.

### Create Tooltips

At the bottom of the parent:

```sveltehtml
<div use:tooltips.bottom={'The Tooltip message'}>Hello World</div>
```

At the right of the parent:

```sveltehtml
<div use:tooltips.right={'The Tooltip message'}>Hello World</div>
```

Pass a configuration:

```sveltehtml
<div use:tooltips.right={{
    message: 'The Tooltip message',
    delay: 1000,    // delay time after hovering in ms
    opacity: 0.6,   // opacity from 0 to 1
    fontSize: 15    // font size in px
}}>Hello World</div>
```