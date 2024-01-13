<!-- 
file: src.component.Home.vue
description: 
  Componente Home
autor: Malki-çedheq Benjamim <https://github.com/malki-cedheq>
criado em: 01/01/2024
modificado em: 12/01/2024
-->
<template>
	<div id="app" class="container">
		<h3 class="heading">Home</h3>

		<div
			id="carouselExampleDark"
			class="carousel carousel-dark slide carousel-fade"
			data-bs-ride="carousel"
		>
			<div class="carousel-indicators">
				<button
					type="button"
					data-bs-target="#carouselExampleDark"
					data-bs-slide-to="0"
					class="active"
					aria-current="true"
					aria-label="Slide 1"
				></button>
				<button
					type="button"
					data-bs-target="#carouselExampleDark"
					data-bs-slide-to="1"
					aria-label="Slide 2"
				></button>
				<button
					type="button"
					data-bs-target="#carouselExampleDark"
					data-bs-slide-to="2"
					aria-label="Slide 3"
				></button>
			</div>
			<div class="carousel-inner">
				<div class="carousel-item active" data-bs-interval="2000">
					<svg
						class="bd-placeholder-img bd-placeholder-img-lg d-block w-100"
						width="800"
						height="400"
						xmlns="http://www.w3.org/2000/svg"
						role="img"
						aria-label="Placeholder: First slide"
						preserveAspectRatio="xMidYMid slice"
						focusable="false"
					>
						<title>Placeholder</title>
						<rect width="100%" height="100%" fill="#757575"></rect>
					</svg>
					<div class="carousel-caption d-none d-md-block">
						<h5>First slide label</h5>
						<p>
							Some representative placeholder content for the first slide.
						</p>
					</div>
				</div>
				<div class="carousel-item" data-bs-interval="2000">
					<svg
						class="bd-placeholder-img bd-placeholder-img-lg d-block w-100"
						width="800"
						height="400"
						xmlns="http://www.w3.org/2000/svg"
						role="img"
						aria-label="Placeholder: Second slide"
						preserveAspectRatio="xMidYMid slice"
						focusable="false"
					>
						<title>Placeholder</title>
						<rect width="100%" height="100%" fill="#858585"></rect>
					</svg>
					<div class="carousel-caption d-none d-md-block">
						<h5>Second slide label</h5>
						<p>
							Some representative placeholder content for the second
							slide.
						</p>
					</div>
				</div>
				<div class="carousel-item" data-bs-interval="2000">
					<svg
						class="bd-placeholder-img bd-placeholder-img-lg d-block w-100"
						width="800"
						height="400"
						xmlns="http://www.w3.org/2000/svg"
						role="img"
						aria-label="Placeholder: Third slide"
						preserveAspectRatio="xMidYMid slice"
						focusable="false"
					>
						<title>Placeholder</title>
						<rect width="100%" height="100%" fill="#959595"></rect>
					</svg>
					<div class="carousel-caption d-none d-md-block">
						<h5>Third slide label</h5>
						<p>
							Some representative placeholder content for the third slide.
						</p>
					</div>
				</div>
			</div>
			<button
				class="carousel-control-prev"
				type="button"
				data-bs-target="#carouselExampleDark"
				data-bs-slide="prev"
			>
				<span class="carousel-control-prev-icon" aria-hidden="true"></span>
				<span class="visually-hidden">Previous</span>
			</button>
			<button
				class="carousel-control-next"
				type="button"
				data-bs-target="#carouselExampleDark"
				data-bs-slide="next"
			>
				<span class="carousel-control-next-icon" aria-hidden="true"></span>
				<span class="visually-hidden">Next</span>
			</button>
		</div>
	</div>
</template>
<script>
export default {
	name: 'Home',
	data() {
		return {}
	},
	mounted() {},
}
</script>
