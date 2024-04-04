<script setup lang="ts">
import { ref } from 'vue';
import {useTailwindConverter} from "~/components/useTailwindConverter";
const darkMode = ref(false);

const { cssText, htmlText,convertedHtmlText, cssToJson, convertAndInject } = useTailwindConverter();


function submit() {
  // Basic "conversion" to a JSON object. This is a simplistic approach.
  // For real-world applications, consider using a proper parser depending on your needs.
  const data = {
    html: htmlText.value,
    css: cssToJson(cssText.value)
  };

  // Example of what you might do with the data: console logging.
  // In a real application, you might send this to a server or use it in some other way.
  console.log(data);

  // Convert the data object to a JSON string if needed
  const jsonData = JSON.stringify(data);
  console.log(jsonData);
}

</script>


<template>
  <div :class="{ 'dark': darkMode }">
    <div class="relative h-screen w-full flex-col overflow-hidden bg-slate-200 dark:bg-zinc-800">
      <div class="w-screen flex justify-between p-4">
        <div class="flex items-center">
          <input id="dark-mode" type="checkbox" v-model="darkMode" class="toggle toggle-md hover:bg-slate-400">
          <label for="dark-mode" class="ml-2">{{ darkMode ? 'Dark' : 'Light' }}</label>
        </div>
      </div>
      <form @submit.prevent="convertAndInject">
        <div class="flex h-full">
          <!-- HTML Editor -->
          <div class="w-1/2 p-4">
            <label for="html-input" class="text-gray-600 dark:text-gray-300">HTML</label>
            <textarea id="html-input" v-model="htmlText"
                      class="w-full h-1/2 p-2 bg-white dark:bg-gray-800 dark:text-gray-200"></textarea>
          </div>

          <!-- CSS Editor -->
          <div class="w-1/2 p-4">
            <label for="css-input" class="text-gray-600 dark:text-gray-300">CSS</label>
            <textarea id="css-input" v-model="cssText"
                      class="w-full h-1/2 p-2 bg-white dark:bg-gray-800 dark:text-gray-200"></textarea>
          </div>
        </div>
        <button type="submit">Submit</button>

      </form>
      <textarea class="w-full" v-model="convertedHtmlText"></textarea>
    </div>
  </div>
</template>
