<template>
  <div>
    <h1>
      add or remove
    </h1>
    <ul>
      <li v-for="index in items" @click="() => addItem(index)"> ➕ {{ index }}</li>
    </ul>
    <ul>
      <li v-for="(value, index) in itemsList" @click="() => removeItem(index)">
        ➖ {{ value }}
      </li>
    </ul>

  </div>
</template>
  
  
<script>
export default {
  data() {
    return {
      items: [
        'lol',
        'lal',
        'lel'
      ],
      itemsList: [],
    }
  },
  methods: {
    addItem(item) {
      this.itemsList.push(item);
    },
    removeItem(index) {
      this.itemsList.splice(index, 1)
    }
  }
}
</script>

<style lang="scss" scoped>
  ul {
    list-style: none;
  }
</style>