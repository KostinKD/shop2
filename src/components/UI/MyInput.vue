<template>
  <input :value="modelvalue" @input="updateValue" class="input" type="text">
</template>

<script>
export default {
  name: 'my-input',
  props:{
    modelvalue: [String, Number]
  },
  methods:{
    updateValue(event){
      this.$emit('update:modelvalue', event.target.value)
    }
  }
}
</script>

<style scoped>
.input{
  width: 100%;
  border: 1px solid #ccc;
  padding: 10px 15px;
  margin-top: 15px;
  border-radius: 10px;
}

</style>