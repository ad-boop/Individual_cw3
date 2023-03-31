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
            <img src="logo.png" alt="" class="logo-img" />
          </div>

          <!-- NAVIGATION MENU -->
          <ul class="nav-links">
                <!-- NAVIGATION MENUS -->
                <div class="menu">

                <!-- cart button -->
                <li>
                    <!-- enabling checkout button if cart has more than 1 item -->
                   <button id="cart-link-btn" v-on:click="showCheckoutPage" v-if="cartItemCount >= 1">
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
      <div class="main-div" v-if="showLessons">
        <!-- school banner -->
          <div class="banner">
            <div class="hero-text">
              <h1 style="font-size: 70px">After School Activities Club</h1>
              <p style="width:50%; text-align:center; margin:auto; line-height: 1.8;">
                After school activities are some organized activities students
                could participate after a traditional school day. A large number
                of students would like to join one or more extracurricular
                activities.
              </p>
            </div>
          </div>
          <h1>Club Activities</h1>
          
             <product-list :lessons="lessons" @addLesson="addToCart"></product-list>
      </div>
     
      <div v-else>
        <div class="main-back-to-products">
                  <button v-on:click = "showCheckoutPage()" class = "goBackBtn">
                      <span  class="fas fa-arrow-left">Back To Lesson Products</span>
                  </button>
        </div>
        <checkout :cart="cart" @removeLesson="removeFromCart" ></checkout>
      </div>
    </main>
    
  </div>
</template>

<script>
import productList from "./components/ProductList.vue";
import checkout from "./components/Form.vue";
// import { startServer } from './server';

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
      lessons:[],
      showLessons: true,
    };
  },
 mounted() {
  fetch("http://localhost:3000/collection/lessons").then((response) => {
    response.json().then((json) => {
      this.lessons = json;
      console.log(this.lessons);
      console.log(json);
    });
  });
},
  methods: {
    showCheckoutPage(){             
        this.showLessons = this.showLessons ? false : true;
    },
    addToCart(product) {
      product.space -= 1;
     console.log("addProduct event received by the root component.");
      this.cart.push(product);
    },
    //   remove from cart function
          removeFromCart(lesson) {

            //increase the spaces by one on the main page
            lesson.space++;
            for (let i = 0; i <= this.cart.length; i++) {
              if (this.cart[i].id === lesson.id) {
                this.cart.splice(i, 1);
                break;
              }
            }
          },
    
  },
  computed: {
    //function to return cart length                
    cartItemCount(){
        return this.cart.length || '';
    }
  },
};
</script>
