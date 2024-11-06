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
  lang: string
): string {
  let path: string[] = [];
  let currentNode: Category = node;

  while (currentNode) {
    path.unshift(getTranslation(currentNode, name, lang));
    currentNode = currentNode.parent;
  }

  return path.join(" -> ");
}

export function getLink(node: Category, lang: string): string {
  return (
    node.locale[lang]?.link || node.locale[Object.keys(node.locale)[0]]?.link
  );
}
