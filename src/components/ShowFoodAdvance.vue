<template>
  <div v-if="advanceSearchModel" class="show-food">
    <p class="show-food__title text--show-advance__title">
      Recipes based on your preferences.
    </p>
    <div
      class="show-food__container"
      v-for="(item, index) in advanceSearchModel"
      :key="index"
    >
      <v-img :src="item.image" class="show-food__image"> </v-img>
      <div class="show-food__title">
        <p class="text--show-advance__menu">{{ item.title }}</p>
      </div>
      <div class="show-food__button">
        <button class="button__primary" @click="saveLocalstorage(item.id)">
          Take a Look!
        </button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "showFood",
  props: {
    advanceSearchModel: {
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
    return {};
  },
  methods: {
    saveLocalstorage(value) {
      this.$emit("advance-search-id", value);
      this.$router.push({ path: "/" });
    },
  },
};
</script>

/////////////// advance search => show full search => clicked get id
(localstorage) => back to home show by id from localstorage
