<template>
  <div class="home">
    <h1>ASPIS Offers</h1>
    <h3 v-if="!offers.length">You have no offers at the moment...</h3>
    <el-form label-position="top">
      <div class="offer" v-for="(offer, oindex) in offers" :key="offer.name">
        <el-form-item class="client" label="Client">
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
        <el-form-item class="services-form-item" label="SERVICES">
          <div
            class="service"
            v-for="(service, sindex) in offers[oindex].services"
            :key="service.name"
          >
            <p class="service-small-heading">Service #{{ sindex + 1 }}</p>
            <div class="service-option">
              <el-select
                value-key="id"
                v-model="offers[oindex].services[sindex]"
              >
                <el-option
                  v-for="serviceOption in available_services"
                  :label="serviceOption.name"
                  :value="serviceOption"
                  :key="serviceOption.id"
                  >{{ serviceOption.name }}</el-option
                >
              </el-select>
              <div class="service-cost">
                {{ offers[oindex].services[sindex].cost }} €
              </div>
            </div>
            <!-- <el-switch v-model="true"></el-switch> -->
            <p class="service-small-heading product">Products:</p>
            <p v-if="!offers[oindex].services[sindex].required_products.length">
              No products for this service
            </p>
            <div class="service-products">
              <div
                v-for="(product, pindex) in offers[oindex].services[sindex]
                  .required_products"
                class="added-product"
                :key="product.id + pindex"
              >
                <el-select
                  size="small"
                  v-model="
                    offers[oindex].services[sindex].required_products[pindex]
                  "
                  value-key="id"
                >
                  <el-option
                    v-for="productOption in available_products"
                    :label="productOption.name"
                    :value="productOption"
                    :key="productOption.id"
                    >{{ productOption.name }}</el-option
                  >
                </el-select>
                <span class="multiply-divider">x</span>
                <el-input-number
                  :min="1"
                  size="mini"
                  v-model="
                    offers[oindex].services[sindex].required_products[pindex]
                      .qty
                  "
                ></el-input-number>
              </div>
              <el-button
                @click="addProduct(oindex, sindex)"
                icon="el-icon-plus"
                size="small"
                plain
                type="primary"
                :disabled="
                  offers[oindex].services[sindex].required_products.length ===
                  available_products.length
                "
                >Product</el-button
              >
            </div>
          </div>
          <div class="add-service-btn-wrapper">
            <el-button
              @click="addService(oindex)"
              type="primary"
              icon="el-icon-plus"
              size="small"
              :disabled="
                offers[oindex].services.length === available_services.length
              "
              >Service</el-button
            >
          </div>
        </el-form-item>
        <!-- <el-form-item label="Discount"> </el-form-item> -->
        <!-- <el-divider></el-divider> -->
      </div>
    </el-form>
    <el-row>
      <el-button
        style="width: 500px"
        icon="el-icon-plus"
        plain
        type="primary"
        @click="addOffer"
        >Add offer</el-button
      >
    </el-row>
    <small>
      <pre style="text-align: start">{{ offers }}</pre>
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
    required_products: [],
  },
  { id: 2, name: "Apolymansh", cost: 30, required_products: [] },
  { id: 3, name: "Ypokapnismos", cost: 45, required_products: [] },
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

let offersDummyData = [
  {
    client: {
      id: 2,
      name: "The Artemis Palace",
      email: "artemis@beach.gr",
      img: "https://images.pexels.com/photos/261169/pexels-photo-261169.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940",
    },
    services: [
      {
        id: 1,
        name: "Apentomwsh",
        cost: 15,
        required_products: [],
      },
      {
        id: 2,
        name: "Apolymansh",
        cost: 30,
        required_products: [],
      },
      {
        id: 3,
        name: "Ypokapnismos",
        cost: 45,
        required_products: [],
      },
    ],
  },
];

export default {
  name: "HomeView",
  components: {},
  data() {
    return {
      num4: 5,
      available_clients,
      available_services,
      available_products,
      offers: offersDummyData, // bale adeio array meta
    };
  },
  methods: {
    addOffer() {
      console.log("Offer added!");
      this.offers.push({
        client: {},
        services: [available_services[0]],
      });
    },
    addService(offerIndex) {
      console.log("Service added", offerIndex);
      this.offers[offerIndex].services.push(available_services[0]);
    },
    addProduct(offerIndex, serviceIndex) {
      console.log(this.offers, { offerIndex, serviceIndex });
      // let productIds = this.offers[offerIndex].services[
      //   serviceIndex
      // ].required_products.map((p) => p.id);
      this.offers[offerIndex].services[serviceIndex].required_products.push(
        available_products[0]
      );
    },
  },
};
</script>

<style lang="scss">
.offer {
  border: 1px solid blue;
  padding: 10px;
  border-radius: 15px;
  margin: 20px auto;
  max-width: 1200px;
  .client {
    label {
      font-size: 1.75rem;
    }
  }
  .services-form-item {
    max-width: 800px;
    margin: auto;
    label {
      font-size: 1.2rem;
    }
  }
  .add-service-btn-wrapper {
    text-align: end;
  }
}

.service {
  border: 1px solid green;
  border-radius: 15px;
  padding: 10px;
  margin-bottom: 10px;
  .service-option {
    // border: 1px solid red;
    display: flex;
    justify-content: space-between;
  }
  .service-cost {
    font-weight: 800;
    font-size: 1.8rem;
  }
  .service-small-heading {
    text-align: start;
    font-style: italic;
    padding: 0;
    margin: 0;
    &.product {
      margin-top: 30px;
    }
  }
  .added-product {
    // background: red;
    margin-top: 5px;
    text-align: start;
    button {
      margin-left: 15px;
    }
    .multiply-divider {
      margin: 0 20px;
    }
  }
  .service-products {
    text-align: end;
  }
}
</style>
