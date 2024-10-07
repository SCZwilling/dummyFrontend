<script>
  import Carousel from "svelte-carousel";
  export let property;
</script>

<div class="w-full h-full">
  <Carousel>
    {#each property.images as image}
      <div class="w-full h-full">
        <img src={image.value} alt="{property.type} {property.status}" class="w-full h-full object-cover rounded-lg" />
      </div>
    {/each}
  </Carousel>
</div>
