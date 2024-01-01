<template>
  <div class="intro">
    <v-container
      style="height: 100%"
      class="d-flex align-center justify-center"
    >
      <v-row>
        <v-col
          col="12"
          md="6"
          class="text-white text text-center text-md-start"
        >
          <h1
            class="mb-10"
            v-motion
            :initial="{ opacity: 0, x: 200 }"
            :enter="{ opacity: 1, x: 0 }"
          >
            المنصة العربية الافضل لتعلم الرياضيات باحتراف
          </h1>
          <p
            class="mb-10"
            v-motion
            :initial="{ opacity: 0, y: 200 }"
            :enter="{ opacity: 1, y: 0 }"
            :delay="200"
          >
            تعلم الرياضيات بمختلف الدروس من خلال محاضرات في المنصة, واحصل على
            اعلى الدرجات.
          </p>
          <v-btn
            color="#43A047"
            rounded="xl"
            size="x-large"
            class="start-btn"
            v-motion-roll-bottom
            >ابدء التعلم الان</v-btn
          >
        </v-col>
        <v-col col="12" md="6" class="text-center">
          <video height="360" controls v-motion-slide-left>
            <source
              :src="require('../../../assets/video/intro.mp4')"
              type="video/mp4"
            />
          </video>
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>

<script setup></script>

<style lang="scss">
.intro {
  height: calc(100vh - 64px);
  background: url("../../../assets/images/intro.jpeg") top center;
  background-size: cover;
  .text {
    backdrop-filter: blur(4px);
    h1 {
      font-size: 3vw;
    }
    p {
      font-size: 1.6vw;
    }
    @media (max-width: 537px) {
      h1 {
        font-size: 4vw;
      }
      p {
        font-size: 2vw;
      }
    }
  }
  video {
    width: fit-content;
    margin: 0 auto;
    @media (max-width: 722px) {
      width: 400px;
    }
  }
}
</style>
