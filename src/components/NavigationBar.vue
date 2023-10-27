<template>
  <div class="navigation-bar" v-if="apiKey">
    <div class="navigation-bar__title">
      <p class="text--navbar__title" @click="goHome">Flavor Fusion</p>
    </div>
    <div class="navigation-bar__search">
      <v-autocomplete
        variant="solo"
        label="Discover Culinary Delights with Every Search"
        class="navigation-bar__search--field"
        :items="items"
        v-model:search="searchInput"
        item-value="id"
        v-model="idSearch"
      >
      </v-autocomplete>
    </div>
    <div class="navigation-bar__button">
      <button class="button__primary" @click="dialog_search = true">
        Advance Search
      </button>
    </div>

    <v-dialog v-model="dialog_search" class="dialog-search">
      <v-card class="dialog-search__card">
        <p class="dialog-search__title text--dialog-search">Advance Search</p>
        <v-form
          @submit.prevent="validateForm()"
          v-model="valid"
          ref="advance_search"
          autofocus
        >
          <div class="dialog-search__form">
            <div class="dialog-search__form--1">
              <v-text-field
                v-model="advance_query"
                label="Search Food..."
                variant="outlined"
                required
                clearable
              ></v-text-field>
            </div>
            <div class="dialog-search__form--2">
              <v-select
                v-model="advance_diet"
                label="Diet"
                clearable
                :items="diet_items"
                variant="outlined"
                multiple
              ></v-select>
            </div>
            <div class="dialog-search__form--3">
              <v-select
                v-model="advance_intolerance"
                label="Intolerance"
                clearable
                :items="intolerance_items"
                variant="outlined"
                multiple
              ></v-select>
            </div>
            <div class="dialog-search__form--4">
              <v-select
                v-model="advance_cuisines"
                label="Exclude Cuisines"
                clearable
                :items="cuisines_items"
                variant="outlined"
                multiple
              ></v-select>
            </div>
          </div>
          <div class="dialog-search__button">
            <button class="button__cancel" @click="closeDialog()">
              Cancel
            </button>
            <button class="button__secondary">Search</button>
          </div>
        </v-form>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
import axios from "axios";

export default {
  name: "navigation-bar",
  props: ["apiKey"],
  data() {
    return {
      valid: false,
      dialog_search: null,

      searchInput: null,
      idSearch: null,
      items: [],

      advance_query: null,
      advance_diet: null,
      advance_intolerance: null,
      advance_cuisines: null,

      intolerance_items: [],
      diet_items: [],
      cuisines_items: [],

      advance_search: [],
    };
  },
  created() {
    this.intolerance_items = [
      "Gluten",
      "Dairy",
      "Egg",
      "Grain",
      "Peanut",
      "Seafood",
      "Sesame",
      "Shellfish",
      "Soy",
      "Sulfite",
      "Tree Nut",
      "Wheat",
    ];

    this.diet_items = [
      "Gluten Free",
      "Vegetarian",
      "Vegan",
      "Paleo",
      "Ketogenic",
      "Pescetarian",
      "Primal",
      "Lacto-Vegetarian",
      "Ovo-Vegetarian",
      "Low FODMAP",
    ];

    this.cuisines_items = [
      "African",
      "Asian",
      "American",
      "British",
      "Cajun",
      "Caribbean",
      "Chinese",
      "Eastern European",
      "European",
      "French",
      "German",
      "Greek",
      "Indian",
      "Irish",
      "Italian",
      "Japanese",
      "Jewish",
      "Korean",
      "Latin American",
      "Mediterranean",
      "Mexican",
      "Middle Eastern",
      "Nordic",
      "Southern",
      "Spanish",
      "Thai",
      "Vietnamese",
    ];
  },
  watch: {
    searchInput(newVal) {
      if (newVal) {
        this.initData();
      }
    },
  },
  methods: {
    initData() {
      if (this.searchInput) {
        let url = `https://api.spoonacular.com/recipes/autocomplete`;

        axios
          .get(url, {
            params: {
              apiKey: this.apiKey,
              query: this.searchInput,
            },
          })
          .then((response) => {
            this.items = response.data;
            if (this.idSearch) {
              this.$emit("search-id", this.idSearch);
            }
          })
          .catch((err) => {
            console.error(err);
          });
      }
    },
    resetAdvanceSearch() {
      this.advance_query = null;
      this.advance_diet = null;
      this.advance_intolerance = null;
      this.advance_cuisines = null;
    },
    closeDialog() {
      this.dialog_search = false;
      this.resetAdvanceSearch();
    },
    validateForm() {
      this.valid = this.$refs.advance_search.validate();

      if (this.valid) {
        this.submitAdvanceSearch();
      } else {
        window.scrollTo(0, 0);
      }
    },

    goHome() {
      this.resetAdvanceSearch();
      this.advance_search = [];
      this.$router.push({ path: "/" });
    },

    submitAdvanceSearch() {
      this.advance_search = [];

      let url = "https://api.spoonacular.com/recipes/complexSearch";

      axios
        .get(url, {
          params: {
            apiKey: this.apiKey,
            query: this.advance_query,
            diet: this.advance_diet,
            intolerances: this.advance_intolerance,
            cuisine: this.advance_cuisines,
          },
        })
        .then((response) => {
          this.advance_search = response.data.results;

          this.$emit("advance-search", this.advance_search);
          this.$router.push({ path: "/advance-search" });

          this.closeDialog();
        })
        .catch((err) => {
          this.dialog_search = false;
          console.error(err);
        });
    },
  },
};
</script>
