<template>
  <div class="food-additional">
    <div class="food-additional__timer">
      <span class="material-symbols-outlined text--food-additional__icon">
        timer
      </span>
      <p class="text--food-additional__text">
        &nbsp; {{ food_model.readyInMinutes }} Minutes
      </p>
    </div>
    <div class="food-additional__line"></div>
    <div class="food-additional__servings">
      <span class="material-symbols-outlined text--food-additional__icon">
        restaurant
      </span>
      <p class="text--food-additional__text">
        &nbsp; {{ food_model.servings }} Servings
      </p>
    </div>
  </div>
</template>

<script>
export default {
  name: "food-additional",
  props: {
    randomFoodModel: {
      type: Object,
      required: false,
      default: () => ({ show: false, text: "", status: 0 }),
    },
  },
  data() {
    return {
      food_model: {},
    };
  },
  created() {
    if (this.randomFoodModel) {
      this.food_model = this.randomFoodModel;
    }
  },
};
</script>
