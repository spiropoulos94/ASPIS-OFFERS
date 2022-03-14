<template>
  <div class="home">
    <h1>ASPIS Offers</h1>
    <h3 v-if="!offers.length">You have no offers at the moment...</h3>
    <el-form label-position="top">
      <div class="offer" v-for="(offer, oindex) in offers" :key="offer.name">
        <el-form-item label="Client">
          <el-select
            v-model="offers[oindex].client"
            style="width: 450px"
            placeholder="Select client"
            value-key="id"
          >
            <el-option
              v-for="client in available_clients"
              :label="client.name"
              :value="client"
              :key="client.id"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item class="services-form-item" label="Services">
          <div
            class="service"
            v-for="(service, sindex) in offers[oindex].services"
            :key="service.name"
          >
            <p class="service-number">Service #{{ sindex + 1 }}</p>
            <el-select value-key="id" v-model="offers[oindex].services[sindex]">
              <el-option
                v-for="serviceOption in available_services"
                :label="serviceOption.name"
                :value="serviceOption"
                :key="serviceOption.id"
                >{{ serviceOption.name }}</el-option
              >
            </el-select>
          </div>
          <div class="add-service-btn-wrapper">
            <el-button
              @click="addService(oindex)"
              type="primary"
              icon="el-icon-plus"
              circle
            ></el-button>
          </div>
        </el-form-item>
        <!-- <el-form-item label="Discount"> </el-form-item> -->
        <!-- <el-divider></el-divider> -->
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
    <small>
      <pre>{{ offers }}</pre>
    </small>
  </div>
</template>

<script>
// @ is an alias to /src

let available_clients = [
  {
    id: 1,
    name: "Kernos Beach",
    email: "kernos@beach.gr",
    img: "https://images.pexels.com/photos/261169/pexels-photo-261169.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940",
  },
  {
    id: 2,
    name: "The Artemis Palace",
    email: "artemis@beach.gr",
    img: "https://images.pexels.com/photos/261169/pexels-photo-261169.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940",
  },
  {
    id: 3,
    name: "Knossos Royal",
    email: "mail@test.gr",
    img: "https://images.pexels.com/photos/261169/pexels-photo-261169.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940",
  },
];

let available_services = [
  {
    id: 1,
    name: "Apentomwsh",
    cost: 15,
  },
  { id: 2, name: "Apolymansh", cost: 30 },
  { id: 3, name: "Ypokapnismos", cost: 45 },
];

let available_products = [
  {
    id: 1,
    name: "Total block",
    cost: 15,
    qty: 1,
  },
  {
    id: 2,
    name: "Tunel",
    cost: 30,
    qty: 1,
  },
  {
    id: 3,
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
      available_clients,
      available_services,
      available_products,
      offers: [
        // {
        //   client: "Creta Maris",
        //   services: [],
        // },
      ],
    };
  },
  methods: {
    addOffer() {
      console.log("Offer added!");
      this.offers.push({
        client: {},
        services: [
          // {
          //   name: "",
          //   cost: 0,
          //   required_products: [],
          // },
        ],
      });
    },
    addService(offerIndex) {
      console.log("Service added", offerIndex);
      this.offers[offerIndex].services.push({
        name: "",
        cost: 0,
        required_products: [],
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

.services-form-item {
  width: 500px;
  margin: auto;
}

.add-service-btn-wrapper {
  text-align: end;
}

.service {
  border: 1px solid green;
  margin-bottom: 10px;
}

.service-number {
  text-align: start;
}
</style>
