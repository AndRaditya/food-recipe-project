<template>
  <div class="food-information" v-if="!isSmallDisplay">
    <div class="food-information__titles">
      <div class="food-information__titles--ingredients">
        <p class="text--food-information__title">Ingredients</p>
      </div>
      <div class="food-information__titles--direction">
        <p class="text--food-information__title">Direction</p>
      </div>
    </div>
    <div class="food-information__details">
      <div class="food-information__ingredients" v-if="food_model.ingredients">
        <ul v-for="(ingredient, index) in food_model.ingredients" :key="index">
          <div class="food-information__ingredients--item">
            <p
              class="text--food-information__ingredients-amount"
              v-if="ingredient.amount.metric.unit.length >= 5"
            >
              {{ ingredient.amount.metric.value }}&nbsp;{{
                ingredient.amount.metric.unit
              }}&nbsp;
            </p>
            <p class="text--food-information__ingredients-amount" v-else>
              {{ ingredient.amount.metric.value
              }}{{ ingredient.amount.metric.unit }}&nbsp;
            </p>
            <p class="text--food-information__ingredients-name">
              {{ ingredient.name }}
            </p>
          </div>
        </ul>
      </div>
      <div class="food-information__ingredients" v-if="!food_model.ingredients">
        <p class="text--food-information__ingredients-amount">
          Ingredients Not Found
        </p>
      </div>
      <div
        class="food-information__direction"
        v-if="food_model.analyzedInstructions.length > 0"
      >
        <ul
          v-for="(instruction, index) in food_model.analyzedInstructions[0]
            .steps"
          :key="index"
        >
          <div class="food-information__direction--step">
            <p class="text--food-information__direction-number">
              Step {{ instruction.number }}
            </p>
            <p class="text--food-information__direction-step">
              {{ instruction.step }}
            </p>
          </div>
        </ul>
      </div>
      <div
        class="food-information__direction"
        v-else-if="!food_model.analyzedInstructions"
      >
        <p class="text--food-information__direction-number">Steps Not Found!</p>
      </div>
    </div>
  </div>
  <!--  -->
  <div class="food-information--small" v-else-if="isSmallDisplay">
    <div class="food-information--small__titles--ingredients">
      <p class="text--food-information__title">Ingredients</p>
    </div>
    <div
      class="food-information--small__ingredients"
      v-if="food_model.ingredients"
    >
      <div class="food-information--small__ingredients--1">
        <ul
          v-for="(ingredient, index) in food_model.ingredients.slice(
            0,
            firstHalf
          )"
          :key="index"
        >
          <div class="food-information__ingredients--item">
            <p
              class="text--food-information__ingredients-amount"
              v-if="ingredient.amount.metric.unit.length >= 5"
            >
              {{ ingredient.amount.metric.value }}&nbsp;{{
                ingredient.amount.metric.unit
              }}&nbsp;
            </p>
            <p class="text--food-information__ingredients-amount" v-else>
              {{ ingredient.amount.metric.value
              }}{{ ingredient.amount.metric.unit }}&nbsp;
            </p>
            <p class="text--food-information__ingredients-name">
              {{ ingredient.name }}
            </p>
          </div>
        </ul>
      </div>
      <div class="food-information--small__ingredients--2">
        <ul
          v-for="(ingredient, index) in food_model.ingredients.slice(
            secondHalf
          )"
          :key="index"
        >
          <div class="food-information__ingredients--item">
            <p
              class="text--food-information__ingredients-amount"
              v-if="ingredient.amount.metric.unit.length >= 5"
            >
              {{ ingredient.amount.metric.value }}&nbsp;{{
                ingredient.amount.metric.unit
              }}&nbsp;
            </p>
            <p class="text--food-information__ingredients-amount" v-else>
              {{ ingredient.amount.metric.value
              }}{{ ingredient.amount.metric.unit }}&nbsp;
            </p>
            <p class="text--food-information__ingredients-name">
              {{ ingredient.name }}
            </p>
          </div>
        </ul>
      </div>
    </div>
    <div
      class="food-information--small__ingredients"
      v-if="!food_model.ingredients"
    >
      <p class="text--food-information__ingredients-amount">
        Ingredients Not Found
      </p>
    </div>
    <div class="food-information--small__titles--direction">
      <p class="text--food-information__title">Direction</p>
    </div>
    <div
      class="food-information--small__direction"
      v-if="food_model.analyzedInstructions.length > 0"
    >
      <ul
        v-for="(instruction, index) in food_model.analyzedInstructions[0].steps"
        :key="index"
      >
        <div class="food-information__direction--step">
          <p class="text--food-information__direction-number">
            Step {{ instruction.number }}
          </p>
          <p class="text--food-information__direction-step">
            {{ instruction.step }}
          </p>
        </div>
      </ul>
    </div>
    <div
      class="food-information--small__direction"
      v-else-if="!food_model.analyzedInstructions"
    >
      <p class="text--food-information__direction-number">Steps Not Found!</p>
    </div>
  </div>
</template>

<script>
import axios from "axios";

export default {
  name: "food-information",
  props: {
    randomFoodModel: {
      type: Object,
      required: false,
      default: () => ({ show: false, text: "", status: 0 }),
    },
    apiKey: {
      type: String,
      required: true,
    },
  },
  data() {
    return {
      food_model: {},
      isSmallDisplay: false,

      firstHalf: null,
      secondHalf: null,
    };
  },
  created() {
    if (this.randomFoodModel) {
      this.food_model = this.randomFoodModel;
      this.initIngredients();
      // this.initData();
    }
    window.addEventListener("resize", this.onResize());

    // console.log(this.isSmallDisplay);
  },

  beforeMount() {
    window.removeEventListener("resize", this.onResize());
  },
  methods: {
    initIngredients() {
      if (!this.search_id) {
        let url = `https://api.spoonacular.com/recipes/${this.food_model.id}/ingredientWidget.json?apiKey=${this.apiKey}`;
        axios
          .get(url)
          .then((response) => {
            this.food_model.ingredients = response.data.ingredients;

            this.food_model.ingredients.forEach((element, index) => {
              const firstLetter = element.name.charAt(0).toUpperCase();
              const rest = element.name.slice(1);

              this.food_model.ingredients[index].name = firstLetter + rest;
            });

            this.firstHalf = Math.round(this.food_model.ingredients.length / 2);
            this.secondHalf =
              this.food_model.ingredients.length - this.firstHalf;
          })
          .catch((err) => {
            console.error(err);
          });
      }
    },
    onResize() {
      if (window.innerWidth > 600) {
        this.isSmallDisplay = false;
      } else {
        this.isSmallDisplay = true;
      }
    },
  },
};
</script>
