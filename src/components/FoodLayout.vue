<template>
  <div class="food-layout__wrapper">
    <div class="food-layout">
      <menu-title
        v-if="food_model.creditsText"
        :randomFoodModel="food_model"
        class="food-layout__menu"
      ></menu-title>
      <food-additional
        v-if="food_model.creditsText"
        :randomFoodModel="food_model"
        class="food-layout__additional"
      ></food-additional>
      <food-diet
        v-if="food_model.creditsText"
        :randomFoodModel="food_model"
        class="food-layout__diet"
      ></food-diet>
      <food-information
        v-if="food_model.creditsText"
        :apiKey="apiKey"
        :randomFoodModel="food_model"
        class="food-layout__information"
      ></food-information>
    </div>
  </div>
</template>

<script>
import MenuTitle from "./MenuTitle.vue";
import FoodAdditional from "./FoodAdditional.vue";
import FoodDiet from "./FoodDiet.vue";
import FoodInformation from "./FoodInformation.vue";

export default {
  name: "foodLayout",
  props: {
    apiKey: {
      type: String,
    },
    isLoading: {
      type: Boolean,
    },
    food_model: {
      type: Object,
      default: () => ({}),
    },
  },
  components: {
    MenuTitle,
    FoodAdditional,
    FoodDiet,
    FoodInformation,
  },
  data() {
    return {
      isSmallDisplay: false,
    };
  },
  beforeMount() {
    window.removeEventListener("resize", this.onResize());
  },
  created() {
    window.addEventListener("resize", this.onResize());
  },
  watch: {},
  methods: {
    onResize() {
      if (window.innerWidth > 800) {
        this.isSmallDisplay = false;
      } else {
        this.isSmallDisplay = true;
      }
    },
  },
};
</script>
