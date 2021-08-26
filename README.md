# <svg style="max-width: 24px" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 511.998 511.998" style="enable-background:new 0 0 511.998 511.998" xml:space="preserve"><path style="fill:#fec95b" d="M8.889 40.981h42.787v430.042H8.889zM235.674 40.981h42.787v430.042h-42.787z"/><path style="fill:#dcebef" d="M503.111 471.018h-32.13c-32.453 0-60.684-22.227-68.3-53.774l-28.79-119.272c-10.678-44.238-49.919-75.134-95.427-75.134v-42.792c65.345 0 121.692 44.364 137.024 107.886l28.79 119.271c2.977 12.334 14.014 21.024 26.702 21.024 17.745 0 32.13 14.385 32.13 32.13v10.662h.001z"/><path style="fill:#fec95b" d="M51.679 180.049h183.997v42.787H51.679zM51.679 274.181h183.997v42.787H51.679zM51.679 368.325h183.997v42.787H51.679z"/><path style="fill:#e2ad50" d="M199.109 180.049h36.564v42.787h-36.564zM199.109 274.181h36.564v42.787h-36.564zM199.109 368.325h36.564v42.787h-36.564z"/><path d="M470.981 419.337a18.53 18.53 0 0 1-18.062-14.221l-28.79-119.271c-15.599-64.628-71.137-110.596-136.776-114.425V40.98a8.89 8.89 0 0 0-8.889-8.889h-42.79a8.89 8.89 0 0 0-8.889 8.889v130.175H117.334a8.89 8.89 0 0 0 0 17.778h109.451v25.011H60.568v-25.011h27.135a8.89 8.89 0 0 0 0-17.778H60.568V40.98a8.89 8.89 0 0 0-8.889-8.889H8.889A8.888 8.888 0 0 0 0 40.98v430.037a8.89 8.89 0 0 0 8.889 8.889h42.79a8.89 8.89 0 0 0 8.889-8.889v-51.015h166.217v51.016a8.89 8.89 0 0 0 8.889 8.889h42.79a8.89 8.89 0 0 0 8.889-8.889v-66.8a8.89 8.89 0 0 0-17.778 0v57.911h-25.011V49.869h25.011v324.716a8.89 8.89 0 0 0 17.778 0V232.17c13.434 1.327 26.382 5.646 37.878 12.7a8.886 8.886 0 0 0 12.225-2.929 8.89 8.89 0 0 0-2.929-12.225c-14.294-8.77-30.449-14.025-47.175-15.403v-25.086c57.388 3.802 105.829 44.175 119.493 100.788l28.79 119.271a36.257 36.257 0 0 0 35.344 27.827c12.815 0 23.24 10.425 23.24 23.24v1.773h-23.24c-28.449 0-52.983-19.315-59.658-46.971l-28.79-119.272c-4.148-17.185-12.517-33.187-24.201-46.277a8.891 8.891 0 0 0-13.264 11.84c9.74 10.911 16.72 24.262 20.184 38.609l28.79 119.272c8.61 35.668 40.248 60.578 76.94 60.578h32.13a8.89 8.89 0 0 0 8.889-8.889v-10.662c.001-22.617-18.4-41.017-41.018-41.017zM226.786 308.084H60.568v-25.011h166.217v25.011zM60.568 325.862h166.217v33.57H60.568v-33.57zm166.218-94.138v33.571H60.568v-33.571h166.218zM42.79 462.129H17.779V49.869H42.79v412.26zm17.778-59.906v-25.011h166.217v25.011H60.568z"/></svg> SlidyPages 

Full page presentation-like with a vertical scroll

---

SlidyPages allows you to create fullpages with a vertical scroll by using the script and css with a basic html model.

The basic html, the script and the CSS stylesheet can be found down below. Also, there is an example in the "example" folder that's the same of [slidypages.github.io](slidypages.github.io).


## Basic Usage

Just download the `slidypages.css` and `slidepages.js`, put them wherever you want, import them to your HTML, and you're ready to go!

The Basic HTML is the following.

```HTML
<!DOCTYPE html>
<html lang="en">
<head>
	<meta charset="UTF-8">
	<meta http-equiv="X-UA-Compatible" content="IE=edge">
	<meta name="viewport" content="width=device-width, initial-scale=1.0">
	<title>SlidePages Demo</title>
	<script src="slidypages.js"></script>
	<link rel="stylesheet" href="slidypages.css">
</head>
<body class="green">
	<div id="slidy-container" attr-page="0">
		<div class="slidy-page">
			<p>Page 1</p>
		</div>
		<div class="slidy-page">
			<p>Page 2</p>
		</div>
		<div class="slidy-page">
			<p>Page 3</p>
		</div>
	</div>

	<script>
		SlidyPages({
			//Set the number of pages
			pages: 3
		});
	</script>
</body>
</html>
```

## How to use

Every div with the `slidy-page` class is going to be a page. They must go inside de `slidy-conteiner` class. The pagination and navigation buttons will be added after SlidyPages is initialized.

To initialize it, you just need to call the `SlidyPages` function before the body closing tag.

| Parameter | Description |
| -- | -- |
| pages | Number of pages you want to show |
| touchThreshold | The touch and drag threshold to scroll the page | 

---

Thanks [Reshot](https://www.reshot.com) for the slide icon used in this file.