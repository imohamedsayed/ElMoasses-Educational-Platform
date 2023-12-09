<template>
  <AppLayout>
    <div class="store">
      <v-container>
        <v-card>
          <v-sheet class="lectures-title" width="100%" height="20vh">
            <h1>المؤسس للرياضيات</h1>
            <v-breadcrumbs :items="state.items" class="mx-auto">
              <template v-slot:title="{ item }">
                {{ item.title.toUpperCase() }}
              </template>
            </v-breadcrumbs>
          </v-sheet>

          <h2 style="margin-top: 100px" class="px-10 py-5">
            <v-icon class="ml-2">mdi-storefront-outline </v-icon>المتجر
          </h2>

          <NotesList />
          <NotesList />
        </v-card>
      </v-container>
    </div>
  </AppLayout>
</template>

<script>
import AppLayout from "@/components/website/AppLayout.vue";
import { reactive } from "vue";
import NotesList from "@/components/website/Month/content/notes/NotesList.vue";
export default {
  components: { AppLayout, NotesList },
  setup() {
    const state = reactive({
      items: [
        {
          title: "الرئيسية",
          disabled: false,
          href: "/landing",
        },
        {
          title: "المتجر",
          disabled: true,
          href: "/store",
        },
      ],
    });

    return { state };
  },
};
</script>

<style lang="scss" scoped>
.store {
  .lectures-title {
    background: var(--martinique);
    display: grid;
    place-content: center;
    color: var(--seashell);
    text-align: center;
  }
}
</style>
