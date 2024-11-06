<template>
  <main>
    <div class="container mx-auto px-4">
      <div class="pt-10">
        <MySelect @languageChanged="languageChange" />
        <MyTreeNode :currentLanguage="currentLanguage" />
      </div>
    </div>
  </main>
</template>

<script setup lang="ts">
import MySelect from "~/components/MySelect.vue";
import MyTreeNode from "~/components/MyTreeNode.vue";

const currentLanguage = ref<string>("");

function languageChange(selectedChange: string) {
  currentLanguage.value = selectedChange;
}
</script>
