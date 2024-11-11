import { Category } from "./types/TreeNode";

export function getTranslation(
  node: Category,
  name: string,
  lang: string
): string {
  return (
    node.locale[lang]?.[name] ||
    node.locale[Object.keys(node.locale)[0]]?.[name] ||
    "Товар не найден"
  );
}

export function getBreadcrumbs(
  node: Category,
  name: string,
  lang: string,
  trees: Category[]
): string {
  return node.path_to_top
    .map((id: number) => {
      const category = findCategoryById(id, trees);
      return getTranslation(category, name, lang);
    })
    .join(" -> ");
}

export function findCategoryById(id: number, trees: Category[]): Category | null {
  for (let tree of trees) {
    if (tree.id === id) {
      return tree;
    }
    if (tree.childs) {
      for (let child of tree.childs) {
        if (child.id === id) {
          return child;
        }
        if (child.childs) {
          for (let grandchild of child.childs) {
            if (grandchild.id === id) {
              return grandchild;
            }
          }
        }
      }
    }
  }
  return null;
}

export function getLink(node: Category, lang: string): string {
  return (
    node.locale[lang]?.link || node.locale[Object.keys(node.locale)[0]]?.link
  );
}
