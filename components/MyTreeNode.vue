<template>
  <ul>
    <li
      class="mb-10 rounded-lg border border-gray-300 bg-slate-100 p-5 cursor-pointer"
      v-for="tree in trees"
      :key="tree.id"
      @click.stop="toggleHandler(tree.id)"
    >
      <h3 class="text-2xl font-bold pb-3">
        {{ getTranslation(tree, "cg_name", props.currentLanguage) }}
      </h3>
      <p class="text-gray-400 pb-3">
        {{ getBreadcrumbs(tree, "cg_name", props.currentLanguage) }}
      </p>

      <a
        class="text-cyan-700"
        :href="getLink(tree, props.currentLanguage)"
        target="_blank"
      >
        {{ getTranslation(tree, "cg_name", props.currentLanguage) }}</a
      >

      <ul class="ml-5 mt-5" v-if="treeState[tree.id]">
        <li
          class="mb-5 rounded-lg border border-gray-300 bg-slate-200 p-5 cursor-pointer"
          v-for="child in tree.childs"
          :key="child.id"
          @click.stop="toggleHandler(child.id)"
        >
          <h4 class="font-bold pb-3">
            {{ getTranslation(child, "cg_name", props.currentLanguage) }}
          </h4>

          <p class="text-gray-400 pb-3">
            {{ getBreadcrumbs(child, "cg_name", props.currentLanguage) }}
          </p>

          <a
            class="text-cyan-700"
            :href="getLink(child, props.currentLanguage)"
            target="_blank"
          >
            {{ getTranslation(child, "cg_name", props.currentLanguage) }}</a
          >

          <ul class="ml-5 mt-5" v-if="treeState[child.id]">
            <li
              class="mb-5 border border-gray-300 rounded-lg bg-slate-300 p-5 cursor-pointer"
              v-for="grandchild in child.childs"
              :key="grandchild.id"
            >
              <h5 class="font-bold pb-3">
                {{
                  getTranslation(grandchild, "cg_name", props.currentLanguage)
                }}
              </h5>

              <p class="text-gray-400 pb-3">
                {{
                  getBreadcrumbs(grandchild, "cg_name", props.currentLanguage)
                }}
              </p>

              <a
                class="text-cyan-700"
                :href="getLink(grandchild, props.currentLanguage)"
                target="_blank"
              >
                {{
                  getTranslation(grandchild, "cg_name", props.currentLanguage)
                }}</a
              >
            </li>
          </ul>
        </li>
      </ul>
    </li>
  </ul>
</template>

<script setup lang="ts">
import { ref, computed, onMounted, defineProps } from "vue";
import { dataFetch } from "~/helpers/api";
import { getTranslation, getBreadcrumbs, getLink } from "~/utils/treeNode";
import { Category, Locale } from "~/types/TreeNode";
import { Language } from "~/types/Language";
import { Props } from "~/types/PropsTreeNode";
import { TreeState } from "~/types/TreeState";

const props = defineProps<Props>();

const trees = ref<Category>([]);
const treeState = ref<TreeState>({});

function toggleHandler(id: number): void {
  treeState.value[id] = !treeState.value[id];
}

onMounted(async () => {
  trees.value = await dataFetch();

  const parentMap: { [key: number]: Category | null } = {};

  if (trees.value) {
    trees.value.forEach((tree: Category): void => {
      parentMap[tree.id] = null;
      if (tree.childs) {
        tree.childs.forEach((child: Category): void => {
          parentMap[child.id] = tree;
          if (child.childs) {
            child.childs.forEach((grandchild: Category): void => {
              parentMap[grandchild.id] = child;
            });
          }
        });
      }
    });
  }
});
</script>
