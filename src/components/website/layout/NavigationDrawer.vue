<template>
  <v-navigation-drawer
    location="right"
    v-model="AppDrawer"
    :rail="AppRail"
    permanent
    @click="AppRail = false"
  >
    <v-list-item
      prepend-avatar="https://randomuser.me/api/portraits/men/85.jpg"
      title="John Leider"
      nav
    >
      <template v-slot:append>
        <v-btn
          variant="text"
          icon="mdi-chevron-left"
          @click.stop="AppRail = !AppRail"
        ></v-btn>
      </template>
    </v-list-item>

    <v-divider></v-divider>

    <v-list density="compact" nav>
      <v-list-item
        prepend-icon="mdi-home-city"
        title="Home"
        value="home"
      ></v-list-item>
      <v-list-item
        prepend-icon="mdi-card"
        title="Cards"
        value="account"
      ></v-list-item>
      <v-list-item
        prepend-icon="mdi-pin"
        title="Buttons"
        value="users"
      ></v-list-item>
      <v-list-item
        prepend-icon="mdi-tooltip"
        title="Tooltips"
        value="tooltips"
      ></v-list-item>
      <v-list-item
        prepend-icon="mdi-menu"
        title="Lists and menus"
        value="lists"
      ></v-list-item>
      <v-list-item
        prepend-icon="mdi-star"
        title="Expansion panels"
        value="expansion"
      ></v-list-item>
      <v-list-item
        prepend-icon="mdi-tab"
        title="Layout & tabs"
        value="layout"
      ></v-list-item>
      <v-list-group>
        <template v-slot:activator="{ props }">
          <v-list-item
            prepend-icon="mdi-login"
            title="Forms"
            value="form"
            v-bind="props"
          ></v-list-item>
        </template>
        <v-list-item
          prepend-icon="mdi-email"
          title="Examples"
          value="ex1"
        ></v-list-item>
      </v-list-group>
      <v-list-item
        prepend-icon="mdi-box"
        title="pagination"
        value="pagination"
      ></v-list-item>
      <v-list-item
        prepend-icon="mdi-table"
        title="Tables"
        value="table"
      ></v-list-item>
      <v-list-item
        prepend-icon="mdi-switch"
        title="Btn Toggle & Carousel"
        value="btnToggleCarousel"
      ></v-list-item>
      <v-list-item
        prepend-icon="mdi-slide"
        title="Slider, Chips group & window"
        value="slideChipsWindow"
      ></v-list-item>
      <v-list-item
        prepend-icon="mdi-alert"
        title="Alert, Badge, Hover, Rating & snackbar"
        value="alertBadgeHoverRatingSnackbar"
      ></v-list-item>
      <v-list-item
        prepend-icon="mdi-timeline"
        title="Timeline, avatar and lazy loading"
        value="timelineAvatarLazyLoading"
      ></v-list-item>
    </v-list>
  </v-navigation-drawer>
</template>

<script>
export default {
  inject: ["Emitter"],
  data: () => ({
    AppRail: true,
    AppDrawer: false,
  }),
  mounted() {
    this.Emitter.on(
      "toggleAppDrawer",
      () => (this.AppDrawer = !this.AppDrawer)
    );
  },
};
</script>

<style></style>
