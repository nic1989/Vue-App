<template>
  <div class="container">
    <b-card class="mt-3" header="Notes">
      <b-row>
        <b-col md="3" class="border-pad">
          <NoteSidebar 
            :notes="notes" 
            @editnote="handleEdit"
            @destroynote="handleDelete" />
        </b-col>
        <b-col md="9">
          <b-button v-if="!noteform" variant="outline-primary" class="f-right" @click="addNote">+ Add Note</b-button>
          <div class="mt-3" v-if="noteform">
            <NoteForm 
              :noteFormData="noteChildForm"
              @savenote="onSubmit"
           />
          </div>
        </b-col>
      </b-row>
    </b-card>
  </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
import Items from '../json/notes'
import NoteSidebar from '../components/NoteSidebar'
import NoteForm from '../components/NoteForm'

export default {
    name: "notes",
    components: {
      NoteSidebar,
      NoteForm
    },
    data() {
      return {
        notes: Items,
        noteform: false,
        noteChildForm: {
          type: 'add',
          id : '',
          title: '',
          desc: '',
          btnDisable: false
        }
      }
    },
    computed: {
        ...mapGetters('auth', ['loggedIn'])
    },
    methods: {
        ...mapActions('auth', ['login']),
        addNote() {
          this.noteChildForm = {
              type: 'add',
              id: '',
              title: '',
              desc: '',
              btnDisable: false
            }
            
          this.noteform = true
        },
        onSubmit(formData) {
          this.btnDisable = true;
          if (formData.type == 'add') {
            //generate random id for the index
            let randomId = (((1+Math.random())*0x10000)|0).toString(16).substring(1);

            let notdata = {"id": randomId, 'title': formData.title, 'description': formData.desc}
            this.notes.unshift(notdata)
            
            //Stop save loader, empty fields and hide the form
            this.noteChildForm = {
              type: 'add',
              id: '',
              title: '',
              desc: '',
              btnDisable: false
            }
          } else {
              //Find index of specific object using findIndex method.
              let editIndex = this.notes.findIndex((obj => obj.id === formData.id));
              
              this.notes[editIndex].title = formData.title;
              this.notes[editIndex].description = formData.desc;
          }

          this.noteform = false
        },
        handleEdit(id) {
          let clickedNote = this.notes.find(n => {
              return n.id === id
          })

          this.noteChildForm = {
              type: 'edit',
              id: id,
              title: clickedNote.title,
              desc: clickedNote.description
          }

          this.noteform = true
        },
        handleDelete(id) {
          let objIndex = this.notes.findIndex((obj => obj.id === id));

          this.notes.splice(objIndex, 1)

          this.noteChildForm = {
              type: 'add',
              id: '',
              title: '',
              desc: ''
          }

          this.noteform = false
        }
    }
}
</script>