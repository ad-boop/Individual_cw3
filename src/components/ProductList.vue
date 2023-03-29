<template>
  <!---------------------------------- Lessons display SECTION---------------------------------- -->
        <div class="lessons-div" id="lessons-div" v-if="showLessons">
          <!-- lesson product boxess -->
          <div id="lesson-box" v-for="lesson in filteredLessonList" :key="lesson.id">
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
                      <span v-if="lesson.space === cartCount(lesson.id)">All out!</span>
                      <!-- if there are 2 or less spaces than that -->
                      <span v-else-if="lesson.space - cartCount(lesson.id) <= 2">
                          Only {{lesson.space - cartCount(lesson.id)}} left!
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