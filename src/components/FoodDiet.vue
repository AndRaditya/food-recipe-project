<template>
  <div class="food-diet">
    <div class="food-diet__title">
      <p class="text--food-diet__title">Diets</p>
    </div>
    <div class="food-diet__diets">
      <div
        class="food-diet__diets-items"
        v-for="(item, index) in this.diet_model"
        :key="index"
      >
        <div class="food-diet__diets-item">
          <p class="text--food-diet__item food-diet__diets-texts">
            {{ item.name }}
          </p>
          <span
            class="material-icons-outlined text--food-diet__icon food-diet__diets-icon"
            v-if="!item.value"
            >close</span
          >
          <span
            class="material-icons-outlined text--food-diet__icon food-diet__diets-icon"
            v-else
          >
            done
          </span>
        </div>
      </div>
    </div>
    <div class="food-diet__line"></div>
  </div>
</template>

<script>
export default {
  name: "food-diet",
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
      diet_model: [],
    };
  },
  created() {
    if (this.randomFoodModel) {
      this.food_model = this.randomFoodModel;
      this.initData();
    }
  },
  methods: {
    initData() {
      this.assignArray(
        "Vegetarian",
        this.checkDiet(this.food_model.vegetarian),
        0
      );
      this.assignArray("Vegan", this.checkDiet(this.food_model.vegan), 1);
      this.assignArray(
        "Gluten Free",
        this.checkDiet(this.food_model.glutenFree),
        2
      );
      this.assignArray(
        "Dairy Free",
        this.checkDiet(this.food_model.dairyFree),
        3
      );
    },
    checkDiet(value) {
      if (value === true || value === false) {
        return value;
      }
    },
    assignArray(name, func, index) {
      return (this.diet_model[index] = {
        name: name,
        value: func,
      });
    },
  },
};
</script>
