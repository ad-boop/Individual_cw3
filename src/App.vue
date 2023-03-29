<template>
  <div id="app">
    <link rel = "shortcut icon" href ="#">
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.15.1/css/all.min.css">
    <link rel="stylesheet" type="text/css" href="style.css">
    
    <!----------------- HEADER- NAVBAR STARTS------------->
      <header>
        <!-- NAVBAR -->
        <nav class="navbar">
          <!-- LOGO -->
          <div class="logo">
            <img src="images/logo.png" alt="" class="logo-img" />
          </div>

          <!-- NAVIGATION MENU -->
          <ul class="nav-links">
                <!-- NAVIGATION MENUS -->
                <div class="menu">

                <!-- cart button -->
                <li>
                    <!-- enabling checkout button if cart has more than 1 item -->
                    <button
                    id="cart-link-btn"
                    v-on:click="showCheckoutPage"
                    v-if="cartItemCount >= 1"
                    >
                    <i
                        class="fa fa-shopping-cart"
                        aria-hidden="true"
                        style="color: black"
                    ></i>
                    {{ cartItemCount }}
                    </button>

                    <!-- button disabled if no items in cart -->
                    <button id="cart-link-btn" disabled="disabled" v-else>
                    <i class="fa fa-shopping-cart" aria-hidden="true"></i>
                    </button>
                </li>
                </div>
          </ul>
        </nav>
      </header>
      <!----------------- HEADER- NAVBAR ENDS------------->
    <main>
     <product-list @addProduct="addToCart"></product-list>
     
      <checkout :cart="cart"></checkout>
    </main>
    <!-------------------FOOTER START----------------->
      <footer class="footer-basic">
        <!---------- SOCIAL MEDIA-------- -->
        <div class="social">
          <a href="#"><i class="bi bi-twitter"></i></a
          ><a href="#"><i class="bi bi-instagram"></i></a
          ><a href="#"><i class="bi bi-facebook"></i></a
          ><a href="#"><i class="bi bi-envelope"></i></a>
        </div>

        <!------------footer sefvices -->
        <ul class="list-inline">
          <li class="list-inline-item"><a href="#">Home</a></li>
          <li class="list-inline-item"><a href="#">Services</a></li>
          <li class="list-inline-item"><a href="#">About</a></li>
          <li class="list-inline-item"><a href="#">Terms</a></li>
          <li class="list-inline-item"><a href="#">Privacy Policy</a></li>
        </ul>
        <p class="copyright" style="color: white;">Company Name © 2022</p>
      </footer>
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
