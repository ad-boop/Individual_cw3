<template>
  <!-- ------------------------CHECKOUT SECTION--------------------------------- -->
        <div id="checkout-main-div">
            
          <!-- ------------- CART SECTION------------------------- -->
          <div class="cart-div" id="cart-div">
            <h1>Your Cart</h1>
            <!-- CART ITEMS display -->
            <div class="cart-items-div" id="cart-items-div">
              <div class="cart-product-box" v-for="cartItem in cart" :key="cartItem.id">
                <!-- cart items details -->
                <h3 id="subject">{{cartItem.subject}}</h3>
                <p id="location">Location: {{cartItem.location}}</p>
                <p id="price">Price: ${{cartItem.price}}</p>

                <!-- remove from cart button -->
                <div id="remove-button-div">
                  <button id="remove-btn" v-on:click="removeFromCart(cartItem)">
                    Remove
                  </button>
                </div>

              </div>
            </div>

          </div>
          <!-- If all products are removed from cart, button is displayed to take back to the products page -->
          

          <!-- ------------- CHECKOUT FORM SECTION------------------------- -->
          <div class="checkout" id="checkout-div">
            <h1>Checkout</h1>
            <div class="checkout-form-div">

                <!-- checkout form -->
              <form action="" id="">
                <label for="nameUser">Name:</label>
                <input
                  type="text"
                  name="nameUser"
                  id="nameUser"
                  v-model="name"
                  v-on:keypress="isLetter($event)"
                />
                <label for="phoneNumber">Phone:</label>
                <input
                  type="tel"
                  name="phoneNumber"
                  id="phoneNumber"
                  v-model="phone_number"
                  v-on:keypress="isNumber($event)"
                />
              </form>

              <!-- checkout button -->
              <div class="checkout-btn-div" id="checkout-btn-div">
                <!-- if form not filled button disabled -->
                <button id="checkout-button" v-if="name == '' || phone_number == ''" disabled="disabled">
                  Checkout
                </button>
                <!-- if form is filled -->
                <button id="checkout-button" v-else v-on:click="submitCheckout()" >
                  Checkout
                </button>
              </div>

            </div>
          </div>

        </div>
</template>

<script>
export default {
  name: "Form",
  props: ['cart'],
  data() {
    return {
      name: "",
      phone_number: "",
      error_message:""
    };
  },
  methods :{
    removeFromCart(lesson)
    {
      this.$emit('removeLesson',lesson)
    },
    isLetter(e){
            //for every character input
            let char = String.fromCharCode(e.keyCode); 

            //if the character is an alphabet
            if(/^[A-Za-z]+$/.test(char)){
                return true;
            } 
            else{
                alert("Only letters for the name");
                this.error_message="Only letters for the name"
            } 
          },


          //function to check if the user input for phone has only numbers
            isNumber(e){

                //matching the user input with the character code of 0-9
                if(e.charCode >= 48 && e.charCode <= 57 ){
                    return true;
                }
                else{
                    alert("Only numbers for the phone number");
                    this.error_message="Only numbers for the phone number"
                } 
            },


            //   checkout function for the checkout page
          submitCheckout() {

            // if there are items in the cart
            if (this.cart.length > 0 && this.error_message=="") {
              alert("Order Submitted!");
              location.reload();
            } 
            // if there are no items in the cart
            else if (this.cart.length == 0) {
              alert("No Lessons in the Cart");
            } 
            // if validation showing incorrect
            else if(this.error_message != null){
              console.log(this.error_message)
              alert("Fill the form properly")
              this.error_message=""
              this.name="";
              this.phone_number="";
            }
           
          },

  }
};
</script>