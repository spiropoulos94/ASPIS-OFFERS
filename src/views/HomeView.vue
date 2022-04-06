<template>
  <div class="home">
    <div class="navbar">
      <span class="logo">ASPIS Apolymantikh Vasileiou - Offers</span>
      <el-button
        size="small"
        class="navbar-btn"
        @click="$store.commit('logout')"
        >Log out</el-button
      >

      <!-- <div class="delete-mode">
        <i class="el-icon-delete"></i>
        <span>Delete Mode:</span>
        <el-switch active-color="#F56C6C" v-model="deleteMode"> </el-switch>
      </div> -->
    </div>
    <h3 style="margin: 3em" v-if="!offers.length">
      You have no offers at the moment...
    </h3>
    <el-form label-position="top">
      <div
        class="offer"
        v-for="(offer, oindex) in offers"
        :key="'offer_' + oindex"
      >
        <div class="delete-actions">
          <el-button
            @click="offers.splice(oindex, 1)"
            plain
            type="danger"
            icon="el-icon-delete"
            >Delete Offer</el-button
          >
        </div>
        <el-form-item class="client" :label="0 ? Client : ''">
          <el-select
            v-model="offers[oindex].client"
            style="max-width: 450px"
            placeholder="Select client"
            value-key="id"
          >
            <el-option
              v-for="(client, cl_index) in available_clients"
              :label="client.name"
              :value="cloneObject(client)"
              :key="'client ' + client.id + cl_index"
              :disabled="
                offers.map((offer) => offer.client.id).includes(client.id)
              "
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item class="services-form-item" label="SERVICES">
          <el-card
            class="service"
            v-for="(service, sindex) in offers[oindex].services"
            :key="'service_' + oindex + sindex"
          >
            <div class="service-small-heading">
              <span>#{{ sindex + 1 }} - {{ service.name }}</span>
              <div class="delete-actions">
                <el-button
                  @click="offers[oindex].services.splice(sindex, 1)"
                  plain
                  type="danger"
                  icon="el-icon-delete"
                  size="small"
                  >Delete Service</el-button
                >
              </div>
            </div>

            <div class="service-option">
              <el-select
                value-key="id"
                v-model="offers[oindex].services[sindex]"
              >
                <el-option
                  v-for="(
                    serviceOption, serviceOptionIndex
                  ) in available_services"
                  :label="serviceOption.name"
                  :value="cloneObject(serviceOption)"
                  :key="
                    'service_option_' + serviceOption.id + serviceOptionIndex
                  "
                  :disabled="
                    offers[oindex].services
                      .map((s) => s.id)
                      .includes(serviceOption.id)
                  "
                  >{{ serviceOption.name }}</el-option
                >
              </el-select>
              <div class="service-cost">
                <!-- {{ offers[oindex].services[sindex].cost }}  -->
                Price :
                <el-input-number
                  size="mini"
                  controls-position="right"
                  :controls="false"
                  v-model="offers[oindex].services[sindex].cost"
                ></el-input-number>
                <!-- € -->
              </div>
            </div>
            <p
              v-if="offers[oindex].services[sindex].required_products.length"
              class="service-small-heading product"
            >
              Products:
            </p>
            <div class="service-products">
              <div
                v-for="(product, pindex) in offers[oindex].services[sindex]
                  .required_products"
                class="added-product"
                :key="product.id + oindex + sindex + pindex"
              >
                <el-select
                  size="small"
                  v-model="
                    offers[oindex].services[sindex].required_products[pindex]
                  "
                  value-key="id"
                  placeholder="Select product"
                >
                  <!-- <el-option>{{ `${oindex}${sindex}${pindex}` }}</el-option> -->
                  <el-option
                    v-for="(
                      productOption, productOptionindex
                    ) in available_products.map((p) => p)"
                    :label="`${productOption.name} (${productOption.cost} €)`"
                    :value="cloneObject(productOption)"
                    :key="
                      'p_' +
                      productOption.id +
                      productOptionindex +
                      's_' +
                      sindex +
                      'o_' +
                      oindex
                    "
                    :disabled="
                      offers[oindex].services[sindex].required_products
                        .map((p) => p.id)
                        .includes(productOption.id)
                    "
                  ></el-option>
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
                <el-button
                  @click="
                    offers[oindex].services[sindex].required_products.splice(
                      pindex,
                      1
                    )
                  "
                  round
                  plain
                  type="danger"
                  icon="el-icon-delete"
                  size="small"
                ></el-button>
                <span class="added-product-price"
                  >{{
                    offers[oindex].services[sindex].required_products[pindex]
                      .cost *
                    offers[oindex].services[sindex].required_products[pindex]
                      .qty
                  }}
                  €</span
                >
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
            <el-divider content-position="left">Service Total:</el-divider>
            <div class="service-total">
              <span>{{ totalServiceCost(oindex, sindex) }} €</span>
            </div>
          </el-card>
          <div class="add-service-btn-wrapper">
            <el-button
              @click="addService(oindex)"
              type="warning"
              icon="el-icon-plus"
              size="small"
              plain
              :disabled="
                offers[oindex].services.length === available_services.length
              "
              >Service</el-button
            >
          </div>
        </el-form-item>
        <!-- <el-form-item label="Discount"> </el-form-item> -->
        <el-divider>Total Offer Cost</el-divider>
        {{ totalOfferCost(oindex) }} €
      </div>
    </el-form>
    <el-row>
      <el-button
        v-if="!offers.length"
        style="max-width: 500px; min-width: 300px"
        icon="el-icon-plus"
        plain
        type="primary"
        :disabled="offers.length === available_clients.length"
        @click="addOffer"
        >Add offer</el-button
      >
      <el-button
        v-if="offers.length && offers[0].services.length"
        style="max-width: 500px; min-width: 300px"
        icon="el-icon-edit-outline"
        plain
        type="success"
        :disabled="offers.length === available_clients.length"
        @click="submit"
        >Generate Email</el-button
      >
    </el-row>
    <!-- <small>
      <pre style="text-align: start">{{ offers }}</pre>
    </small> -->
    <el-dialog title="Προσφορά" :visible.sync="mailDialogVisible" width="80%">
      <el-input disabled placeholder="Recipient" v-model="mailTextContent.to">
      </el-input>
      <el-input
        type="textarea"
        :rows="40"
        placeholder="Please input"
        v-model="mailTextContent.content"
      >
      </el-input>

      <span slot="footer" class="dialog-footer">
        <el-button disabled @click="mailDialogVisible = false"
          >Cancel</el-button
        >
        <el-button
          icon="el-icon-s-promotion"
          disabled
          type="primary"
          @click="mailDialogVisible = false"
          >Send</el-button
        >
      </span>
    </el-dialog>
  </div>
</template>

<script>
// @ is an alias to /src
import { cloneDeep } from "lodash";

let available_clients = [
  {
    id: 11,
    name: "Kernos Beach",
    email: "kernos@beach.gr",
    img: "https://images.pexels.com/photos/261169/pexels-photo-261169.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940",
  },
  {
    id: 12,
    name: "The Artemis Palace",
    email: "artemis@beach.gr",
    img: "https://images.pexels.com/photos/261169/pexels-photo-261169.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940",
  },
  {
    id: 13,
    name: "Knossos Royal",
    email: "mail@test.gr",
    img: "https://images.pexels.com/photos/261169/pexels-photo-261169.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940",
  },
];

let available_services = [
  {
    id: 21,
    name: "Apentomwsh",
    cost: 15,
    required_products: [],
  },
  { id: 22, name: "Apolymansh", cost: 30, required_products: [] },
  { id: 23, name: "Ypokapnismos", cost: 45, required_products: [] },
];

let available_products = [
  {
    id: 31,
    name: "Total block",
    cost: 15,
    qty: 1,
  },
  {
    id: 32,
    name: "Tunel",
    cost: 30,
    qty: 1,
  },
  {
    id: 33,
    name: "UV GT200",
    cost: 90,
    qty: 1,
  },
];

// let offersDummyData = [
//   {
//     client: {
//       id: 11,
//       name: "Kernos Beach",
//       email: "kernos@beach.gr",
//       img: "https://images.pexels.com/photos/261169/pexels-photo-261169.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940",
//     },
//     services: [
//       {
//         id: 21,
//         name: "Apentomwsh",
//         cost: 15,
//         required_products: [
//           {
//             id: 31,
//             name: "Total block",
//             cost: 15,
//             qty: 15,
//           },
//           {
//             id: 33,
//             name: "UV GT200",
//             cost: 90,
//             qty: 10,
//           },
//         ],
//       },
//       {
//         id: 22,
//         name: "Apolymansh",
//         cost: 30,
//         required_products: [
//           {
//             id: 31,
//             name: "Total block",
//             cost: 15,
//             qty: 3,
//           },
//           {
//             id: 32,
//             name: "Tunel",
//             cost: 30,
//             qty: 3,
//           },
//           {
//             id: 33,
//             name: "UV GT200",
//             cost: 90,
//             qty: 5,
//           },
//         ],
//       },
//     ],
//   },
// ];

export default {
  name: "HomeView",
  components: {},
  data() {
    return {
      deleteMode: false,
      available_clients,
      available_services,
      available_products,
      // offers: offersDummyData, // bale adeio array meta
      offers: [],
      mailDialogVisible: false,
      mailTextContent: {},
    };
  },
  methods: {
    cloneObject(obj) {
      return cloneDeep(obj);
    },
    submit() {
      let content = this.mailContent(this.offers[0]);

      console.log(content.content);
      console.log(content);
      this.mailTextContent = content;
      this.mailDialogVisible = true;
    },
    mailContent(offer) {
      let to = "To : " + offer.client.name + "\n";

      let allServices = offer.services.map((s) => s.name).join(" - ");

      let allProducts = [];
      offer.services.map((s) =>
        s.required_products.forEach((p) =>
          !allProducts.map((p) => p.id).includes(p.id)
            ? allProducts.push(p.name)
            : ""
        )
      );

      allProducts = [...new Set(allProducts)]; // remove duplicates
      allProducts = allProducts.join(" - ");

      let content =
        "Ανταποκρινόμενοι στην πρόσκλησή σας για της εξής υπηρεσίες : \n";
      content += `\n`;
      content += allServices + "\n";
      content += `\n`;
      if (allProducts.length) {
        content += "και τα  εξής προιόντα : \n";
        content += `\n`;
        content += allProducts + "\n";
        content += `\n`;
      }
      content += "σας υποβάλλουμε την προσφορά μας: \n";
      content += "\n";
      content += `Λαμβάνοντας υπόψην τον χώρο του ${offer.client.name}, αναλυτικά προτείνουμε τις εξής υπηρεσίες. \n`;
      content += `\n`;

      offer.services.forEach((service) => {
        content += `\n`;
        content += `• Για την υπηρεσία ${service.name} το κόστος ανέρχεται στα ${service.cost} ευρώ (χωρίς ΦΠΑ). \n`;
        content += `\n`;
        content +=
          service.required_products.length > 0
            ? `Απαιτούμενα προιόντα : \n`
            : "";
        content += `\n`;
        service.required_products.forEach((product) => {
          content += `${product.qty} ${product.name}  με κόστος ${
            product.cost
          } * ${product.qty} = € ${product.qty * product.cost} (χωρίς ΦΠΑ) \n`;
        });
      });

      content += `\n`;
      content += `To συνολικό κόστος της προσφοράς μας ανέρχεται στα ${this.totalOfferCost(
        0
      )} € \n`;

      content += `\n`;
      content += `Παραμένουμε στην διάθεση σας για οποιαδήποτε απορία η διευκρίνιση. \n`;
      content += `\n`;
      content += `Νικόλας Βασιλείου\n`;

      return { to, content, allServices, allProducts };
    },
    // deleteMode() {
    //   console.log("Delete Enabled");
    // },
    // disableDelete() {
    //   console.log("Delete Disabled");
    // },
    totalServiceCost(oindex, sindex) {
      let serviceCost = this.offers[oindex].services[sindex].cost;
      let productsCost = this.offers[oindex].services[sindex].required_products
        .map((p) => p.qty * p.cost)
        .reduce((prev, curr) => prev + curr, 0);

      return serviceCost + productsCost;
    },
    totalOfferCost(offerIndex) {
      let totalCost = 0;
      this.offers[offerIndex].services.forEach(
        (s, sindex) => (totalCost += this.totalServiceCost(offerIndex, sindex))
      );
      return totalCost;
    },
    addOffer() {
      let existingOffersClientIds = this.offers.map((offer) => offer.client.id);

      let newOffer = {
        client: {
          ...this.available_clients.find(
            (c) => !existingOffersClientIds.includes(c.id)
          ),
        },
        services: [],
      };

      this.offers.push(cloneDeep(newOffer));
    },
    addService(offerIndex) {
      let existingServicesIds = this.offers[offerIndex].services.map(
        (s) => s.id
      );

      this.offers[offerIndex].services.push(
        cloneDeep(
          available_services.find((s) => !existingServicesIds.includes(s.id))
        )
        // timestamp: +new Date(),
      );
    },
    addProduct(offerIndex, serviceIndex) {
      let existingProdductsIds = this.offers[offerIndex].services[
        serviceIndex
      ].required_products.map((p) => p.id);

      this.offers[offerIndex].services[serviceIndex].required_products.push(
        cloneDeep(
          available_products.find((p) => !existingProdductsIds.includes(p.id))
        )
      );
    },
  },
};
</script>

<style lang="scss">
$logo-orange: #e54c00;
$logo-orange-light: #e8a07c;

$logo-green: #237c36;
$logo-green-light: #5a8864;

* {
  box-sizing: border-box;
  margin: 0;
}

.navbar {
  height: 3em;
  text-align: start;
  padding: 0 20px;
  display: flex;
  align-items: center;
  position: sticky;
  top: 0;
  left: 0;
  right: 0;
  background: red;
  // border-bottom: 5px solid $logo-green;
  z-index: 9999;
  justify-content: space-between;
  .logo {
    font-size: 1.3em;
    color: white;
    font-weight: 900;
  }
  .delete-mode {
    * {
      margin-left: 5px;
    }
  }
}
.offer {
  // border: 10px solid $logo-orange-light;
  //test
  padding: 10px;
  border-radius: 15px;
  margin: 20px auto;
  max-width: 1200px;

  .delete-actions {
    text-align: end;
    margin: 5px 0;
  }

  .client {
    .el-form-item__label {
      float: left;
    }
    input {
      border: none;
      font-size: 1.85em;
      border-bottom: 1px solid black;
      border-radius: 0;
    }
  }

  .client {
    label {
      font-size: 1.75em;
    }
  }
  .services-form-item {
    max-width: 800px;
    margin: auto;
    label {
      font-size: 1.2em;
    }
  }
  .add-service-btn-wrapper {
    text-align: end;
  }
}

.service {
  border-radius: 10px !important;
  padding: 10px;
  margin-bottom: 10px;
  .service-option {
    // border: 1px solid red;
    display: flex;
    justify-content: space-between;
  }
  .service-cost {
    font-weight: 800;
    font-size: 1.1em;
    .el-input-number--mini {
      width: 50px;
    }
  }

  .service-total {
    span {
      font-size: 1.4em;
    }
    text-align: end;
  }

  .service-small-heading {
    text-align: start;
    // font-style: italic;
    padding: 0;
    margin: 0;
    font-size: 1.4em;
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-bottom: 0.5em;
    &.product {
      margin-top: 10px;
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
    .added-product-price {
      &:before {
        content: "+ ";
      }
      font-size: 1.1em;
      float: right;
    }
  }
  .service-products {
    text-align: end;
    margin-top: 1em;
  }
}
</style>
