export async function dataFetch() {
  const res = await fetch("/task_json.json");
  const data = await res.json();
  return data;
}
