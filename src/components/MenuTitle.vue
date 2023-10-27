<template>
  <div class="menu-title">
    <div class="menu-title__1">
      <div class="menu-title__title">
        <p class="text--menu-title__title">{{ food_model.title }}</p>
      </div>
      <div class="menu-title__credit">
        <p class="text--menu-title__credit">
          Source:
          <a
            :href="food_model.sourceUrl"
            class="text--menu-title__credit-link"
            target="_blank"
          >
            {{ food_model.creditsText }}
          </a>
        </p>
      </div>
    </div>
    <div class="menu-title__2">
      <div class="menu-title__desc">
        <p class="text--menu-title__desc">
          {{ food_model.summary }}
        </p>
      </div>
      <v-img
        class="menu-title__image mx-auto"
        :src="food_model.image"
        contain
        aspect-ratio="16/9"
      >
      </v-img>
    </div>
  </div>
</template>

<script>
export default {
  name: "menu-title",
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
      this.food_model.summary = this.stringToHTML(this.food_model.summary);
    }
  },
  methods: {
    stringToHTML(string) {
      var dom = document.createElement("div");
      dom.innerHTML = string;
      return dom.innerText;
    },
  },
};
</script>
