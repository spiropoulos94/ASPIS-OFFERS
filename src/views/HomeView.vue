<template>
  <div class="home">
    <h1>ASPIS Offers</h1>
    <h3 v-if="!offers.length">You have no offers at the moment...</h3>
    <el-form>
      <div class="offer" v-for="offer in offers" :key="offer.name">
        <el-form-item label="Client">
          <el-input></el-input>
        </el-form-item>
      </div>
    </el-form>
    <el-row>
      <el-button
        style="width: 400px"
        icon="el-icon-plus"
        plain
        type="primary"
        @click="addOffer"
        >Add offer</el-button
      >
    </el-row>
  </div>
</template>

<script>
// @ is an alias to /src

let available_hotels = [
  {
    name: "Kernos Beach",
    email: "kernos@beach.gr",
    img: "https://images.pexels.com/photos/261169/pexels-photo-261169.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940",
  },
  {
    name: "The Artemis Palace",
    email: "kernos@beach.gr",
    img: "https://images.pexels.com/photos/261169/pexels-photo-261169.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940",
  },
  {
    name: "Knossos Royal",
    email: "mail@test.gr",
    img: "https://images.pexels.com/photos/261169/pexels-photo-261169.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940",
  },
  {
    name: "Knossos Royal",
    email: "mail@test.gr",
    img: "https://images.pexels.com/photos/261169/pexels-photo-261169.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940",
  },
];

let available_services = [
  {
    name: "Apentomwsh",
    cost: 15,
  },
  {
    name: "Apolymansh",
    cost: 30,
  },
  {
    name: "Ypokapnismos",
    cost: 30,
  },
];

let available_products = [
  {
    name: "Total block",
    cost: 15,
    qty: 1,
  },
  {
    name: "Tunel",
    cost: 30,
    qty: 1,
  },
  {
    name: "UV GT200",
    cost: 90,
    qty: 1,
  },
];

export default {
  name: "HomeView",
  components: {},
  data() {
    return {
      available_hotels,
      available_services,
      available_products,
      offers: [
        {
          client: "Creta Maris",
          services: [],
        },
      ],
    };
  },
  methods: {
    addOffer() {
      console.log("Offer added!");
      this.offers.push({
        client: "Creta Maris",
        services: [],
      });
    },
  },
};
</script>

<style>
.offer {
  border: 1px solid blue;
  padding: 10px;
  border-radius: 15px;
  margin: 20px auto;
  width: 700px;
}
</style>
