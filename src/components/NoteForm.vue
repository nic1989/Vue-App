<template>
  <b-form @submit.prevent="onSubmit">
    <input type="hidden" v-model="form.formtype">
    <b-form-group  label="Title:" label-for="title">
        <b-form-input
          id="title"
          v-model="form.title"
          type="text"
          required
          placeholder="Enter title"
          maxlength="25"
        ></b-form-input>
    </b-form-group>

    <b-form-group label="Description:" label-for="desc">
        <b-form-textarea
          id="desc"
          v-model="form.desc"
          placeholder="Enter something..."
          rows="3"
          max-rows="6"
          :maxlength="maxchar"
          required
        ></b-form-textarea>
        <span class="f-right lengthcolor f-14"><span v-html="(maxchar - form.desc.length)"></span> character remaining</span>
    </b-form-group>
    <br>
    <b-button type="submit" variant="primary" class="mr-2 f-right" :disabled="disablebtn">
      <b-spinner v-if="disablebtn" small></b-spinner>
      Save
    </b-button>
  </b-form>
</template>

<script>
export default {
  props: {
    noteFormData: Object
  },
  data() {
    return {
      disablebtn: this.noteFormData.btnDisable,
      form: {
        type: this.noteFormData.type,
        id: this.noteFormData.id,
        title: this.noteFormData.title,
        desc: this.noteFormData.desc,
      },
      maxchar: 255,
    }
  },
  watch: {
    noteFormData: function(val) {
      this.form = {
        type: val.type,
        id: val.id,
        title: val.title,
        desc: val.desc
      }
      this.disablebtn = val.disablebtn
    }
  },
  methods: {
    onSubmit() {
      this.disablebtn = true;
      this.$emit('savenote', this.form)
    }
  }
}
</script>
