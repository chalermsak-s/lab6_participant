<script setup lang="ts">
import { toRefs } from 'vue'
import type { Participant } from '@/types'
import { useRouter } from 'vue-router'
import { useMessageStore } from '@/stores/message'
const props = defineProps<{
  participant: Participant
  id: string
}>()
const store = useMessageStore()
//eslint-disable-next-line @typescript-eslint/no-unused-vars
const { participant } = toRefs(props)
const router = useRouter()
const register = () => {
  store.updateMessage('You are successully registered for ' + props.participant.name)
  setTimeout(() => {
    store.resetMessage()
  }, 3000)
  router.push({ name: 'participant-detail-view' })
  console.log(participant)
}
</script>
<template>
  <div>
    <p>Register Participant here</p>
    <button @click="register">Register</button>
  </div>
</template>
