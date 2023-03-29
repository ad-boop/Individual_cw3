<template>
  <div>
    <div v-for="product in products" :key="product.id">
      <h2>{{product.title}}</h2>
      <figure>
        <img v-bind:src="product.image" />
      </figure>
      <p v-html="product.description"></p>
      <p>Price: {{ product.price }}</p>
      <p>Available stock: {{ product.availableInventory }}</p>
      <button @click="add(product)">Add to cart</button>
    </div>
  </div>
</template>

<script>
export default {
  name: "ProductList",
  data() {
    return {
      products: [
        {
          id: 1001,
          title: "Cat Food, 25lb bag",
          description:
            "A 25 pound bag of <em>irresistible</em>, organic goodness for your cat.",
          price: 20.0,
          image: "product-fullsize.png",
          availableInventory: 10,
          rating: 2,
        },
        {
          id: 1002,
          title: "Yarn",
          description:
            "Yarn your cat can play with for a very <strong>long</strong> time!",
          price: 2.99,
          image: "yarn.jpg",
          availableInventory: 7,
          rating: 3,
        },
      ],
    };
  },
  methods: {
    add(product) {
      console.log("added product", product.id);
      this.$emit('addProduct',product);
    },
  },
};
</script>