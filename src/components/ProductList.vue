<template>

  <!---------------------------------- Lessons display SECTION---------------------------------- -->
        <div>
          <link rel="stylesheet" type="text/css" href="style.css">
          <div class="lessons-div" id="lessons-div">
          <div class="school_lessons">
            <!-- lesson product boxess -->
            <div id="lesson-box" v-for="lesson in lessons" :key="lesson.id">
              <div id="row">
                <!-- lesson image -->
                <div class="column left lesson-icon">
                  <figure>
                    <img
                      class="lesson-pic"
                      v-bind:src="lesson.image"
                      alt=""
                      srcset=""
                    />
                  </figure>
                  <!-- LESSON RATING -->
              <div class="rating" style="text-align: center; margin: auto; margin-top: 10px; font-size: 18px; color: #cb8589ff">
          
                <!-- LOOPING THE RATING STARS -->
                <span v-for="n in lesson.rating" :key="n+1">
                    <i class="fa-solid fa-star"></i>
                </span>
            </div>
                </div>
                <!-- lesson details -->
                <div class="column right lesson-details">
                  <div id="lesson-description">
                    <p><b>Subject: </b>{{lesson.subject}}</p>
                    <p><b>Location:</b> {{lesson.location}}</p>
                    <p><b>Price:</b> ${{lesson.price}}</p>
                    <p><b>Spaces:</b> {{lesson.space}}</p>
                  </div>
                  <div id="button-and-messages" style="margin-top: 20px;">
                    <!-- lesson space messages -->
                    <div class="space-messages" style="text-align: center">
          
                        <!-- if there are 0 spaces left -->
                        <span v-if="lesson.space === 0">All out!</span>
                        <!-- if there are 2 or less spaces than that -->
                        <span v-if ="lesson.space < 5 && lesson.space > 0">
                            Only {{lesson.space}} left!
                        </span>
                        <!-- if there are sufficient spaces -->
                        <span v-else>Buy now!</span>
                    </div>
                    <!-- lesson cart button -->
                    <div class="cart-btn-div">
          
                        <!-- if there are spaces available to add to cart  -->
                        <button
                            type="button"
                            v-bind:id="lesson.id"
                            class="add-to-cart"
                            v-on:click="addToCart(lesson)"
                            v-if="canAddToCart(lesson)"
                        >
          
                            <i class="fa fa-cart-plus" aria-hidden="true"></i>
                        </button>
                        <!-- if all spaces are over button disabled -->
                        <button class="add-to-cart" disabled="disabled" v-else>
                          <i class="fa fa-cart-plus" aria-hidden="true"></i>
                        </button>
                    </div>
                  </div>
                </div>
              </div>
          
            </div>
          </div>
          </div>
        </div>
</template>

<script>
export default {
  name: "ProductList",
  props:['lessons'],
  data() {
    return {
    };
  },
  methods: {
    add(product) {
      console.log("added product", product.id);
      this.$emit('addProduct',product);
    },

    // add to cart function
    addToCart(lesson) {

      console.log("added Lesson", lesson.id);
      this.$emit('addLesson',lesson);
      // adding the lesson to the cart array
      // this.cart.push(lesson);
      // lesson.space--; //decrementing the lesson space when added to cart
    },
    //   if the lesson can be added to cart if they have sufficient spaces
          canAddToCart(lesson) {
            return lesson.space > 0;
          },

          

  },
};
</script>

<style>
#cart-div,
#checkout-div {
  border: 8px solid #796465ff;
  border-radius: 15px;
  margin: 20px;
  padding: 5px;
  background-color: #82afd3;
  width: 60%;
  margin: auto;
  margin-bottom: 50px;
}



/* SORT DISPLAY STYLING */

.sort-div {
  width: 350px;
  height: 110px;
  padding: 10px;
  border: 5px solid #e8d2ae;
  margin-left: 60px;
  border-radius: 25px;
  display: grid;
    grid-template-columns: 1fr 1fr;
    grid-gap: 20px;
    
}

.sort-div:hover {
  background: linear-gradient(#cb8589, #e8d2ae);
}

.sort-by-div {
  margin-bottom: 100px;
}



select {
  background-color: #dde8b9;
  border: 3px solid #000;
  border-radius: 25px;
  padding: 10px;
}

h4 {
  text-align: center;
  margin-bottom: 5px;
}

/* LESSON DIVS STYLING*/
.school_lessons, .search-results_box {
  display: grid;
  margin: 60px;
  grid-template-columns: 1fr 1fr 1fr;
}

.lesson-details p{
  font-size: 16px;
}

.lesson-box, .searched-lesson-box {
  border: solid #cb8589 5px;
  width: 75%;
  
  font-size: 15px;
  margin-bottom: 60px;
  box-shadow: 5px 10px #888888;
  align-items: center;
  background: #dde8b9;
}

#lesson-box:hover{
  cursor: pointer;
  transition: 0.5s;
  transform: scale(1.05);
  box-shadow: 5px 10px rgb(77, 75, 75);
}

.lesson-pic {
  align-items: center;
  width: 90%;
  height: 110%;
  justify-content: center;
  border: 5px solid #D7B29D;
}

/* .column {
  padding: 5px;
  margin: 10px;
} */

.lesson-icon {
  text-align: center;
}

.lesson-details {
  width: 85%;
}

.column {
  padding: 10px;
  float: left;
  /* width: 50%; */
}

.left {
  width: 40%;
}

.right {
  width: 60%;
}

/* Clear floats after the columns */
.row:after {
  content: "";
  display: table;
  clear: both;
}

.cart-btn-div {
  text-align: center;
  padding: 5px;
}
/* ADD TO CART BUTTON STYLING */
button.add-to-cart {
  border: 2px solid #796465ff;
  background: #796465ff;
  border-radius: 20px;
  padding: 8px;
  padding-left: 15px;
  padding-right: 15px;
  text-transform: uppercase;
  font-weight: 600;
  margin: auto;
  align-self: center;
  color: #f5f5f5;
}

button.add-to-cart:disabled{
  background: #888888;
  border: #888888;
  pointer-events: none;
}


button.add-to-cart:hover {
  font-weight: 900;
  font-style: oblique;
  border: 4px solid #a17227;
  background-color: #e8d2ae;
  color: #000;
}

.main-back-to-products{
  padding: 50px;
}
button.goBackBtn{
  padding: 30px;
  margin: auto;
  background-color: #a17227;
  font-weight: 700;
}




/*------------------------------ FOOTER STARTS ------------------------------------ */
  
</style>