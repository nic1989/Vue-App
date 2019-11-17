<template>
  <ul class="noteslist">
    <li v-for="note in notes" :key="note.id" class="mb-2" @click="editNoteVal(note.id)">
      <div class="note-div">
        <h6>
          {{note.title}}
          <span class="f-right" @click.stop="deleteNote(note.id)"><i class="fa fa-remove"></i></span>
        </h6>
        <p v-b-tooltip.hover title="Click to edit or view full text">{{note.description | strshortlen}}</p>
      </div>
    </li>
  </ul>
</template>

<script>
export default {
  props: {
    notes: Array
  },
  methods: {
    editNoteVal(id) {
      this.$emit('editnote', id)
    },
    deleteNote(id) {
      const self = this;
      this.$swal({
        title: "Are you sure?",
        text: "You will not be able to recover this note!",
        type: "warning",
        showCancelButton: true,
      }).then(function(isConfirm) {
        if (isConfirm.value) {
          self.$emit('destroynote', id)
        }
      });
    }
  }
}
</script>
