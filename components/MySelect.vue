<template>
  <div class="relative max-w-40 mb-10">
    <MyIcons
      class="absolute top-1/2 right-0 transform -translate-y-2/4 pointer-events-none"
      type="arrow-select"
    />
    <select
      class="border w-full rounded-lg border-gray-300 bg-slate-100 px-4 py-2 cursor-pointer"
      v-model="selectedLang"
      @change="changeLanguage"
    >
      <option :value="language" v-for="language in languages" :key="language">
        {{ language }}
      </option>
    </select>
  </div>
</template>

<script setup lang="ts">
import { ref, defineEmits } from "vue";
import MyIcons from "~/UI/icons/MyIcons.vue";

const languages: string[] = ["en", "ru", "fr", "1"];
const selectedLang = ref<string>("en");

const emit = defineEmits<{
  (event: "languageChanged", selectedLang: string): void;
}>();

function changeLanguage() {
  emit("languageChanged", selectedLang.value);
}
</script>
