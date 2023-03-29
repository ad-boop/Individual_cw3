<template>
  <div id="app">
    <header>
      <h1>{{ sitename }}</h1>
      <button @click="showCheckout">
        {{ this.cart.length }}
        Checkout
      </button>
    </header>
    <main>
     <product-list @addProduct="addToCart"></product-list>
     
      <checkout :cart="cart"></checkout>
    </main>
  </div>
</template>

<script>
import productList from "./components/ProductList.vue";
import checkout from "./components/Form.vue";

export default {
  name: "App",
  components: {
    productList,
    checkout,
  },
  data() {
    return {
      sitename: "Vue.js Pet Depot",
      cart: [],
    };
  },
  methods: {
    showCheckout() {},
    addToCart(product) {
     console.log("addProduct event received by the root component.");
      this.cart.push(product);
    },
    
  },
};
</script>
