<template>
  <div class="app">
    <navigation-bar
      :apiKey="apiKey"
      @search-id="getSearchId"
      @advance-search="getAdvanceSearch"
    ></navigation-bar>
    <!-- v-if="food_model" -->
    <!-- name="foodLayout" -->

    <!-- :advanceSearchModel="advance_search" -->

    <router-view
      :apiKey="apiKey"
      :food_model="food_model"
      :advanceSearchModel="advance_search"
      @advance-search-id="advanceSearchId"
    ></router-view>

    <!-- <router-view
      name="showFood"
    ></router-view> -->
  </div>
</template>

<script>
import NavigationBar from "./components/NavigationBar.vue";
import axios from "axios";

export default {
  name: "main-app",
  components: {
    NavigationBar,
  },
  data() {
    return {
      apiKey: "6e0ba48513054735a4da60dc197d1faf",
      search_id: "",

      food_model: {},
      advance_search: {},
      baseUrl: "https://api.spoonacular.com/recipes",
    };
  },
  created() {
    this.getRandom();
    // this.food_model = JSON.parse(localStorage.getItem("food_model"));
  },
  mounted() {},
  watch: {},
  methods: {
    getSearchId(value) {
      this.search_id = value;
      this.getFoodBySearch();
    },
    getRandom() {
      if (!this.search_id) {
        let url = this.baseUrl + "/random";

        axios
          .get(url, {
            params: {
              apiKey: this.apiKey,
            },
          })
          .then((response) => {
            this.food_model = response.data.recipes[0];
            // localStorage.setItem("food_model", JSON.stringify(this.food_model));
          })
          .catch((err) => {
            console.error(err);
          });
      }
    },
    getFoodBySearch() {
      this.food_model = {};

      let url = this.baseUrl + `/${this.search_id}/information`;

      axios
        .get(url, {
          params: {
            apiKey: this.apiKey,
          },
        })
        .then((response) => {
          this.food_model = response.data;
          this.search_id = "";
        })
        .catch((err) => {
          console.error(err);
        });
    },
    getAdvanceSearch(value) {
      this.advance_search = {};
      this.advance_search = value;
    },
    advanceSearchId(value) {
      this.search_id = value;
      this.getFoodBySearch();
    },
  },
};
//
</script>

<style>
@import "../css/main.css";
</style>
